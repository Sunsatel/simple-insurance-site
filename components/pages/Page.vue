<template>
    <div>
        <section class="top" :style="headerStyle">
            <div class="content">
                <h1>{{ document.data.h1 }}</h1>
                <div v-html="$prismic.asHtml(document.data.banner_content)" />
            </div>
        </section>
        <section class="middle" v-if="document.data.use_description">
            <div class="content" v-html="$prismic.asHtml(document.data.description_content)" />
        </section>
        <section class="products" v-if="document.data.use_list">
            <div class="title"><h2>{{ document.data.list_h2 }}</h2></div>
            <ListItem v-for="iterator in document.data.list_items" :key="iterator.item.id" :id="iterator.item.id" />
        </section>
        <section class="article">
            <div class="content" style="max-width: 700px;" v-html="$prismic.asHtml(document.data.main_content)" />
        </section>
    </div>
</template>

<script>
import ListItem from '@/components/ListItem.vue';
export default {
    data() {
        return {
            headerStyle: `background: url(${this.$store.state.settings.banner_image.url}); background-size: cover; background-position: center top; text-shadow: 0 1px 2px rgba(0,0,0,0.8); color: #fff !important; box-shadow: inset 0 0 0 500px rgba(0,0,0,0.3);`
        }
    },
    props: {
        document: {
            type: Object,
            required: true
        }
    },
    components: { ListItem },
}
</script>
