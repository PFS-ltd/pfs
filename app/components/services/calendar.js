app.service('calendarService', ['$state', 'Auth', "$firebaseObject", "$firebaseArray",
    function ($state, Auth, $firebaseObject, $firebaseArray) {
        var uId = Auth.$getAuth().uid;
        var eventsArrRef = firebase.database().ref('users/' + uId + '/calendar/events/');
        var eventsArr = $firebaseArray(eventsArrRef);
      
        return {
            getEvents: function () {
                return eventsArr;
            },
            addEvent: function (item) {
                eventsArr.$add(item);
            },
            delEvent: function (item) {
                eventsArr.$remove(item);
            },
            updateEvents: function (item) {
                eventsArr.$save(item);
            },
        
            getEvent: function() {
                return $firebaseObject(eventsArrRef);
            },      
        };
    }]);