export class PhotosComponent {
    constructor() {}

    renderImageGrid(oItems) {
      //console.log(oItems)
      var flexWrapItem;
      this.oDomRef = document.createElement("div");
      this.oDomRef.classList.add("slides")
      oItems.forEach(function(oItem) {
        flexWrapItem = document.createElement("img");
        flexWrapItem.setAttribute("src", oItem.url)
        flexWrapItem.innerHTML = oItem.id;
        this.oDomRef.appendChild(flexWrapItem);
      }.bind(this));
      return this.oDomRef;
    }
}