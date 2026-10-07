export default {
  id: 'os',
  title: 'Operating System',
  emoji: '💻',
  color: '#a9c7f2',
  intro: 'มารู้จักบ้านหลังใหญ่ที่โปรแกรมทุกตัวอาศัยอยู่กัน~ OS คือผู้ใหญ่บ้านที่แบ่ง CPU, RAM, ไฟล์ ให้ทุกคนอย่างยุติธรรม 🏡',
  topics: [
    {
      id: 'what-is-os',
      title: 'OS คืออะไร / Kernel / User space',
      emoji: '🏡',
      summary: 'OS = ตัวกลางระหว่างโปรแกรมกับฮาร์ดแวร์ มี kernel เป็นหัวใจ',
      tags: ['kernel', 'user space', 'system call', 'basic'],
      sections: [
        {
          type: 'text',
          body: '**Operating System (OS)** คือซอฟต์แวร์ที่คอยจัดการทรัพยากรเครื่อง (CPU, RAM, disk, network, อุปกรณ์ต่างๆ) แล้วให้บริการโปรแกรมของเราผ่านช่องทางที่ปลอดภัย\n\nหัวใจของ OS คือ **kernel** ซึ่งรันใน **kernel space** (สิทธิ์สูงสุด แตะฮาร์ดแวร์ได้ตรงๆ) ส่วนแอปของเรารันใน **user space** (สิทธิ์จำกัด) ถ้าอยากอ่านไฟล์หรือส่งข้อมูลเน็ต ต้องขอ kernel ผ่าน **system call**',
        },
        {
          type: 'list',
          title: 'หน้าที่หลักของ OS',
          items: [
            '**Process management** — สร้าง/หยุด/สลับ process',
            '**Memory management** — แบ่ง RAM, virtual memory',
            '**File system** — จัดเก็บไฟล์และสิทธิ์',
            '**Device drivers** — คุยกับฮาร์ดแวร์',
            '**Networking** — TCP/IP stack',
            '**Security** — user, permission, isolation',
          ],
        },
        {
          type: 'code',
          title: 'ดู system call ที่โปรแกรมเรียก (Linux)',
          lang: 'bash',
          code: `# ดู syscall ทั้งหมดที่ ls เรียก
strace ls

# ตัวอย่างผลลัพธ์บางส่วน
# openat(AT_FDCWD, ".", O_RDONLY|O_DIRECTORY) = 3
# getdents64(3, ...)
# write(1, "file.txt\\n", 9)`,
          note: '`open`, `read`, `write`, `fork`, `execve` คือ syscall ยอดฮิต',
        },
        {
          type: 'tip',
          body: 'Linux, Windows NT, macOS (XNU) ต่างก็มี kernel ของตัวเอง ส่วน "Ubuntu" หรือ "Fedora" คือ **distro** = Linux kernel + เครื่องมือ + package manager รวมกันเป็นแพ็ก 🎁',
        },
      ],
    },
    {
      id: 'process-thread',
      title: 'Process vs Thread',
      emoji: '🧵',
      summary: 'Process = โปรแกรมที่กำลังรัน มี memory ของตัวเอง, Thread = งานย่อยที่แชร์ memory กัน',
      tags: ['process', 'thread', 'pid', 'concurrency'],
      sections: [
        {
          type: 'text',
          body: '**Process** คือโปรแกรมที่กำลังรันอยู่ มี memory space ของตัวเอง มี PID ประจำตัว แยกขาดจาก process อื่น (พังตัวนึง อีกตัวไม่พังตาม)\n\n**Thread** คือสายงานย่อยภายใน process เดียวกัน แชร์ heap/ไฟล์ร่วมกัน แต่มี stack และ register ของตัวเอง สร้างเร็วกว่า สลับเร็วกว่า แต่ต้องระวังแย่งข้อมูลกัน',
        },
        {
          type: 'table',
          headers: ['', 'Process', 'Thread'],
          rows: [
            ['Memory', 'แยกกัน', 'แชร์ heap ร่วมกัน'],
            ['สร้าง/สลับ', 'ช้ากว่า (หนัก)', 'เร็วกว่า (เบา)'],
            ['สื่อสารกัน', 'IPC: pipe, socket, shared mem', 'อ่านตัวแปรร่วมได้เลย'],
            ['ความปลอดภัย', 'พังแยกกัน', 'ตัวนึงพัง อาจล่มทั้ง process'],
            ['ตัวอย่าง', 'Chrome แต่ละแท็บ', 'Worker threads ใน Java/Go'],
          ],
        },
        {
          type: 'code',
          title: 'Node.js: แยก process vs thread',
          lang: 'js',
          code: `// process ใหม่
import { fork } from 'node:child_process'
const child = fork('./job.js')
child.on('message', (msg) => console.log('จาก child:', msg))

// thread ใหม่ (แชร์ process เดียวกัน)
import { Worker } from 'node:worker_threads'
const worker = new Worker('./heavy.js')
worker.on('message', (r) => console.log('ผลลัพธ์:', r))`,
        },
        {
          type: 'tip',
          body: 'Node.js และ JS ในเบราว์เซอร์รันโค้ดเราบน **thread เดียว** (event loop) งาน CPU หนักๆ ควรโยนไป Worker ไม่งั้นทั้งแอปค้าง 🐢',
        },
      ],
    },
    {
      id: 'cpu-scheduling',
      title: 'CPU Scheduling',
      emoji: '⏱️',
      summary: 'OS สลับให้แต่ละ process ได้ใช้ CPU ทีละนิด จนดูเหมือนรันพร้อมกัน',
      tags: ['scheduler', 'context switch', 'round robin', 'priority'],
      sections: [
        {
          type: 'text',
          body: 'CPU แต่ละ core รันได้ทีละ thread เท่านั้น! **Scheduler** ของ OS เลยสลับให้แต่ละ thread ได้ใช้ CPU ทีละช่วงสั้นๆ (time slice) การสลับนี้เรียกว่า **context switch** ซึ่งมีต้นทุน (เซฟ/โหลด register, cache เย็น)',
        },
        {
          type: 'table',
          title: 'อัลกอริทึมคลาสสิก',
          headers: ['ชื่อ', 'หลักการ', 'ข้อสังเกต'],
          rows: [
            ['FCFS', 'มาก่อนได้ก่อน', 'งานยาวบังงานสั้น'],
            ['SJF', 'งานสั้นสุดก่อน', 'งานยาวอาจอดตาย (starvation)'],
            ['Round Robin', 'วนให้คนละ time slice', 'ยุติธรรม เหมาะ interactive'],
            ['Priority', 'ความสำคัญสูงก่อน', 'ต้องมี aging กันอดตาย'],
            ['CFS (Linux)', 'ให้ทุกคนได้ CPU time เท่าๆ กัน', 'ใช้ใน Linux มานาน (ตอนนี้มี EEVDF)'],
          ],
        },
        {
          type: 'code',
          title: 'ปรับ priority ของ process (Linux)',
          lang: 'bash',
          code: `# nice: -20 (สำคัญสุด) ถึง 19 (ใจดีสุด)
nice -n 10 ./backup.sh        # รันแบบใจดี ไม่แย่ง CPU
renice -n 5 -p 1234           # เปลี่ยน priority ของ PID 1234
sudo renice -n -5 -p 1234     # ค่าติดลบต้องใช้ sudo`,
        },
        {
          type: 'list',
          title: 'สถานะของ process',
          items: [
            '**Running** — กำลังใช้ CPU',
            '**Ready** — พร้อมแล้ว รอคิว CPU',
            '**Blocked/Waiting** — รอ I/O (disk, network)',
            '**Zombie** — จบแล้วแต่ parent ยังไม่มาเก็บ exit code',
          ],
        },
      ],
    },
    {
      id: 'concurrency',
      title: 'Concurrency: Race, Mutex, Deadlock',
      emoji: '🔒',
      summary: 'หลาย thread แตะข้อมูลเดียวกัน → ต้องล็อกให้ดี ไม่งั้นพัง',
      tags: ['race condition', 'mutex', 'deadlock', 'semaphore', 'lock'],
      sections: [
        {
          type: 'text',
          body: '**Race condition** = ผลลัพธ์ขึ้นกับว่าใครรันก่อนหลัง เช่น 2 thread ทำ `count++` พร้อมกัน (จริงๆ คือ อ่าน → บวก → เขียน) อาจได้ +1 แทน +2\n\n**Mutex** (mutual exclusion) = กุญแจที่ให้เข้า critical section ได้ทีละคน\n\n**Semaphore** = ตัวนับ อนุญาตให้เข้าได้พร้อมกัน N คน',
        },
        {
          type: 'code',
          title: 'Go: แก้ race ด้วย Mutex',
          lang: 'go',
          code: `var (
    mu    sync.Mutex
    count int
)

func inc(wg *sync.WaitGroup) {
    defer wg.Done()
    mu.Lock()
    count++          // critical section
    mu.Unlock()
}

// ตรวจ race: go run -race main.go`,
        },
        {
          type: 'text',
          title: 'Deadlock 💀',
          body: 'Deadlock = ต่างคนต่างถือกุญแจไว้แล้วรอกุญแจของอีกฝ่าย ค้างตลอดกาล\n\nเงื่อนไข 4 ข้อ (Coffman): **mutual exclusion**, **hold and wait**, **no preemption**, **circular wait** — ทำลายข้อใดข้อหนึ่งได้ก็ไม่เกิด',
        },
        {
          type: 'list',
          title: 'วิธีกัน deadlock',
          items: [
            'ล็อกตาม **ลำดับเดียวกันเสมอ** (เช่น A ก่อน B ทุกครั้ง)',
            'ใช้ **timeout / tryLock** แทนการรอไม่สิ้นสุด',
            'ถือ lock ให้ **สั้นที่สุด** อย่าทำ I/O ระหว่างถือ lock',
            'ลดการแชร์ state — ใช้ message passing (channel, queue)',
          ],
        },
        {
          type: 'warn',
          body: 'ใน DB ก็เกิด deadlock ได้! 2 transaction ล็อกแถวสลับลำดับกัน — DB ส่วนใหญ่จะตรวจเจอแล้ว kill ตัวหนึ่งทิ้ง แอปควร retry ได้',
        },
      ],
    },
    {
      id: 'memory',
      title: 'Memory: Stack, Heap, Virtual Memory',
      emoji: '🧠',
      summary: 'Stack เร็วและเป็นระเบียบ, Heap ยืดหยุ่น, Virtual memory ทำให้แต่ละ process คิดว่ามี RAM เป็นของตัวเอง',
      tags: ['stack', 'heap', 'virtual memory', 'paging', 'swap', 'memory leak'],
      sections: [
        {
          type: 'table',
          headers: ['', 'Stack', 'Heap'],
          rows: [
            ['เก็บอะไร', 'ตัวแปร local, การเรียกฟังก์ชัน', 'object ที่สร้างแบบ dynamic'],
            ['จัดการโดย', 'อัตโนมัติ (push/pop)', 'malloc/free หรือ GC'],
            ['ความเร็ว', 'เร็วมาก', 'ช้ากว่า'],
            ['ขนาด', 'เล็ก (MB)', 'ใหญ่ (เท่าที่ RAM ไหว)'],
            ['ปัญหาที่เจอ', 'Stack overflow (recursion ลึก)', 'Memory leak, fragmentation'],
          ],
        },
        {
          type: 'text',
          title: 'Virtual Memory & Paging',
          body: 'แต่ละ process เห็น **address space ของตัวเอง** (virtual address) แล้ว OS + MMU แปลงเป็น physical address ให้ผ่าน **page table**\n\nหน่วยย่อยเรียกว่า **page** (มัก 4 KB) ถ้า page ที่ต้องการไม่อยู่ใน RAM จะเกิด **page fault** แล้ว OS โหลดจาก disk (swap) มาให้ — ถ้าเกิดบ่อยมากเรียก **thrashing** เครื่องจะช้าสุดๆ',
        },
        {
          type: 'code',
          title: 'เช็ก memory บน Linux',
          lang: 'bash',
          code: `free -h                 # RAM และ swap รวม
ps aux --sort=-%mem | head   # process ที่กิน RAM สุด
cat /proc/meminfo       # รายละเอียดเต็ม
vmstat 1                # ดู si/so (swap in/out) ทุกวินาที`,
        },
        {
          type: 'tip',
          body: 'ใน JS/Java/Go มี **Garbage Collector** เก็บ heap ให้ แต่ยัง leak ได้นะ เช่น ลืม `removeEventListener`, cache ที่โตไม่หยุด, closure ที่จับ object ใหญ่ไว้ 🧹',
        },
      ],
    },
    {
      id: 'file-permissions',
      title: 'File System & Permissions',
      emoji: '🔐',
      summary: 'rwx สำหรับ owner/group/others, ปรับด้วย chmod/chown',
      tags: ['chmod', 'chown', 'rwx', 'permission', 'inode'],
      sections: [
        {
          type: 'text',
          body: 'ใน Linux/macOS "ทุกอย่างคือไฟล์" ทุกไฟล์มี **owner**, **group** และสิทธิ์ 3 ชุด: **u**ser / **g**roup / **o**thers แต่ละชุดมี **r**ead (4) **w**rite (2) e**x**ecute (1)',
        },
        {
          type: 'code',
          title: 'อ่านผล ls -l',
          lang: 'bash',
          code: `$ ls -l deploy.sh
-rwxr-xr-- 1 mint devs 512 Oct 7 10:00 deploy.sh
# │└┬┘└┬┘└┬┘   │    │
# │ u  g  o   owner group
# └ ประเภท: - ไฟล์, d โฟลเดอร์, l symlink
# u=rwx(7) g=r-x(5) o=r--(4)  → 754`,
        },
        {
          type: 'table',
          title: 'ตัวเลขยอดฮิต',
          headers: ['โหมด', 'ความหมาย', 'ใช้กับ'],
          rows: [
            ['`755`', 'rwxr-xr-x', 'script, โฟลเดอร์'],
            ['`644`', 'rw-r--r--', 'ไฟล์ทั่วไป'],
            ['`600`', 'rw-------', 'private key, .env'],
            ['`700`', 'rwx------', 'โฟลเดอร์ `~/.ssh`'],
          ],
        },
        {
          type: 'code',
          title: 'chmod / chown',
          lang: 'bash',
          code: `chmod +x deploy.sh           # ให้ execute ได้
chmod 600 ~/.ssh/id_ed25519  # key ต้องเป็นของเราคนเดียว
chmod -R 755 public/         # ทั้งโฟลเดอร์ (recursive)
chmod u+w,g-w,o-rwx file     # แบบสัญลักษณ์

sudo chown mint:devs app.log # เปลี่ยน owner:group
sudo chown -R www-data:www-data /var/www/app`,
        },
        {
          type: 'warn',
          body: 'อย่า `chmod -R 777` เพื่อ "แก้ permission denied" เด็ดขาด! เท่ากับเปิดให้ทุกคนแก้ไฟล์ได้ หาสาเหตุจริงแล้วให้สิทธิ์เท่าที่จำเป็น',
        },
        {
          type: 'tip',
          body: 'สำหรับโฟลเดอร์: `r` = list ไฟล์ได้, `w` = สร้าง/ลบไฟล์ข้างในได้, `x` = `cd` เข้าไปได้ 📁',
        },
      ],
    },
    {
      id: 'linux-commands',
      title: 'Linux Commands Cheat Sheet',
      emoji: '🐧',
      summary: 'คำสั่งที่ใช้ทุกวัน: ไฟล์ ค้นหา process network disk archive',
      tags: ['linux', 'bash', 'cli', 'grep', 'find', 'ps', 'curl', 'tar', 'cheat sheet'],
      sections: [
        {
          type: 'code',
          title: '📂 Navigation & Files',
          lang: 'bash',
          code: `pwd                  # อยู่ที่ไหน
ls -la               # list รวมไฟล์ซ่อน
cd ~/projects        # ไปโฟลเดอร์
cd -                 # กลับโฟลเดอร์ก่อนหน้า
mkdir -p a/b/c       # สร้างโฟลเดอร์ซ้อน
touch note.txt       # สร้างไฟล์ว่าง
cp -r src/ backup/   # copy โฟลเดอร์
mv old.txt new.txt   # ย้าย/เปลี่ยนชื่อ
rm -rf dist/         # ลบ (ระวัง!)
cat file | less      # อ่านไฟล์ยาวๆ
head -n 20 app.log; tail -f app.log  # ดูหัว / ตามท้าย`,
        },
        {
          type: 'code',
          title: '🔍 Search',
          lang: 'bash',
          code: `grep -rn "TODO" src/            # หาข้อความ + เลขบรรทัด
grep -ri "error" app.log | wc -l  # นับบรรทัดที่มี error
find . -name "*.log" -mtime +7    # ไฟล์ .log เก่ากว่า 7 วัน
find . -type d -name node_modules -prune
which node                        # node อยู่ไหน`,
        },
        {
          type: 'code',
          title: '⚙️ Process',
          lang: 'bash',
          code: `ps aux | grep node     # หา process
top                    # ดูแบบ realtime (htop สวยกว่า)
kill 1234              # ขอให้ปิด (SIGTERM)
kill -9 1234           # บังคับปิด (SIGKILL)
pkill -f "node server" # kill ตามชื่อ
./long-task.sh &       # รัน background
jobs; fg %1            # ดึงกลับมา foreground`,
        },
        {
          type: 'code',
          title: '🌐 Network',
          lang: 'bash',
          code: `curl -i https://api.example.com/health  # ดู header + body
curl -X POST -H "Content-Type: application/json" \\
  -d '{"name":"mint"}' localhost:3000/users
ping -c 4 google.com          # เช็กว่าถึงไหม
ss -tulpn                     # port ที่เปิดฟังอยู่
sudo lsof -i :3000            # ใครใช้ port 3000
dig example.com +short        # ดู DNS`,
        },
        {
          type: 'code',
          title: '💾 Disk & 📦 Archive',
          lang: 'bash',
          code: `df -h                     # พื้นที่แต่ละ disk
du -sh * | sort -h        # โฟลเดอร์ไหนใหญ่สุด
tar -czvf app.tar.gz app/ # บีบอัด (c=create z=gzip)
tar -xzvf app.tar.gz      # แตกไฟล์ (x=extract)
tar -tzf app.tar.gz       # ดูข้างในโดยไม่แตก
zip -r app.zip app/; unzip app.zip`,
        },
        {
          type: 'tip',
          body: 'ใช้ `man ls` หรือ `ls --help` ดูคู่มือ, `Ctrl+R` ค้นคำสั่งเก่า, `!!` รันคำสั่งล่าสุดซ้ำ (เช่น `sudo !!`) ✨',
        },
      ],
    },
    {
      id: 'package-managers',
      title: 'Package Managers',
      emoji: '📦',
      summary: 'apt (Ubuntu), brew (macOS), winget/choco (Windows) ลงโปรแกรมด้วยคำสั่งเดียว',
      tags: ['apt', 'brew', 'homebrew', 'winget', 'choco', 'install'],
      sections: [
        {
          type: 'table',
          headers: ['งาน', 'apt (Ubuntu/Debian)', 'brew (macOS)', 'winget (Windows)'],
          rows: [
            ['อัปเดตรายการ', '`sudo apt update`', '`brew update`', '(อัตโนมัติ)'],
            ['ติดตั้ง', '`sudo apt install git`', '`brew install git`', '`winget install Git.Git`'],
            ['ค้นหา', '`apt search nginx`', '`brew search nginx`', '`winget search nginx`'],
            ['อัปเกรดทั้งหมด', '`sudo apt upgrade`', '`brew upgrade`', '`winget upgrade --all`'],
            ['ถอน', '`sudo apt remove git`', '`brew uninstall git`', '`winget uninstall Git.Git`'],
            ['ดูที่ลงไว้', '`apt list --installed`', '`brew list`', '`winget list`'],
          ],
        },
        {
          type: 'code',
          title: 'Chocolatey (Windows, รันใน admin PowerShell)',
          lang: 'powershell',
          code: `choco install nodejs-lts -y
choco upgrade all -y
choco list`,
        },
        {
          type: 'code',
          title: 'brew cask สำหรับแอป GUI',
          lang: 'bash',
          code: `brew install --cask visual-studio-code
brew install --cask docker`,
        },
        {
          type: 'tip',
          body: 'สำหรับ Node/Python หลายเวอร์ชัน ใช้ version manager แยก เช่น `nvm`/`fnm` (Node), `pyenv`/`uv` (Python) จะไม่ตีกับ package ของระบบ 🌈',
        },
      ],
    },
    {
      id: 'shell-env-path',
      title: 'Shell, Environment Variables & PATH',
      emoji: '🐚',
      summary: 'Shell คือตัวรับคำสั่ง, env var คือค่าตั้งค่าที่ส่งให้โปรแกรม, PATH คือที่หา executable',
      tags: ['bash', 'zsh', 'powershell', 'env', 'PATH', 'export', 'bashrc'],
      sections: [
        {
          type: 'text',
          body: '**Shell** คือโปรแกรมรับคำสั่งเรา เช่น `bash`, `zsh` (default บน macOS), `fish`, `PowerShell`\n\n**Environment variable** คือค่า key=value ที่ process ลูกได้รับสืบทอดไป เช่น `HOME`, `NODE_ENV`, `DATABASE_URL`\n\n**PATH** คือรายการโฟลเดอร์ที่ shell จะไล่หา executable เวลาพิมพ์ชื่อคำสั่ง (คั่นด้วย `:` บน Unix, `;` บน Windows)',
        },
        {
          type: 'code',
          title: 'bash / zsh',
          lang: 'bash',
          code: `echo $HOME                 # อ่านค่า
export NODE_ENV=production # ตั้งค่า (มีผลกับ process ลูก)
NODE_ENV=test npm test     # ตั้งเฉพาะคำสั่งนี้
env | grep NODE            # ดูทั้งหมด
unset NODE_ENV             # ลบ

# เพิ่มโฟลเดอร์เข้า PATH ถาวร
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc            # โหลดใหม่`,
        },
        {
          type: 'code',
          title: 'PowerShell',
          lang: 'powershell',
          code: `$env:NODE_ENV = "production"   # เฉพาะ session นี้
$env:Path -split ";"           # ดู PATH ทีละบรรทัด
# ตั้งถาวรระดับ user
[Environment]::SetEnvironmentVariable("MY_VAR", "hello", "User")`,
        },
        {
          type: 'list',
          title: 'ไฟล์ config ของ shell',
          items: [
            '`~/.bashrc` — bash แบบ interactive',
            '`~/.zshrc` — zsh (macOS)',
            '`~/.profile` / `~/.bash_profile` — login shell',
            '`$PROFILE` — PowerShell',
          ],
        },
        {
          type: 'warn',
          body: 'แก้ PATH แล้วอย่าลืมเปิด terminal ใหม่ หรือ `source` ไฟล์ — "ลงแล้วแต่หาคำสั่งไม่เจอ" ส่วนใหญ่เป็นเพราะ PATH ยังไม่อัปเดต 😵',
        },
      ],
    },
    {
      id: 'os-comparison',
      title: 'Windows vs macOS vs Linux',
      emoji: '⚖️',
      summary: 'เทียบความต่างที่ dev ต้องเจอบ่อย',
      tags: ['windows', 'macos', 'linux', 'comparison'],
      sections: [
        {
          type: 'table',
          headers: ['เรื่อง', 'Windows', 'macOS', 'Linux'],
          rows: [
            ['Kernel', 'Windows NT', 'XNU (Unix)', 'Linux'],
            ['Shell หลัก', 'PowerShell', 'zsh', 'bash'],
            ['Path separator', '`\\`', '`/`', '`/`'],
            ['ขึ้นบรรทัด', 'CRLF `\\r\\n`', 'LF `\\n`', 'LF `\\n`'],
            ['ชื่อไฟล์', 'ไม่สน case', 'ไม่สน case (default)', 'สน case'],
            ['Package mgr', 'winget, choco', 'brew', 'apt, dnf, pacman'],
            ['Home', '`C:\\Users\\name`', '`/Users/name`', '`/home/name`'],
            ['เหมาะกับ', 'เกม, .NET, ทั่วไป', 'iOS dev, ดีไซน์', 'Server, Docker'],
          ],
        },
        {
          type: 'warn',
          body: 'import `./Button` แต่ไฟล์ชื่อ `button.jsx` รันบน Mac/Windows ผ่าน แต่ **build บน Linux (CI/server) พัง!** ตั้งชื่อให้ตรง case เสมอ',
        },
        {
          type: 'code',
          title: 'กัน CRLF ปนใน repo',
          lang: 'bash',
          code: `# .gitattributes
* text=auto eol=lf
*.bat text eol=crlf`,
        },
        {
          type: 'tip',
          body: 'ในโค้ด Node ใช้ `path.join()` แทนการต่อ string ด้วย `/` หรือ `\\` จะได้ทำงานได้ทุก OS 🌍',
        },
      ],
    },
    {
      id: 'networking-basics',
      title: 'Networking พื้นฐานใน OS',
      emoji: '🌐',
      summary: 'IP, port, localhost, TCP vs UDP ที่ต้องรู้ตอนรันเซิร์ฟเวอร์',
      tags: ['ip', 'port', 'localhost', 'tcp', 'udp', 'socket'],
      sections: [
        {
          type: 'list',
          items: [
            '**IP address** = บ้านเลขที่ของเครื่อง เช่น `192.168.1.10` (IPv4) หรือ `::1` (IPv6)',
            '**Port** = เลขห้องในบ้าน (0–65535) แต่ละโปรแกรมฟังคนละ port',
            '**localhost / 127.0.0.1** = เครื่องตัวเอง เข้าจากเครื่องอื่นไม่ได้',
            '**0.0.0.0** = ฟังทุก network interface (ให้เครื่องอื่นเข้าได้)',
            'Port < 1024 เป็น privileged ต้องใช้สิทธิ์ root บน Linux',
          ],
        },
        {
          type: 'table',
          title: 'TCP vs UDP',
          headers: ['', 'TCP', 'UDP'],
          rows: [
            ['การเชื่อมต่อ', 'ต้อง handshake ก่อน', 'ส่งเลย ไม่ต้องต่อ'],
            ['รับประกัน', 'ครบ เรียงลำดับ', 'อาจหาย/สลับ'],
            ['ความเร็ว', 'ช้ากว่า', 'เร็วกว่า'],
            ['ใช้กับ', 'HTTP/1-2, SSH, DB', 'DNS, เกม, video call, HTTP/3 (QUIC)'],
          ],
        },
        {
          type: 'table',
          title: 'Port ที่ควรจำ',
          headers: ['Port', 'บริการ'],
          rows: [
            ['22', 'SSH'],
            ['80 / 443', 'HTTP / HTTPS'],
            ['53', 'DNS'],
            ['5432 / 3306', 'PostgreSQL / MySQL'],
            ['6379 / 27017', 'Redis / MongoDB'],
            ['3000 / 5173 / 8080', 'dev server ยอดฮิต'],
          ],
        },
        {
          type: 'code',
          title: 'หาว่าใครใช้ port อยู่',
          lang: 'bash',
          code: `# Linux / macOS
sudo lsof -i :3000
ss -tlnp | grep 3000

# Windows (PowerShell)
netstat -ano | findstr :3000
Stop-Process -Id <PID>`,
        },
        {
          type: 'warn',
          body: 'รัน server ใน Docker/VM แล้วเข้าไม่ได้? เช็กว่าแอป listen `0.0.0.0` ไม่ใช่ `127.0.0.1` เช่น `vite --host` 🕵️',
        },
      ],
    },
    {
      id: 'ssh',
      title: 'SSH & Keys',
      emoji: '🗝️',
      summary: 'ล็อกอินเครื่องอื่นอย่างปลอดภัยด้วยคู่กุญแจ public/private',
      tags: ['ssh', 'key', 'ed25519', 'scp', 'ssh config'],
      sections: [
        {
          type: 'text',
          body: 'SSH ใช้คู่กุญแจ: **private key** เก็บที่เครื่องเราเท่านั้น 🤫 ส่วน **public key** เอาไปวางที่ server (`~/.ssh/authorized_keys`) หรือ GitHub ได้ ปลอดภัยกว่าใช้ password มาก',
        },
        {
          type: 'code',
          title: 'สร้างและใช้ key',
          lang: 'bash',
          code: `ssh-keygen -t ed25519 -C "me@example.com"
# ได้ ~/.ssh/id_ed25519 (private) และ .pub (public)

ssh-copy-id user@203.0.113.10   # ส่ง public key ไป server
ssh user@203.0.113.10           # ล็อกอิน
ssh -i ~/.ssh/work_key user@host

# copy ไฟล์
scp app.tar.gz user@host:/tmp/
rsync -avz dist/ user@host:/var/www/app/`,
        },
        {
          type: 'code',
          title: '~/.ssh/config ตั้งชื่อเล่นให้ server',
          lang: 'text',
          code: `Host myvps
    HostName 203.0.113.10
    User deploy
    Port 22
    IdentityFile ~/.ssh/id_ed25519

# แล้วแค่พิมพ์: ssh myvps`,
        },
        {
          type: 'warn',
          body: 'ห้ามแชร์/commit private key! และ permission ต้องเป็น `600` (โฟลเดอร์ `~/.ssh` เป็น `700`) ไม่งั้น SSH จะไม่ยอมใช้',
        },
        {
          type: 'tip',
          body: 'บน server ควรปิด password login: ตั้ง `PasswordAuthentication no` และ `PermitRootLogin no` ใน `/etc/ssh/sshd_config` แล้ว `sudo systemctl restart ssh` (ทดสอบ key ให้เข้าได้ก่อนนะ!) 🛡️',
        },
      ],
    },
    {
      id: 'cron-systemd',
      title: 'Cron Jobs & systemd Services',
      emoji: '⏰',
      summary: 'cron = ตั้งเวลารันงาน, systemd = ดูแลให้ service รันตลอดและเปิดเองตอนบูต',
      tags: ['cron', 'crontab', 'systemd', 'systemctl', 'journalctl', 'service'],
      sections: [
        {
          type: 'code',
          title: 'Crontab',
          lang: 'bash',
          code: `crontab -e    # แก้งานของ user เรา
crontab -l    # ดูรายการ

# ┌ นาที ┌ ชม. ┌ วัน ┌ เดือน ┌ วันในสัปดาห์ (0=อาทิตย์)
# m     h     dom   mon   dow   command
0 2 * * *   /home/deploy/backup.sh >> /var/log/backup.log 2>&1
*/5 * * * * curl -fsS https://example.com/health > /dev/null
0 9 * * 1-5 /usr/bin/node /app/report.js`,
          note: 'ลองเช็กสูตรที่ crontab.guru — cron ใช้ PATH สั้นมาก ควรใส่ path เต็ม',
        },
        {
          type: 'code',
          title: 'systemd service: /etc/systemd/system/myapp.service',
          lang: 'ini',
          code: `[Unit]
Description=My Node App
After=network.target

[Service]
User=deploy
WorkingDirectory=/var/www/myapp
ExecStart=/usr/bin/node server.js
Environment=NODE_ENV=production
Restart=always

[Install]
WantedBy=multi-user.target`,
        },
        {
          type: 'code',
          title: 'จัดการด้วย systemctl',
          lang: 'bash',
          code: `sudo systemctl daemon-reload        # หลังแก้ไฟล์ .service
sudo systemctl enable --now myapp   # เปิดตอนบูต + start เลย
sudo systemctl status myapp
sudo systemctl restart myapp
journalctl -u myapp -f              # ดู log สด`,
        },
        {
          type: 'tip',
          body: 'systemd มี **timer** ใช้แทน cron ได้ด้วย (มี log ใน journalctl, รันชดเชยถ้าเครื่องปิดอยู่) ดู timer ทั้งหมดด้วย `systemctl list-timers` ⏲️',
        },
      ],
    },
    {
      id: 'wsl',
      title: 'WSL สำหรับ Windows Dev',
      emoji: '🪟',
      summary: 'รัน Linux จริงๆ บน Windows ได้เลย ไม่ต้องลง VM เอง',
      tags: ['wsl', 'wsl2', 'windows', 'ubuntu', 'linux'],
      sections: [
        {
          type: 'text',
          body: '**WSL2 (Windows Subsystem for Linux)** รัน Linux kernel จริงใน VM เบาๆ ทำให้ใช้ bash, apt, Docker ได้เหมือนอยู่บน Linux และยังเปิดไฟล์ด้วย VS Code ฝั่ง Windows ได้ 🎉',
        },
        {
          type: 'code',
          title: 'ติดตั้ง (PowerShell แบบ admin)',
          lang: 'powershell',
          code: `wsl --install               # ลง WSL2 + Ubuntu (รีสตาร์ทเครื่อง)
wsl --list --online         # distro ที่ลงได้
wsl --install -d Debian
wsl -l -v                   # ดูที่ลงไว้ + เวอร์ชัน
wsl --shutdown              # ปิด WSL ทั้งหมด
wsl --update`,
        },
        {
          type: 'code',
          title: 'ใช้งานใน WSL',
          lang: 'bash',
          code: `cd ~ && mkdir projects     # ทำงานใน filesystem ของ Linux
code .                     # เปิด VS Code (ต้องมี WSL extension)
explorer.exe .             # เปิด Explorer ที่โฟลเดอร์นี้
cd /mnt/c/Users/me         # เข้าไดรฟ์ C: ของ Windows`,
        },
        {
          type: 'warn',
          body: 'เก็บโปรเจกต์ไว้ใน `~/` ของ Linux อย่าทำงานใน `/mnt/c/...` เพราะ I/O ข้ามระบบไฟล์ช้ามาก (`npm install` อืดสุดๆ) และ file watcher อาจไม่ทำงาน',
        },
        {
          type: 'list',
          title: 'เกร็ดน่ารู้',
          items: [
            'จาก Windows เปิดไฟล์ WSL ได้ที่ `\\\\wsl$\\Ubuntu\\home\\...`',
            'Server ใน WSL เปิดจาก browser Windows ด้วย `localhost` ได้เลย',
            'Docker Desktop ใช้ WSL2 เป็น backend',
            'ตั้ง RAM/CPU ได้ใน `%UserProfile%\\.wslconfig`',
          ],
        },
      ],
    },
  ],
}
