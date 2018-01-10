app.service('incomeService', ['$state', 'Auth', "$firebaseObject", "$firebaseArray",
    function ($state, Auth, $firebaseObject, $firebaseArray) {
        var uId = Auth.$getAuth().uid;

        var incomeCategoriesRef = firebase.database().ref('users/' + uId + '/income/incomeCategories');
        var incomeCategories = $firebaseArray(incomeCategoriesRef);

        var billsCategoriesRef = firebase.database().ref('users/' + uId + '/income/billsCategories');
        var billsCategories = $firebaseArray(billsCategoriesRef);


        var transferRef = firebase.database().ref('users/' + uId + '/income/transferFromIncomeToBills');
        var transfers = $firebaseArray(transferRef);

        var query = transferRef.orderByChild("timestamp").limitToLast(5);
        var queryTransfers = $firebaseArray(query);

        return {
            getIncomeSource: function () {
                return incomeCategories;
            },

            addItemInIncomeSource: function (item) {
                incomeCategories.$add(item);
            },

            delItemInIncomeSource: function (item) {
                incomeCategories.$remove(item);
            },
            updItemInIncomeSource: function (item) {
                incomeCategories.$save(item);
            },
            gettemInIncomeSource: function (key) {
                return incomeCategories.$getRecord(key);
            },


            getIncomeAccounts: function () {
                return billsCategories;
            },

            addItemInIncomeAccounts: function (item) {
                billsCategories.$add(item);
            },

            delItemInIncomeAccounts: function (item) {
                billsCategories.$remove(item);
            },
            updItemInIncomeAccounts: function (item) {
                billsCategories.$save(item);
            },
            getItemInIncomeAccounts: function (key) {
                return billsCategories.$getRecord(key);
            },


            getIncomeTransfers: function () {
                return transfers;
            },
            getIncomeTransfersLast: function () {
                return queryTransfers;
            },
            addIncomeTransfer: function (item) {
                queryTransfers.$add(item);
            },
            delIncomeTransfer: function (item) {
                queryTransfers.$remove(item);
            },
        };
    }]);