import { useState } from 'react'
import './App.css'
import VideoCall from './VideoCall'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <div>Video Calling</div>
     <VideoCall />
    </>
  )
}

export default App
