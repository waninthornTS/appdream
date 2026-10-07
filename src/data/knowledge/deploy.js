export default {
  id: 'deploy',
  title: 'Deploy & DevOps',
  emoji: '🚀',
  color: '#f6b8a2',
  intro: 'เขียนเสร็จแล้วต้องส่งขึ้นฟ้า! มาดูทุกทางพาแอปจากเครื่องเราไปให้คนทั้งโลกใช้กัน ☁️✨',
  topics: [
    {
      id: 'what-is-deploy',
      title: 'Deploy คืออะไร',
      emoji: '📮',
      summary: 'เอาโค้ดไปรันบนเครื่องที่ผู้ใช้เข้าถึงได้ ผ่าน dev → staging → prod',
      tags: ['deploy', 'environment', 'staging', 'production', 'build', 'release'],
      sections: [
        {
          type: 'text',
          body: '**Deploy** = การนำแอปเวอร์ชันใหม่ไปรันบน server/บริการที่ผู้ใช้จริงเข้าถึงได้\n\nปกติแบ่ง environment เป็นชั้นๆ เพื่อกันของพังหลุดไปถึงผู้ใช้ 🧯',
        },
        {
          type: 'table',
          headers: ['Env', 'ใช้ทำอะไร', 'ข้อมูล'],
          rows: [
            ['**dev / local**', 'เขียนโค้ด ลองผิดลองถูก', 'ข้อมูลปลอม'],
            ['**staging**', 'ทดสอบก่อนปล่อย ให้ QA/PO ดู', 'คล้าย prod แต่ไม่ใช่ของจริง'],
            ['**production**', 'ผู้ใช้จริงใช้งาน', 'ข้อมูลจริง ห้ามพัง!'],
          ],
        },
        {
          type: 'steps',
          title: 'Build → Release → Run (12-Factor)',
          items: [
            '**Build** — แปลงโค้ดเป็นของพร้อมรัน (`npm run build`, Docker image)',
            '**Release** — เอา build มารวมกับ config ของ env นั้นๆ ได้เวอร์ชันที่ระบุตัวตนได้ (เช่น v1.4.2)',
            '**Run** — สั่งรัน release นั้นบน server',
          ],
        },
        {
          type: 'code',
          title: 'ตัวอย่าง flow ง่ายๆ',
          lang: 'bash',
          code: `npm ci              # ลง dependency ตาม lockfile เป๊ะๆ
npm test            # เทสต์ผ่านก่อน
npm run build       # ได้โฟลเดอร์ dist/
# อัปโหลด dist/ ขึ้น hosting หรือ build เป็น Docker image`,
        },
        {
          type: 'tip',
          body: 'Build ครั้งเดียว แล้วใช้ artifact เดียวกันไล่จาก staging → prod เปลี่ยนแค่ config จะได้มั่นใจว่าของที่เทสต์คือของที่ปล่อยจริง 🎯',
        },
      ],
    },
    {
      id: 'deploy-options',
      title: 'ภาพรวมทางเลือกการ Deploy',
      emoji: '🗺️',
      summary: 'Static, PaaS, Serverless, VPS, Container, Kubernetes ต่างกันยังไง เลือกอะไรดี',
      tags: ['hosting', 'paas', 'serverless', 'vps', 'container', 'kubernetes', 'comparison'],
      sections: [
        {
          type: 'table',
          headers: ['แบบ', 'ข้อดี', 'ข้อเสีย', 'ตัวอย่าง'],
          rows: [
            ['**Static hosting**', 'ฟรี/ถูก, เร็ว (CDN), ง่ายสุด', 'ไม่มี backend', 'Vercel, Netlify, GitHub Pages, Cloudflare Pages'],
            ['**PaaS**', 'push แล้วรันเลย ไม่ต้องดูแล server', 'แพงขึ้นเมื่อโต, ปรับแต่งจำกัด', 'Render, Railway, Heroku, Fly.io'],
            ['**Serverless**', 'จ่ายตามใช้, scale อัตโนมัติ', 'cold start, จำกัดเวลารัน', 'AWS Lambda, Cloudflare Workers'],
            ['**VPS**', 'ควบคุมได้หมด, ราคาคงที่', 'ต้องดูแลเอง (security, update)', 'DigitalOcean, Linode, Lightsail'],
            ['**Container**', 'รันเหมือนกันทุกที่', 'ต้องเรียนรู้ Docker', 'Cloud Run, ECS, Fly.io'],
            ['**Kubernetes**', 'scale ใหญ่, self-healing', 'ซับซ้อนมาก', 'EKS, GKE, AKS'],
          ],
        },
        {
          type: 'list',
          title: 'เลือกยังไงดี 🤔',
          items: [
            'เว็บ React/Vite ล้วนๆ → **Static hosting**',
            'มี API + DB โปรเจกต์เล็ก-กลาง → **PaaS**',
            'API เล็กๆ/webhook ที่ traffic ไม่แน่นอน → **Serverless**',
            'อยากเรียนรู้ / คุมงบ / รันหลายอย่าง → **VPS + Docker**',
            'ทีมใหญ่ microservices เยอะ → **Kubernetes**',
          ],
        },
        {
          type: 'tip',
          body: 'เริ่มจากของที่ง่ายที่สุดที่ตอบโจทย์ก่อน อย่าเพิ่งกระโดดไป Kubernetes ถ้ายังมีแค่แอปเดียว 🐣',
        },
      ],
    },
    {
      id: 'static-hosting',
      title: 'Static Hosting (Vercel, Netlify, Pages)',
      emoji: '🌤️',
      summary: 'deploy เว็บ React/Vite ขึ้นฟรีภายในไม่กี่นาที',
      tags: ['vercel', 'netlify', 'github pages', 'cloudflare pages', 'vite', 'react', 'spa'],
      sections: [
        {
          type: 'steps',
          title: 'Vercel / Netlify / Cloudflare Pages (ผ่าน Git)',
          items: [
            'push โปรเจกต์ขึ้น GitHub',
            'สมัคร/ล็อกอินเว็บ hosting แล้วกด **Import project** เลือก repo',
            'ตั้ง Build command: `npm run build`',
            'ตั้ง Output directory: `dist` (Vite) หรือ `build` (CRA)',
            'ใส่ Environment variables (ของ Vite ต้องขึ้นต้น `VITE_`)',
            'กด Deploy 🎉 — ต่อไป push เมื่อไหร่ deploy อัตโนมัติ และ PR ได้ preview URL',
          ],
        },
        {
          type: 'code',
          title: 'หรือใช้ CLI',
          lang: 'bash',
          code: `# Vercel
npm i -g vercel
vercel          # preview
vercel --prod   # production

# Netlify
npm i -g netlify-cli
netlify deploy --dir=dist --prod`,
        },
        {
          type: 'text',
          title: 'GitHub Pages + Vite',
          body: 'ถ้าเว็บอยู่ที่ `https://user.github.io/my-app/` ต้องตั้ง `base` ให้ตรงชื่อ repo แล้วใช้ GitHub Actions deploy (Settings → Pages → Source: GitHub Actions)',
        },
        {
          type: 'code',
          title: 'vite.config.js',
          lang: 'js',
          code: `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/my-app/',   // ชื่อ repo
})`,
        },
        {
          type: 'warn',
          body: 'SPA ที่ใช้ React Router ถ้า refresh หน้า `/about` แล้วเจอ 404 ต้องตั้ง rewrite ทุก path ไป `index.html` เช่น Netlify ใช้ไฟล์ `public/_redirects` ใส่ `/* /index.html 200` ส่วน GitHub Pages ใช้ HashRouter หรือ copy `index.html` เป็น `404.html`',
        },
      ],
    },
    {
      id: 'paas',
      title: 'PaaS: Render, Railway, Heroku, Fly.io',
      emoji: '🚂',
      summary: 'ส่งโค้ด backend ขึ้นไปรันพร้อม DB โดยไม่ต้องจัดการ server เอง',
      tags: ['paas', 'render', 'railway', 'heroku', 'fly.io', 'backend'],
      sections: [
        {
          type: 'table',
          headers: ['บริการ', 'จุดเด่น', 'หมายเหตุ'],
          rows: [
            ['**Render**', 'ใช้ง่าย, มี Postgres/Redis, static site', 'free tier sleep เมื่อไม่มีคนใช้'],
            ['**Railway**', 'UI น่ารัก, ต่อ DB ไม่กี่คลิก', 'คิดตาม usage'],
            ['**Heroku**', 'รุ่นบุกเบิก, Procfile, add-ons เยอะ', 'ไม่มี free tier แล้ว'],
            ['**Fly.io**', 'รัน container ใกล้ผู้ใช้หลาย region', 'ใช้ `flyctl`, ต้องรู้ Docker นิดหน่อย'],
          ],
        },
        {
          type: 'steps',
          title: 'ขั้นตอนทั่วไป',
          items: [
            'เชื่อม GitHub repo',
            'ตั้ง Build command (`npm ci && npm run build`) และ Start command (`npm start`)',
            'ใส่ env vars เช่น `DATABASE_URL`',
            'แอปต้อง listen port จาก `process.env.PORT`',
            'Deploy แล้วได้ URL https ฟรี',
          ],
        },
        {
          type: 'code',
          title: 'Express ที่พร้อมขึ้น PaaS',
          lang: 'js',
          code: `import express from 'express'
const app = express()

app.get('/health', (req, res) => res.json({ ok: true }))

const port = process.env.PORT || 3000
app.listen(port, '0.0.0.0', () => {
  console.log('listening on', port)
})`,
        },
        {
          type: 'code',
          title: 'Fly.io',
          lang: 'bash',
          code: `fly launch        # สร้าง fly.toml + Dockerfile ให้
fly deploy        # deploy
fly logs          # ดู log
fly secrets set DATABASE_URL=postgres://...`,
        },
        {
          type: 'tip',
          body: 'ทำ endpoint `/health` ไว้เสมอ PaaS ส่วนใหญ่ใช้เช็กว่าแอปพร้อมรับ traffic ก่อนสลับเวอร์ชัน 💚',
        },
      ],
    },
    {
      id: 'serverless',
      title: 'Serverless Functions',
      emoji: '⚡',
      summary: 'เขียนแค่ฟังก์ชัน ผู้ให้บริการรันให้เมื่อมี request จ่ายตามที่ใช้',
      tags: ['serverless', 'lambda', 'cloudflare workers', 'vercel functions', 'edge', 'faas'],
      sections: [
        {
          type: 'text',
          body: '**Serverless** ไม่ได้แปลว่าไม่มี server แต่เราไม่ต้องดูแลมันเอง 😌 ฟังก์ชันจะถูกปลุกเมื่อมี event (HTTP, cron, queue) แล้วหลับไป scale เป็น 0 ได้\n\nข้อควรรู้: **cold start** (ครั้งแรกช้า), **stateless** (อย่าเก็บข้อมูลใน memory), จำกัดเวลารัน',
        },
        {
          type: 'code',
          title: 'Vercel Function: api/hello.js',
          lang: 'js',
          code: `export default function handler(req, res) {
  const name = req.query.name || 'friend'
  res.status(200).json({ message: 'สวัสดี ' + name })
}
// เรียกได้ที่ /api/hello?name=mint`,
        },
        {
          type: 'code',
          title: 'Cloudflare Worker',
          lang: 'js',
          code: `export default {
  async fetch(request, env) {
    const url = new URL(request.url)
    if (url.pathname === '/ping') {
      return Response.json({ pong: true })
    }
    return new Response('Not found', { status: 404 })
  },
}
// deploy: npx wrangler deploy`,
        },
        {
          type: 'code',
          title: 'AWS Lambda (Node.js)',
          lang: 'js',
          code: `export const handler = async (event) => {
  const body = JSON.parse(event.body || '{}')
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ received: body }),
  }
}`,
          note: 'มักใช้คู่กับ API Gateway หรือ Function URL',
        },
        {
          type: 'warn',
          body: 'เปิด connection DB ใหม่ทุก request จะทำ DB ล่ม! ใช้ connection pooler (เช่น PgBouncer, RDS Proxy) หรือ DB แบบ serverless/HTTP',
        },
      ],
    },
    {
      id: 'vps-deploy',
      title: 'VPS: Ubuntu + Nginx + PM2 + SSL',
      emoji: '🖥️',
      summary: 'deploy Node app เองบน VPS แบบครบสูตร',
      tags: ['vps', 'ubuntu', 'nginx', 'pm2', 'reverse proxy', "let's encrypt", 'certbot', 'ssl'],
      sections: [
        {
          type: 'steps',
          title: 'ภาพรวม',
          items: [
            'เช่า VPS (Ubuntu LTS), ชี้ domain (A record) มาที่ IP',
            'สร้าง user ไม่ใช่ root + ตั้ง SSH key + เปิด firewall',
            'ลง Node.js, รันแอปด้วย **PM2** ที่ port 3000',
            '**Nginx** รับ 80/443 แล้ว reverse proxy ไป 3000',
            'ขอ SSL ฟรีจาก **Let\'s Encrypt** ด้วย certbot',
          ],
        },
        {
          type: 'code',
          title: '1) เตรียมเครื่อง',
          lang: 'bash',
          code: `sudo apt update && sudo apt upgrade -y
sudo adduser deploy && sudo usermod -aG sudo deploy
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable
sudo apt install -y nginx
# ลง Node ผ่าน nvm หรือ NodeSource`,
        },
        {
          type: 'code',
          title: '2) รันแอปด้วย PM2',
          lang: 'bash',
          code: `git clone https://github.com/me/myapp.git && cd myapp
npm ci && npm run build
npm i -g pm2
pm2 start server.js --name myapp
pm2 save           # จำรายการ process
pm2 startup        # ทำตามคำสั่งที่มันพิมพ์ เพื่อให้รันตอนบูต
pm2 logs myapp`,
        },
        {
          type: 'code',
          title: '3) /etc/nginx/sites-available/myapp',
          lang: 'nginx',
          code: `server {
    listen 80;
    server_name example.com www.example.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}`,
        },
        {
          type: 'code',
          title: '4) เปิดใช้ + SSL',
          lang: 'bash',
          code: `sudo ln -s /etc/nginx/sites-available/myapp /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx

sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d example.com -d www.example.com
sudo certbot renew --dry-run   # เช็กว่าต่ออายุอัตโนมัติได้`,
        },
        {
          type: 'tip',
          body: 'ทุกครั้งที่แก้ config Nginx ให้รัน `sudo nginx -t` ก่อน reload เสมอ ถ้า syntax ผิดจะได้ไม่ล่มทั้งเว็บ 🙏',
        },
      ],
    },
    {
      id: 'docker',
      title: 'Docker พื้นฐาน',
      emoji: '🐳',
      summary: 'แพ็กแอปพร้อมทุกอย่างที่ต้องใช้ รันได้เหมือนกันทุกเครื่อง',
      tags: ['docker', 'container', 'image', 'dockerfile', 'volume', 'multi-stage'],
      sections: [
        {
          type: 'list',
          title: 'คำศัพท์สำคัญ',
          items: [
            '**Image** — แม่พิมพ์ (read-only) สร้างจาก Dockerfile',
            '**Container** — ตัวที่กำลังรันจาก image (สร้างได้หลายตัว)',
            '**Volume** — ที่เก็บข้อมูลถาวร ไม่หายเมื่อลบ container',
            '**Network** — ให้ container คุยกันด้วยชื่อ',
            '**Registry** — คลัง image เช่น Docker Hub, GHCR',
          ],
        },
        {
          type: 'code',
          title: 'Dockerfile (Node, multi-stage)',
          lang: 'dockerfile',
          code: `# --- build stage ---
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# --- runtime stage ---
FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=build /app/dist ./dist
USER node
EXPOSE 3000
CMD ["node", "dist/server.js"]`,
          note: 'copy package.json ก่อนโค้ด → ใช้ layer cache ได้ build เร็วขึ้น',
        },
        {
          type: 'code',
          title: '.dockerignore',
          lang: 'text',
          code: `node_modules
dist
.git
.env
*.log`,
        },
        {
          type: 'code',
          title: 'คำสั่งที่ใช้บ่อย',
          lang: 'bash',
          code: `docker build -t myapp:1.0 .
docker run -d -p 3000:3000 --name myapp --env-file .env myapp:1.0
docker ps                 # container ที่รันอยู่ (-a ดูทั้งหมด)
docker logs -f myapp
docker exec -it myapp sh  # เข้าไปข้างใน
docker stop myapp && docker rm myapp
docker images
docker volume ls
docker system prune       # เก็บกวาดของไม่ใช้`,
        },
        {
          type: 'tip',
          body: '`-p 8080:3000` คือ `host:container` — เปิด `localhost:8080` บนเครื่องเรา จะเข้าไปที่ port 3000 ใน container 🔌',
        },
      ],
    },
    {
      id: 'docker-compose',
      title: 'Docker Compose',
      emoji: '🎼',
      summary: 'รันหลาย container (app + DB + cache) ด้วยไฟล์เดียว',
      tags: ['docker compose', 'postgres', 'redis', 'yaml', 'multi-container'],
      sections: [
        {
          type: 'code',
          title: 'compose.yaml',
          lang: 'yaml',
          code: `services:
  app:
    build: .
    ports: ["3000:3000"]
    environment:
      DATABASE_URL: postgres://app:secret@db:5432/appdb
      REDIS_URL: redis://cache:6379
    depends_on:
      db: { condition: service_healthy }
      cache: { condition: service_started }
  db:
    image: postgres:16
    environment:
      POSTGRES_USER: app
      POSTGRES_PASSWORD: secret
      POSTGRES_DB: appdb
    volumes: [pgdata:/var/lib/postgresql/data]
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U app"]
      interval: 5s
  cache:
    image: redis:7-alpine
volumes:
  pgdata:`,
          note: 'ใน network ของ compose เรียกกันด้วยชื่อ service เช่น host `db`, `cache`',
        },
        {
          type: 'code',
          title: 'คำสั่ง',
          lang: 'bash',
          code: `docker compose up -d          # รันทั้งหมด (background)
docker compose up -d --build  # build ใหม่ด้วย
docker compose ps
docker compose logs -f app
docker compose exec db psql -U app appdb
docker compose down           # หยุด + ลบ container
docker compose down -v        # ลบ volume ด้วย (ข้อมูลหาย!)`,
        },
        {
          type: 'warn',
          body: 'อย่าใส่ password จริงในไฟล์ compose ที่ commit ขึ้น Git ใช้ไฟล์ `.env` (compose อ่านอัตโนมัติ) แล้วอ้างอิงแบบ `${POSTGRES_PASSWORD}` แทน',
        },
      ],
    },
    {
      id: 'kubernetes',
      title: 'Kubernetes พื้นฐาน',
      emoji: '☸️',
      summary: 'ระบบจัดการ container จำนวนมาก: scale, self-healing, rolling update',
      tags: ['kubernetes', 'k8s', 'pod', 'deployment', 'service', 'ingress', 'kubectl'],
      sections: [
        {
          type: 'list',
          title: 'ตัวละครหลัก',
          items: [
            '**Pod** — หน่วยเล็กสุด มี container 1+ ตัว',
            '**Deployment** — บอกว่าอยากได้ pod กี่ตัว เวอร์ชันไหน k8s คอยดูแลให้ตรง',
            '**Service** — IP/ชื่อคงที่ กระจาย traffic ไปหลาย pod',
            '**Ingress** — ประตูรับ HTTP จากข้างนอก route ตาม domain/path',
            '**ConfigMap / Secret** — เก็บ config และความลับ',
            '**Namespace** — แบ่งห้องในคลัสเตอร์',
          ],
        },
        {
          type: 'code',
          title: 'deployment.yaml',
          lang: 'yaml',
          code: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp
spec:
  replicas: 3
  selector:
    matchLabels: { app: myapp }
  template:
    metadata:
      labels: { app: myapp }
    spec:
      containers:
        - name: myapp
          image: ghcr.io/me/myapp:1.0
          ports: [{ containerPort: 3000 }]
          readinessProbe:
            httpGet: { path: /health, port: 3000 }`,
        },
        {
          type: 'code',
          title: 'service.yaml',
          lang: 'yaml',
          code: `apiVersion: v1
kind: Service
metadata:
  name: myapp
spec:
  selector: { app: myapp }
  ports:
    - port: 80
      targetPort: 3000`,
        },
        {
          type: 'code',
          title: 'ingress.yaml',
          lang: 'yaml',
          code: `apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: myapp
spec:
  ingressClassName: nginx
  rules:
    - host: app.example.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service: { name: myapp, port: { number: 80 } }`,
          note: 'ต้องมี Ingress Controller (เช่น ingress-nginx) ในคลัสเตอร์ก่อน',
        },
        {
          type: 'code',
          title: 'kubectl ที่ใช้บ่อย',
          lang: 'bash',
          code: `kubectl apply -f deployment.yaml -f service.yaml
kubectl get pods -o wide
kubectl describe pod myapp-abc123
kubectl logs -f deploy/myapp
kubectl scale deploy/myapp --replicas=5
kubectl set image deploy/myapp myapp=ghcr.io/me/myapp:1.1
kubectl rollout status deploy/myapp
kubectl rollout undo deploy/myapp
kubectl port-forward svc/myapp 8080:80`,
        },
        {
          type: 'tip',
          body: 'อยากลองเล่นในเครื่อง ใช้ `kind`, `minikube` หรือเปิด Kubernetes ใน Docker Desktop ได้เลย 🧪',
        },
      ],
    },
    {
      id: 'ci-cd',
      title: 'CI/CD & GitHub Actions',
      emoji: '🔁',
      summary: 'ให้หุ่นยนต์เทสต์และ deploy ให้ทุกครั้งที่ push',
      tags: ['ci', 'cd', 'github actions', 'pipeline', 'workflow', 'automation'],
      sections: [
        {
          type: 'list',
          items: [
            '**CI (Continuous Integration)** — push/PR ทุกครั้ง → lint, test, build อัตโนมัติ เจอบั๊กเร็ว',
            '**Continuous Delivery** — พร้อม deploy ได้ตลอด แต่กดปล่อย prod เอง',
            '**Continuous Deployment** — ผ่านเทสต์แล้วขึ้น prod เองเลย',
          ],
        },
        {
          type: 'code',
          title: '.github/workflows/ci.yml',
          lang: 'yaml',
          code: `name: CI
on:
  push: { branches: [main] }
  pull_request:

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 22, cache: npm }
      - run: npm ci
      - run: npm run lint
      - run: npm test
      - run: npm run build`,
        },
        {
          type: 'code',
          title: 'เพิ่ม job deploy (เฉพาะ main)',
          lang: 'yaml',
          code: `  deploy:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    environment: production
    steps:
      - uses: actions/checkout@v4
      - name: Deploy via SSH
        uses: appleboy/ssh-action@v1
        with:
          host: \${{ secrets.VPS_HOST }}
          username: deploy
          key: \${{ secrets.SSH_KEY }}
          script: |
            cd ~/myapp && git pull
            npm ci && npm run build
            pm2 reload myapp`,
          note: 'ใส่ secret ที่ Settings → Secrets and variables → Actions',
        },
        {
          type: 'tip',
          body: 'ตั้ง **branch protection** ให้ `main` ต้องผ่าน CI ก่อน merge ได้ — กันโค้ดพังหลุดเข้า main 🛡️',
        },
      ],
    },
    {
      id: 'cloud-providers',
      title: 'Cloud Providers: AWS / GCP / Azure',
      emoji: '☁️',
      summary: 'เทียบบริการหลักของ 3 เจ้าใหญ่',
      tags: ['aws', 'gcp', 'azure', 'cloud', 'comparison'],
      sections: [
        {
          type: 'table',
          headers: ['ประเภท', 'AWS', 'GCP', 'Azure'],
          rows: [
            ['VM', 'EC2', 'Compute Engine', 'Virtual Machines'],
            ['Serverless fn', 'Lambda', 'Cloud Run functions', 'Azure Functions'],
            ['Container', 'ECS / Fargate', 'Cloud Run', 'Container Apps'],
            ['Kubernetes', 'EKS', 'GKE', 'AKS'],
            ['Object storage', 'S3', 'Cloud Storage', 'Blob Storage'],
            ['SQL DB', 'RDS / Aurora', 'Cloud SQL / AlloyDB', 'Azure SQL / PostgreSQL'],
            ['NoSQL', 'DynamoDB', 'Firestore / Bigtable', 'Cosmos DB'],
            ['CDN', 'CloudFront', 'Cloud CDN', 'Front Door'],
            ['DNS', 'Route 53', 'Cloud DNS', 'Azure DNS'],
            ['Secrets', 'Secrets Manager', 'Secret Manager', 'Key Vault'],
            ['Monitoring', 'CloudWatch', 'Cloud Monitoring', 'Azure Monitor'],
          ],
        },
        {
          type: 'list',
          title: 'จุดเด่นคร่าวๆ',
          items: [
            '**AWS** — บริการเยอะสุด ตลาดใหญ่สุด',
            '**GCP** — Cloud Run/GKE ใช้ง่าย, BigQuery เด่นเรื่อง data',
            '**Azure** — เข้ากับ Microsoft/.NET/องค์กร',
          ],
        },
        {
          type: 'warn',
          body: 'ตั้ง **Budget alert** ตั้งแต่วันแรก! ลืมปิด resource หรือ key หลุดขึ้น GitHub อาจโดนบิลหลักแสนได้ 💸',
        },
      ],
    },
    {
      id: 'domain-dns-ssl-cdn',
      title: 'Domain, DNS, SSL & CDN',
      emoji: '🌍',
      summary: 'ทำให้คนพิมพ์ชื่อเว็บแล้วมาถึงแอปเราอย่างปลอดภัยและเร็ว',
      tags: ['domain', 'dns', 'ssl', 'tls', 'https', 'cdn', 'cloudflare'],
      sections: [
        {
          type: 'text',
          body: '**Domain** = ชื่อเว็บที่ซื้อจาก registrar\n\n**DNS** = สมุดโทรศัพท์ แปลงชื่อเป็น IP\n\n**SSL/TLS** = เข้ารหัสการสื่อสาร ทำให้ได้ `https://` 🔒\n\n**CDN** = แคชไฟล์ไว้ server ใกล้ผู้ใช้ทั่วโลก โหลดเร็วขึ้น',
        },
        {
          type: 'table',
          title: 'DNS record ที่ใช้บ่อย',
          headers: ['Type', 'ใช้ทำอะไร', 'ตัวอย่าง'],
          rows: [
            ['A', 'ชื่อ → IPv4', '`example.com → 203.0.113.10`'],
            ['AAAA', 'ชื่อ → IPv6', '`example.com → 2001:db8::1`'],
            ['CNAME', 'ชื่อ → ชื่ออื่น', '`www → cname.vercel-dns.com`'],
            ['MX', 'mail server', '`mail.example.com`'],
            ['TXT', 'ยืนยันเจ้าของ, SPF', '`v=spf1 ...`'],
          ],
        },
        {
          type: 'code',
          title: 'เช็ก DNS & SSL',
          lang: 'bash',
          code: `dig example.com A +short
dig www.example.com CNAME +short
nslookup example.com
curl -vI https://example.com 2>&1 | grep -i "expire"`,
        },
        {
          type: 'tip',
          body: 'เปลี่ยน DNS แล้วยังไม่เห็นผล? รอ TTL หมดก่อน (บางทีเป็นชั่วโมง) ลดค่า TTL ล่วงหน้าก่อนย้าย server จะช่วยได้ ⏳',
        },
      ],
    },
    {
      id: 'env-secrets',
      title: 'Environment Variables & Secrets',
      emoji: '🤫',
      summary: 'แยก config ออกจากโค้ด และเก็บความลับให้ปลอดภัย',
      tags: ['env', 'secrets', 'dotenv', '.env', 'security', 'config'],
      sections: [
        {
          type: 'text',
          body: 'config ที่ต่างกันในแต่ละ env (URL ของ DB, API key) ควรอยู่ใน **environment variables** ไม่ใช่ hardcode ในโค้ด (หลัก 12-Factor)',
        },
        {
          type: 'code',
          title: '.env + Node',
          lang: 'bash',
          code: `# .env  (ห้าม commit!)
DATABASE_URL=postgres://app:secret@localhost:5432/appdb
JWT_SECRET=change-me

# .env.example  (commit ได้ บอกว่าต้องมีค่าอะไรบ้าง)
DATABASE_URL=
JWT_SECRET=

# Node 20.6+ โหลด .env ได้เอง
node --env-file=.env server.js`,
        },
        {
          type: 'code',
          title: 'Vite: เฉพาะตัวที่ขึ้นต้น VITE_ ถึงไปฝั่ง browser',
          lang: 'js',
          code: `// .env → VITE_API_URL=https://api.example.com
const api = import.meta.env.VITE_API_URL`,
        },
        {
          type: 'warn',
          body: 'ทุกอย่างที่อยู่ใน frontend bundle **ทุกคนเห็นได้** ห้ามใส่ secret key (เช่น Stripe secret, DB password) ไว้ฝั่ง frontend เด็ดขาด ให้เรียกผ่าน backend แทน',
        },
        {
          type: 'list',
          title: 'เก็บ secrets ที่ไหนดี',
          items: [
            'Dashboard ของ hosting (Vercel/Render env vars)',
            'GitHub Actions Secrets',
            'Cloud secret manager (AWS Secrets Manager, GCP Secret Manager)',
            'เครื่องมืออย่าง Doppler, 1Password, Vault',
            'key หลุดแล้ว → **rotate ทันที** แม้จะลบ commit แล้วก็ตาม',
          ],
        },
      ],
    },
    {
      id: 'deploy-strategies',
      title: 'Deployment Strategies',
      emoji: '🎚️',
      summary: 'Rolling, Blue-Green, Canary และการ Rollback เมื่อพัง',
      tags: ['rolling', 'blue-green', 'canary', 'rollback', 'zero downtime', 'feature flag'],
      sections: [
        {
          type: 'table',
          headers: ['กลยุทธ์', 'ทำงานยังไง', 'ข้อดี / ข้อเสีย'],
          rows: [
            ['**Recreate**', 'ปิดของเก่าทั้งหมด แล้วเปิดของใหม่', 'ง่าย แต่มี downtime'],
            ['**Rolling**', 'ทยอยเปลี่ยนทีละ instance', 'ไม่มี downtime, ช่วงหนึ่งมี 2 เวอร์ชันปนกัน'],
            ['**Blue-Green**', 'เตรียม env ใหม่ (green) ครบ แล้วสลับ traffic ทีเดียว', 'rollback ไวมาก แต่ใช้ทรัพยากร 2 เท่า'],
            ['**Canary**', 'ปล่อยให้ผู้ใช้ 5% ก่อน ดูผล แล้วค่อยเพิ่ม', 'เสี่ยงน้อย ต้องมี monitoring ดี'],
          ],
        },
        {
          type: 'text',
          title: 'Rollback 🔙',
          body: 'ต้องเตรียมทางถอยไว้ก่อนปล่อยเสมอ: เก็บ image/build เวอร์ชันเก่าไว้, ใช้ tag ที่ระบุเวอร์ชันชัดเจน (ไม่ใช่ `latest`), และ DB migration ต้อง backward-compatible',
        },
        {
          type: 'code',
          title: 'ตัวอย่าง rollback',
          lang: 'bash',
          code: `# Kubernetes
kubectl rollout history deploy/myapp
kubectl rollout undo deploy/myapp --to-revision=3

# Vercel: เลือก deployment เก่าแล้วกด Promote / หรือ
vercel rollback

# Docker
docker run -d --name myapp myapp:1.4.1   # กลับเวอร์ชันเก่า`,
        },
        {
          type: 'tip',
          body: '**Feature flag** ช่วยให้ deploy โค้ดขึ้นไปก่อนแต่ยังไม่เปิดให้ใช้ แยก "deploy" ออกจาก "release" ปิดฟีเจอร์ได้ทันทีถ้ามีปัญหา 🚩',
        },
      ],
    },
    {
      id: 'monitoring',
      title: 'Monitoring & Logging',
      emoji: '📈',
      summary: 'รู้ก่อนผู้ใช้บ่นว่าระบบพัง: error tracking, metrics, logs, uptime',
      tags: ['monitoring', 'logging', 'sentry', 'grafana', 'prometheus', 'uptime', 'observability'],
      sections: [
        {
          type: 'list',
          title: '3 เสาของ Observability',
          items: [
            '**Logs** — บันทึกเหตุการณ์ (ควรเป็น JSON มี level, timestamp, requestId)',
            '**Metrics** — ตัวเลขตามเวลา: CPU, RAM, req/s, latency p95, error rate',
            '**Traces** — ติดตาม request หนึ่งข้ามหลาย service (OpenTelemetry)',
          ],
        },
        {
          type: 'table',
          title: 'เครื่องมือยอดนิยม',
          headers: ['งาน', 'เครื่องมือ'],
          rows: [
            ['Error tracking', 'Sentry'],
            ['Metrics + Dashboard', 'Prometheus + Grafana'],
            ['Logs', 'Grafana Loki, ELK, Datadog'],
            ['Uptime', 'UptimeRobot, Better Stack, Uptime Kuma'],
            ['All-in-one', 'Datadog, New Relic'],
          ],
        },
        {
          type: 'code',
          title: 'Sentry ใน React',
          lang: 'js',
          code: `import * as Sentry from '@sentry/react'

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.MODE,
  tracesSampleRate: 0.1,
})`,
        },
        {
          type: 'code',
          title: 'Structured log ด้วย pino (Node)',
          lang: 'js',
          code: `import pino from 'pino'
const log = pino()

log.info({ userId: 42, path: '/orders' }, 'order created')
log.error({ err }, 'payment failed')`,
        },
        {
          type: 'tip',
          body: 'ตั้ง alert เฉพาะเรื่องที่ต้องลงมือจริง ไม่งั้นแจ้งเตือนจะรัวจนทุกคนเมิน (alert fatigue) 🔕',
        },
      ],
    },
    {
      id: 'pwa-checklist',
      title: 'Deploy PWA Checklist',
      emoji: '📱',
      summary: 'สิ่งที่ต้องมีให้ PWA ติดตั้งได้ ทำงาน offline และใช้บน iPhone ได้ดี',
      tags: ['pwa', 'manifest', 'service worker', 'ios', 'https', 'offline'],
      sections: [
        {
          type: 'list',
          title: 'Checklist ✅',
          items: [
            '**HTTPS** (localhost ยกเว้นได้) — ไม่มี HTTPS ไม่มี service worker',
            '**Web App Manifest** — name, icons 192/512, `start_url`, `display: standalone`',
            '**Service Worker** — cache ไฟล์ให้เปิด offline ได้',
            'ไอคอน maskable + `apple-touch-icon` 180x180',
            'ตั้ง cache header: `sw.js` และ `index.html` ห้าม cache นาน',
            'ทดสอบด้วย Lighthouse และ DevTools → Application',
          ],
        },
        {
          type: 'code',
          title: 'manifest.webmanifest',
          lang: 'json',
          code: `{
  "name": "My Cute App",
  "short_name": "CuteApp",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#fff8f0",
  "theme_color": "#f6b8a2",
  "icons": [
    { "src": "/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icon-512.png", "sizes": "512x512", "type": "image/png" },
    { "src": "/icon-512-maskable.png", "sizes": "512x512",
      "type": "image/png", "purpose": "maskable" }
  ]
}`,
        },
        {
          type: 'code',
          title: 'Vite: vite-plugin-pwa',
          lang: 'js',
          code: `import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['apple-touch-icon.png'],
      manifest: { name: 'My Cute App', short_name: 'CuteApp' },
    }),
  ],
})`,
        },
        {
          type: 'code',
          title: 'meta สำหรับ iOS ใน index.html',
          lang: 'html',
          code: `<link rel="manifest" href="/manifest.webmanifest" />
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
<meta name="theme-color" content="#f6b8a2" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="default" />
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />`,
        },
        {
          type: 'warn',
          body: 'iOS ไม่มีปุ่ม "Install" อัตโนมัติ ผู้ใช้ต้องเปิดใน Safari → ปุ่ม Share → **Add to Home Screen** เอง ควรทำหน้าสอนเล็กๆ ไว้ในแอปด้วย และพื้นที่เก็บข้อมูลอาจถูกล้างถ้าไม่ได้เปิดนาน',
        },
        {
          type: 'tip',
          body: 'เวลาอัปเดตแล้วผู้ใช้ยังเห็นของเก่า มักเป็นเพราะ service worker ตัวเก่ายังคุมอยู่ — ใช้ `registerType: autoUpdate` หรือทำปุ่ม "มีเวอร์ชันใหม่ กดรีเฟรช" 🔄',
        },
      ],
    },
  ],
}
