export interface Article {
    slug: string;
    title: string;
    excerpt: string;
    coverImage: string;
    date: string;
    author: string;
    readingTime: string;
    tags: string[];
    keywords: string[]; // For SEO meta tags
    content: string; // HTML or Markdown content
    relatedTripId?: string; // ID of the trip to promote
    relatedRentalId?: string; // ID of the rental item to promote
}

export const articles: Article[] = [
    {
        slug: 'top-5-trails-chiang-mai',
        title: 'รวม 5 เส้นทางเดินป่าเชียงใหม่ ที่สายธรรมชาติต้องไปสักครั้ง 🌲',
        excerpt: 'เชียงใหม่ไม่ได้มีแค่ดอยอินทนนท์! มาค้นพบ 5 เส้นทางเทรลลับๆ ที่จะพาคุณไปสัมผัสธรรมชาติแบบ Exclusive พร้อมคำแนะนำสำหรับมือใหม่',
        coverImage: 'https://images.unsplash.com/photo-1533227297464-9d5d1e21b77d?auto=format&fit=crop&q=80&w=1600',
        date: '2025-06-15',
        author: 'Nongtung Team',
        readingTime: '5 min read',
        tags: ['Chiang Mai', 'Trekking', 'Nature'],
        keywords: ['เดินป่าเชียงใหม่', 'เส้นทางศึกษาธรรมชาติ', 'ดอยเชียงใหม่', 'Trekking Chiang Mai', 'เที่ยวเชียงใหม่หน้าฝน'],
        relatedTripId: 'chiang-dao-hike', // Ensure this matches a real trip ID later
        content: `
            <p class="lead">เชียงใหม่... จังหวัดที่ใครๆ ก็ตกหลุมรัก แต่ถ้าคุณเป็นสายลุยที่เบื่อคาเฟ่ แล้วอยากเซไปหาเขา วันนี้ <strong>Nongtung</strong> ขอแนะนำ 5 เส้นทางเดินป่าที่คุณไม่ควรพลาด!</p>

            <h2>1. ดอยหลวงเชียงดาว - ยอดเขาที่สูงเป็นอันดับ 3 ของไทย</h2>
            <p>เส้นทางในฝันของนักเดินป่าทุกคน ดอกไม้ป่าหายากและวิวทะเลหมอกแบบ 360 องศา คือรางวัลของความเหนื่อยยาก</p>
            <ul>
                <li><strong>ระดับความยาก:</strong> ปานกลาง - ยาก</li>
                <li><strong>ไฮไลท์:</strong> ดอกเทียนนกแก้ว และกวางผา</li>
            </ul>

            <h2>2. กิ่วแม่ปาน - สัมผัสป่าเมฆ</h2>
            <p>เดินง่าย อากาศเย็นตลอดปี เหมาะสำหรับมือใหม่ที่อยากเริ่มเดินเทรล</p>

            <h2>3. เส้นทางผาดอกเสี้ยว - ตามรอยรักจัง</h2>
            <p>เดินผ่านนาขั้นบันไดและน้ำตกสวยๆ สัมผัสวิถีชีวิตชาวปกากะญอ</p>
            
            <blockquote>
                "การเดินป่าไม่ใช่แค่การพิชิตยอดเขา แต่คือการเอาชนะใจตัวเอง"
            </blockquote>

            <h2>เตรียมตัวอย่างไรก่อนไปเดินป่า?</h2>
            <p>1. <strong>รองเท้าที่เหมาะสม:</strong> ควรเป็นรองเท้าผ้าใบหรือรองเท้าเดินป่าที่มีดอกยางลึก<br>
            2. <strong>น้ำดื่ม:</strong> สำคัญมาก ควรพกไปอย่างน้อย 1.5 ลิตร<br>
            3. <strong>ใจที่พร้อมลุย:</strong> เตรียมตัวเหนื่อย แต่รับรองว่าคุ้มค่าแน่นอน</p>
        `
    },
    {
        slug: 'camping-101-beginner-guide',
        title: 'มือใหม่หัดแคมป์? เตรียมตัวอย่างไรเมื่อไปนอนป่าครั้งแรก ⛺',
        excerpt: 'อยากลองนอนเต็นท์ดูสักครั้งแต่ไม่รู้จะเริ่มยังไง? เช็คลิสต์อุปกรณ์ที่ต้องมี และเทคนิคการเลือกทำเลกางเต็นท์สำหรับมือใหม่',
        coverImage: 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&q=80&w=1600',
        date: '2025-06-20',
        author: 'Camp Master',
        readingTime: '7 min read',
        tags: ['Camping', 'Tips', 'Gear'],
        keywords: ['กางเต็นท์มือใหม่', 'อุปกรณ์แคมป์ปิ้ง', 'จุดกางเต็นท์เชียงใหม่', 'เช่าเต็นท์เชียงใหม่'],
        relatedRentalId: 'tent-k2', // Ensure this matches a real rental ID later
        content: `
            <p>การนอนฟังเสียงธรรมชาติและตื่นมาดูพระอาทิตย์ขึ้นหน้าเต็นท์ คือเสน่ห์ที่ทำให้ใครหลายคนถอนตัวไม่ขึ้นจากการแคมป์ปิ้ง</p>
            
            <h2>3 สิ่งที่ต้องมี (The Must Haves)</h2>
            <ol>
                <li><strong>เต็นท์ที่ดี:</strong> ต้องกันน้ำและระบายอากาศได้ดี (ถ้าไม่อยากซื้อ เช่ากับเราได้นะ!)</li>
                <li><strong>ถุงนอน:</strong> อากาศบนดอยตอนกลางคืนหนาวกว่าที่คุณคิด</li>
                <li><strong>ไฟฉาย:</strong> จำเป็นมากเมื่อต้องลุกไปเข้าห้องน้ำตอนดึก</li>
            </ol>
            
            <h2>เลือกทำเลกางเต็นท์อย่างไร?</h2>
            <p>ให้เลือกพื้นที่ราบเรียบ ไม่ลาดเอียง และที่สำคัญ <strong>ห้ามกางใกล้ทางน้ำไหล</strong> เด็ดขาด เพราะอาจเกิดน้ำป่าไหลหลากได้</p>
        `
    },
    {
        slug: 'hidden-gems-chiang-mai-trekking',
        title: 'Hidden Gems of Chiang Mai: A Trekking Guide for Nature Lovers 🥾',
        excerpt: 'Chiang Mai is not just about temples. Discover the lush jungles, hidden waterfalls, and serene trails that most tourists miss. Here is my local guide to the best treks.',
        coverImage: 'https://images.unsplash.com/photo-1504214208698-ea1916a2195a?auto=format&fit=crop&q=80&w=1600',
        date: '2025-07-01',
        author: 'Nongtung Team',
        readingTime: '6 min read',
        tags: ['Chiang Mai', 'Trekking', 'Travel Guide'],
        keywords: ['Chiang Mai trekking', 'Hiking Northern Thailand', 'Hidden waterfalls Chiang Mai', 'Best jungle trails Thailand', 'Eco tourism Chiang Mai'],
        relatedTripId: 'doi-pui-hike',
        content: `
            <p class="lead">Hey there, fellow adventurer! If you're reading this, you probably love the smell of pine forests and the sound of crunching leaves under your boots just as much as I do. Chiang Mai is famous for its old city, but the <em>real</em> magic happens when you step out of the Grab and into the green.</p>

            <h2>Why Trek in Chiang Mai?</h2>
            <p>Unlike the southern islands, Northern Thailand offers a cool, misty climate (especially in "winter" from Nov-Feb) and biodiversity that will blow your mind. You're not just walking; you're exploring ancient hill tribe paths, coffee plantations, and cloud forests.</p>

            <h2>1. The Monk's Trail (Wat Pha Lat)</h2>
            <p>If you have just a morning to spare, this is it. It's a spiritual journey up the mountain that monks used to take to reach the temple. <br>
            <strong>Difficulty:</strong> Easy-Moderate<br>
            <strong>Vibe:</strong> Peaceful, meditative, and green.</p>

            <h2>2. Doi Inthanon Kew Mae Pan Nature Trail</h2>
            <p>Okay, this one is popular, but for a reason. Walking along the ridge with the clouds BELOW you? Unbeatable.</p>

            <h2>My Personal Tips for You</h2>
            <ul>
                <li><strong>Start Early:</strong> I mean 6 AM early. You beat the heat and the crowds.</li>
                <li><strong>Leech Socks?</strong> In rainy season (July-Oct), yes. You'll thank me later.</li>
                <li><strong>Respect the Locals:</strong> Many trails pass through hill tribe villages. A smile and a "Sawasdee" go a long way.</li>
            </ul>
        `
    },
    {
        slug: 'why-rent-private-van-chiang-mai',
        title: 'Why Private Van Rental is the Best Way to Explore Northern Thailand 🚐',
        excerpt: 'Planning a road trip to Pai or Chiang Rai? Forget the crowded buses. Here is why renting a private van with a driver is the smartest travel hack for your group.',
        coverImage: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=1600',
        date: '2025-07-05',
        author: 'Nongtung Local Expert',
        readingTime: '5 min read',
        tags: ['Transport', 'Road Trip', 'Travel Tips'],
        keywords: ['Rent a van Chiang Mai', 'Private driver Northern Thailand', 'Chiang Mai to Pai transport', 'Van rental with driver', 'Group travel Thailand'],
        relatedRentalId: 'commuter-van',
        content: `
            <p class="lead">Let's be real. The road to Pai has 762 curves. Do you really want to be driving that yourself, or bouncing around in the back of a motion-sickness-inducing public minivan?</p>

            <h2>Freedom Like Never Before</h2>
            <p>Renting a private van isn't just about luxury; it's about <strong>freedom</strong>. Want to stop at that cute strawberry farm? Go for it. Need a bathroom break <em>now</em>? Done. You control the playlist and the pace.</p>

            <h2>Safety First (Seriously)</h2>
            <p>Northern Thailand's roads are beautiful but tricky. Steep gradients and sharp hairpins are the norm. Our drivers at Nongtung drive these roads every single day. They know every pothole and every viewpoint.</p>

            <h2>Is it Worth the Cost?</h2>
            <p>If you are a group of 4-9 people, absolutely.</p>
            <ul>
                <li><strong>Cost per person:</strong> Often similar to buying multiple bus/plane tickets.</li>
                <li><strong>Comfort:</strong> AC, reclining seats, and room for all your luggage (yes, even that extra suitcase).</li>
            </ul>
            <p>Trust me, being able to nap comfortably between destinations changes your entire trip energy.</p>
        `
    },
    {
        slug: 'ultimate-glamping-experience-doi-inthanon',
        title: 'Camping Under the Stars: The Ultimate Glamping Experience in Doi Inthanon ✨',
        excerpt: 'Imagine waking up to a sea of mist right outside your tent. Glamping in Northern Thailand combines raw nature with the comfort you deserve.',
        coverImage: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&q=80&w=1600',
        date: '2025-07-10',
        author: 'Nongtung Team',
        readingTime: '6 min read',
        tags: ['Camping', 'Glamping', 'Doi Inthanon'],
        keywords: ['Glamping Chiang Mai', 'Camping Doi Inthanon', 'Luxury camping Thailand', 'Best camping spots Northern Thailand', 'Sea of mist Chiang Mai'],
        relatedTripId: 'inthanon-camp',
        content: `
            <p class="lead">Camping used to mean back pain and instant noodles. Not anymore. Welcome to the world of Glamping (Glamorous Camping) in the mountains of Chiang Mai.</p>

            <h2>What to Expect?</h2>
            <p>Picture this: You arrive at your campsite as the sun sets, painting the sky in purple and orange. Your tent? It's huge. Inside, there's a real mattress, cozy blankets, and fairy lights.</p>

            <h2>The "Mookata" Dinner</h2>
            <p>No camping trip in Thailand is complete without <strong>Mookata</strong> (Thai BBQ). Grilling pork belly on a hot pan while the mountain air chills your nose... it's a core memory waiting to happen.</p>

            <h2>Waking Up to the Mist</h2>
            <p>The best part isn't the night; it's the morning. Around 6 AM, you unzip your tent and—boom. You're above the clouds. The famous "Sea of Mist" (Talay Mok) is right there.</p>

            <h2>What to Pack?</h2>
            <ul>
                <li><strong>Warm Jacket:</strong> Yes, it gets COLD (single digits °C).</li>
                <li><strong>Power Bank:</strong> For all the photos you'll take.</li>
                <li><strong>Beanie/Hat:</strong> Keeps you cozy during the BBQ.</li>
            </ul>
        `
    }
];
