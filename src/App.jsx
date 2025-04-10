import { useState } from 'react'
import './styles/main.scss'
import Background from './components/Background'
import Character from './components/Character'
import DialogBox from './components/DialogBox'
import ChoiceBox from './components/ChoiceBox'
import { getGPTReply } from './api/openrouter'

function App() {
  const [userName, setUserName] = useState('')
  const [hasName, setHasName] = useState(false)

  const [input, setInput] = useState('')
  const [dialog, setDialog] = useState({
    speaker: '정우',
    text: '오늘 뭐 하고 싶어?',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [choices, setChoices] = useState([
    { label: '학교 가자', value: '학교 가자' },
    { label: '카페 가자', value: '카페 가자' },
  ])
  const [characterEmotion, setCharacterEmotion] = useState('default')
  const [backgroundSrc, setBackgroundSrc] = useState('/bg_school.jpg')

  const handleSend = async () => {
    if (!input.trim() || isLoading) return
    setIsLoading(true)

    await new Promise((res) => setTimeout(res, 1000))

    const reply = await getGPTReply(input, userName)
    setDialog({ speaker: '정우', text: reply })
    setInput('')

    // 감정 추정 (간단 로직)
    if (reply.includes('ㅎㅎ') || reply.includes('좋아')) {
      setCharacterEmotion('smile')
    } else if (reply.includes('싫어') || reply.includes('짜증')) {
      setCharacterEmotion('angry')
    } else {
      setCharacterEmotion('default')
    }

    setIsLoading(false)
  }

  const handleChoiceSelect = async (choice) => {
    setChoices([])
    setIsLoading(true)

    const reply = await getGPTReply(choice.value, userName)
    setDialog({ speaker: '정우', text: reply })

    // 배경 & 감정 분기
    if (choice.value.includes('학교')) {
      setBackgroundSrc('/bg_school.jpg')
      setCharacterEmotion('smile')
      setChoices([
        { label: '교실로 들어간다', value: '교실로 들어간다' },
        { label: '옥상에 올라간다', value: '옥상에 올라간다' },
      ])
    } else if (choice.value.includes('카페')) {
      setBackgroundSrc('/bg_cafe.jpg')
      setCharacterEmotion('default')
      setChoices([
        { label: '커피를 시킨다', value: '커피를 시킨다' },
        { label: '창가 자리에 앉는다', value: '창가 자리에 앉는다' },
      ])
    } else if (choice.value.includes('옥상')) {
      setBackgroundSrc('/bg_rooftop.jpg')
      setCharacterEmotion('surprised')
    }

    setIsLoading(false)
  }

  // 초기화면: 이름 입력
  if (!hasName) {
    return (
      <div className="name-input-screen">
        <h2>이름을 입력해 주세요</h2>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="예: 재림"
        />
        <button
          onClick={() => {
            if (userName.trim()) setHasName(true)
          }}
        >
          시작하기
        </button>
      </div>
    )
  }

  // 본 게임 화면
  return (
    <div className="game-container">
      <Background src={backgroundSrc} />
      <Character emotion={characterEmotion} />
      <DialogBox speaker={dialog.speaker} text={dialog.text} />

      {choices.length > 0 && (
        <ChoiceBox choices={choices} onSelect={handleChoiceSelect} />
      )}

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
