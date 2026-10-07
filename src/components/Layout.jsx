import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { SKIES, useSky } from '../lib/sky'

const ICONS = {
  home: <path d="M4 10.5 12 4l8 6.5V19a1.5 1.5 0 0 1-1.5 1.5H15V15H9v5.5H5.5A1.5 1.5 0 0 1 4 19z" />,
  book: (
    <>
      <path d="M12 6.5C10 5 7.5 4.5 4.5 4.8v13.5c3-.3 5.5.2 7.5 1.7 2-1.5 4.5-2 7.5-1.7V4.8C16.5 4.5 14 5 12 6.5z" />
      <path d="M12 6.5V20" />
    </>
  ),
  guitar: (
    <>
      <path d="M13.4 10.6a3.2 3.2 0 0 0-4.6-.3c-.6.6-.7 1.5-1.4 2-.8.6-2 .4-2.9 1.3a3.6 3.6 0 0 0 5.1 5.1c.9-.9.7-2.1 1.3-2.9.5-.7 1.4-.8 2-1.4a3.2 3.2 0 0 0 .5-3.8z" />
      <path d="M12.6 11.4 19 5" />
      <path d="M17.6 3.6l2.8 2.8" />
      <circle cx="9.6" cy="14.4" r="1" />
    </>
  ),
  star: <path d="M12 3.8l2.5 5.1 5.6.8-4 3.9.9 5.6L12 16.6l-5 2.6.9-5.6-4-3.9 5.6-.8z" />,
}

const TABS = [
  { to: '/', label: 'หน้าแรก', icon: 'home', c: '#FF9DB8', cd: '#E2738F', end: true },
  { to: '/learn', label: 'ความรู้', icon: 'book', c: '#FFC857', cd: '#DDA22A' },
  { to: '/chords', label: 'คอร์ด', icon: 'guitar', c: '#7CC4F0', cd: '#4E9CCB' },
  { to: '/saved', label: 'ที่เก็บไว้', icon: 'star', c: '#B79CFF', cd: '#8D6FE0' },
]

export function AppIcon({ icon, c, cd, size }) {
  return (
    <span className="app-ico" style={{ '--c': c, '--cd': cd, ...(size ? { width: size, height: size * 0.9 } : null) }}>
      <svg viewBox="0 0 24 24">{ICONS[icon]}</svg>
    </span>
  )
}

export default function Layout() {
  const { pathname } = useLocation()
  const { sky } = useSky(60000)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  useEffect(() => {
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', SKIES[sky].top)
    document.documentElement.dataset.sky = sky
  }, [sky])

  return (
    <div className={`app sky-${sky}`}>
      <div className="sky-bg" aria-hidden="true">
        {sky === 'night' && <div className="sky-stars" />}
      </div>
      <main className="page" key={pathname}>
        <Outlet />
      </main>
      <nav className="tabbar" aria-label="เมนูหลัก">
        {TABS.map((t) => (
          <NavLink key={t.to} to={t.to} end={t.end} className={({ isActive }) => 'tab' + (isActive ? ' active' : '')}>
            <AppIcon icon={t.icon} c={t.c} cd={t.cd} />
            <span className="tab-label">{t.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  )
}

export function TopBar({ title, back, right }) {
  const navigate = useNavigate()
  return (
    <header className="topbar">
      {back ? (
        <button className="icon-btn" onClick={() => (window.history.length > 1 ? navigate(-1) : navigate(back))} aria-label="ย้อนกลับ">
          ‹
        </button>
      ) : (
        <span className="icon-spacer" />
      )}
      <h1 className="topbar-title">{title}</h1>
      {right || <span className="icon-spacer" />}
    </header>
  )
}

export function StarButton({ on, onClick }) {
  return (
    <button className={'icon-btn star' + (on ? ' on' : '')} onClick={onClick} aria-label={on ? 'เอาออกจากที่เก็บไว้' : 'เก็บไว้อ่าน'}>
      {on ? '★' : '☆'}
    </button>
  )
}
