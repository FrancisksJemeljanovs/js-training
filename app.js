window.myapp = {};
window.addEventListener('load', function() {
    var oModel = new Model();
    var oRESTApiCommunicationHandler = new RESTApiCommunicationHandler();
    var oMainController = new MainController(oModel, oRESTApiCommunicationHandler);

    window.addEventListener('popstate', e => {
        //document.getElementById("navUsers").click
        console.log(e.state)
        if (e.state == 'users') {
            oMainController.openUsersPage();
        }
        if (e.state == 'posts') {
            oMainController.openPostsPage();
        }
        if (e.state == 'albums') {
            oMainController.openAlbumsPage();
        }
        if (e.state == 'todos') {
            oMainController.openTodosPage();
        }
        if (e.state == 'post') {
            oMainController.openSelectedPostPage();
        }
        if (e.state == 'album') {
            oMainController. openPhotosPage();
        }
    })
    
    //history.replaceState(null, `Users state`, `./users`)
    oMainController.openUsersPage();

})

