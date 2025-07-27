import { AbsoluteFill, Audio, Img, Sequence, Video } from 'remotion';
const alfatiha = require('./data/alfatiha.json');
import backgroundVideo from './audio/13853202_1080_1920_60fps.mp4';
import { playbackRate, selectedScean } from './Root';

const bgImages = [
  require('../public/bg1.jpg'),
  require('../public/bg2.jpg'),
  require('../public/bg3.jpg'),
  require('../public/bg4.jpg'),
  require('../public/bg5.jpg'),
  require('../public/bg6.jpg'),
  // Add more as needed
];
export const MyQuranVideo = () => {
  let startFrame = 0;


  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#00FF00', // Clean chroma green
        fontFamily: "'Scheherazade New', Arial, sans-serif",
        color: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
      }}
    >
       {/* <Video
        loop 
        src={backgroundVideo}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          position: 'absolute',
        }}
      /> */}
      {alfatiha.map((ayah,  index) => {
        const adjustedDuration = ayah.duration / playbackRate;
        const durationInFrames = Math.ceil(adjustedDuration  * selectedScean.fps);
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

              <Audio src={ayah.audio} playbackRate={playbackRate} volume={1.2} />

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
                fontSize: 120,
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
                fontSize: 60,
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
