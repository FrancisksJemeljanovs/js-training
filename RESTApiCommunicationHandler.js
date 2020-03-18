class RESTApiCommunicationHandler {
    constructor() {}

    getUsers(fnCallback) {
        console.log('fetching users')
        fetch('https://jsonplaceholder.typicode.com/users').then(function(res) {
            if (!res.ok) {
                throw new Error('Network response was not ok!')
            }
            console.log(`response status was ${res.status}`)
            res.json().then(function(data) {
                fnCallback(data);
                
            })
            .catch( err =>{
                console.log("ERROR on loading users data", err)
            })
        })
    }

    getPosts(fnCallback) {
        console.log('fetching posts')
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
        console.log('fetching albums')
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
        console.log(`fetching photos for ${nAlbumId} album`)
        fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${nAlbumId}`).then(function(res) {
            res.json().then(function(data) {
                fnCallback(data);
            })
            .catch( err =>{
                console.log(`ERROR on loading photos data`, err)
            })
        })
    }

    getTodos(fnCallback) {
        console.log(`fetching todos`)
        fetch('https://jsonplaceholder.typicode.com/todos').then(function(res) {
            res.json().then(function(data) {
                //console.log(data)
                fnCallback(data);
                
            })
            .catch( err =>{
                console.log("ERROR on loading todos data", err)
            })
        })
    }

    updateTodo(oTodo, fnCallback) {
        console.log(`updating ${oTodo.id} todo`)
        //console.log(oTodo)
        fetch(`https://jsonplaceholder.typicode.com/todos/${oTodo.id}`, {
            method: 'PATCH',
            body: JSON.stringify({
                completed: oTodo.completed
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            console.log(`status code for updating todo was ${response.status}`)
            response.json()
        })
        .then(json => console.log(json))
        .catch( err =>{
            console.log("ERROR on updating status data", err)
        })
    }

    deleteTodo(oTodo) {

        console.log(`trying to delete ${oTodo.id} todo`)
        fetch(`https://jsonplaceholder.typicode.com/todos/${oTodo.id}`, {
            method: 'DELETE'
        })
        .then((response) => {
            console.log(`Todo delete request response was ${response.status}`)
            response.json()
        })
        .then(json => console.log(json))
        .catch( err =>{
            console.log("ERROR on deleting todo data", err)
        })
    }

    postTodo() {
        console.log('postTodo was called')
        fetch('https://jsonplaceholder.typicode.com/todos', {
            method: 'POST',
            body: JSON.stringify({
                userId: 1,
                title: "clean room",
                completed: false
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`failed to send new Todo to server!`)
            }
            response.json()
        })
        .then(json => console.log(json))
        .catch( res => {
            console.log(res)
        })
        
    }
}