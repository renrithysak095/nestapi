const { GoogleGenerativeAI } = require("@google/generative-ai");
// User input Prompt
export async function getInput(prompt){
    const genAI = new GoogleGenerativeAI('AIzaSyD7WWk5s6ja_mRXGmwm5YUJgl-VaqYPe2E');
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
}

module.exports = getInput;


