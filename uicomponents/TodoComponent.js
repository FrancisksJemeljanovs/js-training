export class TodoComponent {
    constructor() {}

    renderTodoComponent(oItems, fnCheckBoxChangeCallback, fnDeleteButtonClickCallback) {
      let todoItems = []

      oItems.forEach(function(oItem) {
        let todoItem = document.createElement("div")
        let completeCheckbox = document.createElement("input")
        completeCheckbox.type = 'checkbox'
        if (oItem.completed === true) {
          completeCheckbox.checked = true
        }
        completeCheckbox.addEventListener('change', function() {
          fnCheckBoxChangeCallback(oItem, newCheckbox.checked)
        });

        let DeleteButton = document.createElement("button")
        DeleteButton.innerHTML = '<strong>Delete</strong>'
        DeleteButton.addEventListener('click', function() {
            fnDeleteButtonClickCallback(oItem)
        })

        let todoLabel = document.createElement("span")
        todoLabel.innerText = oItem.id + ' ' + oItem.title;
        
        todoItem.append(todoLabel)
        todoItem.append(completeCheckbox)
        todoItem.append(DeleteButton)
        todoItems.push(todoItem)
      }) 
      return todoItems
    }

    renderAddTodoComponent(oUser, fnCreateTodoCallback) {
      let addTodo = document.createElement("div")

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
      addTodo.appendChild(titleLabel)
      addTodo.appendChild(titleTextbox)
      addTodo.appendChild(checkboxLabel)
      addTodo.appendChild(createButton)
      return addTodo;
    }


    // not used anymore
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