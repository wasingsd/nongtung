const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const dir = path.join(__dirname, '..', 'public', 'images', 'articles');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

function downloadImage(url, destFilename) {
  return new Promise((resolve, reject) => {
    const destPath = path.join(dir, destFilename);
    const client = url.startsWith('https') ? https : http;

    function get(currentUrl, redirects = 0) {
      if (redirects > 5) {
        return reject(new Error('Too many redirects: ' + currentUrl));
      }
      client.get(currentUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
        }
      }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          const redirectUrl = new URL(res.headers.location, currentUrl).href;
          return get(redirectUrl, redirects + 1);
        }
        if (res.statusCode !== 200) {
          return reject(new Error(`Failed to download ${currentUrl}: HTTP ${res.statusCode}`));
        }
        const fileStream = fs.createWriteStream(destPath);
        res.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close();
          const stats = fs.statSync(destPath);
          console.log(`✓ Downloaded ${destFilename} (${stats.size} bytes)`);
          resolve(destPath);
        });
      }).on('error', (err) => {
        if (fs.existsSync(destPath)) fs.unlinkSync(destPath);
        reject(err);
      });
    }

    get(url);
  });
}

const imagesToDownload = [
  // 1. Monk's Trail & Wat Pha Lat
  {
    name: 'monks-trail-wat-pha-lat.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Wat_Pha_Lat_in_Chiang_Mai.jpg/1280px-Wat_Pha_Lat_in_Chiang_Mai.jpg'
  },
  {
    name: 'wat-pha-lat-jungle.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Chiang_Mai_-_Wat_Pha_Lat_-_0001.jpg/1280px-Chiang_Mai_-_Wat_Pha_Lat_-_0001.jpg'
  },

  // 2. Kew Mae Pan & Cloud Forest
  {
    name: 'kew-mae-pan-boardwalk.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Kew_Mae_Pan_Nature_Trail_Steps.jpg/1280px-Kew_Mae_Pan_Nature_Trail_Steps.jpg'
  },
  {
    name: 'kew-mae-pan-ridge.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Kew_Mae_Pan_Nature_Trail_Panorama_1.jpg/1280px-Kew_Mae_Pan_Nature_Trail_Panorama_1.jpg'
  },

  // 3. Pha Dok Siew & Mae Klang Luang
  {
    name: 'pha-dok-siew-waterfall.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Pha_Dok_Siao_Waterfall.jpg/1280px-Pha_Dok_Siao_Waterfall.jpg'
  },
  {
    name: 'mae-klang-luang-rice.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Rice_terrace_at_Ban_Mae_Klang_Luang.jpg/1280px-Rice_terrace_at_Ban_Mae_Klang_Luang.jpg'
  },

  // 4. Doi Luang Chiang Dao
  {
    name: 'chiang-dao-summit.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Doi_Chiang_Dao_in_the_clouds.jpg/1280px-Doi_Chiang_Dao_in_the_clouds.jpg'
  },

  // 5. Doi Mon Jong
  {
    name: 'doi-mon-jong-golden-ridge.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/The_plateau_on_Doi_Mon_Jong%2C_Omkoi_Wildlife_Sanctuary.jpg/1280px-The_plateau_on_Doi_Mon_Jong%2C_Omkoi_Wildlife_Sanctuary.jpg'
  },

  // 6. Doi Pha Hom Pok
  {
    name: 'doi-pha-hom-pok-peak.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Top_of_Doi_Pha_Hom_Pok.jpg/1280px-Top_of_Doi_Pha_Hom_Pok.jpg'
  },

  // 7. Doi Ang Khang
  {
    name: 'doi-ang-khang-view.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Doi_Angkhang.jpg/1280px-Doi_Angkhang.jpg'
  },

  // 8. VIP Commuter Van / Road trip Northern Thailand (High resolution van on scenic mountain route)
  {
    name: 'vip-commuter-van.jpg',
    url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=1200'
  },
  {
    name: 'vip-van-interior.jpg',
    url: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&q=80&w=1200'
  },

  // 9. Camping 101 & Camping Gear Rental (Clean tent setup, Coleman/K2 gear, mountain camp)
  {
    name: 'camping-tent-setup.jpg',
    url: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&q=80&w=1200'
  },
  {
    name: 'camping-gear-rental.jpg',
    url: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&q=80&w=1200'
  },
  {
    name: 'campfire-evening.jpg',
    url: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&q=80&w=1200'
  },

  // 10. Glamping Doi Inthanon (Sustainable luxury bell tent in mountain mist)
  {
    name: 'glamping-luxury-tent.jpg',
    url: 'https://images.unsplash.com/photo-1587061949409-02df41d5e562?auto=format&fit=crop&q=80&w=1200'
  },

  // 11. Corporate Teambuilding & Outing (Outdoor adventure rafting & group teamwork)
  {
    name: 'corporate-teambuilding.jpg',
    url: 'https://images.unsplash.com/photo-1530541930197-ff16ac917b0e?auto=format&fit=crop&q=80&w=1200'
  },
  {
    name: 'mae-taeng-rafting.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Thailand_2016_%283_of_422%29_%2832366322615%29.jpg/1280px-Thailand_2016_%283_of_422%29_%2832366322615%29.jpg'
  },

  // 12. Huay Kub Kab & San Pa Kia viewpoints
  {
    name: 'huay-kub-kab-mist.jpg',
    url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=1200'
  },
  {
    name: 'san-pa-kia-camp.jpg',
    url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1200'
  },
  {
    name: 'doi-pui-pine-campsite.jpg',
    url: 'https://images.unsplash.com/photo-1470246973918-29a93221c455?auto=format&fit=crop&q=80&w=1200'
  },
  {
    name: 'doi-pha-klong-canyon.jpg',
    url: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=1200'
  }
];

async function start() {
  console.log(`Starting download of ${imagesToDownload.length} article images...`);
  for (const img of imagesToDownload) {
    try {
      await downloadImage(img.url, img.name);
    } catch (err) {
      console.error(`✗ Error downloading ${img.name}:`, err.message);
    }
  }
  console.log('All downloads completed!');
}

start();
