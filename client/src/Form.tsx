import React, { useState } from "react";
import axios from "axios";
import "./Form.css";

const Form = ({ onComplete, language }: { onComplete: () => void; language: string }) => {
  const [scene, setScene] = useState("short");
  const [playbackRate, setPlaybackRate] = useState(1);
  const [surah, setSurah] = useState(1);
  const [firstAyah, setFirstAyah] = useState(1);
  const [lastAyah, setLastAyah] = useState(286);
  const [maxDuration, setMaxDuration] = useState(888);
  const [reciter, setReciter] = useState(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const translations = {
    en: {
      title: "🎬 Generate Quran Video",
      description: "Select your preferences below and click generate to download a Quran video.",
      scene: "Scene",
      short: "Short",
      normal: "Normal",
      playbackRate: "Playback Rate",
      surah: "Surah (1–114)",
      firstAyah: "First Ayah (1–286)",
      lastAyah: "Last Ayah (1–286)",
      maxDuration: "Max Duration (seconds)",
      reciter: "Reciter",
      generate: "Generate",
      generating: "Generating...",
      success: "✅ Video Generated!",
      error: "❌ Error generating video."
    },
    ar: {
      title: "🎬 توليد فيديو القرآن الكريم",
      description: "اختر التفضيلات أدناه وانقر على توليد لتنزيل فيديو القرآن.",
      scene: "المشهد",
      short: "قصير",
      normal: "عادي",
      playbackRate: "سرعة التشغيل",
      surah: "السورة (1–114)",
      firstAyah: "الآية الأولى (1–286)",
      lastAyah: "الآية الأخيرة (1–286)",
      maxDuration: "المدة القصوى (ثواني)",
      reciter: "القارئ",
      generate: "توليد",
      generating: "جاري التوليد...",
      success: "✅ تم توليد الفيديو!",
      error: "❌ خطأ في توليد الفيديو."
    }
  };

  const t = translations[language as keyof typeof translations];

  const reciters = {
    en: [
      "Mishary Rashid Al Afasy",
      "Abu Bakr Al Shatri",
      "Nasser Al Qatami",
      "Yasser Al Dosari",
      "Hani Ar Rifai"
    ],
    ar: [
      "مشاري راشد العفاسي",
      "أبو بكر الشاطري",
      "ناصر القطامي",
      "ياسر الدوسري",
      "هاني الرفاعي"
    ]
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(t.generating);

    try {
      const res = await axios.post(
        "http://localhost:3911/generate",
        {
          scene,
          playbackRate,
          surah,
          firstAyah,
          lastAyah,
          maxDuration,
          reciter,
        },
        {
          responseType: "blob",
        }
      );

      setMessage(t.success);
      onComplete();
    } catch (err) {
      console.error(err);
      setMessage(t.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit} dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <h2>{t.title}</h2>
      <p className="form-description">{t.description}</p>

      <div className="form-group">
        <label>{t.scene}</label>
        <select value={scene} onChange={(e) => setScene(e.target.value)}>
          <option value="short">{t.short}</option>
          <option value="normal">{t.normal}</option>
        </select>
      </div>

      <div className="form-group">
        <label>{t.playbackRate}</label>
        <input
          type="number"
          value={playbackRate}
          onChange={(e) => setPlaybackRate(Number(e.target.value))}
          step="0.1"
          min="0.8"
          max="1.4"
        />
      </div>

      <div className="form-group">
        <label>{t.surah}</label>
        <input
          type="number"
          value={surah}
          onChange={(e) => setSurah(Number(e.target.value))}
          min="1"
          max="114"
        />
      </div>

      <div className="form-group">
        <label>{t.firstAyah}</label>
        <input
          type="number"
          value={firstAyah}
          onChange={(e) => setFirstAyah(Number(e.target.value))}
          min="1"
          max="286"
        />
      </div>

      <div className="form-group">
        <label>{t.lastAyah}</label>
        <input
          type="number"
          value={lastAyah}
          onChange={(e) => setLastAyah(Number(e.target.value))}
          min="1"
          max="286"
        />
      </div>

      <div className="form-group">
        <label>{t.maxDuration}</label>
        <input
          type="number"
          value={maxDuration}
          onChange={(e) => setMaxDuration(Number(e.target.value))}
          min="10"
        />
      </div>

      <div className="form-group">
        <label>{t.reciter}</label>
        <select value={reciter} onChange={(e) => setReciter(Number(e.target.value))}>
          {reciters[language as keyof typeof reciters].map((name, index) => (
            <option key={index} value={index + 1}>{name}</option>
          ))}
        </select>
      </div>

      <button className="generate-button" type="submit" disabled={loading}>
        {loading ? t.generating : t.generate}
      </button>

      <p className="message">{message}</p>
    </form>
  );
};

export default Form;
