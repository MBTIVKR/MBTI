import { useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'
import MBTITest from '../mbti/mbti'

function App() {
  const [count, setCount] = useState(0)

  return (
    <MBTITest />
  )
}

export default App
