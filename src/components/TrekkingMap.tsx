'use client';

// Temporarily disabled - requires react-leaflet which is not installed
// Once npm install works, restore from git history

type Coordinate = [number, number];

interface Props {
    start: Coordinate;
    end?: Coordinate;
    route?: Coordinate[];
    zoom?: number;
    height?: string;
}

export default function TrekkingMap({ height = "400px" }: Props) {
    // Placeholder - map disabled until dependencies installed
    return (
        <div
            className="bg-gray-100 dark:bg-gray-800 rounded-xl w-full flex items-center justify-center text-gray-500"
            style={{ height }}
        >
            🗺️ Interactive Map (Coming Soon)
        </div>
    );
}
