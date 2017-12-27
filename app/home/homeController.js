(function () {
    var homeController = app.controller('HomeController',
        function ($scope, Auth, ngToast, $state, currentAuth, $transitions, $location, settingsService, $http) {
        
            if (currentAuth == null) {
                $state.transitionTo('root')
            } 
            
            $scope.classes = ['', '', '', '', ''];
            $scope.changeClass = function(index) {
                $scope.classes.forEach(function(item, i, arr){
                    if (i != index) arr[i] = '';
                    else arr[i] = 'active';
                })
            }
            $scope.locPaths = ['/home/income', '/home/costs', '/home/statistics', '/home/calendar', '/home/settings']
            if ($scope.locPaths.indexOf($location.$$path) != -1) {
                $scope.classes.forEach(function(item, i, arr){
                    (i != $scope.locPaths.indexOf($location.$$path)) ? arr[i] = '' : arr[i] = 'active';
                })
            }
    
//        console.log($location.$$path);
//            $transitions.onRetain({ entering: 'home.income' }, function(transition) {
//                console.log("Now at 'income' state");
//            });
        //$transitions удалить
        
        //Currencies
            $scope.currencyRates = [];
            $scope.currencyNames = [];
            $scope.currency1 = 0;
            $scope.currency2 = 0;
            $scope.i = 0;
            $scope.j = 0;
            $scope.k = 0;
            $http.get("https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5").then(function (response) {
//                console.log(response)
                $scope.currencyRates = response.data;
                $scope.currencyRates.splice(3,1);
                $scope.currencyRates.forEach(function(item, i, arr) {
                    $scope.currencyNames.push(arr[i].ccy);
                });
                $scope.currencyNames.push("UAH");
//                console.log($scope.currencyRates);
            }, function (error) {
                console.log(error);
            })
            
            $scope.changeCurr = function() {
                ( $scope.i != ($scope.currencyRates.length-1) ) ? $scope.i++ : $scope.i = 0;
            }   
            $scope.convertCurr1 = function() {
                ( $scope.j != ($scope.currencyNames.length-1) ) ? $scope.j++ : $scope.j = 0;
            }  
            $scope.convertCurr2 = function() {
                ( $scope.k != ($scope.currencyNames.length-1) ) ? $scope.k++ : $scope.k = 0;
            } 
            $scope.calculate = function() {
                if ($scope.currencyNames[$scope.j] === $scope.currencyNames[$scope.k]) $scope.currency2 = $scope.currency1;
                else if ($scope.currencyNames[$scope.j] != "UAH" && $scope.currencyNames[$scope.k] === "UAH") {
                            $scope.currency2 = $scope.currency1 * $scope.currencyRates[$scope.j].buy;
                    } else if ($scope.currencyNames[$scope.j] === "UAH" && $scope.currencyNames[$scope.k] != "UAH") {
                            $scope.currency2 = $scope.currency1 / $scope.currencyRates[$scope.k].sale;
                        } else if ($scope.currencyNames[$scope.j] != "UAH" && $scope.currencyNames[$scope.k] != "UAH") {
                            $scope.currency2 = ($scope.currency1 * $scope.currencyRates[$scope.j].buy) / $scope.currencyRates[$scope.k].sale;
                        }
            } 
            
            $scope.signOut = function () {               
                Auth.$signOut().then(function () {
                    var asdf = 'Прощай'
                    $state.transitionTo('root');
                    ngToast.create(asdf);
                    
                })
            }
        });

    homeController.$inject = ['$scope', 'Auth', 'ngToast', '$state', 'currentAuth', '$transitions', '$location', 'settingsService', '$http']
})();
