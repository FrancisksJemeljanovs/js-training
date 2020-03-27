class AddTodoComponent {
    constructor() {}

    renderAddTodoFields(oUser, fnCreateTodoCallback) {

        this.oDomRef = document.createElement("div");

        let titleLabel = document.createElement("label")
        titleLabel.innerHTML = "<strong>To Do title: </strong>"

        let checkboxLabel = document.createElement("label")
        let titleTextbox = document.createElement("input")
        titleTextbox.type = "text"
        let completedCheckbox = document.createElement("input")
        completedCheckbox.type = 'checkbox';
        checkboxLabel.innerHTML = "Completion status:"
        checkboxLabel.appendChild(completedCheckbox)
        
        let createButton = document.createElement("button")
        createButton.innerHTML = "<strong>Create</strong>"
        createButton.addEventListener('click', function() {
            fnCreateTodoCallback({
                "userId": oUser.id,
                "id": null,
                "title": titleTextbox.value,
                "completed": completedCheckbox.checked
            })
        })

        this.oDomRef.appendChild(titleLabel)
        this.oDomRef.appendChild(titleTextbox)
        this.oDomRef.appendChild(checkboxLabel)
        this.oDomRef.appendChild(createButton)
        //return 'hello from add todo renderer!'
        return this.oDomRef;
    }
}