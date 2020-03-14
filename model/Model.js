class Model {
    constructor() {
        this.oData = {
            ui: {
                page: 'users',
                usersPageSortOrderAsc: {},
                postsPage: 1,
                postLimit: 15,
                selectedPost: null,
                commentsPage: 1,
                commentsLimit: 3
            }
        }
    }

    setData(oData) {
        this.oData = oData;
    }


    setProperty(sPath, oValue) {
        this.oData[sPath] = oValue;
        //console.log('users property was set to oData object')

        var event = new Event('model_updated');
        // Dispatch the event.
        document.dispatchEvent(event);
    }

    addDataToProperty(sPath, oValue) {
        if (this.oData[sPath] === undefined) {
            this.oData[sPath] = oValue
            console.log('posts object was created and populated with first batch of posts')
        }
        if (!(oValue in this.oData[sPath])) {
            //.log(typeof(this.oData[sPath]))
            
            //this.oData[sPath].push(oValue)

            //console.log('new posts added to existing posts')
        }
        //this.oData[sPath].push(oValue)
        //console.log(this.oData[sPath])
        //Object.assign(this.oData.sPath, oValue)

        var event = new Event('model_updated');
        // Dispatch the event.
        document.dispatchEvent(event);
    }

    getData() {
        return this.oData;
    }

    getProperty(sPath) {
        return this.oData[sPath];
    }

    getSmarterUsersCustomData(sPath, sSelectedColumnName) {
        let data = this.oData[sPath];
        let newData = []
        
        for (var i = 0; i < data.length; i++) {
            let row = {};
            Object.assign(row, {"Name": data[i].name}, {"Username": data[i].username}, {"E-mail": data[i].email}, {"City": data[i].address.city}, {"Company name": data[i].company.name});
            newData.push(row);
        }

        if (sSelectedColumnName === undefined) {
            return newData
        } else {
            newData.sort(this.dynamicSort(sSelectedColumnName, this.oData.ui.usersPageSortOrderAsc[sSelectedColumnName]))
        }
        if (this.oData.ui.usersPageSortOrderAsc[sSelectedColumnName] === true) {
            this.oData.ui.usersPageSortOrderAsc[sSelectedColumnName] = false
        } else {
            this.oData.ui.usersPageSortOrderAsc[sSelectedColumnName] = true
        }

        return newData
    }


    getSmarterUsersData(sPath, sSortByCol) {
        
        let data = this.oData[sPath]
        let newData = []

        for (var i = 0; i < data.length; i++) {
            var row = {}
            for (var key in data[i]) {
                if (data[i].hasOwnProperty(key)) {
                    if (typeof(data[i][key]) === 'object') {
                        for (var innerKey in data[i][key]) {
                            if (innerKey in data[i]) {
                                Object.assign(row, {"company-name": data[i][key][innerKey]})
                            } else {
                                Object.assign(row, {[innerKey]: data[i][key][innerKey]})
                            }
                        }
                    } else {
                        Object.assign(row, {[key]: data[i][key]})
                    }
                }
            }
            newData[i] = row
        }
        newData.sort(this.dynamicSort(sSortByCol))
        return newData
        //flux paterns
        //redux reaktaa
    }

    getPostsInPage() {
        //console.log(this.oData.ui.postsPage)
        var postIndexStart = this.oData.ui.postsPage * this.oData.ui.postLimit - this.oData.ui.postLimit
        var postIndexEnd = this.oData.ui.postsPage * this.oData.ui.postLimit

        return Object.entries(this.oData.posts).slice(postIndexStart,postIndexEnd).map(elems => elems[1]);
    }

    getPostsInPage2() {
        console.log(`current posts page is ${this.oData.ui.postsPage}`)
        
        //console.log(Object.entries(this.oData.posts2).slice(postIndexStart,postIndexEnd).map(elems => elems[1]))

        var postIndexStart = this.oData.ui.postsPage * this.oData.ui.postLimit - this.oData.ui.postLimit
        var postIndexEnd = this.oData.ui.postsPage * this.oData.ui.postLimit - 1
        console.log(`i was asked for posts from ${postIndexStart} to ${postIndexEnd}`)
        //console.log(this.oData.posts2)
        if (!(this.oData.posts2 === undefined)) {
            console.log(`asking for post with index ${postIndexStart} from posts2`)
            console.log(this.oData.posts2[postIndexStart])
            if (this.oData.posts2[postIndexStart] === undefined) {
                console.log('i dont these posts in model')
                return undefined
            }
            //console.log('getPostsInPage2 returned some posts from model')
            //console.log(Object.entries(this.oData.posts2).slice(postIndexStart,postIndexEnd).map(elems => elems[1]))
            //console.log(`I am returning ${Object.entries(this.oData.posts2).slice(postIndexStart,postIndexEnd).map(elems => elems[1])}`)
            return Object.entries(this.oData.posts2).slice(postIndexStart,postIndexEnd).map(elems => elems[1]);
        } else {
            console.log('getPostsInPage2 returned undefined')
            return undefined
        }
        
    }

    getUserInfoFromPost() {
        return this.oData.users[this.oData.ui.selectedPost.userId - 1]
    }

    dynamicSort(sProperty, bSortOrderAsc) {
        if (bSortOrderAsc === true) {
            var sortOrder = 1;
        } else {
            var sortOrder = -1;
        }
        return function(a,b) {
            var result = (a[sProperty] < b[sProperty]) ? -1 : (a[sProperty] > b[sProperty]) ? 1 : 0;
            return result * sortOrder
        }
    }

}

    //addProperty(sPath, oValue)

