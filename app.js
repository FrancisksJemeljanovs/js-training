window.myapp = {};
window.addEventListener('load', function() {
    var oModel = new Model();
    var oRESTApiCommunicationHandler = new RESTApiCommunicationHandler();
    var oMainController = new MainController(oModel, oRESTApiCommunicationHandler);
    oMainController.openUsersPage();

})