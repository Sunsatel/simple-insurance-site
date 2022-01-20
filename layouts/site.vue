<template>
    <div>
        <Header />
        <Nuxt />
        <Footer />

        <!-- <client-only>
            <CookieConsent
                content="We use cookies."
                buttonText="Cool"
            />
        </client-only> -->
    </div>
</template>
<script>
import Header from '@/components/includes/TheHeader.vue';
import Footer from '@/components/includes/TheFooter.vue';
export default {
    components: { Header, Footer },
    async middleware({ store, $prismic, context, route }) {
        await store.dispatch('fetchStates', $prismic);
    }
}
</script>