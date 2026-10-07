// 💬 ภาษาโปรแกรม — knowledge category
// หมายเหตุ: code ใช้ template literal -> backslash ในโค้ดต้องเขียนเป็น \\ และ ` / ${ ต้อง escape

const clean = (o) => Object.fromEntries(Object.entries(o).filter(([, v]) => v !== undefined))
const text = (title, body) => clean({ type: 'text', title, body })
const list = (title, items) => clean({ type: 'list', title, items })
const steps = (title, items) => clean({ type: 'steps', title, items })
const code = (title, lang, src, note) => clean({ type: 'code', title, lang, code: src, note })
const table = (title, headers, rows) => clean({ type: 'table', title, headers, rows })
const tip = (body) => ({ type: 'tip', body })
const warn = (body) => ({ type: 'warn', body })
const pairs = (items, title) => clean({ type: 'pairs', title, items })

/* ───────────────────────── 1. ภาษาทำงานยังไง ───────────────────────── */
const howItWorks = {
  id: 'how-languages-work',
  title: 'ภาษาโปรแกรมทำงานยังไง',
  emoji: '⚙️',
  summary: 'Compiled vs Interpreted vs JIT, Static vs Dynamic typing + ตารางเทียบทุกภาษา',
  tags: ['compiler', 'interpreter', 'jit', 'typing', 'runtime', 'compare', 'basic'],
  sections: [
    text('คอมพิวเตอร์เข้าใจแค่ machine code 🤖', 'CPU อ่านออกแค่คำสั่งเลขฐานสอง โค้ดที่เราเขียนเลยต้องถูก "แปล" ก่อนเสมอ\n\nความต่างของแต่ละภาษาคือ **แปลตอนไหน** และ **แปลเป็นอะไร** นี่แหละ~'),
    table('3 วิธีหลักในการรันโค้ด', ['แบบ', 'ทำงานยังไง', 'ตัวอย่าง'], [
      ['**Compiled (AOT)**', 'แปลทั้งโปรแกรมเป็น machine code ก่อนรัน ได้ไฟล์ binary เร็วมาก', 'C, C++, Go, Rust, Swift'],
      ['**Interpreted**', 'มีโปรแกรม interpreter อ่าน/รันทีละส่วนตอน runtime ยืดหยุ่น แก้แล้วรันได้เลย', 'Bash, Python (CPython), PHP'],
      ['**Bytecode + VM**', 'compile เป็น bytecode กลางก่อน แล้วให้ virtual machine รัน (ข้าม OS ได้)', 'Java/Kotlin (JVM), C# (CLR)'],
      ['**JIT**', 'รันไปด้วย จับโค้ดที่ถูกเรียกบ่อย (hot path) มา compile เป็น machine code ตอนรัน', 'JS (V8), JVM, .NET, PHP 8 JIT'],
    ]),
    tip('จริงๆ ไม่มีภาษาไหน "เป็น" compiled หรือ interpreted 100% นะ มันขึ้นกับ **implementation** เช่น Python เองก็ compile เป็น bytecode (`.pyc`) ก่อน แล้ว Dart ใช้ JIT ตอน dev (hot reload) แต่ใช้ AOT ตอน build จริง'),
    text('Static vs Dynamic typing 🏷️', '**Static** = เช็ก type ตอน compile เจอบั๊กเร็ว IDE ช่วย autocomplete ได้ดี (Java, C#, Go, Rust, TS)\n\n**Dynamic** = type ผูกกับ "ค่า" ตอนรัน ตัวแปรเดียวเปลี่ยน type ได้ เขียนเร็วแต่บั๊กโผล่ตอนรัน (JS, Python, PHP, Bash)'),
    text('Strong vs Weak typing 💪', 'อีกแกนหนึ่ง: ภาษาแปลง type ให้เองแบบเงียบๆ ไหม\n\n**Strong** เช่น Python: `"1" + 1` → TypeError\n\n**Weak** เช่น JS: `"1" + 1` → `"11"` (แปลงให้เองเลย 😅)'),
    code('ตัวอย่างความต่าง', 'ts', `// JavaScript (dynamic + weak)
let x = 5
x = 'hello'        // ได้ ไม่มีใครว่า
console.log('1' + 1) // '11'

// TypeScript (static)
let y: number = 5
y = 'hello'        // ❌ Error ตอน compile:
                   // Type 'string' is not assignable to type 'number'`),
    table('ตารางเทียบภาษา', ['ภาษา', 'Typing', 'รันยังไง', 'ใช้หลักๆ'], [
      ['JavaScript', 'dynamic, weak', 'JIT engine (V8 ใน browser / Node.js)', 'เว็บ frontend, backend Node'],
      ['TypeScript', 'static (gradual)', 'compile → JS แล้วรันแบบ JS', 'เว็บ/แอปขนาดใหญ่'],
      ['Python', 'dynamic, strong', 'interpreter (CPython → bytecode)', 'data, AI/ML, script, backend'],
      ['Java', 'static', 'bytecode → JVM (JIT)', 'enterprise backend, Android'],
      ['C#', 'static', 'IL → .NET CLR (JIT / AOT)', 'backend .NET, เกม Unity, desktop'],
      ['Go', 'static', 'compile → native binary', 'cloud, microservice, CLI'],
      ['PHP', 'dynamic (มี type hint)', 'Zend Engine + OPcache/JIT', 'เว็บ backend, WordPress'],
      ['Kotlin', 'static', 'JVM bytecode / Native / JS', 'Android, backend'],
      ['Swift', 'static', 'compile → native (LLVM)', 'iOS, macOS, Apple ทั้งหมด'],
      ['Dart', 'static (null safe)', 'JIT ตอน dev, AOT ตอน release', 'Flutter (mobile/web/desktop)'],
      ['Rust', 'static', 'compile → native (LLVM)', 'systems, งานเร็วจัด, WASM'],
      ['C / C++', 'static (C ค่อนข้าง weak)', 'compile → native', 'OS, embedded, game engine'],
      ['Bash', 'dynamic (ทุกอย่างคือ string)', 'shell interpreter', 'automation, DevOps'],
      ['HTML & CSS', '— (markup / style)', 'browser render', 'โครงสร้าง + หน้าตาเว็บ'],
    ]),
    list('อย่างอื่นที่ควรรู้', [
      '**Garbage Collector (GC)** — คืน memory ให้อัตโนมัติ: JS, Python, Java, C#, Go, Kotlin, Dart, PHP',
      '**จัดการ memory เอง** — C (`malloc`/`free`), C++ (แนะนำ smart pointer)',
      '**ARC** — Swift นับ reference แล้วคืนเอง ไม่มี GC pause',
      '**Ownership** — Rust เช็กตอน compile ว่าใครเป็นเจ้าของ memory ไม่ต้องมี GC',
      '**Runtime** = สิ่งที่ต้องมีตอนรัน เช่น Node.js, JVM, .NET, Python interpreter (Go/Rust ได้ binary เดี่ยว ไม่ต้องลงอะไรเพิ่ม)',
    ]),
    tip('เลือกภาษาไม่ต้องหาตัวที่ "ดีที่สุด" ให้ดูว่า **งาน + ทีม + ecosystem** เหมาะกับอะไร เช่นทำ iOS ก็ Swift, ทำ data ก็ Python, ทำเว็บก็ JS/TS 🌱'),
  ],
}

/* ───────────────────────── 2. JavaScript ───────────────────────── */
const javascript = {
  id: 'javascript',
  title: 'JavaScript',
  emoji: '🟨',
  summary: 'ภาษาของเว็บ รันได้ทั้ง browser และ server (Node.js)',
  tags: ['js', 'javascript', 'node', 'web', 'frontend', 'backend', 'npm', 'async'],
  sections: [
    text('คืออะไร ใช้ที่ไหน', 'ภาษาเดียวที่ browser รันได้ตรงๆ 🌐 ใช้ทำหน้าเว็บให้ขยับได้ แล้วพอมี **Node.js** ก็เอาไปเขียน backend, CLI, desktop (Electron) ได้ด้วย\n\nมาตรฐานชื่อ **ECMAScript** (ES2015 = ES6 คือจุดเปลี่ยนใหญ่ มี `let`, `const`, arrow function, class, module)'),
    list('รันยังไง', [
      'Engine แบบ **JIT**: V8 (Chrome, Node.js, Deno), SpiderMonkey (Firefox), JavaScriptCore (Safari, Bun)',
      'Single-thread + **event loop** — งาน I/O ไม่บล็อก ใช้ callback / Promise / async-await',
      'ไม่ต้อง compile เอง แต่ใน project จริงมักผ่าน bundler (Vite, webpack) ก่อน deploy',
    ]),
    code('ติดตั้ง & Hello World', 'bash', `# ติดตั้ง Node.js LTS จาก nodejs.org (หรือใช้ nvm / fnm)
node -v
npm -v

# hello.js
echo "console.log('Hello, world!')" > hello.js
node hello.js

# หรือกด F12 ใน browser แล้วพิมพ์ใน Console ได้เลย`),
    code('ตัวแปร & type', 'js', `const name = 'Mochi'      // ค่าคงที่ (reassign ไม่ได้)
let age = 3               // เปลี่ยนค่าได้
// var — แบบเก่า (function-scoped) ไม่แนะนำ

const isCat = true        // boolean
const price = 19.99       // number (int/float เป็นตัวเดียวกัน)
const big = 10n           // bigint
const nothing = null      // ตั้งใจว่าง
let notSet                // undefined
const id = Symbol('id')   // symbol

console.log(typeof age)   // 'number'
const msg = \`Hi \${name}, age \${age}\`  // template literal`),
    code('เงื่อนไข & loop', 'js', `if (age >= 18) {
  console.log('adult')
} else if (age > 1) {
  console.log('young')
} else {
  console.log('baby')
}
const label = age > 2 ? 'adult' : 'kitten'

switch (day) {
  case 'sat':
  case 'sun': console.log('weekend'); break
  default: console.log('weekday')
}

for (let i = 0; i < 3; i++) console.log(i)
for (const fruit of ['🍎', '🍌']) console.log(fruit)  // ค่า
for (const key in { a: 1, b: 2 }) console.log(key)  // key
while (age < 5) age++`),
    code('ฟังก์ชัน & syntax เด็ดๆ', 'js', `function add(a, b = 0) { return a + b }
const mul = (a, b) => a * b               // arrow function
const sum = (...nums) => nums.reduce((s, n) => s + n, 0)

// destructuring
const { title, price = 0 } = { title: 'Pen' }
const [first, ...rest] = [1, 2, 3]

// spread: copy + แก้บาง field
const user = { name: 'Tama', age: 2 }
const older = { ...user, age: 3 }

// optional chaining + nullish coalescing
const city = user?.address?.city ?? 'unknown'`),
    code('Class', 'js', `class Animal {
  #secret = 'shh'                  // private field
  constructor(name) { this.name = name }
  speak() { return \`\${this.name} makes a sound\` }
  static create(name) { return new Animal(name) }
}

class Cat extends Animal {
  speak() { return \`\${this.name} says meow 🐱\` }
}

console.log(new Cat('Tama').speak())`),
    code('Collections: Array / Object / Map / Set', 'js', `const arr = [1, 2, 3]
arr.push(4)                 // [1, 2, 3, 4]
console.log(arr.length, arr.at(-1))  // 4 4

const obj = { a: 1, b: 2 }
Object.keys(obj)            // ['a', 'b']
Object.entries(obj)         // [['a', 1], ['b', 2]]

const map = new Map([['x', 1]])  // key เป็นอะไรก็ได้
map.set('y', 2)
map.get('x')                // 1
map.has('z')                // false

const set = new Set([1, 1, 2])   // {1, 2}
const uniq = [...set]            // [1, 2]`),
    code('Error handling', 'js', `try {
  JSON.parse('{bad json}')
} catch (err) {
  console.error('parse ไม่ได้:', err.message)
} finally {
  console.log('จบแล้ว')
}

class NotFoundError extends Error {
  constructor(msg) { super(msg); this.name = 'NotFoundError' }
}
throw new NotFoundError('user not found')`),
    code('Async / await', 'js', `async function getUser(id) {
  const res = await fetch(\`https://api.example.com/users/\${id}\`)
  if (!res.ok) throw new Error(\`HTTP \${res.status}\`)
  return res.json()
}

// รันพร้อมกัน รอให้ครบทุกตัว
const [a, b] = await Promise.all([getUser(1), getUser(2)])

// ไม่อยากให้ตัวเดียวพังแล้วพังหมด
const results = await Promise.allSettled([getUser(1), getUser(99)])

setTimeout(() => console.log('1 วิผ่านไป'), 1000)`, '`await` ระดับบนสุด (top-level) ใช้ได้เฉพาะใน ES module'),
    table('Array methods ใช้บ่อย', ['method', 'ทำอะไร', 'ตัวอย่าง'], [
      ['`map`', 'แปลงทุกตัว → array ใหม่', '`[1,2].map(n => n * 2)` → `[2,4]`'],
      ['`filter`', 'เก็บเฉพาะที่ผ่านเงื่อนไข', '`[1,2,3].filter(n => n > 1)` → `[2,3]`'],
      ['`reduce`', 'ยุบรวมเป็นค่าเดียว', '`[1,2,3].reduce((s, n) => s + n, 0)` → `6`'],
      ['`find` / `findIndex`', 'หาตัวแรกที่ตรง', '`users.find(u => u.id === 2)`'],
      ['`some` / `every`', 'มีสักตัว / ทุกตัวตรงไหม', '`[1,2].some(n => n > 1)` → `true`'],
      ['`includes`', 'มีค่านี้ไหม', '`[1,2].includes(2)` → `true`'],
      ['`sort` / `toSorted`', 'เรียง (sort แก้ของเดิม)', '`arr.toSorted((a, b) => a - b)`'],
      ['`slice` / `splice`', 'ตัดสำเนา / ลบ-แทรกของเดิม', '`arr.slice(0, 2)`'],
      ['`flat` / `flatMap`', 'แผ่ array ซ้อน', '`[[1],[2]].flat()` → `[1,2]`'],
      ['`join`', 'ต่อเป็น string', "`['a','b'].join('-')` → `'a-b'`"],
      ['`forEach`', 'วนทำบางอย่าง (ไม่คืนค่า)', '`arr.forEach(x => console.log(x))`'],
    ]),
    table('String & อื่นๆ ใช้บ่อย', ['method', 'ตัวอย่าง'], [
      ['`split` / `trim`', "`' a,b '.trim().split(',')` → `['a','b']`"],
      ['`includes` / `startsWith`', "`'hello'.startsWith('he')` → `true`"],
      ['`replaceAll`', "`'a-b-c'.replaceAll('-', '/')`"],
      ['`padStart`', "`'7'.padStart(3, '0')` → `'007'`"],
      ['`toUpperCase` / `slice`', "`'mochi'.slice(0, 1).toUpperCase()` → `'M'`"],
      ['`JSON.stringify` / `parse`', 'แปลง object ↔ string'],
      ['`Object.fromEntries`', 'array ของ [key, value] → object'],
      ['`structuredClone`', 'deep copy object'],
    ]),
    code('Mini example: สรุปตะกร้าสินค้า 🛒', 'js', `const cart = [
  { name: 'Apple', price: 20, qty: 3 },
  { name: 'Milk', price: 45, qty: 1 },
  { name: 'Bread', price: 35, qty: 0 },
]

const items = cart.filter(i => i.qty > 0)
const total = items.reduce((sum, i) => sum + i.price * i.qty, 0)
const lines = items.map(i => \`\${i.name} x\${i.qty} = \${i.price * i.qty}\`)

console.log(lines.join('\\n'))
console.log('Total:', total)
// Apple x3 = 60
// Milk x1 = 45
// Total: 105`),
    code('Package manager & tooling', 'bash', `npm init -y               # สร้าง package.json
npm install axios         # dependency
npm install -D vitest     # devDependency
npm run dev               # รัน script ใน package.json
npx prettier --write .    # รัน tool โดยไม่ต้องลง global
npm ci                    # ลงตาม lock file เป๊ะ (ใช้ใน CI)`, 'ทางเลือกอื่น: pnpm (ประหยัดดิสก์), yarn, bun'),
    list('Tooling ที่เจอบ่อย', [
      '**Vite** — dev server + bundler เร็วมาก',
      '**ESLint** + **Prettier** — lint + จัด format',
      '**Vitest / Jest** — unit test',
      '**nvm / fnm** — สลับเวอร์ชัน Node',
    ]),
    warn('`==` แปลง type ก่อนเทียบ: `0 == \'\'` → `true`, `null == undefined` → `true` 😵 ใช้ **`===`** เสมอ!'),
    warn('`[10, 1, 2].sort()` → `[1, 10, 2]` เพราะเรียงแบบ string! ต้องใช้ `sort((a, b) => a - b)`\n\nอีกอันคลาสสิก: `0.1 + 0.2 === 0.3` → `false` (floating point) และ `typeof null` → `\'object\'`'),
    tip('`const` ห้าม reassign แต่ **แก้ข้างใน object/array ได้** นะ ถ้าอยากล็อกจริงใช้ `Object.freeze()`\n\nและ arrow function ไม่มี `this` ของตัวเอง (ใช้ของข้างนอก) เหมาะกับ callback มาก'),
    pairs(['React', 'Vue', 'Svelte', 'Next.js', 'Node.js', 'Express', 'NestJS', 'Vite', 'Vitest', 'Electron']),
  ],
}

/* ───────────────────────── 3. TypeScript ───────────────────────── */
const typescript = {
  id: 'typescript',
  title: 'TypeScript',
  emoji: '🔷',
  summary: 'JavaScript + ระบบ type ช่วยจับบั๊กตั้งแต่ตอนเขียน',
  tags: ['ts', 'typescript', 'types', 'generics', 'javascript', 'tsc', 'web'],
  sections: [
    text('คืออะไร ใช้ที่ไหน', 'TypeScript (จาก Microsoft) คือ **superset ของ JavaScript** = JS ที่เพิ่ม type เข้าไป โค้ด JS ทุกอันคือ TS ที่ถูกต้อง 💙\n\nใช้ได้ทุกที่ที่ JS ไปได้: React, Vue, Angular, Node.js, Deno, Bun ปัจจุบันโปรเจกต์ใหม่แทบทั้งหมดใช้ TS'),
    list('รันยังไง', [
      '`tsc` (TypeScript compiler) **เช็ก type** แล้ว **แปลงเป็น .js** — type จะถูกลบทิ้งหมด (type erasure)',
      'ตอนรันจริงก็คือ JS ธรรมดา → **type ไม่มีผลตอน runtime**',
      'Deno, Bun และ Node.js รุ่นใหม่ (v23.6+) รัน `.ts` ได้ตรงๆ (แค่ตัด type ทิ้ง ไม่เช็กให้)',
      'Vite / esbuild / tsx แปลงเร็วมาก แต่ไม่เช็ก type → ใช้ `tsc --noEmit` เช็กแยก',
    ]),
    code('ติดตั้ง & Hello World', 'bash', `npm install -D typescript tsx
npx tsc --init              # สร้าง tsconfig.json

# hello.ts
echo "const msg: string = 'Hello, world!'; console.log(msg)" > hello.ts

npx tsc hello.ts && node hello.js   # compile แล้วรัน
npx tsx hello.ts                    # หรือรันตรงๆ เลย`),
    code('Type พื้นฐาน', 'ts', `let count: number = 0
const name: string = 'Mochi'
const done: boolean = false
const tags: string[] = ['cute', 'cat']
const pair: [string, number] = ['age', 3]   // tuple

let id: string | number = 42                // union
type Status = 'idle' | 'loading' | 'done'   // literal union
let s: Status = 'idle'

let data: unknown = JSON.parse('{}')        // ปลอดภัยกว่า any
let whatever: any = 1                       // ปิดการเช็ก 😱 เลี่ยงนะ

let age = 3   // ไม่ต้องใส่ type ก็ได้ TS เดาให้ (inference)`),
    code('interface & type', 'ts', `interface User {
  id: number
  name: string
  email?: string             // optional
  readonly createdAt: Date   // แก้ไม่ได้
}

type Point = { x: number; y: number }
type Admin = User & { role: 'admin' }   // intersection

const u: User = { id: 1, name: 'Tama', createdAt: new Date() }`, 'interface ขยาย (extends / merge) ได้ ส่วน type ทำ union ได้ ใช้แทนกันได้เกือบหมด'),
    code('ฟังก์ชัน & Generics', 'ts', `function add(a: number, b: number): number {
  return a + b
}
const greet = (name: string, emoji = '🐱'): string => \`\${emoji} Hi \${name}\`

function log(msg: string, level?: 'info' | 'warn'): void {
  console.log(level ?? 'info', msg)
}

// generic = type เป็นพารามิเตอร์
function first<T>(items: T[]): T | undefined {
  return items[0]
}
const n = first([1, 2, 3])        // number | undefined
const w = first(['a', 'b'])       // string | undefined`),
    code('Narrowing (ทำให้ type แคบลง)', 'ts', `function format(v: string | number) {
  if (typeof v === 'string') return v.toUpperCase() // ตรงนี้ v เป็น string
  return v.toFixed(2)                               // ตรงนี้เป็น number
}

type Shape =
  | { kind: 'circle'; r: number }
  | { kind: 'square'; size: number }

function area(s: Shape): number {
  switch (s.kind) {               // discriminated union
    case 'circle': return Math.PI * s.r ** 2
    case 'square': return s.size ** 2
  }
}`),
    code('Class', 'ts', `class Account {
  private balance = 0
  constructor(public readonly owner: string) {}  // ประกาศ field ใน constructor

  deposit(amount: number): void {
    if (amount <= 0) throw new Error('amount must be positive')
    this.balance += amount
  }
  get total(): number { return this.balance }
}

interface Repo<T> {
  findById(id: number): Promise<T | null>
}`),
    table('Utility types ใช้บ่อย', ['type', 'ทำอะไร'], [
      ['`Partial<T>`', 'ทุก field เป็น optional (เหมาะกับ update)'],
      ['`Required<T>`', 'ทุก field บังคับ'],
      ['`Pick<T, \'a\' | \'b\'>`', 'เลือกบาง field'],
      ['`Omit<T, \'password\'>`', 'ตัดบาง field ออก'],
      ['`Record<K, V>`', 'object ที่ key เป็น K ค่าเป็น V'],
      ['`Readonly<T>`', 'ห้ามแก้ทุก field'],
      ['`ReturnType<typeof fn>`', 'type ที่ฟังก์ชันคืน'],
      ['`Awaited<T>`', 'แกะ Promise ออก'],
      ['`keyof T`', "union ของ key เช่น `'id' | 'name'`"],
      ['`as const`', 'ล็อกค่าเป็น literal + readonly'],
      ['`satisfies`', 'เช็กว่าตรง type แต่ยังเก็บ type ที่แคบไว้'],
    ]),
    code('Mini example: fetch แบบมี type 📋', 'ts', `interface Todo { id: number; title: string; completed: boolean }

async function getTodos(): Promise<Todo[]> {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos')
  if (!res.ok) throw new Error(\`HTTP \${res.status}\`)
  return (await res.json()) as Todo[]
}

const todos = await getTodos()
const pending = todos.filter(t => !t.completed).map(t => t.title)

const stats: Record<'done' | 'todo', number> = {
  done: todos.length - pending.length,
  todo: pending.length,
}
console.log(stats)`),
    code('tsconfig.json ที่แนะนำ', 'json', `{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "skipLibCheck": true,
    "outDir": "dist"
  },
  "include": ["src"]
}`, 'เปิด `strict: true` เสมอ ไม่งั้นเสียของ'),
    list('Package & tooling', [
      'ใช้ **npm / pnpm / yarn** เหมือน JS เลย',
      'type ของ library เก่า: `npm i -D @types/node @types/express`',
      '**tsc --noEmit** — เช็ก type อย่างเดียว (ใส่ใน CI)',
      '**tsx** — รัน .ts ใน Node แบบไว / **typescript-eslint** — lint',
      '**Zod / Valibot** — validate ข้อมูลตอน runtime + ได้ type ด้วย',
    ]),
    warn('type **หายไปตอน runtime**! `res.json() as Todo[]` แค่บอก compiler ว่า "เชื่อฉัน" ไม่ได้เช็กข้อมูลจริง ถ้า API ส่งข้อมูลมาผิด ก็พังอยู่ดี → ข้อมูลจากภายนอกใช้ **Zod** validate นะ'),
    warn('`any` ติดต่อกันได้เหมือนไวรัส 🦠 ใช้ `unknown` แล้ว narrow แทน และเลี่ยง `enum` (สร้างโค้ด runtime เพิ่ม) ใช้ union literal `\'a\' | \'b\'` แทนได้'),
    tip('ไม่ต้องใส่ type ทุกที่! ปล่อยให้ TS เดา (inference) แล้วใส่เฉพาะ **parameter ของฟังก์ชัน** กับ **ค่าที่ export** ก็พอ อ่านง่ายขึ้นเยอะ'),
    pairs(['Angular', 'React', 'Next.js', 'NestJS', 'Vue', 'Zod', 'tRPC', 'Prisma', 'Drizzle', 'Deno', 'Bun']),
  ],
}

/* ───────────────────────── 4. Python ───────────────────────── */
const python = {
  id: 'python',
  title: 'Python',
  emoji: '🐍',
  summary: 'อ่านง่ายเหมือนภาษาคน ครองวงการ data, AI และ scripting',
  tags: ['python', 'py', 'data', 'ai', 'script', 'pip', 'backend', 'asyncio'],
  sections: [
    text('คืออะไร ใช้ที่ไหน', 'ภาษา dynamic ที่เน้น **อ่านง่าย** ใช้การย่อหน้า (indent) แทน `{}` 🐍\n\nใช้ทำ data analysis, AI/ML (PyTorch, scikit-learn), automation script, backend (Django, FastAPI) และเป็นภาษาแรกยอดฮิตของมือใหม่'),
    list('รันยังไง', [
      '**CPython** (ตัวหลัก) compile โค้ดเป็น **bytecode** (`.pyc`) แล้วให้ Python VM รันทีละคำสั่ง',
      'มี **GIL** ทำให้ thread รันโค้ด Python ได้ทีละตัว → งาน CPU หนักใช้ `multiprocessing` แทน (3.13+ มีโหมด free-threaded ทดลอง)',
      'ทางเลือก: **PyPy** (มี JIT เร็วกว่า), ส่วน library หนักๆ อย่าง NumPy เขียนด้วย C อยู่ข้างใน',
    ]),
    code('ติดตั้ง & Hello World', 'bash', `# ติดตั้งจาก python.org / winget install Python.Python.3.13 / brew install python
python --version            # Windows อาจใช้ py แทน

# hello.py มีบรรทัดเดียว: print("Hello, world!")
python hello.py

# สร้าง virtual environment (แยก package ต่อโปรเจกต์)
python -m venv .venv
.venv\\Scripts\\activate       # Windows
source .venv/bin/activate    # macOS / Linux`),
    code('ตัวแปร & type', 'python', `name = "Mochi"          # str
age = 3                 # int (ใหญ่แค่ไหนก็ได้)
height = 25.5           # float
is_cat = True           # bool (ตัวพิมพ์ใหญ่!)
nothing = None

age: int = 3            # type hint (ไม่บังคับตอนรัน)
msg = f"{name} อายุ {age} ปี"   # f-string
print(type(age))        # <class 'int'>

x, y = 1, 2             # unpack
x, y = y, x             # swap ง่ายมาก
print(7 / 2, 7 // 2, 7 % 2, 2 ** 3)  # 3.5 3 1 8`),
    code('เงื่อนไข & loop', 'python', `if age >= 18:
    print("adult")
elif age > 1:
    print("young")
else:
    print("baby")

label = "adult" if age > 2 else "kitten"

for i in range(3):                     # 0, 1, 2
    print(i)
for i, fruit in enumerate(["🍎", "🍌"]):
    print(i, fruit)
while age < 5:
    age += 1

match command:                         # Python 3.10+
    case "start": print("go!")
    case "stop" | "quit": print("bye")
    case _: print("unknown")`),
    code('ฟังก์ชัน', 'python', `def add(a: int, b: int = 0) -> int:
    return a + b

def total(*nums, **opts):       # args แบบไม่จำกัด
    print(opts)                 # {'unit': 'baht'}
    return sum(nums)

total(1, 2, 3, unit="baht")     # 6
add(b=2, a=1)                   # keyword arguments
square = lambda x: x * x        # ฟังก์ชันสั้นๆ

def greet(name: str, *, emoji: str = "🐱") -> str:
    return f"{emoji} Hi {name}"  # หลัง * ต้องส่งแบบ keyword`),
    code('Class & dataclass', 'python', `from dataclasses import dataclass

class Animal:
    def __init__(self, name):
        self.name = name
    def speak(self):
        return f"{self.name} makes a sound"
    def __repr__(self):
        return f"Animal({self.name!r})"

class Cat(Animal):
    def speak(self):
        return f"{self.name} says meow 🐱"

@dataclass
class Point:               # สร้าง __init__ / __repr__ / __eq__ ให้
    x: float
    y: float = 0.0

print(Cat("Tama").speak(), Point(1, 2))`),
    code('Collections: list / tuple / dict / set', 'python', `nums = [3, 1, 2]                 # list (แก้ได้)
nums.append(4)
nums.sort()                      # [1, 2, 3, 4]
print(nums[-1], nums[1:3])       # 4 [2, 3]  (index ติดลบ + slicing)

point = (1, 2)                   # tuple (แก้ไม่ได้)
user = {"name": "Mochi", "age": 3}   # dict
print(user.get("email", "-"))   # ไม่มี key ก็ไม่ error
tags = {"cute", "cat"}           # set (ไม่ซ้ำ)

# comprehension สุดเท่ ✨
squares = [n * n for n in nums if n % 2 == 0]   # [4, 16]
lengths = {w: len(w) for w in ["a", "bb"]}      # {'a': 1, 'bb': 2}`),
    code('Error handling', 'python', `try:
    value = int("abc")
except ValueError as e:
    print("แปลงไม่ได้:", e)
except (KeyError, TypeError):
    pass
else:
    print("สำเร็จ")             # รันเมื่อไม่มี error
finally:
    print("จบ")

# with = ปิดไฟล์ให้อัตโนมัติ
with open("data.txt", encoding="utf-8") as f:
    text = f.read()

def set_age(age: int):
    if age < 0:
        raise ValueError("age must be >= 0")`),
    code('Async (asyncio)', 'python', `import asyncio

async def fetch(n: int) -> int:
    await asyncio.sleep(1)       # จำลองรอ network
    return n * 2

async def main():
    results = await asyncio.gather(fetch(1), fetch(2), fetch(3))
    print(results)               # [2, 4, 6] ใช้เวลาแค่ ~1 วิ

asyncio.run(main())`, 'งาน I/O เยอะๆ ใช้ asyncio / thread ได้ ส่วนงาน CPU หนักใช้ multiprocessing'),
    table('Built-in & methods ใช้บ่อย', ['ของ', 'ตัวอย่าง'], [
      ['**list**', '`append`, `extend`, `insert(i, x)`, `pop()`, `remove(x)`, `sort(key=...)`, `index`, `count`'],
      ['**dict**', '`get(k, default)`, `keys()`, `values()`, `items()`, `update`, `pop`, `setdefault`'],
      ['**str**', '`split`, `"-".join(list)`, `strip`, `replace`, `lower`/`upper`, `startswith`, `find`'],
      ['`len` / `range`', '`len([1,2])` → `2`, `range(0, 10, 2)`'],
      ['`enumerate` / `zip`', '`for a, b in zip(names, ages)`'],
      ['`sorted`', '`sorted(users, key=lambda u: u["age"], reverse=True)`'],
      ['`sum` / `min` / `max`', '`max(nums, default=0)`'],
      ['`any` / `all`', '`any(n > 10 for n in nums)`'],
      ['`map` / `filter`', 'ได้ iterator — มักใช้ comprehension แทน'],
      ['`isinstance`', '`isinstance(x, (int, float))`'],
    ]),
    code('Mini example: นับคำ 📚', 'python', `from collections import Counter

text = "the cat and the dog and the bird"
counts = Counter(text.split())

for word, n in counts.most_common(3):
    print(f"{word:<5} {n}")

# the   3
# and   2
# cat   1`),
    code('pip / uv & tooling', 'bash', `pip install requests
pip freeze > requirements.txt
pip install -r requirements.txt

# uv = ตัวจัดการ package รุ่นใหม่ เร็วมาก ⚡
uv init myapp && cd myapp
uv add fastapi
uv run main.py

pytest            # test
ruff check .      # lint (+ ruff format)
mypy .            # เช็ก type hint`),
    warn('**Mutable default argument** — default ถูกสร้างครั้งเดียวตอนนิยามฟังก์ชัน!\n\n`def add(item, bucket=[])` เรียก 2 ครั้งได้ `[1, 2]` 😱\n\nแก้: `def add(item, bucket=None):` แล้วใน body `if bucket is None: bucket = []`'),
    warn('`b = a` ไม่ได้ copy list แค่ชี้ที่เดียวกัน ใช้ `a.copy()` หรือ `copy.deepcopy(a)`\n\nและ `[[0] * 3] * 3` ได้ 3 แถวที่เป็นตัวเดียวกัน! ใช้ `[[0] * 3 for _ in range(3)]`'),
    tip('`is` ใช้เทียบกับ `None` เท่านั้น (`x is None`) ค่าอื่นใช้ `==` ✨ และย่อหน้าใช้ **4 spaces** อย่าผสม tab นะ'),
    pairs(['Django', 'FastAPI', 'Flask', 'pandas', 'NumPy', 'Jupyter', 'PyTorch', 'scikit-learn', 'SQLAlchemy', 'pytest']),
  ],
}

/* ───────────────────────── 5. Java ───────────────────────── */
const java = {
  id: 'java',
  title: 'Java',
  emoji: '☕',
  summary: 'ภาษา OOP สาย enterprise เขียนครั้งเดียวรันได้ทุกที่ที่มี JVM',
  tags: ['java', 'jvm', 'oop', 'spring', 'maven', 'gradle', 'backend', 'enterprise'],
  sections: [
    text('คืออะไร ใช้ที่ไหน', 'ภาษา static typing สาย OOP เต็มตัว ☕ เสถียร ecosystem ใหญ่มาก\n\nใช้ทำ backend องค์กร/ธนาคาร (Spring Boot), big data (Kafka, Spark), Android รุ่นเก่า เวอร์ชัน **LTS** ที่ใช้กันคือ 17, 21, 25'),
    list('รันยังไง', [
      '`javac` compile `.java` → **bytecode** (`.class`)',
      '**JVM** โหลด bytecode มารัน + **JIT (HotSpot)** แปลงส่วนที่ใช้บ่อยเป็น machine code',
      'ได้ "Write once, run anywhere" — มี JVM ที่ไหนก็รันได้',
      'มี GC จัดการ memory ให้ / GraalVM ทำ native image (start เร็ว) ได้',
    ]),
    code('Hello.java', 'java', `public class Hello {
    public static void main(String[] args) {
        System.out.println("Hello, world!");
    }
}`),
    code('ติดตั้ง & รัน', 'bash', `# ติดตั้ง JDK (เช่น Eclipse Temurin) หรือใช้ SDKMAN: sdk install java
java -version

javac Hello.java      # ได้ Hello.class
java Hello            # รัน

java Hello.java       # Java 11+ รันไฟล์เดียวได้เลยไม่ต้อง javac`),
    code('ตัวแปร & type', 'java', `int age = 3;                    // primitive
double price = 19.99;
boolean isCat = true;
char grade = 'A';
long big = 10_000_000_000L;

String name = "Mochi";          // reference type
var city = "Bangkok";           // Java 10+ ให้เดา type
final int MAX = 10;             // ค่าคงที่
Integer boxed = null;           // wrapper class (ใส่ null ได้)

String msg = "Hi %s, age %d".formatted(name, age);
String block = """
    text block หลายบรรทัด
    Java 15+
    """;`),
    code('เงื่อนไข & loop', 'java', `if (age >= 18) {
    System.out.println("adult");
} else if (age > 1) {
    System.out.println("young");
} else {
    System.out.println("baby");
}
String label = age > 2 ? "adult" : "kitten";

String type = switch (day) {        // switch expression (Java 14+)
    case "SAT", "SUN" -> "weekend";
    default -> "weekday";
};

for (int i = 0; i < 3; i++) { System.out.println(i); }
for (String n : names) { System.out.println(n); }
while (age < 5) { age++; }`),
    code('Class / interface / record', 'java', `public class Animal {
    private final String name;
    public Animal(String name) { this.name = name; }
    public String getName() { return name; }
    public String speak() { return name + " makes a sound"; }
}

class Cat extends Animal {
    public Cat(String name) { super(name); }
    @Override
    public String speak() { return getName() + " says meow"; }
}

interface Greeter { String greet(String who); }

record Point(int x, int y) {}   // Java 16+ data class (immutable)`),
    code('Collections', 'java', `import java.util.*;

List<String> names = new ArrayList<>(List.of("Tama", "Mochi"));
names.add("Kuro");
names.get(0);  names.size();  names.contains("Kuro");

Map<String, Integer> ages = new HashMap<>();
ages.put("Tama", 3);
int kuro = ages.getOrDefault("Kuro", 0);
for (var e : ages.entrySet()) {
    System.out.println(e.getKey() + "=" + e.getValue());
}

Set<Integer> ids = new HashSet<>(Set.of(1, 2));
int[] arr = {3, 1, 2};
Arrays.sort(arr);`),
    code('Stream API (map/filter สไตล์ Java)', 'java', `List<Integer> nums = List.of(1, 2, 3, 4, 5);

List<Integer> evenSquares = nums.stream()
    .filter(n -> n % 2 == 0)
    .map(n -> n * n)
    .toList();                       // [4, 16]

int sum = nums.stream().mapToInt(Integer::intValue).sum();  // 15

Optional<String> m = names.stream()
    .filter(n -> n.startsWith("M"))
    .findFirst();
System.out.println(m.orElse("none"));`),
    code('Error handling', 'java', `try {
    int n = Integer.parseInt("abc");
} catch (NumberFormatException e) {
    System.out.println("แปลงไม่ได้: " + e.getMessage());
} finally {
    System.out.println("จบ");
}

// try-with-resources ปิดให้อัตโนมัติ
try (var reader = Files.newBufferedReader(Path.of("data.txt"))) {
    System.out.println(reader.readLine());
} catch (IOException e) {
    e.printStackTrace();
}

// checked exception ต้อง catch หรือประกาศ throws
void load() throws IOException { /* ... */ }`),
    code('Concurrency (virtual threads, Java 21+)', 'java', `try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
    List<Future<String>> futures = new ArrayList<>();
    for (int i = 1; i <= 3; i++) {
        int id = i;
        futures.add(executor.submit(() -> "task " + id + " done"));
    }
    for (var f : futures) System.out.println(f.get());
}

CompletableFuture.supplyAsync(() -> "hi")
    .thenApply(String::toUpperCase)
    .thenAccept(System.out::println);   // HI`),
    table('Methods ใช้บ่อย', ['ของ', 'methods'], [
      ['**String**', '`length()`, `charAt`, `substring`, `contains`, `equals`, `split`, `strip`, `isBlank`, `toUpperCase`, `replace`'],
      ['**List**', '`add`, `get`, `set`, `remove`, `size`, `contains`, `indexOf`, `sort`, `List.of(...)`'],
      ['**Map**', '`put`, `get`, `getOrDefault`, `containsKey`, `putIfAbsent`, `merge`, `entrySet`'],
      ['**Stream**', '`filter`, `map`, `sorted`, `distinct`, `limit`, `toList`, `collect(Collectors.groupingBy(...))`, `anyMatch`, `reduce`'],
      ['**Optional**', '`orElse`, `orElseThrow`, `map`, `ifPresent`'],
      ['**อื่นๆ**', '`String.join`, `Arrays.asList`, `Collections.sort`, `Math.max`, `Objects.equals`'],
    ]),
    code('Mini example: รายงานคะแนน 🎓', 'java', `import java.util.*;

record Student(String name, int score) {}

public class Report {
    public static void main(String[] args) {
        List<Student> students = List.of(
            new Student("Tama", 85),
            new Student("Mochi", 92),
            new Student("Kuro", 58));

        double avg = students.stream()
            .mapToInt(Student::score).average().orElse(0);
        List<String> passed = students.stream()
            .filter(s -> s.score() >= 60)
            .sorted(Comparator.comparingInt(Student::score).reversed())
            .map(Student::name)
            .toList();

        System.out.printf("avg=%.1f passed=%s%n", avg, passed);
        // avg=78.3 passed=[Mochi, Tama]
    }
}`),
    code('Build tool: Maven / Gradle', 'bash', `mvn clean package        # build เป็น .jar ใน target/
mvn test
java -jar target/app.jar

./gradlew build          # Gradle (ใช้ wrapper ของโปรเจกต์)
./gradlew test`),
    code('เพิ่ม dependency (Gradle Kotlin DSL)', 'kotlin', `// build.gradle.kts
dependencies {
    implementation("com.google.code.gson:gson:2.11.0")
    testImplementation("org.junit.jupiter:junit-jupiter:5.11.0")
}`, 'Maven ใส่ใน pom.xml เป็น <dependency> groupId / artifactId / version แทน'),
    warn('เทียบ String ใช้ **`.equals()`** ไม่ใช่ `==` (`==` เทียบว่าเป็น object เดียวกันไหม)\n\nเช่นเดียวกับ `Integer`: `Integer a = 128, b = 128;` → `a == b` เป็น `false` 😵'),
    warn('`List.of(...)` แก้ไม่ได้ เรียก `add` จะได้ `UnsupportedOperationException` ถ้าจะแก้ให้ห่อด้วย `new ArrayList<>(...)` และระวัง **NullPointerException** ใช้ `Optional` ช่วย'),
    tip('Java 25 เขียนสั้นลงได้แล้วนะ: ไฟล์เดียวมีแค่ `void main() { IO.println("Hi"); }` ก็รันได้ (compact source file) เหมาะกับฝึกเขียน 🐣'),
    pairs(['Spring Boot', 'Hibernate / JPA', 'Maven', 'Gradle', 'JUnit', 'Lombok', 'Kafka', 'Quarkus', 'IntelliJ IDEA']),
  ],
}

/* ───────────────────────── 6. C# ───────────────────────── */
const csharp = {
  id: 'csharp',
  title: 'C#',
  emoji: '🟪',
  summary: 'ภาษาหลักของ .NET ทำได้ทั้ง backend, desktop และเกม Unity',
  tags: ['csharp', 'c#', 'dotnet', '.net', 'linq', 'unity', 'aspnet', 'backend'],
  sections: [
    text('คืออะไร ใช้ที่ไหน', 'ภาษา static typing จาก Microsoft คล้าย Java แต่มีของเล่นสะดวกเยอะกว่า (LINQ, async/await, property, record) 💜\n\nใช้ทำ web API (ASP.NET Core), desktop (WPF, MAUI), เกม (**Unity**), cloud (Azure) รันได้ทั้ง Windows, macOS, Linux'),
    list('รันยังไง', [
      'compile เป็น **IL** (Intermediate Language) อยู่ในไฟล์ `.dll`',
      '**CLR** (runtime ของ .NET) รัน IL ด้วย **JIT** + มี GC',
      'ทำ **Native AOT** ได้ → binary เดี่ยว start เร็ว',
      '.NET LTS ล่าสุด: .NET 8, .NET 10',
    ]),
    code('ติดตั้ง & Hello World', 'bash', `# ติดตั้ง .NET SDK จาก dot.net หรือ winget install Microsoft.DotNet.SDK.10
dotnet --version

dotnet new console -n HelloApp
cd HelloApp
dotnet run
# Program.cs มีบรรทัดเดียว: Console.WriteLine("Hello, world!");`, 'C# 9+ เขียนแบบ top-level statements ไม่ต้องมี class Program / Main แล้ว'),
    code('ตัวแปร & type', 'csharp', `int age = 3;
double ratio = 0.75;
decimal money = 19.99m;       // เงินใช้ decimal!
bool isCat = true;
char grade = 'A';
string name = "Mochi";
var city = "Bangkok";         // ให้เดา type
const int Max = 10;

int? maybe = null;            // nullable value type
string? nick = null;          // nullable reference
int len = nick?.Length ?? 0;

string msg = $"Hi {name}, age {age}";   // interpolation`),
    code('เงื่อนไข & loop', 'csharp', `if (age >= 18) Console.WriteLine("adult");
else if (age > 1) Console.WriteLine("young");
else Console.WriteLine("baby");

string label = age > 2 ? "adult" : "kitten";

string type = day switch          // switch expression
{
    "Sat" or "Sun" => "weekend",
    _ => "weekday"
};

for (int i = 0; i < 3; i++) Console.WriteLine(i);
foreach (var n in names) Console.WriteLine(n);
while (age < 5) age++;`),
    code('Class / record / interface', 'csharp', `public class Animal
{
    public string Name { get; }                 // property
    public Animal(string name) => Name = name;
    public virtual string Speak() => $"{Name} makes a sound";
}

public class Cat : Animal
{
    public Cat(string name) : base(name) { }
    public override string Speak() => $"{Name} says meow";
}

public record Point(int X, int Y);   // immutable + เทียบค่าได้
public interface IGreeter { string Greet(string who); }`),
    code('Collections & LINQ', 'csharp', `var names = new List<string> { "Tama", "Mochi" };
names.Add("Kuro");

var ages = new Dictionary<string, int> { ["Tama"] = 3 };
ages["Mochi"] = 2;
if (ages.TryGetValue("Kuro", out var a)) Console.WriteLine(a);

int[] nums = [1, 2, 3, 4, 5];       // collection expression (C# 12)
var evenSquares = nums
    .Where(n => n % 2 == 0)
    .Select(n => n * n)
    .ToList();                      // [4, 16]
var total = nums.Sum();             // 15
var m = names.FirstOrDefault(n => n.StartsWith("M"));`),
    code('Error handling', 'csharp', `try
{
    int n = int.Parse("abc");
}
catch (FormatException ex)
{
    Console.WriteLine($"แปลงไม่ได้: {ex.Message}");
}
finally
{
    Console.WriteLine("จบ");
}

if (int.TryParse("42", out var value)) Console.WriteLine(value);

using var file = File.OpenText("data.txt");   // Dispose ให้อัตโนมัติ
if (age < 0) throw new ArgumentException("age must be >= 0");`),
    code('async / await', 'csharp', `using var http = new HttpClient();

async Task<string> GetAsync(string url)
{
    var res = await http.GetAsync(url);
    res.EnsureSuccessStatusCode();
    return await res.Content.ReadAsStringAsync();
}

// ยิงพร้อมกัน รอให้ครบ
string[] pages = await Task.WhenAll(
    GetAsync("https://example.com"),
    GetAsync("https://example.org"));
Console.WriteLine(pages.Length);   // 2`),
    table('LINQ & methods ใช้บ่อย', ['method', 'ทำอะไร'], [
      ['`Where`', 'กรอง (เหมือน filter)'],
      ['`Select`', 'แปลง (เหมือน map)'],
      ['`OrderBy` / `OrderByDescending`', 'เรียง'],
      ['`GroupBy`', 'จัดกลุ่ม'],
      ['`First` / `FirstOrDefault`', 'ตัวแรก (ไม่เจอ: throw / ได้ default)'],
      ['`Any` / `All` / `Count`', 'เช็ก / นับ'],
      ['`Sum` / `Average` / `Max`', 'คำนวณ'],
      ['`ToList` / `ToDictionary`', 'แปลงเป็น collection'],
      ['**string**', '`Split`, `Trim`, `Contains`, `Replace`, `ToUpper`, `string.Join`, `string.IsNullOrWhiteSpace`'],
    ]),
    code('Mini example: สรุปยอดสั่งซื้อ 🧾', 'csharp', `var orders = new[]
{
    new Order("Tama", 120m),
    new Order("Mochi", 80m),
    new Order("Tama", 45m),
};

var summary = orders
    .GroupBy(o => o.Customer)
    .Select(g => new { Customer = g.Key, Total = g.Sum(o => o.Amount) })
    .OrderByDescending(x => x.Total);

foreach (var s in summary)
    Console.WriteLine($"{s.Customer}: {s.Total:0.00}");
// Tama: 165.00
// Mochi: 80.00

record Order(string Customer, decimal Amount);`),
    code('NuGet & dotnet CLI', 'bash', `dotnet add package Newtonsoft.Json   # NuGet package
dotnet build
dotnet test                          # xUnit / NUnit / MSTest
dotnet publish -c Release            # เตรียม deploy
dotnet new webapi -n MyApi           # สร้าง Web API
dotnet watch                         # hot reload`),
    warn('ห้ามใช้ **`.Result`** หรือ **`.Wait()`** กับ Task (เสี่ยง deadlock) ให้ `await` ตลอดสาย และเลี่ยง `async void` (ยกเว้น event handler)'),
    warn('LINQ เป็น **deferred execution** — query ยังไม่รันจนกว่าจะวนหรือเรียก `ToList()` ถ้าวนหลายรอบก็คำนวณซ้ำหลายรอบนะ'),
    tip('เงินใช้ `decimal` เสมอ (`double` ปัดเศษเพี้ยน) และเปิด `<Nullable>enable</Nullable>` ใน .csproj ให้ compiler ช่วยเตือน null 💜'),
    pairs(['ASP.NET Core', 'Entity Framework Core', 'Blazor', '.NET MAUI', 'Unity', 'xUnit', 'Dapper', 'SignalR', 'Rider / Visual Studio']),
  ],
}

/* ───────────────────────── 7. Go ───────────────────────── */
const go = {
  id: 'go',
  title: 'Go',
  emoji: '🐹',
  summary: 'ภาษาเรียบง่าย compile ไว ได้ binary เดี่ยว เก่งเรื่อง concurrency',
  tags: ['go', 'golang', 'goroutine', 'channel', 'backend', 'cloud', 'cli', 'microservice'],
  sections: [
    text('คืออะไร ใช้ที่ไหน', 'ภาษาจาก Google ที่ตั้งใจให้ **เรียบง่าย** keyword น้อย อ่านโค้ดคนอื่นง่าย 🐹\n\nใช้ทำ backend/microservice, CLI tools, งาน cloud & DevOps (Docker, Kubernetes, Terraform เขียนด้วย Go หมดเลย)'),
    list('รันยังไง', [
      'compile → **native binary ไฟล์เดียว** ไม่ต้องลง runtime บนเครื่องปลายทาง',
      'compile เร็วมาก + cross-compile ข้าม OS ได้ง่าย',
      'มี GC และ runtime เล็กๆ ฝังใน binary คอยจัดการ **goroutine** (thread เบาๆ สร้างเป็นแสนตัวได้)',
    ]),
    code('ติดตั้ง & Hello World', 'bash', `# ติดตั้งจาก go.dev/dl หรือ winget install GoLang.Go / brew install go
go version

mkdir hello && cd hello
go mod init example.com/hello   # สร้าง go.mod
# สร้าง main.go (ดูด้านล่าง)
go run .
go build -o hello && ./hello    # ได้ binary`),
    code('main.go', 'go', `package main

import "fmt"

func main() {
	fmt.Println("Hello, world!")
}`),
    code('ตัวแปร & type', 'go', `var name string = "Mochi"
age := 3                  // short declaration (ใช้ในฟังก์ชันเท่านั้น)
const Pi = 3.14
price := 19.99            // float64
x, y := 1, 2

var count int             // zero value = 0
var ok bool               // false
var s string              // ""

p := &age                 // pointer
*p = 4                    // age = 4
msg := fmt.Sprintf("%s is %d", name, age)`, 'ตัวแปรที่ไม่ได้ใช้ = compile error นะ Go เข้มงวดมาก'),
    code('เงื่อนไข & loop', 'go', `if age >= 18 {
	fmt.Println("adult")
} else if age > 1 {
	fmt.Println("young")
}

// if พร้อมประกาศตัวแปร
if n, err := strconv.Atoi("42"); err == nil {
	fmt.Println(n)
}

for i := 0; i < 3; i++ {}              // for แบบปกติ
for i, v := range []string{"a", "b"} {} // range
for count < 5 { count++ }              // แบบ while
for { break }                          // วนไม่สิ้นสุด

switch day {
case "sat", "sun":
	fmt.Println("weekend")             // ไม่ต้อง break
default:
	fmt.Println("weekday")
}`),
    code('ฟังก์ชัน (คืนหลายค่าได้)', 'go', `func add(a, b int) int { return a + b }

func divide(a, b float64) (float64, error) {
	if b == 0 {
		return 0, errors.New("divide by zero")
	}
	return a / b, nil
}

func sum(nums ...int) int {
	total := 0
	for _, n := range nums {
		total += n
	}
	return total
}

double := func(x int) int { return x * 2 }  // closure
defer fmt.Println("รันตอนฟังก์ชันจบ")`),
    code('Struct & interface', 'go', `type Animal struct {
	Name string   // ตัวใหญ่ = public (exported)
	age  int      // ตัวเล็ก = private ใน package
}

func (a Animal) Speak() string { return a.Name + " makes a sound" }
func (a *Animal) Birthday()     { a.age++ }  // pointer receiver แก้ค่าได้

type Speaker interface {
	Speak() string
}

// implement interface อัตโนมัติ ไม่ต้องเขียน implements
func talk(s Speaker) { fmt.Println(s.Speak()) }

cat := Animal{Name: "Tama"}
cat.Birthday()
talk(cat)`),
    code('Slice & map', 'go', `arr := [3]int{1, 2, 3}       // array ขนาดคงที่ (ใช้น้อย)
nums := []int{3, 1, 2}        // slice (ใช้บ่อย)
nums = append(nums, 4)
fmt.Println(len(nums), nums[1:3])
slices.Sort(nums)             // Go 1.21+

ages := map[string]int{"Tama": 3}
ages["Mochi"] = 2
age, ok := ages["Kuro"]       // ok = false ถ้าไม่มี key
delete(ages, "Tama")
for k, v := range ages {
	fmt.Println(k, v)
}
buf := make([]byte, 0, 64)    // make: len 0, cap 64`),
    code('Error handling (ไม่มี try/catch)', 'go', `var ErrNotFound = errors.New("not found")

func loadConfig(path string) ([]byte, error) {
	data, err := os.ReadFile(path)
	if err != nil {
		return nil, fmt.Errorf("load config %s: %w", path, err) // wrap
	}
	return data, nil
}

data, err := loadConfig("app.yaml")
if errors.Is(err, os.ErrNotExist) {
	fmt.Println("ไม่มีไฟล์")
}`, '`panic` / `recover` มีไว้สำหรับเหตุการณ์ร้ายแรงจริงๆ ปกติคืน `error` เสมอ'),
    code('Goroutine & channel', 'go', `func worker(id int, results chan<- string, wg *sync.WaitGroup) {
	defer wg.Done()
	time.Sleep(100 * time.Millisecond)
	results <- fmt.Sprintf("worker %d done", id)
}

func main() {
	results := make(chan string, 3)
	var wg sync.WaitGroup
	for i := 1; i <= 3; i++ {
		wg.Add(1)
		go worker(i, results, &wg)   // go = รันพร้อมกัน
	}
	wg.Wait()
	close(results)
	for r := range results {
		fmt.Println(r)
	}
}`),
    table('Built-in & package ใช้บ่อย', ['ของ', 'ตัวอย่าง'], [
      ['built-in', '`len`, `cap`, `append`, `make`, `delete`, `copy`, `min`, `max`'],
      ['`strings`', '`Split`, `Join`, `Contains`, `TrimSpace`, `ToUpper`, `ReplaceAll`, `HasPrefix`, `Fields`'],
      ['`strconv`', '`Itoa(42)` → `"42"`, `Atoi("42")`, `ParseFloat`'],
      ['`slices` / `maps`', '`slices.Contains`, `slices.Index`, `slices.Sort`, `maps.Keys`'],
      ['`fmt` verbs', '`%v` ค่า, `%+v` struct มีชื่อ field, `%d`, `%s`, `%.2f`, `%T` type'],
      ['อื่นๆ', '`encoding/json`, `net/http`, `os`, `time`, `context`, `errors`'],
    ]),
    code('Mini example: JSON API เล็กๆ 🌐', 'go', `package main

import (
	"encoding/json"
	"log"
	"net/http"
)

type Todo struct {
	ID    int    \`json:"id"\`
	Title string \`json:"title"\`
	Done  bool   \`json:"done"\`
}

func main() {
	todos := []Todo{{1, "Water plants", false}, {2, "Feed cat", true}}

	http.HandleFunc("GET /todos", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(todos)
	})

	log.Println("listening on :8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}`, 'pattern แบบ "GET /todos" ใช้ได้ตั้งแต่ Go 1.22 ไม่ต้องลง router เพิ่ม'),
    code('go mod & tooling', 'bash', `go get github.com/gin-gonic/gin   # เพิ่ม dependency
go mod tidy                        # เก็บกวาด go.mod / go.sum
go fmt ./...                       # จัด format (มาตรฐานเดียวทั้งโลก)
go vet ./...                       # หาโค้ดน่าสงสัย
go test ./...                      # test (ไฟล์ *_test.go)
GOOS=linux GOARCH=amd64 go build   # cross-compile ไป Linux`),
    warn('เขียนลง **nil map** = panic! `var m map[string]int; m["a"] = 1` 💥 ต้อง `m := make(map[string]int)` ก่อน'),
    warn('slice ที่ตัดมาจากกันใช้ array ข้างใต้ร่วมกัน แก้ตัวหนึ่งอีกตัวเปลี่ยนด้วย ถ้าจะแยกให้ `slices.Clone(s)`'),
    tip('`if err != nil` เยอะเป็นเรื่องปกติของ Go นะ 😆 ให้ wrap ด้วย `fmt.Errorf("...: %w", err)` ใส่บริบทไปเรื่อยๆ จะ debug ง่ายมาก'),
    pairs(['Gin', 'Echo', 'Fiber', 'net/http', 'GORM', 'sqlc', 'gRPC', 'Cobra', 'Docker', 'Kubernetes']),
  ],
}

/* ───────────────────────── 8. PHP ───────────────────────── */
const php = {
  id: 'php',
  title: 'PHP',
  emoji: '🐘',
  summary: 'ภาษา backend สายเว็บ ขับเคลื่อน WordPress และ Laravel',
  tags: ['php', 'laravel', 'wordpress', 'composer', 'backend', 'web'],
  sections: [
    text('คืออะไร ใช้ที่ไหน', 'ภาษาฝั่ง server ที่เกิดมาเพื่อทำเว็บโดยเฉพาะ 🐘 เว็บทั่วโลกยังใช้เยอะมาก (WordPress คนเดียวก็ ~40% ของเว็บแล้ว)\n\nPHP 8.x ทันสมัยขึ้นเยอะ: มี type, enum, match, readonly, JIT ใช้คู่กับ **Laravel** หรือ **Symfony**'),
    list('รันยังไง', [
      '**Zend Engine** compile สคริปต์เป็น opcode แล้วรัน (interpreted)',
      '**OPcache** เก็บ opcode ไว้ใน memory ไม่ต้อง parse ใหม่ทุก request + PHP 8 มี **JIT**',
      'โมเดลปกติ: 1 request = รันสคริปต์ใหม่ 1 รอบ (share-nothing) ผ่าน **PHP-FPM** + Nginx/Apache',
    ]),
    code('ติดตั้ง & Hello World', 'bash', `# Windows: winget install PHP.PHP / macOS: brew install php / Linux: apt install php
php -v

php hello.php                  # รันใน terminal
php -S localhost:8000          # dev server ในตัว เปิด http://localhost:8000`),
    code('hello.php', 'php', `<?php
echo "Hello, world!\\n";`),
    code('ตัวแปร & type', 'php', `<?php
declare(strict_types=1);         // เปิดโหมดเช็ก type เข้ม

$name = "Mochi";                 // ตัวแปรขึ้นต้นด้วย $
$age = 3;
$price = 19.99;
$isCat = true;
$nothing = null;
const MAX = 10;

echo "Hi $name, age {$age}\\n";   // double quote แทรกตัวแปรได้
echo 'Hi $name';                 // single quote ไม่แทรก
var_dump($age);                  // int(3)
$nick = $user['nick'] ?? 'guest';`),
    code('เงื่อนไข / loop / ฟังก์ชัน', 'php', `if ($age >= 18) {
    echo "adult";
} elseif ($age > 1) {
    echo "young";
} else {
    echo "baby";
}

$type = match ($day) {           // PHP 8 (เทียบแบบ ===)
    'sat', 'sun' => 'weekend',
    default => 'weekday',
};

for ($i = 0; $i < 3; $i++) { echo $i; }
foreach ($names as $i => $n) { echo "$i: $n\\n"; }

function add(int $a, int $b = 0): int {
    return $a + $b;
}
$double = fn($x) => $x * 2;      // arrow function`),
    code('Array (เป็นทั้ง list และ map)', 'php', `$nums = [3, 1, 2];
$nums[] = 4;                                 // push
$user = ['name' => 'Mochi', 'age' => 3];     // associative array

count($nums);                                // 4
in_array(2, $nums, true);                    // true
array_key_exists('age', $user);              // true

$squares = array_map(fn($n) => $n * $n, $nums);
$evens   = array_filter($nums, fn($n) => $n % 2 === 0);
$sum     = array_reduce($nums, fn($c, $n) => $c + $n, 0);
sort($nums);

foreach ($user as $key => $value) {
    echo "$key: $value\\n";
}`),
    code('Class / interface / enum', 'php', `class Animal {
    public function __construct(
        protected string $name,          // constructor promotion (PHP 8)
    ) {}
    public function speak(): string {
        return "{$this->name} makes a sound";
    }
}

class Cat extends Animal {
    public function speak(): string {
        return "{$this->name} says meow";
    }
}

interface Greeter { public function greet(string $who): string; }
enum Status: string { case Active = 'active'; case Banned = 'banned'; }

echo (new Cat('Tama'))->speak();`),
    code('Error handling', 'php', `try {
    $data = json_decode('{bad', true, flags: JSON_THROW_ON_ERROR);
} catch (JsonException $e) {
    echo "JSON พัง: " . $e->getMessage();
} catch (Throwable $e) {
    echo "อย่างอื่นพัง";
} finally {
    echo "จบ";
}

if ($age < 0) {
    throw new InvalidArgumentException('age must be >= 0');
}`),
    table('Functions ใช้บ่อย', ['หมวด', 'functions'], [
      ['**string**', '`strlen`, `str_contains`, `str_starts_with`, `explode`, `implode`, `trim`, `strtolower`, `str_replace`, `substr`, `sprintf`'],
      ['**array**', '`array_map`, `array_filter`, `array_reduce`, `array_keys`, `array_values`, `array_merge`, `in_array`, `array_search`, `usort`'],
      ['**เช็กค่า**', '`isset`, `empty`, `is_null`, `is_array`, `gettype`'],
      ['**JSON**', '`json_encode($arr)`, `json_decode($str, true)`'],
      ['**debug**', '`var_dump`, `print_r`, `dd()` (Laravel)'],
    ]),
    code('Mini example: JSON API ไฟล์เดียว 📮', 'php', `<?php
header('Content-Type: application/json');

$todos = [
    ['id' => 1, 'title' => 'Water plants', 'done' => false],
    ['id' => 2, 'title' => 'Feed cat', 'done' => true],
];

$onlyPending = ($_GET['pending'] ?? '') === '1';
$result = $onlyPending
    ? array_values(array_filter($todos, fn($t) => !$t['done']))
    : $todos;

echo json_encode($result, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
// รัน php -S localhost:8000 แล้วเปิด /index.php?pending=1`),
    code('Composer & tooling', 'bash', `composer init                       # สร้าง composer.json
composer require guzzlehttp/guzzle  # เพิ่ม package (จาก Packagist)
composer require --dev phpunit/phpunit
composer install                    # ลงตาม composer.lock
composer dump-autoload              # อัปเดต PSR-4 autoload
vendor/bin/phpunit                  # test
vendor/bin/phpstan analyse src      # static analysis`),
    warn('`==` ของ PHP หลวมมาก: `"1" == "01"` → `true`, `null == false` → `true` ใช้ **`===`** เสมอ!'),
    warn('`strpos()` คืน `0` ถ้าเจอที่ตำแหน่งแรก ซึ่งเป็น falsy 😵 ใช้ `str_contains()` (PHP 8) หรือเช็ก `!== false`\n\nและ `array_filter` **เก็บ key เดิมไว้** ถ้าจะได้ list ต่อเนื่องห่อด้วย `array_values()`'),
    tip('ใส่ `declare(strict_types=1);` บนสุดทุกไฟล์ + ใส่ type ให้ parameter/return จะจับบั๊กได้เยอะขึ้นมาก 🐘'),
    pairs(['Laravel', 'Symfony', 'WordPress', 'Composer', 'PHPUnit', 'Pest', 'Livewire', 'MySQL', 'Nginx + PHP-FPM']),
  ],
}

/* ───────────────────────── 9. Kotlin ───────────────────────── */
const kotlin = {
  id: 'kotlin',
  title: 'Kotlin',
  emoji: '🟣',
  summary: 'ภาษาหลักของ Android กระชับกว่า Java และกัน null ได้',
  tags: ['kotlin', 'android', 'jvm', 'coroutines', 'compose', 'gradle', 'null-safety'],
  sections: [
    text('คืออะไร ใช้ที่ไหน', 'ภาษาจาก JetBrains ที่ Google ประกาศเป็นภาษาหลักของ **Android** 🤖 เขียนสั้นกว่า Java เยอะ มี **null safety** ในตัว\n\nใช้ทำ Android (Jetpack Compose), backend (Spring Boot, Ktor) และแชร์โค้ดข้ามแพลตฟอร์มด้วย **Kotlin Multiplatform**'),
    list('รันยังไง', [
      'Kotlin/JVM: compile เป็น **JVM bytecode** เหมือน Java → เรียก library Java ได้ 100%',
      'Kotlin/Native: compile เป็น native (ใช้กับ iOS) / Kotlin/JS & Wasm: ไปเว็บ',
      'บน Android: bytecode ถูกแปลงเป็น DEX แล้วรันบน ART',
    ]),
    code('Hello World', 'kotlin', `fun main() {
    println("Hello, world!")
}`),
    code('ติดตั้ง & รัน', 'bash', `# ง่ายสุด: ใช้ IntelliJ IDEA / Android Studio (มี Kotlin ในตัว)
# หรือ SDKMAN: sdk install kotlin
kotlinc hello.kt -include-runtime -d hello.jar
java -jar hello.jar

# โปรเจกต์จริงใช้ Gradle
./gradlew run`),
    code('ตัวแปร & null safety', 'kotlin', `val name = "Mochi"           // read-only (ใช้บ่อยสุด)
var age = 3                  // เปลี่ยนค่าได้
val price: Double = 19.99
val isCat: Boolean = true

var nick: String? = null     // ใส่ ? ถึงจะเป็น null ได้
val len = nick?.length ?: 0  // safe call + elvis operator
nick?.let { println(it) }    // ทำเมื่อไม่ null

val msg = "Hi $name, next year \${age + 1}"
const val MAX = 10           // compile-time const (ระดับบนสุด)`),
    code('เงื่อนไข & loop', 'kotlin', `val label = if (age > 2) "adult" else "kitten"  // if เป็น expression

val type = when (day) {
    "sat", "sun" -> "weekend"
    else -> "weekday"
}

val grade = when {
    score >= 80 -> "A"
    score >= 70 -> "B"
    else -> "C"
}

for (i in 0 until 3) println(i)      // 0, 1, 2
for (i in 1..3) println(i)           // 1, 2, 3
for ((i, n) in names.withIndex()) println("$i $n")
while (age < 5) age++`),
    code('ฟังก์ชัน', 'kotlin', `fun add(a: Int, b: Int = 0): Int = a + b

fun greet(name: String, emoji: String = "🐱") = "$emoji Hi $name"
greet(name = "Tama")                 // named argument

val double = { x: Int -> x * 2 }     // lambda

fun String.shout() = uppercase() + "!"   // extension function
println("meow".shout())              // MEOW!`),
    code('Class / data class / object', 'kotlin', `data class User(val id: Int, val name: String)  // equals/toString/copy ฟรี
val u2 = User(1, "Tama").copy(name = "Kuro")

open class Animal(val name: String) {           // ต้อง open ถึง extend ได้
    open fun speak() = "$name makes a sound"
}
class Cat(name: String) : Animal(name) {
    override fun speak() = "$name says meow"
}

object Config { const val API = "https://api.example.com" }  // singleton

sealed interface Result {
    data class Ok(val value: Int) : Result
    data class Err(val msg: String) : Result
}`),
    code('Collections', 'kotlin', `val nums = listOf(3, 1, 2)             // read-only
val mutable = mutableListOf(1, 2)
mutable.add(3)

val ages = mapOf("Tama" to 3, "Mochi" to 2)
val scores = mutableMapOf<String, Int>()
scores["Kuro"] = 90
val tags = setOf("cute", "cat")

nums.map { it * 2 }                    // [6, 2, 4]
nums.filter { it > 1 }                 // [3, 2]
nums.sorted()                          // [1, 2, 3]
nums.firstOrNull { it > 5 }            // null
ages.getOrDefault("Kuro", 0)           // 0
ages.forEach { (k, v) -> println("$k=$v") }`),
    code('Error handling', 'kotlin', `val n = try {                          // try เป็น expression
    "abc".toInt()
} catch (e: NumberFormatException) {
    -1
}

val safe = "abc".toIntOrNull() ?: 0    // ไม่ต้อง try เลย

require(age >= 0) { "age must be >= 0" }   // IllegalArgumentException
val result = runCatching { riskyCall() }
    .getOrElse { "fallback" }`),
    code('Coroutines', 'kotlin', `import kotlinx.coroutines.*

suspend fun fetch(n: Int): Int {
    delay(1000)                 // ไม่บล็อก thread
    return n * 2
}

fun main() = runBlocking {
    val results = listOf(1, 2, 3)
        .map { async { fetch(it) } }
        .awaitAll()
    println(results)            // [2, 4, 6] ใช้เวลา ~1 วิ
}`, 'ต้องเพิ่ม dependency kotlinx-coroutines-core / บน Android ใช้ viewModelScope.launch { }'),
    table('Collection & scope functions ใช้บ่อย', ['function', 'ทำอะไร'], [
      ['`map` / `filter` / `forEach`', 'แปลง / กรอง / วนทำ'],
      ['`find` / `firstOrNull`', 'หาตัวแรก (ไม่เจอได้ null)'],
      ['`any` / `all` / `none` / `count`', 'เช็กเงื่อนไข / นับ'],
      ['`groupBy` / `associateBy`', 'จัดกลุ่ม / ทำ map จาก key'],
      ['`sortedBy` / `sortedByDescending`', 'เรียงตาม field'],
      ['`sumOf` / `maxByOrNull`', 'รวม / หาค่ามากสุด'],
      ['`joinToString(", ")`', 'ต่อเป็น string'],
      ['`chunked` / `windowed` / `zip`', 'แบ่งกลุ่ม / หน้าต่างเลื่อน / จับคู่'],
      ['`let` / `apply` / `also` / `run`', 'scope functions (ทำงานกับ object ใน block)'],
    ]),
    code('Mini example: สรุปยอดตามลูกค้า 🧾', 'kotlin', `data class Order(val customer: String, val amount: Double)

fun main() {
    val orders = listOf(
        Order("Tama", 120.0),
        Order("Mochi", 80.0),
        Order("Tama", 45.0),
    )

    orders
        .groupBy { it.customer }
        .mapValues { (_, list) -> list.sumOf { it.amount } }
        .toList()
        .sortedByDescending { it.second }
        .forEach { (name, total) -> println("$name: $total") }
    // Tama: 165.0
    // Mochi: 80.0
}`),
    code('Gradle (build.gradle.kts)', 'kotlin', `plugins {
    kotlin("jvm") version "2.1.0"
    application
}

dependencies {
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.9.0")
    testImplementation(kotlin("test"))
}

application { mainClass.set("MainKt") }`, 'library มาจาก Maven Central เหมือน Java / lint ด้วย ktlint หรือ detekt'),
    warn('`!!` (not-null assertion) = "ฉันมั่นใจว่าไม่ null" ถ้าผิดก็ **NullPointerException** ทันที 💥 ใช้ `?.`, `?:` หรือ `let` แทนดีกว่า'),
    warn('`listOf()` แค่ **read-only view** ไม่ใช่ immutable จริง ถ้าข้างหลังเป็น MutableList คนอื่นแก้ได้อยู่ และค่าที่มาจาก Java (platform type) อาจเป็น null โดย compiler ไม่เตือน'),
    tip('Kotlin `==` เทียบค่า (เรียก `equals` ให้) ส่วน `===` เทียบว่า object เดียวกัน — สบายกว่า Java เยอะ 💜'),
    pairs(['Android', 'Jetpack Compose', 'Coroutines & Flow', 'Ktor', 'Spring Boot', 'Kotlin Multiplatform', 'Room', 'Retrofit', 'Hilt', 'Gradle']),
  ],
}

/* ───────────────────────── 10. Swift ───────────────────────── */
const swift = {
  id: 'swift',
  title: 'Swift',
  emoji: '🐦',
  summary: 'ภาษาของ Apple ทำแอป iOS / macOS ปลอดภัยและเร็ว',
  tags: ['swift', 'ios', 'macos', 'apple', 'swiftui', 'xcode', 'optional'],
  sections: [
    text('คืออะไร ใช้ที่ไหน', 'ภาษาจาก Apple ที่มาแทน Objective-C 🐦 ใช้ทำแอป iPhone, iPad, Mac, Apple Watch, Vision Pro\n\nเด่นเรื่อง **Optional** (กัน null), value type (struct), และ concurrency แบบ async/await + actor รันบน Linux/Windows ได้ด้วย (server-side เช่น Vapor)'),
    list('รันยังไง', [
      'compile → **native machine code** ผ่าน LLVM เร็วมาก',
      'จัดการ memory ด้วย **ARC** (นับ reference อัตโนมัติ) ไม่มี GC pause',
      'ทำ UI ด้วย **SwiftUI** (declarative) หรือ UIKit (แบบเก่า)',
    ]),
    code('ติดตั้ง & Hello World', 'bash', `# macOS: ติดตั้ง Xcode (มี swift มาด้วย) / Linux, Windows: swift.org/install
swift --version

# hello.swift มีบรรทัดเดียว: print("Hello, world!")
swift hello.swift                      # รันแบบสคริปต์
swiftc hello.swift -o hello && ./hello # compile เป็น binary

swift package init --type executable   # โปรเจกต์ SwiftPM
swift run`),
    code('ตัวแปร & Optional', 'swift', `let name = "Mochi"          // ค่าคงที่ (ใช้ให้มากที่สุด)
var age = 3                 // เปลี่ยนได้
let price: Double = 19.99
let isCat: Bool = true

var nick: String? = nil     // Optional = มีค่าหรือ nil
let len = nick?.count ?? 0  // optional chaining + default

if let nick {               // unwrap (Swift 5.7+)
    print("nick is \\(nick)")
}

let msg = "Hi \\(name), age \\(age)"   // string interpolation`),
    code('เงื่อนไข & loop', 'swift', `if age >= 18 {
    print("adult")
} else if age > 1 {
    print("young")
}
let label = age > 2 ? "adult" : "kitten"

switch score {                 // ต้องครบทุกกรณี ไม่ต้อง break
case 80...:
    print("A")
case 70..<80:
    print("B")
default:
    print("C")
}

for i in 0..<3 { print(i) }    // 0, 1, 2
for (i, n) in names.enumerated() { print(i, n) }
while age < 5 { age += 1 }`),
    code('ฟังก์ชัน & closure', 'swift', `func add(_ a: Int, _ b: Int = 0) -> Int { a + b }
add(1, 2)                              // _ = ไม่ต้องใส่ label

func greet(name: String, emoji: String = "🐱") -> String {
    "\\(emoji) Hi \\(name)"
}
greet(name: "Tama")                    // ต้องใส่ argument label

let double = { (x: Int) in x * 2 }     // closure
let sorted = [3, 1, 2].sorted { $0 < $1 }   // trailing closure

func check(_ age: Int?) {
    guard let age, age >= 0 else {     // guard = ออกก่อนถ้าไม่ผ่าน
        print("invalid"); return
    }
    print("age =", age)
}`),
    code('struct / class / protocol / enum', 'swift', `struct Point { var x: Double; var y: Double }   // value type (copy)

class Animal {                                   // reference type
    let name: String
    init(name: String) { self.name = name }
    func speak() -> String { "\\(name) makes a sound" }
}
final class Cat: Animal {
    override func speak() -> String { "\\(name) says meow" }
}

protocol Greeter { func greet(_ who: String) -> String }

enum Status {
    case idle, loading
    case done(Int)            // associated value
    case failed(String)
}

extension Int { var isEven: Bool { self % 2 == 0 } }`),
    code('Collections', 'swift', `var nums = [3, 1, 2]                     // Array
nums.append(4)
let ages = ["Tama": 3, "Mochi": 2]        // Dictionary
let kuro = ages["Kuro", default: 0]       // 0
var tags: Set = ["cute", "cat"]

nums.map { $0 * 2 }                       // [6, 2, 4, 8]
nums.filter { $0 > 1 }                    // [3, 2, 4]
nums.reduce(0, +)                         // 10
nums.first(where: { $0 > 2 })             // Optional(3)
nums.contains(3)                          // true

for (name, age) in ages { print(name, age) }`),
    code('Error handling', 'swift', `enum LoginError: Error { case wrongPassword, locked }

func login(_ pw: String) throws -> String {
    guard pw == "meow" else { throw LoginError.wrongPassword }
    return "token123"
}

do {
    let token = try login("woof")
    print(token)
} catch LoginError.wrongPassword {
    print("รหัสผิดจ้า")
} catch {
    print("error: \\(error)")
}

let t = try? login("meow")   // ได้ Optional แทนการ throw`),
    code('async / await & actor', 'swift', `func fetchUser(id: Int) async throws -> String {
    try await Task.sleep(for: .seconds(1))
    return "user\\(id)"
}

Task {
    async let a = fetchUser(id: 1)       // เริ่มพร้อมกัน
    async let b = fetchUser(id: 2)
    let users = try await [a, b]
    print(users)                         // ["user1", "user2"]
}

actor Counter {                          // กัน data race อัตโนมัติ
    var value = 0
    func increment() { value += 1 }
}`),
    table('Methods ใช้บ่อย', ['ของ', 'methods'], [
      ['**Array**', '`append`, `insert(_:at:)`, `remove(at:)`, `count`, `isEmpty`, `first`, `last`, `contains`, `sorted(by:)`, `reversed()`'],
      ['**higher-order**', '`map`, `compactMap` (ตัด nil), `filter`, `reduce`, `forEach`, `first(where:)`, `allSatisfy`'],
      ['**Dictionary**', '`[key, default:]`, `keys`, `values`, `updateValue`, `removeValue(forKey:)`, `mapValues`'],
      ['**String**', '`count`, `hasPrefix`, `contains`, `split(separator:)`, `uppercased()`, `replacingOccurrences(of:with:)`, `trimmingCharacters(in:)`'],
    ]),
    code('Mini example: SwiftUI counter 🐾', 'swift', `import SwiftUI

struct CounterView: View {
    @State private var count = 0

    var body: some View {
        VStack(spacing: 16) {
            Text("กดไปแล้ว \\(count) ครั้ง 🐾")
                .font(.title2)
            Button("กดเลย!") { count += 1 }
                .buttonStyle(.borderedProminent)
            if count >= 10 {
                Text("เก่งมาก! 🎉")
            }
        }
        .padding()
    }
}`),
    code('Swift Package Manager', 'swift', `// Package.swift (บางส่วน)
dependencies: [
    .package(url: "https://github.com/Alamofire/Alamofire.git", from: "5.9.0"),
],
targets: [
    .executableTarget(name: "MyApp", dependencies: ["Alamofire"]),
]`, 'ใน Xcode: File → Add Package Dependencies… / tooling อื่น: SwiftLint, swift-format, XCTest / Swift Testing'),
    warn('Force unwrap `!` เช่น `nick!` ถ้าเป็น nil แอป **crash ทันที** 💥 ใช้ `if let`, `guard let` หรือ `??` แทน'),
    warn('closure ที่อ้าง `self` ใน class อาจเกิด **retain cycle** (memory leak) ใช้ `[weak self]`\n\nและอัปเดต UI ต้องทำบน main thread (`@MainActor`)'),
    tip('Swift แนะนำให้ใช้ **struct ก่อน class** — struct copy ตอน assign ทำให้ไม่มีใครแอบแก้ข้อมูลเรา ใช้ class เมื่อต้องการ identity หรือ inheritance จริงๆ 🐦'),
    pairs(['SwiftUI', 'UIKit', 'SwiftData', 'Combine', 'Xcode', 'TestFlight', 'Alamofire', 'Vapor', 'Swift Testing']),
  ],
}

/* ───────────────────────── 11. Dart ───────────────────────── */
const dart = {
  id: 'dart',
  title: 'Dart',
  emoji: '🎯',
  summary: 'ภาษาเบื้องหลัง Flutter เขียนครั้งเดียวได้ทั้ง mobile, web, desktop',
  tags: ['dart', 'flutter', 'mobile', 'cross-platform', 'pub', 'null-safety', 'async'],
  sections: [
    text('คืออะไร ใช้ที่ไหน', 'ภาษาจาก Google ที่ดังเพราะ **Flutter** 🎯 หน้าตาคล้าย Java/JS อ่านง่าย มี **sound null safety**\n\nใช้ทำแอป iOS + Android + Web + Desktop จากโค้ดชุดเดียว และเขียน CLI/server ได้ด้วย'),
    list('รันยังไง', [
      'ตอน dev: รันบน **Dart VM แบบ JIT** → ได้ **hot reload** แก้โค้ดเห็นผลทันที ⚡',
      'ตอน release: compile **AOT** เป็น native ARM/x64 → แอปเร็ว start ไว',
      'ไปเว็บ: compile เป็น JavaScript หรือ WebAssembly',
    ]),
    code('ติดตั้ง & Hello World', 'bash', `# ติดตั้ง Flutter SDK (มี Dart มาด้วย) หรือ Dart SDK เดี่ยวๆ จาก dart.dev
dart --version

dart create hello_app
cd hello_app
dart run                              # รัน bin/hello_app.dart
dart compile exe bin/hello_app.dart   # ได้ native binary`),
    code('Hello World', 'dart', `void main() {
  print('Hello, world!');
}`),
    code('ตัวแปร & null safety', 'dart', `var name = 'Mochi';        // ให้เดา type (String)
final age = 3;             // กำหนดได้ครั้งเดียว (ตอน runtime)
const pi = 3.14;           // ค่าคงที่ตอน compile
int count = 0;
double price = 19.99;
bool isCat = true;

String? nick;              // nullable (ค่าเริ่มต้น null)
final len = nick?.length ?? 0;
late String token;         // สัญญาว่าจะกำหนดก่อนใช้

final msg = 'Hi $name, next year \${age + 1}';`),
    code('เงื่อนไข / loop / ฟังก์ชัน', 'dart', `if (age >= 18) {
  print('adult');
} else {
  print('young');
}
final label = age > 2 ? 'adult' : 'kitten';

final type = switch (day) {        // switch expression (Dart 3)
  'sat' || 'sun' => 'weekend',
  _ => 'weekday',
};

for (var i = 0; i < 3; i++) print(i);
for (final n in names) print(n);

int add(int a, [int b = 0]) => a + b;              // optional positional
String greet({required String name, String emoji = '🐱'}) =>
    '$emoji Hi $name';                             // named parameters
greet(name: 'Tama');`),
    code('Class', 'dart', `class Animal {
  final String name;
  Animal(this.name);                     // constructor แบบย่อ
  String speak() => '$name makes a sound';
}

class Cat extends Animal {
  Cat(super.name);
  @override
  String speak() => '$name says meow';
}

class Point {
  final double x, y;
  const Point(this.x, this.y);
  Point.origin() : x = 0, y = 0;         // named constructor
}

mixin Swimmer { String swim() => 'splash!'; }
class Duck extends Animal with Swimmer { Duck(super.name); }`),
    code('Collections', 'dart', `final nums = [3, 1, 2];                 // List<int>
nums.add(4);
final ages = {'Tama': 3, 'Mochi': 2};   // Map<String, int>
ages['Kuro'] = 1;
final tags = {'cute', 'cat'};           // Set<String>

final doubled = nums.map((n) => n * 2).toList();   // [6, 2, 4, 8]
final big = nums.where((n) => n > 1).toList();     // [3, 2, 4]
final sum = nums.fold(0, (a, b) => a + b);         // 10

// collection if / for / spread ✨
final all = [...nums, if (isCat) 99, for (final n in nums) n * 10];`),
    code('Error handling', 'dart', `try {
  final n = int.parse('abc');
  print(n);
} on FormatException catch (e) {
  print('แปลงไม่ได้: \${e.message}');
} catch (e) {
  print('อื่นๆ: $e');
} finally {
  print('จบ');
}

final safe = int.tryParse('abc') ?? 0;   // ไม่ throw`),
    code('Future / async / Stream', 'dart', `Future<String> fetchUser(int id) async {
  await Future.delayed(const Duration(seconds: 1));
  return 'user$id';
}

Future<void> main() async {
  final users = await Future.wait([fetchUser(1), fetchUser(2)]);
  print(users);                  // [user1, user2]

  await for (final i in ticker()) {
    print('tick $i');
  }
}

Stream<int> ticker() async* {
  for (var i = 0; i < 3; i++) {
    await Future.delayed(const Duration(milliseconds: 300));
    yield i;
  }
}`),
    table('Methods ใช้บ่อย', ['ของ', 'methods'], [
      ['**List / Iterable**', '`add`, `addAll`, `remove`, `map`, `where`, `firstWhere`, `any`, `every`, `fold`, `reduce`, `contains`, `sort`, `join`, `toList`, `toSet`, `expand`'],
      ['**Map**', '`[key]`, `putIfAbsent`, `containsKey`, `keys`, `values`, `entries`, `forEach`, `remove`, `update`'],
      ['**String**', '`split`, `trim`, `contains`, `startsWith`, `toUpperCase`, `replaceAll`, `substring`, `padLeft`'],
      ['**แปลงค่า**', '`int.parse`, `int.tryParse`, `double.parse`, `toString()`, `jsonEncode` / `jsonDecode` (dart:convert)'],
    ]),
    code('Mini example: Flutter counter 🐾', 'dart', `import 'package:flutter/material.dart';

void main() => runApp(const MaterialApp(home: CounterPage()));

class CounterPage extends StatefulWidget {
  const CounterPage({super.key});
  @override
  State<CounterPage> createState() => _CounterPageState();
}

class _CounterPageState extends State<CounterPage> {
  int _count = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Counter 🐾')),
      body: Center(child: Text('กดไปแล้ว $_count ครั้ง')),
      floatingActionButton: FloatingActionButton(
        onPressed: () => setState(() => _count++),
        child: const Icon(Icons.add),
      ),
    );
  }
}`),
    code('pub & tooling', 'bash', `dart pub add http              # เพิ่ม package (จาก pub.dev)
flutter pub add provider       # ในโปรเจกต์ Flutter
flutter pub get                # ลงตาม pubspec.yaml
dart format .                  # จัด format
dart analyze                   # lint / เช็กโค้ด
flutter test
flutter run                    # รันบน emulator / เครื่องจริง`),
    warn('`!` (null assertion) เช่น `nick!.length` ถ้าเป็น null ก็พังตอนรัน ใช้ `?.` / `??` ดีกว่า\n\nและลืม `await` = ได้ `Future` กลับมาแทนค่าจริง 😵'),
    warn('เรียก `setState` หลัง widget ถูก dispose แล้วจะ error (เช่นหลัง await) เช็ก `if (!mounted) return;` ก่อนนะ'),
    tip('ใส่ `const` หน้า widget ที่ไม่เปลี่ยน (`const Text(...)`) Flutter จะไม่ rebuild ซ้ำ ช่วยให้แอปลื่นขึ้น 🎯'),
    pairs(['Flutter', 'Riverpod', 'Bloc', 'Provider', 'Dio', 'go_router', 'Firebase', 'freezed', 'Hive / Isar']),
  ],
}

/* ───────────────────────── 12. Rust ───────────────────────── */
const rust = {
  id: 'rust',
  title: 'Rust',
  emoji: '🦀',
  summary: 'เร็วเท่า C/C++ แต่ปลอดภัยเรื่อง memory ด้วยระบบ ownership',
  tags: ['rust', 'cargo', 'ownership', 'borrow', 'systems', 'wasm', 'performance'],
  sections: [
    text('คืออะไร ใช้ที่ไหน', 'ภาษา systems ที่ **เร็วเท่า C/C++** แต่ compiler ช่วยกันบั๊ก memory (null, use-after-free, data race) ให้ตั้งแต่ตอน compile 🦀\n\nใช้ทำ CLI tools, backend ประสิทธิภาพสูง, WebAssembly, blockchain, embedded และแม้แต่ใน Linux kernel / Windows'),
    list('รันยังไง', [
      'compile → **native binary** ผ่าน LLVM ไม่มี runtime หนักๆ',
      '**ไม่มี GC** — ใช้ระบบ **ownership + borrowing** ที่ compiler ตรวจตอน compile',
      'zero-cost abstraction: เขียน iterator สวยๆ ก็เร็วเท่า loop ธรรมดา',
    ]),
    code('ติดตั้ง & Hello World', 'bash', `# ติดตั้งผ่าน rustup (rustup.rs) — Windows ต้องมี Visual Studio Build Tools
rustc --version
cargo --version

cargo new hello
cd hello
cargo run                  # build + รัน
cargo build --release      # binary ที่ optimize แล้วอยู่ใน target/release/`),
    code('src/main.rs', 'rust', `fn main() {
    println!("Hello, world!");
}`),
    code('ตัวแปร & type', 'rust', `let name = "Mochi";            // immutable เป็นค่าเริ่มต้น
let mut age = 3;               // mut = แก้ได้
age += 1;

let price: f64 = 19.99;
let count: i32 = -5;           // i8..i128, u8..u128, usize
let is_cat: bool = true;
let c: char = '🐱';
const MAX: u32 = 10;

let owned: String = String::from("hi");  // String (เป็นเจ้าของ, heap)
let borrowed: &str = &owned;              // &str (ยืมดู)
let msg = format!("{name} is {age}");
let (x, y) = (1, 2);           // tuple destructuring`),
    code('Ownership & Borrowing 🔑', 'rust', `fn len(s: &String) -> usize { s.len() }        // ยืมอ่าน
fn push_bang(s: &mut String) { s.push('!'); }  // ยืมแก้

fn main() {
    let s1 = String::from("hello");
    let s2 = s1;                 // move! ย้ายความเป็นเจ้าของ
    // println!("{s1}");         // ❌ compile error: s1 ถูก move ไปแล้ว
    let s3 = s2.clone();         // copy จริง
    println!("{}", len(&s3));    // ส่งแบบยืม s3 ยังใช้ต่อได้

    let mut s4 = String::from("hi");
    push_bang(&mut s4);          // &mut ยืมแก้ได้ทีละ 1 ที่
    println!("{s4}");            // hi!
}`, 'กฎ: ค่ามีเจ้าของคนเดียว / ยืมอ่าน (&) ได้หลายคน หรือ ยืมแก้ (&mut) ได้คนเดียว'),
    code('เงื่อนไข / loop / match', 'rust', `let label = if age > 2 { "adult" } else { "kitten" };

for i in 0..3 { println!("{i}"); }           // 0, 1, 2
for (i, n) in names.iter().enumerate() { println!("{i} {n}"); }
while age < 5 { age += 1; }
let found = loop { break 42; };              // loop คืนค่าได้

match score {
    90..=100 => println!("A"),
    70..=89 => println!("B"),
    _ => println!("C"),                      // ต้องครบทุกกรณี
}

fn add(a: i32, b: i32) -> i32 { a + b }     // ไม่มี ; = return
let double = |x: i32| x * 2;                 // closure`),
    code('struct / enum / trait', 'rust', `#[derive(Debug, Clone)]
struct Cat { name: String, age: u8 }

impl Cat {
    fn new(name: &str) -> Self { Cat { name: name.to_string(), age: 0 } }
    fn birthday(&mut self) { self.age += 1; }
}

trait Speak { fn speak(&self) -> String; }
impl Speak for Cat {
    fn speak(&self) -> String { format!("{} says meow", self.name) }
}

enum Shape { Circle(f64), Rect { w: f64, h: f64 } }

fn area(s: &Shape) -> f64 {
    match s {
        Shape::Circle(r) => std::f64::consts::PI * r * r,
        Shape::Rect { w, h } => w * h,
    }
}`),
    code('Vec & HashMap', 'rust', `use std::collections::HashMap;

let mut nums = vec![3, 1, 2];
nums.push(4);
nums.sort();                                   // [1, 2, 3, 4]
let first = nums.get(0);                       // Option<&i32>

let evens: Vec<i32> = nums.iter()
    .filter(|n| *n % 2 == 0)
    .map(|n| n * n)
    .collect();                                // [4, 16]
let total: i32 = nums.iter().sum();            // 10

let mut ages: HashMap<&str, u32> = HashMap::new();
ages.insert("Tama", 3);
*ages.entry("Mochi").or_insert(0) += 1;
if let Some(a) = ages.get("Tama") { println!("{a}"); }`),
    code('Error handling: Result & Option', 'rust', `use std::num::ParseIntError;

fn parse_age(s: &str) -> Result<u32, ParseIntError> {
    let n: u32 = s.trim().parse()?;    // ? = ถ้า Err ส่งต่อออกไปเลย
    Ok(n)
}

fn main() {
    match parse_age("abc") {
        Ok(n) => println!("age = {n}"),
        Err(e) => println!("error: {e}"),
    }
    let text = std::fs::read_to_string("data.txt").unwrap_or_default();
    println!("{} bytes", text.len());

    let maybe: Option<i32> = None;     // ไม่มี null ใช้ Option แทน
    println!("{}", maybe.unwrap_or(0));
}`),
    code('Concurrency: thread & async (tokio)', 'rust', `use std::thread;

let handles: Vec<_> = (1..=3)
    .map(|i| thread::spawn(move || i * 10))
    .collect();
for h in handles {
    println!("{}", h.join().unwrap());   // 10, 20, 30
}

// async ต้องมี runtime เช่น tokio (cargo add tokio --features full)
async fn fetch(n: u64) -> u64 { n * 2 }

#[tokio::main]
async fn main() {
    let (a, b) = tokio::join!(fetch(1), fetch(2));
    println!("{a} {b}");
}`, 'compiler กัน data race ให้: ข้อมูลที่แชร์ข้าม thread ต้องห่อด้วย Arc<Mutex<T>>'),
    table('Methods ใช้บ่อย', ['ของ', 'methods'], [
      ['**Iterator**', '`iter`, `into_iter`, `map`, `filter`, `collect`, `fold`, `sum`, `any`, `all`, `find`, `enumerate`, `zip`, `take`, `rev`'],
      ['**Option / Result**', '`unwrap`, `expect("msg")`, `unwrap_or`, `map`, `and_then`, `ok_or`, `is_some`, `?`'],
      ['**String / &str**', '`push_str`, `len`, `contains`, `split`, `split_whitespace`, `trim`, `to_uppercase`, `replace`, `chars`, `parse::<i32>()`'],
      ['**Vec**', '`push`, `pop`, `len`, `get`, `contains`, `sort`, `sort_by`, `dedup`, `retain`, `extend`'],
      ['**macros**', '`println!`, `format!`, `vec!`, `panic!`, `dbg!`, `assert_eq!`'],
    ]),
    code('Mini example: นับคำ 📚', 'rust', `use std::collections::HashMap;

fn main() {
    let text = "the cat and the dog and the bird";
    let mut counts: HashMap<&str, usize> = HashMap::new();

    for word in text.split_whitespace() {
        *counts.entry(word).or_insert(0) += 1;
    }

    let mut sorted: Vec<_> = counts.into_iter().collect();
    sorted.sort_by(|a, b| b.1.cmp(&a.1).then(a.0.cmp(b.0)));

    for (word, n) in sorted.iter().take(3) {
        println!("{word:<5} {n}");
    }
    // the   3
    // and   2
    // bird  1
}`),
    code('Cargo & tooling', 'bash', `cargo add serde --features derive   # เพิ่ม crate (จาก crates.io)
cargo add tokio --features full
cargo check                         # เช็กเร็วๆ ไม่ต้อง build เต็ม
cargo clippy                        # lint ฉลาดมาก
cargo fmt                           # จัด format
cargo test                          # test
cargo doc --open                    # เปิด docs ของ dependency ทั้งหมด`),
    warn('`.unwrap()` ถ้าเจอ `None`/`Err` จะ **panic** โปรแกรมดับ ใช้ได้ตอนทดลอง แต่โค้ดจริงใช้ `?`, `match` หรือ `expect("เหตุผล")`'),
    warn('มือใหม่จะ "ทะเลาะกับ borrow checker" บ่อยมาก 😆 เป็นเรื่องปกติ! อ่าน error ดีๆ compiler Rust อธิบายละเอียดและมักบอกวิธีแก้มาให้ด้วย'),
    tip('ฟังก์ชันรับ parameter เป็น `&str` แทน `String` จะยืดหยุ่นกว่า (ส่งได้ทั้ง `"literal"` และ `&my_string`) 🦀'),
    pairs(['Tokio', 'Serde', 'Axum', 'Actix Web', 'Clap', 'SQLx', 'Tauri', 'wasm-bindgen', 'Bevy', 'Rayon']),
  ],
}

/* ───────────────────────── 13. C / C++ ───────────────────────── */
const cpp = {
  id: 'c-cpp',
  title: 'C / C++',
  emoji: '⚡',
  summary: 'ภาษารุ่นใหญ่ใกล้ฮาร์ดแวร์ เร็วสุดๆ แต่ต้องดูแล memory เอง',
  tags: ['c', 'cpp', 'c++', 'pointer', 'memory', 'stl', 'cmake', 'systems', 'embedded'],
  sections: [
    text('คืออะไร ใช้ที่ไหน', '**C** (1972) เรียบง่าย ใกล้ฮาร์ดแวร์มาก ใช้เขียน OS (Linux), driver, embedded, Arduino ⚙️\n\n**C++** = C + OOP + template + library มาตรฐาน (STL) ใช้ทำ game engine (Unreal), browser, database, งานที่ต้องการ performance สูงสุด มาตรฐานใหม่ๆ: C++17, C++20, C++23'),
    list('รันยังไง', [
      'compile → **native machine code** ด้วย `gcc`, `clang` หรือ MSVC (`cl`)',
      'ขั้นตอน: preprocess (`#include`) → compile → link ได้ไฟล์ executable',
      '**ไม่มี GC** — C ใช้ `malloc`/`free` เอง, C++ ใช้ **RAII** + smart pointer ให้ลบอัตโนมัติ',
    ]),
    code('hello.c', 'c', `#include <stdio.h>

int main(void) {
    printf("Hello, world!\\n");
    return 0;
}`),
    code('hello.cpp', 'cpp', `#include <iostream>

int main() {
    std::cout << "Hello, world!" << std::endl;
}`),
    code('ติดตั้ง & compile', 'bash', `# Linux: apt install build-essential / macOS: xcode-select --install
# Windows: MSYS2 (gcc) หรือ Visual Studio (MSVC)
gcc --version

gcc -Wall hello.c -o hello && ./hello
g++ -std=c++20 -Wall -Wextra hello.cpp -o hello && ./hello

# ตอน debug เปิด sanitizer จับบั๊ก memory
g++ -g -fsanitize=address,undefined main.cpp -o main`),
    code('C: ตัวแปร / array / pointer', 'c', `int age = 3;
double price = 19.99;
char grade = 'A';
const int MAX = 10;

int nums[5] = {3, 1, 2};        // ที่เหลือเป็น 0
char name[] = "Mochi";          // string = char array ปิดท้ายด้วย '\\0'

int *p = &age;                  // pointer เก็บ address
*p = 4;                         // แก้ค่าผ่าน pointer → age = 4

printf("%s is %d, price %.2f\\n", name, age, price);
for (int i = 0; i < 5; i++) {
    printf("%d ", nums[i]);
}`),
    code('C: struct & memory', 'c', `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct {
    char name[32];
    int age;
} Cat;

void birthday(Cat *c) { c->age++; }

int main(void) {
    Cat *c = malloc(sizeof(Cat));
    if (c == NULL) return 1;
    snprintf(c->name, sizeof c->name, "%s", "Tama");
    c->age = 2;
    birthday(c);
    printf("%s %d\\n", c->name, c->age);   // Tama 3
    free(c);                              // ต้อง free เองเสมอ!
    return 0;
}`),
    code('C++: STL containers & lambda', 'cpp', `#include <algorithm>
#include <iostream>
#include <map>
#include <string>
#include <vector>

int main() {
    std::vector<int> nums{3, 1, 2};
    nums.push_back(4);
    std::sort(nums.begin(), nums.end());          // 1 2 3 4

    std::map<std::string, int> ages{{"Tama", 3}};
    ages["Mochi"] = 2;
    for (const auto& [name, age] : ages)          // C++17
        std::cout << name << "=" << age << "\\n";

    auto it = std::find(nums.begin(), nums.end(), 2);
    if (it != nums.end()) std::cout << "found 2\\n";

    auto doubled = [](int x) { return x * 2; };   // lambda
    std::cout << doubled(21) << "\\n";            // 42
}`),
    code('C++: class & smart pointer', 'cpp', `#include <iostream>
#include <memory>
#include <string>

class Animal {
public:
    explicit Animal(std::string name) : name_(std::move(name)) {}
    virtual ~Animal() = default;               // สำคัญมากกับ inheritance
    virtual std::string speak() const { return name_ + " makes a sound"; }
protected:
    std::string name_;
};

class Cat : public Animal {
public:
    using Animal::Animal;                      // ใช้ constructor ของแม่
    std::string speak() const override { return name_ + " says meow"; }
};

int main() {
    std::unique_ptr<Animal> pet = std::make_unique<Cat>("Tama");
    std::cout << pet->speak() << "\\n";         // ลบให้อัตโนมัติ (RAII)
}`),
    code('C++: error handling & async', 'cpp', `#include <future>
#include <iostream>
#include <stdexcept>
#include <string>

int parseAge(const std::string& s) {
    int n = std::stoi(s);             // แปลงไม่ได้ → std::invalid_argument
    if (n < 0) throw std::out_of_range("age must be >= 0");
    return n;
}

int main() {
    try {
        parseAge("abc");
    } catch (const std::exception& e) {
        std::cerr << "error: " << e.what() << "\\n";
    }
    auto f = std::async(std::launch::async, [] { return 6 * 7; });
    std::cout << f.get() << "\\n";      // 42
}`, 'C ไม่มี exception — ใช้ return code (เช่น -1 / NULL) + ตัวแปร errno แทน'),
    table('Functions / methods ใช้บ่อย', ['ของ', 'ตัวอย่าง'], [
      ['**C stdio**', '`printf`, `scanf`, `snprintf`, `fopen`, `fgets`, `fclose`'],
      ['**C string/mem**', '`strlen`, `strcmp`, `strncpy`, `strcat`, `memcpy`, `memset`, `malloc`, `calloc`, `free`'],
      ['**std::vector**', '`push_back`, `emplace_back`, `size`, `empty`, `at`, `front`, `back`, `clear`, `erase`'],
      ['**std::string**', '`size`, `substr`, `find`, `append`, `+`, `std::to_string`, `std::stoi`'],
      ['**map / unordered_map**', '`[]`, `at`, `find`, `contains` (C++20), `insert`, `erase`'],
      ['**<algorithm>**', '`sort`, `find`, `find_if`, `count_if`, `transform`, `accumulate` (<numeric>), `min_element`'],
    ]),
    code('Mini example: สถิติคะแนน 📊', 'cpp', `#include <algorithm>
#include <iostream>
#include <numeric>
#include <vector>

int main() {
    std::vector<double> scores{85, 92, 58, 74};

    double sum = std::accumulate(scores.begin(), scores.end(), 0.0);
    double avg = sum / scores.size();
    auto [minIt, maxIt] = std::minmax_element(scores.begin(), scores.end());
    auto passed = std::count_if(scores.begin(), scores.end(),
                                [](double s) { return s >= 60; });

    std::cout << "avg=" << avg << " min=" << *minIt
              << " max=" << *maxIt << " passed=" << passed << "\\n";
    // avg=77.25 min=58 max=92 passed=3
}`),
    code('CMake (build system ยอดนิยม)', 'cmake', `# CMakeLists.txt
cmake_minimum_required(VERSION 3.20)
project(hello LANGUAGES CXX)
set(CMAKE_CXX_STANDARD 20)
add_executable(hello main.cpp)

# build:
#   cmake -B build
#   cmake --build build`, 'package manager: vcpkg หรือ Conan / debug: gdb, lldb / ตรวจ leak: Valgrind / format: clang-format'),
    warn('C/C++ ไม่เช็กขอบเขต array ให้! เขียนเกินขนาด = **buffer overflow** / ใช้ pointer หลัง `free` = **use-after-free** / ตัวแปรไม่ได้ initialize = ค่าขยะ ทั้งหมดนี้คือ **undefined behavior** 💀'),
    warn('ใช้ `strcpy`/`gets` เสี่ยงมาก ใช้ `snprintf`/`fgets` แทน และใน C++ ใช้ `std::string`, `std::vector`, `std::unique_ptr` แทน `char*` / `new` / `delete` ดิบๆ'),
    tip('compile ด้วย `-Wall -Wextra` เสมอ + เปิด `-fsanitize=address` ตอน dev จะเจอบั๊ก memory ก่อนที่มันจะเจอเรา ⚡'),
    pairs(['CMake', 'vcpkg', 'Conan', 'Qt', 'Unreal Engine', 'Arduino', 'OpenCV', 'gdb', 'Valgrind', 'Google Test']),
  ],
}

/* ───────────────────────── 14. Bash / Shell ───────────────────────── */
const bash = {
  id: 'bash',
  title: 'Bash / Shell script',
  emoji: '🐚',
  summary: 'สั่งงาน terminal อัตโนมัติ เครื่องมือคู่กายสาย DevOps',
  tags: ['bash', 'shell', 'sh', 'terminal', 'linux', 'script', 'devops', 'automation', 'cli'],
  sections: [
    text('คืออะไร ใช้ที่ไหน', '**Shell** คือโปรแกรมรับคำสั่งใน terminal ส่วน **Bash** คือ shell ยอดนิยมบน Linux 🐚 (macOS ใช้ zsh เป็นค่าเริ่มต้น แต่ syntax คล้ายกัน)\n\nShell script = เอาคำสั่งหลายๆ อันมาเรียงในไฟล์ ใช้ทำ automation, deploy, backup, CI/CD, ตั้งค่า server'),
    list('รันยังไง', [
      '**interpreted** — bash อ่านทีละบรรทัดแล้วสั่งโปรแกรมอื่นทำงาน',
      'ทุกอย่างเป็น **string** (ตัวเลขคำนวณผ่าน `$(( ))`)',
      'บรรทัดแรก `#!/usr/bin/env bash` (shebang) บอกว่าใช้ตัวไหนรัน',
      'บน Windows ใช้ผ่าน **Git Bash** หรือ **WSL**',
    ]),
    code('hello.sh', 'bash', `#!/usr/bin/env bash
echo "Hello, world!"`),
    code('รันสคริปต์', 'bash', `chmod +x hello.sh    # ให้สิทธิ์ execute (ครั้งเดียว)
./hello.sh
bash hello.sh        # หรือสั่ง bash รันตรงๆ`),
    code('ตัวแปร', 'bash', `name="Mochi"                 # ห้ามมีช่องว่างรอบ = !
age=3
echo "Hi $name, age \${age}"
readonly MAX=10

today=$(date +%Y-%m-%d)      # เอาผลลัพธ์คำสั่งมาเก็บ
next=$((age + 1))            # คำนวณเลข
nick=\${NICK:-guest}          # ค่า default ถ้าว่าง
export API_URL="https://api.example.com"   # ส่งต่อให้โปรแกรมลูก

echo "args: $1 $2 | ทั้งหมด: $@ | จำนวน: $#"
echo "exit code ล่าสุด: $?"   # 0 = สำเร็จ`),
    code('เงื่อนไข & loop', 'bash', `if [[ $age -ge 18 ]]; then
  echo "adult"
elif [[ -z "$name" ]]; then
  echo "no name"
else
  echo "young"
fi

[[ -f config.yml ]] && echo "มีไฟล์ config"

for f in *.log; do echo "$f"; done
for i in {1..3}; do echo "$i"; done
while read -r line; do echo "> $line"; done < input.txt

case "$1" in
  start) echo "starting" ;;
  stop|quit) echo "bye" ;;
  *) echo "usage: $0 start|stop" ;;
esac`),
    table('ตัวเทียบใน [[ ]]', ['แบบ', 'ความหมาย'], [
      ['`-eq -ne -lt -le -gt -ge`', 'เทียบ **ตัวเลข**'],
      ['`==` / `!=`', 'เทียบ **string**'],
      ['`-z "$s"` / `-n "$s"`', 'string ว่าง / ไม่ว่าง'],
      ['`-f file` / `-d dir`', 'มีไฟล์ / มีโฟลเดอร์'],
      ['`-e path`', 'มี path นี้อยู่'],
      ['`&&` / `||` / `!`', 'และ / หรือ / ไม่'],
    ]),
    code('ฟังก์ชัน & array', 'bash', `greet() {
  local who="\${1:-world}"      # local = ตัวแปรในฟังก์ชัน
  echo "Hello, $who"
}
greet "Tama"
result=$(greet "Mochi")         # "คืนค่า" ด้วยการ echo

fruits=("apple" "banana" "cherry")
echo "\${fruits[0]}"              # apple
echo "\${#fruits[@]} items"       # 3 items
for f in "\${fruits[@]}"; do echo "$f"; done

declare -A ages=([Tama]=3 [Mochi]=2)   # associative array (bash 4+)
echo "\${ages[Tama]}"`),
    code('Error handling', 'bash', `set -euo pipefail    # error แล้วหยุด / ห้ามใช้ตัวแปรไม่ได้ตั้ง / pipe พังก็นับ

tmp=$(mktemp)
trap 'rm -f "$tmp"' EXIT     # ลบไฟล์ชั่วคราวตอนจบเสมอ

if ! cp data.txt backup/; then
  echo "copy failed" >&2     # ส่งไป stderr
  exit 1
fi

command -v jq >/dev/null || { echo "ต้องติดตั้ง jq ก่อน" >&2; exit 1; }`),
    code('Pipe & redirect', 'bash', `cmd > out.txt          # เขียนทับ
cmd >> out.txt         # ต่อท้าย
cmd 2> err.txt         # เฉพาะ stderr
cmd > all.log 2>&1     # ทั้ง stdout + stderr
cmd < input.txt        # อ่าน input จากไฟล์

# ต่อคำสั่งด้วย pipe |
grep " 500 " access.log | wc -l
cat access.log | awk '{print $1}' | sort | uniq -c | sort -rn | head -5`),
    table('คำสั่งใช้บ่อย', ['คำสั่ง', 'ทำอะไร'], [
      ['`ls -la` / `cd` / `pwd`', 'ดูไฟล์ / ย้ายโฟลเดอร์ / อยู่ไหน'],
      ['`cp -r` / `mv` / `rm -r` / `mkdir -p`', 'copy / ย้าย / ลบ / สร้างโฟลเดอร์'],
      ['`cat` / `less` / `head` / `tail -f`', 'ดูไฟล์ / ดู log สดๆ'],
      ['`grep -rn "text" .`', 'ค้นข้อความในไฟล์'],
      ['`find . -name "*.js"`', 'ค้นไฟล์'],
      ['`sed` / `awk` / `cut`', 'แก้ / ตัดข้อความ'],
      ['`sort` / `uniq -c` / `wc -l`', 'เรียง / นับซ้ำ / นับบรรทัด'],
      ['`xargs`', 'เอา output มาเป็น argument'],
      ['`curl` / `jq`', 'ยิง HTTP / จัดการ JSON'],
      ['`chmod` / `chown`', 'สิทธิ์ไฟล์'],
      ['`ps aux` / `kill` / `top`', 'ดู / ฆ่า process'],
      ['`tar -czf` / `ssh` / `scp`', 'บีบอัด / remote server / ส่งไฟล์'],
    ]),
    code('Mini example: backup script 📦', 'bash', `#!/usr/bin/env bash
set -euo pipefail

SRC="\${1:?usage: backup.sh <folder>}"
DEST="$HOME/backups"
STAMP=$(date +%Y%m%d-%H%M%S)
mkdir -p "$DEST"

FILE="$DEST/$(basename "$SRC")-$STAMP.tar.gz"
tar -czf "$FILE" "$SRC"
echo "✅ backup เสร็จ: $FILE"

# ลบ backup ที่เก่ากว่า 7 วัน
find "$DEST" -name "*.tar.gz" -mtime +7 -delete
ls -lh "$DEST" | tail -n 5`),
    list('Tooling', [
      '**ShellCheck** — lint สคริปต์ จับบั๊กคลาสสิกได้เพียบ (มี extension VS Code)',
      '**shfmt** — จัด format / **bats** — เขียน test ให้ shell script',
      '**cron** — ตั้งเวลารันสคริปต์ (`crontab -e`)',
      'ลงโปรแกรม: `apt` (Ubuntu), `brew` (macOS), `winget` (Windows)',
    ]),
    warn('ใส่ **double quote** ครอบตัวแปรเสมอ: `"$file"` ไม่งั้นชื่อไฟล์ที่มีช่องว่างจะแตกเป็นหลายคำ 💥 (`rm $file` อาจลบผิดไฟล์!)'),
    warn('เขียนสคริปต์บน Windows แล้วไปรันบน Linux เจอ `bad interpreter` / `\\r: command not found` เพราะ line ending เป็น CRLF ให้ตั้ง editor เป็น **LF**\n\nและ `sh` ≠ `bash` นะ syntax อย่าง `[[ ]]` หรือ array ใช้ไม่ได้ใน sh แท้ๆ'),
    tip('ขึ้นต้นสคริปต์ด้วย `set -euo pipefail` ทุกครั้ง + ผ่าน ShellCheck ก่อนใช้จริง ชีวิตจะสงบขึ้นเยอะ 🐚'),
    pairs(['Git', 'Docker', 'SSH', 'cron', 'GitHub Actions', 'Makefile', 'jq', 'curl', 'WSL', 'ShellCheck']),
  ],
}

/* ───────────────────────── 15. HTML & CSS ───────────────────────── */
const htmlCss = {
  id: 'html-css',
  title: 'HTML & CSS',
  emoji: '🎨',
  summary: 'HTML = โครงสร้างหน้าเว็บ, CSS = ความสวยงาม',
  tags: ['html', 'css', 'web', 'frontend', 'flexbox', 'grid', 'responsive', 'semantic'],
  sections: [
    text('คืออะไร ใช้ที่ไหน', '**HTML** (HyperText Markup Language) บอกว่าหน้าเว็บมี "อะไร" — หัวข้อ ย่อหน้า รูป ฟอร์ม 🧱\n\n**CSS** (Cascading Style Sheets) บอกว่า "หน้าตายังไง" — สี ขนาด layout animation 🎨\n\nทั้งคู่ไม่ใช่ภาษาโปรแกรม (ไม่มี logic/loop) แต่เป็นพื้นฐานของเว็บทุกเว็บ ใช้คู่กับ JavaScript'),
    list('ทำงานยังไง', [
      'browser อ่าน HTML → สร้าง **DOM** (tree ของ element)',
      'อ่าน CSS → สร้าง **CSSOM** แล้วรวมกันเป็น render tree',
      '**Layout** (คำนวณตำแหน่ง/ขนาด) → **Paint** (วาด) → **Composite** (ซ้อน layer)',
      'engine: Blink (Chrome/Edge), Gecko (Firefox), WebKit (Safari)',
    ]),
    code('index.html (Hello World)', 'html', `<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Hello</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1>Hello, world! 🌸</h1>
  <p>ยินดีต้อนรับสู่เว็บแรกของฉัน</p>
  <script src="app.js" defer></script>
</body>
</html>`, 'เปิดไฟล์ด้วย browser ได้เลย หรือใช้ VS Code extension "Live Server" / npx serve .'),
    code('Semantic HTML', 'html', `<header>
  <nav><a href="/">Home</a> <a href="/about">About</a></nav>
</header>
<main>
  <article>
    <h2>แมวส้มนอนกลางวัน</h2>
    <p>เนื้อหา <strong>สำคัญ</strong> และ <em>เน้น</em></p>
    <img src="cat.jpg" alt="แมวส้มนอนหลับบนโซฟา" width="400" height="300">
    <ul>
      <li>ข้อ 1</li>
      <li>ข้อ 2</li>
    </ul>
  </article>
</main>
<footer>© 2026 Mochi</footer>`, 'ใช้ tag ให้ตรงความหมาย ดีต่อ SEO และ screen reader มากกว่า div ล้วน'),
    code('Form', 'html', `<form action="/signup" method="post">
  <label for="email">Email</label>
  <input id="email" name="email" type="email" required>

  <label for="pw">Password</label>
  <input id="pw" name="password" type="password" minlength="8" required>

  <label for="role">Role</label>
  <select id="role" name="role">
    <option value="user">User</option>
    <option value="admin">Admin</option>
  </select>

  <label><input type="checkbox" name="news"> รับข่าวสาร</label>
  <button type="submit">สมัคร</button>
</form>`),
    code('CSS พื้นฐาน', 'css', `/* selector { property: value; } */
:root {
  --pink: #ffb7c5;            /* CSS variable */
  --radius: 12px;
}
*, *::before, *::after { box-sizing: border-box; }

body { font-family: system-ui, sans-serif; margin: 0; line-height: 1.6; }
h1 { color: hotpink; font-size: 2rem; }      /* tag */
.card {                                      /* class */
  padding: 16px;
  border-radius: var(--radius);
  background: var(--pink);
  box-shadow: 0 2px 8px rgb(0 0 0 / 0.1);
  transition: transform 0.2s;
}
.card:hover { transform: scale(1.02); }      /* pseudo-class */
#hero { min-height: 60vh; }                  /* id */
.card > p { margin: 0; }                     /* ลูกตรงๆ */`),
    code('Layout: Flexbox & Grid', 'css', `.row {                       /* flex = เรียง 1 มิติ */
  display: flex;
  gap: 12px;
  justify-content: space-between;  /* แกนหลัก */
  align-items: center;             /* แกนขวาง */
  flex-wrap: wrap;
}

.gallery {                   /* grid = 2 มิติ */
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 16px;
}

.center { display: grid; place-items: center; }  /* จัดกลางง่ายสุด */`),
    code('Responsive & dark mode', 'css', `.container { width: min(100% - 32px, 960px); margin-inline: auto; }

@media (max-width: 600px) {
  .row { flex-direction: column; }
}

@media (prefers-color-scheme: dark) {
  body { background: #1e1e2e; color: #eee; }
}

.title { font-size: clamp(1.25rem, 4vw, 2rem); }  /* ขนาดยืดหยุ่น */`),
    table('Properties ใช้บ่อย', ['property', 'ใช้ทำอะไร'], [
      ['`display`', '`block`, `inline`, `flex`, `grid`, `none`'],
      ['`margin` / `padding`', 'ระยะนอกกรอบ / ในกรอบ'],
      ['`width` / `max-width` / `height`', 'ขนาด (`%`, `px`, `rem`, `vw`, `dvh`)'],
      ['`position`', '`relative`, `absolute`, `fixed`, `sticky` + `top/left/...`'],
      ['`color` / `background`', 'สีตัวอักษร / พื้นหลัง'],
      ['`font-size` / `font-weight`', 'ขนาด / ความหนาตัวอักษร (ใช้ `rem`)'],
      ['`border` / `border-radius`', 'เส้นขอบ / มุมโค้ง'],
      ['`gap`', 'ระยะห่างระหว่างลูกใน flex/grid'],
      ['`overflow`', '`hidden`, `auto`, `scroll`'],
      ['`z-index`', 'ลำดับการซ้อน (ต้องมี position หรือ flex/grid item)'],
      ['`transition` / `animation`', 'เคลื่อนไหว'],
    ]),
    table('Specificity (ใครชนะ)', ['selector', 'น้ำหนัก'], [
      ['inline style `style="..."`', 'สูงสุด'],
      ['`#id`', 'สูง (1,0,0)'],
      ['`.class`, `:hover`, `[type="text"]`', 'กลาง (0,1,0)'],
      ['`div`, `p`, `::before`', 'ต่ำ (0,0,1)'],
      ['เท่ากัน', 'ตัวที่เขียนทีหลังชนะ'],
    ]),
    code('Mini example: การ์ดน่ารัก 🐱', 'html', `<div class="pet-card">
  <img src="tama.jpg" alt="แมวชื่อทามะ">
  <h3>Tama</h3>
  <p>อายุ 2 ขวบ ชอบนอนบนคีย์บอร์ด</p>
  <button>รับเลี้ยง 💕</button>
</div>

<style>
  .pet-card {
    max-width: 240px; padding: 16px; text-align: center;
    background: #fff4f7; border-radius: 20px;
    box-shadow: 0 4px 14px rgb(255 150 180 / 0.3);
  }
  .pet-card img { width: 100%; aspect-ratio: 1; object-fit: cover; border-radius: 50%; }
  .pet-card button {
    border: 0; padding: 8px 20px; border-radius: 999px;
    background: #ff8fab; color: white; cursor: pointer;
  }
  .pet-card button:hover { background: #ff6f91; }
</style>`),
    list('Tooling', [
      '**DevTools** (F12) — ดู element, แก้ CSS สดๆ, เช็ก layout',
      '**Tailwind CSS** — เขียน style ผ่าน class (`flex gap-4 p-2`)',
      '**Sass / PostCSS** — CSS ที่มี nesting, mixin (CSS ปัจจุบันก็มี nesting แล้ว)',
      '**Vite** — dev server / **Prettier** — จัด format / **Lighthouse** — วัด performance & a11y',
      '**Emmet** — พิมพ์ `ul>li*3` แล้วกด Tab ได้ HTML ทันที',
      'เช็กว่า browser รองรับไหม: caniuse.com',
    ]),
    warn('ลืม `box-sizing: border-box` → width ไม่รวม padding/border กล่องเลยใหญ่เกิน\n\n**margin collapse**: margin บน-ล่างของ block ที่ติดกันจะรวมกันเหลือค่าที่มากกว่า (ไม่บวกกัน)'),
    warn('`100vh` บนมือถือรวมแถบ address bar ทำให้ล้นจอ ใช้ `100dvh` แทน และใส่ `alt` ให้ `<img>` ทุกรูปนะ (ถ้ารูปตกแต่งใส่ `alt=""`)'),
    tip('อย่าพึ่ง `!important` มันทำให้ CSS ตีกันวุ่น 🙈 ถ้าจะชนะให้ปรับ selector หรือลำดับแทน และเริ่มออกแบบจาก **mobile ก่อน** (mobile-first) แล้วค่อยเพิ่ม `@media (min-width: ...)`'),
    pairs(['JavaScript', 'Tailwind CSS', 'Sass', 'Bootstrap', 'React', 'Vue', 'Vite', 'Figma', 'Emmet']),
  ],
}

/* ───────────────────────── export ───────────────────────── */
export default {
  id: 'languages',
  title: 'ภาษาโปรแกรม',
  emoji: '💬',
  color: '#c3b1e1',
  intro: 'รวมโพยภาษาโปรแกรมยอดฮิต ตั้งแต่ syntax พื้นฐานยันเครื่องมือคู่ใจ เปิดดูได้ทุกเมื่อเลยน้า 💬✨',
  topics: [
    howItWorks,
    javascript,
    typescript,
    python,
    java,
    csharp,
    go,
    php,
    kotlin,
    swift,
    dart,
    rust,
    cpp,
    bash,
    htmlCss,
  ],
}
