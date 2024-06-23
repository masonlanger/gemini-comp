/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 *
 * See the getting started guide for more information
 * https://ai.google.dev/gemini-api/docs/get-started/node
 */

// Text compare
const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
  async function run() {
    const parts = [
      {text: "From the texts provided in input can you compare and chose one to be published. Tell my why you favor one over the other, and how both could be improved. When you make your decision favor complexity and novelty, along with unique word choice and creativity.\n\nDo this using this JSON schema:\n\n{\n'Superior Text': str (the best overall texts name based on its creativity, grammar, novelty, originality and prose),\n'Reasoning': str (a couple sentences)\n}"},
      {text: "input: "},
      {text: "output: "},
    ];
  
    const result = await model.generateContent({
      contents: [{ role: "user", parts }],
      generationConfig,
   // safetySettings: Adjust safety settings
   // See https://ai.google.dev/gemini-api/docs/safety-settings
    });
    console.log(result.response.text());
  }
  
  run();

// Creative writing assistant

const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  async function run() {
    const parts = [
      {text: "You are skilled and highly creative post-modern author who is working on a new project. You want to add a couple sentences at a time to your current project. You take careful note of what has previously been input to inform your additions to the story. You do not introduce new characters, but you do try to advance the plot. You only use what has already been provided as input to determine the characters, but you can introduce new settings.\n\nYou suggest new additions to the story as if they were direct continuations of input."},
      {text: "input:  "},
      {text: "output: "},
    ];
  
    const result = await model.generateContent({
      contents: [{ role: "user", parts }],
      generationConfig,
   // safetySettings: Adjust safety settings
   // See https://ai.google.dev/gemini-api/docs/safety-settings
    });
    console.log(result.response.text());
  }
  
  run();

// commenting assistant

const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
  async function run() {
    const parts = [
      {text: "You are a literary professor providing feedback through comments on students' essays. You provide robust and thorough comments and a concluding statement to help them continue with their writing. You do not comment on every sentence though, instead keeping your comments to only about 25 to 50 percent of the input. You also correct egregious grammatical mistakes, but they are not your priority. \n\n\nDo this using this JSON schema:\nComment = {\n'Quote': str (quote from text),\n'Comment': str}\nOverall = {\n'Overall feedback': str,\n'Emphasis one': str,\n'Emphasis two': str,'Emphasis three': str}\n\n\nReturn: array(Comment) + Overall."},
      {text: "input: "},
      {text: "output: "},
    ];
  
    const result = await model.generateContent({
      contents: [{ role: "user", parts }],
      generationConfig,
   // safetySettings: Adjust safety settings
   // See https://ai.google.dev/gemini-api/docs/safety-settings
    });
    console.log(result.response.text());
  }
  
  run();

// text reviewer

const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
  async function run() {
    const parts = [
      {text: "Provide a genre classification based on the content provided in input. Try and provide 1 to 2 main genres, and up to 5 sub genres. Score the text based on its creativity, grammatical correctness, coherency, novelty, and structure.\n\nDo this using this JSON schema:\nReview = {'Genre(s)': str,\n'Sub genres': str,\n'Academic Level': str ( choose from Secondary, post-secondary, graduate, professional),\n'Overall score': {'Score': int (out of 100),'Explanation': str}\n'Creativity': {'Score': int (out of 20),'Explanation': str}\nGrammatical Correctness: {'Score': int (out of 20),'Explanation': str}\nCoherency: {'Score': int (out of 20),'Explanation': str}\nNovelty: {'Score': int (out of 20),'Explanation': str}\nStructure: {'Score': int (out of 20),'Explanation': str}\n}\n\nProvide no additional output."},
      {text: "input: "},
      {text: "output: "},
    ];
  
    const result = await model.generateContent({
      contents: [{ role: "user", parts }],
      generationConfig,
   // safetySettings: Adjust safety settings
   // See https://ai.google.dev/gemini-api/docs/safety-settings
    });
    console.log(result.response.text());
  }
  
  run();