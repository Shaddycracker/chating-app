import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './firebase/FirebaseInit.ts'
import { SnackbarProvider } from 'notistack'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <SnackbarProvider>
        <App />
    </SnackbarProvider>
)
