import linkResolver from "./link-resolver"
import prismicDOM from 'prismic-dom'

const Elements = prismicDOM.RichText.Elements

export default function (type, element, content, children) {

    // Generate links to Prismic Documents as <router-link> components
    // Present by default, it is recommended to keep this
    if (type === Elements.hyperlink) {
        
        const url = prismicDOM.Link.url(element.data, linkResolver)

        if (element.data.link_type === 'Document') {

            // INFO
            // data-nuxt-link to be added to event listeners
            // to have a SPA feeling to the app. Should
            // be done in mounted()
            return `<a href="${url}" data-nuxt-link>${content}</a>`;
        }
    }

    // Return null to stick with the default behavior for everything else
    return null;
}