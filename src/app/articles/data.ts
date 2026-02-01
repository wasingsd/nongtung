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
        title: 'Monk\'s Trail & Hidden Waterfalls: The Authentic Chiang Mai Trekking Guide 🛕',
        excerpt: 'Skip the tourist traps. Discover the spiritual Monk\'s Trail (Wat Pha Lat) and lush hidden waterfalls. A guide for those seeking an authentic connection with Northern Thailand\'s nature.',
        coverImage: 'https://images.unsplash.com/photo-1590497576020-c8fcc1ad7c50?auto=format&fit=crop&q=80&w=1600',
        date: '2025-07-01',
        author: 'Nongtung Local Expert',
        readingTime: '6 min read',
        tags: ['Chiang Mai', 'Trekking', 'Monk\'s Trail'],
        keywords: ['Monk\'s Trail Chiang Mai', 'Wat Pha Lat hike', 'Authentic trekking Chiang Mai', 'Hidden waterfalls Northern Thailand', 'Nature trails Chiang Mai'],
        relatedTripId: 'doi-pui-hike',
        content: `
            <p class="lead">Chiang Mai is a city of layers. There's the ancient city walls, the bustling markets, but peel back the noise, and you find the soul of the north: its green, silent mountains.</p>

            <h2>Why "Authentic" Matters</h2>
            <p>In 2025, travel isn't about ticking boxes. It's about connection. The trails we recommend aren't just paths; they are historic routes used by monks, hill tribes, and locals for centuries.</p>

            <h2>1. The Monk's Trail (Wat Pha Lat) - A Spiritual Ascent</h2>
            <p>This path (known locally as "Palaad" trail) is the highlight of Doi Suthep, yet many swift past it. It’s a gentle 45-minute hike that ends at <strong>Wat Pha Lat</strong>, a temple that blends into the jungle and waterfall. No gold chedis screaming for attention—just pure zen.</p>
            <ul>
                <li><strong>Best Time:</strong> 6:00 AM for the monks' alms atmosphere.</li>
                <li><strong>Difficulty:</strong> Beginner-friendly but humid.</li>
            </ul>

            <h2>2. Doi Pui Summit - The Roof of the City</h2>
            <p>Want cooler air? Head higher. Doi Pui offers an escape from the city heat with temperatures often 10 degrees cooler. It's lush, green, and smells like pine forests.</p>

            <blockquote>
                "Walk where the locals walk, eat where the locals eat. That's the Nongtung way."
            </blockquote>
        `
    },
    {
        slug: 'why-rent-private-van-chiang-mai',
        title: 'Why Private Van Rental is the Best Way to Explore Northern Thailand 🚐',
        excerpt: 'Planning a road trip to Pai or Chiang Rai? Forget the crowded buses. Here is why renting a private van with a driver is the smartest travel hack for your group.',
        coverImage: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=1600',
        date: '2025-07-05',
        author: 'Nongtung Logistics',
        readingTime: '5 min read',
        tags: ['Transport', 'Road Trip', 'Van Rental'],
        keywords: ['Rent a van Chiang Mai', 'Private driver Northern Thailand', 'Chiang Mai to Pai transport', 'Van rental with driver', 'VIP Van Chiang Mai'],
        relatedRentalId: 'commuter-van',
        content: `
            <p class="lead">The road to Pai features 762 legendary curves. Navigating them yourself? Stressful. Being driven in a VIP van with reclining seats? Bliss.</p>

            <h2>Freedom & Safety Combined</h2>
            <p>Northern Thailand's roads are stunning but technically demanding. Our fleet of <strong>Toyota Commuters</strong> comes with experienced drivers who know every hairpin turn on Highway 1095.</p>

            <h2>Cost-Effective for Groups</h2>
            <p>If you're traveling with 4+ friends, a private van often costs less per person than separate flights or VIP bus tickets, plus you get door-to-door service.</p>
        `
    },
    {
        slug: 'ultimate-glamping-experience-doi-inthanon',
        title: 'Eco-Friendly Glamping: Sustainable Luxury in Doi Inthanon 🌿',
        excerpt: 'Experience the "Sea of Mist" without leaving your carbon footprint. Our guide to sustainable glamping in Northern Thailand combines luxury with eco-consciousness.',
        coverImage: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&q=80&w=1600',
        date: '2025-07-10',
        author: 'Nongtung Eco Team',
        readingTime: '6 min read',
        tags: ['Glamping', 'Sustainable Travel', 'Doi Inthanon'],
        keywords: ['Eco glamping Chiang Mai', 'Sustainable travel Thailand', 'Doi Inthanon camping', 'Luxury tent Chiang Mai', 'Green travel Northern Thailand'],
        relatedTripId: 'inthanon-camp',
        content: `
            <p class="lead">Luxury doesn't have to cost the Earth. At Nongtung, we believe in "Leave No Trace" camping—but that doesn't mean you can't have a comfortable mattress.</p>

            <h2>The Rise of Green Glamping</h2>
            <p>Doi Inthanon, the roof of Thailand, is fragile. Our partner campsites focus on solar power, waste reduction, and supporting local hill tribe communities. You get the view, the "Mookata" dinner, and the peace of mind.</p>

            <h2>What Makes it Special?</h2>
            <ul>
                <li><strong>Temperature:</strong> Single digits in winter (bring layers!).</li>
                <li><strong>The View:</strong> Waking up above the cloud layer is an experience that stays with you forever.</li>
                <li><strong>Local Connection:</strong> Ingredients for your BBQ are sourced from the Royal Project nearby.</li>
            </ul>
        `
    },
    // --- New Thai Strategy Articles ---
    {
        slug: 'ultimate-trekking-guide-chiang-mai-2025',
        title: 'คู่มือเดินป่าเชียงใหม่ 2025: ครบทุกเส้นทาง สายลุยห้ามพลาด! ⛰️',
        excerpt: 'อัปเดตล่าสุดเส้นทางเดินป่าดอยสุเทพ-ดอยปุย และม่อนแจ่ม ฉบับคนท้องถิ่นพาเที่ยว จอยทริปยังไงให้สนุก เตรียมตัวยังไงไม่ให้เฟล',
        coverImage: 'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?auto=format&fit=crop&q=80&w=1600',
        date: '2025-08-01',
        author: 'Nongtung Local Guide',
        readingTime: '8 min read',
        tags: ['เดินป่า', 'เชียงใหม่', 'Trekking'],
        keywords: ['เดินป่าเชียงใหม่', 'จอยทริปเดินป่า', 'ดอยสุเทพ', 'เดินป่าดอยปุย', 'ที่เที่ยวธรรมชาติเชียงใหม่ 2568'],
        relatedTripId: 'doi-suthep-hike',
        content: `
            <p class="lead">ปี 2025 แล้ว ใครที่ยังไม่เคยสัมผัสป่าหน้าฝนเชียงใหม่ บอกเลยว่าพลาด! น่องตึงขอเปิดคัมภีร์เส้นทางเดินป่าฉบับคนพื้นที่</p>

            <h2>ทำไมต้อง "ดอยปุย"?</h2>
            <p>หลายคนรู้จักแค่ดอยสุเทพ แต่เลยขึ้นไปอีกนิดคือ <strong>ดอยปุย</strong> ที่มีป่าสนสามใบเหมือนเมืองนอก อากาศเย็นตลอดปี และเส้นทางเดินที่ไม่โหดจนเกินไป เหมาะสำหรับมือใหม่ที่ใจพร้อม</p>

            <h2>Join Trip vs Private Trip?</h2>
            <p>ถ้ามาคนเดียวหรือมาเป็นคู่ <strong>Join Trip</strong> คือคำตอบ ได้เพื่อนใหม่ ได้Connection แต่ถ้ามาเป็นแก๊งออฟฟิศ <strong>Private Trip</strong> จะตอบโจทย์กว่าเพราะกำหนดเวลาเองได้</p>
        `
    },
    {
        slug: 'chiang-mai-camping-gear-rental-guide',
        title: 'เช่าอุปกรณ์แคมป์ปิ้งเชียงใหม่: สะอาด ครบ จบที่เดียว (K2, Coleman Available) ⛺',
        excerpt: 'ไม่ต้องแบกให้หนัก! บริการเช่าเต็นท์และอุปกรณ์เดินป่าเกรดพรีเมียมในเชียงใหม่ สะอาดเหมือนใหม่ ผ่านการฆ่าเชื้อทุกครั้งก่อนส่งมอบ',
        coverImage: 'https://images.unsplash.com/photo-1496545672479-df5c1505e101?auto=format&fit=crop&q=80&w=1600',
        date: '2025-08-05',
        author: 'Nongtung Rental',
        readingTime: '4 min read',
        tags: ['เช่าเต็นท์', 'อุปกรณ์แคมป์ปิ้ง', 'Rental'],
        keywords: ['เช่าเต็นท์เชียงใหม่', 'ร้านเช่าอุปกรณ์เดินป่า', 'เช่าเต็นท์ K2', 'Coleman เชียงใหม่', 'เช่าพัดลมแคมป์ปิ้ง'],
        relatedRentalId: 'tent-family-set',
        content: `
            <p class="lead">จะขึ้นดอยทั้งที อุปกรณ์ต้องพร้อม! แต่จะซื้อใหม่ทั้งชุดก็แพง แถมรกบ้าน น่องตึงจัดให้ด้วยบริการเช่าอุปกรณ์แคมป์ปิ้งที่ "สะอาด" ที่สุดในเชียงใหม่</p>

            <h2>ความสะอาดคือหัวใจของเรา</h2>
            <p>เราเข้าใจว่าการนอนถุงนอนร่วมกับคนอื่นดูน่ากลัว เราจึงซักและอบฆ่าเชื้ออุปกรณ์ทุกชิ้น 100% หลังใช้งาน มั่นใจได้ว่าหอม สะอาด ปลอดภัย</p>

            <h2>แบรนด์ดังมีให้เลือกครบ</h2>
            <ul>
                <li><strong>สายลุย:</strong> เต็นท์เดินป่าเบาพิเศษ</li>
                <li><strong>สายครอบครัว:</strong> K2, Coleman หลังใหญ่ ยืนในเต็นท์ได้สบาย</li>
                <li><strong>สายพร็อพ:</strong> เก้าอี้ Kermit, โต๊ะไม้ Roll table ถ่ายรูปสวยแน่นอน</li>
            </ul>
        `
    },
    {
        slug: 'corporate-outing-teambuilding-chiang-mai',
        title: 'จัด Outing เชียงใหม่ยังไงให้พนักงาน Love? ไอเดีย Teambuilding เชิงผจญภัย 🤝',
        excerpt: 'ลืมการละลายพฤติกรรมในห้องแอร์ไปได้เลย พาพนักงานและผู้บริหารมาเปิดประสบการณ์ใหม่กับกิจกรรม Adventure ที่ทั้งปลอดภัยและได้สาระ',
        coverImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1600',
        date: '2025-08-10',
        author: 'Nongtung Corporate',
        readingTime: '6 min read',
        tags: ['Corporate', 'Teambuilding', 'Outing'],
        keywords: ['รับจัด outing เชียงใหม่', 'Teambuilding เชียงใหม่', 'กิจกรรมบริษัท', 'Company trip Northern Thailand', 'ท่องเที่ยวประจำปีบริษัท'],
        relatedTripId: 'corporate-package',
        content: `
            <p class="lead">HR กำลังปวดหัวกับการหาที่เที่ยวประจำปีอยู่หรือเปล่า? ลองเปลี่ยนบรรยากาศมาเป็น "Adventure Teambuilding" ในป่าเชียงใหม่ดูไหม?</p>

            <h2>Adventure Based Learning (ABL)</h2>
            <p>การเดินป่าด้วยกันคือการสร้าง Teamwork ที่ดีที่สุด เมื่อเพื่อนร่วมงานต้องช่วยกันข้ามลำธาร หรือแบ่งปันน้ำดื่ม กำแพงระหว่างแผนกจะพังทลายลงเองโดยธรรมชาติ</p>

            <h2>Safety & Professionalism</h2>
            <p>เราเชี่ยวชาญการดูแลกรุ๊ปองค์กร มีไกด์ดูแลประกบ 1:5 พร้อมประกันอุบัติเหตุและพยาบาล Standby มั่นใจได้ในมาตรฐานความปลอดภัยระดับสากล</p>
        `
    }
];
