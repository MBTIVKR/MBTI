import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MBTITest from './Components/mbti/mbti'

function App() {
  const [count, setCount] = useState(0)

  return (
    <MBTITest />
  )
}

export default App
