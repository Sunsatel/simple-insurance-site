<template><footer class="footer">

        <div class="content">

            <div class="box">
                &copy; 2016–2020 <strong>Veloxia AB</strong>
                <p>Veloxia AB tillhandahåller ett flertal prisjämförelsetjänster på nätet.</p>
            </div>

            <div class="box">
                <strong>Recensioner</strong>
                <nuxt-link v-for="(insurance, index) in $store.state.insurances" :key="`footerinsurance${index}`" :to="$prismic.linkResolver(insurance)">{{insurance.data.title}}</nuxt-link>
            </div>

            <div class="box" v-if="$store.state.posts.length">
                <strong>Nyheter</strong>
                <nuxt-link v-for="(post, index) in $store.state.posts" :key="`footerpost${index}`" :to="$prismic.linkResolver(post)">{{post.data.h1}}</nuxt-link>
            </div>

            <div class="box">
                <strong>För användare</strong>
                <nuxt-link v-for="(iterator, index) in $store.state.settings.footer_for_users" :key="`footerforusers${index}`" :to="$prismic.linkResolver(iterator.link_item)">{{iterator.link_text}}</nuxt-link>
            </div>


        </div>

        <div class="bottom">
            <span>Org.nr.<strong>559038-4052</strong></span>
            <span>Adress<strong>Tideliusgatan 54, 118 69 Stockholm</strong></span>
            <span>Momsreg.nr.<strong>SE559038-405201</strong></span>
            <span>Telefonnummer<strong itemprop="telephone">08 – 520 275 95</strong></span>
            <span>E-postadress<strong>info@veloxia.se</strong></span>
        </div>

    </footer>
</template>
<script>
    export default {}
</script>
