import fs from 'fs';
import path from 'path';
import { Trip, Rental, Transport } from '../types/types';

const tripsPath = path.join(process.cwd(), 'src', 'data', 'trips.json');
const rentalsPath = path.join(process.cwd(), 'src', 'data', 'rentals.json');
const transportPath = path.join(process.cwd(), 'src', 'data', 'transport.json');

// --- Helpers ---
function readJSON<T>(filePath: string): T[] {
    if (!fs.existsSync(filePath)) return [];
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
}

function writeJSON<T>(filePath: string, data: T[]) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// --- TRIPS ---
export function getTrips(): Trip[] { return readJSON<Trip>(tripsPath); }
export function saveTrip(item: Trip) {
    const items = getTrips();
    const index = items.findIndex(t => t.id === item.id);
    if (index >= 0) items[index] = item; else items.push(item);
    writeJSON(tripsPath, items);
}
export function deleteTrip(id: string) {
    const items = getTrips().filter(t => t.id !== id);
    writeJSON(tripsPath, items);
}

// --- RENTALS ---
export function getRentals(): Rental[] { return readJSON<Rental>(rentalsPath); }
export function saveRental(item: Rental) {
    const items = getRentals();
    const index = items.findIndex(t => t.id === item.id);
    if (index >= 0) items[index] = item; else items.push(item);
    writeJSON(rentalsPath, items);
}
export function deleteRental(id: string) {
    const items = getRentals().filter(t => t.id !== id);
    writeJSON(rentalsPath, items);
}

// --- TRANSPORT ---
export function getTransport(): Transport[] { return readJSON<Transport>(transportPath); }
export function saveTransport(item: Transport) {
    const items = getTransport();
    const index = items.findIndex(t => t.id === item.id);
    if (index >= 0) items[index] = item; else items.push(item);
    writeJSON(transportPath, items);
}
export function deleteTransport(id: string) {
    const items = getTransport().filter(t => t.id !== id);
    writeJSON(transportPath, items);
}
