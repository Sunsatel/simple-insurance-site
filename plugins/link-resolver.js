export default function (document) {
    if(document) {
        if(document.uid == 'home') {
            return '/';
        } 
        return `/${document.uid}/`;
    }
    return '/';
}