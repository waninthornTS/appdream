export default {
  id: 'web',
  title: 'Web & API',
  emoji: '🌐',
  color: '#8fd3b0',
  intro: 'เว็บทำงานยังไง API คุยกันแบบไหน และจะกันโดนแฮกได้ยังไง 🌐 สรุปไว้ให้อ่านเพลินๆ บนมือถือเลย~',
  topics: [
    // ───────────────────────── How the web works ─────────────────────────
    {
      id: 'how-web-works',
      title: 'เว็บทำงานยังไง',
      emoji: '🗺️',
      summary: 'พิมพ์ URL แล้วเกิดอะไรขึ้น: DNS → TCP/TLS → HTTP → render',
      tags: ['basic', 'dns', 'tcp', 'tls', 'http', 'browser'],
      sections: [
        {
          type: 'text',
          body: 'ตอนเราพิมพ์ `https://example.com` แล้วกด Enter มีหลายอย่างเกิดขึ้นในเสี้ยววินาทีเลย 🏃‍♀️💨 มาไล่ดูกันทีละขั้น',
        },
        {
          type: 'steps',
          title: 'เส้นทางของ request',
          items: [
            '**แยก URL** browser ดู protocol (`https`), host (`example.com`), path (`/`)',
            '**DNS lookup** 📖 หา IP ของ host: เช็ค cache ของ browser → OS → router → DNS resolver ของ ISP → root → TLD (`.com`) → authoritative server',
            '**TCP handshake** 🤝 ต่อสายกับ server ที่ port 443 (SYN → SYN-ACK → ACK)',
            '**TLS handshake** 🔐 ตกลงกุญแจเข้ารหัส + เช็ค certificate ว่าเป็นเว็บจริง',
            '**ส่ง HTTP request** เช่น `GET / HTTP/1.1` พร้อม headers/cookies',
            '**Server ประมวลผล** ผ่าน load balancer → web server → app → database',
            '**ได้ HTTP response** status code + headers + body (HTML)',
            '**Browser render** 🎨 parse HTML → DOM, CSS → CSSOM → layout → paint แล้วโหลด JS/รูปเพิ่ม',
          ],
        },
        {
          type: 'code',
          title: 'ลองส่องด้วย terminal',
          lang: 'shell',
          code: `# ดู DNS ว่า domain นี้ชี้ไป IP อะไร
nslookup example.com
dig example.com +short

# ดู request/response แบบละเอียด (รวม TLS)
curl -v https://example.com

# ดูเฉพาะ headers ของ response
curl -I https://example.com`,
        },
        {
          type: 'list',
          title: 'คำศัพท์สำคัญ',
          items: [
            '**IP address** ที่อยู่ของเครื่องบนเน็ต',
            '**DNS** สมุดโทรศัพท์ แปลงชื่อ → IP',
            '**Port** ประตูของโปรแกรม (80 = HTTP, 443 = HTTPS)',
            '**HTTP/2, HTTP/3** ส่งหลาย request ในการเชื่อมต่อเดียว, HTTP/3 วิ่งบน QUIC (UDP)',
            '**CDN** เซิร์ฟเวอร์กระจายทั่วโลก ส่งไฟล์จากที่ใกล้ผู้ใช้',
          ],
        },
        {
          type: 'tip',
          body: 'เปิด DevTools → แท็บ **Network** แล้วรีเฟรชหน้า จะเห็น timing ของ DNS, TLS, waiting (TTFB) ของทุก request เลย 🔍',
        },
      ],
    },

    // ───────────────────────── HTTP methods ─────────────────────────
    {
      id: 'http-methods',
      title: 'HTTP Methods',
      emoji: '📮',
      summary: 'GET, POST, PUT, PATCH, DELETE ใช้ต่างกันยังไง + safe/idempotent',
      tags: ['http', 'rest', 'get', 'post', 'put', 'patch', 'delete', 'idempotent'],
      sections: [
        {
          type: 'text',
          body: 'HTTP method คือ "กริยา" 📮 บอก server ว่าเราอยากทำอะไรกับ resource นั้น\n\n**Safe** = ไม่เปลี่ยนข้อมูลบน server\n**Idempotent** = ยิงซ้ำกี่ครั้ง ผลลัพธ์บน server ก็เหมือนยิงครั้งเดียว (retry ได้ปลอดภัย)',
        },
        {
          type: 'table',
          headers: ['Method', 'ใช้ทำ', 'Safe', 'Idempotent'],
          rows: [
            ['`GET`', 'อ่านข้อมูล', '✅', '✅'],
            ['`POST`', 'สร้างใหม่ / สั่งงาน', '❌', '❌'],
            ['`PUT`', 'แทนที่ทั้งก้อน', '❌', '✅'],
            ['`PATCH`', 'แก้บางส่วน', '❌', 'ไม่การันตี'],
            ['`DELETE`', 'ลบ', '❌', '✅'],
            ['`HEAD`', 'เหมือน GET แต่เอาแค่ headers', '✅', '✅'],
            ['`OPTIONS`', 'ถามว่าทำอะไรได้บ้าง (ใช้ใน CORS preflight)', '✅', '✅'],
          ],
        },
        {
          type: 'code',
          title: 'ตัวอย่างด้วย curl',
          lang: 'shell',
          code: `# อ่าน
curl https://api.example.com/users/42

# สร้าง
curl -X POST https://api.example.com/users \\
  -H "Content-Type: application/json" \\
  -d '{"name":"Mochi","email":"mochi@example.com"}'

# แก้บางส่วน
curl -X PATCH https://api.example.com/users/42 \\
  -H "Content-Type: application/json" \\
  -d '{"name":"Mochi-chan"}'

# ลบ
curl -X DELETE https://api.example.com/users/42`,
        },
        {
          type: 'tip',
          body: '**PUT vs PATCH** 🧸 PUT = ส่งข้อมูลมาทั้งก้อน ฟิลด์ไหนไม่ส่งถือว่าหาย ส่วน PATCH = ส่งมาเฉพาะฟิลด์ที่อยากแก้',
        },
        {
          type: 'warn',
          body: 'อย่าใช้ `GET` ทำสิ่งที่เปลี่ยนข้อมูล (เช่น `GET /delete?id=1`) เพราะ browser, crawler หรือ cache อาจยิงซ้ำเองได้!',
        },
      ],
    },

    // ───────────────────────── Status codes ─────────────────────────
    {
      id: 'http-status-codes',
      title: 'HTTP Status Codes',
      emoji: '🚦',
      summary: 'ตัวเลข 3 หลักบอกผลลัพธ์: 2xx สำเร็จ 4xx ฝั่งเราผิด 5xx server พัง',
      tags: ['http', 'status', 'error', '404', '500', 'rest'],
      sections: [
        {
          type: 'text',
          body: 'จำง่ายๆ ตามหลักร้อย 🚦\n\n**1xx** ข้อมูล · **2xx** สำเร็จ · **3xx** ไปที่อื่น · **4xx** client ผิด · **5xx** server ผิด',
        },
        {
          type: 'table',
          title: 'ตัวที่เจอบ่อย',
          headers: ['Code', 'ชื่อ', 'ใช้เมื่อ'],
          rows: [
            ['200', 'OK', 'สำเร็จทั่วไป'],
            ['201', 'Created', 'สร้าง resource ใหม่แล้ว (หลัง POST)'],
            ['204', 'No Content', 'สำเร็จแต่ไม่มี body (เช่น DELETE)'],
            ['301', 'Moved Permanently', 'ย้ายถาวร (SEO ตามไปด้วย)'],
            ['302', 'Found', 'redirect ชั่วคราว'],
            ['304', 'Not Modified', 'ใช้ cache เดิมได้เลย'],
            ['400', 'Bad Request', 'request ผิดรูปแบบ'],
            ['401', 'Unauthorized', 'ยังไม่ได้ login / token ไม่ถูก'],
            ['403', 'Forbidden', 'login แล้วแต่ไม่มีสิทธิ์'],
            ['404', 'Not Found', 'ไม่เจอ resource'],
            ['409', 'Conflict', 'ข้อมูลชนกัน เช่น email ซ้ำ'],
            ['422', 'Unprocessable Content', 'รูปแบบถูกแต่ validate ไม่ผ่าน'],
            ['429', 'Too Many Requests', 'โดน rate limit'],
            ['500', 'Internal Server Error', 'server พังแบบไม่คาดคิด'],
            ['502', 'Bad Gateway', 'proxy ได้คำตอบเสียจาก upstream'],
            ['503', 'Service Unavailable', 'server ล่ม/ปิดปรับปรุง'],
            ['504', 'Gateway Timeout', 'upstream ตอบช้าเกิน'],
          ],
        },
        {
          type: 'code',
          title: 'ตอบ status ให้ถูกใน Express',
          lang: 'js',
          code: `app.post('/users', async (req, res) => {
  if (!req.body.email) {
    return res.status(400).json({ error: 'email is required' })
  }
  const exists = await db.user.findUnique({ where: { email: req.body.email } })
  if (exists) {
    return res.status(409).json({ error: 'email already used' })
  }
  const user = await db.user.create({ data: req.body })
  res.status(201).location('/users/' + user.id).json(user)
})`,
        },
        {
          type: 'tip',
          body: '**401 vs 403** 🔑 401 = "เธอเป็นใคร?" (ยังไม่ยืนยันตัวตน) ส่วน 403 = "รู้ว่าเป็นใคร แต่ห้ามเข้า" นะ',
        },
      ],
    },

    // ───────────────────────── REST ─────────────────────────
    {
      id: 'rest-api-design',
      title: 'REST API Design',
      emoji: '🏗️',
      summary: 'ออกแบบ URL เป็นคำนาม ใช้ method เป็นกริยา ตอบ status ให้ตรง',
      tags: ['rest', 'api', 'design', 'pagination', 'versioning'],
      sections: [
        {
          type: 'text',
          body: '**REST** คือสไตล์การออกแบบ API ที่มองทุกอย่างเป็น **resource** 📦 มี URL ของตัวเอง แล้วใช้ HTTP method บอกว่าจะทำอะไร\n\nหลักสำคัญ: **stateless** (ทุก request มีข้อมูลครบในตัว server ไม่ต้องจำ), interface เป็นมาตรฐาน, cache ได้',
        },
        {
          type: 'table',
          title: 'URL ที่ดี (ใช้คำนามพหูพจน์)',
          headers: ['Method + URL', 'ความหมาย'],
          rows: [
            ['`GET /users`', 'ดูรายการ users'],
            ['`GET /users/42`', 'ดู user id 42'],
            ['`POST /users`', 'สร้าง user'],
            ['`PATCH /users/42`', 'แก้ user 42 บางส่วน'],
            ['`DELETE /users/42`', 'ลบ user 42'],
            ['`GET /users/42/orders`', 'orders ของ user 42 (nested)'],
          ],
        },
        {
          type: 'list',
          title: 'Best practices',
          items: [
            'URL เป็น **คำนาม** ❌ `/getUsers` ✅ `/users`',
            'ใช้ **kebab-case** หรือตัวเล็กล้วนใน URL',
            '**Filter / sort / pagination** ผ่าน query: `?status=active&sort=-createdAt&page=2&limit=20`',
            '**Versioning** `/v1/users` หรือผ่าน header',
            'ตอบ error เป็นรูปแบบเดียวกันทั้ง API',
            'ตอบ status code ให้ตรงความหมาย',
          ],
        },
        {
          type: 'code',
          title: 'Response แบบมี pagination + error มาตรฐาน',
          lang: 'json',
          code: `// GET /v1/users?page=2&limit=2
{
  "data": [
    { "id": 3, "name": "Mochi" },
    { "id": 4, "name": "Daifuku" }
  ],
  "meta": { "page": 2, "limit": 2, "total": 57 }
}

// 422 Unprocessable Content
{
  "error": {
    "code": "VALIDATION_FAILED",
    "message": "email is invalid",
    "fields": { "email": "must be a valid email" }
  }
}`,
          note: 'JSON จริงใส่ comment ไม่ได้นะ อันนี้ใส่ไว้อธิบายเฉยๆ',
        },
        {
          type: 'tip',
          body: 'ข้อมูลเยอะมากๆ ลองใช้ **cursor pagination** (`?after=abc123`) แทน `page` จะเร็วกว่าและไม่เจอปัญหาข้อมูลเลื่อนตอนมีของใหม่เข้ามา 🎯',
        },
      ],
    },

    // ───────────────────────── GraphQL ─────────────────────────
    {
      id: 'graphql',
      title: 'GraphQL',
      emoji: '🕸️',
      summary: 'Query language ให้ client ขอข้อมูลเท่าที่ต้องการ ผ่าน endpoint เดียว',
      tags: ['graphql', 'api', 'query', 'schema', 'resolver'],
      sections: [
        {
          type: 'text',
          body: 'GraphQL คือภาษาสำหรับ query API 🕸️ client เป็นคนบอกเองว่าอยากได้ฟิลด์ไหน ได้มาเป๊ะๆ ไม่ขาดไม่เกิน ทุกอย่างวิ่งผ่าน endpoint เดียว (มักเป็น `POST /graphql`)\n\nแก้ปัญหา REST: **over-fetching** (ได้ข้อมูลเกิน) และ **under-fetching** (ต้องยิงหลายรอบ)',
        },
        {
          type: 'text',
          title: 'ทำงานยังไง',
          body: '**Schema** กำหนด type ทั้งหมด (สัญญาระหว่าง client-server) 📜\n\n**Resolver** คือฟังก์ชันที่ดึงข้อมูลของแต่ละฟิลด์\n\nมี 3 operation: **Query** (อ่าน), **Mutation** (เขียน), **Subscription** (realtime)',
        },
        {
          type: 'code',
          title: 'Schema',
          lang: 'graphql',
          code: `type User {
  id: ID!
  name: String!
  posts: [Post!]!
}

type Post {
  id: ID!
  title: String!
}

type Query {
  user(id: ID!): User
}

type Mutation {
  createPost(title: String!): Post!
}`,
        },
        {
          type: 'code',
          title: 'เรียกจาก client ด้วย fetch',
          lang: 'js',
          code: `const query = 'query GetUser($id: ID!) { user(id: $id) { name posts { title } } }'

const res = await fetch('/graphql', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ query, variables: { id: '42' } }),
})
const { data, errors } = await res.json()
console.log(data.user.name, data.user.posts)`,
          note: 'GraphQL มักตอบ 200 แม้มี error ต้องเช็ค `errors` ใน body เสมอ',
        },
        {
          type: 'table',
          title: 'REST vs GraphQL',
          headers: ['', 'REST', 'GraphQL'],
          rows: [
            ['Endpoint', 'หลายอัน', 'อันเดียว'],
            ['รูปร่างข้อมูล', 'server กำหนด', 'client เลือก'],
            ['HTTP cache', 'ง่าย', 'ยากกว่า'],
            ['เหมาะกับ', 'API ทั่วไป, public API', 'UI ซับซ้อน, หลาย client'],
          ],
        },
        {
          type: 'pairs',
          title: 'ใช้คู่กับ',
          items: ['Apollo Server', 'Apollo Client', 'GraphQL Yoga', 'urql', 'Relay', 'DataLoader', 'Hasura', 'GraphQL Codegen'],
        },
        {
          type: 'warn',
          body: 'ระวัง **N+1 problem** resolver ของ `posts` อาจยิง DB ทีละ user ใช้ **DataLoader** รวม query เป็นก้อนเดียว และจำกัด query depth กันโดนยิง query ลึกๆ',
        },
      ],
    },

    // ───────────────────────── WebSocket ─────────────────────────
    {
      id: 'websocket',
      title: 'WebSocket',
      emoji: '🔌',
      summary: 'ท่อสื่อสารสองทางแบบเปิดค้าง ส่งข้อมูล realtime ได้ทั้งสองฝั่ง',
      tags: ['websocket', 'realtime', 'chat', 'socket', 'sse'],
      sections: [
        {
          type: 'text',
          body: 'HTTP ปกติ client ต้องถามก่อน server ถึงจะตอบ 🙋 แต่ **WebSocket** เปิดท่อค้างไว้ ทั้งสองฝั่งส่งข้อความหากันได้ตลอดเวลา เหมาะกับแชท, เกม multiplayer, แจ้งเตือนสด, ราคาหุ้นวิ่ง',
        },
        {
          type: 'text',
          title: 'ทำงานยังไง',
          body: 'เริ่มจาก HTTP request ธรรมดาที่มี header `Upgrade: websocket` 🤝 server ตอบ `101 Switching Protocols` จากนั้น connection TCP เดิมเปลี่ยนเป็น WebSocket ส่งข้อมูลเป็น **frame** เล็กๆ ไปมา (overhead ต่ำกว่า HTTP มาก)\n\nURL ใช้ `ws://` หรือ `wss://` (แบบเข้ารหัส ใช้อันนี้เสมอใน production)',
        },
        {
          type: 'code',
          title: 'Server (Node.js + ws)',
          lang: 'js',
          code: `// npm install ws
import { WebSocketServer } from 'ws'

const wss = new WebSocketServer({ port: 8080 })

wss.on('connection', (socket) => {
  socket.send('ยินดีต้อนรับเข้าห้องแชท 🐱')

  socket.on('message', (data) => {
    // broadcast ให้ทุกคนที่ต่ออยู่
    for (const client of wss.clients) {
      if (client.readyState === 1) client.send(data.toString())
    }
  })
})`,
        },
        {
          type: 'code',
          title: 'Client (browser)',
          lang: 'js',
          code: `const ws = new WebSocket('ws://localhost:8080')

ws.addEventListener('open', () => ws.send('สวัสดีจ้า'))
ws.addEventListener('message', (e) => console.log('ได้รับ:', e.data))
ws.addEventListener('close', () => console.log('หลุดแล้ว ลองต่อใหม่นะ'))`,
        },
        {
          type: 'table',
          title: 'ทางเลือกอื่นสำหรับ realtime',
          headers: ['วิธี', 'ทิศทาง', 'เหมาะกับ'],
          rows: [
            ['Polling', 'client ถามเป็นระยะ', 'ง่ายสุด ข้อมูลไม่ด่วน'],
            ['SSE (Server-Sent Events)', 'server → client', 'แจ้งเตือน, stream ข้อความ AI'],
            ['WebSocket', 'สองทาง', 'แชท, เกม, collaborative'],
          ],
        },
        {
          type: 'pairs',
          title: 'ใช้คู่กับ',
          items: ['ws', 'Socket.IO', 'Redis Pub/Sub', 'Pusher', 'Ably', 'Supabase Realtime', 'NestJS Gateway'],
        },
        {
          type: 'tip',
          body: 'connection หลุดได้เสมอ (เน็ตมือถือ!) ทำ **auto-reconnect + heartbeat (ping/pong)** ไว้ด้วย หรือใช้ **Socket.IO** ที่มีให้ในตัว 💓',
        },
      ],
    },

    // ───────────────────────── Auth ─────────────────────────
    {
      id: 'authentication',
      title: 'Authentication: Session vs JWT',
      emoji: '🔑',
      summary: 'จำว่าใคร login อยู่: เก็บ session บน server หรือถือ token ไว้ที่ client',
      tags: ['auth', 'session', 'cookie', 'jwt', 'token', 'security'],
      sections: [
        {
          type: 'text',
          body: '**Authentication** = ยืนยันว่าเป็นใคร 🪪\n**Authorization** = มีสิทธิ์ทำอะไรได้บ้าง\n\nHTTP เป็น stateless เลยต้องมีวิธี "จำ" ว่า request นี้มาจากคนที่ login แล้ว มี 2 ท่าหลัก',
        },
        {
          type: 'text',
          title: '1. Session + Cookie 🍪',
          body: 'login สำเร็จ → server สร้าง session (เก็บใน memory/Redis/DB) → ส่ง **session id** กลับไปใน cookie → browser แนบ cookie มาทุก request อัตโนมัติ → server เอา id ไปหา session\n\nข้อดี: logout/เตะออกได้ทันที (ลบ session) ข้อมูลอยู่ฝั่ง server ปลอดภัย',
        },
        {
          type: 'text',
          title: '2. JWT (JSON Web Token) 🎫',
          body: 'login สำเร็จ → server สร้าง token ที่มีข้อมูล (เช่น user id, role, วันหมดอายุ) แล้ว **เซ็นด้วย secret** → client เก็บไว้แล้วส่งมาใน header `Authorization: Bearer <token>`\n\nserver แค่ตรวจลายเซ็น ไม่ต้องค้น DB → scale ง่าย เหมาะกับ API/mobile/microservices\n\nหน้าตา: `header.payload.signature` (base64url) — payload **อ่านได้ทุกคน** แค่แก้ไม่ได้',
        },
        {
          type: 'code',
          title: 'JWT ใน Express',
          lang: 'js',
          code: `import jwt from 'jsonwebtoken'

const SECRET = process.env.JWT_SECRET

app.post('/login', async (req, res) => {
  const user = await checkPassword(req.body.email, req.body.password)
  if (!user) return res.status(401).json({ error: 'invalid credentials' })
  const token = jwt.sign({ sub: user.id, role: user.role }, SECRET, { expiresIn: '15m' })
  res.json({ token })
})

function requireAuth(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1]
  try {
    req.user = jwt.verify(token, SECRET)
    next()
  } catch {
    res.status(401).json({ error: 'invalid token' })
  }
}

app.get('/me', requireAuth, (req, res) => res.json(req.user))`,
        },
        {
          type: 'table',
          title: 'เทียบกัน',
          headers: ['', 'Session', 'JWT'],
          rows: [
            ['เก็บ state ที่', 'Server', 'ตัว token (client)'],
            ['Revoke ทันที', 'ง่าย', 'ยาก (ต้องรอหมดอายุ/blocklist)'],
            ['Scale หลายเครื่อง', 'ต้องแชร์ store (Redis)', 'ง่าย'],
            ['เหมาะกับ', 'เว็บ server-rendered', 'API, mobile, microservices'],
          ],
        },
        {
          type: 'list',
          title: 'ตั้งค่า cookie ให้ปลอดภัย',
          items: [
            '`HttpOnly` JS อ่านไม่ได้ กัน XSS ขโมย',
            '`Secure` ส่งเฉพาะ HTTPS',
            '`SameSite=Lax` หรือ `Strict` ช่วยกัน CSRF',
            'ตั้ง `Max-Age` / `Expires` ให้เหมาะสม',
          ],
        },
        {
          type: 'warn',
          body: 'อย่าเก็บ JWT ใน `localStorage` ถ้าเลี่ยงได้ เพราะโดน XSS ขโมยง่าย! ท่าที่นิยม: access token อายุสั้น + **refresh token ใน HttpOnly cookie** และห้ามใส่ข้อมูลลับใน payload นะ',
        },
      ],
    },

    // ───────────────────────── OAuth / OIDC ─────────────────────────
    {
      id: 'oauth-oidc',
      title: 'OAuth 2.0 / OpenID Connect',
      emoji: '🎟️',
      summary: 'OAuth = ขอสิทธิ์เข้าถึงแทนเจ้าของ, OIDC = ต่อยอดให้รู้ว่าเป็นใคร (Login with Google)',
      tags: ['auth', 'oauth', 'oidc', 'sso', 'pkce', 'token'],
      sections: [
        {
          type: 'text',
          body: '**OAuth 2.0** คือมาตรฐาน **authorization** 🎟️ ให้แอปหนึ่งขอสิทธิ์เข้าถึงข้อมูลของเราในอีกระบบ โดยไม่ต้องรู้รหัสผ่าน เช่น แอปขอดู Google Calendar ของเรา → ได้ **access token**\n\n**OpenID Connect (OIDC)** คือชั้นที่ต่อบน OAuth เพื่อ **authentication** ได้ **ID token** (เป็น JWT) บอกว่าผู้ใช้เป็นใคร → นี่แหละ "Sign in with Google" 🙌',
        },
        {
          type: 'list',
          title: 'ตัวละคร',
          items: [
            '**Resource Owner** = ผู้ใช้ (เรา)',
            '**Client** = แอปที่ขอสิทธิ์',
            '**Authorization Server** = ระบบที่ออก token (Google, Auth0, Keycloak)',
            '**Resource Server** = API ที่เก็บข้อมูล',
            '**Scope** = ขอบเขตสิทธิ์ เช่น `openid profile email`',
          ],
        },
        {
          type: 'steps',
          title: 'Authorization Code Flow + PKCE (แบบที่ควรใช้)',
          items: [
            'แอปสร้าง `code_verifier` (สุ่ม) แล้วแฮชเป็น `code_challenge`',
            'redirect ผู้ใช้ไปหน้า login ของ Authorization Server พร้อม `client_id`, `scope`, `redirect_uri`, `state`, `code_challenge`',
            'ผู้ใช้ login + กดยินยอม',
            'ถูก redirect กลับมาที่ `redirect_uri?code=...&state=...` (เช็ค `state` ให้ตรง กัน CSRF)',
            'แอปเอา `code` + `code_verifier` ไปแลกเป็น token ที่ token endpoint (หลังบ้าน)',
            'ได้ `access_token` (+ `id_token` ถ้า OIDC, + `refresh_token`)',
          ],
        },
        {
          type: 'code',
          title: 'สร้าง PKCE ใน browser',
          lang: 'js',
          code: `function base64url(bytes) {
  return btoa(String.fromCharCode(...new Uint8Array(bytes)))
    .replace(/\\+/g, '-').replace(/\\//g, '_').replace(/=+$/, '')
}

const verifier = base64url(crypto.getRandomValues(new Uint8Array(32)))
const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(verifier))
const challenge = base64url(digest)

const params = new URLSearchParams({
  response_type: 'code',
  client_id: 'my-app',
  redirect_uri: 'https://myapp.com/callback',
  scope: 'openid profile email',
  state: crypto.randomUUID(),
  code_challenge: challenge,
  code_challenge_method: 'S256',
})
location.href = 'https://auth.example.com/authorize?' + params`,
          note: 'เก็บ `verifier` และ `state` ไว้ใน `sessionStorage` เพื่อใช้ตอน callback',
        },
        {
          type: 'pairs',
          title: 'ใช้คู่กับ',
          items: ['Auth0', 'Keycloak', 'Okta', 'Firebase Auth', 'Supabase Auth', 'Clerk', 'Auth.js', 'Passport.js', 'Spring Security OAuth2'],
        },
        {
          type: 'warn',
          body: '**Implicit flow** เลิกใช้แล้ว (ไม่ปลอดภัย) ใช้ Authorization Code + PKCE แทนทุกกรณี และอย่าใช้ access token ของ OAuth แทนการยืนยันตัวตน ให้ใช้ ID token ของ OIDC',
        },
      ],
    },

    // ───────────────────────── CORS ─────────────────────────
    {
      id: 'cors',
      title: 'CORS',
      emoji: '🚧',
      summary: 'กฎ browser ที่กันเว็บอื่นเรียก API เรา เว้นแต่ server อนุญาต',
      tags: ['cors', 'security', 'browser', 'preflight', 'same-origin'],
      sections: [
        {
          type: 'text',
          body: 'Browser มีกฎ **Same-Origin Policy** 🏠 JS จากเว็บหนึ่งอ่าน response จาก origin อื่นไม่ได้ (origin = protocol + host + port)\n\n`http://localhost:5173` เรียก `http://localhost:3000` = คนละ origin (port ต่าง) ❗\n\n**CORS** (Cross-Origin Resource Sharing) คือวิธีที่ server บอก browser ว่า "origin นี้อนุญาตนะ"',
        },
        {
          type: 'text',
          title: 'ทำงานยังไง',
          body: '**Simple request** (เช่น GET ธรรมดา): browser ส่งไปเลยพร้อม header `Origin` แล้วดูว่า response มี `Access-Control-Allow-Origin` ที่ตรงไหม ถ้าไม่ตรง → JS อ่าน response ไม่ได้\n\n**Preflight** ✈️: ถ้าเป็น PUT/DELETE หรือมี header พิเศษ (เช่น `Content-Type: application/json`, `Authorization`) browser จะยิง `OPTIONS` ไปถามก่อน ถ้า server ตอบโอเคค่อยส่งของจริง',
        },
        {
          type: 'code',
          title: 'Headers ที่ server ตอบ',
          lang: 'http',
          code: `HTTP/1.1 204 No Content
Access-Control-Allow-Origin: https://myapp.com
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Allow-Credentials: true
Access-Control-Max-Age: 600`,
        },
        {
          type: 'code',
          title: 'เปิด CORS ใน Express',
          lang: 'js',
          code: `import cors from 'cors'

app.use(cors({
  origin: ['https://myapp.com', 'http://localhost:5173'],
  credentials: true, // ถ้าต้องส่ง cookie ข้าม origin
}))

// ฝั่ง client ต้องใส่ credentials ด้วย
// fetch(url, { credentials: 'include' })`,
        },
        {
          type: 'list',
          title: 'จำไว้นะ',
          items: [
            'CORS บังคับโดย **browser** เท่านั้น curl/Postman/server-to-server ไม่สน',
            'CORS **ไม่ใช่** ระบบป้องกัน API ยังต้องมี auth อยู่ดี',
            'ตอน dev ใช้ **proxy** ของ Vite/Next แทนได้ จะไม่เจอ CORS',
          ],
        },
        {
          type: 'warn',
          body: '`Access-Control-Allow-Origin: *` ใช้คู่กับ `credentials: true` ไม่ได้! และอย่า reflect ทุก origin กลับไปแบบไม่เช็ค เท่ากับเปิดประตูให้ทุกเว็บ',
        },
      ],
    },

    // ───────────────────────── Caching ─────────────────────────
    {
      id: 'caching',
      title: 'Caching (Browser / CDN / Redis)',
      emoji: '🗃️',
      summary: 'เก็บผลลัพธ์ไว้ใกล้ๆ จะได้ไม่ต้องทำซ้ำ: browser → CDN → server cache',
      tags: ['cache', 'cdn', 'redis', 'cache-control', 'etag', 'performance'],
      sections: [
        {
          type: 'text',
          body: 'Cache คือการเก็บของที่ใช้บ่อยไว้ใกล้มือ 🗃️ ยิ่งใกล้ผู้ใช้ยิ่งเร็ว\n\n**Browser cache** (ในเครื่องผู้ใช้) → **CDN** (edge ใกล้ผู้ใช้) → **Server cache** เช่น Redis (หน้า DB) → **Database**',
        },
        {
          type: 'table',
          title: 'Cache-Control ที่ใช้บ่อย',
          headers: ['Directive', 'ความหมาย'],
          rows: [
            ['`max-age=3600`', 'ใช้ cache ได้ 1 ชม. ไม่ต้องถาม server'],
            ['`s-maxage=600`', 'อายุสำหรับ shared cache (CDN)'],
            ['`no-cache`', 'เก็บได้ แต่ต้องถาม server ก่อนใช้ทุกครั้ง'],
            ['`no-store`', 'ห้ามเก็บเลย (ข้อมูลลับ)'],
            ['`private`', 'เก็บได้แค่ใน browser ไม่ใช่ CDN'],
            ['`public`', 'ใครก็ cache ได้'],
            ['`immutable`', 'ไฟล์นี้ไม่มีวันเปลี่ยน'],
            ['`stale-while-revalidate=60`', 'ส่งของเก่าไปก่อน แล้วอัปเดตเบื้องหลัง'],
          ],
        },
        {
          type: 'text',
          title: 'ETag / 304',
          body: 'server ส่ง `ETag: "abc123"` (ลายนิ้วมือของเนื้อหา) 🫆 รอบหน้า browser ส่ง `If-None-Match: "abc123"` ถ้ายังเหมือนเดิม server ตอบ `304 Not Modified` ไม่ต้องส่ง body ซ้ำ ประหยัดเน็ต',
        },
        {
          type: 'code',
          title: 'Redis: cache-aside pattern',
          lang: 'js',
          code: `import { createClient } from 'redis'
const redis = await createClient({ url: process.env.REDIS_URL }).connect()

async function getProduct(id) {
  const key = 'product:' + id
  const cached = await redis.get(key)
  if (cached) return JSON.parse(cached) // cache hit 🎯

  const product = await db.product.findUnique({ where: { id } }) // miss → DB
  await redis.set(key, JSON.stringify(product), { EX: 300 }) // เก็บ 5 นาที
  return product
}

async function updateProduct(id, data) {
  const product = await db.product.update({ where: { id }, data })
  await redis.del('product:' + id) // ลบ cache เก่าทิ้ง
  return product
}`,
        },
        {
          type: 'tip',
          body: 'ไฟล์ static ที่มี hash ในชื่อ (เช่น `app.3f9a.js` จาก Vite) ตั้ง `Cache-Control: public, max-age=31536000, immutable` ได้เลย ส่วน `index.html` ใช้ `no-cache` จะได้อัปเดตเวอร์ชันใหม่ทันที ✨',
        },
        {
          type: 'warn',
          body: 'ระวังเรื่อง **cache invalidation** ข้อมูลเปลี่ยนแล้วต้องลบ/อัปเดต cache ด้วย และอย่าให้ CDN cache หน้าที่มีข้อมูลส่วนตัวของผู้ใช้ (ใช้ `private`)',
        },
      ],
    },

    // ───────────────────────── Security ─────────────────────────
    {
      id: 'web-security',
      title: 'Web Security พื้นฐาน',
      emoji: '🛡️',
      summary: 'XSS, CSRF, SQL Injection และ OWASP Top 10 ที่ต้องรู้',
      tags: ['security', 'xss', 'csrf', 'sql-injection', 'owasp'],
      sections: [
        {
          type: 'text',
          title: 'XSS (Cross-Site Scripting) 💉',
          body: 'คนร้ายแอบใส่ JavaScript เข้ามาในหน้าเว็บเรา (เช่น ผ่านช่องคอมเมนต์) แล้วโค้ดไปรันในเครื่องคนอื่น → ขโมย cookie/token, แก้หน้าเว็บ\n\nกันยังไง: **escape output** เสมอ, ห้ามใส่ HTML จาก user ตรงๆ, ใช้ **CSP** (Content-Security-Policy), cookie `HttpOnly`',
        },
        {
          type: 'code',
          title: 'XSS: ผิด vs ถูก',
          lang: 'js',
          code: `const comment = '<img src=x onerror="alert(document.cookie)">'

// ❌ อันตราย: browser แปลงเป็น HTML แล้วรันสคริปต์
el.innerHTML = comment

// ✅ ปลอดภัย: แสดงเป็นข้อความธรรมดา
el.textContent = comment

// React escape ให้อัตโนมัติ ✅ <p>{comment}</p>
// แต่ dangerouslySetInnerHTML ❌ ต้อง sanitize ด้วย DOMPurify ก่อน`,
        },
        {
          type: 'text',
          title: 'CSRF (Cross-Site Request Forgery) 🎣',
          body: 'เว็บร้ายหลอกให้ browser ของเราส่ง request ไปยังเว็บที่เรา login ค้างไว้ (browser แนบ cookie ให้เอง!) เช่น แอบโอนเงิน\n\nกันยังไง: cookie `SameSite=Lax/Strict`, **CSRF token** ในฟอร์ม, เช็ค `Origin` header, ห้ามใช้ GET เปลี่ยนข้อมูล',
        },
        {
          type: 'text',
          title: 'SQL Injection 🗡️',
          body: 'เอา input ของ user ไปต่อ string เป็น SQL ตรงๆ → คนร้ายใส่ `\' OR 1=1 --` แล้วอ่าน/ลบข้อมูลทั้งตารางได้\n\nกันยังไง: **parameterized query** เสมอ หรือใช้ ORM',
        },
        {
          type: 'code',
          title: 'SQL Injection: ผิด vs ถูก',
          lang: 'js',
          code: `// ❌ ต่อ string = เปิดประตูรับแฮกเกอร์
const sql = "SELECT * FROM users WHERE email = '" + email + "'"

// ✅ parameterized (node-postgres)
const { rows } = await pool.query(
  'SELECT * FROM users WHERE email = $1',
  [email]
)

// ✅ ORM ก็ทำให้อัตโนมัติ (Prisma)
const user = await prisma.user.findUnique({ where: { email } })`,
        },
        {
          type: 'list',
          title: 'OWASP Top 10 (2021) ย่อๆ',
          items: [
            '**A01** Broken Access Control — เข้าถึงของคนอื่นได้ (เช็คสิทธิ์ทุก endpoint!)',
            '**A02** Cryptographic Failures — เก็บรหัสผ่าน/ข้อมูลลับไม่เข้ารหัส',
            '**A03** Injection — SQL, NoSQL, command, XSS',
            '**A04** Insecure Design — ออกแบบไม่คิดเรื่องความปลอดภัย',
            '**A05** Security Misconfiguration — ค่า default, เปิด debug ใน prod',
            '**A06** Vulnerable Components — ใช้ library เก่ามีช่องโหว่',
            '**A07** Auth Failures — รหัสง่าย, ไม่มี rate limit, session หลุด',
            '**A08** Integrity Failures — ไม่ตรวจ update/CI pipeline',
            '**A09** Logging & Monitoring Failures — โดนแฮกแล้วไม่รู้ตัว',
            '**A10** SSRF — หลอกให้ server ยิง request ไปที่ภายใน',
          ],
        },
        {
          type: 'tip',
          body: 'checklist ขั้นต่ำ 🧸 HTTPS ทุกที่ · hash รหัสผ่านด้วย **bcrypt/argon2** · validate input ฝั่ง server · rate limit หน้า login · อัปเดต dependency (`npm audit`) · ใส่ security headers (`helmet`)',
        },
      ],
    },

    // ───────────────────────── JSON & fetch ─────────────────────────
    {
      id: 'json-fetch-axios',
      title: 'JSON & fetch / axios',
      emoji: '📨',
      summary: 'รูปแบบข้อมูลยอดฮิต และวิธียิง API จาก JavaScript ให้ถูกต้อง',
      tags: ['json', 'fetch', 'axios', 'javascript', 'api', 'http-client'],
      sections: [
        {
          type: 'text',
          body: '**JSON** (JavaScript Object Notation) คือรูปแบบข้อมูลที่ API แทบทุกตัวใช้ 📨 อ่านง่าย รองรับ: string, number, boolean, `null`, array, object\n\nกฎ: key ต้องเป็น `"double quote"` เสมอ, ไม่มี trailing comma, ไม่มี comment, ไม่มี `undefined`/function/Date (Date ต้องเป็น string ISO)',
        },
        {
          type: 'code',
          title: 'แปลงไปมา',
          lang: 'js',
          code: `const user = { name: 'Mochi', age: 3, tags: ['cat', 'cute'] }

const text = JSON.stringify(user)          // object → string
const pretty = JSON.stringify(user, null, 2) // จัดย่อหน้าสวยๆ
const back = JSON.parse(text)              // string → object

JSON.stringify({ at: new Date(0) }) // '{"at":"1970-01-01T00:00:00.000Z"}'`,
        },
        {
          type: 'code',
          title: 'fetch แบบถูกต้อง (เช็ค res.ok!)',
          lang: 'js',
          code: `async function api(path, { method = 'GET', body, signal } = {}) {
  const res = await fetch('/api' + path, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
    signal,
  })
  if (!res.ok) {
    // fetch ไม่ throw ตอน 4xx/5xx ต้องเช็คเอง!
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error || 'HTTP ' + res.status)
  }
  return res.status === 204 ? null : res.json()
}

// ใช้งาน + timeout 5 วิ
const todos = await api('/todos', { signal: AbortSignal.timeout(5000) })
await api('/todos', { method: 'POST', body: { title: 'ป้อนข้าวแมว' } })`,
        },
        {
          type: 'code',
          title: 'axios + interceptor',
          lang: 'js',
          code: `import axios from 'axios'

const http = axios.create({ baseURL: '/api', timeout: 5000 })

// แนบ token ทุก request
http.interceptors.request.use((config) => {
  const token = getAccessToken()
  if (token) config.headers.Authorization = 'Bearer ' + token
  return config
})

// จัดการ 401 ที่เดียว
http.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) redirectToLogin()
    return Promise.reject(error)
  }
)

const { data } = await http.get('/todos', { params: { done: false } })
await http.post('/todos', { title: 'นอนกลางวัน' }) // แปลง JSON ให้เอง`,
        },
        {
          type: 'table',
          title: 'fetch vs axios',
          headers: ['', 'fetch', 'axios'],
          rows: [
            ['ติดตั้ง', 'มีในตัว (browser + Node 18+)', '`npm i axios`'],
            ['แปลง JSON', 'ต้อง `res.json()` เอง', 'อัตโนมัติ (`res.data`)'],
            ['4xx/5xx', 'ไม่ throw', 'throw ให้เลย'],
            ['Interceptor', 'ไม่มี (ห่อฟังก์ชันเอง)', 'มี'],
            ['Timeout', '`AbortSignal.timeout()`', 'option `timeout`'],
          ],
        },
        {
          type: 'pairs',
          title: 'ใช้คู่กับ',
          items: ['TanStack Query', 'SWR', 'ky', 'ofetch', 'Zod', 'MSW', 'Postman', 'Bruno'],
        },
        {
          type: 'tip',
          body: 'ข้อมูลจาก API อาจไม่ตรงกับที่คิด 🙈 ลอง validate ด้วย **Zod** (`schema.parse(data)`) ก่อนใช้ จะจับบั๊กได้ตั้งแต่ต้นทาง',
        },
      ],
    },
  ],
}
