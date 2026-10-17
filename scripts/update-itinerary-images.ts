import { adminDb } from '../src/lib/firebase-admin';

async function updateItineraryImages() {
    console.log('Updating itinerary images in Firestore...');

    const tripsRef = adminDb.collection('trips');

    // 1. Forest Trek 3D2N
    const trek3d2nId = 'เดินป่า-วิถีชาวบ้าน-เลี้ยงช้าง-ล่องแพไม้-ทริปเรียนรู้ธรรมชาติ-3-วัน-2-คืน';
    await tripsRef.doc(trek3d2nId).set({
        itinerary: [
            {
                day: 'Day 1',
                title: 'พบปะทีมงาน ออกเดินทาง และเริ่มเดินป่าลึก',
                desc: '08:00 – Meet & expedition briefing ณ จุดนัดหมายเชียงใหม่\n09:00 – Trek into deep forest สัมผัสความสมบูรณ์ของผืนป่าดิบเขา\n12:00 – Jungle lunch รับประทานอาหารกลางวันปรุงสดด้วยกระบอกไม้ไผ่กลางป่า\n14:00 – Survival skill training เรียนรู้ทักษะยังชีพ ก่อไฟ หาทิศ และสมุนไพรพื้นบ้าน\n18:00 – Camp setup & dinner ตั้งแคมป์ริมลำธาร ทำอาหารพื้นบ้าน และล้อมกองไฟ',
                images: [
                    'https://res.cloudinary.com/dljdzrcp7/image/upload/v1769666636/5067813D-7DD4-40E0-841A-27946439F898_1_105_c_frib7p.jpg',
                    '/images/articles/campfire-evening.jpg',
                    '/images/articles/camping-tent-setup.jpg'
                ]
            },
            {
                day: 'Day 2',
                title: 'เดินทางต่อ ข้ามลำน้ำ และล่องแพไม้ไผ่',
                desc: '06:00 – Morning routine สดชื่นกับอากาศบริสุทธิ์และกาแฟดริปยามเช้า\n07:00 – Trek continuation ออกเดินป่าต่อผ่านแนวสันเขาและป่าต้นน้ำ\n12:00 – River crossing & lunch ข้ามลำน้ำแม่แตงและพักทานอาหารกลางวัน\n15:00 – Bamboo raft journey ล่องแพไม้ไผ่ลัดเลาะสายน้ำ ชมทัศนียภาพสองฝั่งป่า\n18:30 – Remote camp overnight พักแรมแคมป์ริมน้ำ ฟังเสียงธรรมชาติใต้หมู่ดาว',
                images: [
                    '/images/articles/mae-taeng-rafting.jpg',
                    'https://res.cloudinary.com/dljdzrcp7/image/upload/v1769666636/FF9081B1-B999-483F-B35F-ECE406F4966F_4_5005_c_cib7ut.jpg',
                    'https://res.cloudinary.com/dljdzrcp7/image/upload/v1769672813/C6D1972B-7B71-4E84-89AA-05D01D7FC998_4_5005_c_xmv7mg.jpg'
                ]
            },
            {
                day: 'Day 3',
                title: 'เดินป่าช่วงสุดท้าย อำลาผืนป่า เดินทางกลับตัวเมือง',
                desc: '06:30 – Wake up ตื่นรับสายหมอกยามเช้าและเสียงนกร้อง\n07:30 – Breakfast อาหารเช้าแสนอบอุ่นสไตล์ชาวดอย\n09:00 – Final trekking section เดินศึกษาธรรมชาติเส้นทางสุดท้ายและแวะหมู่บ้านปกาเกอะญอ\n13:00 – Exit forest ออกจากเขตป่า พักผ่อนและอาบน้ำเปลี่ยนชุด\n17:00 – Expedition ends ส่งกลับถึงตัวเมืองเชียงใหม่โดยสวัสดิภาพ',
                images: [
                    'https://res.cloudinary.com/dljdzrcp7/image/upload/v1769666637/C0F06D14-4FF1-413D-B4AC-E4ECE17A6391_1_105_c_isj1lh.jpg',
                    '/images/articles/monks-trail-wat-pha-lat.jpg'
                ]
            }
        ]
    }, { merge: true });
    console.log(`Updated ${trek3d2nId}`);

    // 2. Huay Kub Kab 2D1N
    const huayKubKabId = 'huay-kub-kab';
    await tripsRef.doc(huayKubKabId).set({
        itinerary: [
            {
                day: 'Day 1',
                title: 'ขึ้น 4WD ลุยสันเขา และชมพระอาทิตย์ตกห้วยกุ๊บกั๊บ',
                desc: '08:00 – Meet in Chiang Mai city นัดพบในเมืองเชียงใหม่\n08:30 – Depart for Mae Taeng เดินทางสู่อำเภอแม่แตง\n10:30 – Arrive at local village เปลี่ยนขึ้นรถกระบะ 4WD ยกสูง\n11:00 – 4WD ride to mountain ridge ลุยเส้นทางออฟโรดขึ้นสู่ยอดดอยห้วยกุ๊บกั๊บ\n12:30 – Local lunch รับประทานอาหารพื้นบ้านชาวลาหู่\n13:30 – Short trek to viewpoint เดินเท้าเบาๆ ชมวิวสันเขาแบบ 360 องศา\n16:30 – Sunset viewpoint ชมพระอาทิตย์ตกดินอันงดงามเหนือทะเลหมอก\n18:00 – Dinner at homestay อิ่มอร่อยกับมื้อค่ำล้อมวงกินข้าว\n19:30 – Free time นอนดูดาวบนระเบียงโฮมสเตย์',
                images: [
                    '/images/articles/huay-kub-kab-mist.jpg',
                    'https://res.cloudinary.com/dljdzrcp7/image/upload/v1769665452/IMG_3527_nfpxp2.webp',
                    'https://res.cloudinary.com/dljdzrcp7/image/upload/f_webp/v1769665453/IMG_3528_vlrbuu'
                ]
            },
            {
                day: 'Day 2',
                title: 'ทะเลหมอกยามเช้า ดอยผาสามเหลี่ยม และเดินทางกลับ',
                desc: '04:00 – Wake-up call ตื่นเช้าเตรียมตัวเดินเท้าขึ้นยอดดอยผาสามเหลี่ยม\n07:00 – Sunrise viewpoint trek สัมผัสทะเลหมอกสีทองยามเช้าสุดอลังการ\n09:30 – Breakfast at homestay กลับมารับประทานอาหารเช้าและกาแฟดริป\n11:30 – Prepare to return เก็บสัมภาระและอำลาเจ้าบ้าน\n14:00 – Depart for Chiang Mai ลงดอยด้วยรถ 4WD และเดินทางกลับตัวเมือง\n15:30 – Arrive in Chiang Mai เดินทางถึงเมืองเชียงใหม่โดยสวัสดิภาพ',
                images: [
                    'https://res.cloudinary.com/dljdzrcp7/image/upload/v1769753441/F691E82A-7C1A-4B50-B930-7F5489153550_1_102_o_jkbnlr.jpg',
                    'https://res.cloudinary.com/dljdzrcp7/image/upload/v1769753521/83F21836-868D-4880-83E8-EC144790CC6E_1_102_o_t7vkc1.jpg',
                    'https://res.cloudinary.com/dljdzrcp7/image/upload/v1769665913/24A1CB96-B287-4CE5-8732-4D9C6595632F_dqvexq.webp'
                ]
            }
        ]
    }, { merge: true });
    console.log(`Updated ${huayKubKabId}`);

    // 3. Chiang Dao – Muang Khong 2D1N
    const chiangdaoId = 'chiangdao-muangkhong';
    await tripsRef.doc(chiangdaoId).set({
        itinerary: [
            {
                day: 'Day 1',
                title: 'เชียงดาว สู่อ้อมกอดหุบเขาเมืองคอง',
                desc: '08:00 – Meet in Chiang Mai city นัดพบในตัวเมืองเชียงใหม่\n08:30 – Depart for Chiang Dao มุ่งหน้าสู่ดินแดนดอยหลวงเชียงดาว\n10:30 – Stop at local viewpoint จุดชมวิวดอยหลวงเชียงดาว พักดื่มกาแฟ\n12:00 – Lunch at local restaurant อาหารกลางวันพื้นบ้าน\n13:30 – Arrive at Muang Khong village ลัดเลาะผ่านขุนเขาสู่ชุมชนเมืองคอง เช็คอินโฮมสเตย์\n15:00 – Village walk เดินเล่นชมทุ่งนา วิถีชีวิตชนบท และลำน้ำคอง\n18:00 – Dinner with local dishes อาหารค่ำรสชาติท้องถิ่น\n19:30 – Cultural sharing พูดคุยแลกเปลี่ยนเรื่องราวกับคนในชุมชน',
                images: [
                    '/images/articles/chiang-dao-summit.jpg',
                    'https://res.cloudinary.com/dljdzrcp7/image/upload/v1769752253/677C13D8-60F6-4085-883A-9C59DE31EC90_1_102_o_mez8yv.jpg',
                    '/images/articles/mae-klang-luang-rice.jpg'
                ]
            },
            {
                day: 'Day 2',
                title: 'หมอกยามเช้า วิถีทุ่งนา และเดินทางกลับ',
                desc: '06:30 – Morning walk ชมไอหมอกลอยเหนือน้ำคองและทุ่งนาเขียวขจี\n07:30 – Breakfast อาหารเช้าสไตล์ท้องถิ่น\n09:00 – Visit local temples สักการะวัดโบราณของหมู่บ้าน\n11:30 – Lunch รับประทานอาหารกลางวัน\n13:00 – Depart for Chiang Mai ออกเดินทางกลับสู่เมืองเชียงใหม่\n17:00 – Arrive in Chiang Mai เดินทางถึงจุดหมายปลายทางโดยสวัสดิภาพ',
                images: [
                    'https://res.cloudinary.com/dljdzrcp7/image/upload/f_webp/v1769752727/FullSizeRender_tz3hoo',
                    'https://res.cloudinary.com/dljdzrcp7/image/upload/f_webp/v1769752729/IMG_3448_axnxgf'
                ]
            }
        ]
    }, { merge: true });
    console.log(`Updated ${chiangdaoId}`);

    console.log('Finished updating itinerary images successfully!');
}

updateItineraryImages().catch(err => {
    console.error('Failed to update:', err);
    process.exit(1);
});
