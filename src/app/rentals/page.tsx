import Card from '@/components/Card';
import { rentals } from '@/lib/data';

export default function RentalsPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Vehicle Rentals</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {rentals.map((rental) => (
                    <Card
                        key={rental.id}
                        id={rental.id}
                        title={rental.name}
                        subtitle={`${rental.type} • ${rental.pricePerDay} THB / Day`}
                        image={rental.image}
                        link={`/rentals`} // Placeholder: No detail page yet
                        badge={rental.type}
                    />
                ))}
            </div>
        </div>
    );
}
