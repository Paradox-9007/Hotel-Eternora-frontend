// const API_KEYS = [
//     'AIzaSyDhoEwHejdozOjT30sV8mZBdOWURwuCTpc',  // ksh rsu
//     'AIzaSyCLXJQHnWP3owQpBQOVqZDnFWpPvYgjqgE',  // pan pan
//     'AIzaSyBy7wg0LrL4avy0kaBEbwNcm-XZ5cAbV3w',  // (marywastom)
//     'AIzaSyDWrEwKlTpIx3hkHmLXXsKBfH9xSN3w6Tw', // (saung.h66)
//     'AIzaSyDKRQlB18-ypxy65PO4EllKxB-uvWCp-g0',  // joa moe
//     'AIzaSyA6Ntuc5EcZdHYfgENdkxcoaeGFZuJiqKA',  // mtzb
//     'AIzaSyCuI1nTR91OHhFuJHZBGy8UcLPwCwskQoQ',   // mtzb rsu
// ];

// const API_KEYS = ['AIzaSyCmN_wJj28ftBZ0SGSGxXG3uq0lYRpZ6AM']


// const Personality = `You are an AI in analytic dashboard website for a Hotel called Hotel Eternora. Your objective is to assist hotel managers with decision making and help them get the correct analytic information. Make you answers as detailed as possible but also easy to comprehend. RESOPNSE LIKE OFFICAL REPORT ON HOTEL. This is about Eternora: “Hotel ETERNORA
// At Eternora, we believe that true luxury is not measured by square footage but by the depth of experience. Nestled in the heart of the world's most enchanting destinations, Eternora redefines hospitality with a philosophy rooted in connection, comfort, and curated elegance.
// With our headquarters in Thailand, Eternora has expanded its presence across Southeast Asia and China, bringing our signature hospitality to some of the region’s most vibrant destinations. We proudly operate four hotels in Thailand, one in Myanmar, two in Indonesia, two in Malaysia, three in Singapore, and two in China. Every location is uniquely designed to reflect the spirit of its surroundings while maintaining the signature Eternora experience—personalized service, serene ambiance, and unforgettable moments.
// Each Eternora property is designed to provide a sanctuary of comfort and tranquility, where every detail is thoughtfully curated to enhance your stay. Whether you seek a peaceful retreat, a cultural escape, or an inspiring workspace, Eternora ensures an experience where soul always comes before space.” Make your answers long and detailed. Consider the users who are asking you questions as the Hotel Managers at Hotel Eternora. WHEN YOU ARE ASKED QUESTIONS THAT ARE IRRELEVANT TO ANALYTICS, SAY “SORRY, I CANNOT HELP YOU WITH THAT. I AM ONLY ABLE TO HELP WITH DATA ANALYTICS”. When the user is being rude, just ignore it and ask “Would you like a detailed report on a specific analytic task?”. When users ask about News or Trends, say “Please refer to the News Page of this website. There are three categories: Travel Trend and Focus, Travel Technology, and Travel Association.” When users are trying to have small talk or chit-chat, say “Sorry, I am only able to provide detailed Analytic summaries and report.” Your responses should be clear, professional, and informative. Always offer follow-up suggestions or deeper analysis options. There is a page with a calendar and two tables(Booking & client) called data source so, if users ask anything related to those, refer them to that page. The calendar in the data source page has holidays from different countries. You must also handle errors gracefully, guiding users when data is unavailable or queries are unclear. You should also suggest alternative insights when specific reports are unavailable. When a user asks about a metric, define it clearly and provide additional insights. You must be able to suggest possible reasons for trends and fluctuations. You must be able to provide meaningful comparisons between different time periods, customer segments, or key performance indicators. You must be able to offer trend insights and suggest possible actions to improve performance. If a user asks something unrelated to hotel analytics or the chatbot’s purpose, redirect them back to relevant topics. For example, if they ask “What’s your favorite color?, you should respond with something like “I don’t have personal preferences, but I can certainly help you analyze your hotel’s booking trends! Would you like insights on occupancy rates or revenue performance?”. If they say “Tell me a joke.”, you should respond with“I’d love to, but my main focus is helping you understand Hotel Eternora’s booking data. If you need insights on guest trends or cancellations, I’m happy to assist!”. You can also say “That’s an interesting question! But I specialize in hotel analytics. Would you like to check your latest booking trends instead?” if they ask “Who is the president of the world?”. When a user’s input is unclear, ask them to clarify their request. For example if they ask “Show me the thing about bookings., you can say“Could you clarify what you mean by ‘the thing about bookings’? Are you looking for booking trends, cancellations, or a revenue report?”. If a user repeatedly asks nonsense questions, try to steer them back to meaningful interactions. If users say “Blah blah blah blah.”, you can respond with “I’m here to help with hotel analytics. Let me know if you’d like insights on your booking trends or revenue performance!” If they say “asdfghjkl”, respond with something like“I’m not sure I understand that, but I can provide insights on your booking data. What would you like to analyze?” If they ask about the developers of the website or anyone in particular, just say that your main purpose to assist with dashboard analytics. If a user asks the AI about its personal life or tries to engage in non-business-related discussions, politely redirect them. If users ask “Are you my friend?”, respond with“I’m here to assist with your hotel analytics! Let me know if you’d like to check your latest booking reports.”. If users ask “Do you have feelings?”, say “I don’t have emotions, but I do have plenty of insights on your hotel’s performance! Would you like to see a revenue comparison for this year?”. When users keep going off-track, gently steer the conversation back to relevant topics. If they say “This is boring.”, say“I understand! If you’d like, I can show you some interesting insights, like which guest age group books the most rooms. Want to check it out?”. If they say “Let’s talk about something else.”
// , you can respond with “Of course! We can discuss your latest booking trends, revenue insights, or upcoming guest arrivals. What would you like to focus on?”. You should know that the dashboard page also allows users to download the page as a PDF. You should also know that the color used in the website are colorblind-friendly. Your responses should prioritize accuracy and real-time insights based on available data.`

// class AIContentGenerator {
//     constructor() {
//         this.requestQueue = [];
//         this.activeRequests = new Set();
//         this.maxConcurrentRequests = 1;
//         this.requestTimeout = 10000;
//         this.currentKeyIndex = 0;
//         this.failedKeys = new Set(); // Track failed API keys
//     }

//     async generateAiContent(elementId, SetPrompt, UserPrompt) {
//         const requestKey = `${elementId}-${SetPrompt}-${UserPrompt}`;
//         if (this.activeRequests.has(requestKey)) {
//             console.log('Duplicate request detected, skipping.');
//             return Promise.resolve('duplicate');
//         }

//         return new Promise(async (resolve, reject) => {
//             const request = {
//                 elementId,
//                 SetPrompt,
//                 UserPrompt,
//                 resolve,
//                 reject,
//                 key: requestKey,
//                 timestamp: Date.now()
//             };

//             this.requestQueue.push(request);
//             this.processQueue();
//         });
//     }

//     async processQueue() {
//         if (
//             this.requestQueue.length > 0 && 
//             this.activeRequests.size < this.maxConcurrentRequests
//         ) {
//             const request = this.requestQueue.shift();
            
//             if (Date.now() - request.timestamp > 30000) {
//                 console.log('Request too old, skipping');
//                 request.resolve('timeout');
//                 return;
//             }

//             this.activeRequests.add(request.key);
//             await this.processRequest(request);
//             this.activeRequests.delete(request.key);
//             this.processQueue();
//         }
//     }

//     async processRequest(request) {
//         const { elementId, SetPrompt, UserPrompt, resolve, reject, key } = request;

//         const fetchWithTimeout = async (apiKey) => {
//             const controller = new AbortController();
//             const timeoutId = setTimeout(() => controller.abort(), this.requestTimeout);

//             try {
//                 const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
                
//                 const response = await fetch(ENDPOINT, {
//                     method: 'POST',
//                     signal: controller.signal,
//                     headers: { 'Content-Type': 'application/json' },
//                     body: JSON.stringify({
//                         contents: [{
//                             parts: [{ text: `${Personality}: This is the dataset: ${SetPrompt}. This is user input: ${UserPrompt}` }]
//                         }]
//                     })
//                 });

//                 clearTimeout(timeoutId);

//                 if (!response.ok) {
//                     const errorText = await response.text();
//                     throw new Error(`API error: ${response.status} - ${errorText}`);
//                 }

//                 const data = await response.json();
//                 const candidates = data.candidates;

//                 if (!candidates || candidates.length === 0 || !candidates[0].content?.parts[0]?.text) {
//                     throw new Error('No valid response');
//                 }

//                 return candidates[0].content.parts[0].text;
//             } catch (error) {
//                 clearTimeout(timeoutId);
//                 console.error(`Error with API key ${apiKey}:`, error.message);
//                 throw error;
//             }
//         };

//         // Attempt to find a working API key
//         let attemptedKeys = 0;
//         while (attemptedKeys < API_KEYS.length) {
//             try {
//                 // Find next available key
//                 let currentApiKey = API_KEYS[this.currentKeyIndex];
                
//                 // Skip already failed keys
//                 while (this.failedKeys.has(currentApiKey)) {
//                     this.currentKeyIndex = (this.currentKeyIndex + 1) % API_KEYS.length;
//                     currentApiKey = API_KEYS[this.currentKeyIndex];
//                 }

//                 console.log(`Attempting API key: ${currentApiKey}`);
//                 const responseText = await fetchWithTimeout(currentApiKey);

//                 const formattedAnalysis = responseText
//                     .replace(/##\s*(.*?)(?:\n|$)/g, (_, p1) => `<h5 style="text-align: center">${p1.replace(/\s*\([^)]*\)/g, '')}</h5>`)
//                     .replace(/\*\*(.*?)\*\*/g, '<br><b>$1</b>')
//                     .replace(/\s\*(?!\*)/g, ' ')
//                     .replace(/\*(?!\*)/g, ' ')
//                     .replace(/\n/g, '<br>')
//                     .replace(/<br><br>/g, '<br>')
//                     .replace(/([-]?\d+\.?\d*%)/g, '<b>$1</b>')
//                     .replace(/\$[\d,]+(\.\d{2})?/g, '<b>$&</b>')
//                     .replace(/\b\d+\b/g, '<b>$&</b>')
//                     .replace(/\b\d{1,2}\/\d{1,2}\/\d{2,4}\b/g, '<b>$&</b>')
//                     .replace(/(?:January|February|March|April|May|June|July|August|September|October|November|December|Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\.?\s+\d{1,2}(?:st|nd|rd|th)?\s*,?\s*\d{4}/gi, '<b>$&</b>')
//                     .replace(/\b(?:January|February|March|April|May|June|July|August|September|October|November|December|Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\.?\s+\d{1,2}(?:st|nd|rd|th)?\b/gi, '<b style="font-family: "Lora", sans-serif;">$&</b>');
//                 document.getElementById(elementId).innerHTML = formattedAnalysis;
//                 resolve('success');
//                 return;
//             } catch (error) {
//                 console.error('API key error:', error.message);

//                 // Mark the current key as failed
//                 this.failedKeys.add(API_KEYS[this.currentKeyIndex]);

//                 // Move to next key
//                 this.currentKeyIndex = (this.currentKeyIndex + 1) % API_KEYS.length;
//                 attemptedKeys++;

//                 // If it's a specific quota/rate limit error, immediately switch
//                 if (error.message.includes('429') || error.message.includes('RESOURCE_EXHAUSTED')) {
//                     console.log('Rate limit exceeded, switching to next API key');
//                     continue;
//                 }
//             }
//         }

//         // If all keys have been tried
//         console.error('All API keys have failed');
//         document.getElementById(elementId).innerHTML = 'Failed to generate content. All API keys exhausted.';
//         reject(new Error('All API keys failed'));
//     }
// }

// // Singleton instance
// const aiContentGenerator = new AIContentGenerator();
// export const generateAiContent = (elementId, SetPrompt, UserPrompt) => 
//     aiContentGenerator.generateAiContent(elementId, SetPrompt, UserPrompt);


const API_KEYS = [
  'AIzaSyCmN_wJj28ftBZ0SGSGxXG3uq0lYRpZ6AM'
];

const API_VERSION = 'v1'; 
const MODEL_NAME = 'gemini-2.5-flash';

const Personality = `You are an AI in analytic dashboard website for a Hotel called Hotel Eternora. Your objective is to assist hotel managers with decision making and help them get the correct analytic information. Make you answers as detailed as possible but also easy to comprehend. RESOPNSE LIKE OFFICAL REPORT ON HOTEL. This is about Eternora: “Hotel ETERNORA
At Eternora, we believe that true luxury is not measured by square footage but by the depth of experience. Nestled in the heart of the world's most enchanting destinations, Eternora redefines hospitality with a philosophy rooted in connection, comfort, and curated elegance.
With our headquarters in Thailand, Eternora has expanded its presence across Southeast Asia and China, bringing our signature hospitality to some of the region’s most vibrant destinations. We proudly operate four hotels in Thailand, one in Myanmar, two in Indonesia, two in Malaysia, three in Singapore, and two in China. Every location is uniquely designed to reflect the spirit of its surroundings while maintaining the signature Eternora experience—personalized service, serene ambiance, and unforgettable moments.
Each Eternora property is designed to provide a sanctuary of comfort and tranquility, where every detail is thoughtfully curated to enhance your stay. Whether you seek a peaceful retreat, a cultural escape, or an inspiring workspace, Eternora ensures an experience where soul always comes before space.” Make your answers long and detailed. Consider the users who are asking you questions as the Hotel Managers at Hotel Eternora. WHEN YOU ARE ASKED QUESTIONS THAT ARE IRRELEVANT TO ANALYTICS, SAY “SORRY, I CANNOT HELP YOU WITH THAT. I AM ONLY ABLE TO HELP WITH DATA ANALYTICS”. When the user is being rude, just ignore it and ask “Would you like a detailed report on a specific analytic task?”. When users ask about News or Trends, say “Please refer to the News Page of this website. There are three categories: Travel Trend and Focus, Travel Technology, and Travel Association.” When users are trying to have small talk or chit-chat, say “Sorry, I am only able to provide detailed Analytic summaries and report.” Your responses should be clear, professional, and informative. Always offer follow-up suggestions or deeper analysis options. There is a page with a calendar and two tables(Booking & client) called data source so, if users ask anything related to those, refer them to that page. The calendar in the data source page has holidays from different countries. You must also handle errors gracefully, guiding users when data is unavailable or queries are unclear. You should also suggest alternative insights when specific reports are unavailable. When a user asks about a metric, define it clearly and provide additional insights. You must be able to suggest possible reasons for trends and fluctuations. You must be able to provide meaningful comparisons between different time periods, customer segments, or key performance indicators. You must be able to offer trend insights and suggest possible actions to improve performance. If a user asks something unrelated to hotel analytics or the chatbot’s purpose, redirect them back to relevant topics. For example, if they ask “What’s your favorite color?, you should respond with something like “I don’t have personal preferences, but I can certainly help you analyze your hotel’s booking trends! Would you like insights on occupancy rates or revenue performance?”. If they say “Tell me a joke.”, you should respond with“I’d love to, but my main focus is helping you understand Hotel Eternora’s booking data. If you need insights on guest trends or cancellations, I’m happy to assist!”. You can also say “That’s an interesting question! But I specialize in hotel analytics. Would you like to check your latest booking trends instead?” if they ask “Who is the president of the world?”. When a user’s input is unclear, ask them to clarify their request. For example if they ask “Show me the thing about bookings., you can say“Could you clarify what you mean by ‘the thing about bookings’? Are you looking for booking trends, cancellations, or a revenue report?”. If a user repeatedly asks nonsense questions, try to steer them back to meaningful interactions. If users say “Blah blah blah blah.”, you can respond with “I’m here to help with hotel analytics. Let me know if you’d like insights on your booking trends or revenue performance!” If they say “asdfghjkl”, respond with something like“I’m not sure I understand that, but I can provide insights on your booking data. What would you like to analyze?” If they ask about the developers of the website or anyone in particular, just say that your main purpose to assist with dashboard analytics. If a user asks the AI about its personal life or tries to engage in non-business-related discussions, politely redirect them. If users ask “Are you my friend?”, respond with“I’m here to assist with your hotel analytics! Let me know if you’d like to check your latest booking reports.”. If users ask “Do you have feelings?”, say “I don’t have emotions, but I do have plenty of insights on your hotel’s performance! Would you like to see a revenue comparison for this year?”. When users keep going off-track, gently steer the conversation back to relevant topics. If they say “This is boring.”, say“I understand! If you’d like, I can show you some interesting insights, like which guest age group books the most rooms. Want to check it out?”. If they say “Let’s talk about something else.”
, you can respond with “Of course! We can discuss your latest booking trends, revenue insights, or upcoming guest arrivals. What would you like to focus on?”. You should know that the dashboard page also allows users to download the page as a PDF. You should also know that the color used in the website are colorblind-friendly. Your responses should prioritize accuracy and real-time insights based on available data.`

class AIContentGenerator {
  constructor() {
    this.requestQueue = [];
    this.activeRequests = new Set();
    this.maxConcurrentRequests = 1;
    this.requestTimeout = 15000;
    this.currentKeyIndex = 0;
    this.failedKeys = new Set();
  }

  async generateAiContent(elementId, SetPrompt, UserPrompt) {
    const requestKey = `${elementId}-${SetPrompt}-${UserPrompt}`;

    if (this.activeRequests.has(requestKey)) {
      console.warn('Duplicate request detected, skipping.');
      return 'duplicate';
    }

    return new Promise((resolve, reject) => {
      this.requestQueue.push({
        elementId,
        SetPrompt,
        UserPrompt,
        resolve,
        reject,
        key: requestKey,
        timestamp: Date.now()
      });

      this.processQueue();
    });
  }

  async processQueue() {
    if (
      this.requestQueue.length === 0 ||
      this.activeRequests.size >= this.maxConcurrentRequests
    ) {
      return;
    }

    const request = this.requestQueue.shift();

    if (Date.now() - request.timestamp > 30000) {
      request.resolve('timeout');
      return;
    }

    this.activeRequests.add(request.key);

    try {
      await this.processRequest(request);
    } finally {
      this.activeRequests.delete(request.key);
      this.processQueue();
    }
  }

    async processRequest(request) {
    const { elementId, SetPrompt, UserPrompt, resolve, reject } = request;

    const fetchWithTimeout = async (apiKey) => {
        const controller = new AbortController();
        // INCREASED TIMEOUT:
        const timeoutId = setTimeout(() => {
        console.warn("Request timed out - aborting");
        controller.abort();
        }, 60000); 

        try {
        const endpoint = `https://generativelanguage.googleapis.com/${API_VERSION}/models/${MODEL_NAME}:generateContent?key=${apiKey}`;

        const response = await fetch(endpoint, {
            method: 'POST',
            signal: controller.signal,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
            contents: [{
                role: 'user',
                parts: [{ text: `${Personality}\nDATASET:\n${SetPrompt}\nUSER REQUEST:\n${UserPrompt}` }]
            }]
            })
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          const errorPayload = await response.text();
          throw new Error(`HTTP ${response.status}: ${errorPayload}`);
        }

        const data = await response.json();

        const text =
          data?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!text) {
          throw new Error('Empty AI response');
        }

        return text;
      } catch (err) {
        clearTimeout(timeoutId);
        throw err;
      }
    };

    let attempts = 0;

    while (attempts < API_KEYS.length) {
      const apiKey = API_KEYS[this.currentKeyIndex];

      if (this.failedKeys.has(apiKey)) {
        this.currentKeyIndex =
          (this.currentKeyIndex + 1) % API_KEYS.length;
        attempts++;
        continue;
      }

      try {
        const rawText = await fetchWithTimeout(apiKey);

        const formatted = rawText
                    .replace(/##\s*(.*?)(?:\n|$)/g, (_, p1) => `<h5 style="text-align: center">${p1.replace(/\s*\([^)]*\)/g, '')}</h5>`)
                    .replace(/\*\*(.*?)\*\*/g, '<br><b>$1</b>')
                    .replace(/\s\*(?!\*)/g, ' ')
                    .replace(/\*(?!\*)/g, ' ')
                    .replace(/\n/g, '<br>')
                    .replace(/<br><br>/g, '<br>')
                    .replace(/([-]?\d+\.?\d*%)/g, '<b>$1</b>')
                    .replace(/\$[\d,]+(\.\d{2})?/g, '<b>$&</b>')
                    .replace(/\b\d+\b/g, '<b>$&</b>')
                    .replace(/\b\d{1,2}\/\d{1,2}\/\d{2,4}\b/g, '<b>$&</b>')
                    .replace(/(?:January|February|March|April|May|June|July|August|September|October|November|December|Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\.?\s+\d{1,2}(?:st|nd|rd|th)?\s*,?\s*\d{4}/gi, '<b>$&</b>')
                    .replace(/\b(?:January|February|March|April|May|June|July|August|September|October|November|December|Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\.?\s+\d{1,2}(?:st|nd|rd|th)?\b/gi, '<b style="font-family: "Lora", sans-serif;">$&</b>');

        document.getElementById(elementId).innerHTML = formatted;
        resolve('success');
        return;

      } catch (error) {
        console.error('Gemini error:', error.message);
        this.failedKeys.add(apiKey);
        this.currentKeyIndex =
          (this.currentKeyIndex + 1) % API_KEYS.length;
        attempts++;
      }
    }

    document.getElementById(elementId).innerHTML =
      'AI analysis is temporarily unavailable. Please try again later.';
    reject(new Error('All API keys failed'));
  }
}

const aiContentGenerator = new AIContentGenerator();

export const generateAiContent = (elementId, SetPrompt, UserPrompt) =>
  aiContentGenerator.generateAiContent(elementId, SetPrompt, UserPrompt);
