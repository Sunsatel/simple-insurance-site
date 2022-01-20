  
const gulp = require('gulp');
const sitemap = require('gulp-sitemap');
const env = require('dotenv').config().parsed;  
const Prismic = require('prismic-javascript');
const fs = require('fs');

// tasks
gulp.task('sitemap', (cb) => {
    gulp.src(['dist/**/*.html', '!dist/200.html', '!dist/preview/index.html', '!dist/**/out/**/*', '!dist/**/lp/**/*'], {
        read: false
    })
    .pipe(sitemap({
        siteUrl: env.APP_URL,
        fileName: 'sitemap.xml',
    }))
    .pipe(gulp.dest('./dist'));

    cb();
});

// redirects
gulp.task('firebase-setup', (cb) => {
    firebaseRedirects(require('./config/firebase.json'), '*');
    cb();
});


async function firebaseRedirects(firebaseConfig, prismicLang) {
    let firebaseRedirects = [];
    let redirects = await fetchRedirects(prismicLang);

    redirects.forEach((redirect, i) => {
        firebaseRedirects.push({
            'source': redirect.source,
            'destination': redirect.destination,
            'type': 301
        });
    });

    firebaseConfig.hosting.redirects = firebaseRedirects;
    writeFile('firebase.json', firebaseConfig);
    
}

function writeFile(filePath, firebaseConfig) {
    fs.writeFile(filePath, JSON.stringify(firebaseConfig), err => {
        if (err) {
            console.log('Error writing file', err)
        } else {
            console.log('Successfully wrote file')
        }
    });
}

function getOptions(lang) {
    if(lang) {
        return {
            lang: lang
        };
    }

    return {
        lang: '*'
    }
}

async function fetchRedirects(lang = null) {

    let options = getOptions(lang);
    let api = await Prismic.getApi(env.PRISMIC_URL, { accessToken: env.PRISMIC_TOKEN } );
    let response = await api.query(
        Prismic.Predicates.any('document.type', ['redirects']),
        options
    );

    if(response.results.length > 0) {
        let redirects = [];
        for(var i = 0; i < response.results.length; i++) {
            if(response.results[i].data) {
                redirects = redirects.concat(response.results[i].data.redirects);
            }
        }
        return redirects;
    }

    return [];
}