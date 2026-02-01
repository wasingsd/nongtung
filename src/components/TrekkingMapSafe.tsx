'use client';

import dynamic from 'next/dynamic';
import React from 'react';

const TrekkingMap = dynamic(() => import('./TrekkingMap'), {
    ssr: false,
    loading: () => <div className="bg-gray-100 dark:bg-gray-800 animate-pulse rounded-xl w-full h-[400px]" />
});

type Coordinate = [number, number];

interface Props {
    start: Coordinate;
    end?: Coordinate;
    route?: Coordinate[];
    zoom?: number;
    height?: string;
}

export default function TrekkingMapSafe(props: Props) {
    return <TrekkingMap {...props} />;
}
