import React from 'react'
import ReactDOM from 'react-dom/client'
import CredCloneHome from './App.tsx'
import './index.css' // This line is crucial for loading styles

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CredCloneHome />
  </React.StrictMode>,
)