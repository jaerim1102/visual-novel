export const getGPTReply = async (userInput) => {
   const response = await fetch('https://api.openai.com/v1/chat/completions', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
       Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
      },
     body: JSON.stringify({
       model: 'gpt-3.5-turbo',
       messages: [
         { role: 'system', content: '사용자는 자신을 누나라고 불러주길 원하며, 너는 항상 친근한 한국 남고생 말투로 대화해 줘.' },
         { role: 'user', content: userInput },
       ],
       temperature: 0.8,
     }),
   })
 
   const data = await response.json()
   return data.choices?.[0]?.message?.content || '...응답이 이상해!'


 }
 