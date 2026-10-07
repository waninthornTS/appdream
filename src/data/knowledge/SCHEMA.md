# Knowledge category file format

Each category is one file: `src/data/knowledge/<id>.js` with a default export.

```js
export default {
  id: 'sql',                       // same as filename
  title: 'SQL & Database',         // short display title
  emoji: '🗄️',                     // one emoji
  color: '#7ec4cf',                // pastel accent color
  intro: 'คำโปรยสั้นๆ น่ารักๆ 1-2 ประโยค',
  topics: [
    {
      id: 'select',                // kebab-case, unique within category
      title: 'SELECT พื้นฐาน',
      emoji: '🔍',
      summary: 'สรุป 1 บรรทัด (โชว์บนการ์ด)',
      tags: ['query', 'basic'],    // for search
      sections: [ /* blocks, see below */ ],
    },
  ],
}
```

## Section blocks (render in order)

| type     | fields                                               | renders as |
|----------|------------------------------------------------------|-----------|
| `text`   | `title?`, `body`                                     | paragraph(s); `\n\n` splits paragraphs |
| `list`   | `title?`, `items: string[]`                          | bullet list |
| `steps`  | `title?`, `items: string[]`                          | numbered steps |
| `code`   | `title?`, `lang`, `code`, `note?`                    | code box (note shown under it) |
| `table`  | `title?`, `headers: string[]`, `rows: string[][]`    | table |
| `tip`    | `body`                                               | cute "เคล็ดลับ" speech bubble |
| `warn`   | `body`                                               | "ระวังนะ!" bubble |
| `pairs`  | `title?`, `items: string[]`                          | chips ("ใช้คู่กับ") |
| `flow`   | `title?`, `back?`, `items: {icon, label, desc?, side?, arrow?}[]` | vertical flow diagram; `side` = `client`/`server`/`db`/`net` colors the box, `arrow` labels the arrow below it, `back: true` points arrows up |

Inline formatting allowed inside `body`, `items`, table cells, `note`:
`` `inline code` `` and `**bold**` only. No HTML, no markdown headings/links.

## Writing style
- Thai language, friendly & cute tone (like a cozy Animal Crossing villager explaining),
  but technically accurate. English for technical terms/code.
- Concise summary style — easy to read on a phone. Short paragraphs.
- Every topic should include at least one `code` example where it makes sense.
- Code must be correct and runnable/realistic. Keep each code block ≲ 25 lines.
- Escape backticks inside JS template strings properly (prefer normal quoted strings with `\n`, or template literals with escaped `` \` `` if needed).
