import { getApps, initializeApp, cert, getApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import path from 'path';
import fs from 'fs';

function initAdminApp() {
    if (getApps().length > 0) {
        return getApp();
    }

    const keyPath = path.resolve(process.cwd(), 'serviceAccountKey.json');
    if (fs.existsSync(keyPath)) {
        try {
            const serviceAccount = JSON.parse(fs.readFileSync(keyPath, 'utf8'));
            return initializeApp({
                credential: cert(serviceAccount),
                projectId: 'nongtung-platform',
            });
        } catch (e) {
            console.error('Failed to parse serviceAccountKey.json:', e);
        }
    }

    return initializeApp({
        projectId: 'nongtung-platform',
    });
}

const adminApp = initAdminApp();
const adminDb = getFirestore(adminApp);
const adminAuth = getAuth(adminApp);

export { adminApp, adminDb, adminAuth };
