import { adminDb, hasValidCredentials } from '../src/lib/firebase-admin';
import { getTrips } from '../src/lib/firestore-db';

async function main() {
    console.log('hasValidCredentials:', hasValidCredentials);
    console.log('Fetching trips...');
    const trips = await getTrips();
    console.log(`Fetched ${trips.length} trips successfully.`);
    trips.forEach(t => console.log(' -', t.title, 'image:', t.image));
}

main().catch(console.error);
