// Small builders for SCHEMA.md blocks so the stack topics stay readable.
const trimCode = (c) => c.replace(/^\n/, '').replace(/\s+$/, '')

export const text = (body, title) => ({ type: 'text', title, body })
export const list = (items, title) => ({ type: 'list', title, items })
export const steps = (items, title) => ({ type: 'steps', title, items })
export const code = (lang, src, title, note) => ({ type: 'code', lang, title, code: trimCode(src), note })
export const table = (headers, rows, title) => ({ type: 'table', title, headers, rows })
export const tip = (body) => ({ type: 'tip', body })
export const warn = (body) => ({ type: 'warn', body })
export const pairs = (items, title) => ({ type: 'pairs', title, items })
export const flow = (items, title) => ({ type: 'flow', title, items })
