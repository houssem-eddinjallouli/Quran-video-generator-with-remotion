import React, { useEffect, useState } from "react";
import axios from "axios";
import "./VideoList.css"; // <- Include this line if you separate styles

const VideoList = () => {
  const [videos, setVideos] = useState<string[]>([]);

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
    <div className="video-list-container">
      <h2>📂 Generated Videos</h2>
      {videos.length === 0 ? (
        <p className="no-videos">No videos yet.</p>
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
                ⬇️ Download
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VideoList;
