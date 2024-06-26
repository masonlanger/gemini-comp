<script setup>
    import TitleParagraphWidget  from '../components/TitleWidget.vue'
    import ThreeColumnCallout from '../components/ThreeColumnCallout.vue'
    import LogInWidget from '../components/LogInWidget.vue'
    defineProps({
        loggedIn: Boolean
    })
</script>

<template>
    <div class="home">
        <TitleParagraphWidget title="Welcome to Fellow" subtitle="AI-powered writing feedback based around you." />
        <br />
        <br />
        <ThreeColumnCallout
            callout1="Emphasize Your Voice"
            image1="comment"
            desc1="Our Gemini-based model is trained to understand your unique writing style."
            callout2="Connect With Peers"
            image2="people-group"
            desc2="Network with other writers and share your work for feedback."
            callout3="Present Your Best"
            image3="paper-plane"
            desc3="Fulfill your writing potential with our extensive suite of tools."
            useIcons="true" 
        />
    </div>
</template>