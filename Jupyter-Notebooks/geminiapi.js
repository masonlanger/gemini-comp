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
      {text: "input: he door swung open, blistering wind followed at his back sweeping him in, a guiding hand, coarse and granular, firm in its dismissal of him from its bounds into the gypsum and linoleum of his home. Swinging round, turning from fore to aft the cabinetry lining the kitchen: backpack off, coat follows, pockets agape, detritus escaping, settling, respectively, against and under the fraying side of the couch."},
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
      {text: "input: In Gravity’s Rainbow, Thomas Pynchon explores the potential of the preterite within the Zone through valences of informational mercy provided to the preterite in and out of the Zone’s cerebral and physical bounds. For Roger Mexico there is only mercy in the math, a divine control of the rockets, scattering them indiscriminately, but at least predictable in the unpredictable places they will lay waste to either himself or swaths of the preterite. In the Zone, the waste of the pretetite’s past creates a mask of mercy in which the war’s offspring can exist, at least with some semblance of freedom, under the same hands that once oppressed them.For Mexico, his knowledge of distribution, and mathematically certainty in his poisson’s mapping of the rockets across London reprieves him from the psychological pain of the rockets destruction. The mercy of his math that only Mexico feels can be seen in his “priggish insensitivity” towards Pointman’s desire for cause and effect (57). Where Pointsman requires reasons to generate any sense of safety and provide himself mercy from the terror of the rockets, Mexico finds reason outside of continuity, entirely in his math, for his self-provided mercy. The crux of his mercy is his confidence in the poisson’s distribution that the rockets follow and the information it provides him, freeing him of the fear that any one rocket would be targeted where he inhabits. This though does little in shielding any singular member of the preterite in the waste of London as they are still ordered and “ruled off into 576 squares,” each one ordered by its location and observable for science (56). As Mexico toes the line of preterition and the Their machine, his self-provided informational mercy defines and determines how and where those of the rest of the preterite may die. His mathematical  “angel’s-eye view” is not so much that of mercy for others, but instead a visual definition that destines those of the preterite to an informational death, at least to Them, before they even have truly passed (55). They are cerebrally and physically bound within a system that knows they will die, provided a mercy only Mexico understands. Yet even that self-provided informational mercy is only induced through a sense of separation from the “statistical illiterates,” which is instantly complicated and made paradoxical by his love affair with Jessica, who he considers one of those statically illiterate members of the preterite (55). This tying of the two, and Mexico to the preterite (not one of the elite, but instead just one of their tools), places him within the “576 squares” as well, physically bound within the system, even if freed by his confidence in his information to live without the fear of the bombs. He is bound by the same system as all the rest, under the eyes and hands of Their power, no mercy besides math to protect him from the harbingers of death soaring through the sky.\tFor Slothrop and the Anubis their informational mercy is not self-derived, but instead born from the obfuscation provided by the byproducts, the waste, of war.  As the Anubis, carrying a collection of the preterite, passes through the Zone, it blends into the “flotsam from other theatres of war,” merging it, at least for the Russian observers, into the rest of the waste they pass over (497). The soldiers, as Mexico was, are the preterite observers of the rest of the preterite, but instead of definable and findable, mathematically separable, the post-war waste makes the Zone an amalgam in which no one thing can be defined.  This evinces a sense of hope for the Zone, as for once, Them, and their auxiliary limbs, cannot fully observe Slothrop and the preterite he inhabits. The visual incongruence of the preterite in the Zone generates the full informational mercy impossible for the preterite in defined spaces. The “endless simulation” they have become mirrors the paranoia faced by Slothrop onto Them for once, complicating their models; there is no singular poisson distribution for the Zone (497). For once the waste seems to control its own perception, but that security is not absolute as, “older scope hands … have come to understand distribution … they have learned a visual mercy” (497). They still can garner the information needed to distribute and winnow through the preterite, but that informational mercy is also extendable. This puts the fate of the preterite in the hands of the preterite-co-opted-by-Them, but will they serve the system so wholly as Mexico did (at least at the White Visitation)? They can sift and order the preterite as Mexico did, but the mercy they provide is onto the Anubis, onto others of the preterite, and not just to themselves. This further enforces the hope of the Zone, as even those under Their hand, acting as part of Them, no longer operate in the same wholly servile manner, instead maintaining motility in their decisions while participating in the system. \tThrough the evolving scope of informational mercy and its appliance from those-in-service-of-Them to the rest of the preterite, Pynchon illuminates the changing landscape of the Zone and the potentiality it holds for societal course correction. As They once tracked and controlled the impetus of death, those same merciless forces now have generated the very landscape from which the mercy extended to the Anubis and Tyrone Slothrop is found, a freedom generated from the random waste of their completed arcs."},
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