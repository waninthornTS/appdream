export default {
  id: 'git',
  title: 'Git & ทีมเวิร์ก',
  emoji: '🌱',
  color: '#a8d8b0',
  intro: 'Git คือสมุดบันทึกความทรงจำของโค้ด ย้อนเวลาได้ แตกกิ่งได้ ทำงานกับเพื่อนได้ไม่ตีกัน 🌳💞',
  topics: [
    {
      id: 'what-is-git',
      title: 'Git คืออะไร / ทำงานยังไง',
      emoji: '🌳',
      summary: 'Working dir → Staging → Repo, ทุก commit คือ snapshot ที่ต่อกันเป็นกราฟ',
      tags: ['git', 'basic', 'staging', 'commit', 'snapshot', 'head'],
      sections: [
        {
          type: 'text',
          body: '**Git** คือ distributed version control — ทุกคนมีประวัติทั้ง repo อยู่ในเครื่อง ทำงาน offline ได้\n\nไฟล์ของเราเดินทางผ่าน 3 พื้นที่:',
        },
        {
          type: 'list',
          items: [
            '**Working directory** — ไฟล์ที่เรากำลังแก้อยู่',
            '**Staging area (index)** — ตะกร้าเตรียมของที่จะ commit (`git add`)',
            '**Repository (.git)** — ประวัติ commit ทั้งหมด (`git commit`)',
          ],
        },
        {
          type: 'code',
          title: 'Commit graph',
          lang: 'text',
          code: `A---B---C---F   main  ← HEAD
         \\
          D---E     feature/login

- แต่ละตัวอักษร = commit (snapshot + ชี้ไป parent)
- branch = ป้ายชื่อที่ชี้ไป commit ล่าสุด
- HEAD = ตอนนี้เราอยู่ตรงไหน`,
        },
        {
          type: 'tip',
          body: 'commit ไม่ได้เก็บแค่ diff แต่เก็บ **snapshot** ทั้งโปรเจกต์ (ไฟล์ที่ไม่เปลี่ยนจะชี้ไปของเดิม เลยไม่เปลืองที่) และแต่ละ commit มี hash เฉพาะตัว เช่น `a1b2c3d` 🔖',
        },
      ],
    },
    {
      id: 'setup-config',
      title: 'Setup & Config',
      emoji: '⚙️',
      summary: 'ตั้งชื่อ อีเมล editor และ alias ครั้งเดียวใช้ได้ตลอด',
      tags: ['config', 'setup', 'alias', 'init', 'clone'],
      sections: [
        {
          type: 'code',
          title: 'ตั้งค่าครั้งแรก',
          lang: 'bash',
          code: `git config --global user.name "Mint Dev"
git config --global user.email "mint@example.com"
git config --global init.defaultBranch main
git config --global core.editor "code --wait"
git config --global pull.rebase true      # pull แบบ rebase
git config --global fetch.prune true      # ลบ branch remote ที่หายไปแล้ว

git config --list --show-origin           # ดูค่าทั้งหมด`,
        },
        {
          type: 'code',
          title: 'Alias น่ารักๆ ประหยัดนิ้ว',
          lang: 'bash',
          code: `git config --global alias.st "status -sb"
git config --global alias.co checkout
git config --global alias.sw switch
git config --global alias.lg "log --oneline --graph --decorate --all"

git lg   # ดูกราฟสวยๆ`,
        },
        {
          type: 'code',
          title: 'เริ่ม repo',
          lang: 'bash',
          code: `git init                                   # repo ใหม่ในโฟลเดอร์นี้
git clone git@github.com:me/my-app.git     # copy จาก remote (SSH)
git clone https://github.com/me/my-app.git # หรือ HTTPS`,
        },
        {
          type: 'tip',
          body: 'ใช้คนละอีเมลระหว่างงานกับส่วนตัว? ตั้ง `git config user.email` (ไม่ใส่ `--global`) ใน repo นั้นๆ ได้เลย 💼',
        },
      ],
    },
    {
      id: 'everyday-commands',
      title: 'คำสั่งประจำวัน',
      emoji: '☀️',
      summary: 'status, add, commit, log, diff วนไปทุกวัน',
      tags: ['status', 'add', 'commit', 'log', 'diff', 'basic'],
      sections: [
        {
          type: 'code',
          lang: 'bash',
          code: `git status                 # ตอนนี้มีอะไรเปลี่ยน
git diff                   # ดูที่แก้ (ยังไม่ add)
git diff --staged          # ดูที่ add แล้ว
git add src/App.jsx        # add ทีละไฟล์
git add .                  # add ทั้งหมด
git add -p                 # เลือก add ทีละท่อน
git commit -m "feat: add login form"
git commit --amend         # แก้ commit ล่าสุด (ยังไม่ push)
git log --oneline -10      # 10 commit ล่าสุด
git show a1b2c3d           # ดูรายละเอียด commit
git blame src/App.jsx      # บรรทัดนี้ใครแก้`,
        },
        {
          type: 'steps',
          title: 'วงจรชีวิตประจำวัน',
          items: [
            '`git pull` ดึงของล่าสุด',
            'แก้โค้ด',
            '`git status` / `git diff` เช็กสิ่งที่แก้',
            '`git add` เลือกของ',
            '`git commit` บันทึก',
            '`git push` ส่งขึ้น remote',
          ],
        },
        {
          type: 'tip',
          body: 'commit เล็กๆ บ่อยๆ ดีกว่า commit ยักษ์ทีเดียว — review ง่าย ย้อนง่าย หาบั๊กง่าย 🐾',
        },
      ],
    },
    {
      id: 'branching-merging',
      title: 'Branching & Merging',
      emoji: '🌿',
      summary: 'แตกกิ่งไปทำฟีเจอร์ แล้วรวมกลับเข้า main',
      tags: ['branch', 'merge', 'switch', 'fast-forward'],
      sections: [
        {
          type: 'code',
          title: 'จัดการ branch',
          lang: 'bash',
          code: `git branch                     # ดู branch ในเครื่อง
git branch -a                  # รวม remote
git switch -c feature/login    # สร้าง + ย้ายไป
git switch main                # ย้าย branch
git branch -d feature/login    # ลบ (merge แล้ว)
git branch -D feature/old      # บังคับลบ
git branch -m old-name new-name`,
        },
        {
          type: 'code',
          title: 'Merge',
          lang: 'bash',
          code: `git switch main
git merge feature/login          # รวมเข้า main
git merge --no-ff feature/login  # บังคับสร้าง merge commit
git merge --squash feature/login # รวมทุก commit เป็นก้อนเดียว
git commit -m "feat: login"`,
        },
        {
          type: 'list',
          title: 'Merge 2 แบบ',
          items: [
            '**Fast-forward** — main ไม่มี commit ใหม่ระหว่างนั้น แค่เลื่อนป้าย main ไปข้างหน้า',
            '**3-way merge** — ทั้งสองฝั่งมี commit ใหม่ Git สร้าง **merge commit** ที่มี 2 parent',
          ],
        },
        {
          type: 'tip',
          body: '`git switch` / `git restore` คือคำสั่งรุ่นใหม่ที่แยกงานของ `git checkout` ออกมาให้เข้าใจง่ายขึ้น 🆕',
        },
      ],
    },
    {
      id: 'rebase-vs-merge',
      title: 'Rebase vs Merge',
      emoji: '🔀',
      summary: 'merge เก็บประวัติจริง, rebase ทำประวัติให้เป็นเส้นตรงสวยงาม',
      tags: ['rebase', 'merge', 'interactive rebase', 'squash', 'history'],
      sections: [
        {
          type: 'code',
          title: 'ภาพเปรียบเทียบ',
          lang: 'text',
          code: `ก่อน:       A---B---C  main
                \\
                 D---E  feature

merge:      A---B---C-------M  main
                \\         /
                 D-------E

rebase:     A---B---C---D'---E'  feature
            (ย้าย D,E ไปต่อท้าย C → hash ใหม่)`,
        },
        {
          type: 'table',
          headers: ['', 'Merge', 'Rebase'],
          rows: [
            ['ประวัติ', 'เก็บตามจริง มี merge commit', 'เส้นตรง อ่านง่าย'],
            ['เปลี่ยน hash', 'ไม่', 'ใช่ (เขียนประวัติใหม่)'],
            ['ปลอดภัยกับ branch ที่แชร์', 'ปลอดภัย', 'อันตราย!'],
            ['ใช้ตอน', 'รวม feature เข้า main', 'อัปเดต branch ตัวเองให้ทัน main'],
          ],
        },
        {
          type: 'code',
          title: 'อัปเดต branch ตัวเองด้วย rebase',
          lang: 'bash',
          code: `git switch feature/login
git fetch origin
git rebase origin/main
# มี conflict → แก้ → git add . → git rebase --continue
# ยกเลิก → git rebase --abort
git push --force-with-lease   # เพราะ hash เปลี่ยน`,
        },
        {
          type: 'code',
          title: 'Interactive rebase: จัดระเบียบ commit',
          lang: 'bash',
          code: `git rebase -i HEAD~3
# pick   a1b2c3d feat: add form
# squash d4e5f6a fix typo        ← รวมเข้าอันบน
# reword 9g8h7i6 add validation  ← แก้ข้อความ`,
        },
        {
          type: 'warn',
          body: '**กฎทอง:** อย่า rebase commit ที่ push ขึ้น branch ที่คนอื่นใช้ร่วมอยู่ (เช่น `main`) และถ้าต้อง force push ใช้ `--force-with-lease` ไม่ใช่ `--force` จะได้ไม่ทับงานเพื่อน',
        },
      ],
    },
    {
      id: 'resolve-conflicts',
      title: 'แก้ Conflict',
      emoji: '⚔️',
      summary: 'สองคนแก้บรรทัดเดียวกัน Git ไม่รู้จะเลือกอะไร เราต้องตัดสินเอง',
      tags: ['conflict', 'merge conflict', 'resolve'],
      sections: [
        {
          type: 'code',
          title: 'หน้าตา conflict',
          lang: 'text',
          code: `<<<<<<< HEAD
const greeting = 'สวัสดีจ้า'
=======
const greeting = 'Hello there'
>>>>>>> feature/i18n`,
          note: 'บนคือของ branch ที่เราอยู่ (HEAD), ล่างคือของที่กำลังรวมเข้ามา',
        },
        {
          type: 'steps',
          title: 'ขั้นตอน',
          items: [
            '`git status` ดูว่าไฟล์ไหน conflict (both modified)',
            'เปิดไฟล์ เลือก/ผสมโค้ดที่ถูก แล้ว **ลบเครื่องหมาย** `<<<<<<<` `=======` `>>>>>>>` ทิ้ง',
            'รันเทสต์ให้แน่ใจว่ายังทำงาน',
            '`git add <file>` เพื่อบอกว่าแก้แล้ว',
            'merge → `git commit` / rebase → `git rebase --continue`',
          ],
        },
        {
          type: 'code',
          title: 'ตัวช่วย',
          lang: 'bash',
          code: `git merge --abort               # ยกเลิก กลับไปก่อน merge
git checkout --ours  file.js    # เอาของฝั่งเราทั้งไฟล์
git checkout --theirs file.js   # เอาของอีกฝั่งทั้งไฟล์
git diff --name-only --diff-filter=U   # list ไฟล์ที่ยัง conflict`,
        },
        {
          type: 'warn',
          body: 'ระหว่าง **rebase** ความหมายของ ours/theirs จะสลับกัน! (ours = branch ที่เรากำลัง rebase ไปต่อ) ใช้ editor อย่าง VS Code ช่วยดูจะชัวร์กว่า',
        },
        {
          type: 'tip',
          body: 'กัน conflict ด้วยการ pull/rebase จาก main บ่อยๆ และทำ PR ให้เล็ก อยู่ไม่นาน 🍃',
        },
      ],
    },
    {
      id: 'undo',
      title: 'Undo ทุกสถานการณ์',
      emoji: '⏪',
      summary: 'restore, reset, revert, stash, reflog — ย้อนเวลาได้แทบทุกอย่าง',
      tags: ['undo', 'restore', 'reset', 'revert', 'stash', 'reflog'],
      sections: [
        {
          type: 'table',
          headers: ['อยากทำ', 'คำสั่ง'],
          rows: [
            ['ทิ้งที่แก้ในไฟล์ (ยังไม่ add)', '`git restore file.js`'],
            ['เอาออกจาก staging', '`git restore --staged file.js`'],
            ['แก้ข้อความ commit ล่าสุด', '`git commit --amend -m "..."`'],
            ['ยกเลิก commit ล่าสุด เก็บโค้ดไว้', '`git reset --soft HEAD~1`'],
            ['ยกเลิก commit + ทิ้งโค้ด', '`git reset --hard HEAD~1`'],
            ['ย้อน commit ที่ push แล้ว', '`git revert <hash>`'],
            ['เก็บงานไว้ชั่วคราว', '`git stash`'],
            ['กู้ของที่คิดว่าหายไปแล้ว', '`git reflog`'],
          ],
        },
        {
          type: 'list',
          title: 'reset 3 โหมด',
          items: [
            '`--soft` — ย้าย HEAD, ของยังอยู่ใน staging',
            '`--mixed` (default) — ย้าย HEAD, ของกลับไปอยู่ working dir',
            '`--hard` — ย้าย HEAD และ **ทิ้งการเปลี่ยนแปลงทั้งหมด**',
          ],
        },
        {
          type: 'code',
          title: 'Stash',
          lang: 'bash',
          code: `git stash push -m "wip: navbar"   # เก็บงาน
git stash -u                       # รวมไฟล์ใหม่ (untracked) ด้วย
git stash list
git stash pop                      # เอากลับมา + ลบออกจาก stash
git stash apply stash@{1}          # เอากลับมาแต่ยังเก็บไว้
git stash drop stash@{0}`,
        },
        {
          type: 'code',
          title: 'Reflog: เครื่องย้อนเวลาฉุกเฉิน 🦸',
          lang: 'bash',
          code: `git reflog
# a1b2c3d HEAD@{0}: reset: moving to HEAD~3
# 9f8e7d6 HEAD@{1}: commit: feat: important work

git reset --hard 9f8e7d6     # กลับไปจุดก่อนพลาด
git branch rescue 9f8e7d6    # หรือสร้าง branch เก็บไว้`,
        },
        {
          type: 'warn',
          body: 'commit ที่ push ไปแล้วให้ใช้ `git revert` (สร้าง commit ใหม่ที่ย้อนผล) อย่าใช้ `reset` แล้ว force push บน branch ที่คนอื่นใช้ร่วม',
        },
      ],
    },
    {
      id: 'remote',
      title: 'Remote: push / pull / fetch',
      emoji: '📡',
      summary: 'ซิงก์ repo ในเครื่องกับ GitHub/GitLab',
      tags: ['remote', 'push', 'pull', 'fetch', 'origin', 'upstream'],
      sections: [
        {
          type: 'list',
          items: [
            '`fetch` — ดาวน์โหลดของใหม่มาดูเฉยๆ ยังไม่รวมกับงานเรา (ปลอดภัย)',
            '`pull` — `fetch` + `merge` (หรือ `rebase` ถ้าตั้งไว้)',
            '`push` — ส่ง commit ของเราขึ้น remote',
          ],
        },
        {
          type: 'code',
          lang: 'bash',
          code: `git remote -v                              # ดู remote
git remote add origin git@github.com:me/app.git
git push -u origin main          # push ครั้งแรก + ผูก upstream
git push                         # ครั้งต่อไปพิมพ์แค่นี้
git fetch origin
git log main..origin/main        # remote มีอะไรใหม่บ้าง
git pull --rebase
git push origin --delete feature/old   # ลบ branch บน remote`,
        },
        {
          type: 'code',
          title: 'Fork: ตามของต้นฉบับ (upstream)',
          lang: 'bash',
          code: `git remote add upstream https://github.com/original/app.git
git fetch upstream
git rebase upstream/main`,
        },
        {
          type: 'tip',
          body: 'push แล้วโดน reject "fetch first"? แปลว่าบน remote มี commit ใหม่ที่เรายังไม่มี ให้ `git pull --rebase` ก่อนแล้วค่อย push 🙆',
        },
      ],
    },
    {
      id: 'github-flow-pr',
      title: 'GitHub Flow, Pull Request & Code Review',
      emoji: '🤝',
      summary: 'แตก branch → PR → review → merge → deploy วนแบบเรียบง่าย',
      tags: ['github flow', 'pull request', 'pr', 'code review', 'gh'],
      sections: [
        {
          type: 'steps',
          title: 'GitHub Flow',
          items: [
            '`main` deploy ได้เสมอ',
            'แตก branch จาก main ตั้งชื่อสื่อความ เช่น `feat/dark-mode`',
            'commit + push บ่อยๆ',
            'เปิด **Pull Request** อธิบายว่าทำอะไร ทำไม ทดสอบยังไง',
            'CI รันเทสต์ + เพื่อน review',
            'แก้ตาม feedback → approve → merge (squash ก็ได้)',
            'deploy แล้วลบ branch ทิ้ง 🧹',
          ],
        },
        {
          type: 'code',
          title: 'ใช้ GitHub CLI (gh)',
          lang: 'bash',
          code: `gh pr create --fill               # สร้าง PR จาก commit
gh pr create --draft --title "feat: dark mode"
gh pr list
gh pr checkout 42                 # ดึง PR #42 มาลองในเครื่อง
gh pr review 42 --approve
gh pr merge 42 --squash --delete-branch`,
        },
        {
          type: 'list',
          title: 'PR ที่ดี 💌',
          items: [
            'เล็ก โฟกัสเรื่องเดียว (ไม่เกิน ~400 บรรทัด)',
            'มีคำอธิบาย + screenshot ถ้าเป็น UI',
            'ลิงก์ issue เช่น `Closes #12` (merge แล้วปิด issue ให้อัตโนมัติ)',
            'self-review ก่อนส่งให้คนอื่น',
          ],
        },
        {
          type: 'list',
          title: 'Review อย่างใจดี 🌸',
          items: [
            'วิจารณ์โค้ด ไม่วิจารณ์คน',
            'ถามแทนสั่ง: "ลองใช้ X ดีไหม?"',
            'แยกระดับ: ต้องแก้ vs `nit:` (เล็กน้อย ไม่บังคับ)',
            'ชมสิ่งที่ดีด้วย ✨',
          ],
        },
      ],
    },
    {
      id: 'git-flow',
      title: 'Git Flow Branching Model',
      emoji: '🌊',
      summary: 'โมเดล branch แบบมีโครงสร้าง: main, develop, feature, release, hotfix',
      tags: ['git flow', 'branching model', 'develop', 'release', 'hotfix'],
      sections: [
        {
          type: 'table',
          headers: ['Branch', 'แตกจาก', 'รวมเข้า', 'ไว้ทำอะไร'],
          rows: [
            ['`main`', '-', '-', 'โค้ดที่ปล่อยแล้ว (มี tag เวอร์ชัน)'],
            ['`develop`', 'main', '-', 'รวมฟีเจอร์สำหรับรอบถัดไป'],
            ['`feature/*`', 'develop', 'develop', 'พัฒนาฟีเจอร์'],
            ['`release/*`', 'develop', 'main + develop', 'เตรียมปล่อย แก้บั๊กเล็กๆ'],
            ['`hotfix/*`', 'main', 'main + develop', 'แก้ด่วนบน production'],
          ],
        },
        {
          type: 'code',
          title: 'ตัวอย่าง hotfix',
          lang: 'bash',
          code: `git switch -c hotfix/1.2.1 main
# แก้บั๊ก + commit
git switch main && git merge --no-ff hotfix/1.2.1
git tag -a v1.2.1 -m "hotfix 1.2.1"
git switch develop && git merge --no-ff hotfix/1.2.1
git branch -d hotfix/1.2.1`,
        },
        {
          type: 'tip',
          body: 'Git Flow เหมาะกับแอปที่ปล่อยเป็นรอบ (mobile app, software มีเวอร์ชัน) ส่วนเว็บที่ deploy ทุกวัน ใช้ **GitHub Flow** หรือ **trunk-based** จะคล่องตัวกว่า 🏃',
        },
      ],
    },
    {
      id: 'conventional-commits',
      title: 'Commit Message (Conventional Commits)',
      emoji: '✍️',
      summary: 'เขียน commit ให้อ่านรู้เรื่อง และเอาไปสร้าง changelog อัตโนมัติได้',
      tags: ['commit message', 'conventional commits', 'changelog', 'semver'],
      sections: [
        {
          type: 'code',
          title: 'รูปแบบ',
          lang: 'text',
          code: `<type>(<scope>): <description>

[body: อธิบายว่าทำไม]

[footer: BREAKING CHANGE: ... / Closes #12]`,
        },
        {
          type: 'table',
          headers: ['type', 'ใช้เมื่อ'],
          rows: [
            ['`feat`', 'เพิ่มฟีเจอร์ใหม่ (→ minor)'],
            ['`fix`', 'แก้บั๊ก (→ patch)'],
            ['`docs`', 'แก้เอกสาร'],
            ['`style`', 'format/whitespace ไม่กระทบ logic'],
            ['`refactor`', 'ปรับโค้ด ไม่เพิ่มฟีเจอร์ ไม่แก้บั๊ก'],
            ['`perf`', 'ทำให้เร็วขึ้น'],
            ['`test`', 'เพิ่ม/แก้เทสต์'],
            ['`build` / `ci`', 'build system, pipeline'],
            ['`chore`', 'งานจิปาถะ เช่น อัปเดต dependency'],
          ],
        },
        {
          type: 'code',
          title: 'ตัวอย่าง',
          lang: 'text',
          code: `feat(auth): add Google sign-in
fix(cart): prevent negative quantity
docs: update setup steps in README
refactor(api)!: rename /users to /members

BREAKING CHANGE: /users endpoint removed`,
          note: '`!` หรือ footer `BREAKING CHANGE` → major version',
        },
        {
          type: 'tip',
          body: 'เขียน description เป็นคำสั่งสั้นๆ (imperative) เช่น "add" ไม่ใช่ "added" ไม่เกิน ~50 ตัวอักษร ใช้ `commitlint` + `husky` ช่วยตรวจอัตโนมัติได้ 🐶',
        },
      ],
    },
    {
      id: 'gitignore',
      title: '.gitignore',
      emoji: '🙈',
      summary: 'บอก Git ว่าไฟล์ไหนไม่ต้องติดตาม',
      tags: ['gitignore', 'ignore', 'untrack'],
      sections: [
        {
          type: 'code',
          title: '.gitignore สำหรับโปรเจกต์ Node/Vite',
          lang: 'text',
          code: `# dependencies
node_modules/

# build output
dist/
build/

# env & secrets
.env
.env.*
!.env.example

# logs & OS junk
*.log
.DS_Store
Thumbs.db

# editor
.vscode/*
!.vscode/extensions.json
.idea/`,
          note: '`!` = ยกเว้น (ให้ track), `/` ท้าย = โฟลเดอร์, `*` = wildcard',
        },
        {
          type: 'code',
          title: 'เผลอ commit ไปแล้ว ทำไงดี',
          lang: 'bash',
          code: `# เพิ่มลง .gitignore ก่อน แล้วเลิก track (ไฟล์ในเครื่องยังอยู่)
git rm --cached .env
git rm -r --cached node_modules
git commit -m "chore: stop tracking ignored files"

git check-ignore -v dist/app.js   # ไฟล์นี้ถูก ignore เพราะกฎไหน`,
        },
        {
          type: 'warn',
          body: 'ถ้าเผลอ push secret ไปแล้ว การลบออกใน commit ใหม่ **ไม่พอ** มันยังอยู่ในประวัติ! ต้อง **rotate key ทันที** แล้วค่อยล้างประวัติด้วย `git filter-repo` ถ้าจำเป็น',
        },
        {
          type: 'tip',
          body: 'ไฟล์ขยะเฉพาะเครื่องเรา (เช่น `.DS_Store`) ใส่ใน global ignore ได้: `git config --global core.excludesFile ~/.gitignore_global` 🧺',
        },
      ],
    },
    {
      id: 'tags-releases',
      title: 'Tags & Releases',
      emoji: '🏷️',
      summary: 'ปักหมุดเวอร์ชันด้วย tag แล้วทำ Release บน GitHub',
      tags: ['tag', 'release', 'semver', 'version'],
      sections: [
        {
          type: 'text',
          body: '**Tag** คือป้ายที่ติดกับ commit แบบถาวร (ไม่เลื่อนเหมือน branch) ใช้บอกเวอร์ชัน มักตั้งตาม **SemVer**: `MAJOR.MINOR.PATCH` เช่น `v2.1.3`',
        },
        {
          type: 'list',
          title: 'SemVer',
          items: [
            '**MAJOR** — เปลี่ยนแบบไม่เข้ากับของเก่า (breaking)',
            '**MINOR** — เพิ่มฟีเจอร์ ยังเข้ากันได้',
            '**PATCH** — แก้บั๊ก',
          ],
        },
        {
          type: 'code',
          lang: 'bash',
          code: `git tag                                # ดู tag ทั้งหมด
git tag -a v1.0.0 -m "First release 🎉"  # annotated tag (แนะนำ)
git tag v1.0.1 a1b2c3d                 # lightweight tag ที่ commit เก่า
git push origin v1.0.0                 # push tag เดียว
git push origin --tags                 # push ทุก tag
git switch --detach v1.0.0             # ดูโค้ด ณ เวอร์ชันนั้น
git tag -d v1.0.1                      # ลบในเครื่อง
git push origin --delete v1.0.1        # ลบบน remote`,
        },
        {
          type: 'code',
          title: 'สร้าง GitHub Release',
          lang: 'bash',
          code: `npm version minor        # bump package.json + สร้าง commit และ tag
git push --follow-tags
gh release create v1.1.0 --generate-notes`,
        },
        {
          type: 'tip',
          body: 'ใช้ CI trigger ตอน push tag `v*` ให้ build และ deploy production อัตโนมัติ ได้เวอร์ชันที่ตรวจสอบย้อนหลังได้ชัดเจน 📦',
        },
      ],
    },
    {
      id: 'git-cheat-sheet',
      title: 'Git Cheat Sheet',
      emoji: '📋',
      summary: 'ตารางคำสั่งสรุปรวม เปิดดูเร็วๆ',
      tags: ['cheat sheet', 'commands', 'summary'],
      sections: [
        {
          type: 'table',
          title: 'เริ่มต้น & ประจำวัน',
          headers: ['คำสั่ง', 'ทำอะไร'],
          rows: [
            ['`git init` / `git clone <url>`', 'สร้าง / copy repo'],
            ['`git status`', 'ดูสถานะ'],
            ['`git add <file>` / `git add -p`', 'เตรียม commit'],
            ['`git commit -m "msg"`', 'บันทึก'],
            ['`git log --oneline --graph`', 'ดูประวัติ'],
            ['`git diff` / `git diff --staged`', 'ดูความต่าง'],
          ],
        },
        {
          type: 'table',
          title: 'Branch & Remote',
          headers: ['คำสั่ง', 'ทำอะไร'],
          rows: [
            ['`git switch -c <name>`', 'สร้าง + ย้าย branch'],
            ['`git merge <branch>`', 'รวม branch'],
            ['`git rebase <branch>`', 'ย้ายฐาน branch'],
            ['`git fetch` / `git pull`', 'ดึงของใหม่'],
            ['`git push -u origin <branch>`', 'ส่งขึ้น + ผูก upstream'],
            ['`git push --force-with-lease`', 'force push อย่างปลอดภัย'],
          ],
        },
        {
          type: 'table',
          title: 'Undo & กู้ชีพ',
          headers: ['คำสั่ง', 'ทำอะไร'],
          rows: [
            ['`git restore <file>`', 'ทิ้งที่แก้'],
            ['`git restore --staged <file>`', 'เอาออกจาก staging'],
            ['`git reset --soft HEAD~1`', 'ยกเลิก commit เก็บโค้ด'],
            ['`git revert <hash>`', 'ย้อน commit ที่ push แล้ว'],
            ['`git stash` / `git stash pop`', 'พักงาน / เอากลับ'],
            ['`git reflog`', 'หา commit ที่หายไป'],
            ['`git cherry-pick <hash>`', 'หยิบ commit เดียวมาใส่ branch นี้'],
            ['`git bisect start`', 'binary search หา commit ที่ทำพัง'],
          ],
        },
        {
          type: 'pairs',
          title: 'ใช้คู่กับ',
          items: ['GitHub', 'GitHub CLI (gh)', 'VS Code Source Control', 'husky', 'commitlint', 'GitHub Actions'],
        },
      ],
    },
  ],
}
