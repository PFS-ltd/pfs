app.service('goalsService', ['$state', 'Auth', "$firebaseObject", "$firebaseArray",
    function ($state, Auth, $firebaseObject, $firebaseArray) {
        var uId = Auth.$getAuth().uid;

        var goalsRef = firebase.database().ref('users/' + uId + '/goals/listOfGoals');
        var goalsArr = $firebaseArray(goalsRef);

        var goalsTransferRef = firebase.database().ref('users/' + uId + '/goals/transferGoals');
        var goalsTransferArr = $firebaseArray(goalsTransferRef);

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
            getItemInGoalCategoriesByKey: function (key) {
                return goalsArr.$getRecord(key);
            },
            getGoalsTransferArr: function () {
                return goalsTransferArr;
            },
            addGoalsTransferArr: function (item) {
                goalsTransferArr.$add(item);
            },
            delGoalsTransferArr: function (item) {
                goalsTransferArr.$remove(item);
            },
            updGoalsTransferArr: function (item) {
                goalsTransferArr.$save(item);
            },
            getItemInGoalsTransferByKey: function (key) {
                return goalsTransferArr.$getRecord(key);
            },

        };
    }]);