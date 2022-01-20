<template>
    <center><h1 style="padding: 400px 0;">Du skickas vidare</h1></center>
</template>
<script>
let _ = require('lodash');
export default {
    layout: 'site',
    async asyncData({$prismic, route, error}) {
        try {
            let document = await $prismic.api.getByUID(
                'insurance',
                route.params.uid
            );
            if(typeof document === 'undefined') {
                return error({statusCode: 404, message: 'Not found'});
            }
            if(!document.data.tracking_link) {
                return error({statusCode: 404, message: 'Not found'});
            }
            return {
                document
            };
        } catch(e) {
            error({statusCode: 404, message: 'Not found'});
        }
    },
    head() {
        return {
            title: 'Du skickas vidare',
            meta: [
                // no index affiliate links for sea reasons
                { name: 'robots', content: 'noindex' }
            ]
        }
    },
    mounted() {
        window.location.assign(this.document.data.tracking_link);
    }
}
</script>