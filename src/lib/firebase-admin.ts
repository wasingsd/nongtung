import { getApps, initializeApp, cert, getApp, App } from 'firebase-admin/app';
import { getFirestore, Firestore } from 'firebase-admin/firestore';
import { getAuth, Auth } from 'firebase-admin/auth';
import path from 'path';
import fs from 'fs';

let hasValidCredentials = false;

function parseServiceAccount(): any | null {
    // 1. Try environment variable FIREBASE_SERVICE_ACCOUNT_KEY or FIREBASE_SERVICE_ACCOUNT
    const envKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY || process.env.FIREBASE_SERVICE_ACCOUNT;
    if (envKey) {
        try {
            const trimmed = envKey.trim();
            const jsonStr = trimmed.startsWith('{')
                ? trimmed
                : Buffer.from(trimmed, 'base64').toString('utf8');
            return JSON.parse(jsonStr);
        } catch (e) {
            console.error('Failed to parse FIREBASE_SERVICE_ACCOUNT_KEY from env:', e);
        }
    }

    // 2. Try file path from FIREBASE_SERVICE_ACCOUNT_PATH or default serviceAccountKey.json
    const keyPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH
        ? path.resolve(process.cwd(), process.env.FIREBASE_SERVICE_ACCOUNT_PATH)
        : path.resolve(process.cwd(), 'serviceAccountKey.json');

    if (fs.existsSync(keyPath)) {
        try {
            return JSON.parse(fs.readFileSync(keyPath, 'utf8'));
        } catch (e) {
            console.error('Failed to parse serviceAccountKey.json file:', e);
        }
    }

    return null;
}

function initAdminApp(): App | null {
    if (getApps().length > 0) {
        hasValidCredentials = true;
        return getApp();
    }

    const serviceAccount = parseServiceAccount();
    if (serviceAccount) {
        try {
            hasValidCredentials = true;
            return initializeApp({
                credential: cert(serviceAccount),
                projectId: serviceAccount.project_id || 'nongtung-platform',
            });
        } catch (e) {
            console.error('Failed to initializeApp with cert:', e);
        }
    }

    return null;
}

const adminApp = initAdminApp();

// Create safe fallback proxy for adminDb if credentials are not configured on server
// This avoids hanging on Google Cloud metadata server (169.254.169.254) which causes 500 timeouts on Vercel
function createDummyDb(): any {
    const errorMsg = 'Firebase Admin credentials not found. Please set FIREBASE_SERVICE_ACCOUNT_KEY in environment variables.';
    const makeChain = (): any => {
        return new Proxy(() => {}, {
            get(_target, prop) {
                if (prop === 'get' || prop === 'set' || prop === 'update' || prop === 'delete') {
                    return () => Promise.reject(new Error(errorMsg));
                }
                if (prop === 'then') {
                    return undefined;
                }
                return makeChain();
            },
            apply() {
                return makeChain();
            }
        });
    };

    return new Proxy({}, {
        get(_target, prop) {
            if (prop === 'batch') {
                return () => ({
                    set: () => {},
                    update: () => {},
                    delete: () => {},
                    commit: () => Promise.reject(new Error(errorMsg)),
                });
            }
            return makeChain();
        }
    });
}

const adminDb: Firestore = (adminApp && hasValidCredentials)
    ? getFirestore(adminApp)
    : createDummyDb();

const adminAuth: Auth = (adminApp && hasValidCredentials)
    ? getAuth(adminApp)
    : (new Proxy({}, { get: () => () => Promise.reject(new Error('Firebase Auth not initialized')) }) as any);

export { adminApp, adminDb, adminAuth, hasValidCredentials };
