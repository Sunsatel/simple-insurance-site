<template>
    <header class="header">
        <section class="content">
            <nuxt-link to="/">
                <PrismicImage :img="this.$store.state.settings.logo" h="50" />
            </nuxt-link>

            <nav class="menu" id="menu" :class="{ active: active }">
                <ul>
                    <li v-for="(iterator, index) in $store.state.navigation.body" :key="`naviterator${index}`">
                        <template v-if="iterator.slice_type == 'drop_down1'">
                            <a href="#">{{ iterator.primary.navbar_text }}</a>
                            <ul class="dropdown">
                                <li v-for="(insurance, jindex) in $store.state.insurances" :key="`navinsurance${jindex}`">
                                    <nuxt-link :to="$prismic.linkResolver(insurance)">{{insurance.data.title}}</nuxt-link>
                                </li>
                            </ul> 
                        </template>
                        <template v-else-if="iterator.slice_type == 'drop_down'">
                            <a href="#">{{ iterator.primary.navbar_text }}</a>
                            <ul class="dropdown">
                                <li v-for="(jiterator, jindex) in iterator.items" :key="`navinsurance${jindex}`">
                                    <nuxt-link :to="$prismic.linkResolver(jiterator.link_item)">{{jiterator.link_text}}</nuxt-link>
                                </li>
                            </ul> 
                        </template>
                        <template v-else-if="iterator.slice_type == 'link'">
                            <nuxt-link :to="$prismic.linkResolver(iterator.primary.link_item)">{{ iterator.primary.link_text }}</nuxt-link>
                        </template>
                    </li>
                </ul>
            </nav>
            <div class="menu-toggle" id="menu-toggle"><i class="fa fa-bars" @click="toggle();"></i></div>
        </section>
    </header>
</template>
<script>
    export default {
        data() {
            return {
                active: false
            }
        },
        methods: {
            toggle() {
                this.active = !this.active;
            }
        },
        watch: {
            '$route' () {
                this.active = false;
            }
        }
    }
</script>
