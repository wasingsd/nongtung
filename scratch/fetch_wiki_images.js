const https = require('https');

function searchWiki(term) {
  return new Promise((resolve) => {
    const url = 'https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrnamespace=6&gsrsearch=' + encodeURIComponent(term) + '&gsrlimit=6&prop=imageinfo&iiprop=url|thumburl&iiurlwidth=1200&format=json';
    https.get(url, { headers: { 'User-Agent': 'NongtungApp/1.0 (info@nongtung.com)' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const pages = json.query?.pages || {};
          console.log('\n=== Term:', term, '===');
          const results = [];
          Object.values(pages).forEach(p => {
            const info = p.imageinfo?.[0];
            if (info) {
              console.log(p.title, '=>', info.thumburl || info.url);
              results.push({ title: p.title, url: info.thumburl || info.url });
            }
          });
          resolve(results);
        } catch (e) {
          console.error(e);
          resolve([]);
        }
      });
    }).on('error', err => { console.error(err); resolve([]); });
  });
}

async function run() {
  await searchWiki('Wat Pha Lat');
  await searchWiki('Kew Mae Pan');
  await searchWiki('Chiang Dao mountain');
  await searchWiki('Doi Inthanon');
  await searchWiki('Mae Klang Luang');
  await searchWiki('Doi Ang Khang');
}

run();
