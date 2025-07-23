import { AbsoluteFill, Audio, Sequence } from 'remotion';
import alfatiha from './data/alfatiha.json';

export const MyQuranVideo = () => {
  let startFrame = 0;
  const fps = 30;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#00FF00', // Clean chroma green
        fontFamily: 'Arial, sans-serif',
        color: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
      }}
    >
      {alfatiha.map((ayah, index) => {
        const durationInFrames = Math.ceil(ayah.duration * fps);

        const seq = (
          <Sequence key={index} from={startFrame} durationInFrames={durationInFrames}>
            <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Audio src={ayah.audio} />

              {/* Arabic Verse */}
              <div
                style={{
                  fontSize: 120,
                  padding: '20px',
                  margin: '20px auto',
                 
                  maxWidth: '90%',
                }}
              >
                {ayah.arabic}
                {index > 0 && (
                  <span style={{ fontSize: 80, marginLeft: 20 }}>
                    ({index})
                  </span>
                )}
              </div>

              {/* English Translation */}
              <div
                style={{
                  fontSize: 80,
                  padding: '20px',
                  margin: '20px auto',
                 
                  maxWidth: '90%',
                }}
              >
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
