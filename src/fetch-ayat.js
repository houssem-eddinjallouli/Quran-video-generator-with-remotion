// fetch-ayat.js
//const { reciter, surah, maxDuration } = require("./config.ts");
const fs = require("fs");
const path = require("path");
const axios = require("axios");
const { getAudioDurationInSeconds } = require("get-audio-duration");

let config;
try {
  delete require.cache[require.resolve("./config.temp.js")];
  config = require("./config.temp.js");
} catch (e) {
  config = require("./config.ts");
}
const { reciter, surah, maxDuration, firstAyah, lastAyah } = config;

(async () => {
  const { data: meta } = await axios.get(
    `https://quranapi.pages.dev/api/${surah}/1.json`,
  );
  const totalAyah = meta.totalAyah;
  if (firstAyah > totalAyah) {
    console.error(`Invalid ayah range for Surah ${surah}. Must be between 1 and ${totalAyah}`);
    return;
}

  const ayat = [];
  let totalDuration = 0;

  const end = lastAyah < totalAyah ? lastAyah : totalAyah;

  for (let i = firstAyah; i <= end; i++) {
    const { data } = await axios.get(
      `https://quranapi.pages.dev/api/${surah}/${i}.json`,
    );

    // Get the actual duration of the audio file
    let duration;
    try {
      duration = await getAudioDurationInSeconds(data.audio[reciter].url);
    } catch (error) {
      console.error(`Error getting duration for ayah ${i}, using default`);
      duration = 6; // fallback duration
    }
    if (maxDuration != 888) if (totalDuration + duration > maxDuration) break;
    totalDuration += duration;

    ayat.push({
      arabic: data.arabic1,
      english: data.english,
      audio: data.audio[reciter].url,
      duration: duration,
      name: data.surahNameArabicLong,
    });
  }

  fs.writeFileSync(
    path.join(__dirname, "data/alfatiha.json"),
    JSON.stringify(ayat, null, 2),
  );
  console.log(
    `✅ Ayat downloaded and saved from sourah ${surah} (${firstAyah}-${lastAyah}) with accurate durations! Total duration: ${totalDuration.toFixed(2)}s`,
  );
})();
