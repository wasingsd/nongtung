const fs = require('fs');
const path = require('path');
const https = require('https');

const dir = path.join(__dirname, '..', 'public', 'images', 'articles');

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function downloadImage(url, destFilename) {
  return new Promise((resolve, reject) => {
    const destPath = path.join(dir, destFilename);

    function get(currentUrl, redirects = 0) {
      if (redirects > 5) return reject(new Error('Too many redirects: ' + currentUrl));
      
      const req = https.get(currentUrl, {
        headers: {
          'User-Agent': 'NongtungApp/1.0 (https://nongtung.com; nongtung.trekking@gmail.com) Bot/1.0',
          'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
        }
      }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          const redirectUrl = new URL(res.headers.location, currentUrl).href;
          return get(redirectUrl, redirects + 1);
        }
        if (res.statusCode !== 200) {
          return reject(new Error(`HTTP ${res.statusCode} on ${currentUrl}`));
        }
        const fileStream = fs.createWriteStream(destPath);
        res.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close();
          const stats = fs.statSync(destPath);
          console.log(`✓ Downloaded ${destFilename} (${stats.size} bytes)`);
          resolve(destPath);
        });
      });

      req.on('error', (err) => {
        if (fs.existsSync(destPath)) fs.unlinkSync(destPath);
        reject(err);
      });
    }

    get(url);
  });
}

const remaining = [
  {
    name: 'kew-mae-pan-boardwalk.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Kew_Mae_Pan_Nature_Trail_Steps.jpg/1280px-Kew_Mae_Pan_Nature_Trail_Steps.jpg'
  },
  {
    name: 'kew-mae-pan-ridge.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Kew_Mae_Pan_Nature_Trail_Panorama_1.jpg/1280px-Kew_Mae_Pan_Nature_Trail_Panorama_1.jpg'
  },
  {
    name: 'pha-dok-siew-waterfall.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Pha_Dok_Siao_Waterfall.jpg/1280px-Pha_Dok_Siao_Waterfall.jpg'
  },
  {
    name: 'mae-klang-luang-rice.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Rice_terrace_at_Ban_Mae_Klang_Luang.jpg/1280px-Rice_terrace_at_Ban_Mae_Klang_Luang.jpg'
  },
  {
    name: 'chiang-dao-summit.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Doi_Chiang_Dao_in_the_clouds.jpg/1280px-Doi_Chiang_Dao_in_the_clouds.jpg'
  },
  {
    name: 'doi-mon-jong-golden-ridge.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/The_plateau_on_Doi_Mon_Jong%2C_Omkoi_Wildlife_Sanctuary.jpg/1280px-The_plateau_on_Doi_Mon_Jong%2C_Omkoi_Wildlife_Sanctuary.jpg'
  },
  {
    name: 'doi-pha-hom-pok-peak.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Top_of_Doi_Pha_Hom_Pok.jpg/1280px-Top_of_Doi_Pha_Hom_Pok.jpg'
  },
  {
    name: 'doi-ang-khang-view.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Doi_Angkhang.jpg/1280px-Doi_Angkhang.jpg'
  },
  {
    name: 'mae-taeng-rafting.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Thailand_2016_%283_of_422%29_%2832366322615%29.jpg/1280px-Thailand_2016_%283_of_422%29_%2832366322615%29.jpg'
  }
];

async function start() {
  for (const item of remaining) {
    try {
      console.log(`Downloading ${item.name}...`);
      await downloadImage(item.url, item.name);
      await delay(2500); // 2.5s delay to be friendly to Wikimedia
    } catch (e) {
      console.error(`Failed ${item.name}:`, e.message);
    }
  }
}

start();
