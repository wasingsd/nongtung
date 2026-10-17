const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '..', 'src', 'app', '(site)', '[lang]', 'articles', 'data.ts');
let content = fs.readFileSync(dataFilePath, 'utf8');

// 1. top-5-trails-chiang-mai
content = content.replace(
  `        slug: 'top-5-trails-chiang-mai',
        title: 'รวม 5 เส้นทางเดินป่าเชียงใหม่ ที่สายธรรมชาติต้องไปสักครั้ง 🌲 (ฉบับอัปเดต 2025)',
        excerpt: 'เชียงใหม่ไม่ได้มีแค่ดอยอินทนนท์! มาค้นพบ 5 เส้นทางเทรลลับๆ ที่จะพาคุณไปสัมผัสธรรมชาติแบบ Exclusive พร้อมคำแนะนำสำหรับมือใหม่ ระดับความยาก และช่วงเวลาที่เหมาะสมที่สุด',
        coverImage: '/videos/reel-2-cover.jpg',
        subImages: [
            {
                id: 'sub-1',
                url: '/videos/reel-1-cover.jpg',
                caption: 'จุดชมวิวทะเลหมอกยามเช้า ดอยหลวงเชียงดาว ทัศนียภาพกึ่งอัลไพน์',
                position: 'mid'
            },
            {
                id: 'sub-2',
                url: '/videos/reel-3-cover.jpg',
                caption: 'เส้นทางเดินป่าดึกดำบรรพ์ กิ่วแม่ปาน ดอยอินทนนท์',
                position: 'mid'
            },
            {
                id: 'sub-3',
                url: '/videos/reel-4-cover.jpg',
                caption: 'บรรยากาศแคมป์ปิ้งกางเต็นท์ริมลำธาร อากาศเย็นสบายตลอดปี',
                position: 'bottom'
            },
            {
                id: 'sub-4',
                url: '/videos/reel-2-cover.jpg',
                caption: 'วิวทิวทัศน์ 360 องศา สันเขายอดดอยปุย เชียงใหม่',
                position: 'bottom'
            }
        ],`,
  `        slug: 'top-5-trails-chiang-mai',
        title: 'รวม 5 เส้นทางเดินป่าเชียงใหม่ ที่สายธรรมชาติต้องไปสักครั้ง 🌲 (ฉบับอัปเดต 2025)',
        excerpt: 'เชียงใหม่ไม่ได้มีแค่ดอยอินทนนท์! มาค้นพบ 5 เส้นทางเทรลลับๆ ที่จะพาคุณไปสัมผัสธรรมชาติแบบ Exclusive พร้อมคำแนะนำสำหรับมือใหม่ ระดับความยาก และช่วงเวลาที่เหมาะสมที่สุด',
        coverImage: '/images/articles/chiang-dao-summit.jpg',
        subImages: [
            {
                id: 'sub-1',
                url: '/images/fb/real-fb-5.jpg',
                caption: 'จุดชมวิวทะเลหมอกยามเช้า ดอยหลวงเชียงดาว ทัศนียภาพกึ่งอัลไพน์',
                position: 'mid'
            },
            {
                id: 'sub-2',
                url: '/images/articles/kew-mae-pan-boardwalk.jpg',
                caption: 'เส้นทางสะพานไม้และป่าเมฆดึกดำบรรพ์ กิ่วแม่ปาน ดอยอินทนนท์',
                position: 'mid'
            },
            {
                id: 'sub-3',
                url: '/images/articles/pha-dok-siew-waterfall.jpg',
                caption: 'น้ำตกผาดอกเสี้ยว (น้ำตกรักจัง) และนาข้าวขั้นบันไดแม่กลางหลวง',
                position: 'bottom'
            },
            {
                id: 'sub-4',
                url: '/images/articles/monks-trail-wat-pha-lat.jpg',
                caption: 'เส้นทางเดินป่าแสวงบุญ Monk’s Trail และวัดผาลาดกลางป่าดอยสุเทพ',
                position: 'bottom'
            }
        ],`
);

// 2. camping-101-beginner-guide
content = content.replace(
  `        slug: 'camping-101-beginner-guide',
        title: 'มือใหม่หัดแคมป์? คู่มือเตรียมตัวและอุปกรณ์ฉบับครบจบในที่เดียว ⛺',
        excerpt: 'อยากลองนอนเต็นท์ดูสักครั้งแต่ไม่รู้จะเริ่มยังไง? สรุป Checklist อุปกรณ์ที่ต้องมี วิธีเลือกทำเลกางเต็นท์ และเทคนิคการเอาตัวรอดในคืนแรก',
        coverImage: '/videos/reel-1-cover.jpg',`,
  `        slug: 'camping-101-beginner-guide',
        title: 'มือใหม่หัดแคมป์? คู่มือเตรียมตัวและอุปกรณ์ฉบับครบจบในที่เดียว ⛺',
        excerpt: 'อยากลองนอนเต็นท์ดูสักครั้งแต่ไม่รู้จะเริ่มยังไง? สรุป Checklist อุปกรณ์ที่ต้องมี วิธีเลือกทำเลกางเต็นท์ และเทคนิคการเอาตัวรอดในคืนแรก',
        coverImage: '/images/articles/camping-tent-setup.jpg',
        subImages: [
            {
                id: 'camp-sub-1',
                url: '/images/articles/camping-gear-rental.jpg',
                caption: 'อุปกรณ์จำเป็นสำหรับมือใหม่: เต็นท์ แผ่นรองนอน และเก้าอี้สนาม',
                position: 'mid'
            },
            {
                id: 'camp-sub-2',
                url: '/images/articles/campfire-evening.jpg',
                caption: 'บรรยากาศแคมป์ปิ้งรอบกองไฟ และการปฏิบัติตามมารยาท Leave No Trace',
                position: 'bottom'
            }
        ],`
);

// 3. hidden-gems-chiang-mai-trekking
content = content.replace(
  `        slug: 'hidden-gems-chiang-mai-trekking',
        title: 'Monk\\'s Trail & Hidden Waterfalls: The Authentic Chiang Mai Trekking Guide 🛕',
        excerpt: 'Skip the tourist traps. Discover the spiritual Monk\\'s Trail (Wat Pha Lat) and lush hidden waterfalls. A guide for those seeking an authentic connection with Northern Thailand\\'s nature.',
        coverImage: '/videos/reel-2-img-3.jpg',`,
  `        slug: 'hidden-gems-chiang-mai-trekking',
        title: 'Monk\\'s Trail & Hidden Waterfalls: The Authentic Chiang Mai Trekking Guide 🛕',
        excerpt: 'Skip the tourist traps. Discover the spiritual Monk\\'s Trail (Wat Pha Lat) and lush hidden waterfalls. A guide for those seeking an authentic connection with Northern Thailand\\'s nature.',
        coverImage: '/images/articles/monks-trail-wat-pha-lat.jpg',
        subImages: [
            {
                id: 'monk-sub-1',
                url: '/images/articles/wat-pha-lat-jungle.jpg',
                caption: 'Wat Pha Lat: A secluded ancient jungle temple immersed in the greenery of Doi Suthep',
                position: 'mid'
            },
            {
                id: 'monk-sub-2',
                url: '/images/fb/real-fb-1.jpg',
                caption: 'Doi Pui pine trails and blooming Himalayan cherry blossom forest',
                position: 'bottom'
            }
        ],`
);

// 4. why-rent-private-van-chiang-mai
content = content.replace(
  `        slug: 'why-rent-private-van-chiang-mai',
        title: 'Why Private Van Rental is the Best Way to Explore Northern Thailand 🚐 (2025 Guide)',
        excerpt: 'Planning a road trip to Pai or Chiang Rai? Forget the crowded buses. Here is why renting a private van with a driver is the smartest travel hack for your group. Plus, a complete 3-day itinerary.',
        coverImage: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=1200',`,
  `        slug: 'why-rent-private-van-chiang-mai',
        title: 'Why Private Van Rental is the Best Way to Explore Northern Thailand 🚐 (2025 Guide)',
        excerpt: 'Planning a road trip to Pai or Chiang Rai? Forget the crowded buses. Here is why renting a private van with a driver is the smartest travel hack for your group. Plus, a complete 3-day itinerary.',
        coverImage: '/images/articles/vip-commuter-van.jpg',
        subImages: [
            {
                id: 'van-sub-1',
                url: '/images/articles/vip-van-interior.jpg',
                caption: 'Spacious VIP reclining captain seats and cool climate control for winding mountain roads',
                position: 'mid'
            }
        ],`
);

// 5. ultimate-glamping-experience-doi-inthanon
content = content.replace(
  `        slug: 'ultimate-glamping-experience-doi-inthanon',
        title: 'Eco-Friendly Glamping: Sustainable Luxury in Doi Inthanon 🌿',
        excerpt: 'Experience the "Sea of Mist" without leaving your carbon footprint. Our guide to sustainable glamping in Northern Thailand combines luxury with eco-consciousness.',
        coverImage: '/videos/reel-1-img-1.jpg',`,
  `        slug: 'ultimate-glamping-experience-doi-inthanon',
        title: 'Eco-Friendly Glamping: Sustainable Luxury in Doi Inthanon 🌿',
        excerpt: 'Experience the "Sea of Mist" without leaving your carbon footprint. Our guide to sustainable glamping in Northern Thailand combines luxury with eco-consciousness.',
        coverImage: '/images/articles/glamping-luxury-tent.jpg',
        subImages: [
            {
                id: 'glamp-sub-1',
                url: '/images/articles/campfire-evening.jpg',
                caption: 'Cozy campfire evening and hot Mookata under starry mountain skies',
                position: 'mid'
            }
        ],`
);

// 6. ultimate-trekking-guide-chiang-mai-2025
content = content.replace(
  `        slug: 'ultimate-trekking-guide-chiang-mai-2025',
        title: 'คู่มือเดินป่าเชียงใหม่ 2025: ครบทุกเส้นทาง สายลุยห้ามพลาด! ⛰️',
        excerpt: 'อัปเดตล่าสุดเส้นทางเดินป่าดอยสุเทพ-ดอยปุย และม่อนแจ่ม ฉบับคนท้องถิ่นพาเที่ยว จอยทริปยังไงให้สนุก เตรียมตัวยังไงไม่ให้เฟล',
        coverImage: '/videos/reel-4-cover.jpg',`,
  `        slug: 'ultimate-trekking-guide-chiang-mai-2025',
        title: 'คู่มือเดินป่าเชียงใหม่ 2025: ครบทุกเส้นทาง สายลุยห้ามพลาด! ⛰️',
        excerpt: 'อัปเดตล่าสุดเส้นทางเดินป่าดอยสุเทพ-ดอยปุย และม่อนแจ่ม ฉบับคนท้องถิ่นพาเที่ยว จอยทริปยังไงให้สนุก เตรียมตัวยังไงไม่ให้เฟล',
        coverImage: '/images/fb/real-fb-4.jpg',
        subImages: [
            {
                id: 'trek-sub-1',
                url: '/images/fb/real-fb-2.jpg',
                caption: 'ดูแลลูกทริปอย่างใกล้ชิดบนเทรล สัญลักษณ์ความใส่ใจของทีมงานน่องตึง',
                position: 'mid'
            },
            {
                id: 'trek-sub-2',
                url: '/images/articles/chiang-dao-summit.jpg',
                caption: 'ทิวทัศน์สันเขาและสายหมอกบนยอดดอยสูง',
                position: 'bottom'
            }
        ],`
);

// 7. chiang-mai-camping-gear-rental-guide
content = content.replace(
  `        slug: 'chiang-mai-camping-gear-rental-guide',
        title: 'เช่าอุปกรณ์แคมป์ปิ้งเชียงใหม่: สะอาด ครบ จบที่เดียว (K2, Coleman Available) ⛺',
        excerpt: 'ไม่ต้องแบกให้หนัก! บริการเช่าเต็นท์และอุปกรณ์เดินป่าเกรดพรีเมียมในเชียงใหม่ สะอาดเหมือนใหม่ ผ่านการฆ่าเชื้อทุกครั้งก่อนส่งมอบ พร้อมคู่มือการกางเต็นท์',
        coverImage: '/videos/reel-1-img-0.jpg',`,
  `        slug: 'chiang-mai-camping-gear-rental-guide',
        title: 'เช่าอุปกรณ์แคมป์ปิ้งเชียงใหม่: สะอาด ครบ จบที่เดียว (K2, Coleman Available) ⛺',
        excerpt: 'ไม่ต้องแบกให้หนัก! บริการเช่าเต็นท์และอุปกรณ์เดินป่าเกรดพรีเมียมในเชียงใหม่ สะอาดเหมือนใหม่ ผ่านการฆ่าเชื้อทุกครั้งก่อนส่งมอบ พร้อมคู่มือการกางเต็นท์',
        coverImage: '/images/articles/camping-gear-rental.jpg',
        subImages: [
            {
                id: 'rental-sub-1',
                url: '/images/articles/camping-tent-setup.jpg',
                caption: 'อุปกรณ์และเต็นท์ทุกชุดผ่านการซัก อบฆ่าเชื้อ และตากแดดสนิท 100% ก่อนส่งมอบ',
                position: 'mid'
            }
        ],`
);

// 8. corporate-outing-teambuilding-chiang-mai
content = content.replace(
  `        slug: 'corporate-outing-teambuilding-chiang-mai',
        title: 'จัด Outing เชียงใหม่ยังไงให้พนักงาน Love? ไอเดีย Teambuilding เชิงผจญภัย 🤝 (2025 Edition)',
        excerpt: 'ลืมการละลายพฤติกรรมในห้องแอร์ไปได้เลย พาพนักงานและผู้บริหารมาเปิดประสบการณ์ใหม่กับกิจกรรม Adventure ที่ทั้งปลอดภัยและได้สาระ สร้าง Team Spirit ได้จริง',
        coverImage: '/videos/reel-3-cover.jpg',`,
  `        slug: 'corporate-outing-teambuilding-chiang-mai',
        title: 'จัด Outing เชียงใหม่ยังไงให้พนักงาน Love? ไอเดีย Teambuilding เชิงผจญภัย 🤝 (2025 Edition)',
        excerpt: 'ลืมการละลายพฤติกรรมในห้องแอร์ไปได้เลย พาพนักงานและผู้บริหารมาเปิดประสบการณ์ใหม่กับกิจกรรม Adventure ที่ทั้งปลอดภัยและได้สาระ สร้าง Team Spirit ได้จริง',
        coverImage: '/images/articles/corporate-teambuilding.jpg',
        subImages: [
            {
                id: 'corp-sub-1',
                url: '/images/articles/mae-taeng-rafting.jpg',
                caption: 'กิจกรรมถ่อแพไม้ไผ่และล่องแก่งแม่แตง สร้างความสามัคคีและการทำงานร่วมกันเป็นทีม',
                position: 'mid'
            }
        ],`
);

// 9. chiang-mai-trail-trekking-comparison
content = content.replace(
  `        slug: 'chiang-mai-trail-trekking-comparison',
        title: 'เปรียบเทียบ 6 เส้นทางเดินป่า & เทรลเชียงใหม่ยอดฮิต 2026: ที่ไหนเหมาะกับคุณ? (พร้อมตารางรูป & สรุปชัดเจน)',
        excerpt: 'เจาะลึก 6 พิกัดเดินเทรลยอดดอยเชียงใหม่: ดอยหลวงเชียงดาว, ดอยผากลอง (ออนใต้), ห้วยกุ๊บกั๊บ, ม่อนจอง, ดอยผ้าห่มปก, และกิ่วแม่ปาน พร้อมตารางเปรียบเทียบระยะทาง ความสูง ระดับความยาก ช่วงเวลาที่ควรไป และรูปภาพประกอบ',
        coverImage: '/videos/reel-2-img-0.jpg',`,
  `        slug: 'chiang-mai-trail-trekking-comparison',
        title: 'เปรียบเทียบ 6 เส้นทางเดินป่า & เทรลเชียงใหม่ยอดฮิต 2026: ที่ไหนเหมาะกับคุณ? (พร้อมตารางรูป & สรุปชัดเจน)',
        excerpt: 'เจาะลึก 6 พิกัดเดินเทรลยอดดอยเชียงใหม่: ดอยหลวงเชียงดาว, ดอยผากลอง (ออนใต้), ห้วยกุ๊บกั๊บ, ม่อนจอง, ดอยผ้าห่มปก, และกิ่วแม่ปาน พร้อมตารางเปรียบเทียบระยะทาง ความสูง ระดับความยาก ช่วงเวลาที่ควรไป และรูปภาพประกอบ',
        coverImage: '/images/articles/kew-mae-pan-ridge.jpg',`
);

// Table images in comparison 1
content = content.replace(
  `<img src="/videos/reel-4-cover.jpg" alt="ดอยหลวงเชียงดาว"`,
  `<img src="/images/articles/chiang-dao-summit.jpg" alt="ดอยหลวงเชียงดาว"`
);
content = content.replace(
  `<img src="/videos/reel-2-cover.jpg" alt="ดอยผากลอง ออนใต้"`,
  `<img src="/images/articles/doi-pha-klong-canyon.jpg" alt="ดอยผากลอง ออนใต้"`
);
content = content.replace(
  `<img src="/videos/reel-2-img-2.jpg" alt="ห้วยกุ๊บกั๊บ"`,
  `<img src="/images/articles/huay-kub-kab-mist.jpg" alt="ห้วยกุ๊บกั๊บ"`
);
content = content.replace(
  `<img src="/videos/reel-3-img-1.jpg" alt="ดอยม่อนจอง"`,
  `<img src="/images/articles/doi-mon-jong-golden-ridge.jpg" alt="ดอยม่อนจอง"`
);
content = content.replace(
  `<img src="/videos/reel-5-cover.jpg" alt="ดอยผ้าห่มปก"`,
  `<img src="/images/articles/doi-pha-hom-pok-peak.jpg" alt="ดอยผ้าห่มปก"`
);
content = content.replace(
  `<img src="/videos/reel-2-img-1.jpg" alt="กิ่วแม่ปาน"`,
  `<img src="/images/articles/kew-mae-pan-boardwalk.jpg" alt="กิ่วแม่ปาน"`
);

// 10. chiang-mai-best-camping-spots-comparison
content = content.replace(
  `        slug: 'chiang-mai-best-camping-spots-comparison',
        title: 'คัดเน้นๆ 6 ลานกางเต็นท์ & แคมป์ปิ้งยอดดอยเชียงใหม่ 2026: วิวทะเลหมอกหลักล้าน (พร้อมตารางรูป & เปรียบเทียบ)',
        excerpt: 'รวมพิกัดกางเต็นท์นอนดูดาวและตื่นมารับทะเลหมอกบนดอยเชียงใหม่: สันป่าเกี๊ยะ ดอยแม่ตะมาน, ม่อนเงาะ, ดอยปุย (ขุนช่างเคี่ยน), ดอยอ่างขาง, ดงสนดอยอินทนนท์, และม่อนแจ่ม พร้อมตารางเปรียบเทียบสิ่งอำนวยความสะดวก รถยนต์เข้าถึงได้ไหม และสภาพอากาศ',
        coverImage: '/videos/reel-1-img-3.jpg',`,
  `        slug: 'chiang-mai-best-camping-spots-comparison',
        title: 'คัดเน้นๆ 6 ลานกางเต็นท์ & แคมป์ปิ้งยอดดอยเชียงใหม่ 2026: วิวทะเลหมอกหลักล้าน (พร้อมตารางรูป & เปรียบเทียบ)',
        excerpt: 'รวมพิกัดกางเต็นท์นอนดูดาวและตื่นมารับทะเลหมอกบนดอยเชียงใหม่: สันป่าเกี๊ยะ ดอยแม่ตะมาน, ม่อนเงาะ, ดอยปุย (ขุนช่างเคี่ยน), ดอยอ่างขาง, ดงสนดอยอินทนนท์, และม่อนแจ่ม พร้อมตารางเปรียบเทียบสิ่งอำนวยความสะดวก รถยนต์เข้าถึงได้ไหม และสภาพอากาศ',
        coverImage: '/images/articles/san-pa-kia-camp.jpg',`
);

// Table images in comparison 2
content = content.replace(
  `<img src="/videos/reel-1-cover.jpg" alt="สันป่าเกี๊ยะ ดอยแม่ตะมาน"`,
  `<img src="/images/articles/san-pa-kia-camp.jpg" alt="สันป่าเกี๊ยะ ดอยแม่ตะมาน"`
);
content = content.replace(
  `<img src="/videos/reel-1-img-0.jpg" alt="ม่อนเงาะ"`,
  `<img src="/images/articles/huay-kub-kab-mist.jpg" alt="ม่อนเงาะ"`
);
content = content.replace(
  `<img src="/videos/reel-1-img-1.jpg" alt="ลานกางเต็นท์ดอยปุย"`,
  `<img src="/images/articles/doi-pui-pine-campsite.jpg" alt="ลานกางเต็นท์ดอยปุย"`
);
content = content.replace(
  `<img src="/videos/reel-1-img-2.jpg" alt="ลานสน ดอยอินทนนท์"`,
  `<img src="/images/fb/real-fb-4.jpg" alt="ลานสน ดอยอินทนนท์"`
);
content = content.replace(
  `<img src="/videos/reel-1-img-3.jpg" alt="ม่อนสน ดอยอ่างขาง"`,
  `<img src="/images/articles/doi-ang-khang-view.jpg" alt="ม่อนสน ดอยอ่างขาง"`
);
content = content.replace(
  `<img src="/videos/reel-3-img-3.jpg" alt="ดอยม่อนล้าน"`,
  `<img src="/images/articles/camping-tent-setup.jpg" alt="ดอยม่อนล้าน"`
);

fs.writeFileSync(dataFilePath, content, 'utf8');
console.log('✓ Successfully written updated content to data.ts');
