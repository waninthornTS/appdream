export default {
  id: "cs",
  title: "CS พื้นฐาน",
  emoji: "🧠",
  color: "#c3a6e8",
  intro: "กล่องเครื่องมือของนักพัฒนา 🧰 data structure, algorithm และแนวคิดออกแบบที่ใช้ได้ทุกภาษา ค่อยๆ เก็บทีละอันนะ~",
  topics: [
    // ------------------------------------------------------------
    {
      id: "big-o",
      title: "Big O Notation",
      emoji: "⏱️",
      summary: "วัดว่าโค้ดช้าลงแค่ไหนเมื่อข้อมูลเยอะขึ้น",
      tags: ["big o", "complexity", "time", "space", "algorithm", "performance"],
      sections: [
        {
          type: "text",
          body: "Big O บอกว่า **เวลา (หรือ memory) โตขึ้นยังไงเมื่อ n ใหญ่ขึ้น** ไม่ได้บอกเวลาจริงเป็นวินาที 🐢🐇\n\nปกติพูดถึง **worst case**",
        },
        {
          type: "table",
          headers: ["Big O", "ชื่อ", "ตัวอย่าง", "n = 1,000 ประมาณ"],
          rows: [
            ["O(1)", "Constant", "`arr[i]`, Map lookup", "1"],
            ["O(log n)", "Logarithmic", "Binary search", "~10"],
            ["O(n)", "Linear", "loop ทีละตัว", "1,000"],
            ["O(n log n)", "Linearithmic", "Merge sort, sort ทั่วไป", "~10,000"],
            ["O(n²)", "Quadratic", "loop ซ้อน 2 ชั้น", "1,000,000"],
            ["O(2ⁿ)", "Exponential", "fib แบบ recursive ตรงๆ, subsets", "มหาศาล 💥"],
            ["O(n!)", "Factorial", "เรียงสับเปลี่ยนทุกแบบ", "อย่าเลย 😵"],
          ],
        },
        {
          type: "code",
          lang: "js",
          code: `// O(1)
const first = (arr) => arr[0];

// O(n)
function sum(arr) {
  let total = 0;
  for (const x of arr) total += x;
  return total;
}

// O(n²) — loop ซ้อน
function hasDuplicateSlow(arr) {
  for (let i = 0; i < arr.length; i++)
    for (let j = i + 1; j < arr.length; j++)
      if (arr[i] === arr[j]) return true;
  return false;
}

// O(n) — ใช้ Set ช่วย (แลกกับ memory O(n))
const hasDuplicate = (arr) => new Set(arr).size !== arr.length;`,
        },
        {
          type: "list",
          title: "กฎการคิด Big O",
          items: [
            "ตัดค่าคงที่ทิ้ง: O(2n) → **O(n)**",
            "เก็บแค่พจน์ใหญ่สุด: O(n² + n) → **O(n²)**",
            "input คนละตัวใช้คนละตัวแปร: loop a แล้ว loop b = **O(a + b)**, ซ้อนกัน = **O(a × b)**",
            "แบ่งครึ่งทุกรอบ → มักเป็น **log n**",
            "อย่าลืม **space complexity** (memory ที่ใช้เพิ่ม) ด้วย",
          ],
        },
        {
          type: "table",
          title: "Data structure ops (เฉลี่ย)",
          headers: ["โครงสร้าง", "เข้าถึง", "ค้นหา", "เพิ่ม", "ลบ"],
          rows: [
            ["Array", "O(1)", "O(n)", "O(1)* ท้าย / O(n) กลาง", "O(n)"],
            ["Linked List", "O(n)", "O(n)", "O(1) หัว", "O(1) ถ้ามี node"],
            ["Hash Table", "-", "O(1)", "O(1)", "O(1)"],
            ["BST (balanced)", "O(log n)", "O(log n)", "O(log n)", "O(log n)"],
            ["Heap", "O(1) peek", "O(n)", "O(log n)", "O(log n) pop"],
          ],
        },
        {
          type: "tip",
          body: "*amortized = เฉลี่ยแล้วถูก แม้บางครั้งต้องขยาย array ใหม่ทั้งก้อน\n\nเห็นโจทย์ n ถึง 10⁵ ขึ้นไป ให้เล็ง O(n log n) หรือดีกว่า O(n²) ไม่รอดแน่ 🏃",
        },
      ],
    },
    // ------------------------------------------------------------
    {
      id: "array-linked-list",
      title: "Array & Linked List",
      emoji: "🚃",
      summary: "เก็บของเรียงกัน: ช่องติดกัน vs ขบวนรถไฟต่อกัน",
      tags: ["array", "linked list", "data structure", "node", "reverse"],
      sections: [
        {
          type: "text",
          body: "**Array** = ช่องเก็บของติดกันใน memory 📦📦📦 กระโดดไปช่องไหนก็ได้ทันที แต่แทรกตรงกลางต้องเลื่อนทุกตัว\n\n**Linked List** = ขบวนรถไฟ 🚃→🚃→🚃 แต่ละ node ชี้ไปตัวถัดไป แทรก/ลบง่ายถ้าเจอตำแหน่งแล้ว แต่ต้องเดินไล่หาตั้งแต่หัว",
        },
        {
          type: "table",
          headers: ["", "Array", "Linked List"],
          rows: [
            ["เข้าถึงตัวที่ i", "O(1) ⚡", "O(n)"],
            ["เพิ่ม/ลบ หัว", "O(n)", "O(1) ⚡"],
            ["เพิ่มท้าย", "O(1)*", "O(1) ถ้ามี tail"],
            ["Memory", "ติดกัน cache-friendly", "กระจาย + ต้องเก็บ pointer"],
          ],
        },
        {
          type: "code",
          title: "Reverse Linked List (โจทย์คลาสสิก)",
          lang: "js",
          code: `class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

function reverseList(head) {
  let prev = null;
  let curr = head;
  while (curr) {
    const next = curr.next; // จำตัวถัดไปไว้
    curr.next = prev;       // กลับหัวลูกศร
    prev = curr;
    curr = next;
  }
  return prev;
}

// 1 → 2 → 3  กลายเป็น  3 → 2 → 1
let node = reverseList(new ListNode(1, new ListNode(2, new ListNode(3))));
while (node) { console.log(node.val); node = node.next; } // 3 2 1`,
        },
        {
          type: "code",
          title: "Array methods กับความเร็ว",
          lang: "js",
          code: `const a = [1, 2, 3];
a.push(4);        // O(1) เพิ่มท้าย
a.pop();          // O(1) ลบท้าย
a.unshift(0);     // O(n) เพิ่มหัว ต้องเลื่อนทุกตัว
a.shift();        // O(n) ลบหัว
a.splice(1, 1);   // O(n) ลบตรงกลาง
a.includes(3);    // O(n) ค้นหา`,
        },
        {
          type: "tip",
          body: "ชีวิตจริงใช้ Array เกือบตลอด เพราะเร็วกว่าในทางปฏิบัติ (CPU cache ชอบ) ส่วน Linked List ไปโผล่ใน LRU cache, queue และโจทย์สัมภาษณ์ 🎤",
        },
      ],
    },
    // ------------------------------------------------------------
    {
      id: "stack-queue",
      title: "Stack & Queue",
      emoji: "🥞",
      summary: "LIFO กองแพนเค้ก vs FIFO ต่อคิวซื้อชานม",
      tags: ["stack", "queue", "lifo", "fifo", "deque", "data structure"],
      sections: [
        {
          type: "text",
          body: "**Stack** (LIFO) = กองแพนเค้ก 🥞 วางบนสุด หยิบบนสุด: `push` / `pop`\n\n**Queue** (FIFO) = ต่อคิวซื้อชานม 🧋 มาก่อนได้ก่อน: `enqueue` / `dequeue`",
        },
        {
          type: "table",
          headers: ["", "Stack", "Queue"],
          rows: [
            ["หลักการ", "เข้าหลัง ออกก่อน", "เข้าก่อน ออกก่อน"],
            ["ใช้กับ", "undo, call stack, ปุ่ม back, DFS, เช็ควงเล็บ", "BFS, job queue, print queue, message queue"],
          ],
        },
        {
          type: "code",
          title: "Stack: เช็ควงเล็บถูกคู่ไหม",
          lang: "js",
          code: `function isValid(s) {
  const pairs = { ")": "(", "]": "[", "}": "{" };
  const stack = [];
  for (const ch of s) {
    if (ch === "(" || ch === "[" || ch === "{") {
      stack.push(ch);
    } else if (stack.pop() !== pairs[ch]) {
      return false;
    }
  }
  return stack.length === 0;
}

isValid("({[]})"); // true
isValid("(]");     // false`,
        },
        {
          type: "code",
          title: "Queue ที่ dequeue ได้ O(1)",
          lang: "js",
          code: `class Queue {
  constructor() {
    this.items = {};
    this.head = 0;
    this.tail = 0;
  }
  enqueue(x) { this.items[this.tail++] = x; }
  dequeue() {
    if (this.head === this.tail) return undefined;
    const x = this.items[this.head];
    delete this.items[this.head++];
    return x;
  }
  get size() { return this.tail - this.head; }
}

const q = new Queue();
q.enqueue("🐱"); q.enqueue("🐶");
q.dequeue(); // "🐱"`,
        },
        {
          type: "code",
          title: "Python มีให้ใช้เลย",
          lang: "python",
          code: `from collections import deque

q = deque()
q.append("a")
q.append("b")
q.popleft()   # 'a'  O(1)

stack = []
stack.append(1)
stack.pop()   # 1`,
        },
        {
          type: "warn",
          body: "ใน JS `array.shift()` เป็น O(n) ถ้าทำ queue ใหญ่ๆ แล้ว shift บ่อย จะช้าแบบเงียบๆ 🐌 ใช้ class แบบด้านบนหรือ index pointer แทน",
        },
      ],
    },
    // ------------------------------------------------------------
    {
      id: "hash-table",
      title: "Hash Table",
      emoji: "🗝️",
      summary: "ค้นหา เพิ่ม ลบ ด้วย key ใน O(1) โดยเฉลี่ย",
      tags: ["hash table", "hash map", "map", "set", "dictionary", "collision", "two sum"],
      sections: [
        {
          type: "text",
          body: "เอา key ไปผ่าน **hash function** ได้เลข index → เก็บ value ไว้ช่องนั้นเลย ค้นหาทีหลังก็คำนวณซ้ำแล้วกระโดดไปหยิบได้ทันที 🎯\n\nใน JS คือ `Map` / `Set` / object, ใน Python คือ `dict` / `set`",
        },
        {
          type: "list",
          title: "เรื่องที่ต้องรู้",
          items: [
            "**Collision**: 2 key ได้ index เดียวกัน แก้ด้วย **chaining** (เก็บเป็นลิสต์ในช่อง) หรือ **open addressing** (หาช่องว่างถัดไป)",
            "**Load factor** = จำนวนของ / จำนวนช่อง ถ้าแน่นเกิน (เช่น > 0.75) จะขยายตาราง + rehash ใหม่",
            "เฉลี่ย O(1) แต่ worst case O(n) ถ้าชนกันหมด",
          ],
        },
        {
          type: "code",
          title: "Two Sum: O(n²) → O(n) ด้วย Map",
          lang: "js",
          code: `function twoSum(nums, target) {
  const seen = new Map(); // value -> index
  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i];
    if (seen.has(need)) return [seen.get(need), i];
    seen.set(nums[i], i);
  }
  return [];
}

twoSum([2, 7, 11, 15], 9); // [0, 1]`,
        },
        {
          type: "code",
          title: "ทำ Hash Table เองแบบ chaining (ของเล่น)",
          lang: "js",
          code: `class HashTable {
  constructor(size = 16) {
    this.buckets = Array.from({ length: size }, () => []);
  }
  hash(key) {
    let h = 0;
    for (const ch of String(key)) {
      h = (h * 31 + ch.charCodeAt(0)) % this.buckets.length;
    }
    return h;
  }
  set(key, value) {
    const bucket = this.buckets[this.hash(key)];
    const pair = bucket.find((p) => p[0] === key);
    if (pair) pair[1] = value;
    else bucket.push([key, value]);
  }
  get(key) {
    const pair = this.buckets[this.hash(key)].find((p) => p[0] === key);
    return pair ? pair[1] : undefined;
  }
}`,
        },
        {
          type: "code",
          title: "นับความถี่ (Python)",
          lang: "python",
          code: `from collections import Counter

Counter("banana")              # Counter({'a': 3, 'n': 2, 'b': 1})
Counter("banana").most_common(1)  # [('a', 3)]`,
        },
        {
          type: "tip",
          body: "เจอโจทย์ “เคยเห็นตัวนี้หรือยัง / นับจำนวน / จับคู่” ให้นึกถึง Hash Map ก่อนเลย 💡 เป็นท่าเปลี่ยน O(n²) เป็น O(n) ที่ใช้บ่อยที่สุด",
        },
      ],
    },
    // ------------------------------------------------------------
    {
      id: "tree-bst",
      title: "Tree & Binary Search Tree",
      emoji: "🌳",
      summary: "โครงสร้างแบบต้นไม้ และ BST ที่ซ้ายเล็ก ขวาใหญ่",
      tags: ["tree", "bst", "binary tree", "traversal", "inorder", "preorder", "postorder", "recursion"],
      sections: [
        {
          type: "list",
          title: "ศัพท์ต้นไม้ 🌱",
          items: [
            "**Root** = โหนดบนสุด, **Leaf** = โหนดที่ไม่มีลูก",
            "**Height** = ความสูงจาก root ถึง leaf ที่ลึกสุด",
            "**Binary Tree** = แต่ละโหนดมีลูกไม่เกิน 2",
            "**BST** = ลูกซ้าย < พ่อ < ลูกขวา (ทุกโหนด)",
            "**Balanced BST** (AVL, Red-Black) = รักษาความสูงไว้ที่ O(log n) เสมอ",
          ],
        },
        {
          type: "code",
          lang: "js",
          code: `class TreeNode {
  constructor(val) { this.val = val; this.left = null; this.right = null; }
}
function insert(root, val) {
  if (!root) return new TreeNode(val);
  if (val < root.val) root.left = insert(root.left, val);
  else root.right = insert(root.right, val);
  return root;
}

function search(root, val) {
  if (!root || root.val === val) return root;
  return val < root.val ? search(root.left, val) : search(root.right, val);
}

function inorder(root, out = []) {
  if (root) { inorder(root.left, out); out.push(root.val); inorder(root.right, out); }
  return out;
}
const maxDepth = (n) => (n ? 1 + Math.max(maxDepth(n.left), maxDepth(n.right)) : 0);

let root = null;
for (const v of [8, 3, 10, 1, 6, 14]) root = insert(root, v);
inorder(root);   // [1, 3, 6, 8, 10, 14] เรียงแล้ว!
maxDepth(root);  // 3`,
        },
        {
          type: "code",
          title: "หน้าตาต้นไม้ที่ได้",
          lang: "text",
          code: `        8
      /   \\
     3     10
    / \\      \\
   1   6      14`,
        },
        {
          type: "table",
          title: "Traversal 4 แบบ (ต้นไม้ด้านบน)",
          headers: ["แบบ", "ลำดับ", "ผลลัพธ์"],
          rows: [
            ["Preorder", "พ่อ → ซ้าย → ขวา", "8 3 1 6 10 14"],
            ["Inorder", "ซ้าย → พ่อ → ขวา", "1 3 6 8 10 14 (เรียง!)"],
            ["Postorder", "ซ้าย → ขวา → พ่อ", "1 6 3 14 10 8"],
            ["Level order", "ทีละชั้น (BFS)", "8 3 10 1 6 14"],
          ],
        },
        {
          type: "warn",
          body: "ถ้าใส่ข้อมูลที่เรียงอยู่แล้ว (1, 2, 3, 4...) ลง BST ธรรมดา ต้นไม้จะเบี้ยวเป็นเส้นตรง → ช้าเป็น O(n) 😢 เลยต้องมี balanced tree",
        },
        {
          type: "pairs",
          title: "ต้นไม้ในชีวิตจริง",
          items: ["DOM", "File system", "B-tree index ใน DB", "JSON", "AST ของ compiler", "Trie (autocomplete)"],
        },
      ],
    },
    // ------------------------------------------------------------
    {
      id: "heap",
      title: "Heap & Priority Queue",
      emoji: "⛰️",
      summary: "หยิบตัวเล็กสุด/ใหญ่สุดได้ทันที เหมาะกับคิวตามลำดับความสำคัญ",
      tags: ["heap", "priority queue", "min heap", "max heap", "top k", "heapq"],
      sections: [
        {
          type: "text",
          body: "**Heap** = binary tree ที่เต็มเกือบทุกชั้น เก็บใน array ได้เลย\n\n**Min-heap**: พ่อ ≤ ลูกเสมอ → ตัวเล็กสุดอยู่บนสุด 👑\n**Max-heap**: กลับกัน",
        },
        {
          type: "list",
          title: "สูตร index ใน array",
          items: [
            "พ่อของ i = `Math.floor((i - 1) / 2)`",
            "ลูกซ้าย = `2i + 1`, ลูกขวา = `2i + 2`",
            "peek O(1), push / pop O(log n), สร้างจาก array (heapify) O(n)",
          ],
        },
        {
          type: "code",
          title: "Python heapq (เป็น min-heap)",
          lang: "python",
          code: `import heapq

nums = [5, 1, 8, 3, 2]
heapq.heapify(nums)          # O(n)
heapq.heappush(nums, 0)      # O(log n)
print(heapq.heappop(nums))   # 0  ตัวเล็กสุด
print(nums[0])               # 1  peek

print(heapq.nlargest(3, [5, 1, 8, 3, 2]))  # [8, 5, 3]

# max-heap: ใส่ค่าติดลบ
max_heap = []
for x in [5, 1, 8]:
    heapq.heappush(max_heap, -x)
print(-heapq.heappop(max_heap))  # 8

# priority queue: (priority, งาน)
tasks = []
heapq.heappush(tasks, (2, "write docs"))
heapq.heappush(tasks, (1, "fix bug"))
print(heapq.heappop(tasks))  # (1, 'fix bug')`,
        },
        {
          type: "code",
          title: "MinHeap ใน JS (JS ไม่มีให้ในตัว)",
          lang: "js",
          code: `class MinHeap {
  constructor() { this.h = []; }
  peek() { return this.h[0]; }
  push(v) {                       // ใส่ท้าย แล้วลอยขึ้น ⬆️
    const h = this.h; h.push(v);
    for (let i = h.length - 1, p; i > 0 && h[(p = (i - 1) >> 1)] > h[i]; i = p) {
      [h[p], h[i]] = [h[i], h[p]];
    }
  }
  pop() {                         // เอาตัวท้ายขึ้นบน แล้วจมลง ⬇️
    const h = this.h, top = h[0], last = h.pop();
    if (h.length === 0) return top;
    h[0] = last;
    for (let i = 0; ;) {
      const l = 2 * i + 1, r = l + 1;
      let m = i;
      if (l < h.length && h[l] < h[m]) m = l;
      if (r < h.length && h[r] < h[m]) m = r;
      if (m === i) break;
      [h[m], h[i]] = [h[i], h[m]];
      i = m;
    }
    return top;
  }
}`,
        },
        {
          type: "pairs",
          title: "ใช้คู่กับ",
          items: ["Top K elements", "Dijkstra", "Merge K sorted lists", "Median of stream", "Task scheduler", "Heap sort"],
        },
      ],
    },
    // ------------------------------------------------------------
    {
      id: "graph",
      title: "Graph, BFS & DFS",
      emoji: "🕸️",
      summary: "จุดกับเส้นเชื่อม และ 2 ท่าเดินสำรวจกราฟ",
      tags: ["graph", "bfs", "dfs", "adjacency list", "shortest path", "traversal"],
      sections: [
        {
          type: "list",
          items: [
            "**Vertex / Node** = จุด, **Edge** = เส้นเชื่อม",
            "**Directed** (มีทิศ เช่น follow) vs **Undirected** (สองทาง เช่น friend)",
            "**Weighted** = เส้นมีน้ำหนัก เช่น ระยะทาง",
            "**DAG** = มีทิศและไม่มีวงวน (เช่น dependency ของ package)",
          ],
        },
        {
          type: "table",
          title: "วิธีเก็บกราฟ",
          headers: ["", "Adjacency List", "Adjacency Matrix"],
          rows: [
            ["หน้าตา", "`{ A: ['B', 'C'] }`", "ตาราง V × V ของ 0/1"],
            ["Memory", "O(V + E) ✅", "O(V²)"],
            ["เช็คว่า A-B เชื่อมกันไหม", "O(degree)", "O(1)"],
            ["เหมาะกับ", "กราฟทั่วไป (ส่วนใหญ่)", "กราฟแน่นมาก"],
          ],
        },
        {
          type: "code",
          title: "BFS: ใช้ queue ไปทีละชั้น 🌊",
          lang: "js",
          code: `const graph = {
  A: ["B", "C"], B: ["D"], C: ["D", "E"],
  D: ["F"], E: ["F"], F: [],
};

function bfs(start) {
  const visited = new Set([start]);
  const queue = [start];
  const order = [];
  while (queue.length) {
    const node = queue.shift();
    order.push(node);
    for (const next of graph[node]) {
      if (!visited.has(next)) { visited.add(next); queue.push(next); }
    }
  }
  return order;
}

bfs("A"); // A B C D E F`,
        },
        {
          type: "code",
          title: "DFS: ดำดิ่งให้สุดก่อน แล้วค่อยถอย 🤿",
          lang: "js",
          code: `function dfs(node, visited = new Set(), order = []) {
  visited.add(node);
  order.push(node);
  for (const next of graph[node]) {
    if (!visited.has(next)) dfs(next, visited, order);
  }
  return order;
}

dfs("A"); // A B D F C E`,
        },
        {
          type: "table",
          headers: ["", "BFS", "DFS"],
          rows: [
            ["โครงสร้าง", "Queue", "Stack / recursion"],
            ["เดินแบบ", "ทีละชั้น", "ลึกสุดก่อน"],
            ["เด่นเรื่อง", "หาทางสั้นสุด (กราฟไม่มีน้ำหนัก)", "หาวงวน, topological sort, backtracking, เขาวงกต"],
            ["Complexity", "O(V + E)", "O(V + E)"],
          ],
        },
        {
          type: "tip",
          body: "กราฟมีน้ำหนัก → ใช้ **Dijkstra** (heap ช่วย) ✨ โจทย์ตาราง 2 มิติ (grid) ก็คือกราฟนะ ช่องละ node เชื่อมกับบน/ล่าง/ซ้าย/ขวา",
        },
        {
          type: "warn",
          body: "อย่าลืม `visited` เด็ดขาด! ไม่งั้นกราฟที่มีวงวนจะวิ่งไม่หยุด ♾️",
        },
      ],
    },
    // ------------------------------------------------------------
    {
      id: "sorting",
      title: "Sorting Algorithms",
      emoji: "🧺",
      summary: "เทียบ algorithm เรียงข้อมูล + merge sort / quick sort",
      tags: ["sorting", "merge sort", "quick sort", "bubble sort", "stable", "algorithm"],
      sections: [
        {
          type: "table",
          headers: ["Algorithm", "Best", "Average", "Worst", "Space", "Stable"],
          rows: [
            ["Bubble", "O(n)", "O(n²)", "O(n²)", "O(1)", "✅"],
            ["Selection", "O(n²)", "O(n²)", "O(n²)", "O(1)", "❌"],
            ["Insertion", "O(n)", "O(n²)", "O(n²)", "O(1)", "✅"],
            ["Merge", "O(n log n)", "O(n log n)", "O(n log n)", "O(n)", "✅"],
            ["Quick", "O(n log n)", "O(n log n)", "O(n²)", "O(log n)", "❌"],
            ["Heap", "O(n log n)", "O(n log n)", "O(n log n)", "O(1)", "❌"],
            ["Counting", "O(n + k)", "O(n + k)", "O(n + k)", "O(n + k)", "✅"],
            ["Timsort", "O(n)", "O(n log n)", "O(n log n)", "O(n)", "✅"],
          ],
        },
        {
          type: "text",
          body: "**Stable** = ของที่ค่าเท่ากันยังอยู่ลำดับเดิม เช่น เรียงตามอายุแล้ว คนอายุเท่ากันยังเรียงตามชื่อเหมือนเดิม 👯\n\nPython `sorted()` และ JS `Array.prototype.sort` (V8) ใช้ **Timsort** ซึ่ง stable",
        },
        {
          type: "code",
          title: "Merge Sort: แบ่งครึ่ง → เรียง → รวม",
          lang: "js",
          code: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  const result = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) result.push(left[i++]);
    else result.push(right[j++]);
  }
  return result.concat(left.slice(i), right.slice(j));
}

mergeSort([5, 2, 9, 1, 5, 6]); // [1, 2, 5, 5, 6, 9]`,
        },
        {
          type: "code",
          title: "Quick Sort (เวอร์ชันอ่านง่าย)",
          lang: "js",
          code: `function quickSort(arr) {
  if (arr.length <= 1) return arr;
  const [pivot, ...rest] = arr;
  const left = rest.filter((x) => x < pivot);
  const right = rest.filter((x) => x >= pivot);
  return [...quickSort(left), pivot, ...quickSort(right)];
}

quickSort([3, 6, 1, 8, 2]); // [1, 2, 3, 6, 8]`,
          note: "ของจริงทำ in-place partition เพื่อประหยัด memory และสุ่ม pivot กัน worst case",
        },
        {
          type: "code",
          title: "ใช้ sort ในตัวให้ถูก",
          lang: "js",
          code: `[10, 1, 2].sort();                 // [1, 10, 2] 😱 เรียงแบบ string!
[10, 1, 2].sort((a, b) => a - b);  // [1, 2, 10] ✅
[10, 1, 2].sort((a, b) => b - a);  // [10, 2, 1] มากไปน้อย

users.sort((a, b) => a.name.localeCompare(b.name));
const sorted = [...nums].sort((a, b) => a - b); // ไม่แก้ array เดิม
// หรือ nums.toSorted((a, b) => a - b)  (ES2023)`,
        },
        {
          type: "warn",
          body: "`sort()` ของ JS **แก้ array เดิม** (mutate) นะ ระวังใน React state! ใช้ `[...arr].sort()` หรือ `toSorted()` แทน",
        },
      ],
    },
    // ------------------------------------------------------------
    {
      id: "binary-search",
      title: "Binary Search",
      emoji: "🔎",
      summary: "ค้นหาในข้อมูลที่เรียงแล้ว ด้วยการแบ่งครึ่งทุกรอบ O(log n)",
      tags: ["binary search", "search", "lower bound", "bisect", "log n"],
      sections: [
        {
          type: "text",
          body: "เหมือนเกมทายเลข 1-100 🎲 ทายตรงกลางเสมอ แล้วตัดทิ้งครึ่งที่ไม่ใช่ ข้อมูลล้านตัวใช้แค่ ~20 ครั้ง!\n\n**เงื่อนไข: ข้อมูลต้องเรียงแล้วเท่านั้น**",
        },
        {
          type: "code",
          lang: "js",
          code: `function binarySearch(arr, target) {
  let lo = 0, hi = arr.length - 1;
  while (lo <= hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;
}

binarySearch([1, 3, 5, 7, 9, 11], 7); // 3`,
        },
        {
          type: "code",
          title: "Lower bound: ตำแหน่งแรกที่ ≥ target",
          lang: "js",
          code: `function lowerBound(arr, target) {
  let lo = 0, hi = arr.length;   // ช่วงครึ่งเปิด [lo, hi)
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (arr[mid] < target) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}

lowerBound([1, 3, 3, 5], 3); // 1 (เจอ 3 ตัวแรก)
lowerBound([1, 3, 3, 5], 4); // 3 (ควรแทรกตรงนี้)`,
          note: "Python มีให้เลย: `bisect.bisect_left(arr, x)`",
        },
        {
          type: "tip",
          body: "**Binary search on answer**: ถ้าคำตอบมีลักษณะ “ถ้า x ทำได้ ค่าที่มากกว่าก็ทำได้” ให้ binary search บนค่าคำตอบเลย เช่น หาความเร็วต่ำสุดที่ส่งของทันเวลา 🚚",
        },
        {
          type: "warn",
          body: "จุดพลาดยอดฮิต: `<=` vs `<`, `mid + 1` vs `mid` (off-by-one → loop ไม่จบ) และในภาษาอย่าง Java/C++ `(lo + hi) / 2` อาจ overflow ใช้ `lo + (hi - lo) / 2` ปลอดภัยกว่า",
        },
      ],
    },
    // ------------------------------------------------------------
    {
      id: "recursion-dp",
      title: "Recursion & Dynamic Programming",
      emoji: "🪞",
      summary: "ฟังก์ชันเรียกตัวเอง และการจำคำตอบไม่ให้คิดซ้ำ",
      tags: ["recursion", "dynamic programming", "dp", "memoization", "tabulation", "fibonacci"],
      sections: [
        {
          type: "text",
          body: "**Recursion** = ฟังก์ชันเรียกตัวเองกับปัญหาที่เล็กลง ต้องมี 2 อย่าง:\n\n1) **Base case** จุดหยุด 🛑\n2) **Recursive case** ทำให้ปัญหาเล็กลงเรื่อยๆ 🔁",
        },
        {
          type: "code",
          lang: "js",
          code: `function factorial(n) {
  if (n <= 1) return 1;          // base case
  return n * factorial(n - 1);   // recursive case
}
factorial(5); // 120

// Fibonacci ตรงๆ: O(2^n) ช้ามาก 🐢 เพราะคิดซ้ำเพียบ
function fib(n) {
  if (n < 2) return n;
  return fib(n - 1) + fib(n - 2);
}`,
        },
        {
          type: "text",
          title: "Dynamic Programming 🧠",
          body: "DP = recursion + **จำคำตอบของปัญหาย่อย** ใช้ได้เมื่อ (1) ปัญหาย่อยซ้ำกัน และ (2) คำตอบใหญ่สร้างจากคำตอบย่อยได้\n\n**Top-down (memoization)**: recursion + cache\n**Bottom-up (tabulation)**: loop เติมตารางจากเล็กไปใหญ่",
        },
        {
          type: "code",
          title: "Fibonacci แบบ DP: O(n)",
          lang: "js",
          code: `// Top-down: memo
function fibMemo(n, memo = new Map()) {
  if (n < 2) return n;
  if (memo.has(n)) return memo.get(n);
  const value = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
  memo.set(n, value);
  return value;
}

// Bottom-up: แถม space O(1)
function fibTab(n) {
  if (n < 2) return n;
  let prev = 0, curr = 1;
  for (let i = 2; i <= n; i++) [prev, curr] = [curr, prev + curr];
  return curr;
}

fibTab(50); // 12586269025`,
        },
        {
          type: "code",
          title: "Coin Change (Python)",
          lang: "python",
          code: `def coin_change(coins, amount):
    # dp[a] = จำนวนเหรียญน้อยสุดที่รวมได้ a
    dp = [0] + [float("inf")] * amount
    for a in range(1, amount + 1):
        for c in coins:
            if c <= a:
                dp[a] = min(dp[a], dp[a - c] + 1)
    return dp[amount] if dp[amount] != float("inf") else -1

print(coin_change([1, 3, 4], 6))  # 2 (3+3)
# greedy จะได้ 4+1+1 = 3 เหรียญ ผิด! เลยต้อง DP`,
        },
        {
          type: "steps",
          title: "สูตรคิดโจทย์ DP",
          items: [
            "นิยาม **state**: `dp[i]` หมายถึงอะไร",
            "หา **สมการ** เชื่อม state ใหญ่กับ state ย่อย",
            "กำหนด **base case**",
            "เลือกลำดับการคำนวณ (top-down หรือ bottom-up)",
            "ลด memory ถ้าใช้แค่ไม่กี่ค่าก่อนหน้า",
          ],
        },
        {
          type: "warn",
          body: "Recursion ลึกมากๆ จะ **stack overflow** (JS ราวหมื่นชั้น, Python ค่า default 1000 ชั้น) งานลึกๆ เปลี่ยนเป็น loop ดีกว่า",
        },
        {
          type: "pairs",
          title: "โจทย์ DP คลาสสิก",
          items: ["Climbing Stairs", "Coin Change", "Knapsack", "Longest Common Subsequence", "Edit Distance", "House Robber"],
        },
      ],
    },
    // ------------------------------------------------------------
    {
      id: "oop",
      title: "OOP 4 เสาหลัก",
      emoji: "🏛️",
      summary: "Encapsulation, Abstraction, Inheritance, Polymorphism",
      tags: ["oop", "class", "encapsulation", "abstraction", "inheritance", "polymorphism", "composition"],
      sections: [
        {
          type: "table",
          headers: ["เสา", "ความหมาย", "เปรียบเทียบ"],
          rows: [
            ["🔐 Encapsulation", "ซ่อนข้อมูลข้างใน ให้แก้ผ่าน method เท่านั้น", "ตู้เย็นซ่อนคอมเพรสเซอร์ เรากดแค่ปุ่ม"],
            ["🎭 Abstraction", "โชว์แค่สิ่งที่จำเป็น ซ่อนรายละเอียดยุ่งๆ", "ขับรถไม่ต้องรู้ว่าเครื่องยนต์ทำงานยังไง"],
            ["👪 Inheritance", "class ลูกรับความสามารถจาก class แม่", "แมว เป็น สัตว์"],
            ["🦎 Polymorphism", "method ชื่อเดียว แต่ละ class ทำต่างกัน", "`speak()` แมวเมี้ยว หมาโฮ่ง"],
          ],
        },
        {
          type: "code",
          lang: "ts",
          code: `abstract class Animal {
  #energy = 100;                       // Encapsulation (private)
  constructor(public name: string) {}

  abstract speak(): string;            // Abstraction

  eat(amount: number): void {
    this.#energy = Math.min(100, this.#energy + amount);
  }
  get energy(): number { return this.#energy; }
}

class Cat extends Animal {             // Inheritance
  speak() { return this.name + ": เมี้ยว 🐱"; }
}
class Dog extends Animal {
  speak() { return this.name + ": โฮ่ง 🐶"; }
}

const pets: Animal[] = [new Cat("Mochi"), new Dog("Kuma")];
pets.forEach((p) => console.log(p.speak())); // Polymorphism`,
        },
        {
          type: "code",
          title: "Composition over Inheritance",
          lang: "ts",
          code: `// แทนที่จะสืบทอดลึกๆ ให้ "ประกอบ" ความสามารถเข้าด้วยกัน
const canFly = { fly: () => "บินได้ 🕊️" };
const canSwim = { swim: () => "ว่ายได้ 🐟" };

const duck = { name: "Ped", ...canFly, ...canSwim };
duck.fly();  // "บินได้ 🕊️"
duck.swim(); // "ว่ายได้ 🐟"`,
        },
        {
          type: "tip",
          body: "สืบทอดเกิน 2-3 ชั้นเริ่มอ่านยากและแก้ยาก 🍝 ถามตัวเองเสมอว่า “**is-a**” (เป็น) หรือ “**has-a**” (มี) ถ้าเป็น has-a ใช้ composition",
        },
      ],
    },
    // ------------------------------------------------------------
    {
      id: "solid",
      title: "SOLID Principles",
      emoji: "🧱",
      summary: "5 หลักออกแบบให้โค้ดแก้ง่าย ขยายง่าย ไม่พังเป็นโดมิโน",
      tags: ["solid", "srp", "ocp", "lsp", "isp", "dip", "design", "clean architecture"],
      sections: [
        {
          type: "table",
          headers: ["ตัว", "ชื่อ", "จำง่ายๆ"],
          rows: [
            ["S", "Single Responsibility", "1 class มีเหตุผลให้เปลี่ยนแค่เรื่องเดียว"],
            ["O", "Open/Closed", "เปิดให้ขยาย ปิดไม่ให้แก้ของเดิม"],
            ["L", "Liskov Substitution", "เอาลูกไปแทนแม่ได้โดยไม่พัง"],
            ["I", "Interface Segregation", "interface เล็กๆ เฉพาะทาง ดีกว่าอันใหญ่อันเดียว"],
            ["D", "Dependency Inversion", "พึ่งพา abstraction ไม่ใช่ของจริง"],
          ],
        },
        {
          type: "text",
          title: "S: Single Responsibility",
          body: "`UserService` ที่ทั้ง validate, บันทึก DB, ส่งอีเมล, สร้าง PDF = แก้เรื่องอีเมลทีไรเสี่ยงพังเรื่อง DB 😵 → แยกเป็น `UserRepository`, `EmailService`, `PdfGenerator`",
        },
        {
          type: "code",
          title: "O: เพิ่ม shape ใหม่โดยไม่ต้องแก้โค้ดเดิม",
          lang: "ts",
          code: `interface Shape { area(): number; }

class Circle implements Shape {
  constructor(private r: number) {}
  area() { return Math.PI * this.r ** 2; }
}
class Rect implements Shape {
  constructor(private w: number, private h: number) {}
  area() { return this.w * this.h; }
}

// ไม่มี if/switch ตามชนิด shape เลย ✅
const totalArea = (shapes: Shape[]) =>
  shapes.reduce((sum, s) => sum + s.area(), 0);`,
        },
        {
          type: "text",
          title: "L: Liskov Substitution",
          body: "ตัวอย่างคลาสสิก: `Square extends Rectangle` แล้ว `setWidth(5)` ดันไปเปลี่ยน height ด้วย โค้ดที่คาดว่า area = width × height ก็พัง 💥 แปลว่าสืบทอดผิดตั้งแต่แรก",
        },
        {
          type: "code",
          title: "I: แยก interface ให้เล็ก",
          lang: "ts",
          code: `// ❌ บังคับให้ทุกเครื่องต้องมี fax
interface Machine { print(): void; scan(): void; fax(): void; }

// ✅ เลือกใช้เท่าที่มีจริง
interface Printer { print(): void; }
interface Scanner { scan(): void; }

class SimplePrinter implements Printer {
  print() { console.log("🖨️"); }
}
class AllInOne implements Printer, Scanner {
  print() { console.log("🖨️"); }
  scan() { console.log("📠"); }
}`,
        },
        {
          type: "code",
          title: "D: ฉีด dependency ผ่าน interface",
          lang: "ts",
          code: `interface Notifier { send(to: string, msg: string): Promise<void>; }

class EmailNotifier implements Notifier {
  async send(to: string, msg: string) { /* ส่งอีเมลจริง */ }
}
class FakeNotifier implements Notifier {
  sent: string[] = [];
  async send(to: string, msg: string) { this.sent.push(to + ": " + msg); }
}

class OrderService {
  constructor(private notifier: Notifier) {}   // พึ่ง interface ✅
  async placeOrder(email: string) {
    // ...บันทึก order...
    await this.notifier.send(email, "สั่งซื้อสำเร็จ 🎉");
  }
}

new OrderService(new EmailNotifier()); // production
new OrderService(new FakeNotifier());  // test ง่ายมาก`,
        },
        {
          type: "tip",
          body: "SOLID เป็น **แนวทาง** ไม่ใช่กฎเหล็ก โปรเจกต์เล็กๆ ไม่ต้องสร้าง interface ทุกอย่างก็ได้ ใช้เมื่อเริ่มรู้สึกว่าแก้ยาก 🌱",
        },
      ],
    },
    // ------------------------------------------------------------
    {
      id: "design-patterns",
      title: "Design Patterns ยอดฮิต",
      emoji: "🧵",
      summary: "Singleton, Factory, Observer, Strategy, Repository, MVC",
      tags: ["design pattern", "singleton", "factory", "observer", "strategy", "repository", "mvc", "gof"],
      sections: [
        {
          type: "table",
          headers: ["Pattern", "กลุ่ม", "ใช้เมื่อ"],
          rows: [
            ["Singleton", "Creational", "ต้องมี instance เดียวทั้งแอป (config, DB pool)"],
            ["Factory", "Creational", "สร้าง object หลายชนิดจากเงื่อนไข โดยไม่ให้คนเรียกรู้ class จริง"],
            ["Observer", "Behavioral", "เหตุการณ์เกิดแล้วแจ้งหลายคน (event, pub/sub)"],
            ["Strategy", "Behavioral", "สลับวิธีคำนวณได้ตอน runtime"],
            ["Repository", "Architectural", "แยก logic ออกจากวิธีเก็บข้อมูล"],
            ["MVC", "Architectural", "แยก ข้อมูล / หน้าจอ / ตัวควบคุม"],
          ],
        },
        {
          type: "code",
          title: "Singleton",
          lang: "ts",
          code: `class Config {
  private static instance: Config | null = null;
  private constructor(public readonly apiUrl: string) {}

  static getInstance(): Config {
    if (!Config.instance) {
      Config.instance = new Config("https://api.example.com");
    }
    return Config.instance;
  }
}

Config.getInstance() === Config.getInstance(); // true

// ใน JS/TS จริงๆ: ES module ก็เป็น singleton อยู่แล้ว
// export const config = { apiUrl: "..." };`,
        },
        {
          type: "code",
          title: "Factory",
          lang: "ts",
          code: `interface Notification { send(msg: string): void; }

class EmailNoti implements Notification { send(msg: string) { console.log("📧 " + msg); } }
class SmsNoti implements Notification { send(msg: string) { console.log("📱 " + msg); } }
class PushNoti implements Notification { send(msg: string) { console.log("🔔 " + msg); } }

function createNotification(type: "email" | "sms" | "push"): Notification {
  switch (type) {
    case "email": return new EmailNoti();
    case "sms": return new SmsNoti();
    case "push": return new PushNoti();
  }
}

createNotification("sms").send("รหัส OTP คือ 1234");`,
        },
        {
          type: "code",
          title: "Observer",
          lang: "ts",
          code: `type Listener = (data: unknown) => void;

class EventBus {
  private listeners: Record<string, Listener[]> = {};
  on(event: string, fn: Listener) {
    (this.listeners[event] ??= []).push(fn);
  }
  off(event: string, fn: Listener) {
    this.listeners[event] = (this.listeners[event] ?? []).filter((f) => f !== fn);
  }
  emit(event: string, data?: unknown) {
    (this.listeners[event] ?? []).forEach((fn) => fn(data));
  }
}

const shop = new EventBus();
shop.on("order:paid", (o) => console.log("📧 ส่งใบเสร็จ", o));
shop.on("order:paid", (o) => console.log("📦 แจ้งคลังสินค้า", o));
shop.emit("order:paid", { id: 101 });`,
        },
        {
          type: "code",
          title: "Strategy",
          lang: "ts",
          code: `type ShippingStrategy = (weightKg: number) => number;

const strategies: Record<string, ShippingStrategy> = {
  standard: (w) => 40 + w * 10,
  express: (w) => 80 + w * 20,
  pickup: () => 0,
};

function shippingFee(method: string, weightKg: number): number {
  const strategy = strategies[method];
  if (!strategy) throw new Error("ไม่รู้จักวิธีส่ง: " + method);
  return strategy(weightKg);
}

shippingFee("express", 2); // 120`,
        },
        {
          type: "code",
          title: "Repository",
          lang: "ts",
          code: `interface User { id: number; name: string; }

interface UserRepository {
  findById(id: number): Promise<User | null>;
  save(user: User): Promise<void>;
}

// ใช้ตอน test 🧪
class InMemoryUserRepo implements UserRepository {
  private users = new Map<number, User>();
  async findById(id: number) { return this.users.get(id) ?? null; }
  async save(user: User) { this.users.set(user.id, user); }
}

// ใช้ตอน production 🐘
class PgUserRepo implements UserRepository {
  constructor(private db: { query(sql: string, p: unknown[]): Promise<{ rows: User[] }> }) {}
  async findById(id: number) {
    const { rows } = await this.db.query("SELECT * FROM users WHERE id = $1", [id]);
    return rows[0] ?? null;
  }
  async save(u: User) {
    await this.db.query("INSERT INTO users (id, name) VALUES ($1, $2)", [u.id, u.name]);
  }
}`,
        },
        {
          type: "text",
          title: "MVC 🎬",
          body: "**Model** = ข้อมูล + business logic\n**View** = สิ่งที่ผู้ใช้เห็น (HTML, template, component)\n**Controller** = รับ request → เรียก Model → ส่งข้อมูลให้ View",
        },
        {
          type: "code",
          title: "MVC แบบ Express",
          lang: "js",
          code: `// Model
const UserModel = {
  findAll: async () => [{ id: 1, name: "Mint" }],
};

// Controller
async function listUsers(req, res) {
  const users = await UserModel.findAll();
  res.render("users", { users });   // View = template "users"
}

// Route
app.get("/users", listUsers);`,
        },
        {
          type: "tip",
          body: "อย่าใส่ pattern เพราะอยากใช้ 😅 ใส่เมื่อมันแก้ปัญหาจริง ไม่งั้นโค้ดจะซับซ้อนเกินจำเป็น (over-engineering)",
        },
      ],
    },
    // ------------------------------------------------------------
    {
      id: "clean-code",
      title: "Clean Code Tips",
      emoji: "🧼",
      summary: "เขียนโค้ดให้คนอ่านรู้เรื่อง รวมถึงตัวเราในอีก 6 เดือน",
      tags: ["clean code", "naming", "refactor", "dry", "kiss", "yagni", "best practice"],
      sections: [
        {
          type: "list",
          items: [
            "**ตั้งชื่อให้สื่อ**: `d` → `daysSinceSignup`, `getData()` → `fetchUserOrders()`",
            "**ฟังก์ชันสั้น ทำเรื่องเดียว** ชื่อบอกได้ว่าทำอะไร",
            "**Early return / guard clause** ลด if ซ้อนลึก",
            "**ไม่มี magic number**: `0.07` → `VAT_RATE`",
            "**Comment บอก “ทำไม”** ไม่ใช่ “ทำอะไร” (โค้ดบอกเองแล้ว)",
            "**Parameter น้อยๆ** ถ้าเกิน 3 ให้ส่งเป็น object",
            "**ลบโค้ดที่ไม่ใช้** อย่า comment ทิ้งไว้ git จำให้แล้ว",
          ],
        },
        {
          type: "code",
          title: "ก่อน vs หลัง",
          lang: "js",
          code: `// ❌ อ่านแล้วงง
function calc(u) {
  if (u) {
    if (u.age > 17) {
      if (u.s === 1) { return u.p * 0.9; } else { return u.p; }
    } else { return 0; }
  } else { return 0; }
}

// ✅ อ่านแล้วเข้าใจทันที
const ADULT_AGE = 18;
const STATUS_MEMBER = 1;
const MEMBER_DISCOUNT = 0.9;

function calculatePrice(user) {
  if (!user || user.age < ADULT_AGE) return 0;   // guard clause
  const isMember = user.status === STATUS_MEMBER;
  return isMember ? user.price * MEMBER_DISCOUNT : user.price;
}`,
        },
        {
          type: "table",
          title: "หลักการสั้นๆ ที่ได้ยินบ่อย",
          headers: ["หลัก", "ความหมาย"],
          rows: [
            ["DRY", "Don't Repeat Yourself อย่าก๊อปโค้ด logic เดียวกันหลายที่"],
            ["KISS", "Keep It Simple, Stupid ง่ายไว้ก่อน"],
            ["YAGNI", "You Aren't Gonna Need It อย่าเขียนเผื่ออนาคตที่ยังไม่มา"],
            ["Boy Scout Rule", "ออกจากโค้ดให้สะอาดกว่าตอนเข้ามานิดนึง"],
            ["Fail fast", "เจอ input ผิดให้ error ทันที อย่าปล่อยไหลไปพังทีหลัง"],
          ],
        },
        {
          type: "warn",
          body: "DRY มากเกินก็ไม่ดีนะ 🙈 โค้ด 2 ที่ที่ “หน้าตาเหมือน” แต่ “เหตุผลต่างกัน” ถ้ารวมเป็นอันเดียว วันหนึ่งต้องแยกจะเจ็บ (“duplication is cheaper than the wrong abstraction”)",
        },
        {
          type: "tip",
          body: "ให้ linter + formatter (ESLint, Prettier, Ruff, Black) จัดการเรื่องสไตล์ให้อัตโนมัติ จะได้เอาเวลา review ไปคุยเรื่อง logic แทน ✨",
        },
      ],
    },
    // ------------------------------------------------------------
    {
      id: "testing",
      title: "Testing: Unit / Integration / E2E",
      emoji: "🧪",
      summary: "เขียน test ให้มั่นใจว่าแก้โค้ดแล้วไม่พัง + ตัวอย่าง Jest",
      tags: ["testing", "unit test", "integration test", "e2e", "jest", "mock", "tdd", "playwright"],
      sections: [
        {
          type: "table",
          headers: ["ประเภท", "ทดสอบอะไร", "ความเร็ว", "Tools"],
          rows: [
            ["Unit", "ฟังก์ชัน/class เดียว แยกขาดจากโลกภายนอก", "⚡ เร็วมาก", "Jest, Vitest, pytest"],
            ["Integration", "หลายส่วนทำงานร่วมกัน เช่น API + DB", "🚶 กลาง", "Supertest, Testcontainers"],
            ["E2E", "ทั้งระบบผ่าน UI เหมือนผู้ใช้จริง", "🐢 ช้า", "Playwright, Cypress"],
          ],
        },
        {
          type: "text",
          body: "**Testing Pyramid** 🔺 ฐานกว้าง = unit test เยอะๆ, ตรงกลาง = integration พอประมาณ, ยอด = E2E ไม่กี่อันสำหรับ flow สำคัญ (login, ชำระเงิน)",
        },
        {
          type: "code",
          title: "Jest: unit test",
          lang: "js",
          code: `// cart.js
export function cartTotal(items, discount = 0) {
  if (discount < 0 || discount > 1) throw new Error("invalid discount");
  const sum = items.reduce((acc, i) => acc + i.price * i.qty, 0);
  return Math.round(sum * (1 - discount) * 100) / 100;
}

// cart.test.js
import { cartTotal } from "./cart";

describe("cartTotal", () => {
  test("รวมราคาถูกต้อง", () => {
    const items = [{ price: 50, qty: 2 }, { price: 30, qty: 1 }];
    expect(cartTotal(items)).toBe(130);
  });
  test("ลด 10%", () => {
    expect(cartTotal([{ price: 100, qty: 1 }], 0.1)).toBe(90);
  });
  test("ตะกร้าว่าง = 0", () => {
    expect(cartTotal([])).toBe(0);
  });
  test("discount ผิดต้อง throw", () => {
    expect(() => cartTotal([], 2)).toThrow("invalid discount");
  });
});`,
          note: "Jest กับ ES module ต้องตั้ง Babel หรือ `--experimental-vm-modules` ส่วน Vitest ใช้ syntax เดียวกันได้เลย",
        },
        {
          type: "code",
          title: "Mock: ไม่ต้องส่งอีเมลจริงตอน test",
          lang: "js",
          code: `// order.js
export async function placeOrder(order, { sendEmail }) {
  // ...บันทึก order...
  await sendEmail(order.email, "ยอดชำระ " + order.total + " บาท");
}

// order.test.js
import { placeOrder } from "./order";

test("ส่งอีเมลหลังสั่งซื้อ", async () => {
  const sendEmail = jest.fn().mockResolvedValue(true);   // Arrange
  await placeOrder({ email: "mint@mail.com", total: 100 }, { sendEmail }); // Act
  expect(sendEmail).toHaveBeenCalledTimes(1);           // Assert
  expect(sendEmail).toHaveBeenCalledWith("mint@mail.com", expect.stringContaining("100"));
});`,
        },
        {
          type: "code",
          title: "Integration (Supertest) & E2E (Playwright)",
          lang: "js",
          code: `import request from "supertest";
import app from "./app";

test("GET /users ตอบ 200", async () => {
  const res = await request(app).get("/users");
  expect(res.status).toBe(200);
  expect(Array.isArray(res.body)).toBe(true);
});

// login.spec.js (Playwright)
import { test, expect } from "@playwright/test";

test("login สำเร็จ", async ({ page }) => {
  await page.goto("http://localhost:3000/login");
  await page.getByLabel("Email").fill("test@mail.com");
  await page.getByLabel("Password").fill("test-password");
  await page.getByRole("button", { name: "Login" }).click();
  await expect(page.getByText("ยินดีต้อนรับ")).toBeVisible();
});`,
        },
        {
          type: "tip",
          body: "เขียน test แบบ **AAA**: Arrange (เตรียม) → Act (ทำ) → Assert (ตรวจ) 🧁\n\n**TDD** = เขียน test ให้ fail ก่อน (🔴 Red) → เขียนโค้ดให้ผ่าน (🟢 Green) → ปรับให้สวย (🔵 Refactor)",
        },
        {
          type: "pairs",
          title: "Jest matchers ที่ใช้บ่อย",
          items: ["toBe", "toEqual", "toContain", "toBeTruthy", "toThrow", "toHaveBeenCalledWith", "toMatchObject", "resolves / rejects"],
        },
      ],
    },
    // ------------------------------------------------------------
    {
      id: "agile-scrum",
      title: "Agile & Scrum",
      emoji: "🏃",
      summary: "ทำงานเป็นรอบสั้นๆ ส่งของบ่อย ปรับตัวไว",
      tags: ["agile", "scrum", "sprint", "kanban", "user story", "standup", "retrospective"],
      sections: [
        {
          type: "list",
          title: "Agile Manifesto: ให้คุณค่ากับ...",
          items: [
            "**คนและการคุยกัน** มากกว่า process และเครื่องมือ",
            "**ซอฟต์แวร์ที่ใช้งานได้** มากกว่าเอกสารครบถ้วน",
            "**ร่วมมือกับลูกค้า** มากกว่าต่อรองสัญญา",
            "**ตอบรับการเปลี่ยนแปลง** มากกว่าทำตามแผนเป๊ะๆ",
          ],
        },
        {
          type: "table",
          title: "Scrum roles 👥",
          headers: ["บทบาท", "หน้าที่"],
          rows: [
            ["Product Owner", "ดูแล Product Backlog จัดลำดับว่าทำอะไรก่อนให้คุ้มค่าที่สุด"],
            ["Scrum Master", "โค้ชให้ทีมทำ Scrum ได้ดี ช่วยปลดสิ่งที่ขวางทาง"],
            ["Developers", "ทีมที่ลงมือสร้างงานให้เสร็จทุก Sprint"],
          ],
        },
        {
          type: "table",
          title: "Scrum events 📅 (สำหรับ Sprint 1 เดือน)",
          headers: ["Event", "เวลา", "ทำอะไร"],
          rows: [
            ["Sprint", "≤ 1 เดือน (นิยม 2 สัปดาห์)", "รอบการทำงาน"],
            ["Sprint Planning", "≤ 8 ชม.", "เลือกงานและวางแผน Sprint"],
            ["Daily Scrum", "15 นาที", "อัปเดตความคืบหน้า + อุปสรรค"],
            ["Sprint Review", "≤ 4 ชม.", "โชว์ผลงานให้ stakeholder ดู"],
            ["Retrospective", "≤ 3 ชม.", "คุยว่าทีมจะทำงานให้ดีขึ้นยังไง"],
          ],
        },
        {
          type: "list",
          title: "Artifacts 📋",
          items: [
            "**Product Backlog** = รายการทุกอย่างที่อยากทำ เรียงตามความสำคัญ",
            "**Sprint Backlog** = งานที่เลือกมาทำใน Sprint นี้",
            "**Increment** = ชิ้นงานที่เสร็จตาม **Definition of Done** พร้อมใช้งาน",
          ],
        },
        {
          type: "code",
          title: "User Story + Acceptance Criteria",
          lang: "text",
          code: `As a ลูกค้า
I want to กดหัวใจเก็บสินค้าไว้ในรายการโปรด
So that กลับมาซื้อทีหลังได้ง่าย

Acceptance Criteria:
- Given ล็อกอินแล้ว
  When กดหัวใจที่สินค้า
  Then สินค้าไปอยู่ในหน้า Favorites
- Given ยังไม่ล็อกอิน
  When กดหัวใจ
  Then พาไปหน้า Login`,
        },
        {
          type: "table",
          title: "Scrum vs Kanban",
          headers: ["", "Scrum", "Kanban"],
          rows: [
            ["จังหวะ", "เป็น Sprint ตายตัว", "ไหลต่อเนื่อง"],
            ["Roles", "มีชัดเจน 3 บทบาท", "ไม่บังคับ"],
            ["ควบคุมงาน", "จำนวนงานต่อ Sprint", "WIP limit ต่อคอลัมน์"],
            ["เหมาะกับ", "พัฒนา feature ใหม่", "งาน support / ops ที่เข้ามาเรื่อยๆ"],
          ],
        },
        {
          type: "tip",
          body: "**Story points** ประเมิน “ความยาก/ความเสี่ยง” ไม่ใช่ชั่วโมง นิยมใช้เลข Fibonacci (1, 2, 3, 5, 8, 13) เล่น Planning Poker กันสนุกดี 🃏",
        },
      ],
    },
    // ------------------------------------------------------------
    {
      id: "system-design",
      title: "System Design พื้นฐาน",
      emoji: "🏙️",
      summary: "Load balancer, cache, queue, scaling ออกแบบระบบให้รับคนเยอะได้",
      tags: ["system design", "scaling", "load balancer", "cache", "queue", "cdn", "replication", "sharding", "rate limit"],
      sections: [
        {
          type: "code",
          title: "ภาพรวมระบบเว็บทั่วไป",
          lang: "text",
          code: `User 📱
  │
  ├──> CDN (รูป, JS, CSS)
  │
  └──> Load Balancer
          ├──> App Server 1 ┐
          ├──> App Server 2 ├──> Redis Cache
          └──> App Server 3 ┘      │
                  │                └─(miss)─> Primary DB (write)
                  │                              │ replicate
                  └──> Message Queue             └─> Read Replicas
                          └──> Workers (อีเมล, รูป, รายงาน)`,
        },
        {
          type: "table",
          title: "Scaling 2 แบบ",
          headers: ["", "Vertical (scale up)", "Horizontal (scale out)"],
          rows: [
            ["ทำยังไง", "อัปเครื่องให้แรงขึ้น (CPU/RAM)", "เพิ่มจำนวนเครื่อง"],
            ["ข้อดี", "ง่าย ไม่ต้องแก้โค้ด", "ขยายได้แทบไม่จำกัด + ทนเครื่องพัง"],
            ["ข้อเสีย", "มีเพดาน + จุดตายจุดเดียว", "ซับซ้อน ต้องทำแอปให้ stateless"],
          ],
        },
        {
          type: "list",
          title: "ชิ้นส่วนสำคัญ 🧩",
          items: [
            "**Load Balancer**: กระจาย request ไปหลายเครื่อง (round robin, least connections, IP hash) + เช็ค health ตัดเครื่องที่พังออก",
            "**Stateless app**: ไม่เก็บ session ในเครื่อง ย้ายไปเก็บที่ Redis/DB หรือใช้ JWT จะเพิ่ม-ลดเครื่องได้สบาย",
            "**Cache**: เก็บของที่อ่านบ่อยไว้ใน RAM (Redis) หรือใกล้ผู้ใช้ (CDN) ลดภาระ DB",
            "**Message Queue** (RabbitMQ, Kafka, SQS): งานหนักโยนเข้าคิว ตอบผู้ใช้ทันที ให้ worker ทำเบื้องหลัง + retry ได้",
            "**DB scaling**: read replica สำหรับงานอ่าน, sharding แบ่งข้อมูลหลายเครื่อง, connection pool, index ให้ดี",
            "**Rate limiting**: กันคนยิง API ถี่เกิน",
          ],
        },
        {
          type: "code",
          title: "Rate limit แบบ fixed window ด้วย Redis",
          lang: "js",
          code: `async function isAllowed(ip, limit = 100) {
  const minute = Math.floor(Date.now() / 60000);
  const key = "rate:" + ip + ":" + minute;
  const count = await redis.incr(key);
  if (count === 1) await redis.expire(key, 60);
  return count <= limit;   // 100 req ต่อนาที
}`,
        },
        {
          type: "code",
          title: "Queue ด้วย BullMQ (Node.js + Redis)",
          lang: "js",
          code: `import { Queue, Worker } from "bullmq";

const connection = { host: "localhost", port: 6379 };
const emailQueue = new Queue("emails", { connection });

// API: ตอบผู้ใช้ทันที แล้วโยนงานหนักเข้าคิว
await emailQueue.add("welcome", { to: "mint@mail.com" }, { attempts: 3 });

// Worker (อีก process): ค่อยๆ ทำทีละงาน
new Worker("emails", async (job) => {
  await sendEmail(job.data.to, "ยินดีต้อนรับ 🎉");
}, { connection });`,
        },
        {
          type: "table",
          title: "Cache strategies",
          headers: ["แบบ", "ทำงานยังไง"],
          rows: [
            ["Cache-aside", "อ่าน cache ก่อน ไม่มีค่อยไป DB แล้วเก็บลง cache (นิยมสุด)"],
            ["Write-through", "เขียน cache + DB พร้อมกัน ข้อมูลตรงกันเสมอ"],
            ["Write-back", "เขียน cache ก่อน ค่อย sync ลง DB ทีหลัง (เร็วแต่เสี่ยงหาย)"],
            ["TTL", "ตั้งเวลาหมดอายุ กันข้อมูลเก่าค้าง"],
          ],
        },
        {
          type: "steps",
          title: "สูตรตอบโจทย์ System Design ตอนสัมภาษณ์",
          items: [
            "ถาม **requirements**: ฟีเจอร์หลัก, จำนวนผู้ใช้, อ่านเยอะหรือเขียนเยอะ",
            "**ประมาณตัวเลข**: request/วินาที, ขนาดข้อมูลต่อปี",
            "ออกแบบ **API** และ **data model**",
            "วาด **high-level diagram**",
            "**เจาะลึก** จุดคอขวด: cache, sharding, queue",
            "พูดถึง **trade-off** และจุดที่อาจพัง (single point of failure)",
          ],
        },
        {
          type: "tip",
          body: "“There are only two hard things in CS: **cache invalidation** and naming things” 😆 ใส่ cache เมื่อไหร่ต้องคิดเสมอว่าข้อมูลเปลี่ยนแล้ว cache จะอัปเดตยังไง",
        },
        {
          type: "pairs",
          title: "คำที่ควรรู้ต่อ",
          items: ["CAP theorem", "Consistent hashing", "CDN", "API Gateway", "Microservices", "Circuit breaker", "Idempotency", "Observability"],
        },
      ],
    },
  ],
}
