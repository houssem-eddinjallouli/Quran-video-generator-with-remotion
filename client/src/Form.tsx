import React, { useState } from "react";
import axios from "axios";
import "./Form.css"; // Add this line if you separate styles (optional)

const Form = ({ onComplete }: { onComplete: () => void }) => {
  const [scene, setScene] = useState("short");
  const [playbackRate, setPlaybackRate] = useState(1);
  const [surah, setSurah] = useState(1);
  const [maxDuration, setMaxDuration] = useState(30);
  const [reciter, setReciter] = useState(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("🎬 Generating...");

    try {
      const res = await axios.post(
        "http://localhost:3911/generate",
        {
          scene,
          playbackRate,
          surah,
          maxDuration,
          reciter,
        },
        {
          responseType: "blob",
        }
      );

      // const blob = new Blob([res.data], { type: "video/mp4" });
      // const url = window.URL.createObjectURL(blob);
      // const link = document.createElement("a");
      // link.href = url;
      // link.setAttribute("download", "quran-video.mp4");
      // document.body.appendChild(link);
      // link.click();

      setMessage("✅ Video Generated!");
      onComplete();
    } catch (err) {
      console.error(err);
      setMessage("❌ Error generating video.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2>🎬 Generate Quran Video</h2>
      <p className="form-description">
        Select your preferences below and click generate to download a Quran video.
      </p>

      <div className="form-group">
        <label>Scene</label>
        <select value={scene} onChange={(e) => setScene(e.target.value)}>
          <option value="short">Short</option>
          <option value="normal">Normal</option>
        </select>
      </div>

      <div className="form-group">
        <label>Playback Rate</label>
        <input
          type="number"
          value={playbackRate}
          onChange={(e) => setPlaybackRate(Number(e.target.value))}
          step="0.1"
          min="0.5"
        />
      </div>

      <div className="form-group">
        <label>Surah (1–114)</label>
        <input
          type="number"
          value={surah}
          onChange={(e) => setSurah(Number(e.target.value))}
          min="1"
          max="114"
        />
      </div>

      <div className="form-group">
        <label>Max Duration (seconds)</label>
        <input
          type="number"
          value={maxDuration}
          onChange={(e) => setMaxDuration(Number(e.target.value))}
          min="10"
        />
      </div>

      <div className="form-group">
        <label>Reciter</label>
        <select value={reciter} onChange={(e) => setReciter(Number(e.target.value))}>
          <option value="1">Mishary Rashid Al Afasy</option>
          <option value="2">Abu Bakr Al Shatri</option>
          <option value="3">Nasser Al Qatami</option>
          <option value="4">Yasser Al Dosari</option>
          <option value="5">Hani Ar Rifai</option>
        </select>
      </div>

      <button className="generate-button" type="submit" disabled={loading}>
        {loading ? "Generating..." : "Generate"}
      </button>

      <p className="message">{message}</p>
    </form>
  );
};

export default Form;
