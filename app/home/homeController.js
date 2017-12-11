(function () {
    var homeController = app.controller('HomeController',
        function ($scope, Auth, ngToast, $state, currentAuth) {
            if (currentAuth == null) {
                $state.transitionTo('root')
            } 
            
            $scope.signOut = function () {
               
               
                Auth.$signOut().then(function () {
                    $state.transitionTo('root');
                    ngToast.create('Good-bye');
                })
            }
        });

    homeController.$inject = ['$scope', 'Auth', 'ngToast', '$state', 'currentAuth']
})();
