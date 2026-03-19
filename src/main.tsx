import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { shouldUseLowEffectsMode } from './utils/browser'

const isChrome = /Chrome/.test(navigator.userAgent) && !/Edg|OPR|Brave/.test(navigator.userAgent)
const useLowEffectsMode = shouldUseLowEffectsMode()

if (isChrome) {
  document.documentElement.classList.add('ua-chrome')
}

if (useLowEffectsMode) {
  document.documentElement.classList.add('ua-low-effects')
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
