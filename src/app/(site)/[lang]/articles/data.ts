export interface ArticleSubImage {
    id?: string;
    url: string;
    caption?: string;
    position: 'mid' | 'bottom';
}

export interface Article {
    slug: string;
    title: string;
    excerpt: string;
    coverImage: string;
    subImages?: ArticleSubImage[];
    date: string;
    author: string;
    readingTime: string;
    tags: string[];
    keywords: string[]; // For SEO meta tags
    content: string; // HTML or Markdown content
    relatedTripId?: string; // ID of the trip to promote
    relatedRentalId?: string; // ID of the rental item to promote
    mapCoordinates?: {
        start: [number, number];
        end?: [number, number];
        zoom?: number;
    };
}

export const articles: Article[] = [
    {
        slug: 'top-5-trails-chiang-mai',
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
        ],
        date: '2025-06-15',
        author: 'Nongtung Team',
        readingTime: '10 min read',
        tags: ['Chiang Mai', 'Trekking', 'Nature', 'Guide'],
        keywords: ['เดินป่าเชียงใหม่', 'เส้นทางศึกษาธรรมชาติ', 'ดอยเชียงใหม่', 'Trekking Chiang Mai', 'เที่ยวเชียงใหม่หน้าฝน', 'จุดชมวิวดอยหลวง'],
        relatedTripId: 'chiang-dao-hike',
        content: `
            <p class="lead">เชียงใหม่... จังหวัดที่ใครๆ ก็ตกหลุมรัก แต่ถ้าคุณเป็นสายลุยที่เบื่อคาเฟ่ แล้วอยากเซไปหาเขา วันนี้ <strong>Nongtung</strong> ขอเปิดลายแทง 5 เส้นทางเดินป่าที่คุณไม่ควรพลาด! คัดมาแล้วเน้นๆ ตั้งแต่เดินชิลล์ๆ หลังมอ ไปจนถึงพิชิตยอดเขาสูงเสียดฟ้า</p>

            <hr>

            <h2>1. ดอยหลวงเชียงดาว - ยอดเขาที่สูงเป็นอันดับ 3 ของไทย (The Star of Chiang Mai)</h2>
            <p>ถ้าหัวใจเรียกร้องหาความท้าทาย ดอยหลวงเชียงดาวคือคำตอบ นี่คือ "Dream Destination" ของนักเดินป่าทั่วไทย ด้วยความสูง 2,225 เมตรจากระดับน้ำทะเล ทำให้ที่นี่มีสภาพอากาศแบบกึ่งอัลไพน์ (Sub-alpine) แห่งเดียวในไทย</p>
            
            <h3>ไฮไลท์ที่คุณจะได้เจอ</h3>
            <ul>
                <li><strong>ดอกเทียนนกแก้ว:</strong> ดอกไม้รูปร่างเหมือนนกแก้วกางปีก ที่มีที่เดียวในโลก จะบานช่วงปลายฝนต้นหนาว</li>
                <li><strong>กวางผา:</strong> สัตว์ป่าสงวนหายาก ถ้าโชคดีคุณอาจเห็นน้องๆ ออกมายืนรับแดดยามเช้า</li>
                <li><strong>ทะเลหมอก 360 องศา:</strong> โดยเฉพาะที่จุดชมวิวกิ่วลม ที่สวยจนแทบหยุดหายใจ</li>
            </ul>

            <h3>ข้อมูลการเดินป่า</h3>
            <ul>
                <li><strong>ระดับความยาก:</strong> ปานกลาง - ยาก (ต้องจ้างลูกหาบและคนนำทาง)</li>
                <li><strong>ระยะเวลา:</strong> 2 วัน 1 คืน หรือ 3 วัน 2 คืน</li>
                <li><strong>ช่วงเวลาเปิด:</strong> พฤศจิกายน - กุมภาพันธ์ (ต้องจองคิวผ่านเขตรักษาพันธุ์สัตว์ป่าฯ)</li>
            </ul>

            <hr>

            <h2>2. กิ่วแม่ปาน - สัมผัสป่าเมฆบนจุดสูงสุดแดนสยาม</h2>
            <p>สำหรับมือใหม่ที่อยากสัมผัส "ป่าดึกดำบรรพ์" โดยไม่ต้องเดินไกล กิ่วแม่ปานบนดอยอินทนนท์คือตัวเลือกที่ดีที่สุด</p>
            
            <h3>ความมหัศจรรย์ของกิ่วแม่ปาน</h3>
            <p>เส้นทางวงกลมระยะทาง 3.2 กิโลเมตรนี้ จะพาคุณเดินผ่านป่าดิบชื้นที่เต็มไปด้วยมอสและเฟิร์น (เหมือนเดินในหนัง Avatar) ก่อนจะทะลุออกมาเจอทุ่งหญ้ากึ่งอัลไพน์บนสันเขา ที่ซึ่งคุณจะเห็นเมฆลอยอยู่ระดับสายตา</p>

            <h3>คำแนะนำ</h3>
            <ul>
                <li><strong>การแต่งกาย:</strong> อากาศหนาวเย็นตลอดปี อุณหภูมิเฉลี่ย 10-15 องศา ควรพกเสื้อกันลมชมพู</li>
                <li><strong>ไกด์ท้องถิ่น:</strong> ต้องใช้ไกด์ม้งท้องถิ่นนำทาง (ค่าบริการ 200 บาท/กลุ่ม) รายได้เข้าสู่ชุมชนโดยตรง</li>
            </ul>

            <hr>

            <h2>3. เส้นทางผาดอกเสี้ยว (น้ำตกรักจัง) - ตามรอยวิถีปกาเกอะญอ</h2>
            <p>ใครที่ชอบเดินป่าสลับกับวิถีชีวิตชุมชน ต้องมาที่นี่ เส้นทางนี้ตั้งอยู่ที่บ้านแม่กลางหลวง</p>
            
            <h3>เดินป่า จิบกาแฟ แช่น้ำตก</h3>
            <p>คุณจะเริ่มต้นด้วยการเดินผ่านป่าสนและป่าไผ่ ก่อนจะเจอน้ำตกผาดอกเสี้ยวชั้น 7 ที่สวยงามอลังการ (ถ่ายรูปสวยมาก) จากนั้นเส้นทางจะพาคุณเดินเลาะนาขั้นบันไดสีเขียวขจีในช่วงหน้าฝน หรือสีทองอร่ามในช่วงหน้าหนาว ปิดท้ายด้วยการชิมกาแฟสดที่ชาวบ้านปลูกและคั่วเอง</p>

            <div class="alert alert-info">
                <strong>Tips:</strong> ช่วงเวลาที่นาข้าวสวยที่สุดคือ กันยายน - ตุลาคม (ข้าวเขียว) และ ปลายตุลาคม - ต้นพฤศจิกายน (ข้าวทอง)
            </div>

            <hr>

            <h2>4. ดอยปุย (Nature Trail) - เส้นทางลับหลังพระตำหนัก</h2>
            <p>ไม่ต้องขับรถไปไกลจากตัวเมือง ก็สัมผัสป่าสนสวยๆ ได้ ดอยปุยมีเส้นทางศึกษาธรรมชาติหลายเส้นทาง แต่เส้นทางยอดฮิตคือเส้นทางสู่ยอดดอยปุย</p>
            
            <h3>ทำไมต้องไปเดินที่ดอยปุย?</h3>
            <p>เพราะที่นี่ "เงียบสงบ" อย่างเหลือเชื่อ ทั้งที่อยู่ห่างจากดอยสุเทพนิดเดียว ป่าสนสามใบที่นี่สูงใหญ่และเรียงรายสวยงาม พื้นดินปูด้วยพรมใบสนนุ่มเท้า เหมาะกับการมา Trail Running หรือเดินสูดอากาศบริสุทธิ์</p>
            <ul>
                <li><strong>ความชัน:</strong> มีช่วงชันบ้าง แต่โดยรวมเดินง่าย</li>
                <li><strong>กลิ่นอาย:</strong> กลิ่นยางสนหอมอ่อนๆ ช่วยผ่อนคลายความเครียดได้ดีเยี่ยม</li>
            </ul>

            <hr>

            <h2>5. Monk's Trail (Wat Pha Lat) - เส้นทางแสวงบุญแห่งขุนเขา</h2>
            <p>เส้นทางสายมูเตลูและสายธรรมชาติที่ผสมผสานกันอย่างลงตัว นี่คือเส้นทางเก่าแก่ที่พระสงฆ์ใช้เดินขึ้นวัดพระธาตุดอยสุเทพมาหลายร้อยปี</p>
            
            <h3>ความขลังที่คุณสัมผัสได้</h3>
            <p>ตลอดเส้นทางคุณจะเห็น "ผ้าจีวร" ผูกไว้ตามต้นไม้ เป็นสัญลักษณ์นำทาง ไฮไลท์คือเมื่อเดินไปถึงครึ่งทาง คุณจะพบกับ <strong>วัดผาลาด</strong> วัดป่าที่ซ่อนตัวอยู่อย่างเงียบเชียบ มีน้ำตกไหลผ่านกลางวัด สถาปัตยกรรมแบบพม่าผสมล้านนาที่ปกคลุมด้วยมอสเขียวขจี ให้ความรู้สึกเหมือนหลุดไปอีกมิติ</p>
            
            <p><em>(อ่านรีวิวเจาะลึก Monk's Trail ได้ในบทความ Hidden Gems ของเรา)</em></p>

            <hr>

            <h2>เตรียมตัวอย่างไรก่อนไปเดินป่าเชียงใหม่?</h2>
            
            <h3>Checklist ของมันต้องมี</h3>
            <ol>
                <li><strong>รองเท้า:</strong> ผ้าใบดอกยางลึก หรือรองเท้า Trekking โดยเฉพาะ (พื้นลื่นนะขอบอก)</li>
                <li><strong>น้ำดื่ม:</strong> อย่างน้อย 1.5 ลิตร ขาดน้ำบนเขาคือเรื่องใหญ่</li>
                <li><strong>เสื้อกันฝน/ถุงกันทาก:</strong> ถ้ามาหน้าฝน (ก.ค. - ต.ค.) ทากชุมและฝนตกได้ตลอดเวลา</li>
                <li><strong>ถุงขยะ:</strong> กฎเหล็กของ Nongtung คือ "นำขยะกลับลงมาทุกชิ้น"</li>
            </ol>

            <blockquote>
                "ธรรมชาติสวยงามเสมอ สำหรับผู้ที่รู้จักชื่นชมและเคารพ"
            </blockquote>
        `
    },
    {
        slug: 'camping-101-beginner-guide',
        title: 'มือใหม่หัดแคมป์? คู่มือเตรียมตัวและอุปกรณ์ฉบับครบจบในที่เดียว ⛺',
        excerpt: 'อยากลองนอนเต็นท์ดูสักครั้งแต่ไม่รู้จะเริ่มยังไง? สรุป Checklist อุปกรณ์ที่ต้องมี วิธีเลือกทำเลกางเต็นท์ และเทคนิคการเอาตัวรอดในคืนแรก',
        coverImage: '/videos/reel-1-cover.jpg',
        date: '2025-06-20',
        author: 'Camp Master',
        readingTime: '12 min read',
        tags: ['Camping', 'Tips', 'Gear', 'Beginner'],
        keywords: ['กางเต็นท์มือใหม่', 'อุปกรณ์แคมป์ปิ้ง', 'จุดกางเต็นท์เชียงใหม่', 'เช่าเต็นท์เชียงใหม่', 'เตรียมตัวแคมป์ปิ้ง', 'Camping 101'],
        relatedRentalId: 'tent-k2',
        content: `
            <p class="lead">การนอนฟังเสียงธรรมชาติ ตื่นมาดูพระอาทิตย์ขึ้น จิบกาแฟดริปร้อนๆ ท่ามกลางหมอกจางๆ... ฟังดูโรแมนติกใช่ไหมครับ? แต่ถ้าเตรียมตัวไม่ดี ความโรแมนติกอาจกลายเป็นฝันร้ายได้! ไม่ว่าจะเป็นเต็นท์รั่ว หนาวจนนอนไม่หลับ หรือแมลงกวนใจ</p>
            
            <p>ไม่ต้องห่วง <strong>Nongtung</strong> รวบรวมทุกสิ่งที่มือใหม่ต้องรู้มาไว้ที่นี่แล้ว</p>

            <hr>

            <h2>1. อุปกรณ์พื้นฐาน: 3 สิ่งที่ "ต้องมี" (The Big Three)</h2>
            <p>วงการเดินป่าเรียกสิ่งเหล่านี้ว่า "Big Three" ถ้าขาดไปอย่างใดอย่างหนึ่ง ทริปนั้นล่มแน่นอน</p>
            
            <h3>1.1 เต็นท์ (The Shelter)</h3>
            <p>บ้านของคุณในป่า ต้องกันน้ำและระบายอากาศได้ดี</p>
            <ul>
                <li><strong>เลือกยังไง:</strong> ถ้าไป 2 คน ให้เลือกเต็นท์สำหรับ 3 คน เพราะต้องเผื่อที่วางสัมภาระ</li>
                <li><strong>ฟลายชีท (Flysheet):</strong> ผ้าคลุมเต็นท์ชั้นนอก สำคัญมาก เพราะมันคือเกราะกันฝนและน้ำค้าง</li>
            </ul>

            <h3>1.2 ถุงนอน (Sleeping Bag)</h3>
            <p>ดอยเชียงใหม่อากาศเย็นตลอดปี โดยเฉพาะกลางคืน</p>
            <ul>
                <li><strong>Comfort temp:</strong> ให้ดูค่านี้ที่ข้างถุง แนะนำที่ 15 องศาลงไปสำหรับหน้าหนาวเชียงใหม่</li>
                <li><strong>Tips:</strong> หากขี้หนาว ใส่ชุดลองจอนนอนช่วยได้มาก</li>
            </ul>

            <h3>1.3 แผ่นรองนอน (Sleeping Pad)</h3>
            <p>มือใหม่มักมองข้ามสิ่งนี้! คิดว่านอนพื้นเต็นท์ก็ได้... ผิดมหันต์!</p>
            <ul>
                <li><strong>หน้าที่:</strong> ไม่ใช่แค่ทำให้นุ่ม แต่ช่วย "บล็อกความเย็น" จากพื้นดินไม่ให้เข้าสู่ร่างกายเรา ถ้าไม่มีแผ่นรองนอน ต่อให้ถุงนอนเทพแค่ไหนก็นอนหนาวสั่นทั้งคืน</li>
            </ul>

            <hr>

            <h2>2. อุปกรณ์เสริม: มีแล้วชีวิตดีขึ้น 300%</h2>
            <p>เมื่อปัจจัย 4 ครบ ก็มาเติมเต็มความสุขด้วยสิ่งเหล่านี้:</p>
            <ol>
                <li><strong>เก้าอี้แคมป์:</strong> เพราะการนั่งขัดสมาธิบนพื้นนานๆ มันปวดหลัง เก้าอี้ดีๆ สักตัวจะทำให้คุณนั่งคุยกับเพื่อนได้ยาวๆ</li>
                <li><strong>ไฟฉายคาดหัว:</strong> ดีกว่าไฟฉายมือถือมหาศาล เพราะคุณจะว่างมือไปทำกับข้าวหรือหาของได้</li>
                <li><strong>พาวเวอร์แบงค์:</strong> ขาดไม่ได้ในยุคนี้</li>
                <li><strong>ลำโพงบลูทูธ (เล็กๆ):</strong> เปิดเพลงคลอเบาๆ สร้างบรรยากาศ (แต่ระวังอย่าเสียงดังรบกวนเต็นท์ข้างๆ นะ)</li>
            </ol>

            <hr>

            <h2>3. เลือกทำเลกางเต็นท์ยังไงให้รอด?</h2>
            <p>ถึงลานกางเต็นท์แล้ว จะปักหลักตรงไหนดี?</p>
            
            <h3>DOs (ควรทำ)</h3>
            <ul>
                <li><strong>พื้นที่ราบเรียบ:</strong> เคลียร์ก้อนหินและกิ่งไม้ออกก่อน ไม่เช่นนั้นหลังคุณระบมแน่</li>
                <li><strong>ใต้ร่มไม้ (บางส่วน):</strong> ช่วยบังแดดตอนเช้า ทำให้ตื่นสายได้หน่อย ไม่ร้อนอบอ้าว</li>
                <li><strong>ใกล้แหล่งน้ำ/ห้องน้ำ:</strong> แต่ไม่ควรใกล้เกินไป จะหนวกหูและมีกลิ่น</li>
            </ul>

            <h3>DON'Ts (ห้ามทำเด็ดขาด)</h3>
            <ul>
                <li><strong>ทางน้ำไหล:</strong> สังเกตร่องรอยบนพื้น ห้ามกางทับทางน้ำเด็ดขาด อันตรายมากหากฝนตกหนักกลางดึก</li>
                <li><strong>ใต้ต้นไม้แห้ง:</strong> กิ่งไม้แห้งอาจหล่นใส่เต็นท์ได้ทุกเมื่อ</li>
                <li><strong>ทางลม:</strong> ถ้าลมแรง ให้หันด้านแคบของเต็นท์สู้ลม หรือหาแนวพุ่มไม้บังลม</li>
            </ul>

            <hr>

            <h2>4. เมนูยอดฮิต: กินอะไรดีในป่า?</h2>
            <p>แน่นอนว่าเบอร์ 1 คือ <strong>"หมูกระทะ"</strong> แต่ถ้าอยากแอดวานซ์ ลองเมนูเหล่านี้:</p>
            <ul>
                <li><strong>มาม่าปลากระป๋องไข่ลวก:</strong> เมนูสิ้นคิดที่อร่อยน้ำตาไหลเมื่ออยู่บนดอย</li>
                <li><strong>ไข่เจียว:</strong> การเจียวไข่ในป่าเป็นศิลปะอย่างหนึ่ง</li>
                <li><strong>กาแฟดริป:</strong> ตอนเช้าๆ กับอากาศเย็นๆ ฟินที่สุด</li>
            </ul>

            <div class="alert alert-warning">
                <strong>ระวัง!</strong> อย่าทิ้งเศษอาหารไว้รอบเต็นท์ เพราะมดและสัตว์ป่าจะมาเยี่ยมเยียน
            </div>

            <hr>

            <h2>5. มารยาทชาวแคมป์ (Camping Etiquette)</h2>
            <p>สังคมแคมป์ปิ้งน่ารักได้ถ้าทุกคนช่วยกัน</p>
            <ul>
                <li><strong>ลดเสียงหลัง 4 ทุ่ม:</strong> ช่วงเวลานี้คือเวลาพักผ่อน งดใช้เสียงดัง งดดนตรี</li>
                <li><strong>ไฟส่องสว่าง:</strong> อย่าส่องไฟเข้าเต็นท์คนอื่น</li>
                <li><strong>Leave No Trace:</strong> เก็บขยะกลับไปทิ้งข้างล่างให้หมด ไม่เหลือไว้แม้แต่ชิ้นเดียว</li>
            </ul>

            <p>พร้อมหรือยัง? ถ้าอุปกรณ์ยังไม่ครบ แวะมาเช่าที่เราได้ที่ <strong>Nongtung Rental</strong> เรามีครบทุกอย่าง สะอาด พร้อมใช้งาน!</p>
        `
    },
    {
        slug: 'hidden-gems-chiang-mai-trekking',
        title: 'Monk\'s Trail & Hidden Waterfalls: The Authentic Chiang Mai Trekking Guide 🛕',
        excerpt: 'Skip the tourist traps. Discover the spiritual Monk\'s Trail (Wat Pha Lat) and lush hidden waterfalls. A guide for those seeking an authentic connection with Northern Thailand\'s nature.',
        coverImage: '/videos/reel-2-img-3.jpg',
        date: '2025-07-01',
        author: 'Nongtung Local Expert',
        readingTime: '15 min read',
        tags: ['Chiang Mai', 'Trekking', 'Monk\'s Trail', 'Hidden Gems'],
        keywords: ['Monk\'s Trail Chiang Mai', 'Wat Pha Lat hike', 'Authentic trekking Chiang Mai', 'Hidden waterfalls Northern Thailand', 'Nature trails Chiang Mai', 'Doi Suthep hike'],
        mapCoordinates: {
            start: [18.7946, 98.9472], // Basecamp
            end: [18.7997, 98.9348],   // Wat Pha Lat
            zoom: 15
        },
        relatedTripId: 'doi-pui-hike',
        content: `
            <p class="lead">Chiang Mai is a city of layers. There's the ancient city walls, the bustling markets, and the glossy cafes. But peel back the noise, and you find the soul of the north: its green, silent mountains. If you're looking for an experience that feels less like a tour and more like a pilgrimage, you're in the right place.</p>

            <h2>Why "Authentic" Matters in 2025</h2>
            <p>In a post-pandemic world, travel has shifted. We're not just box-ticking anymore. We're seeking connection—to nature, to history, and to ourselves. The trails we recommend at Nongtung aren't just dirt paths; they are historic routes used by monks, hill tribes, and locals for centuries.</p>
            <p>Respect is key. These forests are often sacred. When we hike, we hike with humility.</p>

            <hr>

            <h2>1. The Monk's Trail (Wat Pha Lat) - A Spiritual Ascent</h2>
            <p>This path, known locally as the "Palaad" trail (slope trail), is the absolute jewel of Doi Suthep. Yet, many tourists speed past it in Red Trucks on their way to the main temple at the summit. They miss the magic.</p>
            
            <h3>The History</h3>
            <p>For hundreds of years, this was the only way up the mountain. Monks would walk this path to meditate in the solitude of the jungle. The trail itself is marked by strips of saffron orange monk robes tied to trees—a gentle reminder of where you are.</p>
            <p>Legend has it that white elephants once roamed these hills, carrying sacred relics. The path follows the spirit of these ancient journeys.</p>

            <h3>The Route Details</h3>
            <ul>
                <li><strong>Trailhead:</strong> End of Suthep Road (Behind Chiang Mai University), near Basecamp Coffee House.</li>
                <li><strong>Distance:</strong> ~2km to Wat Pha Lat.</li>
                <li><strong>Duration:</strong> 30-45 minutes one way.</li>
                <li><strong>Difficulty:</strong> Moderate entry-level. Some steep rocky sections.</li>
            </ul>

            <h3>The Destination: Wat Pha Lat</h3>
            <p>Unlike the gold-plated grandeur of Doi Suthep, Wat Pha Lat is a temple that seems to grow <em>out</em> of the jungle. Ancient stone guardians are covered in moss. A waterfall cuts right through the temple grounds. There are no fortune tellers, no loud bells—just pure Zen.</p>
            <p><strong>Note:</strong> While you can hike further up to Wat Phra That Doi Suthep (another 1-1.5 hours), many find Wat Pha Lat to be the spiritual highlight.</p>

            <h3>Practical Tips</h3>
            <ul>
                <li><strong>Best Time:</strong> 6:00 AM. You might catch the monks on their morning alms round, and the light filtering through the trees is ethereal.</li>
                <li><strong>Dress Code:</strong> <strong>Strictly enforced.</strong> Shoulders and knees MUST be covered. It is an active temple zone. No tank tops or short shorts.</li>
                <li><strong>Footwear:</strong> Flip-flops are a bad idea. Wear sneakers with good grip.</li>
            </ul>

            <hr>

            <h2>2. Doi Pui Summit - The Roof of the City</h2>
            <p>If Monk's Trail is for the soul, Doi Pui is for the lungs. At 1,600+ meters above sea level, the air here is crisp, cool, and smells distinctly of pine.</p>

            <h3>The Campground Trail</h3>
            <p>Drive past the Hmong Village and up to the Doi Pui Campground. From there, a trail winds up to the summit. In January, you might see the Wild Himalayan Cherry blossoms (Thai Sakura) painting the mountain pink.</p>

            <h3>Connection to Hill Tribes</h3>
            <p>This area is home to the Hmong people. The trails here were once opium trade routes, now transformed into eco-tourism paths. Hiring a local Hmong guide not only supports the community but unlocks stories you won't find in any guidebook.</p>

            <hr>

            <h2>3. Sticky Waterfalls (Bua Tong) - Nature's Playground</h2>
            <p>About an hour north of the city lies a geological wonder. The limestone rocks here provide so much grip that you can literally walk <em>up</em> the waterfall like Spiderman.</p>
            
            <h3>Why Go?</h3>
            <p>It's fun, it's refreshing, and it's unlike anywhere else on earth. Perfect for a hot afternoon when the city heat gets too much. There are multiple levels to explore, and a nice picnic area at the top.</p>

            <hr>

            <h2>Travel Etiquette & Safety</h2>
            <p>Northern Thailand is safe, but the jungle demands respect.</p>
            <ol>
                <li><strong>Leave No Trace:</strong> Bring a trash bag. Pick up plastic even if it's not yours.</li>
                <li><strong>Stay on the Trail:</strong> Shortcuts cause erosion and damage delicate ecosystems.</li>
                <li><strong>Wildlife:</strong> You might see snakes or monkeys. Keep distance. Do not feed them.</li>
                <li><strong>Insects:</strong> Mosquito repellent is your best friend.</li>
            </ol>

            <blockquote>
                "Walk where the locals walk, eat where the locals eat. That's the Nongtung way."
            </blockquote>
        `
    },
    {
        slug: 'why-rent-private-van-chiang-mai',
        title: 'Why Private Van Rental is the Best Way to Explore Northern Thailand 🚐 (2025 Guide)',
        excerpt: 'Planning a road trip to Pai or Chiang Rai? Forget the crowded buses. Here is why renting a private van with a driver is the smartest travel hack for your group. Plus, a complete 3-day itinerary.',
        coverImage: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=1200',
        date: '2025-07-05',
        author: 'Nongtung Logistics',
        readingTime: '12 min read',
        tags: ['Transport', 'Road Trip', 'Van Rental', 'Chiang Mai', 'Pai'],
        keywords: ['Rent a van Chiang Mai', 'Private driver Northern Thailand', 'Chiang Mai to Pai transport', 'Van rental with driver', 'VIP Van Chiang Mai', 'Mae Hong Son Loop van'],
        relatedRentalId: 'commuter-van',
        content: `
            <p class="lead">The road to Pai features 762 legendary curves. Navigating them yourself? Stressful. Being driven in a VIP van with reclining seats while sipping iced coffee? Bliss.</p>

            <h2>The Northern Road Trip Dilemma</h2>
            <p>Northern Thailand serves up some of the best road trip routes in Southeast Asia. The Loop to Mae Hong Son. The climb to Doi Inthanon. The winding path to Chiang Rai. But let's be real. The roads are narrow, steep, and full of surprises (stray dogs, motorbikes, sharp turns). Public minivans are notoriously fast and crowded.</p>
            <p>Driving yourself requires intense focus, meaning you miss the views. Plus, navigating Thai traffic laws (or lack thereof) can be daunting for international visitors.</p>

            <hr>

            <h2>Enter the Private VIP Van (Toyota Commuter)</h2>
            <p>Renting a Toyota Commuter with a professional driver isn't just a luxury; for groups of 4 or more, it's the smartest logistical move.</p>

            <h3>1. Freedom & Flexibility</h3>
            <p>Want to stop at that random strawberry farm? Go for it. Need a bathroom break <em>now</em>? Done. You control the playlist, the AC temperature, and the schedule. No waiting for stragglers at the bus station.</p>

            <h3>2. Cost Breakdown (The Math Works)</h3>
            <p>Let's do the math for a trip to Chiang Rai for 8 people:</p>
            <ul>
                <li><strong>Public Bus:</strong> ~300 THB x 8 = 2,400 THB (plus Grab to/from bus stations = ~500 THB). Total ~2,900 THB.</li>
                <li><strong>Private Van:</strong> ~2,500 - 3,000 THB per day (excluding fuel).</li>
            </ul>
            <p>For roughly the same price per person, you get door-to-door service, zero hassle, and total comfort. It's a no-brainer.</p>

            <h3>3. Safety First</h3>
            <p>Our drivers are locals who know every pothole on the Mae Hong Son Loop. They drive these roads daily. Our vans are equipped with GPS tracking and speed limiters to ensure a smooth, safe ride.</p>

            <hr>

            <h2>Sample Itinerary: The Mae Hong Son Loop (3 Days)</h2>
            <p>This is our most popular request. Doing this loop in a private van is a game changer.</p>

            <h3>Day 1: Chiang Mai to Pai (The Curve conqueror)</h3>
            <ul>
                <li><strong>08:00:</strong> Pick up at hotel. Head north on Route 1095.</li>
                <li><strong>10:00:</strong> Coffee stop at 'Witch's Hut' café. Stretch your legs.</li>
                <li><strong>12:00:</strong> Arrive at Pai Canyon. Walk the ridge for photos.</li>
                <li><strong>14:00:</strong> Check-in at riverside resort. Lunch at a local Shan noodle shop.</li>
                <li><strong>17:00:</strong> Sunset at Wat Phra That Mae Yen (White Buddha). 353 steps up!</li>
                <li><strong>19:00:</strong> Pai Night Market (Walking Street) for street food (Gyoza, Lasagna, Mango Sticky Rice).</li>
            </ul>

            <h3>Day 2: Pai to Ban Rak Thai (The Chinese Village)</h3>
            <ul>
                <li><strong>09:00:</strong> Visit Lod Cave. Bamboo rafting inside the cave with gas lanterns.</li>
                <li><strong>12:00:</strong> Scenic drive through the mountains towards the border.</li>
                <li><strong>13:00:</strong> Lunch at 'Ja Bo Noodle' – where you hang your legs off a cliff while eating noodles.</li>
                <li><strong>15:00:</strong> Arrive at Ban Rak Thai, the misty Chinese tea village.</li>
                <li><strong>16:00:</strong> Boat ride on the serene lake. Tea tasting session (Oolong No. 12).</li>
                <li><strong>Night:</strong> Stay in a mud hut overlooking the tea plantation.</li>
            </ul>

            <h3>Day 3: Return via Mae Hong Son Town</h3>
            <ul>
                <li><strong>08:00:</strong> Visit Wat Chong Kham ancient Burmese temple.</li>
                <li><strong>10:00:</strong> Su Tong Pe Bridge (Bamboo Bridge across rice fields).</li>
                <li><strong>13:00:</strong> Start the drive back via the southern route (Khun Yuam) for different views (Sunflower fields in Nov-Dec).</li>
                <li><strong>18:00:</strong> Arrive back in Chiang Mai safely.</li>
            </ul>

            <hr>

            <h2>Our Fleet: Toyota Commuter VIP</h2>
            <p>We don't use old clunkers. Our vans are maintained to the highest standard.</p>
            <ul>
                <li><strong>Seats:</strong> 9-10 VIP seats (wide, captain chairs, reclining).</li>
                <li><strong>Entertainment:</strong> Bluetooth sound system, sometimes TV/Karaoke (on request!).</li>
                <li><strong>Amenities:</strong> USB charging ports, cool beverages, refreshing towels.</li>
                <li><strong>Driver:</strong> Polite, non-smoking, English-speaking options available.</li>
            </ul>

            <p>Don't let the journey be an endurance test. Make it part of the vacation. Book your van today!</p>
        `
    },
    {
        slug: 'ultimate-glamping-experience-doi-inthanon',
        title: 'Eco-Friendly Glamping: Sustainable Luxury in Doi Inthanon 🌿',
        excerpt: 'Experience the "Sea of Mist" without leaving your carbon footprint. Our guide to sustainable glamping in Northern Thailand combines luxury with eco-consciousness.',
        coverImage: '/videos/reel-1-img-1.jpg',
        date: '2025-07-10',
        author: 'Nongtung Eco Team',
        readingTime: '11 min read',
        tags: ['Glamping', 'Sustainable Travel', 'Doi Inthanon', 'Luxury Camping'],
        keywords: ['Eco glamping Chiang Mai', 'Sustainable travel Thailand', 'Doi Inthanon camping', 'Luxury tent Chiang Mai', 'Green travel Northern Thailand'],
        relatedTripId: 'inthanon-camp',
        content: `
            <p class="lead">Luxury doesn't have to cost the Earth. At Nongtung, we believe in "Leave No Trace" camping—but that doesn't mean you can't have a comfortable mattress and a hot shower.</p>

            <h2>Glamping: Where Nature Meets Comfort</h2>
            <p>Glamping (Glamorous Camping) has exploded in popularity in Northern Thailand. It solves the biggest barrier to entry for camping: the discomfort. No more sleeping on rocks. No more struggling to set up poles in the dark. Instead, you get hotel-quality linens, private bathrooms, and room service.</p>
            <p>But with popularity comes responsibility. Doi Inthanon is a fragile ecosystem. That's why we partner exclusively with campsites that prioritize sustainability.</p>

            <h2>The "Zero Waste" Philosophy</h2>
            <p>Our recommended sites use solar power for heating water. They minimize single-use plastics in their amenities (bamboo toothbrushes, refillable water bottles). Food is sourced from the local Royal Project farms, reducing food miles to almost zero and supporting local agriculture.</p>

            <hr>

            <h2>A Day in the Life of a Glamper</h2>
            
            <h3>16:00 - Arrival & Welcome Drink</h3>
            <p>Check-in isn't at a counter; it's by a campfire. You're welcomed with a herbal tea made from local flowers (Chrysanthemum or Roselle). Your "tent" is more like a canvas cabin, complete with a rugged rug, bean bags, and a private balcony facing the valley.</p>

            <h3>18:00 - The Sunset & Golden Hour</h3>
            <p>The sky turns purple, orange, and pink. This is the prime time for photos. The temperature begins to drop rapidly—from 25°C down to 15°C in an hour. Put on your sweater.</p>

            <h3>19:00 - The Legendary "Mookata" Dinner</h3>
            <p>You cannot come to the Thai mountains and not eat Mookata (Thai BBQ Steamboat). Imagine grilling marinated pork belly and boiling fresh vegetables in soup, all while steam rises into the cool night air.</p>
            <ul>
                <li><strong>Broth:</strong> Clear, sweet vegetable soup.</li>
                <li><strong>Dipping Sauce:</strong> Spicy seafood (Nam Jim Seafood) and sweet chili (Nam Jim Suki).</li>
                <li><strong>Vibe:</strong> Cozied up in blankets, grilling meat under the stars. Unbeatable.</li>
            </ul>

            <h3>22:00 - Stargazing</h3>
            <p>With minimal light pollution, the Milky Way is often visible on clear nights. We recommend downloading a Star Map app before you go. Listen to the jungle sounds—crickets, tree frogs, and night birds.</p>

            <h3>06:00 - The Sea of Mist (Talay Mok)</h3>
            <p>This is what you paid for. You unzip your tent, and the world below you has disappeared, replaced by a fluffy ocean of white clouds. Sip your locally grown Arabica coffee and watch the sun burn the mist away.</p>

            <hr>

            <h2>Packing List (Winter Edition: Nov-Feb)</h2>
            <p>Do not underestimate the cold. Temperatures on Doi Inthanon can hit 0°C at night.</p>
            <ul>
                <li><strong>Thermal Underwear:</strong> Highly recommended for sleeping.</li>
                <li><strong>Thick Socks:</strong> Cold feet = bad sleep. Bring wool socks.</li>
                <li><strong>Beanie & Refreshing towels:</strong> Keeps body heat in.</li>
                <li><strong>Power Bank:</strong> Cold batteries drain faster.</li>
                <li><strong>Moisturizer/Lip Balm:</strong> The air is dry and windy.</li>
            </ul>

            <br>
            <p>Ready to unplug? Glamping connects you with the rhythm of nature, without the backache. Experience the magic of Northern Thailand in style.</p>
        `
    },
    // --- New Thai Strategy Articles with DEEP Content ---
    {
        slug: 'ultimate-trekking-guide-chiang-mai-2025',
        title: 'คู่มือเดินป่าเชียงใหม่ 2025: ครบทุกเส้นทาง สายลุยห้ามพลาด! ⛰️',
        excerpt: 'อัปเดตล่าสุดเส้นทางเดินป่าดอยสุเทพ-ดอยปุย และม่อนแจ่ม ฉบับคนท้องถิ่นพาเที่ยว จอยทริปยังไงให้สนุก เตรียมตัวยังไงไม่ให้เฟล',
        coverImage: '/videos/reel-4-cover.jpg',
        date: '2025-08-01',
        author: 'Nongtung Local Guide',
        readingTime: '15 min read',
        tags: ['เดินป่า', 'เชียงใหม่', 'Trekking', 'Guide'],
        keywords: ['เดินป่าเชียงใหม่', 'จอยทริปเดินป่า', 'ดอยสุเทพ', 'เดินป่าดอยปุย', 'ที่เที่ยวธรรมชาติเชียงใหม่ 2568'],
        relatedTripId: 'doi-suthep-hike',
        content: `
            <p class="lead">ปี 2025 แล้ว ใครที่ยังไม่เคยสัมผัสป่าหน้าฝนเชียงใหม่ บอกเลยว่าพลาด! เทรนด์การเที่ยวแบบ "Digital Detox" กำลังมาแรง และไม่มีอะไรจะดีไปกว่าการพาตัวเองไปอยู่ท่ามกลางสีเขียวและเสียงน้ำตก น่องตึงขอเปิดคัมภีร์เส้นทางเดินป่าฉบับคนพื้นที่ เจาะลึกแบบไม่กั๊ก</p>

            <h2>ทำไมต้อง "เดินป่า" ในเชียงใหม่?</h2>
            <p>เชียงใหม่คือเมืองหลวงของการผจญภัยในไทย ภูมิประเทศเป็นเทือกเขาสลับซับซ้อน ป่าที่นี่ยังมีความสมบูรณ์สูงมาก ไม่ว่าจะเป็นป่าดิบเขา ป่าสน หรือป่าเบญจพรรณ ที่สำคัญคือ <strong>"Community"</strong> สังคมคนเดินป่าที่นี่น่ารัก เอื้อเฟื้อเผื่อแผ่ และดูแลรักษ์ธรรมชาติอย่างเข้มข้น</p>

            <hr>

            <h2>เจาะลึก: เส้นทางดอยปุย (Doi Pui Nature Trail)</h2>
            <p>หลายคนรู้จักแค่ดอยสุเทพ แต่เลยขึ้นไปอีกนิดคือ <strong>ดอยปุย</strong> สวรรค์ที่แท้จริงของนักเดินป่ามือสมัครเล่นไปจนถึงมือโปร</p>

            <h3>1. ลักษณะเส้นทาง</h3>
            <p>ระยะทางประมาณ 4-8 กิโลเมตร (แล้วแต่รูทที่เลือก) ผ่านป่าสนสามใบที่ให้บรรยากาศเหมือนเดินอยู่ยุโรป พื้นดินเป็นใบสนร่วงหล่นนุ่มเท้า กลิ่นยางสนหอมอ่อนๆ ช่วยผ่อนคลายความเครียดได้ดีเยี่ยม ช่วงกลางวันแสงแดดรำไรผ่านทิวสน ถ่ายรูปออกมาสวยมาก (Mood & Tone ดีสุดๆ)</p>

            <h3>2. จุดเช็คอินห้ามพลาด</h3>
            <ul>
                <li><strong>ยอดดอยปุยสูงสุด:</strong> ความสูง 1,658 เมตร จากระดับน้ำทะเล เป็นจุดสูงสุดที่คุณจะเห็นวิวเมืองเชียงใหม่และเทือกเขาฝั่งสะเมิงได้กว้างไกลสุดสายตา</li>
                <li><strong>หมู่บ้านขุนช่างเคี่ยน:</strong> แหล่งปลูกกาแฟชั้นดี แวะจิบกาแฟสดที่ชาวบ้านคั่วบดเองกับมือ</li>
                <li><strong>สวนดอกไม้ดอยปุย (Hmong Garden):</strong> ช่วงหน้าหนาวจะมีดอกพญาเสือโคร่งบานสะพรั่งเต็มหุบเขา</li>
            </ul>

            <hr>

            <h2>Join Trip vs Private Trip: แบบไหนเหมาะกับคุณ?</h2>

            <h3>Join Trip (จอยทริป)</h3>
            <p>คือการรวมตัวกันของคนแปลกหน้าที่มีใจรักเหมือนกัน</p>
            <ul>
                <li><strong>ข้อดี:</strong> ประหยัดค่าใช้จ่าย ได้เพื่อนใหม่ ได้แลกเปลี่ยนประสบการณ์สนุกๆ มักจะเฮฮาปาร์ตี้</li>
                <li><strong>เหมาะกับ:</strong> คนมาเที่ยวคนเดียว คู่รัก หรือกลุ่มเพื่อนเล็กๆ 2-3 คน</li>
            </ul>

            <h3>Private Trip (ทริปส่วนตัว)</h3>
            <p>เหมาไกด์และรถตู้สำหรับกลุ่มเราโดยเฉพาะ</p>
            <ul>
                <li><strong>ข้อดี:</strong> เป็นส่วนตัวสูง กำหนดเวลาเองได้ อยากแวะถ่ายรูปตรงไหนนานๆ ก็ทำได้ ไม่ต้องเกรงใจใคร ยืดหยุ่นเรื่องโปรแกรม</li>
                <li><strong>เหมาะกับ:</strong> กลุ่มเพื่อน 4 คนขึ้นไป ครอบครัวมีเด็กหรือผู้สูงอายุ หรือคู่รักที่ต้องการความโรแมนติก</li>
            </ul>

            <hr>

            <h2>Checklist: เตรียมตัวให้พร้อมก่อนลุย</h2>
            <p>การเตรียมตัวดีมีชัยไปกว่าครึ่ง นี่คือรายการของที่ต้องมี:</p>
            <ol>
                <li><strong>รองเท้า:</strong> สำคัญที่สุด! แนะนำรองเท้า Trail Running หรือรองเท้าผ้าใบที่มีดอกยางลึกๆ กันลื่น (อย่าใส่รองเท้าแฟชั่นพื้นเรียบอันอันตราย)</li>
                <li><strong>เป้สะพายหลัง:</strong> ขนาดพอดีตัว (15-20 ลิตร) ใส่ของจำเป็น มีสายรัดอกเพื่อกระจายน้ำหนัก</li>
                <li><strong>น้ำดื่ม:</strong> อย่างน้อย 1.5 ลิตร (ถ้าหน้าร้อนเผื่อไป 2 ลิตร) จิบเรื่อยๆ อย่ารอให้คอแห้ง</li>
                <li><strong>เสื้อกันฝน:</strong> ภาคเหนือฝนตกได้ตลอดเวลา แม้ไม่ใช่หน้าฝน พกเสื้อกันฝนแบบพับเล็กๆ ติดไว้เสมอ</li>
                <li><strong>ยารักษาโรค:</strong> ยาแก้แพ้ ยาหม่อง พลาสเตอร์ปิดแผล ยาดม</li>
                <li><strong>ถุงขยะ:</strong> นำขยะทุกชิ้นกลับออกมาทิ้งข้างล่างเสมอ</li>
            </ol>

            <br>
            <p>ไม่ว่าคุณจะเลือกเส้นทางไหน สิ่งสำคัญคือการ "เคารพธรรมชาติ" เดินให้ช้าลง หายใจให้ลึกขึ้น แล้วคุณจะพบว่าความสุขอยู่ใกล้แค่เอื้อม เจอกันบนเทรลนะครับ!</p>
        `
    },
    {
        slug: 'chiang-mai-camping-gear-rental-guide',
        title: 'เช่าอุปกรณ์แคมป์ปิ้งเชียงใหม่: สะอาด ครบ จบที่เดียว (K2, Coleman Available) ⛺',
        excerpt: 'ไม่ต้องแบกให้หนัก! บริการเช่าเต็นท์และอุปกรณ์เดินป่าเกรดพรีเมียมในเชียงใหม่ สะอาดเหมือนใหม่ ผ่านการฆ่าเชื้อทุกครั้งก่อนส่งมอบ พร้อมคู่มือการกางเต็นท์',
        coverImage: '/videos/reel-1-img-0.jpg',
        date: '2025-08-05',
        author: 'Nongtung Rental',
        readingTime: '10 min read',
        tags: ['เช่าเต็นท์', 'อุปกรณ์แคมป์ปิ้ง', 'Rental', 'Chiang Mai Camping'],
        keywords: ['เช่าเต็นท์เชียงใหม่', 'ร้านเช่าอุปกรณ์เดินป่า', 'เช่าเต็นท์ K2', 'Coleman เชียงใหม่', 'เช่าพัดลมแคมป์ปิ้ง', 'เต็นท์เช่าสะอาด'],
        relatedRentalId: 'tent-family-set',
        content: `
            <p class="lead">จะขึ้นดอยทั้งที อุปกรณ์ต้องพร้อม! แต่จะซื้อใหม่ทั้งชุดก็แพง แถมรกบ้าน น่องตึงจัดให้ด้วยบริการเช่าอุปกรณ์แคมป์ปิ้งที่ "สะอาด" ที่สุดในเชียงใหม่ ตอบโจทย์ทั้งสายชิลล์และสายลุย เรามีครบตั้งแต่เต็นท์นอนยันชุดดิปกาแฟ</p>

            <h2>ทำไมการเช่าถึงคุ้มกว่าซื้อ? (Rent vs Buy)</h2>
            <p>หลายคนลังเลว่าจะซื้อเต็นท์เก็บไว้เองดีไหม นี่คือตารางเปรียบเทียบชัดๆ:</p>
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>หัวข้อ</th>
                        <th>ซื้อเอง (Buying)</th>
                        <th>เช่า (Renting)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><strong>งบประมาณเริ่มต้น</strong></td>
                        <td>5,000 - 10,000+ บาท</td>
                        <td>300 - 500 บาท/ทริป</td>
                    </tr>
                    <tr>
                        <td><strong>การดูแลรักษา</strong></td>
                        <td>ต้องซัก ตาก เช็ด กันราขึ้น</td>
                        <td>ไม่ต้องทำอะไรเลย คืนของจบ</td>
                    </tr>
                    <tr>
                        <td><strong>พื้นที่จัดเก็บ</strong></td>
                        <td>กินที่ในบ้าน/คอนโด</td>
                        <td>ไม่ใช้พื้นที่</td>
                    </tr>
                    <tr>
                        <td><strong>ความหลากหลาย</strong></td>
                        <td>ใช้รุ่นเดิมตลอด</td>
                        <td>เปลี่ยนรุ่นใหม่ได้ทุกทริป</td>
                    </tr>
                </tbody>
            </table>

            <hr>

            <h2>มาตรฐานความสะอาดของ Nongtung (Hygiene Standard)</h2>
            <p>เราเข้าใจว่าหลายคนกังวลเรื่องการใช้ของร่วมกับคนอื่น (โดยเฉพาะถุงนอน) เราจึงให้ความสำคัญเรื่องนี้เป็นอันดับ 1 ด้วยมาตรฐาน <strong>"Hospital Grade Cleaning"</strong></p>
            <ul>
                <li><strong>Step 1 Deep Clean:</strong> ถุงนอนและซับในเต็นท์ซักด้วยน้ำยาฆ่าเชื้อมาตรฐานเดียวกับโรงพยาบาลทุกครั้งหลังใช้งาน (ไม่มีการนำมาวนใช้ซ้ำเด็ดขาด)</li>
                <li><strong>Step 2 UV Treatment:</strong> อุปกรณ์ทุกชิ้นผ่านการอบฆ่าเชื้อด้วยแสง UV หรือห้องอบโอโซน ก่อนเก็บเข้าสต็อกเพื่อกำจัดไรฝุ่นและแบกทีเรีย</li>
                <li><strong>Step 3 Sun Drying:</strong> เต็นท์กางตากแดดจัดจนแห้งสนิท 100% เพื่อป้องกันเชื้อราและกลิ่นอับที่อาจเกิดขึ้นจากความชื้น</li>
            </ul>

            <hr>

            <h2>รีวิวอุปกรณ์ยอดฮิต (Top Picks)</h2>

            <h3>1. K2 Explorer / Delight (เต็นท์ยอดนิยมอันดับ 1)</h3>
            <p>เต็นท์แบรนด์ไทยที่ออกแบบมาเพื่ออากาศเมืองไทยโดยเฉพาะ</p>
            <ul>
                <li><strong>กันน้ำ:</strong> ผ้า Flysheet กันน้ำระดับ 3,500 mm (ฝนตกหนักแค่ไหนก็เอาอยู่)</li>
                <li><strong>ระบายอากาศ:</strong> มีมุ้งรอบทิศทาง ลมโกรกสบาย ไม่ร้อนอบอ้าวเหมือนเต็นท์เมืองหนาว</li>
                <li><strong>เหมาะสำหรับ:</strong> นอน 2-3 คน (รุ่น Delight) กางง่าย มือใหม่กางคนเดียวได้ใน 5-7 นาที</li>
            </ul>

            <h3>2. Coleman Instant Tent (สายครอบครัว/แก๊งเพื่อน)</h3>
            <p>เต็นท์แบรนด์ระดับโลกจากอเมริกา กว้างขวางจนยืนข้างในได้!</p>
            <ul>
                <li><strong>จุดเด่น:</strong> ระบบกางอัตโนมัติ (Instant System) กางเสร็จใน 2 นาที แค่ยืดขาออกแล้วล็อก</li>
                <li><strong>ความสบาย:</strong> หลังคาสูงโปร่ง ไม่อึดอัด สามารถใส่ที่นอนเป่าลมขนาดใหญ่ได้</li>
                <li><strong>เหมาะสำหรับ:</strong> ครอบครัว 4 คน หรือกลุ่มเพื่อนที่ต้องการความสบายขั้นสุด</li>
            </ul>

            <h3>3. ชุดเครื่องนอน (Sleep System)</h3>
            <p>การนอนหลับคือเรื่องใหญ่ เรามีให้เลือกอัปเกรด:</p>
            <ul>
                <li><strong>แผ่นรองนอน K2:</strong> แบบพองลมเอง (Self-inflating) หนา 2.5 ซม. นุ่มกำลังดี ช่วยกันความเย็นจากพื้นดิน</li>
                <li><strong>ถุงนอน Naturehike:</strong> ไยสังเคราะห์เกรดพรีเมียม รองรับอุณหภูมิ 5-15 องศา อุ่นสบายแม้บนดอยอินทนนท์</li>
            </ul>

            <hr>

            <h2>อุปกรณ์เสริมที่ขาดไม่ได้ (Add-ons)</h2>
            <p>นอกจากเต็นท์ เรายังมี Item ลับที่จะทำให้ชีวิตดีขึ้น:</p>
            <ul>
                <li><strong>พัดลมพกพา:</strong> สำหรับฤดูร้อนหรือวันที่ลมสงบ ช่วยให้นอนหลับสบายขึ้น</li>
                <li><strong>ชุดดริปกาแฟ:</strong> ครบเซ็ตทั้งดริปเปอร์ กาต้มน้ำ และแก้วสแตนเลส (สาย Content ต้องมี)</li>
                <li><strong>Power Bank 20,000 mAh:</strong> ชาร์จมือถือได้ตลอดทริป ไม่ต้องกลัวแบตหมด</li>
                <li><strong>ไฟประดับเต็นท์:</strong> เพิ่มบรรยากาศโรแมนติกยามค่ำคืน</li>
            </ul>

            <hr>

            <h2>ขั้นตอนการเช่า (How to Rent)</h2>
            <ol>
                <li><strong>แอดไลน์ @Nongung:</strong> ทักแชทแจ้งวันรับ-คืน และจำนวนคน</li>
                <li><strong>เลือกแพ็กเกจ:</strong> เรามีจัดเซตไว้ให้แล้ว (Set S = Solo, Set M = Couple, Set L = Family) หรือเลือกจิ้มเป็นชิ้นๆ ก็ได้</li>
                <li><strong>โอนมัดจำ:</strong> โอนมัดจำ 50% เพื่อล็อคคิวของ (คืนให้เต็มจำนวนหลังคืนของและตรวจสอบสภาพแล้ว)</li>
                <li><strong>รับของ:</strong>
                    <ul>
                        <li>รับเองที่หน้าร้าน (หลัง มช.) เวลา 09:00 - 20:00 น.</li>
                        <li>บริการส่งผ่าน Grab Car / Lalamove ไปยังที่พักในตัวเมือง (ค่าส่งตามจริง)</li>
                    </ul>
                </li>
            </ol>

            <hr>

            <h2>คำถามที่พบบ่อย (FAQ)</h2>
            <p><strong>Q: ถ้าวันจริงฝนตก ยกเลิกได้ไหม?</strong><br>
            A: เราเข้าใจสภาพอากาศครับ หากแจ้งล่วงหน้า 3 วัน คืนมัดจำให้เต็มจำนวน หรือสามารถเลื่อนวันไปใช้สิทธิ์ภายใน 90 วันได้</p>
            <p><strong>Q: ทำของเสียหายต้องจ่ายไหม?</strong><br>
            A: หากเป็นการเสียหายจากการใช้งานปกติ (เช่น ซิปแตก สมอบกงอ) เราไม่คิดเงินครับ แต่ถ้าเกิดจากการประมาท (เช่น ไฟไหม้เต็นท์ ทำของหาย) คิดราคาตามจริงของชิ้นนั้นๆ ครับ</p>

            <br>
            <p>อย่าให้เรื่องอุปกรณ์มาเป็นอุปสรรคในการออกเดินทาง มาตัวเปล่าแล้วหิ้วเต็นท์ขึ้นดอยไปกับเรานะครับ!</p>
        `
    },
    {
        slug: 'corporate-outing-teambuilding-chiang-mai',
        title: 'จัด Outing เชียงใหม่ยังไงให้พนักงาน Love? ไอเดีย Teambuilding เชิงผจญภัย 🤝 (2025 Edition)',
        excerpt: 'ลืมการละลายพฤติกรรมในห้องแอร์ไปได้เลย พาพนักงานและผู้บริหารมาเปิดประสบการณ์ใหม่กับกิจกรรม Adventure ที่ทั้งปลอดภัยและได้สาระ สร้าง Team Spirit ได้จริง',
        coverImage: '/videos/reel-3-cover.jpg',
        date: '2025-08-10',
        author: 'Nongtung Corporate',
        readingTime: '15 min read',
        tags: ['Corporate', 'Teambuilding', 'Outing', 'Chiang Mai Event'],
        keywords: ['รับจัด outing เชียงใหม่', 'Teambuilding เชียงใหม่', 'กิจกรรมบริษัท', 'Company trip Northern Thailand', 'ท่องเที่ยวประจำปีบริษัท', 'สัมมนาเชียงใหม่'],
        relatedTripId: 'corporate-package',
        content: `
            <p class="lead">HR หรือผู้บริหารท่านใดที่กำลังปวดหัวกับการหาที่เที่ยวประจำปี วนเวียนอยู่กับการกินเลี้ยงคาราโอเกะ ลองเปลี่ยนบรรยากาศมาเป็น "Adventure Teambuilding" ในป่าเชียงใหม่ดูไหม? รับรองว่าพนักงานจะได้ทั้งความสนุก ความสามัคคี และความทรงจำดีๆ กลับไปแน่นอน โดยไม่ต้องกังวลเรื่องความลำบากเพราะเราจัดการให้แบบ VIP</p>

            <h2>ทำไมต้อง Adventure Based Learning (ABL)?</h2>
            <p><strong>ABL (Adventure Based Learning)</strong> คือกระบวนการเรียนรู้ผ่านกิจกรรมผจญภัย ไม่ใช่แค่ไปเดินเล่นเฉยๆ แต่มองปัญหาและอุปสรรคในธรรมชาติเป็น "โจทย์" ให้ทีมต้องช่วยกันแก้</p>
            <p>เมื่อเพื่อนร่วมงานต้องช่วยกันข้ามลำธารที่เชี่ยวกราก ช่วยกันกางเต็นท์ในเวลาจำกัด หรือแบ่งปันน้ำดื่มกันเมื่อเหนื่อยล้า "อีโก้" (Ego) และ "กำแพงระหว่างแผนก" (Silos) จะพังทลายลงเองโดยธรรมชาติ ความไว้เนื้อเชื่อใจ (Trust) จะถูกสร้างขึ้นใหม่อย่างแข็งแรง ซึ่งหาไม่ได้จากการนั่งประชุมในห้องแอร์</p>

            <hr>

            <h2>4 กิจกรรมไฮไลท์ (Signature Activities)</h2>

            <h3>1. The Jungle Walk Rally (เกมเดินป่าหา RC)</h3>
            <p>แบ่งทีมเดินป่าระยะสั้น (3-5 กม.) ตามเส้นทางธรรมชาติที่ร่มรื่น แต่ต้องทำภารกิจตามจุดต่างๆ:</p>
            <ul>
                <li><strong>Compass Challenge:</strong> เรียนรู้วิธีใช้เข็มทิศและแผนที่เพื่อนำทาง (ฝึกภาวะผู้นำ)</li>
                <li><strong>Fire Starter:</strong> แข่งกันก่อกองไฟด้วยอุปกรณ์จำกัด (ฝึกการแก้ปัญหาเฉพาะหน้า)</li>
                <li><strong>Shelter Building:</strong> สร้างที่กำบังฝนจากวัสดุธรรมชาติให้ทุกคนในทีมเข้าไปอยู่ได้จริง (ฝึกการวางแผน)</li>
            </ul>

            <h3>2. Bamboo Rafting Race (แข่งล่องแพไม้ไผ่)</h3>
            <p>กิจกรรมทางน้ำสุดคลาสสิกของเชียงใหม่ ณ แม่น้ำแม่แตง</p>
            <ul>
                <li><strong>Teamwork Test:</strong> การถ่อแพต้องอาศัย 'จังหวะ' และการสื่อสารที่แม่นยำ ถ้าคนหน้าพายซ้าย คนหลังพายขวา แพจะหมุนวนไม่ไปไหน เปรียบเสมือนการทำงานในองค์กรที่ต้องไปในทิศทางเดียวกัน</li>
            </ul>

            <h3>3. Camp Chef Battle (ศึกยอดเชฟกลางป่า)</h3>
            <p>การแข่งขันทำอาหารแบบ MasterChef Style โดยมีวัตถุดิบปริศนา (Mystery Box) จากตลาดชาวดอย</p>
            <ul>
                <li><strong>โจทย์:</strong> ต้องทำอาหาร 3 อย่าง (ต้ม ผัด ย่าง) ในเวลา 90 นาที ด้วยเตาถ่านเท่านั้น</li>
                <li><strong>สิ่งที่ได้:</strong> การวางแผน (Planning), การแบ่งงาน (Delegation), และความคิดสร้างสรรค์ (Creativity) ภายใต้ความกดดัน</li>
            </ul>

            <h3>4. CSR: คืนผืนป่าให้ชุมชน</h3>
            <p>กิจกรรมทำดีเพื่อสังคมที่เราทำร่วมกับอุทยานแห่งชาติและชุมชน</p>
            <ul>
                <li>สร้างฝายชะลอน้ำ (Check Dam)</li>
                <li>ปลูกป่าเสริม (Reforestation)</li>
                <li>เลี้ยงอาหารกลางวันน้องๆ โรงเรียนบนดอย</li>
            </ul>

            <hr>

            <h2>มาตรฐานความปลอดภัยระดับสากล (Safety First)</h2>
            <p>เราเข้าใจว่าความปลอดภัยของพนักงานคือเรื่องสำคัญที่สุดสำหรับ HR และผู้บริหาร เราจึงมีมาตรฐานขั้นสูง:</p>
            <ul>
                <li><strong>Staff Ratio 1:5:</strong> สัดส่วนสตาฟดูแลลูกค้า 1 คน ต่อลูกค้า 5 คน (ดูแลทั่วถึงแน่นอน)</li>
                <li><strong>Certified Guides:</strong> ไกด์ทุกคนผ่านการอบรม First Aid และ CPR</li>
                <li><strong>Insurance:</strong> ประกันอุบัติเหตุวงเงิน 1,000,000 บาท/ท่าน</li>
                <li><strong>Medical Support:</strong> มีพยาบาลวิชาชีพ (Nurse) หรือเจ้าหน้าที่กู้ภัยเดินประกบตลอดทริป พร้อมชุดปฐมพยาบาลครบครัน</li>
            </ul>

            <hr>

            <h2>เรื่องกินเรื่องใหญ่ (Catering Service)</h2>
            <p>มาเที่ยวป่าไม่ต้องกลัวอด เราจัดเต็มแบบ Buffet Line:</p>
            <ul>
                <li><strong>อาหาร:</strong> เมนูพื้นเมือง (ข้าวซอย, ไส้อั่ว) หรืออาหารไทยทั่วไป ปรับรสชาติให้ทานง่าย</li>
                <li><strong>พิเศษ:</strong> หมูกระทะดอย หรือ บาร์บีคิว (BBQ) สำหรับมื้อเย็นรอบกองไฟ</li>
                <li><strong>เครื่องดื่ม:</strong> น้ำสมุนไพร กาแฟสด และ Soft Drink ตลอดงาน (สามารถนำเครื่องดื่มแอลกอฮอล์มาเองได้)</li>
                <li><strong>Halal / Vegan:</strong> สามารถแจ้งล่วงหน้าได้ เราจัดเตรียมแยกเฉพาะให้ครับ</li>
            </ul>

            <hr>

            <h2>ตัวอย่างกำหนดการ 2 วัน 1 คืน (Sample Agenda)</h2>
            
            <h3>Day 1: Connection & Challenge</h3>
            <ul>
                <li>09:00 - รับคณะที่สนามบินเชียงใหม่ ด้วยรถตู้ VIP</li>
                <li>10:30 - ถึงจุดเริ่มเดิน กิจกรรม Ice Breaking ละลายพฤติกรรม</li>
                <li>11:00 - เริ่ม Trekking กิจกรรม Walk Rally ฐานที่ 1-2</li>
                <li>12:30 - ทานข้าวห่อใบตองริมลำธาร แบบ Picnic Style</li>
                <li>14:00 - กิจกรรม Walk Rally ฐานที่ 3 และ Rafting</li>
                <li>16:00 - เข้าที่พัก Tent Camp / Resort พักผ่อนตามอัธยาศัย</li>
                <li>18:00 - Dinner Party & Campfire Talk (เปิดใจ สะท้อนสิ่งที่ได้เรียนรู้)</li>
            </ul>

            <h3>Day 2: Contribution & Leisure</h3>
            <ul>
                <li>07:00 - Morning Yoga / Coffee Drip ท่ามกลางหมอก</li>
                <li>09:00 - กิจกรรม CSR ปลูกป่า หรือ สร้างฝาย</li>
                <li>11:00 - อาบน้ำ เปลี่ยนเสื้อผ้า check-out</li>
                <li>12:00 - ทานอาหารกลางวันที่ร้านอาหารชื่อดัง (Michelin Guide)</li>
                <li>14:00 - แวะซื้อของฝากที่ตลาดวโรรส (กาดหลวง)</li>
                <li>16:00 - ส่งสนามบินเดินทางกลับโดยสวัสดิภาพ</li>
            </ul>

            <hr>

            <h2>งบประมาณ (Budget Estimation)</h2>
            <p>ราคาขึ้นอยู่กับจำนวนคนและระดับที่พัก (Tent vs Resort):</p>
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>จำนวนคน</th>
                        <th>ราคาประมาณการ (บาท/ท่าน)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>10 - 20 ท่าน</td>
                        <td>4,500 - 6,500</td>
                    </tr>
                    <tr>
                        <td>21 - 50 ท่าน</td>
                        <td>3,500 - 5,500</td>
                    </tr>
                    <tr>
                        <td>50+ ท่าน</td>
                        <td>2,900 - 4,500</td>
                    </tr>
                </tbody>
            </table>
            <p><em>*ราคารวมรถรับส่ง, ที่พัก, อาหาร 4 มื้อ, กิจกรรมทั้งหมด, ประกันแบะสตาฟดูแล</em></p>

            <br>
            <p>การลงทุนกับ "คน" คุ้มค่าเสมอ ให้ธรรมชาติช่วยฟื้นฟูพลังและสร้าง Team Spirit ใหม่ๆ ให้องค์กรของคุณนะครับ <a href="https://line.me/R/ti/p/@nongtungrunning" target="_blank" style="color: #06C755; font-weight: bold; text-decoration: underline;">ติดต่อเราทาง LINE: @nongtungrunning</a> เพื่อออกแบบทริปเฉพาะคุณได้เลย!</p>
        `
    },
    {
        slug: 'chiang-mai-trail-trekking-comparison',
        title: 'เปรียบเทียบ 6 เส้นทางเดินป่า & เทรลเชียงใหม่ยอดฮิต 2026: ที่ไหนเหมาะกับคุณ? (พร้อมตารางรูป & สรุปชัดเจน)',
        excerpt: 'เจาะลึก 6 พิกัดเดินเทรลยอดดอยเชียงใหม่: ดอยหลวงเชียงดาว, ดอยผากลอง (ออนใต้), ห้วยกุ๊บกั๊บ, ม่อนจอง, ดอยผ้าห่มปก, และกิ่วแม่ปาน พร้อมตารางเปรียบเทียบระยะทาง ความสูง ระดับความยาก ช่วงเวลาที่ควรไป และรูปภาพประกอบ',
        coverImage: '/videos/reel-2-img-0.jpg',
        date: '2026-10-17',
        author: 'ทีมงานน่องตึง (Nongtung)',
        readingTime: '12 min read',
        tags: ['Chiang Mai', 'Trekking', 'Trail Running', 'Comparison', 'Guide'],
        keywords: [
            'เดินป่าเชียงใหม่', 'เปรียบเทียบเส้นทางเดินป่า', 'เทรลเชียงใหม่ 2026',
            'ดอยหลวงเชียงดาว', 'ดอยผากลอง', 'ห้วยกุ๊บกั๊บ', 'ม่อนจอง', 'กิ่วแม่ปาน',
            'ดอยผ้าห่มปก', 'เดินป่ามือใหม่ เชียงใหม่'
        ],
        relatedTripId: 'chiang-dao-hike',
        content: `
            <p class="lead">เชียงใหม่คือสวรรค์ของคนรักขุนเขาและเส้นทางธรรมชาติ แต่ละดอยมีเสน่ห์ ระดับความชัน และความยากง่ายที่แตกต่างกันอย่างสิ้นเชิง สำหรับใครที่กำลังวางแผนทริปเดินป่าหรืออยากลองก้าวเท้าสู่เส้นทางเทรล วันนี้ <strong>น่องตึง (Nongtung)</strong> ได้รวบรวมและ <strong>เปรียบเทียบ 6 เส้นทางเดินป่าเชียงใหม่ยอดฮิต</strong> มาให้คุณตัดสินใจได้ง่ายในตารางเดียว พร้อมคำแนะนำแบบคนพื้นที่แท้ๆ ครับ</p>

            <hr>

            <h2>📊 ตารางเปรียบเทียบ 6 เส้นทางเดินป่าเชียงใหม่ (พร้อมภาพพรีวิว)</h2>
            <p>สรุปข้อมูลสำคัญที่จะช่วยให้คุณประเมินความพร้อม ร่างกาย และเวลาสำหรับแต่ละเส้นทาง:</p>

            <div style="overflow-x: auto; margin: 2rem 0; border-radius: 1.5rem; box-shadow: 0 10px 30px rgba(0,0,0,0.06); border: 1px solid rgba(38,42,34,0.1);">
                <table style="width: 100%; border-collapse: collapse; min-width: 680px; background: #ffffff; font-size: 14px;">
                    <thead>
                        <tr style="background: #262A22; color: #ffffff;">
                            <th style="padding: 16px 14px; border-bottom: 2px solid #D66E3A; text-align: left; width: 17%;">พิกัด / ยอดดอย</th>
                            <th style="padding: 16px 10px; border-bottom: 2px solid #D66E3A; text-align: center; width: 110px;">รูปภาพพรีวิว</th>
                            <th style="padding: 16px 14px; border-bottom: 2px solid #D66E3A; text-align: left; width: 16%;">ความสูง & ระยะทาง</th>
                            <th style="padding: 16px 14px; border-bottom: 2px solid #D66E3A; text-align: left; width: 14%;">ระดับความยาก</th>
                            <th style="padding: 16px 14px; border-bottom: 2px solid #D66E3A; text-align: left; width: 15%;">ช่วงเวลาเปิด / แนะนำ</th>
                            <th style="padding: 16px 14px; border-bottom: 2px solid #D66E3A; text-align: left; width: 28%;">ไฮไลท์สำคัญ</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style="border-bottom: 1px solid #f0f0f0;">
                            <td style="padding: 16px; font-weight: bold; color: #262A22;">
                                1. ดอยหลวงเชียงดาว<br>
                                <span style="font-size: 12px; color: #D66E3A; font-weight: normal;">อ.เชียงดาว</span>
                            </td>
                            <td style="padding: 12px;">
                                <img src="/images/articles/chiang-dao-summit.jpg" alt="ดอยหลวงเชียงดาว" style="width: 100px; height: 68px; object-fit: cover; border-radius: 12px;" />
                            </td>
                            <td style="padding: 16px;">
                                สูง 2,225 ม.<br>
                                <span style="color: #666;">เดิน 8.5 - 19 กม.</span>
                            </td>
                            <td style="padding: 16px;">
                                <span style="background: #fee2e2; color: #b91c1c; padding: 4px 10px; border-radius: 999px; font-weight: bold; font-size: 12px;">ท้าทาย (Hard)</span><br>
                                <small style="color: #777;">2-3 วัน 1-2 คืน</small>
                            </td>
                            <td style="padding: 16px;">พ.ย. - ก.พ.<br><small style="color: #D66E3A;">(ต้องจองคิวอุทยานฯ)</small></td>
                            <td style="padding: 16px;">พืชพรรณกึ่งอัลไพน์ ดอกเทียนนกแก้ว กวางผา และทะเลหมอก 360° สุดอลังการ</td>
                        </tr>
                        <tr style="background: #FAF9F4; border-bottom: 1px solid #f0f0f0;">
                            <td style="padding: 16px; font-weight: bold; color: #262A22;">
                                2. ดอยผากลอง (ออนใต้)<br>
                                <span style="font-size: 12px; color: #D66E3A; font-weight: normal;">อ.สันกำแพง</span>
                            </td>
                            <td style="padding: 12px;">
                                <img src="/images/articles/doi-pha-klong-canyon.jpg" alt="ดอยผากลอง ออนใต้" style="width: 100px; height: 68px; object-fit: cover; border-radius: 12px;" />
                            </td>
                            <td style="padding: 16px;">
                                สูง 700 ม.<br>
                                <span style="color: #666;">เดิน 4 - 6 กม.</span>
                            </td>
                            <td style="padding: 16px;">
                                <span style="background: #dcfce7; color: #15803d; padding: 4px 10px; border-radius: 999px; font-weight: bold; font-size: 12px;">ง่าย (Day Hike)</span><br>
                                <small style="color: #777;">ไปเช้า-เย็นกลับ</small>
                            </td>
                            <td style="padding: 16px;">เที่ยวได้ตลอดปี<br><small style="color: #666;">(เช้าตรู่ / เย็นแดดร่ม)</small></td>
                            <td style="padding: 16px;">ใกล้เมืองเพียง 35 นาที หน้าผาหินแคนยอน ป่าสน และชมวิวอ่างเก็บน้ำแม่ผาแหน</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #f0f0f0;">
                            <td style="padding: 16px; font-weight: bold; color: #262A22;">
                                3. ห้วยกุ๊บกั๊บ<br>
                                <span style="font-size: 12px; color: #D66E3A; font-weight: normal;">อ.แม่แตง</span>
                            </td>
                            <td style="padding: 12px;">
                                <img src="/images/articles/huay-kub-kab-mist.jpg" alt="ห้วยกุ๊บกั๊บ" style="width: 100px; height: 68px; object-fit: cover; border-radius: 12px;" />
                            </td>
                            <td style="padding: 16px;">
                                สูง 1,100 ม.<br>
                                <span style="color: #666;">เดิน 4.5 กม.</span>
                            </td>
                            <td style="padding: 16px;">
                                <span style="background: #fef3c7; color: #b45309; padding: 4px 10px; border-radius: 999px; font-weight: bold; font-size: 12px;">ปานกลาง (Medium)</span><br>
                                <small style="color: #777;">2 วัน 1 คืน</small>
                            </td>
                            <td style="padding: 16px;">ก.ค. - ก.พ.<br><small style="color: #666;">(หน้าฝนหมอกหนา)</small></td>
                            <td style="padding: 16px;">วิวยอดดอยพีระมิด หมอกเช้าหน้าต่างระเบียง และวิถีโฮมสเตย์ชุมชนชาวลาหู่</td>
                        </tr>
                        <tr style="background: #FAF9F4; border-bottom: 1px solid #f0f0f0;">
                            <td style="padding: 16px; font-weight: bold; color: #262A22;">
                                4. ดอยม่อนจอง<br>
                                <span style="font-size: 12px; color: #D66E3A; font-weight: normal;">อ.อมก๋อย</span>
                            </td>
                            <td style="padding: 12px;">
                                <img src="/images/articles/doi-mon-jong-golden-ridge.jpg" alt="ดอยม่อนจอง" style="width: 100px; height: 68px; object-fit: cover; border-radius: 12px;" />
                            </td>
                            <td style="padding: 16px;">
                                สูง 1,929 ม.<br>
                                <span style="color: #666;">เดิน 4 - 6 กม.</span>
                            </td>
                            <td style="padding: 16px;">
                                <span style="background: #fef3c7; color: #b45309; padding: 4px 10px; border-radius: 999px; font-weight: bold; font-size: 12px;">ปานกลาง (Medium)</span><br>
                                <small style="color: #777;">2 วัน 1 คืน</small>
                            </td>
                            <td style="padding: 16px;">พ.ย. - ก.พ.<br><small style="color: #D66E3A;">(เปิดเฉพาะฤดูหนาว)</small></td>
                            <td style="padding: 16px;">ทุ่งหญ้าสีทอง สันเขารูปหัวสิงห์ กวางผา และกุหลาบพันปีสีแดงสด</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #f0f0f0;">
                            <td style="padding: 16px; font-weight: bold; color: #262A22;">
                                5. ดอยผ้าห่มปก<br>
                                <span style="font-size: 12px; color: #D66E3A; font-weight: normal;">อ.ฝาง</span>
                            </td>
                            <td style="padding: 12px;">
                                <img src="/images/articles/doi-pha-hom-pok-peak.jpg" alt="ดอยผ้าห่มปก" style="width: 100px; height: 68px; object-fit: cover; border-radius: 12px;" />
                            </td>
                            <td style="padding: 16px;">
                                สูง 2,285 ม.<br>
                                <span style="color: #666;">เดิน 3.5 กม. จากกิ่วลม</span>
                            </td>
                            <td style="padding: 16px;">
                                <span style="background: #fef3c7; color: #b45309; padding: 4px 10px; border-radius: 999px; font-weight: bold; font-size: 12px;">ปานกลาง (Medium)</span><br>
                                <small style="color: #777;">2 วัน 1 คืน</small>
                            </td>
                            <td style="padding: 16px;">พ.ย. - ก.พ.<br><small style="color: #666;">(หนาวจัด ลมแรง)</small></td>
                            <td style="padding: 16px;">ยอดเขาสูงอันดับ 2 ของไทย ชมพระอาทิตย์ขึ้นเหนือทะเลหมอกสองแผ่นดินไทย-พม่า</td>
                        </tr>
                        <tr style="background: #FAF9F4;">
                            <td style="padding: 16px; font-weight: bold; color: #262A22;">
                                6. กิ่วแม่ปาน (ดอยอินทนนท์)<br>
                                <span style="font-size: 12px; color: #D66E3A; font-weight: normal;">อ.จอมทอง</span>
                            </td>
                            <td style="padding: 12px;">
                                <img src="/images/articles/kew-mae-pan-boardwalk.jpg" alt="กิ่วแม่ปาน" style="width: 100px; height: 68px; object-fit: cover; border-radius: 12px;" />
                            </td>
                            <td style="padding: 16px;">
                                สูง 2,200 ม.<br>
                                <span style="color: #666;">เดิน 3.2 กม. (วงกลม)</span>
                            </td>
                            <td style="padding: 16px;">
                                <span style="background: #dcfce7; color: #15803d; padding: 4px 10px; border-radius: 999px; font-weight: bold; font-size: 12px;">ง่ายมาก (Easy)</span><br>
                                <small style="color: #777;">ใช้เวลา 2-3 ชม.</small>
                            </td>
                            <td style="padding: 16px;">1 พ.ย. - 31 พ.ค.<br><small style="color: #666;">(ปิดฟื้นฟูหน้าฝน)</small></td>
                            <td style="padding: 16px;">ป่าเมฆดึกดำบรรพ์ พรมมอสเขียว สันเขาชมวิวทะเลหมอก และกุหลาบพันปีแดง</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <hr>

            <h2>🎯 สรุปคำแนะนำ: คุณเหมาะกับเส้นทางไหน?</h2>
            <ul>
                <li><strong>หากคุณเป็นมือใหม่ มีเวลาครึ่งวัน อยากเดินชิลล์ๆ:</strong> เลือก <em>กิ่วแม่ปาน</em> หรือ <em>ดอยผากลอง (ออนใต้)</em> เดินง่าย ไม่เหนื่อยล้าจนเกินไป ได้รูปสวยแน่นอน</li>
                <li><strong>หากต้องการสัมผัสหมอกหนา วิถีชุมชน พักค้าง 1 คืน:</strong> เลือก <em>ห้วยกุ๊บกั๊บ</em> ขึ้นรถโฟร์วิลสนุกๆ แล้วเดินต่อ ได้ทั้งบรรยากาศสโลว์ไลฟ์และอาหารพื้นบ้าน</li>
                <li><strong>หากอยากได้ภาพวิวทุ่งหญ้าทองคำ สไตล์ต่างประเทศ:</strong> เลือก <em>ดอยม่อนจอง</em> สันเขาหัวสิงห์คือมุมถ่ายรูปไฮไลท์ที่ไม่เหมือนใคร</li>
                <li><strong>หากต้องการความท้าทาย พิชิตยอดเขาในฝันสักครั้งในชีวิต:</strong> เลือก <em>ดอยหลวงเชียงดาว</em> ยอดเขาหินปูนที่ยืนหนึ่งเรื่องความสวยงามทางธรรมชาติ</li>
            </ul>

            <div style="background: #262A22; color: #ffffff; padding: 2rem; border-radius: 1.5rem; margin-top: 2.5rem;">
                <h3 style="color: #D66E3A; margin-top: 0;">ให้ทีมงาน "น่องตึง" ช่วยจัดทริปเฉพาะคุณ!</h3>
                <p style="color: rgba(255,255,255,0.85); margin-bottom: 1.5rem;">ไม่ว่าจะเป็นทริปส่วนตัว กลุ่มเพื่อน หรือทริปองค์กร เรามีทั้งไกด์คนพื้นที่ผู้ชำนาญทาง อุปกรณ์แคมป์ปิ้งคุณภาพ และบริการรถตู้ VIP พร้อมคนขับรับส่งถึงที่พัก</p>
                <a href="/th/trips" style="background: #D66E3A; color: #ffffff; padding: 12px 24px; border-radius: 999px; font-weight: bold; text-decoration: none; display: inline-block;">ดูทริปทั้งหมดของน่องตึง →</a>
            </div>
        `
    },
    {
        slug: 'chiang-mai-best-camping-spots-comparison',
        title: 'คัดเน้นๆ 6 ลานกางเต็นท์ & แคมป์ปิ้งยอดดอยเชียงใหม่ 2026: วิวทะเลหมอกหลักล้าน (พร้อมตารางรูป & เปรียบเทียบ)',
        excerpt: 'รวมพิกัดกางเต็นท์นอนดูดาวและตื่นมารับทะเลหมอกบนดอยเชียงใหม่: สันป่าเกี๊ยะ ดอยแม่ตะมาน, ม่อนเงาะ, ดอยปุย (ขุนช่างเคี่ยน), ดอยอ่างขาง, ดงสนดอยอินทนนท์, และม่อนแจ่ม พร้อมตารางเปรียบเทียบสิ่งอำนวยความสะดวก รถยนต์เข้าถึงได้ไหม และสภาพอากาศ',
        coverImage: '/videos/reel-1-img-3.jpg',
        date: '2026-10-17',
        author: 'ทีมงานน่องตึง (Nongtung)',
        readingTime: '11 min read',
        tags: ['Chiang Mai', 'Camping', 'Sea of Mist', 'Comparison', 'Guide'],
        keywords: [
            'กางเต็นท์เชียงใหม่', 'แคมป์ปิ้งเชียงใหม่ 2026', 'จุดกางเต็นท์ทะเลหมอก',
            'สันป่าเกี๊ยะ', 'ดอยแม่ตะมาน', 'ม่อนเงาะ', 'ดอยปุย', 'ดอยอ่างขาง',
            'ลานสนดอยอินทนนท์', 'เช่าอุปกรณ์แคมป์ปิ้ง เชียงใหม่'
        ],
        relatedTripId: 'chiang-dao-hike',
        content: `
            <p class="lead">การนอนกางเต็นท์รับลมหนาว ท่ามกลางกลิ่นไอสน สูดอากาศบริสุทธิ์ให้เต็มปอด และเปิดเต็นท์ออกมาเจอกับทะเลหมอกขาวโพลนตัดกับยอดเขาสีคราม คือเสน่ห์ที่ทำให้ใครหลายคนหลงรักเชียงใหม่ซ้ำแล้วซ้ำเล่า แต่คำถามยอดฮิตคือ: <strong>"ลานกางเต็นท์ไหนสวยสุด? รถเก๋งหรือรถตู้ขึ้นได้ไหม? ห้องน้ำและสัญญาณมือถือเป็นอย่างไร?"</strong> วันนี้ <strong>น่องตึง</strong> รวบรวมคำตอบมาให้ในตารางเปรียบเทียบแบบเจาะลึก 6 ลานกางเต็นท์ยอดดอยเชียงใหม่ครับ</p>

            <hr>

            <h2>⛺ ตารางเปรียบเทียบ 6 ลานกางเต็นท์ & แคมป์ปิ้งยอดดอยเชียงใหม่</h2>
            <p>เช็คก่อนเดินทาง: ประเภทรถที่เข้าถึงได้ สิ่งอำนวยความสะดวก และจุดเด่นของแต่ละพิกัด:</p>

            <div style="overflow-x: auto; margin: 2rem 0; border-radius: 1.5rem; box-shadow: 0 10px 30px rgba(0,0,0,0.06); border: 1px solid rgba(38,42,34,0.1);">
                <table style="width: 100%; border-collapse: collapse; min-width: 680px; background: #ffffff; font-size: 14px;">
                    <thead>
                        <tr style="background: #262A22; color: #ffffff;">
                            <th style="padding: 16px 14px; border-bottom: 2px solid #D66E3A; text-align: left; width: 17%;">ลานแคมป์ / พิกัด</th>
                            <th style="padding: 16px 10px; border-bottom: 2px solid #D66E3A; text-align: center; width: 110px;">รูปภาพพรีวิว</th>
                            <th style="padding: 16px 14px; border-bottom: 2px solid #D66E3A; text-align: left; width: 16%;">การเดินทาง & รถที่ขึ้นได้</th>
                            <th style="padding: 16px 14px; border-bottom: 2px solid #D66E3A; text-align: left; width: 18%;">สิ่งอำนวยความสะดวก</th>
                            <th style="padding: 16px 12px; border-bottom: 2px solid #D66E3A; text-align: left; width: 12%;">อุณหภูมิหน้าหนาว</th>
                            <th style="padding: 16px 14px; border-bottom: 2px solid #D66E3A; text-align: left; width: 27%;">ไฮไลท์วิวเด่น</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style="border-bottom: 1px solid #f0f0f0;">
                            <td style="padding: 16px; font-weight: bold; color: #262A22;">
                                1. สันป่าเกี๊ยะ ดอยแม่ตะมาน<br>
                                <span style="font-size: 12px; color: #D66E3A; font-weight: normal;">อ.เชียงดาว</span>
                            </td>
                            <td style="padding: 12px;">
                                <img src="/images/articles/san-pa-kia-camp.jpg" alt="สันป่าเกี๊ยะ ดอยแม่ตะมาน" style="width: 100px; height: 68px; object-fit: cover; border-radius: 12px;" />
                            </td>
                            <td style="padding: 16px;">
                                <span style="background: #fee2e2; color: #b91c1c; padding: 4px 8px; border-radius: 999px; font-weight: bold; font-size: 11px;">4WD / กระบะสูงเท่านั้น</span><br>
                                <small style="color: #666;">ทางลูกรังลูกคลื่น 21 กม.</small>
                            </td>
                            <td style="padding: 16px;">
                                ห้องน้ำรวมมีน้ำใช้<br>
                                <small style="color: #888;">ไฟโซลาร์เซลล์ปิด 21:00 น. / สัญญาณ AIS พอมี</small>
                            </td>
                            <td style="padding: 16px; font-weight: bold; color: #1e3a8a;">5 - 12°C</td>
                            <td style="padding: 16px;">วิวหน้าผาดอยหลวงเชียงดาวตั้งตระหง่านอยู่ตรงหน้าเต็มสองตา ทะเลดาวกลางคืนที่ชัดที่สุด</td>
                        </tr>
                        <tr style="background: #FAF9F4; border-bottom: 1px solid #f0f0f0;">
                            <td style="padding: 16px; font-weight: bold; color: #262A22;">
                                2. ม่อนเงาะ (โครงการหลวง)<br>
                                <span style="font-size: 12px; color: #D66E3A; font-weight: normal;">อ.แม่แตง</span>
                            </td>
                            <td style="padding: 12px;">
                                <img src="/images/articles/huay-kub-kab-mist.jpg" alt="ม่อนเงาะ" style="width: 100px; height: 68px; object-fit: cover; border-radius: 12px;" />
                            </td>
                            <td style="padding: 16px;">
                                <span style="background: #dcfce7; color: #15803d; padding: 4px 8px; border-radius: 999px; font-weight: bold; font-size: 11px;">รถเก๋ง / รถตู้ขึ้นได้</span><br>
                                <small style="color: #666;">ถนนลาดยาง มีช่วงแคบชัน</small>
                            </td>
                            <td style="padding: 16px;">
                                ห้องน้ำสะอาด มีจุดต่อไฟ<br>
                                <small style="color: #888;">สัญญาณโทรศัพท์ชัดเจนทุกค่าย</small>
                            </td>
                            <td style="padding: 16px; font-weight: bold; color: #1e3a8a;">8 - 15°C</td>
                            <td style="padding: 16px;">ชมวิวพระอาทิตย์ขึ้น 360° ทะเลหมอกไหลผ่านหุบเขาไร่ชาเขียวขจี</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #f0f0f0;">
                            <td style="padding: 16px; font-weight: bold; color: #262A22;">
                                3. ลานกางเต็นท์ดอยปุย<br>
                                <span style="font-size: 12px; color: #D66E3A; font-weight: normal;">อ.เมือง (อุทยานฯ สุเทพ-ปุย)</span>
                            </td>
                            <td style="padding: 12px;">
                                <img src="/images/articles/doi-pui-pine-campsite.jpg" alt="ลานกางเต็นท์ดอยปุย" style="width: 100px; height: 68px; object-fit: cover; border-radius: 12px;" />
                            </td>
                            <td style="padding: 16px;">
                                <span style="background: #dcfce7; color: #15803d; padding: 4px 8px; border-radius: 999px; font-weight: bold; font-size: 11px;">รถทุกชนิดขึ้นได้</span><br>
                                <small style="color: #666;">ห่างจากคูเมืองเพียง 45 นาที</small>
                            </td>
                            <td style="padding: 16px;">
                                ห้องน้ำแยกชายหญิง มีร้านสวัสดิการ<br>
                                <small style="color: #888;">มีเต็นท์และเครื่องนอนของอุทยานฯ ให้เช่า</small>
                            </td>
                            <td style="padding: 16px; font-weight: bold; color: #1e3a8a;">10 - 16°C</td>
                            <td style="padding: 16px;">บรรยากาศใต้ป่าสนสามใบสูงใหญ่ ร่มรื่น และช่วง ม.ค. ชมดอกนางพญาเสือโคร่งขุนช่างเคี่ยน</td>
                        </tr>
                        <tr style="background: #FAF9F4; border-bottom: 1px solid #f0f0f0;">
                            <td style="padding: 16px; font-weight: bold; color: #262A22;">
                                4. ลานกางเต็นท์ดงสน (ดอยอินทนนท์)<br>
                                <span style="font-size: 12px; color: #D66E3A; font-weight: normal;">อ.จอมทอง</span>
                            </td>
                            <td style="padding: 12px;">
                                <img src="/images/fb/real-fb-4.jpg" alt="ลานสน ดอยอินทนนท์" style="width: 100px; height: 68px; object-fit: cover; border-radius: 12px;" />
                            </td>
                            <td style="padding: 16px;">
                                <span style="background: #dcfce7; color: #15803d; padding: 4px 8px; border-radius: 999px; font-weight: bold; font-size: 11px;">รถทุกชนิดขึ้นได้</span><br>
                                <small style="color: #666;">ถนนลาดยาง 4 เลน สะดวกสบาย</small>
                            </td>
                            <td style="padding: 16px;">
                                ห้องน้ำมาตรฐานอุทยานฯ<br>
                                <small style="color: #888;">ใกล้ร้านค้า ร้านอาหาร สัญญาณ 5G ครบ</small>
                            </td>
                            <td style="padding: 16px; font-weight: bold; color: #1e3a8a;">0 - 8°C<br><small style="color: #D66E3A;">(หนาวจัด แม่คะนิ้ง)</small></td>
                            <td style="padding: 16px;">ลานกางเต็นท์ที่หนาวที่สุดในไทย ใกล้ยอดดอยอินทนนท์ พระมหาธาตุฯ และกิ่วแม่ปาน</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #f0f0f0;">
                            <td style="padding: 16px; font-weight: bold; color: #262A22;">
                                5. ดอยอ่างขาง (ลานกางเต็นท์ม่อนสน)<br>
                                <span style="font-size: 12px; color: #D66E3A; font-weight: normal;">อ.ฝาง</span>
                            </td>
                            <td style="padding: 12px;">
                                <img src="/images/articles/doi-ang-khang-view.jpg" alt="ม่อนสน ดอยอ่างขาง" style="width: 100px; height: 68px; object-fit: cover; border-radius: 12px;" />
                            </td>
                            <td style="padding: 16px;">
                                <span style="background: #fef3c7; color: #b45309; padding: 4px 8px; border-radius: 999px; font-weight: bold; font-size: 11px;">รถเก๋ง / รถตู้ขึ้นได้</span><br>
                                <small style="color: #666;">ทางขึ้นเขาคดเคี้ยว ชันเป็นช่วง</small>
                            </td>
                            <td style="padding: 16px;">
                                ห้องน้ำสะอาด มีน้ำอุ่น (หยอดเหรียญ)<br>
                                <small style="color: #888;">ร้านค้าชาวบ้าน ข้าวต้ม ชาร้อน</small>
                            </td>
                            <td style="padding: 16px; font-weight: bold; color: #1e3a8a;">2 - 10°C</td>
                            <td style="padding: 16px;">ทะเลหมอกสองแผ่นดินไทย-พม่า พระอาทิตย์ขึ้นตัดกับแนวทิวเขา และสวนดอกไม้เมืองหนาว</td>
                        </tr>
                        <tr style="background: #FAF9F4;">
                            <td style="padding: 16px; font-weight: bold; color: #262A22;">
                                6. ดอยม่อนล้าน (อุทยานฯ ศรีลานนา)<br>
                                <span style="font-size: 12px; color: #D66E3A; font-weight: normal;">อ.พร้าว</span>
                            </td>
                            <td style="padding: 12px;">
                                <img src="/images/articles/camping-tent-setup.jpg" alt="ดอยม่อนล้าน" style="width: 100px; height: 68px; object-fit: cover; border-radius: 12px;" />
                            </td>
                            <td style="padding: 16px;">
                                <span style="background: #fef3c7; color: #b45309; padding: 4px 8px; border-radius: 999px; font-weight: bold; font-size: 11px;">กระบะ / รถตู้ชำนาญทาง</span><br>
                                <small style="color: #666;">ทางคอนกรีตสลับลูกรังบางช่วง</small>
                            </td>
                            <td style="padding: 16px;">
                                ห้องน้ำอุทยานฯ พอใช้<br>
                                <small style="color: #888;">เงียบสงบ คนไม่พลุกพล่าน ไฟฟ้ามีจำกัด</small>
                            </td>
                            <td style="padding: 16px; font-weight: bold; color: #1e3a8a;">6 - 13°C</td>
                            <td style="padding: 16px;">จุดชมวิวพระอาทิตย์ขึ้นและตกได้ในที่เดียว มองเห็นวิว 3 จังหวัด (เชียงใหม่ ลำปาง เชียงราย)</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <hr>

            <h2>💡 ทริคเตรียมตัวแคมป์ปิ้งยอดดอยให้สนุกและปลอดภัย</h2>
            <ol>
                <li><strong>แผ่นรองนอนและถุงนอนคุณภาพดี:</strong> ความเย็นจากพื้นดินจะดูดความร้อนออกจากร่างกายอย่างรวดเร็ว อย่าลืมแผ่นโฟมหรือแผ่นรองนอนเป่าลมเสมอ</li>
                <li><strong>เสื้อผ้าแบบ Layering:</strong> เตรียมเสื้อชั้นในระบายเหงื่อ (Base Layer) + เสื้อฟลีซหรือขนเป็ด (Mid Layer) + เสื้อกันลมกันหมอก (Outer Layer)</li>
                <li><strong>ไฟฉายและพาวเวอร์แบงค์:</strong> อากาศเย็นจัดจะทำให้แบตเตอรี่โทรศัพท์หมดเร็วกว่าปกติ ควรเก็บโทรศัพท์และอุปกรณ์ไฟฟ้าไว้ในกระเป๋าเสื้อให้อบอุ่น</li>
                <li><strong>ช่วยกันรักษาความสะอาด (Leave No Trace):</strong> นำขยะทุกชิ้นลงมาทิ้งด้านล่าง เพื่อรักษาธรรมชาติให้สวยงามต่อไป</li>
            </ol>

            <div style="background: #262A22; color: #ffffff; padding: 2rem; border-radius: 1.5rem; margin-top: 2.5rem;">
                <h3 style="color: #D66E3A; margin-top: 0;">ไม่มีอุปกรณ์? ขับรถขึ้นดอยไม่ชิน? ให้น่องตึงดูแล!</h3>
                <p style="color: rgba(255,255,255,0.85); margin-bottom: 1.5rem;">น่องตึงมีบริการครบวงจร: เช่าเต็นท์และอุปกรณ์แคมป์ปิ้งพรีเมียม พร้อม <strong>บริการรถตู้ VIP พร้อมคนขับชำนาญทางขึ้นเขาสูง</strong> รับส่งตั้งแต่สนามบินเชียงใหม่ พาไปกางเต็นท์ ชงกาแฟ ดื่มด่ำธรรมชาติได้แบบไร้กังวล</p>
                <a href="https://line.me/R/ti/p/@nongtungrunning" target="_blank" style="background: #06C755; color: #ffffff; padding: 12px 24px; border-radius: 999px; font-weight: bold; text-decoration: none; display: inline-block;">ปรึกษาแผนเที่ยวทาง LINE: @nongtungrunning →</a>
            </div>
        `
    }
];
