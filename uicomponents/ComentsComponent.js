export class CommentsComponent {
  constructor() {}

  renderComments(oItems) {
    console.log(oItems)
    let commentsList = []
    oItems.forEach(function(element) {
      console.log(element)
      let comment = document.createElement("p")
      comment.innerText = element.id + ' ' + element.body
      commentsList.push(comment)
    });
    return commentsList
  }
}