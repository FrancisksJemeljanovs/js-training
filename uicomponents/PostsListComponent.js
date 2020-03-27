class PostsListComponent {
    constructor() {}

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

    renderPage() {
        //izdomaat kaa risinaat 15 postus uz 1 lapu.
    }
}