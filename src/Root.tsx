import "./index.css";
import { Composition } from "remotion";
import { MyComposition } from "./Composition";
const alfatiha = require('./data/alfatiha.json');
const playbackRate = 1.3;


export const RemotionRoot: React.FC = () => {
  const totalDuration = alfatiha.reduce((sum: number, ayah: { duration: number; }) => sum + (ayah.duration / playbackRate), 0);
   const totalFrames = Math.ceil(totalDuration * 30);
  return (
    <>
      <Composition
        id="MyComp"
        component={MyComposition}
        durationInFrames={totalFrames}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
