import "./index.css";
import { Composition } from "remotion";
import { MyComposition } from "./Composition";

const alfatiha = require('./data/alfatiha.json');

let config;
try {
  delete require.cache[require.resolve('./config.temp.js')];
  config = require('./config.temp.js');
} catch (e) {
  config = require('./config.ts');
}
const { DEFAULT_PLAYBACK_RATE, SelectedScean, surah, reciter} = config;

// const pages = require('./data/quran_pages.json');

// const pageSelection = {
//   start: 1,    // First page to include
//   end: 1,      // Last page to include
// };

// const selectedPages = pages.filter(page => 
//     page.pageNumber >= pageSelection.start && 
//     page.pageNumber <= pageSelection.end
//   );

export const RemotionRoot: React.FC = () => {
    const totalDuration = alfatiha.reduce((sum: number, ayah: { duration: number; }) => sum + (ayah.duration / DEFAULT_PLAYBACK_RATE), 0);
    //const totalDuration = pages.reduce((sum: number, ayah: { duration: number; }) => sum + (ayah.duration / playbackRate), 0);
    //const totalDuration = selectedPages.reduce((sum: number, page: { duration: number }) => sum + (page.duration / playbackRate), 0);
    const totalFrames = Math.ceil(totalDuration * SelectedScean.fps);

    //1:Mishary Rashid Al Afasy  
    //2:Abu Bakr Al Shatri
    //3:Nasser Al Qatami
    //4:Yasser Al Dosari
    //5:Hani Ar Rifai
    const reciterNames = [
        'Mishary-Rashid-Al-Afasy',
        'Abu-Bakr-Al-Shatri',
        'Nasser-Al-Qatami',
        'Yasser-Al-Dosari',
        'Hani-Ar-Rifai',
    ];
    const videotype = SelectedScean.width === 1080 ? 'short' : 'video';
    const fileName = `surah-${surah}-${reciterNames[reciter -1]}-${videotype}`
  return (
    <>
      <Composition
        id={fileName}
        component={MyComposition}
        durationInFrames={totalFrames}
        fps={SelectedScean.fps}
        width={SelectedScean.width}
        height={SelectedScean.height}
      />
    </>
  );
};
