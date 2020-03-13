class RESTApiCommunicationHandler {
    constructor() {}

    getUsers(fnCallback) {
        fetch('https://jsonplaceholder.typicode.com/users').then(function(res) {
            res.json().then(function(data) {
                fnCallback(data);
                
            })
            .catch( err =>{
                console.log("ERROR on loading users data", data)
            })
        })
    }

    getPosts(fnCallback) {
        fetch('https://jsonplaceholder.typicode.com/posts').then(function(res) {
            res.json().then(function(data) {
                fnCallback(data);
            })
        })
    }

    getComments(fnCallback) {
        fetch('https://jsonplaceholder.typicode.com/comments').then(function(res) {
            res.json().then(function(data) {
                fnCallback(data);
            })
        })
    }

    getAlbums(fnCallback) {
        fetch('https://jsonplaceholder.typicode.com/albums').then(function(res) {
            res.json().then(function(data) {
                fnCallback(data);
            })
        })
    }

    getPhotos(iAlbumId, fnCallback) {
        fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${iAlbumId}`).then(function(res) {
            res.json().then(function(data) {
                fnCallback(data);
            })
        })
    }

}