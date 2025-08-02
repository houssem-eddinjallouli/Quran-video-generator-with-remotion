# Quran Video Generator | مولد فيديو القرآن الكريم

## Made with Remotion video and quranapi | مصنوع بـ Remotion و QuranAPI

<p align="center">
  <a href="https://github.com/remotion-dev/logo">
    <img alt="Animated Remotion Logo" src="https://github.com/remotion-dev/logo/raw/main/animated-logo-banner-light.gif" width="300">
  </a>
  <hr>
  <a href="https://github.com/The-Quran-Project/Quran-API">
    <img alt="quranapi Logo" src="https://private-user-images.githubusercontent.com/85403795/316989136-db6214cb-9c8b-4513-ba1e-429031a6a767.svg?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NTQwNDE4NTUsIm5iZiI6MTc1NDA0MTU1NSwicGF0aCI6Ii84NTQwMzc5NS8zMTY5ODkxMzYtZGI2MjE0Y2ItOWM4Yi00NTEzLWJhMWUtNDI5MDMxYTZhNzY3LnN2Zz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTA4MDElMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwODAxVDA5NDU1NVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTU0YmI0OWY4N2M5ZmRhYmEzMThiYTVjODc3NGRlN2Y3OGFiYWIzYzVhZGYwZmRiN2JlYmYwMTgzNzA2ZTRlZTImWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.-JBWDF1xNQIkG9BrSXLvUd2L24vrqYqwvL42cwyiG9s" width="300">
  </a>
</p>

## Documentation | التوثيق

**English:**

- Remotion Docs [fundamentals page](https://www.remotion.dev/docs/the-fundamentals)
- QuranAPI Docs [fundamentals page](https://quranapi.pages.dev)

**العربية:**

- وثائق Remotion [الصفحة الأساسية](https://www.remotion.dev/docs/the-fundamentals)
- وثائق QuranAPI [الصفحة الأساسية](https://quranapi.pages.dev)

---

## Demo | عرض توضيحي

<p align="center">
  <img src="demo1.jpg" alt="Final Result | النتيجة النهائية" width="700"/>
  <img src="demo2.jpg" alt="Final Result | النتيجة النهائية" width="700"/>
</p>

---

## How to use | طريقة الاستخدام

**English:**

1. Just run the Quran-video-generator.exe
2. Or use the commands below

**العربية:**

1. قم بتشغيل ملف Quran-video-generator.exe
2. أو استخدم الأوامر التالية

---

## Commands | الأوامر

**Install Dependencies | تثبيت المتطلبات**

```console
npm run install-quran
```

**Start Application | تشغيل التطبيق**

```console
npm run quran
```

**Render Video from config.ts | تصيير الفيديو من config.ts**

```console
npm run render
```

---

## API Usage | استخدام API

**Turn on only the API with | تشغيل واجهة API فقط باستخدام:**

```console
npm run api
```

**Do a POST request at | قم بطلب POST على:**

```console
http://localhost:3911/generate
```

**Request body | جسم الطلب:**

```json
{
  "scene": "normal",
  "playbackRate": 1,
  "surah": 114,
  "maxDuration": 888,
  "reciter": 1
}
```

---

## Quran Videos Made With This App | فيديوهات قرآنية مصنوعة بهذا التطبيق

### 9:16 Aspect Ratio | نسبة 9:16

[YouTube playlist with Remotion | قائمة تشغيل يوتيوب بـ Remotion](https://www.youtube.com/playlist?list=PLfeJYnlSUWwNBy_u5Jl7hM3Ph3GVkUbEq)

### 16:9 Aspect Ratio | نسبة 16:9

[YouTube video with Remotion | فيديو يوتيوب بـ Remotion](https://www.youtube.com/playlist?list=PLfeJYnlSUWwPPFFVnSHrTTp6UmPPAgnRw)

---

## Contributing | المساهمة

**English:**  
Feel free to open issues or pull requests to improve this project!

**العربية:**  
لا تتردد في فتح مشكلات أو طلبات سحب لتحسين هذا المشروع!
