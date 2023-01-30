import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App'
import Ipfs from './pages/Ipfs';
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Ipfs />
  </React.StrictMode>,
)
