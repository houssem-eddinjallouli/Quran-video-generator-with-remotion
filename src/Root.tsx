import "./index.css";
import { Composition } from "remotion";
import { MyComposition } from "./Composition";
const alfatiha = require('./data/alfatiha.json');
const pages = require('./data/quran_pages.json');

const shortScean ={
  width : 1080,
  height: 1920,
  fps: 30,
}
const normalScean = {
  width : 1920,
  height: 1080,
  fps: 30,
}

const pageSelection = {
  start: 3,    // First page to include
  end: 3,      // Last page to include
};

const selectedPages = pages.filter(page => 
    page.pageNumber >= pageSelection.start && 
    page.pageNumber <= pageSelection.end
  );

export const selectedScean = normalScean;
export const playbackRate = 1;

export const RemotionRoot: React.FC = () => {
    //const totalDuration = alfatiha.reduce((sum: number, ayah: { duration: number; }) => sum + (ayah.duration / playbackRate), 0);
    //const totalDuration = pages.reduce((sum: number, ayah: { duration: number; }) => sum + (ayah.duration / playbackRate), 0);
    const totalDuration = selectedPages.reduce((sum: number, page: { duration: number }) => sum + (page.duration / playbackRate), 0);
    const totalFrames = Math.ceil(totalDuration * selectedScean.fps);
  return (
    <>
      <Composition
        id="MyComp"
        component={MyComposition}
        durationInFrames={totalFrames}
        fps={selectedScean.fps}
        width={selectedScean.width}
        height={selectedScean.height}
      />
    </>
  );
};
