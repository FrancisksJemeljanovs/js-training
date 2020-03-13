class MainController {
    constructor(oModel, oRESTApiCommunicationHandler) {
        this.oModel = oModel;
        this.oRESTApiCommunicationHandler = oRESTApiCommunicationHandler;
        this.init();
    }

    init() {
        this.attachModelUpdateListener();
        this._$container = document.getElementById("app");
        document.getElementById("navUsers").addEventListener('click', function() {
            this.openUsersPage();
        }.bind(this));
        document.getElementById("navPosts").addEventListener('click', function() {
            this.openPostsPage();
        }.bind(this));
        document.getElementById("navAlbums").addEventListener('click', function() {
            this.openAlbumsPage();
        }.bind(this));
        document.getElementById("toDoList").addEventListener('click', function() {
            this.oModel.getPostsInPage();
        }.bind(this));
    }

    openUsersPage() {
        //this.oModel.checkDataExists.bind(this.oModel, 'some path')
        //this.oModel.checkDataExists('some path')
        this.oRESTApiCommunicationHandler.getUsers(this.oModel.setProperty.bind(this.oModel, 'users'));
        this.oModel.oData.ui.page = 'users'
    }

    openPostsPage() {
        // check if 'Posts' exists in oData model
        //pieprasiit kuru lapu
        this.oRESTApiCommunicationHandler.getPosts(this.oModel.setProperty.bind(this.oModel, 'posts'), 1, 15);
        this.oModel.oData.ui.page = 'posts'
    }

    openAlbumsPage() {
        this.oRESTApiCommunicationHandler.getAlbums(this.oModel.setProperty.bind(this.oModel, 'albums'));
        this.oModel.oData.ui.page = 'albums'
    }

    openPhotosPage(nAlbumId) {
        this.oRESTApiCommunicationHandler.getPhotos(nAlbumId, this.oModel.setProperty.bind(this.oModel, 'photos'));
        this.oModel.oData.ui.page = 'photos'
    }

    openSelectedPostPage(nPostId) {

    }


    attachModelUpdateListener() {
        // Listen for the event.
        document.addEventListener('model_updated', function(e) {
            this.updatePage()
        }.bind(this), false);
    }

    _onPostClick(postId) {
        this.oModel.oData.ui.selectedPost = postId;
        this.oModel.oData.ui.page = 'selected-post';

        console.log(postId)
        console.log(typeof(postId))
        this.updatePage()
        
        //this.openSelectedPostPage(postId)
    }

    _onAlbumOpen(e) {
        //console.log(MouseEvent)
        var selectedAlbumId = e.srcElement.dataset.target;
        this.openPhotosPage(selectedAlbumId);
        // open modal (popup) or page with specific album content
        //this.openPhotosPage(sAlbumId)
    }

    _onColumnNameClick(e) {
        var sSelectedColumnName = e.srcElement.innerHTML

        if (!(sSelectedColumnName in this.oModel.oData.ui.usersPageSortOrderAsc)) {
            Object.assign(this.oModel.oData.ui.usersPageSortOrderAsc, {[sSelectedColumnName]: true})
        }


        //console.log(this.oModel.oData.ui.usersPageSortOrderAsc)
        //console.log(sSelectedColumnName)
        this._$container.innerHTML = '';
        var oList = new TableComponent();
        this._$container.appendChild(oList.renderTable(this.oModel.getSmarterUsersCustomData('users', sSelectedColumnName), this._onColumnNameClick.bind(this)));



    }

    updatePage() {
        //if (this._page === 'users') {
        if (this.oModel.oData.ui.page === 'users') {
            this._$container.innerHTML = '';
            //var oList = new ListComponent();
            var oList = new TableComponent();
            //this._$container.appendChild(oList.renderTable(this.oModel.getProperty('users')));
            this._$container.appendChild(oList.renderTable(this.oModel.getSmarterUsersCustomData('users'), this._onColumnNameClick.bind(this)));
        }
        //if (this._page === 'posts') {
        if (this.oModel.oData.ui.page === 'posts') {
            this._$container.innerHTML = ''
            var oList = new PostsListComponent();
            //this._$container.appendChild(oList.renderList(this.oModel.getProperty('posts')));
            this._$container.appendChild(oList.renderList(this.oModel.getPostsInPage(), this._onPostClick.bind(this)));

            var buttonPrevious = document.createElement("button");
            var buttonNext = document.createElement("button");
            var currentPageDisplayLabel = document.createElement("label");

            currentPageDisplayLabel.innerHTML = `Current page: ${this.oModel.oData.ui.postsPage}`;
            buttonPrevious.innerHTML = 'Previous';

            buttonNext.innerHTML = 'Next';
            if (this.oModel.oData.ui.postsPage === 1) {
                buttonPrevious.disabled = true
            }
            if (this.oModel.oData.ui.postsPage === 7) {
                buttonNext.disabled = true
            }

            buttonPrevious.onclick = function() {
                this.oModel.oData.ui.postsPage -= 1;
                this.updatePage();
            }.bind(this);

            buttonNext.onclick = function() {
                this.oModel.oData.ui.postsPage += 1;
                this.updatePage();
            }.bind(this);

            this._$container.appendChild(buttonPrevious);
            this._$container.appendChild(buttonNext);
            this._$container.appendChild(currentPageDisplayLabel);
            
        }
        //if (this._page === 'albums') {
        if (this.oModel.oData.ui.page === 'albums') {
            this._$container.innerHTML = ''
            var oList = new AlbumsComponent();
            this._$container.appendChild(oList.renderList(this.oModel.getProperty('albums'), this._onAlbumOpen.bind(this)));
        }
        //if (this._page === 'photos') {
        if (this.oModel.oData.ui.page === 'photos') {
            this._$container.innerHTML = ''
            var oList = new PhotosComponent();
            this._$container.appendChild(oList.renderImageGrid(this.oModel.getProperty('photos')));
        }

        if (this.oModel.oData.ui.page === 'selected-post') {
            this._$container.innerHTML = ''
            this.oModel.getSelectedPostData()

        }
        // get data from model
        // create instance of appropriate ui component
        // put ui component html dom to app so page is rendered with correct data and correct ui component
    }


}