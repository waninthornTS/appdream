export default {
  id: 'frameworks',
  title: 'Frameworks',
  emoji: '🧩',
  color: '#b8a9e8',
  intro: 'รวมเฟรมเวิร์กยอดฮิตทั้งหน้าบ้าน หลังบ้าน และมือถือ 🧩 รู้ว่าข้างในทำงานยังไง ใช้คู่กับอะไรดี จะได้เลือกถูกตัวน้า~',
  topics: [
    // ───────────────────────── Overview ─────────────────────────
    {
      id: 'framework-vs-library',
      title: 'Framework vs Library คืออะไร',
      emoji: '🤔',
      summary: 'Library = เราเรียกมัน, Framework = มันเรียกเรา (Inversion of Control)',
      tags: ['overview', 'basic', 'ioc', 'library', 'framework'],
      sections: [
        {
          type: 'text',
          body: '**Library** คือกล่องเครื่องมือ 🧰 เราเป็นคนคุม flow เอง แล้วหยิบฟังก์ชันมาใช้ตอนที่อยากใช้ เช่น `lodash`, `axios`\n\n**Framework** คือบ้านสำเร็จรูป 🏠 มันวางโครงและ flow ไว้ให้แล้ว เราแค่เติมโค้ดลงในช่องที่มันเตรียมไว้ แล้วมันจะ "เรียกโค้ดเรา" เองตอนถึงเวลา',
        },
        {
          type: 'text',
          title: 'หัวใจคือ Inversion of Control (IoC)',
          body: 'ความต่างจริงๆ อยู่ที่ว่า **ใครเป็นคนเรียกใคร** 📞\n\nใช้ library → โค้ดเราเรียก library\nใช้ framework → framework เรียกโค้ดเรา (เช่น เรียก `handler` ตอนมี request เข้ามา)',
        },
        {
          type: 'code',
          title: 'เทียบให้เห็นภาพ',
          lang: 'js',
          code: `// Library: เราคุม flow เอง
import _ from 'lodash'
const unique = _.uniq([1, 2, 2, 3]) // เราเรียกเมื่อไหร่ก็ได้

// Framework: เราแค่ลงทะเบียน แล้วมันเรียกเรา
import express from 'express'
const app = express()
app.get('/hello', (req, res) => {
  res.send('hi!') // Express เป็นคนเรียกฟังก์ชันนี้ตอนมี request
})
app.listen(3000)`,
        },
        {
          type: 'table',
          title: 'สรุปความต่าง',
          headers: ['', 'Library', 'Framework'],
          rows: [
            ['ใครคุม flow', 'เรา', 'Framework'],
            ['ความยืดหยุ่น', 'สูง เลือกเองหมด', 'มีกฎ/โครงสร้างให้ทำตาม'],
            ['เรียนรู้', 'เร็ว ทีละชิ้น', 'ต้องเข้าใจภาพรวม'],
            ['ตัวอย่าง', 'React, lodash, axios', 'Angular, Next.js, Django'],
          ],
        },
        {
          type: 'tip',
          body: 'React เรียกตัวเองว่า **library** สำหรับทำ UI แต่พอใช้ร่วมกับ Next.js หรือ React Router ก็จะกลายเป็น framework เต็มตัว ✨ เส้นแบ่งบางทีก็เบลอๆ นะ',
        },
      ],
    },

    // ───────────────────────── React ─────────────────────────
    {
      id: 'react',
      title: 'React',
      emoji: '⚛️',
      summary: 'UI library จาก Meta ที่คิดแบบ component + state → UI',
      tags: ['frontend', 'javascript', 'react', 'virtual-dom', 'hooks', 'spa'],
      sections: [
        {
          type: 'text',
          body: 'React คือ library สร้าง UI ด้วย **component** 🧱 เราเขียนว่า "ถ้า state เป็นแบบนี้ หน้าตาควรเป็นแบบไหน" (declarative) แล้ว React จัดการอัปเดต DOM ให้เอง\n\nเขียนด้วย **JSX** = HTML ปนใน JavaScript',
        },
        {
          type: 'text',
          title: 'ข้างในทำงานยังไง',
          body: 'ทุกครั้งที่ state เปลี่ยน React จะ **re-render** component นั้นใหม่ ได้ tree ของ element ใหม่ (Virtual DOM) 🌳\n\nจากนั้นทำ **reconciliation** = เทียบ tree ใหม่กับเก่า (diffing) แล้วแก้ DOM จริงเฉพาะจุดที่เปลี่ยน ทำให้เร็ว\n\nเบื้องหลังใช้ **Fiber** แบ่งงาน render เป็นชิ้นเล็กๆ จัดลำดับความสำคัญได้ (concurrent rendering)',
        },
        {
          type: 'code',
          title: 'สร้างโปรเจกต์ด้วย Vite',
          lang: 'shell',
          code: `npm create vite@latest my-app -- --template react-ts
cd my-app
npm install
npm run dev`,
        },
        {
          type: 'code',
          title: 'ตัวอย่าง: ดึงรายชื่อ + ค้นหา',
          lang: 'jsx',
          code: `import { useEffect, useState } from 'react'

export default function UserList() {
  const [users, setUsers] = useState([])
  const [q, setQ] = useState('')

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((r) => r.json())
      .then(setUsers)
  }, []) // [] = รันครั้งเดียวตอน mount

  const shown = users.filter((u) =>
    u.name.toLowerCase().includes(q.toLowerCase())
  )

  return (
    <div>
      <input value={q} onChange={(e) => setQ(e.target.value)} />
      <ul>
        {shown.map((u) => <li key={u.id}>{u.name}</li>)}
      </ul>
    </div>
  )
}`,
          note: 'อย่าลืม `key` ตอน map list เสมอ ช่วยให้ React diff ได้ถูก',
        },
        {
          type: 'list',
          title: 'Key concepts',
          items: [
            '**Component** = ฟังก์ชันที่คืน JSX',
            '**Props** = ข้อมูลที่พ่อส่งให้ลูก (read-only)',
            '**State** (`useState`) = ข้อมูลที่เปลี่ยนแล้ว UI เปลี่ยนตาม',
            '**`useEffect`** = side effect เช่น fetch, subscribe',
            '**`useMemo` / `useCallback`** = จำค่า/ฟังก์ชันไว้ ลด re-render',
            '**Context** = ส่งข้อมูลข้ามหลายชั้นโดยไม่ต้อง prop drilling',
            '**One-way data flow** ข้อมูลไหลจากบนลงล่าง',
          ],
        },
        {
          type: 'pairs',
          title: 'ใช้คู่กับ',
          items: ['Vite', 'React Router', 'Zustand', 'Redux Toolkit', 'TanStack Query', 'Tailwind CSS', 'shadcn/ui', 'React Hook Form', 'Zod', 'Vitest', 'Vercel', 'Netlify'],
        },
        {
          type: 'tip',
          body: 'ข้อมูลจาก server ใช้ **TanStack Query** ส่วน state ฝั่ง UI ใช้ `useState` หรือ **Zustand** แยกกันแบบนี้ชีวิตง่ายขึ้นเยอะเลย 🍰',
        },
      ],
    },

    // ───────────────────────── Next.js ─────────────────────────
    {
      id: 'nextjs',
      title: 'Next.js',
      emoji: '▲',
      summary: 'React framework ครบวงจร: SSR, SSG, routing, API ในที่เดียว',
      tags: ['frontend', 'fullstack', 'react', 'ssr', 'ssg', 'vercel'],
      sections: [
        {
          type: 'text',
          body: 'Next.js คือ framework ที่ห่อ React ให้พร้อมขึ้น production 🚀 มี file-based routing, render ฝั่ง server, ทำ API ได้ และ optimize รูป/ฟอนต์ให้ในตัว ทำโดย Vercel',
        },
        {
          type: 'text',
          title: 'ข้างในทำงานยังไง',
          body: '**SSR** (Server-Side Rendering) = render HTML บน server ทุก request → SEO ดี ข้อมูลสดใหม่\n\n**SSG** (Static Site Generation) = render ตอน build ครั้งเดียว ได้ไฟล์ HTML นิ่งๆ → เร็วมาก\n\n**ISR** = SSG แต่ revalidate ใหม่ตามเวลาที่กำหนด\n\nใน **App Router** ทุก component เป็น **Server Component** โดย default (รันบน server ไม่ส่ง JS ไป browser) ถ้าต้องการ state/event ค่อยใส่ `\'use client\'` 💡\n\nฝั่ง browser จะ **hydrate** = ผูก event ให้ HTML ที่ได้จาก server',
        },
        {
          type: 'code',
          title: 'สร้างโปรเจกต์',
          lang: 'shell',
          code: `npx create-next-app@latest my-app
cd my-app
npm run dev`,
        },
        {
          type: 'code',
          title: 'ตัวอย่าง: Server Component + Route Handler',
          lang: 'tsx',
          code: `// app/posts/page.tsx  →  URL: /posts
export const revalidate = 60 // ISR: สร้างใหม่ทุก 60 วิ

export default async function PostsPage() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts')
  const posts: { id: number; title: string }[] = await res.json()
  return (
    <ul>
      {posts.slice(0, 5).map((p) => <li key={p.id}>{p.title}</li>)}
    </ul>
  )
}

// app/api/hello/route.ts  →  GET /api/hello
export async function GET() {
  return Response.json({ message: 'hello from Next!' })
}`,
          note: 'Server Component ใช้ `async/await` ตรงๆ ได้เลย ไม่ต้อง `useEffect`',
        },
        {
          type: 'list',
          title: 'Key concepts',
          items: [
            '**File-based routing** โฟลเดอร์ใน `app/` = URL',
            '`page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx` ไฟล์พิเศษ',
            '**Server vs Client Components** (`\'use client\'`)',
            '**Server Actions** เรียกฟังก์ชันบน server จาก form ได้ตรงๆ',
            '**Dynamic route** `app/posts/[id]/page.tsx`',
            '**Middleware** ดัก request ก่อนถึงหน้า',
            '`next/image`, `next/font` optimize ให้อัตโนมัติ',
          ],
        },
        {
          type: 'pairs',
          title: 'ใช้คู่กับ',
          items: ['Vercel', 'Tailwind CSS', 'shadcn/ui', 'Prisma', 'Drizzle ORM', 'PostgreSQL', 'Supabase', 'Auth.js', 'Clerk', 'TanStack Query', 'Zod'],
        },
        {
          type: 'warn',
          body: 'ห้ามใช้ `useState`, `onClick` ใน Server Component นะ! ต้องแยกเป็น Client Component ที่มี `\'use client\'` บรรทัดแรก',
        },
      ],
    },

    // ───────────────────────── Vue ─────────────────────────
    {
      id: 'vue',
      title: 'Vue',
      emoji: '💚',
      summary: 'Progressive framework เรียนง่าย มีระบบ reactivity อัตโนมัติ',
      tags: ['frontend', 'javascript', 'vue', 'reactivity', 'sfc'],
      sections: [
        {
          type: 'text',
          body: 'Vue เป็น frontend framework ที่ขึ้นชื่อเรื่อง **เรียนง่าย** 🌱 เขียนเป็น Single-File Component (`.vue`) ที่มี `<template>`, `<script>`, `<style>` อยู่ในไฟล์เดียว\n\n"Progressive" = ค่อยๆ ใช้เพิ่มได้ จะใส่แค่บางส่วนของหน้าหรือทำทั้ง SPA ก็ได้',
        },
        {
          type: 'text',
          title: 'ข้างในทำงานยังไง',
          body: 'Vue 3 ใช้ **reactivity system** ที่สร้างจาก JavaScript `Proxy` 🪄 ตอน render มันจะ "แอบจด" ว่า component ไหนอ่านค่าอะไร (track) พอค่านั้นเปลี่ยน มันรู้เลยว่าต้อง re-render ใครบ้าง (trigger)\n\nเลยไม่ต้องเรียก `setState` เอง แค่แก้ค่าตรงๆ ก็พอ\n\nแล้วก็ใช้ Virtual DOM + compiler ที่ช่วย optimize (รู้ว่าส่วนไหนนิ่ง ส่วนไหนเปลี่ยนได้)',
        },
        {
          type: 'code',
          title: 'สร้างโปรเจกต์',
          lang: 'shell',
          code: `npm create vue@latest
cd my-vue-app
npm install
npm run dev`,
        },
        {
          type: 'code',
          title: 'ตัวอย่าง: Todo เล็กๆ (Composition API)',
          lang: 'vue',
          code: `<script setup>
import { ref, computed } from 'vue'

const todos = ref([])
const text = ref('')
const left = computed(() => todos.value.filter((t) => !t.done).length)

function add() {
  if (!text.value.trim()) return
  todos.value.push({ id: Date.now(), text: text.value, done: false })
  text.value = ''
}
</script>

<template>
  <input v-model="text" @keyup.enter="add" placeholder="ทำอะไรดี?" />
  <p>เหลือ {{ left }} งาน</p>
  <ul>
    <li v-for="t in todos" :key="t.id">
      <input type="checkbox" v-model="t.done" /> {{ t.text }}
    </li>
  </ul>
</template>`,
          note: 'ใน `<script>` ต้องใช้ `.value` แต่ใน `<template>` Vue แกะให้อัตโนมัติ',
        },
        {
          type: 'list',
          title: 'Key concepts',
          items: [
            '`ref()` / `reactive()` สร้างค่าที่ reactive',
            '`computed()` ค่าที่คำนวณจากค่าอื่น (cache ให้)',
            '`watch()` ทำอะไรบางอย่างเมื่อค่าเปลี่ยน',
            'Directives: `v-if`, `v-for`, `v-model`, `v-bind` (`:`), `v-on` (`@`)',
            '**Props / Emits** สื่อสารพ่อ-ลูก',
            '**Composables** = ฟังก์ชัน reuse logic (คล้าย custom hooks)',
          ],
        },
        {
          type: 'pairs',
          title: 'ใช้คู่กับ',
          items: ['Vite', 'Vue Router', 'Pinia', 'Nuxt', 'VueUse', 'Tailwind CSS', 'Vuetify', 'PrimeVue', 'Vitest', 'Netlify'],
        },
        {
          type: 'tip',
          body: 'อยากได้ SSR/SSG แบบ Next.js แต่เป็นสาย Vue → ใช้ **Nuxt** เลยจ้า 💚',
        },
      ],
    },

    // ───────────────────────── Angular ─────────────────────────
    {
      id: 'angular',
      title: 'Angular',
      emoji: '🅰️',
      summary: 'Framework เต็มตัวจาก Google มีครบ: DI, router, forms, HTTP',
      tags: ['frontend', 'typescript', 'angular', 'di', 'signals', 'enterprise'],
      sections: [
        {
          type: 'text',
          body: 'Angular คือ frontend framework แบบ **batteries included** 🔋 ใช้ TypeScript เป็นหลัก มี router, form, HTTP client, testing มาให้ครบ โครงสร้างชัด เหมาะกับทีมใหญ่และงาน enterprise',
        },
        {
          type: 'text',
          title: 'ข้างในทำงานยังไง',
          body: '**Dependency Injection (DI)** 💉 = เราไม่ `new` service เอง แต่ขอให้ Angular "ฉีด" มาให้ ทำให้ test ง่ายและแชร์ instance ได้\n\n**Change detection** เดิมใช้ Zone.js คอยดักทุก async event แล้วเช็คทั้ง tree ว่าอะไรเปลี่ยน\n\nเวอร์ชันใหม่มี **Signals** = ค่า reactive ที่รู้ว่าใครใช้ตัวเอง อัปเดตเฉพาะจุดได้แม่นขึ้น และรองรับ zoneless แล้ว\n\nTemplate ถูก compile ล่วงหน้า (AOT) เป็นโค้ด JS ที่สร้าง/อัปเดต DOM ตรงๆ',
        },
        {
          type: 'code',
          title: 'สร้างโปรเจกต์',
          lang: 'shell',
          code: `npm install -g @angular/cli
ng new my-app
cd my-app
ng serve
# สร้าง component / service
ng generate component todo-list
ng generate service todo`,
        },
        {
          type: 'code',
          title: 'ตัวอย่าง: Service + Component + Signals',
          lang: 'ts',
          code: `import { Component, Injectable, inject, signal, computed } from '@angular/core'

@Injectable({ providedIn: 'root' }) // singleton ทั้งแอป
export class CartService {
  items = signal<string[]>([])
  count = computed(() => this.items().length)
  add(item: string) {
    this.items.update((list) => [...list, item])
  }
}

@Component({
  selector: 'app-shop',
  template: '<button (click)="buy()">ซื้อ 🍓</button> <p>ในตะกร้า: {{ cart.count() }}</p>',
})
export class ShopComponent {
  cart = inject(CartService) // DI ฉีด service ให้
  buy() {
    this.cart.add('strawberry')
  }
}`,
        },
        {
          type: 'list',
          title: 'Key concepts',
          items: [
            '**Component** = class + template + style',
            '**Service + DI** แชร์ logic/ข้อมูล ข้าม component',
            '**Signals** (`signal`, `computed`, `effect`)',
            '**RxJS / Observable** สำหรับ stream เช่น HTTP',
            'Template syntax: `{{ }}`, `[prop]`, `(event)`, `@if`, `@for`',
            '**Standalone components** ไม่ต้องมี NgModule แล้ว',
            '**Reactive Forms** จัดการฟอร์มซับซ้อน',
          ],
        },
        {
          type: 'pairs',
          title: 'ใช้คู่กับ',
          items: ['Angular Material', 'RxJS', 'NgRx', 'Angular Router', 'HttpClient', 'Tailwind CSS', 'Jest', 'Spring Boot', 'ASP.NET Core', 'Firebase'],
        },
        {
          type: 'tip',
          body: 'งานใหม่ๆ ลองใช้ **Signals** แทน RxJS สำหรับ state ธรรมดา โค้ดอ่านง่ายขึ้นเยอะ ส่วน RxJS เก็บไว้ใช้กับ stream/async ซับซ้อน 🌊',
        },
      ],
    },

    // ───────────────────────── Svelte ─────────────────────────
    {
      id: 'svelte',
      title: 'Svelte',
      emoji: '🧡',
      summary: 'Compiler ที่แปลง component เป็น JS เล็กจิ๋ว ไม่มี Virtual DOM',
      tags: ['frontend', 'javascript', 'svelte', 'compiler', 'runes', 'sveltekit'],
      sections: [
        {
          type: 'text',
          body: 'Svelte ต่างจากเพื่อนตรงที่เป็น **compiler** 🛠️ ทำงานหนักตอน build แปลง component เป็น JavaScript ธรรมดาที่แก้ DOM ตรงๆ เลยได้ bundle เล็กและเร็วมาก โค้ดสั้น อ่านง่ายเหมือน HTML',
        },
        {
          type: 'text',
          title: 'ข้างในทำงานยังไง',
          body: '**ไม่มี Virtual DOM** ✨ compiler วิเคราะห์ล่วงหน้าว่าตัวแปรไหนผูกกับ DOM ตรงไหน แล้วสร้างโค้ดที่อัปเดตเฉพาะจุดนั้น\n\nSvelte 5 ใช้ **Runes** (`$state`, `$derived`, `$effect`) ซึ่งข้างในเป็นระบบ **signals** = fine-grained reactivity ค่าเปลี่ยนเมื่อไหร่ก็อัปเดตเฉพาะ DOM ที่ใช้ค่านั้น',
        },
        {
          type: 'code',
          title: 'สร้างโปรเจกต์ (SvelteKit)',
          lang: 'shell',
          code: `npx sv create my-app
cd my-app
npm install
npm run dev`,
        },
        {
          type: 'code',
          title: 'ตัวอย่าง: ตัวนับ + รายการ (Svelte 5)',
          lang: 'svelte',
          code: `<script>
  let count = $state(0)
  let doubled = $derived(count * 2)
  let fruits = $state(['🍎', '🍌'])

  $effect(() => {
    console.log('count เปลี่ยนเป็น', count)
  })
</script>

<button onclick={() => count++}>กดแล้ว {count} ครั้ง</button>
<p>สองเท่า = {doubled}</p>

<button onclick={() => fruits.push('🍇')}>เพิ่มผลไม้</button>
{#each fruits as f}
  <span>{f}</span>
{/each}

<style>
  button { border-radius: 12px; } /* scoped อัตโนมัติ */
</style>`,
        },
        {
          type: 'list',
          title: 'Key concepts',
          items: [
            '**Runes**: `$state`, `$derived`, `$effect`, `$props`',
            'Template: `{#if}`, `{#each}`, `{#await}`',
            '**Scoped CSS** ใน `<style>` ไม่รั่วไปที่อื่น',
            '**Stores** แชร์ state ข้าม component',
            '**SvelteKit** = meta-framework (routing, SSR, `+page.svelte`, `+page.server.js`)',
          ],
        },
        {
          type: 'pairs',
          title: 'ใช้คู่กับ',
          items: ['SvelteKit', 'Vite', 'Tailwind CSS', 'Skeleton UI', 'Drizzle ORM', 'Supabase', 'Vercel', 'Cloudflare Pages', 'Vitest'],
        },
      ],
    },

    // ───────────────────────── Tailwind CSS ─────────────────────────
    {
      id: 'tailwind',
      title: 'Tailwind CSS',
      emoji: '🌬️',
      summary: 'Utility-first CSS: แต่งด้วย class เล็กๆ ตรงใน HTML',
      tags: ['frontend', 'css', 'tailwind', 'utility-first', 'styling'],
      sections: [
        {
          type: 'text',
          body: 'Tailwind คือ CSS framework แบบ **utility-first** 🎨 แทนที่จะเขียน CSS แยก เราใส่ class เล็กๆ ที่ทำหน้าที่เดียว เช่น `p-4` (padding), `text-pink-500`, `rounded-xl` ลงไปใน HTML ตรงๆ\n\nไม่ต้องคิดชื่อ class อีกต่อไป เย้!',
        },
        {
          type: 'text',
          title: 'ข้างในทำงานยังไง',
          body: 'Tailwind จะ **สแกนไฟล์โค้ด** ของเราหา class name ที่ใช้จริง แล้ว generate CSS เฉพาะตัวนั้นออกมา 🔍 ไฟล์ CSS เลยเล็กมาก\n\nมี design system ในตัว (spacing, สี, ขนาดฟอนต์) ทำให้ทั้งแอปดูเข้ากัน\n\nv4 ตั้งค่าผ่าน CSS ได้เลย (`@theme`) และ engine ใหม่เร็วขึ้นมาก',
        },
        {
          type: 'code',
          title: 'ติดตั้งกับ Vite (v4)',
          lang: 'shell',
          code: `npm install tailwindcss @tailwindcss/vite`,
        },
        {
          type: 'code',
          title: 'ตั้งค่า',
          lang: 'js',
          code: `// vite.config.js
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [tailwindcss()],
})

/* src/index.css */
/* @import "tailwindcss"; */`,
          note: 'ในไฟล์ CSS หลักใส่แค่ `@import "tailwindcss";` บรรทัดเดียวพอ',
        },
        {
          type: 'code',
          title: 'ตัวอย่าง: การ์ดน่ารักๆ',
          lang: 'jsx',
          code: `export function Card() {
  return (
    <div className="max-w-sm rounded-2xl bg-pink-50 p-6 shadow-md
                    hover:shadow-lg transition dark:bg-slate-800">
      <h2 className="text-xl font-bold text-pink-600">สวัสดี 🌸</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
        การ์ดนี้แต่งด้วย Tailwind ล้วนๆ
      </p>
      <button className="mt-4 w-full rounded-full bg-pink-400 py-2
                         text-white hover:bg-pink-500 md:w-auto md:px-6">
        กดเลย
      </button>
    </div>
  )
}`,
        },
        {
          type: 'list',
          title: 'Key concepts',
          items: [
            '**Utility class** หนึ่ง class ทำหนึ่งอย่าง',
            '**Responsive prefix** `sm:`, `md:`, `lg:` (mobile-first)',
            '**State variant** `hover:`, `focus:`, `active:`, `disabled:`',
            '**Dark mode** `dark:`',
            '**Arbitrary value** `w-[137px]`, `bg-[#ffc0cb]`',
            '`@theme` ใน CSS ใช้กำหนดสี/ฟอนต์ของเราเอง',
          ],
        },
        {
          type: 'pairs',
          title: 'ใช้คู่กับ',
          items: ['React', 'Next.js', 'Vue', 'Svelte', 'shadcn/ui', 'daisyUI', 'Headless UI', 'clsx', 'tailwind-merge', 'Prettier plugin'],
        },
        {
          type: 'warn',
          body: 'อย่าต่อ class แบบ dynamic เช่น `bg-${color}-500` เพราะ Tailwind สแกนไม่เจอ! ให้เขียน class เต็มๆ แล้วเลือกด้วย object map แทน',
        },
      ],
    },

    // ───────────────────────── Express ─────────────────────────
    {
      id: 'express',
      title: 'Express (Node.js)',
      emoji: '🚂',
      summary: 'Web framework มินิมอลของ Node.js หัวใจคือ middleware',
      tags: ['backend', 'javascript', 'nodejs', 'express', 'middleware', 'api'],
      sections: [
        {
          type: 'text',
          body: 'Express คือ backend framework ที่เล็กและยืดหยุ่นที่สุดตัวหนึ่งของ Node.js 🚂 ไม่บังคับโครงสร้าง อยากต่ออะไรก็ต่อเอง เหมาะกับทำ REST API เร็วๆ',
        },
        {
          type: 'text',
          title: 'ข้างในทำงานยังไง',
          body: 'ทุก request จะวิ่งผ่าน **middleware chain** เหมือนสายพาน 🏭 แต่ละ middleware คือฟังก์ชัน `(req, res, next)` จะแก้ `req`, ตอบกลับเลย หรือเรียก `next()` ส่งต่อตัวถัดไปก็ได้\n\nลำดับที่ `app.use()` สำคัญมาก! อันที่ลงทะเบียนก่อนทำงานก่อน\n\nNode.js รันแบบ single-thread + event loop จึงรับ request พร้อมกันได้เยอะ ถ้าไม่มีงาน CPU หนักๆ บล็อก',
        },
        {
          type: 'code',
          title: 'สร้างโปรเจกต์',
          lang: 'shell',
          code: `mkdir my-api && cd my-api
npm init -y
npm install express
node --watch server.js`,
        },
        {
          type: 'code',
          title: 'ตัวอย่าง: REST API เล็กๆ',
          lang: 'js',
          code: `import express from 'express'

const app = express()
app.use(express.json()) // แปลง body JSON → req.body
const todos = [{ id: 1, title: 'ให้อาหารแมว', done: false }]

app.get('/todos', (req, res) => res.json(todos))
app.get('/todos/:id', (req, res) => {
  const todo = todos.find((t) => t.id === Number(req.params.id))
  if (!todo) return res.status(404).json({ error: 'not found' })
  res.json(todo)
})

app.post('/todos', (req, res) => {
  const todo = { id: Date.now(), title: req.body.title, done: false }
  todos.push(todo)
  res.status(201).json(todo)
})

// error handler ต้องมี 4 พารามิเตอร์
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message })
})

app.listen(3000, () => console.log('API on http://localhost:3000'))`,
          note: 'ใช้ `import` ได้ต้องใส่ `"type": "module"` ใน package.json',
        },
        {
          type: 'list',
          title: 'Key concepts',
          items: [
            '**Middleware** `(req, res, next)` ทำงานเรียงตามลำดับ',
            '**Routing** `app.get/post/put/delete`, `express.Router()`',
            '**Route params** `req.params`, **query** `req.query`, **body** `req.body`',
            '**Error-handling middleware** มี 4 args `(err, req, res, next)`',
            '`express.static()` เสิร์ฟไฟล์ static',
          ],
        },
        {
          type: 'pairs',
          title: 'ใช้คู่กับ',
          items: ['Prisma', 'Mongoose', 'MongoDB', 'PostgreSQL', 'Redis', 'Zod', 'cors', 'helmet', 'jsonwebtoken', 'Passport.js', 'Docker', 'Railway', 'Render'],
        },
        {
          type: 'tip',
          body: 'ใส่ `helmet()` กับ `cors()` เป็น middleware ตั้งแต่แรก ได้ความปลอดภัยพื้นฐานฟรีๆ 🛡️ ถ้าโปรเจกต์ใหญ่ขึ้นแล้วอยากได้โครงสร้างชัด ลองดู **NestJS**',
        },
      ],
    },

    // ───────────────────────── NestJS ─────────────────────────
    {
      id: 'nestjs',
      title: 'NestJS',
      emoji: '🐈',
      summary: 'Node.js framework โครงสร้างแน่น ใช้ TypeScript + DI แบบ Angular',
      tags: ['backend', 'typescript', 'nodejs', 'nestjs', 'di', 'decorators'],
      sections: [
        {
          type: 'text',
          body: 'NestJS คือ backend framework บน Node.js ที่เอาแนวคิดของ Angular มาใช้ 🐈 มี **Module / Controller / Service** ชัดเจน ใช้ decorator และ TypeScript เต็มรูปแบบ เหมาะกับโปรเจกต์ใหญ่ที่ต้องดูแลยาวๆ\n\nข้างใต้ยังใช้ Express (หรือ Fastify) เป็น HTTP engine อยู่',
        },
        {
          type: 'text',
          title: 'ข้างในทำงานยังไง',
          body: '**DI Container** 💉 ตอนเริ่มแอป Nest อ่าน decorator ทุกตัว แล้วสร้าง instance ของ provider (service) ให้ และฉีดเข้า constructor ของ class ที่ต้องการ\n\n**Request lifecycle**:\nMiddleware → Guard (เช็คสิทธิ์) → Interceptor (ก่อน) → Pipe (validate/แปลง) → Controller → Service → Interceptor (หลัง) → Exception filter (ถ้า error)',
        },
        {
          type: 'code',
          title: 'สร้างโปรเจกต์',
          lang: 'shell',
          code: `npm i -g @nestjs/cli
nest new my-api
cd my-api
npm run start:dev
# generate resource ครบชุด (module+controller+service)
nest g resource cats`,
        },
        {
          type: 'code',
          title: 'ตัวอย่าง: Controller + Service',
          lang: 'ts',
          code: `import { Controller, Get, Param, ParseIntPipe,
  Injectable, NotFoundException } from '@nestjs/common'

@Injectable()
export class CatsService {
  private cats = [{ id: 1, name: 'Mochi' }]
  findAll() { return this.cats }
  findOne(id: number) {
    const cat = this.cats.find((c) => c.id === id)
    if (!cat) throw new NotFoundException('ไม่เจอเหมียว')
    return cat
  }
}

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {} // DI
  @Get() findAll() { return this.catsService.findAll() }
  @Get(':id') findOne(@Param('id', ParseIntPipe) id: number) {
    return this.catsService.findOne(id)
  }
}`,
          note: 'อย่าลืมใส่ทั้งสองตัวใน `@Module({ controllers: [...], providers: [...] })`',
        },
        {
          type: 'list',
          title: 'Key concepts',
          items: [
            '**Module** จัดกลุ่ม feature',
            '**Controller** รับ request, **Service/Provider** ทำ business logic',
            '**Guard** = auth/สิทธิ์, **Pipe** = validate, **Interceptor** = แปลง response/log',
            '**DTO + class-validator** ตรวจ body อัตโนมัติ',
            'รองรับ GraphQL, WebSocket, Microservices ในตัว',
          ],
        },
        {
          type: 'pairs',
          title: 'ใช้คู่กับ',
          items: ['TypeORM', 'Prisma', 'PostgreSQL', 'MongoDB', 'Redis', 'class-validator', 'Passport', 'JWT', 'Swagger', 'BullMQ', 'Docker'],
        },
      ],
    },

    // ───────────────────────── Django ─────────────────────────
    {
      id: 'django',
      title: 'Django',
      emoji: '🐍',
      summary: 'Python framework "batteries included" มี ORM, admin, auth ครบ',
      tags: ['backend', 'python', 'django', 'mvt', 'orm', 'admin'],
      sections: [
        {
          type: 'text',
          body: 'Django คือ Python web framework ที่ให้มา **ครบเซ็ต** 🎁 มี ORM, ระบบ login, หน้า admin สำเร็จรูป, form, migration พร้อมใช้ ทำเว็บได้ไวมาก เหมาะกับแอปที่มีข้อมูลเยอะๆ',
        },
        {
          type: 'text',
          title: 'ข้างในทำงานยังไง',
          body: 'ใช้แพทเทิร์น **MVT** (Model–View–Template) ซึ่งก็คือ MVC เวอร์ชัน Django\n\n**Request lifecycle** 🔄\nRequest → Middleware → URL resolver (`urls.py`) → View → Model (ORM คุยกับ DB) → Template/JSON → Middleware → Response\n\nORM แปลง Python class เป็นตารางใน DB และ query แบบ lazy (ยังไม่ยิง SQL จนกว่าจะใช้ข้อมูลจริง)',
        },
        {
          type: 'code',
          title: 'สร้างโปรเจกต์',
          lang: 'shell',
          code: `python -m venv .venv
source .venv/bin/activate   # Windows: .venv\\Scripts\\activate
pip install django
django-admin startproject mysite .
python manage.py startapp blog
python manage.py migrate
python manage.py runserver`,
        },
        {
          type: 'code',
          title: 'ตัวอย่าง: Model → View → URL',
          lang: 'python',
          code: `# blog/models.py
from django.db import models

class Post(models.Model):
    title = models.CharField(max_length=200)
    body = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

# blog/views.py
from django.http import JsonResponse
from .models import Post

def post_list(request):
    posts = Post.objects.order_by("-created_at").values("id", "title")[:10]
    return JsonResponse({"posts": list(posts)})

# mysite/urls.py
from django.urls import path
from blog.views import post_list

urlpatterns = [path("posts/", post_list)]`,
          note: 'เพิ่ม `"blog"` ใน `INSTALLED_APPS` แล้วรัน `makemigrations` + `migrate`',
        },
        {
          type: 'list',
          title: 'Key concepts',
          items: [
            '**Project vs App** โปรเจกต์มีหลาย app ได้',
            '**Model + Migration** (`makemigrations`, `migrate`)',
            '**QuerySet** `filter()`, `exclude()`, `select_related()`',
            '**Django Admin** หน้าจัดการข้อมูลฟรีๆ',
            '**Middleware**, **Template**, **Forms**',
            'มี CSRF / XSS / SQL injection protection ในตัว',
          ],
        },
        {
          type: 'pairs',
          title: 'ใช้คู่กับ',
          items: ['Django REST Framework', 'PostgreSQL', 'Celery', 'Redis', 'Gunicorn', 'Nginx', 'HTMX', 'React', 'Docker', 'pytest-django'],
        },
        {
          type: 'tip',
          body: 'ทำ API ใช้ **Django REST Framework (DRF)** แทบทุกคนเลย ✨ และอย่าลืม `select_related` / `prefetch_related` กันปัญหา N+1 query นะ',
        },
      ],
    },

    // ───────────────────────── FastAPI ─────────────────────────
    {
      id: 'fastapi',
      title: 'FastAPI',
      emoji: '⚡',
      summary: 'Python API framework เร็ว async ใช้ type hints สร้าง docs ให้อัตโนมัติ',
      tags: ['backend', 'python', 'fastapi', 'async', 'pydantic', 'openapi'],
      sections: [
        {
          type: 'text',
          body: 'FastAPI คือ Python framework สำหรับทำ API ที่ **เร็วทั้งตอนรันและตอนเขียน** ⚡ แค่ใส่ type hints ก็ได้ validation + เอกสาร Swagger อัตโนมัติที่ `/docs` ฮิตมากในงาน AI/ML',
        },
        {
          type: 'text',
          title: 'ข้างในทำงานยังไง',
          body: 'สร้างบน **Starlette** (ส่วน web, ASGI) + **Pydantic** (ส่วน validate ข้อมูล) 🧪\n\nรันบน ASGI server อย่าง **Uvicorn** รองรับ `async/await` เลยรอ I/O (DB, HTTP) พร้อมกันได้หลาย request\n\nFastAPI อ่าน type hints ของฟังก์ชัน → รู้ว่าค่าไหนมาจาก path/query/body → validate ให้ → สร้าง OpenAPI schema\n\nมีระบบ **Dependency Injection** ผ่าน `Depends()`',
        },
        {
          type: 'code',
          title: 'ติดตั้ง + รัน',
          lang: 'shell',
          code: `pip install "fastapi[standard]"
fastapi dev main.py
# เปิด http://127.0.0.1:8000/docs ได้ Swagger UI เลย`,
        },
        {
          type: 'code',
          title: 'ตัวอย่าง: CRUD + Depends',
          lang: 'python',
          code: `from fastapi import FastAPI, HTTPException, Depends, Header
from pydantic import BaseModel, Field

app = FastAPI()

class Item(BaseModel):
    name: str
    price: float = Field(gt=0)

items: dict[int, Item] = {}

def require_key(x_api_key: str = Header()):
    if x_api_key != "secret":
        raise HTTPException(status_code=401, detail="bad key")

@app.get("/items/{item_id}")
async def get_item(item_id: int):
    if item_id not in items:
        raise HTTPException(status_code=404, detail="not found")
    return items[item_id]

@app.post("/items/{item_id}", status_code=201, dependencies=[Depends(require_key)])
async def create_item(item_id: int, item: Item):
    items[item_id] = item
    return item`,
          note: 'ถ้าส่ง `price` ติดลบ FastAPI ตอบ 422 พร้อมบอกเหตุผลให้เอง',
        },
        {
          type: 'list',
          title: 'Key concepts',
          items: [
            '**Path / Query / Body params** แยกจาก type hints',
            '**Pydantic model** = schema + validation',
            '**`Depends()`** DI สำหรับ DB session, auth ฯลฯ',
            '**async def** สำหรับ I/O-bound',
            'Auto docs: `/docs` (Swagger), `/redoc`',
            '**BackgroundTasks**, **WebSocket** รองรับในตัว',
          ],
        },
        {
          type: 'pairs',
          title: 'ใช้คู่กับ',
          items: ['Uvicorn', 'Pydantic', 'SQLAlchemy', 'SQLModel', 'Alembic', 'PostgreSQL', 'Redis', 'Celery', 'Docker', 'pytest', 'httpx'],
        },
        {
          type: 'warn',
          body: 'ใน `async def` ห้ามเรียกโค้ดที่บล็อก (เช่น `requests.get`, `time.sleep`) เพราะจะหยุดทั้ง event loop! ใช้ `httpx.AsyncClient` หรือเปลี่ยนเป็น `def` ธรรมดาแทน',
        },
      ],
    },

    // ───────────────────────── Flask ─────────────────────────
    {
      id: 'flask',
      title: 'Flask',
      emoji: '🧪',
      summary: 'Python micro-framework เบาๆ เริ่มง่าย เติมของเองได้ตามใจ',
      tags: ['backend', 'python', 'flask', 'micro-framework', 'wsgi'],
      sections: [
        {
          type: 'text',
          body: 'Flask คือ **micro-framework** ของ Python 🧪 ตัวหลักมีแค่ routing + template (Jinja2) ที่เหลือเลือกเติม extension เอง เหมาะกับแอปเล็ก-กลาง, prototype, หรือห่อโมเดล ML เป็น API',
        },
        {
          type: 'text',
          title: 'ข้างในทำงานยังไง',
          body: 'Flask เป็นแอป **WSGI** (synchronous) สร้างบน Werkzeug 🔧\n\nตอนมี request เข้ามา Flask จะ push **application context** และ **request context** ทำให้เราเรียก `request`, `g`, `session` แบบ global ได้ทั้งที่จริงๆ แยกตาม request\n\nจากนั้นจับคู่ URL กับฟังก์ชันที่ลงทะเบียนด้วย `@app.route` แล้วเรียกฟังก์ชันนั้น',
        },
        {
          type: 'code',
          title: 'ติดตั้ง + รัน',
          lang: 'shell',
          code: `pip install flask
flask --app app run --debug`,
        },
        {
          type: 'code',
          title: 'ตัวอย่าง: JSON API',
          lang: 'python',
          code: `from flask import Flask, jsonify, request, abort

app = Flask(__name__)
notes = []

@app.get("/notes")
def list_notes():
    return jsonify(notes)

@app.post("/notes")
def add_note():
    data = request.get_json()
    if not data or "text" not in data:
        abort(400, description="ต้องมี text")
    note = {"id": len(notes) + 1, "text": data["text"]}
    notes.append(note)
    return jsonify(note), 201

@app.errorhandler(400)
def bad_request(e):
    return jsonify(error=e.description), 400`,
        },
        {
          type: 'list',
          title: 'Key concepts',
          items: [
            '`@app.route` / `@app.get` / `@app.post`',
            '`request`, `session`, `g` (context locals)',
            '**Blueprint** แบ่งแอปเป็นส่วนๆ',
            '**Jinja2** template',
            '**Application factory** `create_app()` สำหรับแอปใหญ่',
          ],
        },
        {
          type: 'pairs',
          title: 'ใช้คู่กับ',
          items: ['Flask-SQLAlchemy', 'Flask-Migrate', 'Flask-Login', 'Marshmallow', 'PostgreSQL', 'SQLite', 'Gunicorn', 'Nginx', 'Docker'],
        },
        {
          type: 'tip',
          body: 'Production อย่ารันด้วย `flask run` นะ ใช้ **Gunicorn** เช่น `gunicorn -w 4 "app:app"` แล้ววาง Nginx ไว้หน้า 🛡️',
        },
      ],
    },

    // ───────────────────────── Spring Boot ─────────────────────────
    {
      id: 'spring-boot',
      title: 'Spring Boot',
      emoji: '🍃',
      summary: 'Java/Kotlin framework ระดับ enterprise ตั้งค่าน้อย มี DI เป็นหัวใจ',
      tags: ['backend', 'java', 'kotlin', 'spring', 'di', 'ioc', 'enterprise'],
      sections: [
        {
          type: 'text',
          body: 'Spring Boot ทำให้ใช้ Spring Framework ได้ง่ายแบบ **convention over configuration** 🍃 แค่ใส่ dependency มันก็ตั้งค่าให้อัตโนมัติ มี web server (Tomcat) ฝังมาในตัว รันเป็น jar เดียวจบ นิยมมากในธนาคารและองค์กรใหญ่',
        },
        {
          type: 'text',
          title: 'ข้างในทำงานยังไง',
          body: '**IoC Container** (ApplicationContext) 📦 ตอนเริ่ม Spring สแกนหา class ที่มี `@Component`, `@Service`, `@Repository`, `@RestController` แล้วสร้างเป็น **Bean** และฉีด dependency ให้กัน (DI)\n\n**Auto-configuration** ดูว่าใน classpath มีอะไร เช่น เจอ JPA + Postgres driver → ตั้ง DataSource ให้เลย\n\n**Request flow**: Tomcat → `DispatcherServlet` → Filter/Interceptor → Controller → Service → Repository → DB',
        },
        {
          type: 'code',
          title: 'สร้างโปรเจกต์',
          lang: 'shell',
          code: `# ดาวน์โหลด starter จาก start.spring.io
curl https://start.spring.io/starter.zip \\
  -d dependencies=web,data-jpa,postgresql,validation \\
  -d type=maven-project -d javaVersion=21 -o demo.zip
unzip demo.zip -d demo && cd demo
./mvnw spring-boot:run`,
          note: 'หรือกดสร้างผ่านเว็บ start.spring.io / IntelliJ ก็ได้',
        },
        {
          type: 'code',
          title: 'ตัวอย่าง: Entity + Repository + Controller',
          lang: 'java',
          code: `@Entity
public class Book {
    @Id @GeneratedValue private Long id;
    private String title; // + getters / setters
}

public interface BookRepository extends JpaRepository<Book, Long> {
    List<Book> findByTitleContaining(String keyword); // query จากชื่อเมธอด
}
@RestController
@RequestMapping("/api/books")
public class BookController {
    private final BookRepository repo;

    public BookController(BookRepository repo) { // constructor injection
        this.repo = repo;
    }
    @GetMapping
    public List<Book> search(@RequestParam(defaultValue = "") String q) {
        return repo.findByTitleContaining(q);
    }
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Book create(@RequestBody Book book) { return repo.save(book); }
}`,
        },
        {
          type: 'list',
          title: 'Key concepts',
          items: [
            '**Bean + DI** (constructor injection แนะนำที่สุด)',
            '**Stereotypes** `@Controller`, `@Service`, `@Repository`',
            '**Spring Data JPA** เขียน interface ก็ได้ query',
            '`application.yml` + **Profiles** (dev/prod)',
            '**Spring Security** auth/authorization',
            '**Actuator** health check / metrics',
          ],
        },
        {
          type: 'pairs',
          title: 'ใช้คู่กับ',
          items: ['Spring Data JPA', 'Hibernate', 'PostgreSQL', 'MySQL', 'Flyway', 'Spring Security', 'Lombok', 'Redis', 'Kafka', 'JUnit 5', 'Docker', 'Kubernetes'],
        },
        {
          type: 'tip',
          body: 'ใช้ **Flyway** หรือ **Liquibase** จัดการ schema แทน `ddl-auto=update` ใน production จะปลอดภัยกว่ามากเลย 🧸',
        },
      ],
    },

    // ───────────────────────── Laravel ─────────────────────────
    {
      id: 'laravel',
      title: 'Laravel',
      emoji: '🐘',
      summary: 'PHP framework สุดฮิต สวยงาม มี Eloquent ORM และเครื่องมือครบ',
      tags: ['backend', 'php', 'laravel', 'mvc', 'eloquent', 'artisan'],
      sections: [
        {
          type: 'text',
          body: 'Laravel คือ PHP framework ที่เน้น **developer happiness** 🐘✨ syntax อ่านง่าย มีทุกอย่างพร้อม: ORM, migration, queue, mail, auth starter kit, CLI (`artisan`) ทำเว็บ full-stack ได้ไวมาก',
        },
        {
          type: 'text',
          title: 'ข้างในทำงานยังไง',
          body: 'ใช้แพทเทิร์น **MVC** 🏛️\n\n**Request lifecycle**: `public/index.php` → HTTP Kernel → Middleware → Router → Controller → Model (Eloquent) → View (Blade) / JSON → Response\n\nหัวใจคือ **Service Container** (DI container) ที่ resolve dependency ให้อัตโนมัติ และ **Service Providers** ที่ลงทะเบียน service ตอน boot',
        },
        {
          type: 'code',
          title: 'สร้างโปรเจกต์',
          lang: 'shell',
          code: `composer create-project laravel/laravel example-app
cd example-app
php artisan serve
# สร้าง Model + migration + controller ทีเดียว
php artisan make:model Post -mc
php artisan migrate`,
        },
        {
          type: 'code',
          title: 'ตัวอย่าง: Route + Controller + Eloquent',
          lang: 'php',
          code: `// routes/web.php
use App\\Http\\Controllers\\PostController;
Route::get('/posts', [PostController::class, 'index']);
Route::post('/posts', [PostController::class, 'store']);

// app/Http/Controllers/PostController.php
class PostController extends Controller
{
    public function index()
    {
        return Post::latest()->take(10)->get(); // คืน JSON อัตโนมัติ
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|max:200',
            'body'  => 'required',
        ]);
        return Post::create($data); // ต้องตั้ง $fillable ใน Model
    }
}`,
          note: 'ถ้าทำเป็น API ล้วนๆ ใช้ `php artisan install:api` แล้วเขียนใน `routes/api.php`',
        },
        {
          type: 'list',
          title: 'Key concepts',
          items: [
            '**Eloquent ORM** Active Record + relationships (`hasMany`, `belongsTo`)',
            '**Migration / Seeder / Factory**',
            '**Blade** template engine',
            '**Middleware**, **Form Request** validation',
            '**Queues & Jobs** งานเบื้องหลัง',
            '**Artisan** CLI สร้างไฟล์และสั่งงาน',
          ],
        },
        {
          type: 'pairs',
          title: 'ใช้คู่กับ',
          items: ['MySQL', 'PostgreSQL', 'Redis', 'Livewire', 'Inertia.js', 'Vue', 'React', 'Tailwind CSS', 'Sanctum', 'Horizon', 'Laravel Forge', 'Pest'],
        },
      ],
    },

    // ───────────────────────── ASP.NET Core ─────────────────────────
    {
      id: 'aspnet-core',
      title: 'ASP.NET Core',
      emoji: '🟣',
      summary: 'Web framework ของ .NET (C#) เร็ว cross-platform มี DI ในตัว',
      tags: ['backend', 'csharp', 'dotnet', 'aspnet', 'di', 'middleware', 'minimal-api'],
      sections: [
        {
          type: 'text',
          body: 'ASP.NET Core คือ web framework จาก Microsoft ใช้ภาษา **C#** 🟣 รันได้ทั้ง Windows/Linux/macOS ประสิทธิภาพสูงติดอันดับ benchmark ทำได้ทั้ง Web API, MVC, Razor Pages และ Blazor',
        },
        {
          type: 'text',
          title: 'ข้างในทำงานยังไง',
          body: 'เว็บเซิร์ฟเวอร์ในตัวชื่อ **Kestrel** รับ request แล้วส่งเข้า **middleware pipeline** 🚿 (ลำดับใน `Program.cs` สำคัญ เช่น `UseAuthentication` ต้องมาก่อน `UseAuthorization`)\n\nจากนั้น **Routing** จับ endpoint → **Model binding** แปลง JSON เป็น object → handler ทำงาน\n\n**DI container** มีในตัว ลงทะเบียน service ด้วย lifetime: `Singleton`, `Scoped` (ต่อ request), `Transient` (ใหม่ทุกครั้ง)',
        },
        {
          type: 'code',
          title: 'สร้างโปรเจกต์',
          lang: 'shell',
          code: `dotnet new webapi -n MyApi
cd MyApi
dotnet run
# hot reload
dotnet watch`,
        },
        {
          type: 'code',
          title: 'ตัวอย่าง: Minimal API + DI',
          lang: 'csharp',
          code: `var builder = WebApplication.CreateBuilder(args);
builder.Services.AddSingleton<ITodoStore, TodoStore>(); // ลงทะเบียน DI
var app = builder.Build();

app.MapGet("/todos", (ITodoStore store) => store.All());
app.MapGet("/todos/{id:int}", (int id, ITodoStore store) =>
    store.Find(id) is { } todo ? Results.Ok(todo) : Results.NotFound());

app.MapPost("/todos", (Todo todo, ITodoStore store) =>
{
    store.Add(todo);
    return Results.Created($"/todos/{todo.Id}", todo);
});

app.Run();

public record Todo(int Id, string Title, bool Done);
public interface ITodoStore { IEnumerable<Todo> All(); Todo? Find(int id); void Add(Todo t); }
public class TodoStore : ITodoStore
{
    private readonly List<Todo> _items = new();
    public IEnumerable<Todo> All() => _items;
    public Todo? Find(int id) => _items.FirstOrDefault(t => t.Id == id);
    public void Add(Todo t) => _items.Add(t);
}`,
        },
        {
          type: 'list',
          title: 'Key concepts',
          items: [
            '**Middleware pipeline** `app.Use...()` เรียงลำดับ',
            '**DI lifetimes** Singleton / Scoped / Transient',
            '**Minimal API** vs **Controllers** (`[ApiController]`)',
            '**Model binding + validation**',
            '**Configuration** `appsettings.json` + environment',
            '**Entity Framework Core** ORM คู่บุญ',
          ],
        },
        {
          type: 'pairs',
          title: 'ใช้คู่กับ',
          items: ['Entity Framework Core', 'SQL Server', 'PostgreSQL', 'Dapper', 'Redis', 'Serilog', 'MediatR', 'xUnit', 'Azure', 'Docker', 'Blazor'],
        },
        {
          type: 'warn',
          body: 'ห้ามฉีด service แบบ **Scoped** (เช่น `DbContext`) เข้าไปใน **Singleton** นะ จะได้ instance เดิมค้างตลอดแอป เกิดบั๊กแปลกๆ ได้',
        },
      ],
    },

    // ───────────────────────── Flutter ─────────────────────────
    {
      id: 'flutter',
      title: 'Flutter',
      emoji: '🦋',
      summary: 'UI toolkit จาก Google เขียน Dart ครั้งเดียว ได้ทั้ง iOS/Android/Web/Desktop',
      tags: ['mobile', 'dart', 'flutter', 'cross-platform', 'widget'],
      sections: [
        {
          type: 'text',
          body: 'Flutter คือ framework ทำแอปข้ามแพลตฟอร์มด้วยภาษา **Dart** 🦋 ทุกอย่างคือ **Widget** UI สวยเหมือนกันทุกเครื่อง มี **Hot Reload** แก้โค้ดเห็นผลทันที',
        },
        {
          type: 'text',
          title: 'ข้างในทำงานยังไง',
          body: 'Flutter **วาด UI เองทุก pixel** 🎨 ด้วย rendering engine (Impeller/Skia) ไม่ได้ใช้ native component ของ OS เลยหน้าตาเหมือนกันทุกแพลตฟอร์ม\n\nมี 3 ต้นไม้: **Widget tree** (คำอธิบาย UI, immutable) → **Element tree** (ตัวเชื่อม/จำ state) → **RenderObject tree** (คำนวณ layout แล้ววาด)\n\nตอน release, Dart compile แบบ **AOT** เป็น native code ได้ความเร็วสูง ตอน dev ใช้ **JIT** เลยทำ hot reload ได้',
        },
        {
          type: 'code',
          title: 'สร้างโปรเจกต์',
          lang: 'shell',
          code: `flutter doctor          # เช็คว่าติดตั้งครบไหม
flutter create my_app
cd my_app
flutter run`,
        },
        {
          type: 'code',
          title: 'ตัวอย่าง: StatefulWidget ตัวนับ',
          lang: 'dart',
          code: `import 'package:flutter/material.dart';

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
      appBar: AppBar(title: const Text('ตัวนับน่ารัก 🐣')),
      body: Center(child: Text('กดไป $_count ครั้ง')),
      floatingActionButton: FloatingActionButton(
        onPressed: () => setState(() => _count++),
        child: const Icon(Icons.add),
      ),
    );
  }
}`,
          note: '`setState` บอก Flutter ว่าข้อมูลเปลี่ยน ให้เรียก `build` ใหม่',
        },
        {
          type: 'list',
          title: 'Key concepts',
          items: [
            '**StatelessWidget** vs **StatefulWidget**',
            '**Layout widgets** `Row`, `Column`, `Stack`, `Expanded`, `Padding`',
            '**`const`** constructor ช่วยลดการ rebuild',
            '**State management** Provider / Riverpod / Bloc',
            '**Navigator / go_router** สำหรับเปลี่ยนหน้า',
            '**Platform channels** เรียก native code',
          ],
        },
        {
          type: 'pairs',
          title: 'ใช้คู่กับ',
          items: ['Riverpod', 'Bloc', 'Provider', 'go_router', 'Dio', 'Firebase', 'Supabase', 'Hive', 'Drift', 'freezed', 'Codemagic'],
        },
      ],
    },

    // ───────────────────────── React Native ─────────────────────────
    {
      id: 'react-native',
      title: 'React Native',
      emoji: '📱',
      summary: 'เขียน React แต่ได้แอป native จริงบน iOS/Android',
      tags: ['mobile', 'javascript', 'react-native', 'expo', 'cross-platform'],
      sections: [
        {
          type: 'text',
          body: 'React Native ให้เราใช้ความรู้ React (component, hooks) มาทำ **แอปมือถือ native** 📱 ใช้ `<View>`, `<Text>` แทน `<div>`, `<p>` และส่วนใหญ่เริ่มผ่าน **Expo** ที่ช่วยจัดการ build/deploy ให้ง่ายมาก',
        },
        {
          type: 'text',
          title: 'ข้างในทำงานยังไง',
          body: 'โค้ด JS รันบน JS engine (**Hermes**) แล้วสั่งให้สร้าง **native component จริง** ของ iOS/Android (ไม่ใช่ WebView) 🧩\n\n**New Architecture** ใช้ **JSI** ให้ JS เรียก native ได้ตรงๆ แบบ synchronous (เลิกใช้ bridge ที่ต้องส่ง JSON ไปมา), **Fabric** เป็น renderer ใหม่, **TurboModules** โหลด native module แบบ lazy\n\nReact ยังทำ reconciliation เหมือนเดิม แค่ปลายทางเป็น native view แทน DOM',
        },
        {
          type: 'code',
          title: 'สร้างโปรเจกต์ (Expo)',
          lang: 'shell',
          code: `npx create-expo-app@latest my-app
cd my-app
npx expo start
# สแกน QR ด้วยแอป Expo Go บนมือถือได้เลย`,
        },
        {
          type: 'code',
          title: 'ตัวอย่าง: รายการ + ปุ่ม',
          lang: 'jsx',
          code: `import { useState } from 'react'
import { View, Text, TextInput, Pressable, FlatList, StyleSheet } from 'react-native'

export default function App() {
  const [text, setText] = useState('')
  const [items, setItems] = useState([])

  const add = () => {
    if (!text.trim()) return
    setItems((prev) => [...prev, { id: String(Date.now()), text }])
    setText('')
  }
  return (
    <View style={styles.box}>
      <TextInput value={text} onChangeText={setText} placeholder="จดอะไรดี" style={styles.input} />
      <Pressable onPress={add}><Text style={styles.btn}>เพิ่ม ➕</Text></Pressable>
      <FlatList data={items} keyExtractor={(i) => i.id}
        renderItem={({ item }) => <Text>• {item.text}</Text>} />
    </View>
  )
}
const styles = StyleSheet.create({
  box: { flex: 1, padding: 24, paddingTop: 64 },
  input: { borderWidth: 1, borderRadius: 12, padding: 10 },
  btn: { marginVertical: 12, color: '#e75480', fontWeight: 'bold' },
})`,
        },
        {
          type: 'list',
          title: 'Key concepts',
          items: [
            'Core components: `View`, `Text`, `Image`, `ScrollView`, `FlatList`',
            '**StyleSheet** + Flexbox (default `flexDirection: column`)',
            '**Expo Router** file-based routing แบบ Next.js',
            '**Native modules** เรียกความสามารถเครื่อง (กล้อง, GPS)',
            '**EAS Build / Update** build และส่งอัปเดต OTA',
          ],
        },
        {
          type: 'pairs',
          title: 'ใช้คู่กับ',
          items: ['Expo', 'Expo Router', 'React Navigation', 'Zustand', 'TanStack Query', 'NativeWind', 'Reanimated', 'MMKV', 'Firebase', 'Supabase', 'EAS'],
        },
        {
          type: 'tip',
          body: 'list ยาวๆ ใช้ `FlatList` (render เฉพาะที่เห็นบนจอ) อย่าใช้ `ScrollView` + `map` เพราะจะหน่วงมาก 🐢',
        },
      ],
    },

    // ───────────────────────── Choosing ─────────────────────────
    {
      id: 'choosing-framework',
      title: 'เลือกเฟรมเวิร์กยังไงดี',
      emoji: '🧭',
      summary: 'ตารางเทียบ frontend / backend / mobile พร้อมวิธีเลือกให้เหมาะกับงาน',
      tags: ['overview', 'comparison', 'stack', 'decision'],
      sections: [
        {
          type: 'text',
          body: 'ไม่มีเฟรมเวิร์กไหนดีที่สุด มีแต่ **เหมาะกับงาน + ทีม** ที่สุด 🧭 ลองดูตารางนี้เป็นแผนที่คร่าวๆ นะ',
        },
        {
          type: 'table',
          title: 'Frontend',
          headers: ['ตัว', 'ภาษา', 'เหมาะกับ'],
          rows: [
            ['React', 'JS/TS', 'SPA, ecosystem ใหญ่สุด หางานง่าย'],
            ['Next.js', 'JS/TS', 'เว็บที่ต้อง SEO, full-stack React'],
            ['Vue', 'JS/TS', 'เรียนง่าย ทีมเล็ก-กลาง'],
            ['Angular', 'TS', 'Enterprise, ทีมใหญ่ อยากได้โครงชัด'],
            ['Svelte', 'JS/TS', 'อยากได้ bundle เล็ก โค้ดสั้น'],
            ['Tailwind CSS', 'CSS', 'แต่ง UI เร็ว ใช้กับทุกตัวด้านบน'],
          ],
        },
        {
          type: 'table',
          title: 'Backend',
          headers: ['ตัว', 'ภาษา', 'เหมาะกับ'],
          rows: [
            ['Express', 'JS/TS', 'API เล็ก-กลาง ทำเร็ว'],
            ['NestJS', 'TS', 'API ใหญ่ ต้องการโครงสร้าง + DI'],
            ['Django', 'Python', 'แอปข้อมูลเยอะ อยากได้ admin ฟรี'],
            ['FastAPI', 'Python', 'API ทันสมัย, งาน AI/ML'],
            ['Flask', 'Python', 'แอปเล็ก, prototype'],
            ['Spring Boot', 'Java/Kotlin', 'Enterprise, ธนาคาร, microservices'],
            ['Laravel', 'PHP', 'เว็บ full-stack เร็ว, hosting ถูก'],
            ['ASP.NET Core', 'C#', 'สาย Microsoft/Azure, performance สูง'],
          ],
        },
        {
          type: 'table',
          title: 'Mobile',
          headers: ['ตัว', 'ภาษา', 'เหมาะกับ'],
          rows: [
            ['Flutter', 'Dart', 'UI สวยเหมือนกันทุกเครื่อง, animation เยอะ'],
            ['React Native', 'JS/TS', 'ทีมที่รู้ React อยู่แล้ว แชร์ logic กับเว็บ'],
          ],
        },
        {
          type: 'steps',
          title: 'คำถามช่วยตัดสินใจ',
          items: [
            'ทีมถนัดภาษาอะไร? (สำคัญที่สุด!)',
            'ต้อง SEO ไหม? → ต้อง = เลือกตัวที่ทำ SSR ได้ (Next.js, Nuxt, SvelteKit)',
            'โปรเจกต์ใหญ่ ดูแลยาวไหม? → ใหญ่ = โครงสร้างชัด (Angular, NestJS, Spring)',
            'ต้องการความเร็วในการทำ MVP? → Laravel, Django, Next.js',
            'Community / ตลาดงานในพื้นที่เป็นยังไง',
          ],
        },
        {
          type: 'code',
          title: 'ตัวอย่าง stack ยอดนิยม',
          lang: 'text',
          code: `T3 / Modern JS : Next.js + Tailwind + Prisma + PostgreSQL + Vercel
MERN           : MongoDB + Express + React + Node.js
Python API     : FastAPI + SQLAlchemy + PostgreSQL + Redis + Docker
Enterprise     : Angular + Spring Boot + PostgreSQL + Kubernetes
Laravel TALL   : Tailwind + Alpine.js + Laravel + Livewire
Mobile         : Flutter + Firebase  หรือ  Expo + Supabase`,
        },
        {
          type: 'tip',
          body: 'เลือกตัวที่ "น่าเบื่อแต่มั่นคง" ไว้ก่อน 🐢 แล้วค่อยลองของใหม่ในโปรเจกต์ส่วนตัว ชีวิตจะสงบสุขกว่าเยอะ',
        },
      ],
    },
  ],
}
