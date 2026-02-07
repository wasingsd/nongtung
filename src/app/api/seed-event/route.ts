import { NextResponse } from 'next/server';
import { saveActivity } from '@/lib/firestore-db';
import { Activity } from '@/types/types';

// GET /api/seed-event - Seeds a sample Event with dates
export async function GET() {
    try {
        const now = new Date().toISOString();

        const sampleEvent: Activity = {
            id: 'songkran-splash-party-2024',
            slug: 'songkran-splash-party-2024',
            title: 'Songkran Splash Party 2024',
            subtitle: 'Celebrate Thai New Year with the ultimate water festival experience',
            description: `
                <h2>Join the Biggest Water Festival Celebration!</h2>
                <p>Experience the magic of Songkran with Nongtung Adventure! We're hosting an epic 
                water festival party with traditional Thai celebrations, music, food, and of 
                course – lots of water fun!</p>
                
                <h3>What's Included</h3>
                <p>Our Songkran celebration includes traditional Thai blessings, live music performances, 
                delicious Thai street food, and an unforgettable water fight experience in a safe, 
                organized environment.</p>
                
                <h3>Cultural Experience</h3>
                <p>Learn about the significance of Songkran in Thai culture. Participate in the 
                traditional water blessing ceremony and make merit at our pop-up temple area.</p>
            `,
            excerpt: 'Celebrate Thai New Year with the ultimate Songkran water festival experience in Chiang Mai. Traditional blessings, live music, Thai food, and water fun!',
            coverImage: 'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?auto=format&fit=crop&q=80&w=1600',
            gallery: [
                'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?auto=format&fit=crop&q=80&w=800',
                'https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?auto=format&fit=crop&q=80&w=800'
            ],
            activityType: 'event',
            status: 'upcoming',
            startDate: '2024-04-13',  // Songkran dates
            endDate: '2024-04-15',
            time: '10:00 AM - 10:00 PM',
            location: 'Old City Chiang Mai, Tha Phae Gate Area',
            price: 500,
            priceNote: 'per person',
            keywords: [
                'Songkran Chiang Mai',
                'Thai New Year',
                'water festival Thailand',
                'Songkran party',
                'Thai culture event',
                'Chiang Mai festival'
            ],
            tags: ['Festival', 'Songkran', 'Cultural', 'Party'],
            metaTitle: 'Songkran Splash Party 2024 | Thai New Year Festival Chiang Mai',
            metaDescription: 'Celebrate Songkran Thai New Year with the ultimate water festival party in Chiang Mai. Traditional blessings, live music, Thai food and water fun!',
            relatedTripIds: [],
            maxParticipants: 200,
            currentParticipants: 45,
            highlights: [
                'Traditional Thai New Year blessing ceremony',
                'Live music and DJ performances',
                'Authentic Thai street food vendors',
                'Safe and organized water fight zones',
                'Traditional costume photo booth',
                'Cultural workshops and activities',
                'Free water guns and buckets',
                'Drinks and refreshments included'
            ],
            requirements: 'Wear clothes you don\'t mind getting wet! Waterproof bags available for purchase. Bring a change of clothes. Not recommended for electronic devices.',
            organizer: 'Nongtung Adventure',
            contactInfo: 'https://www.facebook.com/Venturevibecnx',
            createdAt: now,
            updatedAt: now,
        };

        await saveActivity(sampleEvent);

        return NextResponse.json({
            success: true,
            message: 'Songkran event created successfully!',
            activity: {
                slug: sampleEvent.slug,
                title: sampleEvent.title,
                startDate: sampleEvent.startDate,
                endDate: sampleEvent.endDate,
                viewUrl: `/activities/${sampleEvent.slug}`
            }
        });
    } catch (error) {
        console.error('Error seeding event:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to create event' },
            { status: 500 }
        );
    }
}
