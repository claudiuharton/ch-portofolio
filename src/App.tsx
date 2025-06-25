import './App.css'
import Portfolio from './claudiu-portfolio'
import { ThemeProvider } from './ThemeContext'

function App() {
  return (
    <ThemeProvider>
      <Portfolio />
    </ThemeProvider>
  )
}

export default App