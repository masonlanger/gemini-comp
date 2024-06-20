<script setup>
    import TitleParagraphWidget  from './TitleWidget.vue'
    import ThreeColumnCallout from './ThreeColumnCallout.vue'
</script>

<template>
    <div class="home">
        <TitleParagraphWidget title="Welcome to WritingThing" subtitle="AI-powered writing feedback based around you." />
        <br />
        <ThreeColumnCallout
            callout1="Emphasize Your Voice"
            image1="comment"
            callout2="Connect With Peers"
            image2="people-group"
            callout3="Present Your Best"
            image3="paper-plane"
            useIcons="true" 
        />
    </div>
</template>