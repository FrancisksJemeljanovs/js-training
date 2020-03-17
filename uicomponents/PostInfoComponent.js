class PostInfoComponent {
    constructor() {}

    renderPostInfo(oAuthor, oPost, oComments) {
        this.oDomRef = document.createElement("div");

        let authorName = document.createElement("p");
        authorName.innerHTML = `<strong>Author: </strong>${oAuthor.name}`;
        let postTitle = document.createElement("p");
        postTitle.innerHTML = `<strong>Title: </strong>${oPost.title}`;
        let postBody = document.createElement("p");
        postBody.innerHTML = `<strong>Post: </strong>${oPost.body}`;

        this.oDomRef.appendChild(authorName)
        this.oDomRef.appendChild(postTitle)
        this.oDomRef.appendChild(postBody)
        
        return this.oDomRef
    }
}