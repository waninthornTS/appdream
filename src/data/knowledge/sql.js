export default {
  id: "sql",
  title: "SQL & Database",
  emoji: "🗄️",
  color: "#7ec4cf",
  intro: "บ้านของข้อมูลทุกชิ้น 🏡 มาเรียนวิธีถาม-ตอบกับ database ให้คล่องเหมือนคุยกับเพื่อนบ้านกันเถอะ!",
  topics: [
    // ------------------------------------------------------------
    {
      id: "db-basics",
      title: "Database & RDBMS คืออะไร",
      emoji: "🏠",
      summary: "ที่เก็บข้อมูลแบบเป็นระเบียบ + ระบบที่ช่วยจัดการให้",
      tags: ["database", "rdbms", "basic", "table", "key", "schema"],
      sections: [
        {
          type: "text",
          body: "**Database** คือที่เก็บข้อมูลอย่างเป็นระเบียบ ค้นหา เพิ่ม แก้ ลบ ได้ง่ายและปลอดภัย 📦\n\n**RDBMS** (Relational Database Management System) คือโปรแกรมที่จัดการข้อมูลเป็น **ตาราง** ที่โยงความสัมพันธ์กันได้ เช่น PostgreSQL, MySQL, SQLite และเราคุยกับมันด้วยภาษา **SQL**",
        },
        {
          type: "list",
          title: "คำศัพท์ที่ต้องรู้",
          items: [
            "**Table** = ตาราง 1 เรื่อง เช่น `users`, `orders`",
            "**Row / Record** = ข้อมูล 1 แถว (เช่น user 1 คน)",
            "**Column / Field** = คุณสมบัติ เช่น `name`, `email`",
            "**Primary Key (PK)** = ตัวระบุแถวที่ไม่ซ้ำและไม่เป็น NULL เช่น `id`",
            "**Foreign Key (FK)** = คอลัมน์ที่ชี้ไปหา PK ของอีกตาราง เช่น `orders.user_id → users.id`",
            "**Schema** = พิมพ์เขียวว่ามีตารางอะไร คอลัมน์อะไร type อะไร",
          ],
        },
        {
          type: "table",
          title: "ตัวอย่าง schema ที่ใช้ทั้งหมวดนี้ 🛒",
          headers: ["ตาราง", "คอลัมน์", "หมายเหตุ"],
          rows: [
            ["users", "id, name, email, city, age, referred_by, created_at", "`referred_by` → users.id (เพื่อนที่ชวนมา)"],
            ["products", "id, name, category, price, stock", "สินค้าในร้าน"],
            ["orders", "id, user_id, total, status, created_at", "`user_id` → users.id (NULL = guest)"],
            ["order_items", "order_id, product_id, qty, price", "PK คู่ (order_id, product_id)"],
          ],
        },
        {
          type: "steps",
          title: "เบื้องหลังตอนเรายิง query 🔧",
          items: [
            "**Parser** ตรวจ syntax และแปลง SQL เป็นโครงสร้างที่เครื่องเข้าใจ",
            "**Optimizer / Planner** คิดหลายแผนแล้วเลือกแผนที่ถูกสุด (ใช้ index ไหม? join แบบไหน?)",
            "**Executor** ทำตามแผน อ่านข้อมูลจาก storage (page บน disk + buffer cache ใน RAM)",
            "**Transaction manager + WAL (log)** ดูแลให้ข้อมูลถูกต้องแม้ไฟดับ",
            "ส่งผลลัพธ์กลับมาเป็นตาราง ✨",
          ],
        },
        {
          type: "code",
          title: "หน้าตา SQL แรกของเรา",
          lang: "sql",
          code: `SELECT name, city
FROM users
WHERE id = 1;

-- ผลลัพธ์
-- name | city
-- Mint | Bangkok`,
        },
        {
          type: "tip",
          body: "SQL เป็นภาษาแบบ **declarative** = บอกว่า “อยากได้อะไร” ไม่ต้องบอก “ทำยังไง” เดี๋ยว optimizer คิดให้เอง 🧚",
        },
      ],
    },
    // ------------------------------------------------------------
    {
      id: "select",
      title: "SELECT / WHERE / ORDER BY / LIMIT",
      emoji: "🔍",
      summary: "ท่าพื้นฐานที่สุด: เลือก กรอง เรียง จำกัดจำนวน",
      tags: ["select", "where", "order by", "limit", "offset", "distinct", "pagination", "basic"],
      sections: [
        {
          type: "code",
          lang: "sql",
          code: `-- ทุกคอลัมน์ (ใช้ตอนสำรวจเท่านั้นนะ)
SELECT * FROM users;

-- บางคอลัมน์ + ตั้งชื่อเล่น (alias)
SELECT name AS user_name, city FROM users;

-- กรอง + เรียง + จำกัดจำนวน
SELECT name, age
FROM users
WHERE city = 'Bangkok' AND age >= 18
ORDER BY age DESC, name ASC
LIMIT 10 OFFSET 20;   -- หน้า 3 (หน้าละ 10)

-- ไม่เอาค่าซ้ำ
SELECT DISTINCT city FROM users;

-- คำนวณในคอลัมน์ได้ด้วย
SELECT name, price, price * 1.07 AS price_with_vat
FROM products;`,
        },
        {
          type: "table",
          title: "LIMIT แต่ละค่าย",
          headers: ["DB", "Syntax"],
          rows: [
            ["PostgreSQL / MySQL / SQLite", "`LIMIT 10 OFFSET 20`"],
            ["SQL Server", "`SELECT TOP 10 ...` หรือ `OFFSET 20 ROWS FETCH NEXT 10 ROWS ONLY` (ต้องมี ORDER BY)"],
            ["Oracle 12c+", "`FETCH FIRST 10 ROWS ONLY`"],
          ],
        },
        {
          type: "tip",
          body: "string ใช้ **single quote** `'Bangkok'` เสมอ ส่วน double quote ใน PostgreSQL คือชื่อตาราง/คอลัมน์ เช่น `\"Users\"`",
        },
        {
          type: "warn",
          body: "`OFFSET` เยอะๆ จะช้า เพราะ DB ต้องนับข้ามทีละแถว 🐢 หน้าลึกๆ ใช้ **keyset pagination** แทน: `WHERE id > 1000 ORDER BY id LIMIT 10`\n\nและถ้าไม่ใส่ `ORDER BY` ลำดับผลลัพธ์ **ไม่การันตี** นะ",
        },
      ],
    },
    // ------------------------------------------------------------
    {
      id: "operators",
      title: "Operators: LIKE, IN, BETWEEN, IS NULL",
      emoji: "🧮",
      summary: "เครื่องมือกรองข้อมูลใน WHERE ให้เป๊ะขึ้น",
      tags: ["like", "in", "between", "null", "coalesce", "where", "operator"],
      sections: [
        {
          type: "table",
          headers: ["Operator", "ความหมาย", "ตัวอย่าง"],
          rows: [
            ["`=`, `<>` / `!=`", "เท่ากับ / ไม่เท่ากับ", "`status <> 'paid'`"],
            ["`>`, `>=`, `<`, `<=`", "มากกว่า / น้อยกว่า", "`age >= 18`"],
            ["`AND`, `OR`, `NOT`", "เชื่อมเงื่อนไข", "`NOT (city = 'Bangkok')`"],
            ["`LIKE`", "จับ pattern: `%` = กี่ตัวก็ได้, `_` = 1 ตัว", "`name LIKE 'Mi%'`"],
            ["`ILIKE`", "LIKE แบบไม่สนตัวพิมพ์ (PostgreSQL)", "`email ILIKE '%@GMAIL.COM'`"],
            ["`IN (...)`", "อยู่ในรายการ", "`city IN ('Bangkok', 'Phuket')`"],
            ["`BETWEEN a AND b`", "อยู่ในช่วง (รวมหัวท้าย)", "`price BETWEEN 100 AND 500`"],
            ["`IS NULL` / `IS NOT NULL`", "เช็คค่าว่าง", "`city IS NULL`"],
          ],
        },
        {
          type: "code",
          lang: "sql",
          code: `SELECT * FROM users WHERE name LIKE 'Mi%';        -- ขึ้นต้น Mi
SELECT * FROM users WHERE email LIKE '%@gmail.com'; -- ลงท้าย
SELECT * FROM users WHERE name LIKE '_im';          -- 3 ตัว ลงท้าย im

SELECT * FROM users
WHERE city IN ('Bangkok', 'Chiang Mai');

SELECT * FROM products
WHERE price BETWEEN 100 AND 500;   -- รวม 100 และ 500

SELECT * FROM users WHERE referred_by IS NULL;

-- แทนค่า NULL ด้วยค่า default
SELECT name, COALESCE(city, 'ไม่ระบุ') AS city FROM users;

-- ใส่วงเล็บให้ชัด! (AND ทำก่อน OR)
SELECT * FROM products
WHERE (category = 'drink' OR category = 'bakery')
  AND price < 100;`,
        },
        {
          type: "warn",
          body: "NULL คือ “ไม่รู้ค่า” ไม่ใช่ 0 หรือ ''\n\n`WHERE city = NULL` จะไม่ได้อะไรเลย ต้องใช้ `IS NULL` เท่านั้น!\n\nและ `NOT IN (subquery)` ถ้า subquery มี NULL ปนอยู่ ผลลัพธ์จะว่างเปล่า 😱 ใช้ `NOT EXISTS` ปลอดภัยกว่า",
        },
        {
          type: "tip",
          body: "`LIKE '%abc'` (มี % นำหน้า) ใช้ index ปกติไม่ได้ ถ้าต้องค้นหาข้อความเยอะๆ ลองดู **Full-text search** นะ",
        },
      ],
    },
    // ------------------------------------------------------------
    {
      id: "joins",
      title: "JOIN ทุกแบบ",
      emoji: "🤝",
      summary: "รวมข้อมูลจากหลายตาราง: INNER, LEFT, RIGHT, FULL, CROSS, SELF",
      tags: ["join", "inner join", "left join", "right join", "full join", "cross join", "self join"],
      sections: [
        {
          type: "text",
          title: "ข้อมูลตัวอย่าง",
          body: "**users**: 1 Mint, 2 Ploy, 3 Ton (Ton ยังไม่เคยสั่งของ)\n\n**orders**: 101 (user 1), 102 (user 1), 103 (user 2), 104 (user_id = NULL คือ guest)",
        },
        {
          type: "table",
          headers: ["JOIN", "ได้อะไร"],
          rows: [
            ["**INNER**", "เฉพาะแถวที่ match กันทั้ง 2 ฝั่ง"],
            ["**LEFT**", "ทุกแถวฝั่งซ้าย + ฝั่งขวาที่ match (ไม่ match = NULL)"],
            ["**RIGHT**", "ทุกแถวฝั่งขวา + ฝั่งซ้ายที่ match"],
            ["**FULL OUTER**", "ทุกแถวทั้ง 2 ฝั่ง ไม่ match ก็เติม NULL"],
            ["**CROSS**", "จับคู่ทุกแบบ (n × m แถว)"],
            ["**SELF**", "join ตารางกับตัวเอง"],
          ],
        },
        {
          type: "code",
          title: "INNER & LEFT JOIN",
          lang: "sql",
          code: `SELECT u.name, o.id AS order_id
FROM users u
INNER JOIN orders o ON o.user_id = u.id;
-- Mint 101 | Mint 102 | Ploy 103
-- (Ton ไม่มา, order 104 ไม่มา)

SELECT u.name, o.id AS order_id
FROM users u
LEFT JOIN orders o ON o.user_id = u.id;
-- Mint 101 | Mint 102 | Ploy 103 | Ton NULL

-- หา user ที่ไม่เคยสั่งเลย 👀
SELECT u.name
FROM users u
LEFT JOIN orders o ON o.user_id = u.id
WHERE o.id IS NULL;   -- Ton`,
        },
        {
          type: "code",
          title: "RIGHT & FULL OUTER JOIN",
          lang: "sql",
          code: `SELECT u.name, o.id AS order_id
FROM users u
RIGHT JOIN orders o ON o.user_id = u.id;
-- Mint 101 | Mint 102 | Ploy 103 | NULL 104

SELECT u.name, o.id AS order_id
FROM users u
FULL OUTER JOIN orders o ON o.user_id = u.id;
-- Mint 101 | Mint 102 | Ploy 103
-- Ton NULL | NULL 104`,
        },
        {
          type: "code",
          title: "CROSS & SELF JOIN",
          lang: "sql",
          code: `-- ทุกคู่ user × product (เช่น ทำตารางแนะนำสินค้า)
SELECT u.name, p.name AS product
FROM users u
CROSS JOIN products p;

-- SELF JOIN: ใครถูกใครชวนมา
SELECT u.name AS member, r.name AS invited_by
FROM users u
LEFT JOIN users r ON r.id = u.referred_by;`,
        },
        {
          type: "code",
          title: "JOIN หลายตาราง: ใครซื้ออะไรไปบ้าง",
          lang: "sql",
          code: `SELECT u.name, p.name AS product, oi.qty
FROM users u
JOIN orders o       ON o.user_id = u.id
JOIN order_items oi ON oi.order_id = o.id
JOIN products p     ON p.id = oi.product_id
WHERE o.status = 'paid';`,
          note: "`JOIN` เฉยๆ = `INNER JOIN`",
        },
        {
          type: "warn",
          body: "LEFT JOIN แล้วไปกรองคอลัมน์ฝั่งขวาใน `WHERE` (เช่น `WHERE o.status = 'paid'`) จะกลายเป็น INNER JOIN ทันที! ถ้าอยากเก็บแถวซ้ายไว้ ให้ย้ายเงื่อนไขไปไว้ใน `ON`\n\nMySQL ไม่มี `FULL OUTER JOIN` → ใช้ `LEFT JOIN ... UNION ... RIGHT JOIN` แทน",
        },
      ],
    },
    // ------------------------------------------------------------
    {
      id: "group-by",
      title: "GROUP BY / HAVING / Aggregate",
      emoji: "📊",
      summary: "สรุปข้อมูลเป็นกลุ่ม: นับ รวม เฉลี่ย หา max/min",
      tags: ["group by", "having", "count", "sum", "avg", "min", "max", "aggregate"],
      sections: [
        {
          type: "table",
          title: "Aggregate functions",
          headers: ["ฟังก์ชัน", "ทำอะไร"],
          rows: [
            ["`COUNT(*)`", "นับทุกแถว"],
            ["`COUNT(col)`", "นับเฉพาะที่ไม่ใช่ NULL"],
            ["`COUNT(DISTINCT col)`", "นับค่าที่ไม่ซ้ำ"],
            ["`SUM(col)` / `AVG(col)`", "ผลรวม / ค่าเฉลี่ย (ข้าม NULL)"],
            ["`MIN(col)` / `MAX(col)`", "ค่าน้อยสุด / มากสุด"],
          ],
        },
        {
          type: "code",
          lang: "sql",
          code: `-- จำนวน user และอายุเฉลี่ยต่อเมือง
SELECT city, COUNT(*) AS total_users, AVG(age) AS avg_age
FROM users
GROUP BY city
ORDER BY total_users DESC;

-- ยอดซื้อต่อ user เฉพาะคนที่จ่ายเกิน 5,000
SELECT user_id,
       COUNT(*)   AS order_count,
       SUM(total) AS spent
FROM orders
WHERE status = 'paid'      -- กรอง "แถว" ก่อน group
GROUP BY user_id
HAVING SUM(total) > 5000   -- กรอง "กลุ่ม" หลัง group
ORDER BY spent DESC;

-- นับแบบมีเงื่อนไข (ใช้ได้ทุก DB)
SELECT user_id,
       SUM(CASE WHEN status = 'paid' THEN 1 ELSE 0 END) AS paid_orders,
       SUM(CASE WHEN status = 'cancelled' THEN 1 ELSE 0 END) AS cancelled
FROM orders
GROUP BY user_id;`,
        },
        {
          type: "table",
          title: "WHERE vs HAVING",
          headers: ["", "WHERE", "HAVING"],
          rows: [
            ["กรองอะไร", "แถวดิบ", "กลุ่มหลัง GROUP BY"],
            ["ใช้ aggregate ได้ไหม", "❌", "✅ เช่น `HAVING COUNT(*) > 1`"],
            ["ทำงานตอนไหน", "ก่อน GROUP BY", "หลัง GROUP BY"],
          ],
        },
        {
          type: "warn",
          body: "คอลัมน์ใน `SELECT` ที่ไม่ได้อยู่ใน aggregate ต้องอยู่ใน `GROUP BY` ด้วยนะ ไม่งั้น PostgreSQL error (MySQL 5.7+ ก็ error เพราะเปิด `ONLY_FULL_GROUP_BY`)",
        },
        {
          type: "tip",
          body: "PostgreSQL มีท่าน่ารัก `COUNT(*) FILTER (WHERE status = 'paid')` สั้นกว่า CASE WHEN เยอะเลย 🌸",
        },
      ],
    },
    // ------------------------------------------------------------
    {
      id: "subquery-cte",
      title: "Subquery & CTE (WITH)",
      emoji: "🪆",
      summary: "query ซ้อน query และการตั้งชื่อ query ให้อ่านง่าย",
      tags: ["subquery", "cte", "with", "exists", "recursive", "derived table"],
      sections: [
        {
          type: "code",
          title: "Subquery หลายแบบ",
          lang: "sql",
          code: `-- 1) คืนค่าเดียว (scalar): สินค้าที่แพงกว่าค่าเฉลี่ย
SELECT name, price FROM products
WHERE price > (SELECT AVG(price) FROM products);

-- 2) IN: user ที่เคยสั่งเกิน 1,000
SELECT name FROM users
WHERE id IN (SELECT user_id FROM orders WHERE total > 1000);

-- 3) EXISTS (correlated): อ้างถึง u จากข้างนอก
SELECT u.name FROM users u
WHERE EXISTS (
  SELECT 1 FROM orders o WHERE o.user_id = u.id
);

-- 4) Derived table ใน FROM (ต้องมี alias)
SELECT AVG(order_count) AS avg_orders_per_user
FROM (
  SELECT user_id, COUNT(*) AS order_count
  FROM orders GROUP BY user_id
) t;`,
        },
        {
          type: "code",
          title: "CTE: ตั้งชื่อให้ query ย่อย อ่านจากบนลงล่าง",
          lang: "sql",
          code: `WITH user_spend AS (
  SELECT user_id, SUM(total) AS spent
  FROM orders
  WHERE status = 'paid'
  GROUP BY user_id
),
vip AS (
  SELECT user_id, spent FROM user_spend WHERE spent > 10000
)
SELECT u.name, v.spent
FROM vip v
JOIN users u ON u.id = v.user_id
ORDER BY v.spent DESC;`,
        },
        {
          type: "code",
          title: "Recursive CTE: ไล่สายการชวนเพื่อน",
          lang: "sql",
          code: `WITH RECURSIVE chain AS (
  SELECT id, name, referred_by, 1 AS level
  FROM users
  WHERE id = 1                          -- จุดเริ่ม
  UNION ALL
  SELECT u.id, u.name, u.referred_by, c.level + 1
  FROM users u
  JOIN chain c ON u.referred_by = c.id  -- ขยายต่อ
)
SELECT * FROM chain;`,
          note: "SQL Server เขียนแค่ `WITH` ไม่ต้องมีคำว่า `RECURSIVE`",
        },
        {
          type: "tip",
          body: "CTE ไม่ได้เร็วกว่า subquery เสมอไป แต่ **อ่านง่ายกว่ามาก** เหมาะกับ query ยาวๆ ที่มีหลายขั้นตอน 📖\n\n`EXISTS` จะหยุดทันทีที่เจอแถวแรก เลยมักเร็วกว่า `IN` กับ subquery ใหญ่ๆ",
        },
      ],
    },
    // ------------------------------------------------------------
    {
      id: "window-functions",
      title: "Window Functions",
      emoji: "🪟",
      summary: "คำนวณข้ามแถวโดยไม่ยุบแถว: ROW_NUMBER, RANK, LAG, SUM OVER",
      tags: ["window", "over", "partition by", "row_number", "rank", "dense_rank", "lag", "lead", "running total"],
      sections: [
        {
          type: "text",
          body: "เหมือน aggregate แต่ **ไม่ยุบแถว** ทุกแถวยังอยู่ครบ แค่ได้คอลัมน์ใหม่เพิ่ม ✨\n\nรูปแบบ: `ฟังก์ชัน() OVER (PARTITION BY ... ORDER BY ...)`\n\n`PARTITION BY` = แบ่งกลุ่ม, `ORDER BY` = เรียงในกลุ่ม",
        },
        {
          type: "code",
          title: "จัดอันดับสินค้าในแต่ละหมวด",
          lang: "sql",
          code: `SELECT name, category, price,
  ROW_NUMBER() OVER (PARTITION BY category ORDER BY price DESC) AS rn,
  RANK()       OVER (PARTITION BY category ORDER BY price DESC) AS rnk,
  DENSE_RANK() OVER (PARTITION BY category ORDER BY price DESC) AS drnk
FROM products;`,
        },
        {
          type: "table",
          title: "ต่างกันยังไงเมื่อราคาเท่ากัน",
          headers: ["price", "ROW_NUMBER", "RANK", "DENSE_RANK"],
          rows: [
            ["300", "1", "1", "1"],
            ["300", "2", "1", "1"],
            ["200", "3", "3 (ข้าม 2)", "2 (ไม่ข้าม)"],
          ],
        },
        {
          type: "code",
          title: "LAG / LEAD: ดูแถวก่อนหน้า / ถัดไป",
          lang: "sql",
          code: `SELECT id, created_at, total,
  LAG(total)  OVER (ORDER BY created_at) AS prev_total,
  LEAD(total) OVER (ORDER BY created_at) AS next_total,
  total - LAG(total) OVER (ORDER BY created_at) AS diff
FROM orders
WHERE user_id = 1;`,
        },
        {
          type: "code",
          title: "SUM OVER: ยอดสะสม & สัดส่วน",
          lang: "sql",
          code: `SELECT id, user_id, total,
  SUM(total) OVER (PARTITION BY user_id ORDER BY created_at) AS running_total,
  SUM(total) OVER (PARTITION BY user_id) AS user_total,
  ROUND(100.0 * total / SUM(total) OVER (), 2) AS pct_of_all,
  AVG(total) OVER (
    ORDER BY created_at ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
  ) AS moving_avg_7
FROM orders;`,
          note: "`OVER ()` ว่างๆ = ทั้งตารางเป็นกลุ่มเดียว",
        },
        {
          type: "warn",
          body: "ใช้ window function ใน `WHERE` ไม่ได้ (เพราะมันคำนวณตอน SELECT) ต้องห่อด้วย CTE/subquery ก่อน แล้วค่อยกรอง เช่น `WHERE rn = 1`",
        },
        {
          type: "pairs",
          title: "ฟังก์ชันที่ใช้บ่อย",
          items: ["ROW_NUMBER", "RANK", "DENSE_RANK", "NTILE", "LAG", "LEAD", "FIRST_VALUE", "SUM OVER", "AVG OVER"],
        },
      ],
    },
    // ------------------------------------------------------------
    {
      id: "dml",
      title: "INSERT / UPDATE / DELETE / UPSERT",
      emoji: "✏️",
      summary: "เพิ่ม แก้ ลบ และ “มีแล้วแก้ ไม่มีเพิ่ม”",
      tags: ["insert", "update", "delete", "upsert", "on conflict", "merge", "returning", "dml"],
      sections: [
        {
          type: "code",
          title: "INSERT",
          lang: "sql",
          code: `INSERT INTO users (name, email, city, age)
VALUES ('Mint', 'mint@mail.com', 'Bangkok', 25);

-- หลายแถวในทีเดียว
INSERT INTO products (name, category, price, stock) VALUES
  ('Latte', 'drink', 65, 100),
  ('Croissant', 'bakery', 55, 40);

-- ขอ id ที่เพิ่งสร้างกลับมา (PostgreSQL, SQLite 3.35+)
INSERT INTO orders (user_id, total, status)
VALUES (1, 120, 'pending')
RETURNING id;

-- INSERT จากผลของ SELECT
INSERT INTO vip_users (user_id)
SELECT user_id FROM orders
GROUP BY user_id HAVING SUM(total) > 10000;`,
        },
        {
          type: "code",
          title: "UPDATE & DELETE",
          lang: "sql",
          code: `UPDATE products
SET price = price * 0.9, stock = stock - 1
WHERE id = 3;

UPDATE orders
SET status = 'cancelled'
WHERE status = 'pending'
  AND created_at < '2026-01-01';

DELETE FROM orders WHERE status = 'cancelled';`,
        },
        {
          type: "code",
          title: "UPSERT: มีแล้วอัปเดต ไม่มีก็เพิ่ม",
          lang: "sql",
          code: `-- PostgreSQL / SQLite (email ต้องมี UNIQUE)
INSERT INTO users (email, name)
VALUES ('mint@mail.com', 'Mint')
ON CONFLICT (email)
DO UPDATE SET name = EXCLUDED.name;

-- ถ้าซ้ำก็ข้ามไปเฉยๆ
INSERT INTO users (email, name)
VALUES ('mint@mail.com', 'Mint')
ON CONFLICT (email) DO NOTHING;

-- MySQL 8.0.19+
INSERT INTO users (email, name)
VALUES ('mint@mail.com', 'Mint') AS new
ON DUPLICATE KEY UPDATE name = new.name;`,
          note: "SQL Server / Oracle ใช้คำสั่ง `MERGE`",
        },
        {
          type: "warn",
          body: "`UPDATE` / `DELETE` ที่ลืมใส่ `WHERE` = โดนทั้งตาราง 💥 ทุกครั้งให้ลอง `SELECT` ด้วย WHERE เดียวกันก่อน และทำใน transaction จะได้ `ROLLBACK` ได้",
        },
        {
          type: "tip",
          body: "หลายระบบนิยม **soft delete** คือเพิ่มคอลัมน์ `deleted_at` แทนการลบจริง กู้คืนได้ และเก็บประวัติไว้ 🗂️",
        },
      ],
    },
    // ------------------------------------------------------------
    {
      id: "ddl",
      title: "DDL: CREATE / ALTER / DROP",
      emoji: "🏗️",
      summary: "สร้างโครงสร้างตาราง data types และ constraints",
      tags: ["ddl", "create table", "alter", "drop", "truncate", "data type", "constraint", "primary key", "foreign key", "unique", "check"],
      sections: [
        {
          type: "code",
          title: "CREATE TABLE (PostgreSQL)",
          lang: "sql",
          code: `CREATE TABLE users (
  id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name        VARCHAR(100) NOT NULL,
  email       VARCHAR(255) NOT NULL UNIQUE,
  city        VARCHAR(100),
  age         INT CHECK (age >= 0),
  referred_by BIGINT REFERENCES users(id),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE orders (
  id         BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id    BIGINT REFERENCES users(id) ON DELETE SET NULL,
  total      NUMERIC(10, 2) NOT NULL CHECK (total >= 0),
  status     VARCHAR(20) NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);`,
          note: "MySQL ใช้ `BIGINT AUTO_INCREMENT PRIMARY KEY` และ `DATETIME` แทน",
        },
        {
          type: "code",
          title: "Composite PK + FK แบบ CASCADE",
          lang: "sql",
          code: `CREATE TABLE order_items (
  order_id   BIGINT REFERENCES orders(id) ON DELETE CASCADE,
  product_id BIGINT REFERENCES products(id),
  qty        INT NOT NULL CHECK (qty > 0),
  price      NUMERIC(10, 2) NOT NULL,
  PRIMARY KEY (order_id, product_id)
);`,
        },
        {
          type: "code",
          title: "ALTER & DROP",
          lang: "sql",
          code: `ALTER TABLE users ADD COLUMN phone VARCHAR(20);
ALTER TABLE users DROP COLUMN phone;
ALTER TABLE users RENAME COLUMN city TO province;
ALTER TABLE products
  ADD CONSTRAINT price_positive CHECK (price > 0);

TRUNCATE TABLE temp_logs;      -- ล้างข้อมูล เก็บโครงสร้าง
DROP TABLE IF EXISTS temp_logs; -- ลบทั้งตาราง`,
        },
        {
          type: "table",
          title: "Data types ที่ใช้บ่อย",
          headers: ["Type", "ใช้กับ"],
          rows: [
            ["`INT` / `BIGINT`", "จำนวนเต็ม, id"],
            ["`NUMERIC(10,2)` / `DECIMAL`", "เงิน 💰 (ทศนิยมแม่นยำ)"],
            ["`VARCHAR(n)` / `TEXT`", "ข้อความ"],
            ["`BOOLEAN`", "true / false"],
            ["`DATE` / `TIMESTAMP` / `TIMESTAMPTZ`", "วันที่, เวลา (TZ = มี timezone)"],
            ["`JSON` / `JSONB`", "ข้อมูลยืดหยุ่น (JSONB ของ PostgreSQL ทำ index ได้)"],
            ["`UUID`", "id แบบสุ่มไม่ซ้ำ"],
          ],
        },
        {
          type: "table",
          title: "Constraints",
          headers: ["Constraint", "หน้าที่"],
          rows: [
            ["`PRIMARY KEY`", "ไม่ซ้ำ + ไม่ NULL, 1 ตารางมีได้ 1 อัน"],
            ["`FOREIGN KEY`", "ต้องชี้ไปแถวที่มีอยู่จริง"],
            ["`UNIQUE`", "ห้ามซ้ำ (แต่ NULL ได้)"],
            ["`NOT NULL`", "ห้ามว่าง"],
            ["`CHECK`", "เงื่อนไขเอง เช่น `price > 0`"],
            ["`DEFAULT`", "ค่าเริ่มต้นถ้าไม่ใส่มา"],
          ],
        },
        {
          type: "table",
          title: "DELETE vs TRUNCATE vs DROP",
          headers: ["คำสั่ง", "ลบอะไร", "WHERE ได้?", "ความเร็ว"],
          rows: [
            ["`DELETE`", "แถว (ทีละแถว)", "✅", "ช้าสุด"],
            ["`TRUNCATE`", "ทุกแถว เก็บโครงสร้าง", "❌", "เร็ว"],
            ["`DROP`", "ทั้งตาราง + โครงสร้าง", "❌", "เร็ว"],
          ],
        },
        {
          type: "warn",
          body: "ห้ามเก็บเงินด้วย `FLOAT` / `DOUBLE` นะ เพราะ 0.1 + 0.2 ไม่เท่ากับ 0.3 เป๊ะ 😵 ใช้ `NUMERIC` / `DECIMAL` หรือเก็บเป็นสตางค์ (`BIGINT`)",
        },
        {
          type: "tip",
          body: "FK actions: `ON DELETE CASCADE` (ลบตาม), `SET NULL` (ตั้งเป็น NULL), `RESTRICT` (ห้ามลบถ้ายังมีลูก)",
        },
      ],
    },
    // ------------------------------------------------------------
    {
      id: "index",
      title: "Index & EXPLAIN",
      emoji: "📇",
      summary: "สารบัญของตาราง ทำให้ค้นหาเร็วขึ้นเป็นร้อยเท่า",
      tags: ["index", "b-tree", "explain", "performance", "composite index", "seq scan"],
      sections: [
        {
          type: "text",
          body: "Index เหมือน **สารบัญท้ายหนังสือ** 📚 ไม่ต้องเปิดทุกหน้า (full table scan) แค่เปิดสารบัญแล้วกระโดดไปหน้าที่ต้องการ\n\nส่วนใหญ่ DB ใช้ **B-tree** (B+tree): ต้นไม้ที่สมดุล คีย์เรียงกันเสมอ ค้นหาได้ใน **O(log n)** ข้อมูลล้านแถวใช้แค่ ~3-4 ชั้น!",
        },
        {
          type: "steps",
          title: "B-tree หา email = 'mint@mail.com' ยังไง",
          items: [
            "เริ่มที่ **root node** เทียบคีย์ว่า 'mint' อยู่ช่วงไหน (เช่น ระหว่าง 'k' กับ 'p')",
            "เดินลงไป **child node** ของช่วงนั้น เทียบต่อ",
            "ถึง **leaf node** ที่เก็บคีย์เรียงกัน + pointer ไปยังแถวจริง",
            "ใช้ pointer ไปหยิบแถวจาก table มาให้ 🎯",
            "leaf แต่ละอันเชื่อมกันเป็นลิสต์ เลยทำ range query (`BETWEEN`, `>`, `ORDER BY`) ได้ดีด้วย",
          ],
        },
        {
          type: "code",
          lang: "sql",
          code: `CREATE INDEX idx_users_email ON users (email);
CREATE UNIQUE INDEX uq_users_email ON users (email);

-- Composite index: ลำดับคอลัมน์สำคัญมาก!
CREATE INDEX idx_orders_user_date ON orders (user_id, created_at);

-- ✅ ใช้ index ได้ (มีคอลัมน์ซ้ายสุด)
SELECT * FROM orders WHERE user_id = 1;
SELECT * FROM orders
WHERE user_id = 1 AND created_at >= '2026-01-01';

-- ❌ ใช้ index นี้ไม่ได้ (ข้ามคอลัมน์ซ้ายสุด)
SELECT * FROM orders WHERE created_at >= '2026-01-01';

DROP INDEX idx_users_email;   -- MySQL: DROP INDEX ... ON users`,
        },
        {
          type: "code",
          title: "EXPLAIN: ดูแผนการทำงาน",
          lang: "sql",
          code: `EXPLAIN ANALYZE
SELECT * FROM users WHERE email = 'mint@mail.com';

-- ก่อนมี index 🐢
-- Seq Scan on users (cost=0.00..1834.00 rows=1 ...)

-- หลังมี index 🚀
-- Index Scan using idx_users_email on users
--   (cost=0.29..8.31 rows=1 ...)`,
          note: "MySQL: ดูคอลัมน์ `type` ใน `EXPLAIN` ถ้าเป็น `ALL` = full scan, `ref`/`const` = ใช้ index",
        },
        {
          type: "list",
          title: "ควรทำ index เมื่อ",
          items: [
            "คอลัมน์ที่อยู่ใน `WHERE`, `JOIN ... ON`, `ORDER BY` บ่อยๆ",
            "Foreign key (PostgreSQL ไม่สร้างให้อัตโนมัติ!)",
            "คอลัมน์ที่ค่าหลากหลาย (high cardinality) เช่น email",
          ],
        },
        {
          type: "list",
          title: "ไม่ควร / ระวัง",
          items: [
            "ตารางเล็กมาก หรือคอลัมน์ค่าน้อยแบบ boolean",
            "ตารางที่เขียนหนักมาก: ทุก INSERT/UPDATE ต้องอัปเดต index ด้วย",
            "ทุก index กินพื้นที่ disk และ RAM",
          ],
        },
        {
          type: "warn",
          body: "ท่าที่ทำให้ index ไม่ทำงาน: ครอบคอลัมน์ด้วยฟังก์ชัน `WHERE LOWER(email) = ...` (แก้ด้วย expression index), `LIKE '%abc'`, เทียบ type ไม่ตรงกันจนเกิด implicit cast",
        },
      ],
    },
    // ------------------------------------------------------------
    {
      id: "transaction",
      title: "Transaction, ACID & Isolation",
      emoji: "🔒",
      summary: "ทำทั้งหมดหรือไม่ทำเลย + กันข้อมูลชนกัน",
      tags: ["transaction", "acid", "isolation", "commit", "rollback", "lock", "deadlock", "for update"],
      sections: [
        {
          type: "text",
          body: "Transaction = กลุ่มคำสั่งที่ต้อง **สำเร็จทั้งหมด หรือ ยกเลิกทั้งหมด** เช่น สร้าง order + ตัด stock ต้องไปด้วยกัน ห้ามสำเร็จครึ่งเดียว 🙅",
        },
        {
          type: "code",
          lang: "sql",
          code: `BEGIN;

INSERT INTO orders (user_id, total, status)
VALUES (1, 130, 'paid');

UPDATE products
SET stock = stock - 2
WHERE id = 3 AND stock >= 2;
-- ถ้า stock ไม่พอ (0 rows updated) แอปสั่ง ROLLBACK

COMMIT;   -- ยืนยัน  |  ROLLBACK; = ยกเลิกทั้งหมด`,
        },
        {
          type: "table",
          title: "ACID",
          headers: ["ตัว", "ชื่อ", "ความหมาย"],
          rows: [
            ["A", "Atomicity", "ทั้งหมดหรือไม่มีเลย"],
            ["C", "Consistency", "ข้อมูลถูกกฎ (constraints) เสมอ"],
            ["I", "Isolation", "หลาย transaction พร้อมกันไม่กวนกัน"],
            ["D", "Durability", "COMMIT แล้วไม่หาย แม้ไฟดับ"],
          ],
        },
        {
          type: "list",
          title: "ปัญหาที่ isolation ช่วยกัน",
          items: [
            "**Dirty read**: อ่านข้อมูลที่อีกคนยังไม่ commit",
            "**Non-repeatable read**: อ่านแถวเดิม 2 ครั้งได้ค่าไม่เท่ากัน",
            "**Phantom read**: query เดิม 2 ครั้งได้จำนวนแถวไม่เท่ากัน",
          ],
        },
        {
          type: "table",
          title: "Isolation levels (ตามมาตรฐาน SQL)",
          headers: ["Level", "Dirty", "Non-repeatable", "Phantom"],
          rows: [
            ["Read Uncommitted", "เกิดได้", "เกิดได้", "เกิดได้"],
            ["Read Committed", "✅ กัน", "เกิดได้", "เกิดได้"],
            ["Repeatable Read", "✅ กัน", "✅ กัน", "เกิดได้*"],
            ["Serializable", "✅ กัน", "✅ กัน", "✅ กัน"],
          ],
        },
        {
          type: "code",
          title: "Lock แถวก่อนแก้ (กันขายของเกิน stock)",
          lang: "sql",
          code: `BEGIN;
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;

SELECT stock FROM products
WHERE id = 3
FOR UPDATE;          -- คนอื่นต้องรอจนเรา COMMIT

UPDATE products SET stock = stock - 1 WHERE id = 3;
COMMIT;`,
        },
        {
          type: "tip",
          body: "ค่า default: PostgreSQL = **Read Committed**, MySQL InnoDB = **Repeatable Read**, SQL Server = **Read Committed**\n\n*ในทางปฏิบัติ Repeatable Read ของ PostgreSQL (snapshot) และ InnoDB (next-key lock) กัน phantom ได้เกือบทุกกรณี",
        },
        {
          type: "warn",
          body: "**Deadlock**: A ล็อกแถว 1 รอแถว 2, B ล็อกแถว 2 รอแถว 1 วนกันไม่จบ DB จะฆ่าทิ้ง 1 ตัว แก้โดยล็อกตามลำดับเดียวกันเสมอ และทำ transaction ให้สั้นที่สุด ⏱️",
        },
      ],
    },
    // ------------------------------------------------------------
    {
      id: "normalization",
      title: "Normalization (1NF - 3NF)",
      emoji: "🧹",
      summary: "จัดตารางให้ไม่ซ้ำซ้อน แก้ที่เดียวถูกทุกที่",
      tags: ["normalization", "1nf", "2nf", "3nf", "denormalization", "design"],
      sections: [
        {
          type: "text",
          body: "Normalization คือการแตกตารางให้ข้อมูล **ไม่ซ้ำซ้อน** ป้องกันปัญหาแก้ที่หนึ่งแล้วอีกที่ไม่ตาม (update anomaly) 🧽",
        },
        {
          type: "table",
          title: "😵 ตารางยังไม่ normalize",
          headers: ["order_id", "customer", "customer_city", "products"],
          rows: [
            ["101", "Mint", "Bangkok", "Latte, Croissant"],
            ["102", "Mint", "Bangkok", "Latte"],
          ],
        },
        {
          type: "list",
          items: [
            "**1NF**: ทุกช่องต้องเป็นค่าเดี่ยว (atomic) ห้ามมี list ในช่องเดียว ห้ามมีคอลัมน์ซ้ำแบบ `product1, product2` → แตก products เป็นแถวใน `order_items`",
            "**2NF**: 1NF + ทุกคอลัมน์ต้องขึ้นกับ PK **ทั้งก้อน** (เรื่องของ composite key) เช่น `order_items(order_id, product_id, product_name)` → product_name ขึ้นกับ product_id อย่างเดียว ย้ายไป `products`",
            "**3NF**: 2NF + ห้ามมี transitive dependency เช่น `orders(id, user_id, customer_city)` → city ขึ้นกับ user ไม่ใช่ order ย้ายไป `users`",
          ],
        },
        {
          type: "code",
          title: "😊 หลัง normalize แล้ว",
          lang: "sql",
          code: `-- users(id PK, name, city)
-- products(id PK, name, price)
-- orders(id PK, user_id FK, created_at)
-- order_items(order_id FK, product_id FK, qty, price)
--   PK = (order_id, product_id)

-- Mint ย้ายไป Phuket? แก้ที่เดียวจบ ✨
UPDATE users SET city = 'Phuket' WHERE name = 'Mint';`,
        },
        {
          type: "tip",
          body: "จำง่ายๆ: ทุกคอลัมน์ต้องขึ้นกับ “**the key, the whole key, and nothing but the key**” 🔑\n\n`order_items.price` ไม่ผิดกฎนะ เพราะมันคือ **ราคา ณ วันที่ซื้อ** (snapshot) ไม่ใช่ราคาปัจจุบันของสินค้า",
        },
        {
          type: "warn",
          body: "Normalize มากไปก็ต้อง JOIN เยอะ งานรายงาน/อ่านหนักๆ บางทีจงใจ **denormalize** (เก็บซ้ำ) เพื่อความเร็ว แต่ต้องดูแลให้ข้อมูลตรงกันเอง",
        },
      ],
    },
    // ------------------------------------------------------------
    {
      id: "execution-order",
      title: "ลำดับการทำงานของ Query",
      emoji: "🔢",
      summary: "FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT",
      tags: ["execution order", "logical order", "alias", "query"],
      sections: [
        {
          type: "text",
          body: "เราเขียนขึ้นต้นด้วย `SELECT` แต่ DB **คิด** ตามลำดับนี้ต่างหาก 🧠 รู้แล้วจะเข้าใจว่าทำไม alias บางที่ใช้ได้ บางที่ใช้ไม่ได้",
        },
        {
          type: "steps",
          items: [
            "`FROM` + `JOIN` — รวมตารางที่ต้องใช้",
            "`WHERE` — กรองแถว",
            "`GROUP BY` — จับกลุ่ม",
            "`HAVING` — กรองกลุ่ม",
            "`SELECT` — เลือกคอลัมน์ คำนวณ alias และ window functions",
            "`DISTINCT` — ตัดแถวซ้ำ",
            "`ORDER BY` — เรียง",
            "`LIMIT` / `OFFSET` — ตัดจำนวน",
          ],
        },
        {
          type: "code",
          lang: "sql",
          code: `SELECT city, COUNT(*) AS cnt   -- 5
FROM users                      -- 1
WHERE age >= 18                 -- 2
GROUP BY city                   -- 3
HAVING COUNT(*) > 10            -- 4
ORDER BY cnt DESC               -- 6 ใช้ alias ได้ เพราะ SELECT ทำไปแล้ว
LIMIT 5;                        -- 7

-- ❌ Error: ตอน WHERE ยังไม่มี alias "cnt"
-- SELECT city, COUNT(*) AS cnt FROM users WHERE cnt > 10 ...`,
        },
        {
          type: "tip",
          body: "นี่คือลำดับ **เชิงตรรกะ** ตัว optimizer อาจสลับการทำงานจริงเพื่อความเร็วได้ แต่ผลลัพธ์จะเหมือนกันเสมอ 👌",
        },
      ],
    },
    // ------------------------------------------------------------
    {
      id: "sql-vs-nosql",
      title: "SQL vs NoSQL",
      emoji: "⚖️",
      summary: "เลือกแบบไหนดี + CAP theorem ฉบับย่อ",
      tags: ["sql", "nosql", "cap", "acid", "base", "scaling", "comparison"],
      sections: [
        {
          type: "table",
          headers: ["หัวข้อ", "SQL (Relational)", "NoSQL"],
          rows: [
            ["โครงสร้าง", "ตาราง แถว คอลัมน์", "document, key-value, column, graph"],
            ["Schema", "ตายตัว ต้อง migrate", "ยืดหยุ่น เปลี่ยนง่าย"],
            ["ความสัมพันธ์", "JOIN เก่งมาก", "มักฝัง (embed) ข้อมูลไว้ด้วยกัน"],
            ["Transaction", "ACID เต็มรูปแบบ", "หลายตัวเน้น BASE / eventual consistency"],
            ["Scale", "ถนัดขยายเครื่อง (vertical)", "ถนัดเพิ่มเครื่อง (horizontal)"],
            ["ภาษา", "SQL มาตรฐาน", "แต่ละตัวมี API ของตัวเอง"],
            ["ตัวอย่าง", "PostgreSQL, MySQL", "MongoDB, Redis, Cassandra"],
          ],
        },
        {
          type: "list",
          title: "เลือก SQL เมื่อ 🗄️",
          items: [
            "ข้อมูลมีความสัมพันธ์ชัดเจน (user → order → item)",
            "ต้องการความถูกต้องสูง เช่น เงิน, stock, booking",
            "ต้อง query/รายงานซับซ้อน",
          ],
        },
        {
          type: "list",
          title: "เลือก NoSQL เมื่อ 🍃",
          items: [
            "โครงสร้างข้อมูลเปลี่ยนบ่อย หรือแต่ละชิ้นหน้าตาไม่เหมือนกัน",
            "ปริมาณข้อมูล/traffic มหาศาล ต้องกระจายหลายเครื่อง",
            "งานเฉพาะทาง: cache (Redis), กราฟความสัมพันธ์ (Neo4j), log/time-series",
          ],
        },
        {
          type: "code",
          title: "ข้อมูลเดียวกัน 2 สไตล์",
          lang: "js",
          code: `// SQL: แยก 2 ตาราง แล้วค่อย JOIN
// users(id, name)  +  orders(id, user_id, total)

// MongoDB: ฝัง orders ไว้ใน document ของ user เลย
{
  _id: 1,
  name: "Mint",
  city: "Bangkok",
  orders: [
    { id: 101, total: 130, status: "paid" },
    { id: 102, total: 65, status: "pending" }
  ]
}`,
        },
        {
          type: "text",
          title: "CAP theorem ฉบับย่อ 🧢",
          body: "ระบบ distributed เลือกได้แค่ 2 ใน 3 ตอนที่ **network ขาดกัน (Partition)**\n\n**C**onsistency = ทุกเครื่องเห็นข้อมูลล่าสุดตรงกัน\n**A**vailability = ทุก request ได้คำตอบเสมอ\n**P**artition tolerance = ระบบยังทำงานแม้ network ขาด\n\nเพราะ P เลี่ยงไม่ได้ในชีวิตจริง จึงต้องเลือก **CP** หรือ **AP**",
        },
        {
          type: "table",
          headers: ["แบบ", "ยอมเสีย", "ตัวอย่าง"],
          rows: [
            ["CP", "บาง request อาจ error/รอ", "HBase, etcd, ZooKeeper, MongoDB (ค่า default)"],
            ["AP", "อาจได้ข้อมูลเก่าชั่วคราว", "Cassandra, CouchDB, DynamoDB (eventual read)"],
          ],
        },
        {
          type: "tip",
          body: "ทุกวันนี้เส้นแบ่งเริ่มเบลอ: PostgreSQL มี `JSONB`, MongoDB มี multi-document transaction แล้ว หลายระบบใช้ทั้งคู่ร่วมกัน (เช่น PostgreSQL + Redis) 🤝",
        },
      ],
    },
    // ------------------------------------------------------------
    {
      id: "nosql-types",
      title: "NoSQL 4 แบบ + MongoDB Query",
      emoji: "🍃",
      summary: "Document, Key-Value, Wide-column, Graph และวิธีคุยกับ MongoDB",
      tags: ["nosql", "mongodb", "document", "key-value", "column", "graph", "aggregate", "neo4j"],
      sections: [
        {
          type: "table",
          headers: ["ประเภท", "เก็บแบบ", "ตัวอย่าง", "เหมาะกับ"],
          rows: [
            ["📄 Document", "JSON/BSON", "MongoDB, Firestore, CouchDB", "profile, catalog, CMS"],
            ["🔑 Key-Value", "key → value", "Redis, DynamoDB, Memcached", "cache, session, counter"],
            ["🏛️ Wide-column", "แถว + คอลัมน์ยืดหยุ่นมหาศาล", "Cassandra, HBase, ScyllaDB", "log, IoT, time-series, เขียนหนักมาก"],
            ["🕸️ Graph", "node + edge", "Neo4j, Amazon Neptune", "social, recommendation, fraud"],
          ],
        },
        {
          type: "table",
          title: "เทียบคำศัพท์ SQL → MongoDB",
          headers: ["SQL", "MongoDB"],
          rows: [
            ["table", "collection"],
            ["row", "document"],
            ["column", "field"],
            ["WHERE", "filter ใน `find()`"],
            ["GROUP BY", "`$group` ใน `aggregate()`"],
            ["JOIN", "`$lookup` หรือฝัง (embed)"],
          ],
        },
        {
          type: "code",
          title: "MongoDB CRUD",
          lang: "js",
          code: `db.users.insertOne({ name: "Mint", email: "mint@mail.com", city: "Bangkok", age: 25 })

// = SELECT name FROM users WHERE city='Bangkok' AND age>=18
//   ORDER BY age DESC LIMIT 10
db.users.find(
  { city: "Bangkok", age: { $gte: 18 } },
  { name: 1, _id: 0 }
).sort({ age: -1 }).limit(10)

db.users.find({ $or: [{ city: "Bangkok" }, { age: { $lt: 20 } }] })
db.users.find({ city: { $in: ["Bangkok", "Chiang Mai"] } })
db.users.find({ name: /^Mi/ })   // = LIKE 'Mi%'

db.users.updateOne(
  { email: "mint@mail.com" },
  { $set: { city: "Phuket" }, $inc: { age: 1 } }
)
db.users.updateOne({ email: "new@mail.com" }, { $set: { name: "New" } }, { upsert: true })
db.users.deleteMany({ age: { $lt: 13 } })`,
        },
        {
          type: "code",
          title: "Aggregation pipeline (= GROUP BY + HAVING + JOIN)",
          lang: "js",
          code: `db.orders.aggregate([
  { $match: { status: "paid" } },                     // WHERE
  { $group: {                                         // GROUP BY
      _id: "$userId",
      spent: { $sum: "$total" },
      count: { $sum: 1 }
  } },
  { $match: { spent: { $gt: 5000 } } },               // HAVING
  { $sort: { spent: -1 } },                           // ORDER BY
  { $limit: 5 },                                      // LIMIT
  { $lookup: {                                        // JOIN
      from: "users", localField: "_id",
      foreignField: "_id", as: "user"
  } }
])`,
        },
        {
          type: "code",
          title: "แถม: Graph query (Neo4j Cypher) หาเพื่อนของเพื่อน",
          lang: "sql",
          code: `MATCH (me:User {name: 'Mint'})-[:FRIEND]->(f)-[:FRIEND]->(fof)
WHERE fof <> me
RETURN DISTINCT fof.name;`,
        },
        {
          type: "tip",
          body: "MongoDB: ข้อมูลที่อ่านด้วยกันเสมอ → **embed** ไว้ใน document เดียว, ข้อมูลที่โตไม่สิ้นสุดหรือใช้ร่วมกันหลายที่ → **reference** ด้วย id (document ใหญ่สุดได้ 16MB นะ)",
        },
      ],
    },
    // ------------------------------------------------------------
    {
      id: "redis",
      title: "Redis Commands",
      emoji: "⚡",
      summary: "key-value ใน RAM เร็วปรู๊ด เหมาะทำ cache, session, leaderboard",
      tags: ["redis", "cache", "key-value", "ttl", "session", "leaderboard", "pubsub", "in-memory"],
      sections: [
        {
          type: "text",
          body: "Redis เก็บข้อมูลใน **RAM** เลยเร็วระดับ microsecond ⚡ และมี data structure ให้เลือกหลายแบบ คำสั่งแต่ละตัวเป็น **atomic** (รันทีละคำสั่ง ไม่ชนกัน)",
        },
        {
          type: "code",
          title: "String + TTL",
          lang: "bash",
          code: `SET user:1:name "Mint"
GET user:1:name                      # "Mint"
SET session:abc123 "user1" EX 3600   # หมดอายุใน 1 ชม.
SET lock:order:9 "1" NX EX 10        # set เฉพาะถ้ายังไม่มี (ทำ lock)
TTL session:abc123                   # เหลือกี่วินาที
EXPIRE user:1:name 60
INCR page:views                      # +1 แบบ atomic
INCRBY page:views 10
DEL user:1:name
EXISTS user:1:name                   # 0`,
        },
        {
          type: "code",
          title: "Hash / List / Set / Sorted Set",
          lang: "bash",
          code: `HSET user:1 name "Mint" city "Bangkok" age 25
HGET user:1 name                 # "Mint"
HGETALL user:1
HINCRBY user:1 age 1

LPUSH queue:emails "job1" "job2" # ใส่ทางซ้าย
RPOP queue:emails                # "job1" (FIFO)
LRANGE queue:emails 0 -1         # ดูทั้งหมด

SADD post:1:likes "u1" "u2"
SISMEMBER post:1:likes "u1"      # 1
SCARD post:1:likes               # 2

ZADD leaderboard 150 "mint" 120 "ploy"
ZINCRBY leaderboard 10 "ploy"
ZRANGE leaderboard 0 2 REV WITHSCORES   # top 3 (Redis 6.2+)`,
          note: "Redis เก่ากว่า 6.2 ใช้ `ZREVRANGE leaderboard 0 2 WITHSCORES`",
        },
        {
          type: "code",
          title: "Cache-aside ด้วย Node.js (node-redis v4)",
          lang: "js",
          code: `import { createClient } from "redis";

const redis = createClient();
await redis.connect();

async function getProduct(id) {
  const key = "product:" + id;
  const cached = await redis.get(key);
  if (cached) return JSON.parse(cached);          // cache hit 🎯

  const { rows } = await db.query(
    "SELECT * FROM products WHERE id = $1", [id]
  );
  await redis.set(key, JSON.stringify(rows[0]), { EX: 300 });
  return rows[0];                                 // cache miss
}`,
        },
        {
          type: "table",
          title: "ใช้ Redis ทำอะไรได้บ้าง",
          headers: ["งาน", "โครงสร้าง / คำสั่ง"],
          rows: [
            ["Cache", "String + `EX`"],
            ["Session", "String / Hash + TTL"],
            ["Rate limit", "`INCR` + `EXPIRE`"],
            ["Leaderboard", "Sorted Set (`ZADD`, `ZRANGE`)"],
            ["Queue ง่ายๆ", "List (`LPUSH` / `BRPOP`) หรือ Streams"],
            ["Realtime แจ้งเตือน", "`PUBLISH` / `SUBSCRIBE`"],
          ],
        },
        {
          type: "warn",
          body: "ห้ามใช้ `KEYS *` บน production! มันสแกนทุก key และบล็อกทั้งเซิร์ฟเวอร์ 🧊 ใช้ `SCAN 0 MATCH user:* COUNT 100` แทน\n\nและจำไว้ว่า RAM แพง + ข้อมูลอาจหายถ้าไม่ได้ตั้ง persistence (RDB/AOF)",
        },
      ],
    },
    // ------------------------------------------------------------
    {
      id: "popular-dbs",
      title: "เทียบ Database ยอดนิยม",
      emoji: "🏆",
      summary: "PostgreSQL, MySQL, SQLite, SQL Server, MongoDB, Redis, Firebase, Supabase",
      tags: ["postgresql", "mysql", "sqlite", "sql server", "mongodb", "redis", "firebase", "supabase", "comparison"],
      sections: [
        {
          type: "table",
          headers: ["DB", "ประเภท", "จุดเด่น", "เหมาะกับ"],
          rows: [
            ["🐘 PostgreSQL", "SQL", "ฟีเจอร์ครบ, JSONB, extension เยอะ, มาตรฐานแน่น", "แทบทุกงาน, ตัวเลือก default"],
            ["🐬 MySQL / MariaDB", "SQL", "ใช้แพร่หลาย, host ง่าย, เร็วงานอ่าน", "เว็บทั่วไป, WordPress"],
            ["🪶 SQLite", "SQL", "ไฟล์เดียว ไม่ต้องมี server", "mobile, desktop, prototype, test"],
            ["🪟 SQL Server", "SQL", "ระบบนิเวศ Microsoft, T-SQL, tooling ดี", "องค์กร, .NET"],
            ["🍃 MongoDB", "Document", "schema ยืดหยุ่น, scale แนวนอนง่าย", "ข้อมูลเปลี่ยนบ่อย, catalog"],
            ["⚡ Redis", "Key-Value (RAM)", "เร็วสุดๆ, data structure หลากหลาย", "cache, session, queue"],
            ["🔥 Firebase Firestore", "Document (BaaS)", "realtime sync, auth, hosting ของ Google", "mobile app, MVP ไว"],
            ["💚 Supabase", "PostgreSQL (BaaS)", "open source, auth, realtime, storage, Row Level Security", "อยากได้ Firebase แต่เป็น SQL"],
          ],
        },
        {
          type: "code",
          title: "Supabase (supabase-js)",
          lang: "js",
          code: `const { data, error } = await supabase
  .from("users")
  .select("name, orders(total)")   // join ผ่าน FK อัตโนมัติ
  .eq("city", "Bangkok")
  .order("name")
  .limit(10);`,
        },
        {
          type: "code",
          title: "Firebase Firestore (modular v9+)",
          lang: "js",
          code: `import { collection, query, where, orderBy, getDocs } from "firebase/firestore";

const q = query(
  collection(db, "users"),
  where("city", "==", "Bangkok"),
  orderBy("name")
);
const snap = await getDocs(q);
snap.forEach((doc) => console.log(doc.id, doc.data()));`,
        },
        {
          type: "tip",
          body: "เลือกไม่ถูก? เริ่มที่ **PostgreSQL** ก่อนเลย 🐘 แล้วค่อยเติม Redis ตอนต้องการ cache ส่วน SQLite เหมาะมากสำหรับแอปบนเครื่องและเขียน test",
        },
      ],
    },
    // ------------------------------------------------------------
    {
      id: "orm",
      title: "ORM ยอดนิยม",
      emoji: "🧩",
      summary: "เขียนโค้ดเป็น object แทน SQL: Prisma, Sequelize, TypeORM, SQLAlchemy, Hibernate",
      tags: ["orm", "prisma", "sequelize", "typeorm", "sqlalchemy", "hibernate", "n+1"],
      sections: [
        {
          type: "text",
          body: "**ORM** (Object-Relational Mapping) จับคู่ “ตาราง ↔ class” ให้เราเขียนโค้ดภาษาตัวเองแทน SQL ได้ ✨ มี type safety, migration และกัน SQL injection ให้ด้วย",
        },
        {
          type: "table",
          headers: ["ORM", "ภาษา", "จุดเด่น"],
          rows: [
            ["Prisma", "TS / JS", "schema file เดียว, type-safe สุดๆ, migration ในตัว"],
            ["Sequelize", "JS", "เก่าแก่ ใช้กันเยอะ, รองรับหลาย DB"],
            ["TypeORM", "TS", "ใช้ decorator, สไตล์คล้าย Hibernate"],
            ["SQLAlchemy", "Python", "ทรงพลัง มีทั้ง Core (SQL builder) และ ORM"],
            ["Hibernate / JPA", "Java", "มาตรฐานฝั่ง Java/Spring"],
          ],
        },
        {
          type: "code",
          title: "Prisma: schema.prisma",
          lang: "prisma",
          code: `model User {
  id     Int     @id @default(autoincrement())
  email  String  @unique
  name   String
  age    Int?
  orders Order[]
}

model Order {
  id     Int     @id @default(autoincrement())
  total  Decimal
  user   User    @relation(fields: [userId], references: [id])
  userId Int
}`,
        },
        {
          type: "code",
          title: "Prisma: query",
          lang: "ts",
          code: `const users = await prisma.user.findMany({
  where: { age: { gte: 18 }, email: { endsWith: "@gmail.com" } },
  include: { orders: true },
  orderBy: { name: "asc" },
  take: 10,
});`,
        },
        {
          type: "code",
          title: "Sequelize & TypeORM",
          lang: "ts",
          code: `// Sequelize
const { Op } = require("sequelize");
const users = await User.findAll({
  where: { age: { [Op.gte]: 18 }, city: "Bangkok" },
  include: [Order],
  limit: 10,
});

// TypeORM
const users2 = await dataSource.getRepository(User).find({
  where: { age: MoreThanOrEqual(18) },
  relations: { orders: true },
  take: 10,
});`,
        },
        {
          type: "code",
          title: "SQLAlchemy 2.0 (Python)",
          lang: "python",
          code: `from sqlalchemy import select

stmt = (
    select(User)
    .where(User.age >= 18)
    .order_by(User.name)
    .limit(10)
)
users = session.scalars(stmt).all()`,
        },
        {
          type: "code",
          title: "Hibernate / JPA (Java)",
          lang: "java",
          code: `@Entity
@Table(name = "users")
public class User {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String email;
  private Integer age;

  @OneToMany(mappedBy = "user")
  private List<Order> orders;
}

List<User> adults = em
  .createQuery("SELECT u FROM User u WHERE u.age >= :age", User.class)
  .setParameter("age", 18)
  .getResultList();`,
        },
        {
          type: "warn",
          body: "**ปัญหา N+1**: ดึง user 100 คน แล้ววนลูปดึง orders ทีละคน = 101 queries 🐌 แก้ด้วย eager loading (`include`, `relations`, `JOIN FETCH`) ให้เหลือ 1-2 queries",
        },
        {
          type: "tip",
          body: "ORM สะดวก แต่ **ต้องเข้าใจ SQL ด้วย** เพราะ query ซับซ้อนหรือรายงานหนักๆ เขียน raw SQL (แบบ parameterized!) จะคุมได้ดีกว่า",
        },
      ],
    },
    // ------------------------------------------------------------
    {
      id: "cheat-sheet",
      title: "SQL Cheat Sheet ที่ต้องรู้",
      emoji: "📝",
      summary: "รวมคำสั่งที่ใช้บ่อยไว้ในหน้าเดียว เปิดดูได้ทุกเมื่อ",
      tags: ["cheat sheet", "summary", "union", "case", "date", "string", "quick reference"],
      sections: [
        {
          type: "table",
          title: "Query",
          headers: ["อยากทำ", "SQL"],
          rows: [
            ["เลือกคอลัมน์", "`SELECT a, b FROM t`"],
            ["กรอง", "`WHERE a = 1 AND b IS NOT NULL`"],
            ["ค้นคำ", "`WHERE name LIKE '%mi%'`"],
            ["เรียง", "`ORDER BY a DESC`"],
            ["จำกัด", "`LIMIT 10 OFFSET 20`"],
            ["ไม่ซ้ำ", "`SELECT DISTINCT a`"],
            ["นับ/รวม", "`COUNT(*)`, `SUM(x)`, `AVG(x)`"],
            ["จัดกลุ่ม", "`GROUP BY a HAVING COUNT(*) > 1`"],
            ["รวมตาราง", "`JOIN b ON b.a_id = a.id`"],
            ["ต่อผลลัพธ์", "`UNION` (ตัดซ้ำ) / `UNION ALL` (เร็วกว่า ไม่ตัดซ้ำ)"],
            ["เงื่อนไข", "`CASE WHEN x > 0 THEN 'pos' ELSE 'neg' END`"],
            ["แทน NULL", "`COALESCE(a, 0)`"],
            ["จัดอันดับ", "`ROW_NUMBER() OVER (PARTITION BY a ORDER BY b)`"],
          ],
        },
        {
          type: "table",
          title: "แก้ข้อมูล & โครงสร้าง",
          headers: ["อยากทำ", "SQL"],
          rows: [
            ["เพิ่ม", "`INSERT INTO t (a, b) VALUES (1, 2)`"],
            ["แก้", "`UPDATE t SET a = 1 WHERE id = 5`"],
            ["ลบ", "`DELETE FROM t WHERE id = 5`"],
            ["สร้างตาราง", "`CREATE TABLE t (id INT PRIMARY KEY, ...)`"],
            ["เพิ่มคอลัมน์", "`ALTER TABLE t ADD COLUMN c TEXT`"],
            ["สร้าง index", "`CREATE INDEX idx_t_a ON t (a)`"],
            ["transaction", "`BEGIN; ... COMMIT;` / `ROLLBACK;`"],
          ],
        },
        {
          type: "code",
          title: "Template ที่ใช้บ่อยจริง",
          lang: "sql",
          code: `-- ยอดขายรายเดือน (PostgreSQL)
SELECT DATE_TRUNC('month', created_at) AS month,
       COUNT(*) AS orders, SUM(total) AS revenue
FROM orders
WHERE status = 'paid'
GROUP BY 1
ORDER BY 1;
-- MySQL: DATE_FORMAT(created_at, '%Y-%m')

-- สินค้าขายดี 5 อันดับ
SELECT p.name, SUM(oi.qty) AS sold
FROM order_items oi
JOIN products p ON p.id = oi.product_id
GROUP BY p.id, p.name
ORDER BY sold DESC
LIMIT 5;

-- แปะป้ายด้วย CASE
SELECT name,
  CASE WHEN age < 18 THEN 'teen'
       WHEN age < 60 THEN 'adult'
       ELSE 'senior' END AS age_group
FROM users;`,
        },
        {
          type: "pairs",
          title: "ฟังก์ชัน string / date ที่เจอบ่อย",
          items: ["UPPER / LOWER", "TRIM", "LENGTH", "SUBSTRING", "CONCAT / ||", "REPLACE", "NOW()", "CURRENT_DATE", "DATE_TRUNC", "EXTRACT", "CAST"],
        },
        {
          type: "warn",
          body: "ห้ามต่อ string เป็น SQL จาก input ผู้ใช้เด็ดขาด เช่น `\"... WHERE name = '\" + input + \"'\"` = โดน **SQL injection** 💀 ใช้ parameter (`$1`, `?`) ทุกครั้ง",
        },
      ],
    },
    // ------------------------------------------------------------
    {
      id: "interview-queries",
      title: "SQL โจทย์สัมภาษณ์ยอดฮิต",
      emoji: "🎯",
      summary: "Nth highest salary, หาข้อมูลซ้ำ, top N ต่อกลุ่ม และคำถามทฤษฎี",
      tags: ["interview", "nth highest", "salary", "duplicate", "top n", "self join", "practice"],
      sections: [
        {
          type: "text",
          body: "โจทย์สัมภาษณ์ชอบใช้ตาราง `employees(id, name, salary, department_id, manager_id)` เลยใช้ตามนั้นนะ ส่วนที่เหลือใช้ schema ร้านค้าของเรา 🛒",
        },
        {
          type: "code",
          title: "1) เงินเดือนสูงสุดอันดับ N (เช่น N = 3)",
          lang: "sql",
          code: `-- วิธี 1: DENSE_RANK (รองรับเงินเดือนซ้ำ) ⭐
SELECT DISTINCT salary
FROM (
  SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) AS rnk
  FROM employees
) t
WHERE rnk = 3;

-- วิธี 2: LIMIT / OFFSET (OFFSET = N - 1)
SELECT DISTINCT salary
FROM employees
ORDER BY salary DESC
LIMIT 1 OFFSET 2;

-- วิธี 3: อันดับ 2 แบบคลาสสิก
SELECT MAX(salary) AS second_highest
FROM employees
WHERE salary < (SELECT MAX(salary) FROM employees);`,
        },
        {
          type: "code",
          title: "2) หาข้อมูลซ้ำ + ลบให้เหลืออันเดียว",
          lang: "sql",
          code: `-- email ไหนซ้ำบ้าง
SELECT email, COUNT(*) AS cnt
FROM users
GROUP BY email
HAVING COUNT(*) > 1;

-- ลบตัวซ้ำ เก็บ id เล็กสุดไว้ (PostgreSQL / MySQL 8)
DELETE FROM users
WHERE id IN (
  SELECT id FROM (
    SELECT id,
      ROW_NUMBER() OVER (PARTITION BY email ORDER BY id) AS rn
    FROM users
  ) t
  WHERE rn > 1
);`,
        },
        {
          type: "code",
          title: "3) คนที่ไม่เคยสั่งซื้อ",
          lang: "sql",
          code: `SELECT u.name
FROM users u
WHERE NOT EXISTS (
  SELECT 1 FROM orders o WHERE o.user_id = u.id
);
-- หรือ LEFT JOIN orders o ... WHERE o.id IS NULL`,
        },
        {
          type: "code",
          title: "4) Top N ต่อกลุ่ม: คนเงินเดือนสูงสุดของแต่ละแผนก",
          lang: "sql",
          code: `WITH ranked AS (
  SELECT name, department_id, salary,
    RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) AS rnk
  FROM employees
)
SELECT name, department_id, salary
FROM ranked
WHERE rnk = 1;   -- อยากได้ top 3 ก็ rnk <= 3`,
        },
        {
          type: "code",
          title: "5) พนักงานที่ได้เงินเดือนมากกว่าหัวหน้า (self join)",
          lang: "sql",
          code: `SELECT e.name AS employee, e.salary, m.name AS manager, m.salary AS manager_salary
FROM employees e
JOIN employees m ON m.id = e.manager_id
WHERE e.salary > m.salary;`,
        },
        {
          type: "code",
          title: "6) แผนกที่เงินเดือนเฉลี่ยสูงกว่าค่าเฉลี่ยบริษัท",
          lang: "sql",
          code: `SELECT department_id, AVG(salary) AS avg_salary
FROM employees
GROUP BY department_id
HAVING AVG(salary) > (SELECT AVG(salary) FROM employees);`,
        },
        {
          type: "code",
          title: "7) ยอดขายรายเดือน + เติบโตกี่ % จากเดือนก่อน",
          lang: "sql",
          code: `WITH monthly AS (
  SELECT DATE_TRUNC('month', created_at) AS month,
         SUM(total) AS revenue
  FROM orders
  WHERE status = 'paid'
  GROUP BY 1
)
SELECT month, revenue,
  LAG(revenue) OVER (ORDER BY month) AS prev,
  ROUND(100.0 * (revenue - LAG(revenue) OVER (ORDER BY month))
        / NULLIF(LAG(revenue) OVER (ORDER BY month), 0), 2) AS growth_pct
FROM monthly
ORDER BY month;`,
          note: "`NULLIF(x, 0)` กันหารด้วยศูนย์ ✨",
        },
        {
          type: "list",
          title: "คำถามทฤษฎีที่โดนถามบ่อย 💬",
          items: [
            "**WHERE vs HAVING**: กรองแถวก่อน group vs กรองกลุ่มหลัง group",
            "**DELETE vs TRUNCATE vs DROP**: ลบบางแถว / ล้างทั้งตาราง / ลบตารางทิ้ง",
            "**UNION vs UNION ALL**: ตัดแถวซ้ำ vs ไม่ตัด (เร็วกว่า)",
            "**PRIMARY KEY vs UNIQUE**: PK มีได้ 1 อันและห้าม NULL, UNIQUE มีได้หลายอัน",
            "**Clustered vs Non-clustered index**: clustered = ข้อมูลจริงเรียงตาม index (มีได้ 1), non-clustered = สารบัญแยกที่ชี้ไปหาแถว",
            "**INNER vs LEFT JOIN**: เฉพาะที่ match vs เก็บฝั่งซ้ายทั้งหมด",
            "**RANK vs DENSE_RANK**: ค่าเท่ากันแล้วข้ามเลขไหม",
            "**Normalization คืออะไร ทำไมต้อง denormalize บางที**",
          ],
        },
        {
          type: "tip",
          body: "ตอนสัมภาษณ์ให้ **พูดความคิดออกมา**: ถาม edge case ก่อน (เงินเดือนซ้ำ? NULL? ถ้าไม่มีอันดับ N คืนอะไร?) กรรมการชอบมากกว่าเขียนเงียบๆ 🗣️",
        },
      ],
    },
  ],
}
