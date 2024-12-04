import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import '@xyflow/react/dist/style.css';
// import App from './App';
import AppWithProvider from './App';
import { DnDProvider } from './components/DragAndDropTable';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DnDProvider>

    <AppWithProvider />
    </DnDProvider>
  </StrictMode>,
)
