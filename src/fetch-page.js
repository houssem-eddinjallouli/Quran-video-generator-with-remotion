// fetch-pages.js
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { getAudioDurationInSeconds } = require('get-audio-duration');

const totalPages = 604; // Total Quran pages
const outputFile = path.join(__dirname, 'data/quran_pages.json');

(async () => {
  const pages = [];

  for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
    try {
      const page = pageNum.toString().padStart(3, '0');
      const imageUrl = `https://easyquran.com/wp-content/uploads/2022/10/${pageNum}-scaled.jpg`;
      const audioUrl = `https://tajweed-qr.com/voice/Qal/Osman-Al-Andari/${page}.mp3`;

      // Get audio duration
      let duration;
      try {
        duration = await getAudioDurationInSeconds(audioUrl);
      } catch (error) {
        console.error(`Error getting duration for page ${pageNum}, using default`);
        duration = 45; // Average page duration
      }

      pages.push({
        pageNumber: pageNum,
        image: imageUrl,
        audio: audioUrl,
        duration: duration,
        // Additional metadata you might want:
        juz: Math.ceil(pageNum/20), // Juz calculation (1-30)
        hizb: Math.ceil(pageNum/10), // Hizb calculation (1-60)
      });

      console.log(`Processed page ${pageNum}/${totalPages}`);
      
      // Rate limiting - be polite to servers
      if (pageNum % 10 === 0) await new Promise(r => setTimeout(r, 1000));
    } catch (error) {
      console.error(`Error processing page ${pageNum}:`, error.message);
    }
  }

  fs.writeFileSync(outputFile, JSON.stringify(pages, null, 2));
  console.log(`✅ Successfully processed ${pages.length} Quran pages!`);
})();