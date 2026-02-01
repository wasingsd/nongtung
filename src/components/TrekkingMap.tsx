'use client';

import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect, useState } from 'react';

// Fix for default marker icons in Next.js
const customIcon = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

type Coordinate = [number, number];

interface Props {
    start: Coordinate;
    end?: Coordinate;
    route?: Coordinate[]; // Array of [lat, lng]
    zoom?: number;
    height?: string;
}

export default function TrekkingMap({ start, end, route, zoom = 13, height = "400px" }: Props) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <div className="bg-gray-100 dark:bg-gray-800 animate-pulse rounded-xl w-full" style={{ height }} />;

    return (
        <MapContainer center={start} zoom={zoom} scrollWheelZoom={false} className="rounded-xl z-0 w-full" style={{ height }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Start Marker */}
            <Marker position={start} icon={customIcon}>
                <Popup className="font-sans">📍 Start Point</Popup>
            </Marker>

            {/* End Marker */}
            {end && (
                <Marker position={end} icon={customIcon}>
                    <Popup className="font-sans">🏁 End Point</Popup>
                </Marker>
            )}

            {/* Route Line */}
            {route && <Polyline positions={route} color="#f07d3a" weight={5} opacity={0.8} dashArray="10 10" />}
        </MapContainer>
    );
}
