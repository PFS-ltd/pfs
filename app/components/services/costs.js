app.service('costsService', ['$state', 'Auth', "$firebaseObject", "$firebaseArray",
    function ($state, Auth, $firebaseObject, $firebaseArray) {
        var uId = Auth.$getAuth().uid;

        var costsCategoriesRef = firebase.database().ref('users/' + uId + '/costs/costsCategories');
        var costsCategories = $firebaseArray(costsCategoriesRef);

        var costsTemplateRef = firebase.database().ref('users/' + uId + '/costs/templateCosts');
        var costsTemplate = $firebaseArray(costsTemplateRef);


        var transferRef = firebase.database().ref('users/' + uId + '/costs/costsTransfer');
        var costsTransfers = $firebaseArray(transferRef);

        var query = transferRef.orderByChild("timestamp").limitToLast(5);
        var queryTransfers = $firebaseArray(query);


        return {
            getCostsCategoriesArray: function () {
                return costsCategories;
            },
            addItemInCostsCategories: function (item) {
                costsCategories.$add(item);
            },
            delItemInCostsCategories: function (item) {
                costsCategories.$remove(item);
            },
            updateItemInCostsCategories: function (item) {
                costsCategories.$save(item);
            },
            getItemInCostsCategoriesByKey: function (key) {
                // console.log(key)
                return costsCategories.$getRecord(key);
            },



            getCostsTemplateArray: function () {
                return costsTemplate;
            },
            addItemInCostsTemplate: function (item) {
                costsTemplate.$add(item);
            },
            delItemInCostsTemplate: function (item) {
                costsTemplate.$remove(item);
            },
            updateItemInCostsTemplate: function (item) {
                costsTemplate.$save(item);
            },
            getItemInCostsTemplateByKey: function (key) {
                return costsTemplate.$getRecord(key);
            },


            getCostsTransferArrayLast: function () {
                return queryTransfers;
            },

            addItemInQueryCostsTransfer: function (item) {
                queryTransfers.$add(item);
            },
            delItemInQueryCostsTransferLast: function (item) {
                queryTransfers.$remove(item);
            },
            updateItemInQueryCostsTransfer: function (item) {
                queryTransfers.$save(item);
            },
            getItemInQueryCostsTransferByKey: function (key) {
               return queryTransfers.$getRecord(key);
            },


            getCostsTransferArray: function(){
                return costsTransfers;
            },
           
            addItemInCostsTransfer: function (item) {
                costsTransfers.$add(item);
            },
            delItemInCostsTransfer: function (item) {
                costsTransfers.$remove(item);
            },
            updateItemInCostsTransfer: function (item) {
                costsTransfers.$save(item);
            },
            getItemInCostsTransferByKey: function (key) {
               return costsTransfers.$getRecord(key);
            },

        };
    }]);