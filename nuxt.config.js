const _ = require("lodash");
const env = require("dotenv").config();
const Prismic = require("prismic-javascript");
import linkResolver from "./plugins/link-resolver";

export default {
  target: "static",
  head: {
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
    ].concat(
      _.upperCase(process.env.APP_DEBUG) == "TRUE"
        ? [{ name: "robots", content: "noindex" }]
        : []
    ),
    script: [
      {
        src: "https://kit.fontawesome.com/5358a9e894.js",
        defer: true,
        async: true,
      },
    ],
  },

  css: ["@/assets/css/main.scss"],

  loading: { color: "#000", height: "5px" },

  modules: [
    "@nuxtjs/prismic",
    [
      "nuxt-bugsnag",
      {
        apiKey: "033488aedfeada304877f3d9f04689b6",
        reporterOptions: {
          releaseStage:
            _.upperCase(process.env.APP_DEBUG) == "TRUE"
              ? "development"
              : "production",
          autoAssignRelease: true,
        },
        publishRelease: true,
      },
    ],
  ],

  buildModules: ["@nuxtjs/gtm"],

  build: {
    transpile: ["@swegaming-ab/vue-components"],
  },

  prismic: {
    endpoint: process.env.PRISMIC_URL,
    apiOptions: {
      accessToken: process.env.PRISMIC_TOKEN,
    },
    linkResolver: "@/plugins/link-resolver",
    htmlSerializer: "@/plugins/html-serializer",
  },

  gtm: {
    enabled: !(_.upperCase(process.env.APP_DEBUG) === "TRUE"),
    id: process.env.GTM_ID || "undefined",
    pageTracking: true,
  },

  plugins: ["@/plugins/global-components.js", "@/plugins/helpers.js"],

  env: env.parsed,

  generate: {
    crawler: false,
    fallback: "404.html",
    async routes() {
      let api = await Prismic.getApi(process.env.PRISMIC_URL, {
        accessToken: process.env.PRISMIC_TOKEN,
      });
      let documents = [];
      var page = 1;

      while (true) {
        var response = await api.query(
          Prismic.Predicates.any("document.type", [
            "post",
            "page",
            "insurance",
          ]),
          { pageSize: 100, page: page }
        );

        if (response.results_size) {
          documents = documents.concat(response.results);
        }

        if (response.page >= response.total_pages) {
          break;
        }

        page++;
      }

      let outs = [];
      let routes = documents
        .map((document) => {
          if (document.type == "insurance" && document.data.tracking_link) {
            outs.push("/out/" + document.uid + "/");
          }

          return linkResolver(document);
        })
        .filter((route) => route != null);

      return routes.concat(outs);
    },
  },

  hooks: {
    generate: {
      routeFailed({ route, errors }) {
        throw new Error(
          "Generator failed on " + route + ". Error: " + JSON.stringify(errors)
        );
      },
      done(generator, errors) {
        if (errors.length > 0) {
          throw new Error("Not completed");
        }
      },
    },
  },
};
