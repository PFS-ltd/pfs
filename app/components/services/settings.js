app.service('settingsService', ['$state', 'Auth', "$firebaseObject", "$firebaseArray",
function ($state, Auth, $firebaseObject, $firebaseArray) {
    var uId = Auth.$getAuth().uid;

    var rolesRef = firebase.database().ref('users/' + uId + '/settings/roles');
    var rolesArr = $firebaseArray(rolesRef);

    var themeRef = firebase.database().ref('users/' + uId + '/settings/themeColor');
    var themes = $firebaseArray(themeRef);


    var userNameRef = firebase.database().ref('users/' + uId + '/settings/username');
    var userNameRef = $firebaseObject(userNameRef);

    var userRef = firebase.database().ref('users');
    var user = $firebaseArray(userRef);

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
            return rolesArr.$getRecord(key);
        },
        delUser: function(uid) {
            user.$remove(user.$getRecord(uid));
        },
        getPrefLang: function () {
            return prefLang;
        },
        updatePrefLang: function (item) {
            prefLang.$save(item);
        }


    };
}]);