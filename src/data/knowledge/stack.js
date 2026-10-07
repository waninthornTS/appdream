import part1 from './stack/part1.js'
import part2 from './stack/part2.js'
import part3 from './stack/part3.js'

export default {
  id: 'stack',
  title: 'ใช้อะไรคู่กับอะไร',
  emoji: '🔗',
  color: '#f4a9c4',
  intro:
    'Angular ↔ .NET C# ↔ LINQ / Stored Procedure ↔ SQL Server ต่อกันยังไง ตามดูข้อมูลเดินทางตั้งแต่ client จนถึง database พร้อมตัวอย่างระบบสินค้าที่ใช้ร่วมกันทุกเรื่อง 🌷',
  topics: [...part1, ...part2, ...part3],
}
