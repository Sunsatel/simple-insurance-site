<template>
  <Page v-if="document.type == 'page'" :document="document" />
  <Post v-else-if="document.type == 'post'" :document="document" />
  <Insurance v-else-if="document.type == 'insurance'" :document="document" />
</template>
<script>
// Pages
import getDocument from "@/plugins/get-document";

import Page from "@/components/pages/Page";
import Post from "@/components/pages/Post";
import Insurance from "@/components/pages/Insurance";

export default {
  layout: "site",
  components: {
    Page,
    Insurance,
    Post,
  },

  /**
   * asyncData used on server side (only dev)
   */
  async asyncData({ $prismic, context, route, error, req }) {
    try {
      return await getDocument($prismic, route.path, error);
    } catch (e) {
      error({ statusCode: 404, message: "Not found" });
    }
  },
  head() {
    return {
      title: this.document.data.seo_title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.document.data.seo_description,
        },
      ],
      link: [
        {
          rel: "canonical",
          href: process.env.APP_URL + this.$prismic.linkResolver(this.document),
        },
        {
          rel: "shortcut icon",
          href: this.$store.state.settings.favico.url,
        },
      ],
    };
  },
  data() {
    return {
      headerStyle: `background: url(${this.$store.state.settings.banner_image.url}); background-size: cover; background-position: center top; text-shadow: 0 1px 2px rgba(0,0,0,0.8); color: #fff !important; box-shadow: inset 0 0 0 500px rgba(0,0,0,0.3);`,
    };
  },
};
</script>
