(function () {
    var homeController = app.controller('HomeController',
        function ($scope, Auth, ngToast, $state, currentAuth, $transitions, $location, settingsService) {
            if (currentAuth == null) {
                $state.transitionTo('root')
            } 
            
            $scope.classes = ['', '', '', ''];
            $scope.changeClass = function(index) {
                $scope.classes.forEach(function(item, i, arr){
                    if (i != index) arr[i] = '';
                    else arr[i] = 'active';
                })
            }
            $scope.locPaths = ['/home/income', '/home/costs', '/home/statistics', '/home/calendar',]
            if ($scope.locPaths.indexOf($location.$$path) != -1) {
                $scope.classes.forEach(function(item, i, arr){
                    (i != $scope.locPaths.indexOf($location.$$path)) ? arr[i] = '' : arr[i] = 'active';
                })
            }
        
            $scope.signOut = function (pass) {
                Auth.$signOut().then(function () {
                    var asdf = 'Прощай'
                    $state.transitionTo('root');
                    ngToast.create(asdf);
                    
                })
            }
        });

    homeController.$inject = ['$scope', 'Auth', 'ngToast', '$state', 'currentAuth', '$transitions', '$location', 'settingsService']
})();
