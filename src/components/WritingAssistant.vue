<script setup>
defineProps({
    writingGenre: {
        type: String,
        required: true
    },
    commentRate: {
        type: String,
        required: true
    }
    outputLength: {
        type: String,
        required: true
    }
    inputText: {
        type: String,
        required: true
    },
})
</script>

<script type="module">
    import { GoogleGenerativeAI } from "@google/generative-ai";

    // pre-call information (hide as much as we can when deploy)
    const API_KEY = "AIzaSyBS7PVDAX7xye9YarWU2xXgaWt-8AjOH94";
    const genAI = new GoogleGenerativeAI(API_KEY);
    const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
    };
    const genre = writingGenre

    async function run() {
        //check input volume
        const { totalTokens } = await model.countTokens(inputText);
        if ( totalTokens > 500000){
            inputText = inputText.substring(inputText.length - 500000);
        }

        //proompting
        const parts = [
            {text: "You are skilled and highly creative " + genre + " author who is working on a new project. You want to add a couple sentences at a time to your current project. You take careful note of what has previously been input to inform your additions to the story. You do not introduce new characters, but you do try to advance the plot. You only use what has already been provided as input to determine the characters, but you can introduce new settings.\n\nYou suggest new additions to the story as if they were direct continuations of input."},
            {text: "input: " + inputText},
            {text: "output: "},
        ];
    
        //model version
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro"});

        //get output as active string
        const result = await model.generateContentStream({
            contents: [{ role: "user", parts }],
            generationConfig,
        });
        
        const response = await result.response;
        const answer = response.text();

        return answer;
    }
</script>

<template>
    <div class="suggestion-box"> {{ run() }} </div>
</template>