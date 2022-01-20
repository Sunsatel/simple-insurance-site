<template>
    <img
        :loading="loading"
        :src="source"
        :width="width"
        :height="height"
        :alt="altText"
    />
</template>

<script>
export default {
    props: {
        src: {},
        img: {},
        h: {
            type: String
        },
        w: {
            type: String
        },
        lazy: {
            type: Boolean,
            required: false,
            default:  true
        }
    },
    computed: {
        source() {
            if( this.src )  var s = this.src;
            else if( this.img && this.img.url ) {
                var s = this.img.url;
                s = s.split('&w=')[0];
                if( this.h ) s = `${s}&h=${this.h}`;
                if( this.w ) s = `${s}&w=${this.w}`;
            }
            else var s = '';
            return s;
        },
        loading() {
            if( this.lazy ) return 'lazy'
            return 'eager'
        },
        width() {
            if( this.w ) return this.w;
            return 'auto';
        },
        height() {
            if( this.h ) return this.h;
            return 'auto';
        },
        altText() {
            if( this.alt ) return this.alt;
            else if( this.img ) return this.img.alt;
            return '';
        }
    }
}
</script>