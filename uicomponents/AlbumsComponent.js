class AlbumsComponent {
    constructor() {}

    renderList(aItems, fnItemClickCallback) {
        var flexWrapItem;
        this.oDomRef = document.createElement("div");
        this.oDomRef.classList.add("flex-container");
        aItems.forEach(function(oItem) {
            flexWrapItem = document.createElement("div");
            flexWrapItem.innerHTML = oItem.id;
            flexWrapItem.setAttribute('data-target', oItem.id);

            flexWrapItem.addEventListener('click', function() {
                history.pushState('album', `Album`, `./albums/${oItem.id}`)
                fnItemClickCallback(oItem)
            });
            this.oDomRef.appendChild(flexWrapItem);
        }.bind(this));
        return this.oDomRef;
    }
}