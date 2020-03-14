class PostInfoComponent {
    constructor() {}

    renderPostInfo(oAuthor, oPost, aComments) {
        this.oDomRef = document.createElement("div");

        let authorName = document.createElement("p");
        authorName.innerHTML = `<strong>Author: </strong>${oAuthor.name}`;
        let postTitle = document.createElement("p");
        postTitle.innerHTML = `<strong>Title: </strong>${oPost.title}`;
        let postBody = document.createElement("p");
        postBody.innerHTML = `<strong>Post: </strong>${oPost.body}`;

        this.oDomRef.appendChild(authorName)
        
        return this.oDomRef
    }
}