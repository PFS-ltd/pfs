app.service('settingsService', ['$state', 'Auth', "$firebaseObject", "$firebaseArray",
function ($state, Auth, $firebaseObject, $firebaseArray) {
    var uId = Auth.$getAuth().uid;

    var rolesRef = firebase.database().ref('users/' + uId + '/settings/roles');
    var rolesArr = $firebaseArray(rolesRef);

    var themeRef = firebase.database().ref('users/' + uId + '/settings/themeColor');
    var themes = $firebaseArray(themeRef);


    var userNameRef = firebase.database().ref('users/' + uId + '/settings/username');
    var userNameRef = $firebaseObject(userNameRef);

    var langRef = firebase.database().ref('users/' + uId + '/settings/locals');
    var prefLang = $firebaseObject(langRef);
    
    return {
        getRolesArray: function () {
            return rolesArr;
        },
        addRole: function (item) {
            rolesArr.$add(item);
        },
        delIRole: function (item) {
            rolesArr.$remove(item);
        },
        updateRole: function (item) {
            rolesArr.$save(item);
        },
        getRoleByKey: function (key) {
            // console.log(key)
            return rolesArr.$getRecord(key);
        },
        getPrefLang: function () {
            return prefLang;
        },
        updatePrefLang: function (item) {
            prefLang.$save(item);
        }

        // getCostsTemplateArray: function () {
        //     return costsTemplate;
        // },
        // addItemInCostsTemplate: function (item) {
        //     costsTemplate.$add(item);
        // },
        // delItemInCostsTemplate: function (item) {
        //     costsTemplate.$remove(item);
        // },
        // updateItemInCostsTemplate: function (item) {
        //     costsTemplate.$save(item);
        // },
        // getItemInCostsTemplateByKey: function (key) {
        //     return costsTemplate.$getRecord(key);
        // },


        // getCostsTransferArray: function () {
        //     return costsTransfers;
        // },

        // addItemInCostsTransfer: function (item) {
        //     costsCategories.$add(item);
        // },
        // delItemInCostsTransfer: function (item) {
        //     costsCategories.$remove(item);
        // },
        // updateItemInCostsTransfer: function (item) {
        //     costsCategories.$save(item);
        // },
        // getItemInCostsTransferByKey: function (key) {
        //    return costsCategories.$getRecord(key);
        // },

    };
}]);