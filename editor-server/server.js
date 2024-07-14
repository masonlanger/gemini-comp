import express from "express";
import cors from "cors";
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";

const app = express();
app.use(cors())
const port = 8081;

const apiKey = "AIzaSyB7dxK35XJ8ssFVczqyu_QtptHTzA1YgtQ";
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro",
    systemInstruction: "You are skilled and highly creative post-modern author who is working on a new "
                + "project. You want to add two to six sentences at a time to your current project. " 
                + "You take careful note of what has previously been input to inform your additions "
                + "to the story. You do not introduce new characters, but you do try to advance the "
                + "plot. You only use what has already been provided as input to determine the "
                + "characters, but you can introduce new settings. You suggest new additions to "
                + "the story as if they were direct continuations of input without retyping what " 
                + "you've already wrote. Do not add any newlines after your output",
  });

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};

const safetySettings = [
    {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
];

async function getSuggestion(userText) {
    // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-pro",
        systemInstruction: "You are skilled and highly creative post-modern author who is working on a new "
                        + "project. You want to add two to six sentences at a time to your current project. " 
                        + "You take careful note of what has previously been input to inform your additions "
                        + "to the story. You do not introduce new characters, but you do try to advance the "
                        + "plot. You only use what has already been provided as input to determine the "
                        + "characters, but you can introduce new settings. You suggest new additions to "
                        + "the story as if they were direct continuations of input without retyping what " 
                        + "you've already wrote. Do not add any newlines after your output",
    });
  
    const result = await model.generateContent(userText, generationConfig, safetySettings)
    const response = await result.response;
    const suggestText = response.text();
    
    return suggestText;
  }
  


app.get('/suggest', (req, res) => {
    const text = req.query.text;
    let suggest = getSuggestion(text);

    console.log(suggest)

    return res.json({ suggestion: suggest });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});