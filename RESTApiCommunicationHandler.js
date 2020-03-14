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

    getBatchOfPosts(nStart, nLimit, fnCallback) {
        console.log(`fetching posts from ${nStart} to ${nStart + nLimit}`)
        fetch(`https://jsonplaceholder.typicode.com/posts?_start=${nStart}&_limit=${nLimit}`).then(function(res) {
            res.json().then(function(data) {
                fnCallback(data);
            })
        })
    }

    getCommentsForPost(nPostId, nPostStart, nPostAmount, fnCallback) {
        //console.log(nPostId)
        fetch(`https://jsonplaceholder.typicode.com/posts/${nPostId}/comments?_start=${nPostStart}&_limit=${nPostAmount}`).then(function(res) {
            res.json().then(function(data) {
                //console.log(data)
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

    getPhotos(nAlbumId, fnCallback) {
        fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${nAlbumId}`).then(function(res) {
            res.json().then(function(data) {
                fnCallback(data);
            })
        })
    }

}