import { NextResponse } from 'next/server';
import { saveActivity } from '@/lib/firestore-db';
import { Activity } from '@/types/types';

// GET /api/seed-enduro - Seeds the Enduro activity
export async function GET() {
    try {
        const now = new Date().toISOString();

        const enduroActivity: Activity = {
            id: 'enduro-samoeng-farm',
            slug: 'enduro-samoeng-farm',
            title: 'Enduro Adventure at Samoeng Farm',
            subtitle: 'Experience thrilling off-road riding through scenic Samoeng countryside',
            description: `
                <h2>The Ultimate Enduro Experience</h2>
                <p>Take on the challenging terrain of Samoeng's beautiful farmland on our premium Enduro motorcycles. 
                Whether you're a beginner or experienced rider, our professional guides will ensure you have an 
                unforgettable adventure through rice paddies, jungle trails, and mountain paths.</p>
                
                <h3>What to Expect</h3>
                <p>Our Enduro adventure takes you through some of the most beautiful scenery in Northern Thailand. 
                Ride through traditional farming villages, cross streams, navigate rocky paths, and enjoy the 
                stunning views of the Samoeng Valley surrounded by lush green mountains.</p>
                
                <h3>Professional Instruction</h3>
                <p>All skill levels are welcome! Our experienced instructors will provide comprehensive 
                safety briefing and riding techniques before hitting the trails. We'll match the difficulty 
                level to your experience, ensuring a safe yet exciting ride.</p>
                
                <h3>Equipment Provided</h3>
                <p>All necessary gear is included - helmet, boots, gloves, and protective equipment. 
                We use well-maintained Enduro bikes suitable for off-road adventures.</p>
            `,
            excerpt: 'Experience thrilling Enduro off-road motorcycle adventure through the scenic Samoeng farmland in Chiang Mai. Professional guides, all equipment included, suitable for all skill levels.',
            coverImage: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=1600',
            gallery: [
                'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=800',
                'https://images.unsplash.com/photo-1568772585407-9361bd954f31?auto=format&fit=crop&q=80&w=800',
                'https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&q=80&w=800'
            ],
            activityType: 'tour',
            status: 'ongoing',
            startDate: '',  // Always available
            endDate: '',
            time: 'Daily 8:00 AM - 5:00 PM',
            location: 'Samoeng Farm, Samoeng District, Chiang Mai',
            price: 3500,
            priceNote: 'per person',
            keywords: [
                'Enduro Chiang Mai',
                'off-road motorcycle Thailand',
                'Samoeng adventure',
                'dirt bike tour',
                'motorbike adventure Chiang Mai',
                'enduro tour Thailand',
                'Samoeng farm',
                'motorcycle adventure'
            ],
            tags: ['Enduro', 'Motorcycle', 'Adventure', 'Off-road', 'Samoeng'],
            metaTitle: 'Enduro Adventure Samoeng Farm | Off-Road Motorcycle Tour Chiang Mai',
            metaDescription: 'Thrilling Enduro off-road motorcycle adventure in Samoeng, Chiang Mai. Professional guides, all equipment included. Book your dirt bike tour today!',
            relatedTripIds: [],
            maxParticipants: 8,
            currentParticipants: 0,
            highlights: [
                'Professional Enduro motorcycles provided',
                'Full safety gear included (helmet, boots, gloves, body armor)',
                'Experienced English-speaking guides',
                'Scenic trails through Samoeng Valley',
                'Suitable for beginners and experienced riders',
                'Lunch and refreshments included',
                'Photo opportunities at stunning viewpoints',
                'Small group size (max 8 riders)'
            ],
            requirements: 'Valid motorcycle license or experience riding motorcycles. Minimum age 18 years. Closed-toe shoes, long pants, and comfortable clothing recommended. We provide all protective gear.',
            organizer: 'Nongtung Adventure',
            contactInfo: 'https://www.facebook.com/Venturevibecnx',
            createdAt: now,
            updatedAt: now,
        };

        await saveActivity(enduroActivity);

        return NextResponse.json({
            success: true,
            message: 'Enduro activity created successfully!',
            activity: {
                slug: enduroActivity.slug,
                title: enduroActivity.title,
                viewUrl: `/activities/${enduroActivity.slug}`
            }
        });
    } catch (error) {
        console.error('Error seeding Enduro activity:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to create activity' },
            { status: 500 }
        );
    }
}
