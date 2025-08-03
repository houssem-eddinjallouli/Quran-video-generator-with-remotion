import { AbsoluteFill, Audio, Img, Sequence } from 'remotion';

const alfatiha = require('./data/alfatiha.json');

let config;
try {
  delete require.cache[require.resolve('./config.temp.js')];
  config = require('./config.temp.js');
} catch (e) {
  config = require('./config.ts');
}
const { DEFAULT_PLAYBACK_RATE, SelectedScean, reciter, surah, maxDuration, firstAyah} = config;

const imgFolder = SelectedScean.width === 1080 ? 'v' : 'h';
const bgImages = Array.from({ length: 30 }, (_, i) => 
  require(`../public/${imgFolder}/bg${i + 1}.jpg`)
);

const bgImage = bgImages[ Math.ceil((reciter*10+surah*3+maxDuration)%bgImages.length)];
  
export const MyQuranVideo = () => {
  let startFrame = 0;
  
  return (
    <AbsoluteFill
      style={{
        fontFamily: "'Scheherazade New', serif",
        color: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
      }}
    >

      {alfatiha.map((ayah,  index) => {
        const adjustedDuration = ayah.duration / DEFAULT_PLAYBACK_RATE;
        const durationInFrames = Math.ceil(adjustedDuration  * SelectedScean.fps);
        //const bgImage = bgImages[Math.floor(Math.random() * bgImages.length)];
        //const bgImage = bgImages[index % bgImages.length];
        const seq = (
          <Sequence key={index} from={startFrame} durationInFrames={durationInFrames}>

            <Img
              src={bgImage}
              style={{
                width: '110%',
                height: '110%',
                objectFit: 'cover',
                position: 'absolute',
                filter: 'blur(1px) brightness(1.2)',
                transform: `scale(${1 + (index * 0.005)})`
              }}
            />
            <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.4)',}}>

              <Audio src={ayah.audio} playbackRate={DEFAULT_PLAYBACK_RATE} volume={DEFAULT_PLAYBACK_RATE * 1.1} />

              {/* title of the sourah */}
              <div style={{
                position: 'absolute',
                top: '40px',
                left: 0,
                right: 0,
                textAlign: 'center',
                zIndex: 100,
                fontSize: '70px',
                padding: '15px',
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                borderRadius: '0 0 5px 5px',
                textShadow: '2px 2px 4px #000',
                margin: '0 auto',
                width: 'fit-content',
              }}>
                {ayah.name}
              </div>

              {/* Arabic Verse */}
              <div style={{
                fontFamily: 'Scheherazade New',
                fontSize: ayah.arabic.length > 100 ? 70 : 120,
                lineHeight: 1.4,
                wordBreak: 'break-word',
                whiteSpace: 'normal',
                overflow: 'hidden',
                textAlign: 'center',
                padding: '20px',
                margin: '20px auto',
                maxWidth: '90%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                borderRadius: '10px',
                textShadow: '2px 2px 4px #000',
              }}>
                {ayah.arabic} 
                
                  <span style={{ fontSize: 80, marginLeft: '20px' }}>
                     ({index+firstAyah})
                  </span>
                
              </div>

              {/* English Translation */}
              <div style={{
                fontSize: ayah.english.length > 150 ? 40 : 50,
                lineHeight: 1.4,
                wordBreak: 'break-word',
                whiteSpace: 'normal',
                overflow: 'hidden',
                textAlign: 'center',
                padding: '20px',
                margin: '20px auto',
                maxWidth: '90%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                borderRadius: '10px',
                textShadow: '2px 2px 4px #000',
              }}>
                {ayah.english}
              </div>
            </AbsoluteFill>
          </Sequence>
        );

        startFrame += durationInFrames;
        return seq;
      })}
    </AbsoluteFill>
  );
};
