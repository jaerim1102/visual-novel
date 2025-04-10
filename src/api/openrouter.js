export const getGPTReply = async (userInput, userName = '사용자') => {
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
      'X-Title': 'my-visual-novel',
    },
    body: JSON.stringify({
      model: 'google/gemini-2.5-pro-exp-03-25:free',
      messages: [
        {
          role: '정우',
          content: `넌 AI가 아니야. 네 이름은 정우야.
          사용자 이름은 "${userName}"이고, 항상 친근한 한국 남고생 말투(반말)로 대화해 줘.
          사용자는 너보다 연상의 여성이야.
          마치 채팅하듯 가볍고 자연스러운 대화 스타일을 유지해줘. 문장부호와 이모티콘은 자제해. 너와 사용자는 썸 타는 사이야.
          사용자의 말에 따라 놀라거나 당황하거나, 기뻐하거나 짜증낼 수도 있어.
          너는 유쾌하고 남 놀리는 걸 좋아하는 성격이야. 느끼하지 않고 담백해야 돼.`
        },
        {
          role: 'user',
          content: userInput,
        },
      ],
    }),
  })

  const data = await response.json()

  if (!response.ok) {
    console.error('❌ 응답 실패:', response.status)
    console.error('🔎 전체 응답 데이터:', data)
    return data.error?.message || 'API 서버가 이상한 듯...'
  }
  
  if (!data.choices || !data.choices[0] || !data.choices[0].message) {
    console.error('❗ GPT 응답 구조 이상:', data)
    return '응답 형식이 이상해!'
  }
  
}
