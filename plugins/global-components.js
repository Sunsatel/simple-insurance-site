import Vue from 'vue'

import PrismicImage from '@/components/PrismicImage.vue';

const components = {
    PrismicImage
}

Object.entries(components).forEach(([name, component]) => {
	Vue.component(name, component)
})
