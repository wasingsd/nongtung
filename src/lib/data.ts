import { Trip, Rental, Transport, Article } from '@/types/types';

export const trips: Trip[] = [
    {
        id: '1',
        title: 'Amazing Chiang Mai Adventure',
        description: 'Explore the mountains and temples of Chiang Mai in this 3-day immersive tour.',
        price: 5900,
        duration: '3 Days',
        images: ['https://images.unsplash.com/photo-1598226023348-18e00cb101a9?q=80&w=1000&auto=format&fit=crop'],
        location: 'Chiang Mai, Thailand',
        highlights: ['Doi Suthep Temple', 'Elephant Sanctuary', 'Night Bazaar']
    },
    {
        id: '2',
        title: 'Phuket Island Hopping',
        description: 'Visit the most beautiful islands around Phuket, including Phi Phi and James Bond Island.',
        price: 4500,
        duration: '1 Day',
        images: ['https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?q=80&w=1000&auto=format&fit=crop'],
        location: 'Phuket, Thailand',
        highlights: ['Phi Phi Islands', 'Snorkeling', 'Speedboat Ride']
    },
    {
        id: '3',
        title: 'Bangkok City Culture',
        description: 'Discover the hidden gems of Bangkok, from ancient temples to modern rooftop bars.',
        price: 2500,
        duration: '1 Day',
        images: ['https://images.unsplash.com/photo-1563492065599-3520f775eeed?q=80&w=1000&auto=format&fit=crop'],
        location: 'Bangkok, Thailand',
        highlights: ['Grand Palace', 'Chinatown', 'Street Food']
    }
];

export const rentals: Rental[] = [
    {
        id: '1',
        name: 'Honda City',
        type: 'Car',
        pricePerDay: 1200,
        image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=1000&auto=format&fit=crop',
        features: ['Automatic', 'GPS', 'Bluetooth'],
        capacity: 4
    },
    {
        id: '2',
        name: 'Toyota Commuter',
        type: 'Van',
        pricePerDay: 2500,
        image: 'https://images.unsplash.com/photo-1559416523-140ddc3d238c?q=80&w=1000&auto=format&fit=crop',
        features: ['Manual', '9 Seats', 'Large Luggage Space'],
        capacity: 9
    },
    {
        id: '3',
        name: 'Honda Scoopy',
        type: 'Bike',
        pricePerDay: 300,
        image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=1000&auto=format&fit=crop',
        features: ['Automatic', 'Helmet included'],
        capacity: 2
    }
];

export const transports: Transport[] = [
    {
        id: '1',
        type: 'Van',
        route: 'Bangkok - Pattaya',
        price: 300,
        departureTime: '10:00 AM',
        image: 'https://images.unsplash.com/photo-1570125909232-eb2be79a1c74?q=80&w=1000&auto=format&fit=crop'
    },
    {
        id: '2',
        type: 'Train',
        route: 'Bangkok - Chiang Mai',
        price: 900,
        departureTime: '08:00 PM',
        image: 'https://images.unsplash.com/photo-1527684651001-73604f5e7144?q=80&w=1000&auto=format&fit=crop'
    }
];

export const articles: Article[] = [
    {
        id: '1',
        slug: 'top-10-street-foods',
        title: 'Top 10 Street Foods in Bangkok',
        summary: 'A guide to the best delicious street food you must try in Bangkok.',
        content: `
      <h2>1. Pad Thai</h2>
      <p>The classic Thai stir-fried noodle dish.</p>
      <h2>2. Som Tum</h2>
      <p>Spicy green papaya salad.</p>
      <p>Bangkok's street food scene is legendary...</p>
    `,
        coverImage: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1000&auto=format&fit=crop',
        author: 'Foodie Jane',
        publishedAt: '2024-01-15'
    },
    {
        id: '2',
        slug: 'hidden-temples',
        title: 'Hidden Temples of the North',
        summary: 'Discover the serene and less crowded temples in Northern Thailand.',
        content: '<p>While the White Temple is famous, there are many others...</p>',
        coverImage: 'https://images.unsplash.com/photo-1528181304800-259b08848526?q=80&w=1000&auto=format&fit=crop',
        author: 'Travel Tom',
        publishedAt: '2024-02-10'
    }
];
