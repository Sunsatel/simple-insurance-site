export default async function($prismic, path, error) {

    let document = await fetchDocument($prismic, getPathArray(path));

    if(typeof document === 'undefined') {
        return error({statusCode: 404, message: 'Not found'});
    }

    // return
    return {
        document: document,
    }

}

async function fetchDocument($prismic, pathArray) {

    // homepage with uid home
    if(pathArray.length == 0) {
        return await $prismic.api.getByUID('page', 'home');
    }

    var document;
    document = await $prismic.api.getByUID('page', pathArray[0]);

    if(!document) {
        document = await $prismic.api.getByUID('insurance', pathArray[0]);
    }

    if(!document) {
        document = await $prismic.api.getByUID('post', pathArray[0]);
    }

    return document;
}

function getPathArray(path) {
    return path.split('/').filter(function(p) {
        return p !== '';
    });
}