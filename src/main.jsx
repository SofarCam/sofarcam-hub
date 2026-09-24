import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const root = document.getElementById('root')
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// The build prerenders the page into #root (so crawlers and AI bots can read it);
// hydrate that markup instead of throwing it away.
if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)
