// fetch-ayat.js
const fs = require('fs');
const path = require('path');
const axios = require('axios');

const surah = 114;

(async () => {
  const { data: meta } = await axios.get(`https://quranapi.pages.dev/api/${surah}/1.json`);
  const totalAyah = meta.totalAyah;

  const ayat = [];

  for (let i = 1; i <= totalAyah; i++) {
    const { data } = await axios.get(`https://quranapi.pages.dev/api/${surah}/${i}.json`);

    // You can't fetch the duration from the URL, so we set a default duration (e.g., 6s)
    const defaultDuration = 6;

    ayat.push({
      arabic: data.arabic1,
      english: data.english,
      audio: data.audio[1].url,
      duration: defaultDuration
    });
  }

  fs.writeFileSync(path.join(__dirname, 'data/alfatiha.json'), JSON.stringify(ayat, null, 2));
  console.log('✅ Ayat downloaded and saved!');
})();
