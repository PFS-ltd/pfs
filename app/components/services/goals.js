app.service('goalsService', ['$state', 'Auth', "$firebaseObject", "$firebaseArray",
    function ($state, Auth, $firebaseObject, $firebaseArray) {
        var uId = Auth.$getAuth().uid;

        var goalsRef = firebase.database().ref('users/' + uId + '/goals');
        var goalsArr = $firebaseArray(goalsRef);

        // var costsTemplateRef = firebase.database().ref('users/' + uId + '/costs/templateCosts');
        // var costsTemplate = $firebaseArray(costsTemplateRef);


        // var transferRef = firebase.database().ref('users/' + uId + '/costs/costsTransfer');
        // var costsTransfers = $firebaseArray(transferRef);

        // var query = transferRef.orderByChild("timestamp").limitToLast(5);
        // var queryTransfers = $firebaseArray(query);


        return {
            getGoalsArr: function () {
                return goalsArr;
            },
            addGoal: function (item) {
                goalsArr.$add(item);
            },
            delGoal: function (item) {
                goalsArr.$remove(item);
            },
            updGoal: function (item) {
                goalsArr.$save(item);
            },

        };
    }]);