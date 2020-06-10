export class PostsComponent {
    constructor() {}

    renderPosts(oItems, fnPostClickCallback) {
      let postItems = []
      
      oItems.forEach(function(oItem) {
        let listItem = document.createElement("div")
        let postTitle = document.createElement("p")
        let postBody = document.createElement("p")
        postTitle.innerHTML = `<strong>Title:</strong> ${oItem.title}`
        let postBodyTextClipped = oItem.body
        if (postBodyTextClipped.length > 200) {
            postBodyTextClipped = oItem.body.substr(0, 200) + "... (elypsis)"
        }
        postBody.innerHTML = `<strong>Body:</strong> ${postBodyTextClipped}`;
        listItem.appendChild(postTitle)
        listItem.appendChild(postBody)
        listItem.addEventListener('click', function() {
          history.pushState('post', `Post`, `./posts/${oItem.id}`)
          fnPostClickCallback(oItem)
        });
        postItems.push(listItem)
      })
      return postItems
    }


    //old one - not used currenly
    renderList(aItems, fnPostClickCallback) {
      var listItem;
      this.oDomRef = document.createElement("ul");
      aItems.forEach(function(oItem) {
        listItem = document.createElement("li");
        var postTitle = document.createElement("p");
        postTitle.innerHTML = `<strong>Title:</strong> ${oItem.title}`;
        var postBody = document.createElement("p");
        var postBodyTextClipped = oItem.body
        if (postBodyTextClipped.length > 200) {
            postBodyTextClipped = oItem.body.substr(0, 200) + "... (elypsis)"
        }
        postBody.innerHTML = `<strong>Body:</strong> ${postBodyTextClipped}`;
        listItem.appendChild(postTitle)
        listItem.appendChild(postBody)
        //listItem.setAttribute('data-target', oItem.id);
        listItem.addEventListener('click', function() {
            history.pushState('post', `Post`, `./posts/${oItem.id}`)
            fnPostClickCallback(oItem)
        });

        //listItem.innerText = oItem.title;
        //listItem.innerText = oItem.body;
        this.oDomRef.appendChild(listItem);
      }.bind(this));
      return this.oDomRef;
    }

    renderPostInfo(oAuthor, oPost) {
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