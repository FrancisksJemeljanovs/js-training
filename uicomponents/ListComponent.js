class ListComponent {
    constructor() {}

    renderList(aItems) {
        var listItem;
        this.oDomRef = document.createElement("ul");
        aItems.forEach(function(oItem) {
            //console.log(oItem)
            listItem = document.createElement("li");
            listItem.innerText = oItem.id + ' ' + oItem.body;
            this.oDomRef.appendChild(listItem);
        }.bind(this));
        return this.oDomRef;
    }
}