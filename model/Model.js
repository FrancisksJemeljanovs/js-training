class Model {
    constructor() {
        this.oData = {
            ui: {
                page: 'users',
                usersPageSortOrderAsc: {},
                postsPage: 1,
                postLimit: '15',
                selectedPost: null
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

    getData() {
        return this.oData;
    }

    getProperty(sPath) {
        return this.oData[sPath];
    }

    getPostsInPage() {
        //console.log(this.oData.ui.postsPage)
        var postIndexStart = this.oData.ui.postsPage * this.oData.ui.postLimit - this.oData.ui.postLimit
        var postIndexEnd = this.oData.ui.postsPage * this.oData.ui.postLimit

        return Object.entries(this.oData.posts).slice(postIndexStart,postIndexEnd).map(elems => elems[1]);
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

    getSelectedPostData() {
        console.log(this.oData.posts[this.oData.ui.selectedPost - 1])
        return this.oData.posts[this.oData.ui.selectedPost - 1]
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

