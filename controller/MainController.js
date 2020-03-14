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
            this.openBatchPostsPage();
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
        this.oRESTApiCommunicationHandler.getPosts(this.oModel.setProperty.bind(this.oModel, 'posts'));
        this.oModel.oData.ui.page = 'posts'
    }

    openBatchPostsPage() {
        // check if 'Posts' exists in oData model

        var postsStart = this.oModel.oData.ui.postsPage * this.oModel.oData.ui.postLimit - this.oModel.oData.ui.postLimit
        var postsLimit = this.oModel.oData.ui.postLimit
        console.log(postsStart, postsLimit)

        var listOfPosts = this.oModel.getPostsInPage2()
        if (listOfPosts === undefined) {
            console.log('calling posts fetching handler')
            this.oRESTApiCommunicationHandler.getBatchOfPosts(postsStart, postsLimit, this.oModel.addDataToProperty.bind(this.oModel, 'posts2'));
            console.log('trying to ask posts from model again')
            listOfPosts = this.oModel.getPostsInPage2()
            console.log('model gave me ' + listOfPosts)
            this.oModel.oData.ui.page = 'posts2'
        }
        
        //this.oModel.oData.ui.page = 'posts2'
    }

    openAlbumsPage() {
        this.oRESTApiCommunicationHandler.getAlbums(this.oModel.setProperty.bind(this.oModel, 'albums'));
        this.oModel.oData.ui.page = 'albums'
    }

    openPhotosPage(nAlbumId) {
        this.oRESTApiCommunicationHandler.getPhotos(nAlbumId, this.oModel.setProperty.bind(this.oModel, 'photos'));
        this.oModel.oData.ui.page = 'photos'
    }

    openSelectedPostPage(oPostObject) {
        this.oModel.oData.ui.selectedPost = oPostObject;
        //console.log(this.oModel.getUserInfoFromPost(oPostObject))
        //console.log(oPostObject)
        
        this.oRESTApiCommunicationHandler.getCommentsForPost(this.oModel.oData.ui.selectedPost.id, this.oModel.oData.ui.commentsPage, this.oModel.oData.ui.commentsLimit, this.oModel.setProperty.bind(this.oModel, 'comments'));
        //this.oRESTApiCommunicationHandler.getCommentsForPost(this.oModel.oData.ui.selectedPost);
        console.log(this.oModel.oData.comments)

        //this.oModel.oData.ui.page = 'selected-post';
        this.updatePage()
    }


    attachModelUpdateListener() {
        // Listen for the event.
        document.addEventListener('model_updated', function(e) {
            this.updatePage()
        }.bind(this), false);
    }

    _onPostClick(postObject) {
        this.oModel.oData.ui.commentsPage = 1;
        this.openSelectedPostPage(postObject)

        
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
        //console.log('UpdatePage() was called')
        if (this.oModel.oData.ui.page === 'posts2') {
            //console.log('updatePage == posts2 was  triggered!')
            this._$container.innerHTML = ''
            var oList = new PostsListComponent();
            //this._$container.appendChild(oList.renderList(this.oModel.getProperty('posts')));
            this._$container.appendChild(oList.renderList(this.oModel.getPostsInPage2(), this._onPostClick.bind(this)));

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
                //this.updatePage();
                this.openBatchPostsPage;
            }.bind(this);

            buttonNext.onclick = function() {
                this.oModel.oData.ui.postsPage += 1;
                //this.updatePage();
                this.openBatchPostsPage;
            }.bind(this);

            this._$container.appendChild(buttonPrevious);
            this._$container.appendChild(buttonNext);
            this._$container.appendChild(currentPageDisplayLabel);
            
        }

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


        }
        // get data from model
        // create instance of appropriate ui component
        // put ui component html dom to app so page is rendered with correct data and correct ui component
    }


}