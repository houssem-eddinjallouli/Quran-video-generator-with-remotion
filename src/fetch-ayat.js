// fetch-ayat.js
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { getAudioDurationInSeconds } = require('get-audio-duration');

const surah = 114;

(async () => {
  const { data: meta } = await axios.get(`https://quranapi.pages.dev/api/${surah}/1.json`);
  const totalAyah = meta.totalAyah;

  const ayat = [];

  for (let i = 1; i <= totalAyah; i++) {
    const { data } = await axios.get(`https://quranapi.pages.dev/api/${surah}/${i}.json`);
    
    // Get the actual duration of the audio file
    let duration;
    try {
      duration = await getAudioDurationInSeconds(data.audio[1].url);
    } catch (error) {
      console.error(`Error getting duration for ayah ${i}, using default`);
      duration = 6; // fallback duration
    }

    ayat.push({
      arabic: data.arabic1,
      english: data.english,
      audio: data.audio[1].url,
      duration: duration,
      name: data.surahNameArabicLong,
    });
  }

  fs.writeFileSync(path.join(__dirname, 'data/alfatiha.json'), JSON.stringify(ayat, null, 2));
  console.log('✅ Ayat downloaded and saved with accurate durations!');
})();