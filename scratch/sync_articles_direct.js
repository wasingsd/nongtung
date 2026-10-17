const fs = require('fs');
const path = require('path');
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

const sa = JSON.parse(fs.readFileSync('serviceAccountKey.json', 'utf8'));
const app = initializeApp({ credential: cert(sa) });
const db = getFirestore(app);

// Accurate images mapping
const updates = {
  'top-5-trails-chiang-mai': {
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
        caption: 'เส้นทางเดินป่าดึกดำบรรพ์ กิ่วแม่ปาน ดอยอินทนนท์',
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
    ]
  },
  'camping-101-beginner-guide': {
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
    ]
  },
  'hidden-gems-chiang-mai-trekking': {
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
    ]
  },
  'why-rent-private-van-chiang-mai': {
    coverImage: '/images/articles/vip-commuter-van.jpg',
    subImages: [
      {
        id: 'van-sub-1',
        url: '/images/articles/vip-van-interior.jpg',
        caption: 'Spacious VIP reclining captain seats and cool climate control for winding mountain roads',
        position: 'mid'
      }
    ]
  },
  'ultimate-glamping-experience-doi-inthanon': {
    coverImage: '/images/articles/glamping-luxury-tent.jpg',
    subImages: [
      {
        id: 'glamp-sub-1',
        url: '/images/articles/campfire-evening.jpg',
        caption: 'Cozy campfire evening and hot Mookata under starry mountain skies',
        position: 'mid'
      }
    ]
  },
  'ultimate-trekking-guide-chiang-mai-2025': {
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
    ]
  },
  'chiang-mai-camping-gear-rental-guide': {
    coverImage: '/images/articles/camping-gear-rental.jpg',
    subImages: [
      {
        id: 'rental-sub-1',
        url: '/images/articles/camping-tent-setup.jpg',
        caption: 'อุปกรณ์และเต็นท์ทุกชุดผ่านการซัก อบฆ่าเชื้อ และตากแดดสนิท 100% ก่อนส่งมอบ',
        position: 'mid'
      }
    ]
  },
  'corporate-outing-teambuilding-chiang-mai': {
    coverImage: '/images/articles/corporate-teambuilding.jpg',
    subImages: [
      {
        id: 'corp-sub-1',
        url: '/images/articles/mae-taeng-rafting.jpg',
        caption: 'กิจกรรมถ่อแพไม้ไผ่และล่องแก่งแม่แตง สร้างความสามัคคีและการทำงานร่วมกันเป็นทีม',
        position: 'mid'
      }
    ]
  },
  'chiang-mai-trail-trekking-comparison': {
    coverImage: '/images/articles/kew-mae-pan-ridge.jpg'
  },
  'chiang-mai-best-camping-spots-comparison': {
    coverImage: '/images/articles/san-pa-kia-camp.jpg'
  }
};

async function run() {
  for (const [slug, data] of Object.entries(updates)) {
    await db.collection('articles').doc(slug).set(data, { merge: true });
    console.log(`✓ Updated Firestore article: ${slug} -> ${data.coverImage}`);
  }
  console.log('All articles updated successfully in Firestore!');
}

run().catch(console.error).finally(() => process.exit(0));
