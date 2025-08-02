import React, { useEffect, useState } from "react";
import axios from "axios";
import "./VideoList.css";

const VideoList = ({ language }: { language: string }) => {
  const [videos, setVideos] = useState<string[]>([]);

  const translations = {
    en: {
      title: "📂 Generated Videos",
      noVideos: "No videos yet.",
      download: "⬇️ Download"
    },
    ar: {
      title: "📂 الفيديوهات المولدة",
      noVideos: "لا توجد فيديوهات بعد.",
      download: "⬇️ تنزيل"
    }
  };

  const t = translations[language as keyof typeof translations];

  const fetchVideos = async () => {
    try {
      const res = await axios.get<string[]>("http://localhost:3911/list-videos");
      setVideos(res.data);
    } catch (err) {
      console.error("Failed to fetch videos", err);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <div className="video-list-container" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <h2>{t.title}</h2>
      {videos.length === 0 ? (
        <p className="no-videos">{t.noVideos}</p>
      ) : (
        <div className="video-grid">
          {videos.map((vid, idx) => (
            <div key={idx} className="video-card">
              <video
                controls
                src={`http://localhost:3911/out/${vid}`}
                className="video-player"
              />
              <a
                className="download-link"
                href={`http://localhost:3911/out/${vid}`}
                download
              >
                {t.download}
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VideoList;
