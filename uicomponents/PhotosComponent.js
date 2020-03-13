class PhotosComponent {
    constructor() {}

    renderImageGrid(aItems) {
        var flexWrapItem;
        this.oDomRef = document.createElement("div");
        this.oDomRef.classList.add("flex-container")
        aItems.forEach(function(oItem) {
            flexWrapItem = document.createElement("img");
            flexWrapItem.setAttribute("src", oItem.url)
            flexWrapItem.innerHTML = oItem.id;
            this.oDomRef.appendChild(flexWrapItem);
        }.bind(this));
        return this.oDomRef;
    }
}