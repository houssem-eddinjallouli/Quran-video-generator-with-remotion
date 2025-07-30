import { AbsoluteFill, Audio, Img, Sequence } from 'remotion';

const alfatiha = require('./data/alfatiha.json');

let config;
try {
  delete require.cache[require.resolve('./config.temp.js')];
  config = require('./config.temp.js');
} catch (e) {
  config = require('./config.ts');
}
const { DEFAULT_PLAYBACK_RATE, SelectedScean } = config;

const imgFolder = SelectedScean.width === 1080 ? 'v' : 'h';
const bgImages = [
  require(`../public/${imgFolder}/bg1.jpg`),
  require(`../public/${imgFolder}/bg2.jpg`),
  require(`../public/${imgFolder}/bg3.jpg`),
  require(`../public/${imgFolder}/bg4.jpg`),  
  require(`../public/${imgFolder}/bg5.jpg`),
  require(`../public/${imgFolder}/bg6.jpg`),
  require(`../public/${imgFolder}/bg7.jpg`),
  require(`../public/${imgFolder}/bg8.jpg`),
  require(`../public/${imgFolder}/bg9.jpg`),
  require(`../public/${imgFolder}/bg10.jpg`),
  ];

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
        const bgImage = bgImages[index % bgImages.length];
        const seq = (
          <Sequence key={index} from={startFrame} durationInFrames={durationInFrames}>

            <Img
              src={bgImage}
              style={{
                width: '110%',
                height: '110%',
                objectFit: 'cover',
                position: 'absolute',
                transform: `scale(${1 + index*0.01})`,
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
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                borderRadius: '0 0 10px 10px',
                textShadow: '2px 2px 4px #000',
                margin: '0 auto',
                width: 'fit-content',
              }}>
                {ayah.name}
              </div>

              {/* Arabic Verse */}
              <div style={{
                fontFamily: 'Scheherazade New',
                fontSize: ayah.arabic.length > 100 ? 100 : 140,
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
                     ({index+1})
                  </span>
                
              </div>

              {/* English Translation */}
              <div style={{
                fontSize: ayah.english.length > 160 ? 40 : 60,
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
