export interface Trip {
    id: string;
    title: string;
    subtitle?: string;
    price: number;
    difficulty: 'Easy' | 'Moderate' | 'Hard';
    status: 'available' | 'limited' | 'sold-out';
    image: string;
    tags: string[];
    duration: '1D' | '2D1N' | '3D+' | string;
    type: 'join' | 'private';
    gallery?: string[];
    description?: string;
    location?: string;
    highlights?: string[];
    itinerary?: { day: string; title?: string; desc: string; images?: string[] }[];
    whatsIncluded?: string[];
    notIncluded?: string[];
}

export const TRIPS: Trip[] = [
    {
        "id": "2dcb878d-bea5-4256-9bcf-07442d13caf7",
        "title": "Mae Ngat Dam | Bamboo Raft & Lake Escape 1 Day Trip",
        "subtitle": "เขื่อนแม่งัด | เดินน้ำตก 7สี | เล่นน้ำ",
        "price": 2190,
        "difficulty": "Moderate",
        "status": "available",
        "image": "https://www.theblondtravels.com/wp-content/uploads/2018/07/IMG_6018-2.jpg",
        "gallery": [],
        "tags": [],
        "duration": "1D",
        "type": "join",
        "description": "A relaxing lake getaway surrounded by mountains.\r\nEnjoy bamboo rafting on calm waters, swimming, and free time on floating platforms.\r\nPerfect for all ages and travelers looking for a slow, refreshing day.",
        "location": "Mae Ngat Dam, Chiang Mai",
        "highlights": [
            "Bamboo rafting experience",
            "Scenic lake surrounded by mountains",
            "Swimming & relaxation"
        ],
        "itinerary": [
            {
                "day": "Day 1",
                "desc": "08:00 Depart from Chiang Mai\n10:00 Bamboo rafting & lake activities\n12:30 Lunch (local floating restaurant – self-paid)\n15:30 Return from dam\n17:00 Arrive Chiang Mai",
                "title": "Day Trip"
            }
        ],
        "whatsIncluded": [
            "Round-trip transportation",
            "Local guide",
            "Bamboo raft & life jacket",
            "Travel insurance"
        ],
        "notIncluded": [
            "Meals on floating raft",
            "Personal expenses"
        ]
    },
    {
        "id": "chiangdao-muangkhong",
        "title": "Chiang Dao – Muang Khong | Cultural Escape 2 Days 1 Night",
        "subtitle": "เชียงดาว – เมืองคอง | ทริปวิถีชุมชนและวัฒนธรรม 2 วัน 1 คืน",
        "price": 4890,
        "difficulty": "Easy",
        "status": "available",
        "image": "https://res.cloudinary.com/dljdzrcp7/image/upload/v1769669560/84643FDE-B997-42B4-A316-1AD5CCCF635B_1_105_c_yayorb.jpg",
        "gallery": [
            "https://res.cloudinary.com/dljdzrcp7/image/upload/v1769752253/677C13D8-60F6-4085-883A-9C59DE31EC90_1_102_o_mez8yv.jpg",
            "https://res.cloudinary.com/dljdzrcp7/image/upload/f_webp/v1769752727/FullSizeRender_tz3hoo",
            "https://res.cloudinary.com/dljdzrcp7/image/upload/f_webp/v1769752729/IMG_3448_axnxgf"
        ],
        "tags": [
            "Chiang Mai",
            "Chiang Dao"
        ],
        "duration": "2D1N",
        "type": "join",
        "description": "Escape the city into a peaceful valley surrounded by rice fields and mountains.\r\nExperience local life, traditional food, and scenic views of Doi Luang Chiang Dao while staying in a quiet rural village.",
        "location": "Chiang Dao, Chiang Mai",
        "highlights": [
            "Muang Khong village lifestyle",
            "Traditional temples and countryside",
            "Chiang Dao mountain scenery"
        ],
        "whatsIncluded": [
            "Transportation",
            "Homestay accommodation",
            "Meals as specified",
            "Guide and insurance"
        ],
        "notIncluded": [
            "Personal expenses"
        ],
        "itinerary": [
            {
                "day": "Day 1",
                "title": "เชียงดาว สู่อ้อมกอดหุบเขาเมืองคอง",
                "desc": "08:00 – Meet in Chiang Mai city นัดพบในตัวเมืองเชียงใหม่\n08:30 – Depart for Chiang Dao มุ่งหน้าสู่ดินแดนดอยหลวงเชียงดาว\n10:30 – Stop at local viewpoint จุดชมวิวดอยหลวงเชียงดาว พักดื่มกาแฟ\n12:00 – Lunch at local restaurant อาหารกลางวันพื้นบ้าน\n13:30 – Arrive at Muang Khong village ลัดเลาะผ่านขุนเขาสู่ชุมชนเมืองคอง เช็คอินโฮมสเตย์\n15:00 – Village walk เดินเล่นชมทุ่งนา วิถีชีวิตชนบท และลำน้ำคอง\n18:00 – Dinner with local dishes อาหารค่ำรสชาติท้องถิ่น\n19:30 – Cultural sharing พูดคุยแลกเปลี่ยนเรื่องราวกับคนในชุมชน",
                "images": [
                    "/images/articles/chiang-dao-summit.jpg",
                    "https://res.cloudinary.com/dljdzrcp7/image/upload/v1769752253/677C13D8-60F6-4085-883A-9C59DE31EC90_1_102_o_mez8yv.jpg",
                    "/images/articles/mae-klang-luang-rice.jpg"
                ]
            },
            {
                "day": "Day 2",
                "title": "หมอกยามเช้า วิถีทุ่งนา และเดินทางกลับ",
                "desc": "06:30 – Morning walk ชมไอหมอกลอยเหนือน้ำคองและทุ่งนาเขียวขจี\n07:30 – Breakfast อาหารเช้าสไตล์ท้องถิ่น\n09:00 – Visit local temples สักการะวัดโบราณของหมู่บ้าน\n11:30 – Lunch รับประทานอาหารกลางวัน\n13:00 – Depart for Chiang Mai ออกเดินทางกลับสู่เมืองเชียงใหม่\n17:00 – Arrive in Chiang Mai เดินทางถึงจุดหมายปลายทางโดยสวัสดิภาพ",
                "images": [
                    "https://res.cloudinary.com/dljdzrcp7/image/upload/f_webp/v1769752727/FullSizeRender_tz3hoo",
                    "https://res.cloudinary.com/dljdzrcp7/image/upload/f_webp/v1769752729/IMG_3448_axnxgf"
                ]
            }
        ]
    },
    {
        "id": "huay-kub-kab",
        "title": "Huay Kub Kab | Cloud Ridge Experience 2 Days 1 Night",
        "subtitle": "ห้วยกุ๊บกั๊บ | เดินขึ้นเขาชมทะเลหมอก 2 วัน 1 คืน",
        "price": 4490,
        "difficulty": "Moderate",
        "status": "available",
        "image": "https://res.cloudinary.com/dljdzrcp7/image/upload/v1769665452/IMG_3527_nfpxp2.webp",
        "gallery": [
            "https://res.cloudinary.com/dljdzrcp7/image/upload/f_webp/v1769665453/IMG_3528_vlrbuu",
            "https://res.cloudinary.com/dljdzrcp7/image/upload/v1769665913/24A1CB96-B287-4CE5-8732-4D9C6595632F_dqvexq.webp",
            "https://res.cloudinary.com/dljdzrcp7/image/upload/v1769753441/F691E82A-7C1A-4B50-B930-7F5489153550_1_102_o_jkbnlr.jpg",
            "https://res.cloudinary.com/dljdzrcp7/image/upload/v1769753521/83F21836-868D-4880-83E8-EC144790CC6E_1_102_o_t7vkc1.jpg",
            "https://res.cloudinary.com/dljdzrcp7/image/upload/v1769753619/65AF4A49-9578-474B-92AA-90B1462D6405_1_105_c_vqbxqm.jpg"
        ],
        "tags": [
            "Chiang Mai",
            "Mae Taeng",
            "Huay Kub Kab",
            "Hill Tribe",
            "Lahu Village",
            "Mountain Ridge",
            "Sunrise View",
            "Sunset View",
            "Homestay",
            "4WD Adventure"
        ],
        "duration": "2D1N",
        "type": "join",
        "description": "A highland adventure offering panoramic mountain views and authentic hill tribe culture.\r\nTravel by 4WD to the ridge, trek to scenic viewpoints, enjoy sunset and sunrise, and stay overnight at a local homestay in Huay Kub Kab village.",
        "location": "Huay Kub Kab, Mae Taeng, Chiang Mai",
        "highlights": [
            "360-degree mountain views",
            "Sunrise & sunset viewpoints",
            "Lahu hill tribe village experience"
        ],
        "whatsIncluded": [
            "4WD transportation",
            "Homestay accommodation",
            "4 local meals",
            "Professional guide",
            "Travel insurance"
        ],
        "notIncluded": [
            "Personal expenses"
        ],
        "itinerary": [
            {
                "day": "Day 1",
                "title": "ขึ้น 4WD ลุยสันเขา และชมพระอาทิตย์ตกห้วยกุ๊บกั๊บ",
                "desc": "08:00 – Meet in Chiang Mai city นัดพบในเมืองเชียงใหม่\n08:30 – Depart for Mae Taeng เดินทางสู่อำเภอแม่แตง\n10:30 – Arrive at local village เปลี่ยนขึ้นรถกระบะ 4WD ยกสูง\n11:00 – 4WD ride to mountain ridge ลุยเส้นทางออฟโรดขึ้นสู่ยอดดอยห้วยกุ๊บกั๊บ\n12:30 – Local lunch รับประทานอาหารพื้นบ้านชาวลาหู่\n13:30 – Short trek to viewpoint เดินเท้าเบาๆ ชมวิวสันเขาแบบ 360 องศา\n16:30 – Sunset viewpoint ชมพระอาทิตย์ตกดินอันงดงามเหนือทะเลหมอก\n18:00 – Dinner at homestay อิ่มอร่อยกับมื้อค่ำล้อมวงกินข้าว\n19:30 – Free time นอนดูดาวบนระเบียงโฮมสเตย์",
                "images": [
                    "/images/articles/huay-kub-kab-mist.jpg",
                    "https://res.cloudinary.com/dljdzrcp7/image/upload/v1769665452/IMG_3527_nfpxp2.webp",
                    "https://res.cloudinary.com/dljdzrcp7/image/upload/f_webp/v1769665453/IMG_3528_vlrbuu"
                ]
            },
            {
                "day": "Day 2",
                "title": "ทะเลหมอกยามเช้า ดอยผาสามเหลี่ยม และเดินทางกลับ",
                "desc": "04:00 – Wake-up call ตื่นเช้าเตรียมตัวเดินเท้าขึ้นยอดดอยผาสามเหลี่ยม\n07:00 – Sunrise viewpoint trek สัมผัสทะเลหมอกสีทองยามเช้าสุดอลังการ\n09:30 – Breakfast at homestay กลับมารับประทานอาหารเช้าและกาแฟดริป\n11:30 – Prepare to return เก็บสัมภาระและอำลาเจ้าบ้าน\n14:00 – Depart for Chiang Mai ลงดอยด้วยรถ 4WD และเดินทางกลับตัวเมือง\n15:30 – Arrive in Chiang Mai เดินทางถึงเมืองเชียงใหม่โดยสวัสดิภาพ",
                "images": [
                    "https://res.cloudinary.com/dljdzrcp7/image/upload/v1769753441/F691E82A-7C1A-4B50-B930-7F5489153550_1_102_o_jkbnlr.jpg",
                    "https://res.cloudinary.com/dljdzrcp7/image/upload/v1769753521/83F21836-868D-4880-83E8-EC144790CC6E_1_102_o_t7vkc1.jpg",
                    "https://res.cloudinary.com/dljdzrcp7/image/upload/v1769665913/24A1CB96-B287-4CE5-8732-4D9C6595632F_dqvexq.webp"
                ]
            }
        ]
    },
    {
        "id": "เดินป่า-วิถีชาวบ้าน-เลี้ยงช้าง-ล่องแพไม้-ทริปเรียนรู้ธรรมชาติ-3-วัน-2-คืน",
        "title": "Forest Trek, Village Life, Elephant Care & Bamboo Rafting | 3 Days 2 Nights",
        "subtitle": "เดินป่า วิถีชาวบ้าน เลี้ยงช้าง ล่องแพไม้ | ทริปเรียนรู้ธรรมชาติ 3 วัน 2 คืน",
        "price": 8500,
        "difficulty": "Hard",
        "status": "available",
        "image": "https://res.cloudinary.com/dljdzrcp7/image/upload/v1769666636/5067813D-7DD4-40E0-841A-27946439F898_1_105_c_frib7p.jpg",
        "gallery": [
            "https://res.cloudinary.com/dljdzrcp7/image/upload/v1769666636/FF9081B1-B999-483F-B35F-ECE406F4966F_4_5005_c_cib7ut.jpg",
            "https://res.cloudinary.com/dljdzrcp7/image/upload/v1769666637/C0F06D14-4FF1-413D-B4AC-E4ECE17A6391_1_105_c_isj1lh.jpg"
        ],
        "tags": [],
        "duration": "3D+",
        "type": "private",
        "description": "An advanced expedition designed for experienced adventurers.\r\nDeep forest trekking, survival skills training, long bamboo rafting routes, and remote camping in untouched wilderness.",
        "location": "Mae Taeng & Northern Forest, Chiang Mai",
        "highlights": [
            "Deep forest trekking",
            "Survival and navigation skills",
            "Long-distance bamboo rafting"
        ],
        "whatsIncluded": [
            "Expedition guide",
            "Camping gear",
            "Meals during expedition",
            "Travel insurance"
        ],
        "notIncluded": [
            "Personal survival equipment upgrades"
        ],
        "itinerary": [
            {
                "day": "Day 1",
                "title": "พบปะทีมงาน ออกเดินทาง และเริ่มเดินป่าลึก",
                "desc": "08:00 – Meet & expedition briefing ณ จุดนัดหมายเชียงใหม่\n09:00 – Trek into deep forest สัมผัสความสมบูรณ์ของผืนป่าดิบเขา\n12:00 – Jungle lunch รับประทานอาหารกลางวันปรุงสดด้วยกระบอกไม้ไผ่กลางป่า\n14:00 – Survival skill training เรียนรู้ทักษะยังชีพ ก่อไฟ หาทิศ และสมุนไพรพื้นบ้าน\n18:00 – Camp setup & dinner ตั้งแคมป์ริมลำธาร ทำอาหารพื้นบ้าน และล้อมกองไฟ",
                "images": [
                    "https://res.cloudinary.com/dljdzrcp7/image/upload/v1769666636/5067813D-7DD4-40E0-841A-27946439F898_1_105_c_frib7p.jpg",
                    "/images/articles/campfire-evening.jpg",
                    "/images/articles/camping-tent-setup.jpg"
                ]
            },
            {
                "day": "Day 2",
                "title": "เดินทางต่อ ข้ามลำน้ำ และล่องแพไม้ไผ่",
                "desc": "06:00 – Morning routine สดชื่นกับอากาศบริสุทธิ์และกาแฟดริปยามเช้า\n07:00 – Trek continuation ออกเดินป่าต่อผ่านแนวสันเขาและป่าต้นน้ำ\n12:00 – River crossing & lunch ข้ามลำน้ำแม่แตงและพักทานอาหารกลางวัน\n15:00 – Bamboo raft journey ล่องแพไม้ไผ่ลัดเลาะสายน้ำ ชมทัศนียภาพสองฝั่งป่า\n18:30 – Remote camp overnight พักแรมแคมป์ริมน้ำ ฟังเสียงธรรมชาติใต้หมู่ดาว",
                "images": [
                    "/images/articles/mae-taeng-rafting.jpg",
                    "https://res.cloudinary.com/dljdzrcp7/image/upload/v1769666636/FF9081B1-B999-483F-B35F-ECE406F4966F_4_5005_c_cib7ut.jpg",
                    "https://res.cloudinary.com/dljdzrcp7/image/upload/v1769672813/C6D1972B-7B71-4E84-89AA-05D01D7FC998_4_5005_c_xmv7mg.jpg"
                ]
            },
            {
                "day": "Day 3",
                "title": "เดินป่าช่วงสุดท้าย อำลาผืนป่า เดินทางกลับตัวเมือง",
                "desc": "06:30 – Wake up ตื่นรับสายหมอกยามเช้าและเสียงนกร้อง\n07:30 – Breakfast อาหารเช้าแสนอบอุ่นสไตล์ชาวดอย\n09:00 – Final trekking section เดินศึกษาธรรมชาติเส้นทางสุดท้ายและแวะหมู่บ้านปกาเกอะญอ\n13:00 – Exit forest ออกจากเขตป่า พักผ่อนและอาบน้ำเปลี่ยนชุด\n17:00 – Expedition ends ส่งกลับถึงตัวเมืองเชียงใหม่โดยสวัสดิภาพ",
                "images": [
                    "https://res.cloudinary.com/dljdzrcp7/image/upload/v1769666637/C0F06D14-4FF1-413D-B4AC-E4ECE17A6391_1_105_c_isj1lh.jpg",
                    "/images/articles/monks-trail-wat-pha-lat.jpg"
                ]
            }
        ]
    },
    {
        "id": "เทรล-ds100-สู่หมู่บ้านขุนช่างเคี่ยน-เดินป่าธรรมชาติ-1-วัน",
        "title": "DS100 Trail to Khun Chang Khian | 1 Day Trip เทรล DS100",
        "subtitle": "สู่หมู่บ้านขุนช่างเคี่ยน | เดินป่าธรรมชาติ 1 วัน",
        "price": 1890,
        "difficulty": "Moderate",
        "status": "available",
        "image": "https://img.kapook.com/u/2023/sireeporn/Travel-01/Khun%20Chang%20Khian_02.jpg",
        "gallery": [],
        "tags": [
            "Trail",
            "Hiking",
            "Nature",
            "Local Experience"
        ],
        "duration": "1D",
        "type": "join",
        "description": "A classic trail experience close to Chiang Mai city.\r\nStart from Huay Tueng Thao, hike along the famous DS100 trail, passing through forested mountain paths toward the peaceful village of Khun Chang Khian.\r\nWe focus on guiding, safety, and local insight, while guests support community restaurants by choosing their own meals.",
        "location": "Chiang Mai – Huay Tueng Thao / Doi Suthep",
        "highlights": [
            "Popular DS100 trail route",
            "Forest and mountain scenery",
            "Authentic hill village experience",
            "Support local community businesses"
        ],
        "itinerary": [
            {
                "day": "Day 1",
                "title": "Day Trip",
                "desc": "07:30 Meet at Huay Tueng Thao\n08:00 Start hiking on DS100 trail\n12:00 Lunch at Khun Chang Khian (local restaurants)\n14:00 Explore village & cafes\n17:00 Return to Chiang Mai"
            }
        ],
        "whatsIncluded": [
            "Professional trail guide",
            "Transportation (meeting point – return)",
            "Drinking water",
            "Travel accident insurance"
        ],
        "notIncluded": [
            "Meals and beverages",
            "Personal expenses"
        ]
    },
    {
        "id": "เลอเชอ-เลี้ยงช้าง-โฮมสเตย์-นอนข้างน้ำตก-2-วัน-1-คืน",
        "title": "Le Cher Elephant Home & Mae Wang | Soft Adventure 2 Days 1 Night",
        "subtitle": "เลอเชอ เลี้ยงช้าง โฮมสเตย์ | นอนข้างน้ำตก 2 วัน 1 คืน",
        "price": 5500,
        "difficulty": "Easy",
        "status": "available",
        "image": "https://res.cloudinary.com/dljdzrcp7/image/upload/v1769672821/1B7330CB-D177-4614-8186-E54005B41563_1_102_a_rbynii.jpg",
        "gallery": [
            "https://res.cloudinary.com/dljdzrcp7/image/upload/v1769672813/C6D1972B-7B71-4E84-89AA-05D01D7FC998_4_5005_c_xmv7mg.jpg",
            "https://res.cloudinary.com/dljdzrcp7/image/upload/v1769672836/E903F7C7-9039-456D-B71F-96F176A55BD0_1_105_c_gjp3hs.jpg"
        ],
        "tags": [],
        "duration": "2D1N",
        "type": "join",
        "description": "A gentle adventure focused on ethical elephant care and nature.\r\nEnjoy waterfall swimming, bamboo rafting, riverside relaxation, and an overnight stay in a peaceful natural environment.",
        "location": "Mae Wang, Chiang Mai",
        "highlights": [
            "Ethical elephant activities",
            "Waterfall and river experience",
            "Bamboo rafting"
        ],
        "itinerary": [
            {
                "title": "",
                "desc": "08:00 – Meet in Chiang Mai\n\n08:30 – Travel to Mae Wang\n\n10:30 – Arrive at Le Cher Elephant Home\n• Introduction to ethical elephant care\n\n11:30 – Waterfall visit & swimming\n\n13:00 – Lunch\n\n14:30 – Elephant activities\n• Feeding, observation, bathing\n\n17:00 – Check-in accommodation\n\n18:30 – Dinner\n\n20:00 – Relax by the river",
                "day": "Day 1"
            },
            {
                "desc": "07:30 – Breakfast\n\n09:00 – Bamboo rafting\n\n11:30 – Free time\n\n13:00 – Lunch\n\n14:30 – Return to Chiang Mai\n\n17:30 – Arrive in Chiang Mai",
                "day": "Day 2",
                "title": ""
            }
        ],
        "whatsIncluded": [
            "Transportation",
            "Accommodation",
            "Meals as specified",
            "Guide and insurance"
        ],
        "notIncluded": [
            "Personal expenses"
        ]
    }
];

export interface RentalGear {
    id: string;
    name: string;
    type?: string;
    price: number;
    unit: string;
    stock: number;
    image: string;
    description?: string;
    desc?: string;
    features?: string[];
}

export const RENTAL_GEAR: RentalGear[] = [
    {
        "id": "13b836ab-3191-4464-8c63-1fcc6ba780b4",
        "name": "Sleeping Bag",
        "type": "Sleeping",
        "price": 200,
        "unit": "Night",
        "stock": 1,
        "image": "https://res.cloudinary.com/dljdzrcp7/image/upload/v1770465419/12_k4swu0.png",
        "description": "Size: Adult standard size\r\nSuitable for: Camping, trekking, mountain trips\r\n\r\nDescription:\r\nComfortable and warm for overnight outdoor stays\r\nSoft inner lining for better sleep quality\r\nEasy to roll, pack, and carry\r\nRecommended to use with a sleeping pad or mattress",
        "features": []
    },
    {
        "id": "24b8c29a-150c-4e18-8dd1-43f0c8eaa4d6",
        "name": "Reclining Camping Chair",
        "type": "Chair",
        "price": 180,
        "unit": "Night",
        "stock": 1,
        "image": "https://res.cloudinary.com/dljdzrcp7/image/upload/v1770455304/5_ct1jg7.png",
        "description": "Max Load: Up to 150 kg\r\nSuitable for: Long stays, relaxing camps, comfort-focused travelers\r\n\r\nDescription:\r\nMulti-level reclining adjustment\r\nErgonomic and comfortable seating\r\nStrong and durable structure\r\nIdeal for premium camping experience",
        "features": []
    },
    {
        "id": "24ed5255-f6f2-4ea1-b648-c546aadd82dc",
        "name": "Flashlight",
        "type": "Lighting",
        "price": 100,
        "unit": "Trip",
        "stock": 1,
        "image": "https://res.cloudinary.com/dljdzrcp7/image/upload/v1770465420/14_xafzbi.png",
        "description": "Power: Battery operated\r\nSuitable for: Night camping, trekking, emergency use\r\n\r\nDescription:\r\nBright and energy-efficient LED light\r\nCompact and easy to use\r\nSuitable for walking at night or inside the campsite\r\nBatteries included (basic use)",
        "features": []
    },
    {
        "id": "6c23e422-d8af-4cc5-a44b-eb2a7d42d8a3",
        "name": "Sleeping Pad",
        "type": "Sleeping",
        "price": 120,
        "unit": "Night",
        "stock": 1,
        "image": "https://res.cloudinary.com/dljdzrcp7/image/upload/v1770455305/10_jbmdmg.png",
        "description": "Size: Single person\r\nSuitable for: Tent sleeping, added comfort\r\n\r\nDescription:\r\nReduces ground hardness\r\nLightweight and easy to carry\r\nRecommended to use with a sleeping bag",
        "features": []
    },
    {
        "id": "a0031003-e656-4a82-952d-a85102146c6a",
        "name": "Camping Gas Stove & Cooking Set",
        "type": "Kitchen",
        "price": 250,
        "unit": "Trip",
        "stock": 1,
        "image": "https://res.cloudinary.com/dljdzrcp7/image/upload/v1770455306/9_omate8.png",
        "description": "Includes: Stove, pot, pan, basic utensils\r\nGas Canister: Not included\r\n\r\nDescription:\r\nSuitable for simple outdoor cooking\r\nFor outdoor use only\r\nUser must have basic stove operation knowledge",
        "features": []
    },
    {
        "id": "a6beef9f-e3e2-4585-b151-fe6d5b6b9bf5",
        "name": "Camping Table",
        "type": "Kitchen",
        "price": 150,
        "unit": "Night",
        "stock": 1,
        "image": "https://res.cloudinary.com/dljdzrcp7/image/upload/v1770455305/8_cuq90o.png",
        "description": "Capacity: Suitable for 2–4 persons\r\nSuitable for: Cooking, dining, gear setup\r\n\r\nDescription:\r\nFoldable and portable design\r\nStable and durable tabletop\r\nSuitable for indoor tent use and outdoor areas",
        "features": []
    },
    {
        "id": "dbd9eaa3-4e92-4b02-96f4-5f0e18b6eb09",
        "name": "Standard Camping Chair",
        "type": "Chair",
        "price": 100,
        "unit": "Night",
        "stock": 1,
        "image": "https://res.cloudinary.com/dljdzrcp7/image/upload/v1770455305/4_enlbta.png",
        "description": "Max Load: Up to 100 kg\r\nSuitable for: General camping, campfire seating, short trips\r\n\r\nDescription:\r\nLightweight and foldable\r\nSteel frame construction\r\nEasy to carry and store\r\nNot suitable for reclining or heavy leaning",
        "features": []
    },
    {
        "id": "f197d690-1896-44ee-99d4-d258fd4bd09a",
        "name": "Camping Pillow",
        "type": "Sleeping",
        "price": 80,
        "unit": "Night",
        "stock": 1,
        "image": "https://res.cloudinary.com/dljdzrcp7/image/upload/v1770465419/13_zvetip.png",
        "description": "Material: Soft fabric with supportive filling\r\nSuitable for: Camping, trekking, overnight trips\r\n\r\nDescription:\r\nLightweight and compact\r\nProvides neck and head support during sleep\r\nEasy to pack and carry\r\nRecommended to use inside a tent or sleeping bag",
        "features": []
    },
    {
        "id": "fe2970e1-46e3-41f1-9b42-c4acb4e1d87c",
        "name": "2–3 Person Camping Tent",
        "type": "Tent",
        "price": 500,
        "unit": "Night",
        "stock": 1,
        "image": "https://res.cloudinary.com/dljdzrcp7/image/upload/v1770455304/6_z97wke.png",
        "description": "Capacity: 2–3 persons\r\nWeather Protection: Rain & wind resistant\r\n\r\nDescription:\r\nEasy to set up (beginner-friendly)\r\nIncludes flysheet and ventilation windows\r\nSleeping gear not included",
        "features": []
    }
];

export interface Product {
    id: string;
    name: string;
    price: number;
    category: string;
    status: 'ready' | 'preorder';
    image: string;
    badge: string;
}

export const PRODUCTS: Product[] = [
    { id: 'p1', name: 'Coleman Tough Screen 2-Room', price: 18900, category: 'Tent', status: 'ready', image: 'https://images.unsplash.com/photo-1527011046414-4781f1f94f8c?auto=format&fit=crop&q=80&w=600', badge: 'Ready to Ship' },
    { id: 'p2', name: 'Helinox Chair One - Black', price: 3900, category: 'Furniture', status: 'preorder', image: 'https://images.unsplash.com/photo-1595246140625-573b715d1128?auto=format&fit=crop&q=80&w=600', badge: 'Pre-order 14 Days' },
    { id: 'p3', name: 'Snow Peak Titanium Mug', price: 1250, category: 'Kitchen', status: 'ready', image: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&q=80&w=600', badge: 'Best Seller' },
    { id: 'p4', name: 'DOD KinoKoko Tent', price: 22000, category: 'Tent', status: 'preorder', image: 'https://images.unsplash.com/photo-1496947850313-7743325fa58c?auto=format&fit=crop&q=80&w=600', badge: 'New Arrival' },
    { id: 'p5', name: 'Barebones Railroad Lantern', price: 2800, category: 'Lighting', status: 'ready', image: 'https://images.unsplash.com/photo-1504851149312-7a075b496cc7?auto=format&fit=crop&q=80&w=600', badge: 'In Stock' },
    { id: 'p6', name: 'Nordisk Asgard 12.6', price: 35000, category: 'Tent', status: 'preorder', image: 'https://images.unsplash.com/photo-1628047915354-944519967201?auto=format&fit=crop&q=80&w=600', badge: 'Pre-order Only' }
];
