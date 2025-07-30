// src/api.ts
import express from 'express';
import { exec } from 'child_process';
import path from 'path';
import fs from 'fs';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3911;

app.post('/generate', async (req, res) => {
  try {
    const {
      scene = 'short',
      playbackRate = 1,
      surah = 1,
      maxDuration = 30,
      reciter = 1
    } = req.body;

    // Validate inputs
    if (!['short', 'normal'].includes(scene)) {
      return res.status(400).json({ error: 'Invalid scene type ( short or normal )' });
    }
    if (surah < 1 || surah > 114) {
      return res.status(400).json({ error: 'Surah must be between 1 and 114' });
    }
    if (maxDuration <= -1) {
      return res.status(400).json({ error: 'Max duration must be a positive number (888 to unlimited time)' });
    }
    if (reciter < 1 || reciter > 5) {
      return res.status(400).json({ error: 'Reciter must be between 1 and 5 \n1:Mishary Rashid Al Afasy \n2:Abu Bakr Al Shatri \n3:Nasser Al Qatami \n4:Yasser Al Dosari \n5:Hani Ar Rifai' });
    }

    // Create a temporary config file
    const configContent = `
export const SCENE_CONFIG = {
  short: {
    width: 1080,
    height: 1920,
    fps: 20,
  },
  normal: {
    width: 1920,
    height: 1080,
    fps: 20,
  }
};
export const SelectedScean = SCENE_CONFIG.${scene};
export const DEFAULT_PLAYBACK_RATE = ${playbackRate};
export const surah = ${surah};
export const maxDuration = ${maxDuration};
export const reciter = ${reciter};
`;

    const tempConfigPath = path.join(__dirname, 'config.temp.js');
    fs.writeFileSync(tempConfigPath, configContent);

    // Execute the render process
    exec('npm run render', { cwd: path.join(__dirname, '..') }, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        console.error(`Stderr: ${stderr}`);
        return res.status(500).json({ 
          error: 'Video generation failed',
          details: stderr.toString()
        });
      }
      
      console.log(`Stdout: ${stdout}`);
      
      // To:
      const outputDir = path.join(__dirname, '../out');
      const videoFiles = fs.readdirSync(outputDir).filter(f => f.endsWith('.mp4'));
      const latestVideo = videoFiles.sort().pop(); // Get the most recent file

      if (latestVideo) {
        const videoPath = path.join(outputDir, latestVideo);
        if (fs.existsSync(videoPath)) {
          res.download(videoPath);
        } else {
          res.status(500).json({ error: 'Video file not found' });
        }
      } else {
        res.status(500).json({ error: 'Video file not found' });
      }
      
      // Clean up the temporary config file
      try {
        fs.unlinkSync(tempConfigPath);
      } catch (cleanupError) {
        console.error('Error cleaning up temp config:', cleanupError);
      }
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ 
      error: 'Internal server error', 
      details: error.message 
    });
  }
});

app.get('/list-videos', (req, res) => {
  const folder = path.join(__dirname, '../out');
  const files = fs.readdirSync(folder).filter(f => f.endsWith('.mp4'));
  res.json(files);
});

app.use('/out', express.static(path.join(__dirname, '../out')));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});