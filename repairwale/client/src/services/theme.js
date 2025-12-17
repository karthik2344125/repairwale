const THEME_KEY = 'rw_theme'

export function getTheme(){
  try{ return localStorage.getItem(THEME_KEY) || 'dark' }catch{ return 'dark' }
}

export function setTheme(theme){
  try{ localStorage.setItem(THEME_KEY, theme) }catch{}
  applyTheme(theme)
}

export function applyTheme(theme){
  const t = theme || getTheme()
  const el = document.documentElement
  if(!el) return
  el.setAttribute('data-theme', t)
}
