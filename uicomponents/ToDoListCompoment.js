class ToDoListComponent {
    constructor() {}

    renderToDoList(aItems, fnCheckBoxChangeCallback, fnDeleteButtonClickCallback) {
        this.oDomRef = document.createElement("ul");
        aItems.forEach(function(oItem) {
            let newCheckbox = document.createElement("input");
            
            newCheckbox.type = 'checkbox';
            if (oItem.completed === true) {
                newCheckbox.checked = true
            }
            newCheckbox.addEventListener('change', function() {
                fnCheckBoxChangeCallback(oItem, newCheckbox.checked)
            });

            let newDeleteButton = document.createElement("button")
            newDeleteButton.innerHTML = '<strong>Delete</strong>'
            newDeleteButton.addEventListener('click', function() {
                fnDeleteButtonClickCallback(oItem)
            })

            let listItem = document.createElement("li");
            listItem.innerText = oItem.id + ' ' + oItem.title;
            listItem.append(newCheckbox)
            listItem.append(newDeleteButton)
            this.oDomRef.appendChild(listItem);
        }.bind(this));
        return this.oDomRef;
    }
}