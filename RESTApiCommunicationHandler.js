class RESTApiCommunicationHandler {
    constructor() {}

    getUsers(fnCallback) {
        fetch('https://jsonplaceholder.typicode.com/users').then(function(res) {
            res.json().then(function(data) {
                fnCallback(data);
                
            })
            .catch( err =>{
                console.log("ERROR on loading users data", err)
            })
        })
    }

    getPosts(fnCallback) {
        fetch('https://jsonplaceholder.typicode.com/posts').then(function(res) {
            res.json().then(function(data) {
                fnCallback(data);
            })
            .catch( err =>{
                console.log("ERROR on loading posts data", err)
            })
        })
    }

    getBatchOfPosts(nStart, nLimit, fnCallback) {
        console.log(`fetching posts from ${nStart} to ${nStart + nLimit}`)
        fetch(`https://jsonplaceholder.typicode.com/posts?_start=${nStart}&_limit=${nLimit}`).then(function(res) {
            res.json().then(function(data) {
                console.log(`posts were fetched`)
                fnCallback(data);
            })
            .catch( err =>{
                console.log("ERROR on loading batch of posts data", err)
            })
        })
    }

    getBatchOfCommentsForPost(nPostId, nStart, nAmount, fnCallback) {
        //nStart += 1
        //console.log(nPostId)
        console.log(`fetching comments for post ${nPostId}, for posts from ${nStart} amount ${nAmount}`)
        fetch(`https://jsonplaceholder.typicode.com/posts/${nPostId}/comments?_start=${nStart}&_limit=${nAmount}`).then(function(res) {
            res.json().then(function(data) {
                console.log('done fetching comments')
                console.log(data)
                fnCallback(data);
            })
            .catch( err =>{
                console.log(`ERROR on loading batch of comments data`, err)
            })
        })
    }

    getCommentsForPost(nPostId, fnCallback) {
        //console.log(nPostId)
        console.log(`fetching comments for post ${nPostId}`)
        //fetch(`https://jsonplaceholder.typicode.com/posts/${nPostId}/comments`).then(function(res) {
        fetch(`https://jsonplaceholder.typicode.com/comments?postId=${nPostId}`).then(function(res) {
            res.json().then(function(data) {
                //console.log(data)
                fnCallback(data);
            })
            .catch( err =>{
                console.log(`ERROR on loading comments for post ${nPostId} data`, err)
            })
        })
    }

    getAlbums(fnCallback) {
        fetch('https://jsonplaceholder.typicode.com/albums').then(function(res) {
            res.json().then(function(data) {
                fnCallback(data);
            })
            .catch( err =>{
                console.log(`ERROR on loading albums data`, err)
            })
        })
    }

    getPhotos(nAlbumId, fnCallback) {
        fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${nAlbumId}`).then(function(res) {
            res.json().then(function(data) {
                fnCallback(data);
            })
            .catch( err =>{
                console.log(`ERROR on loading photos data`, err)
            })
        })
    }

}