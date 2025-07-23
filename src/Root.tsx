import "./index.css";
import { Composition } from "remotion";
import { MyComposition } from "./Composition";
import alfatiha from './data/alfatiha.json';


const totalFrames = Math.ceil(alfatiha.reduce((sum: any, a: { duration: any; }) => sum + a.duration, 0) * 30);
export const RemotionRoot: React.FC = () => {
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
