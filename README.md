# 🍃 Leafy Desk

แอป PWA ส่วนตัวสไตล์ Animal Crossing: คลังความรู้ Software Engineer + คอร์ดกีตาร์ + to-do + จับเวลาโฟกัส

## รันบนเครื่อง

```bash
npm install
npm run dev
```

เปิด http://localhost:5173 บนคอม หรือเปิดลิงก์ `Network:` ที่ terminal แสดง (เช่น `http://192.168.x.x:5173`) จาก Safari บน iPhone ที่ต่อ Wi-Fi เดียวกัน

## เว็บจริง (GitHub Pages)

https://waninthornts.github.io/appdream/

ทุกครั้งที่ push ขึ้น  GitHub Actions () จะตรวจเนื้อหา + คอร์ด, build แล้ว deploy ให้อัตโนมัติ

ติดตั้งลง iPhone: เปิดลิงก์ด้านบนใน Safari → ปุ่มแชร์ → **เพิ่มไปยังหน้าจอโฮม** (ใช้ออฟไลน์ได้)

## โครงสร้าง

| ที่อยู่ | คืออะไร |
|---|---|
| `src/data/knowledge/*.js` | เนื้อหาคลังความรู้ 1 ไฟล์ = 1 หมวด (รูปแบบดู `SCHEMA.md`) เพิ่มไฟล์ใหม่ได้เลย แอปจะโหลดเอง |
| `src/data/chords.js` | คอร์ดกีตาร์จาก `@tombatossals/chords-db` + กรองท่าจับที่โน้ตผิดออกด้วย `chordRules.js` |
| `src/components/GirlScene.jsx` | ฉากหน้าแรก: ท้องฟ้าตามเวลา + ตัวละคร Dream |
| `scripts/make-dream.mjs` | สร้าง `public/dream-guitar.webp` จากรูป Dream ต้นฉบับ (`scripts/src-art/`) โดยเปลี่ยนตุ๊กตาหมีเป็นกีตาร์ |
| `src/components/ChordDiagram.jsx` | ภาพคอร์ด SVG สีตามนิ้ว |
| `scripts/icons.mjs` | สร้างไอคอนแอปจากหน้า Dream |
| `scripts/check-chords.mjs` | ตรวจว่าทุกคอร์ดโน้ตตรงตามทฤษฎี (`node scripts/check-chords.mjs`) |
