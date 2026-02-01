'use client';

// Map temporarily disabled - react-leaflet not installed
type Coordinate = [number, number];

interface Props {
    start: Coordinate;
    end?: Coordinate;
    route?: Coordinate[];
    zoom?: number;
    height?: string;
}

export default function TrekkingMap({ height = "400px" }: Props) {
    return (
        <div
            className="bg-gray-200 rounded-xl w-full flex items-center justify-center text-gray-500"
            style={{ height }}
        >
            🗺️ Interactive Map
        </div>
    );
}
