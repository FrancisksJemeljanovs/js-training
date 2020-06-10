export class ListComponent {
  constructor() {}

  renderList(oItems) {
      var listItem;
      this.oDomRef = document.createElement("ul");
      oItems.forEach(function(item) {
          //console.log(oItem)
          listItem = document.createElement("li");
          listItem.appendChild(item);
          this.oDomRef.appendChild(listItem);
      }.bind(this));
      return this.oDomRef;
  }
}