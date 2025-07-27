import { AbsoluteFill, Audio, Img, Sequence, Video } from 'remotion';
const pages = require('./data/quran_pages.json');
import { playbackRate, selectedScean } from './Root';

const bgImages = [
  require('../public/bg1.jpg'),
  require('../public/bg2.jpg'),
  require('../public/bg3.jpg'),
  require('../public/bg4.jpg'),
  require('../public/bg5.jpg'),
  require('../public/bg6.jpg'),
  require('../public/bg7.jpg'),
  require('../public/bg8.jpg'),
  require('../public/bg9.jpg'),
  require('../public/bg10.jpg'),
  // Add more as needed
];
const CONFIG = {
 selectedPages: { 
    start: 3,  // First page to render
    end: 3     // Last page to render
  },
  quranPageStyle: {
    width: '115%',       // Adjust based on your preference
    maxHeight: '115%',
    objectFit: 'contain',
    borderRadius: '8px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)'
  }
};

export const QuranPages = () => {
  let startFrame = 0;

  const selectedPages = pages.filter(page => 
    page.pageNumber >= CONFIG.selectedPages.start && 
    page.pageNumber <= CONFIG.selectedPages.end
  );

  return (
    <AbsoluteFill style={{ backgroundColor: '#001a00' }}>

      {selectedPages.map((page,  index) => {
        const adjustedDuration = page.duration / playbackRate;
        const durationInFrames = Math.ceil(adjustedDuration  * selectedScean.fps);
        const bgImage = bgImages[index % bgImages.length];
        const seq = (
          <Sequence key={page.pageNumber} from={startFrame} durationInFrames={durationInFrames}>
            {/* Background Image */}
            <Img
              src={bgImage}
              style={{
                width: '110%',
                height: '110%',
                objectFit: 'cover',
                position: 'absolute',
                filter: 'blur(2px) brightness(0.7)',
                transform: `scale(${1 + (index * 0.005)})`
              }}
            />
            {/* Semi-transparent overlay */}
            <AbsoluteFill style={{ 
              backgroundColor: 'rgba(0, 30, 0, 0.4)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              {/* Quran Page Image */}
              <Img
                src={page.image}
                style={CONFIG.quranPageStyle}
              />

              {/* Audio - hidden but essential */}
              <Audio 
                src={page.audio} 
                
                
              />

              {/* Page Number Indicator (optional) */}
              <div style={{
                position: 'absolute',
                bottom: '40px',
                right: '40px',
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                color: 'gold',
                padding: '10px 20px',
                borderRadius: '20px',
                fontSize: '24px',
                fontFamily: 'Arial'
              }}>
                Page {page.pageNumber}
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
