// fetch-surahs.js
const fs = require('fs');
const path = require('path');
const axios = require('axios');


(async () => {
  const surahsData = [];

  // Loop from Surah 114 down to 78
  for (let surahNo = 114; surahNo >= 78; surahNo--) {
    try {
      // Fetch first ayah to get surah metadata
      const { data } = await axios.get(`https://quranapi.pages.dev/api/${surahNo}/1.json`);
      
      // Create YouTube title and description
      const title = `${data.surahNameArabic} | ${data.surahName} - Quran Surah ${surahNo}`;
      const description = `
Surah ${data.surahName} (${data.surahNameArabicLong}) - Chapter ${surahNo} of the Quran

🔹 Revelation: ${data.revelationPlace}
🔹 Total Verses: ${data.totalAyah}
🔹 English Title: ${data.surahNameTranslation}

This beautiful recitation of Surah ${data.surahName} is from the Holy Quran, recited with proper tajweed rules. 

Listen, reflect, and share the blessings!

#Quran #${data.surahName.replace(/\s+/g, '')} #Surah${surahNo} #IslamicContent
`.trim();

      surahsData.push({
        surahNo: surahNo,
        title: title,
        description: description,
        tags: `${data.surahName},${data.surahNameArabic},${data.surahNameTranslation},Quran,QuranRecitation,QuranKareem,IslamicContent,Tilawat,RelaxingQuran,Mishary Rashid Al Afasy`
       
      });

      console.log(`✅ Processed Surah ${surahNo}: ${data.surahNameArabic} (${data.surahName})`);

      // Add delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(`❌ Error processing Surah ${surahNo}:`, error.message);
    }
  }

  // Save all surahs data
  fs.writeFileSync(
    path.join(__dirname, 'data/surahs-114-to-78.json'),
    JSON.stringify(surahsData, null, 2)
  );
  
  console.log('✅ All surahs from 114 to 78 processed and saved!');
})();