import { useState } from 'react'
import Background from './components/Background'
import Character from './components/Character'
import DialogBox from './components/DialogBox'
import { getGPTReply } from './api/openai'

function App() {
  const [input, setInput] = useState('')
  const [dialog, setDialog] = useState({
    speaker: '정우',
    text: '안녕? 뭐 하고 있어?',
  })

  const handleSend = async () => {
    if (!input.trim() || isLoading) return
    setIsLoading(true)
  
    await new Promise((res) => setTimeout(res, 1000)) // ← 1초 대기
  
    const reply = await getGPTReply(input)
    setDialog({ speaker: '정우', text: reply })
    setInput('')
    setIsLoading(false)
  }
  

  return (
    <div className="game-container">
      <Background src="/bg_school.jpg" />
      <Character src="/char_heroine.png" />
      <DialogBox speaker={dialog.speaker} text={dialog.text} />
      <div className="input-area">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="대화를 입력해보세요..."
        />
      <button onClick={handleSend} disabled={isLoading}>
        {isLoading ? '생성 중...' : '전송'}
      </button>

      </div>
    </div>
  )
}

export default App
