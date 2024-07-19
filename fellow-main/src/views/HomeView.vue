<script setup>
    import TitleParagraphWidget  from '../components/TitleWidget.vue'
    import ThreeColumnCallout from '../components/ThreeColumnCallout.vue'
    import { ref } from 'vue';
    defineProps({
        loggedIn: Boolean
    })
    
    const calloutView = ref('writer');
    function toggleCallout(callout) {
        calloutView.value = callout;
    }
</script>


<template>
    <div class="home">
        <TitleParagraphWidget title="Welcome to Fellow" subtitle="AI-powered writing feedback based around you." />
        <br />
        <div class="text-center w-full">
            <div class="row space-x-4 w-full justify-center">
                <div @click="toggleCallout('writer')" v-if="calloutView == 'writer'" class="border-bottom p-2 hoverable text-lg">
                    <span>Writers</span>
                </div>
                <div @click="toggleCallout('writer')" v-else class="p-2 hoverable text-lg">
                    <span>Writers</span>
                </div>

                <div @click="toggleCallout('publisher')" v-if="calloutView == 'publisher'" class="border-bottom p-2 hoverable text-lg">
                    <span>Publishers</span>
                </div>
                <div @click="toggleCallout('publisher')" v-else class="p-2 hoverable text-lg">
                    <span>Publishers</span>
                </div>
            </div>
                <ThreeColumnCallout v-if="calloutView === 'writer'"
                    callout1="Emphasize Your Voice"
                    image1="comment"
                    desc1="Our Gemini-based model is trained to understand your unique writing style."
                    callout2="Connect With Peers"
                    image2="people-group"
                    desc2="Network with other writers and share your work for feedback."
                    callout3="Present Your Best"
                    image3="paper-plane"
                    desc3="Fulfill your writing potential with our extensive suite of tools."
                    :useIcons=true 
                />
                <ThreeColumnCallout v-else 
                    callout1="Find Talent Fast"
                    image1="search"
                    desc1="Find talented writers fast with our Gemini-powered submittables"
                    callout2="Streamline Your Workflow"
                    image2="cog"
                    desc2="Use our tools to manage submissions and streamline your workflow"
                    callout3="Discover New Voices"
                    image3="globe"
                    desc3="Find new writers and voices to bring to your audience"
                    :useIcons=true
                />
        </div>
    </div>
</template>