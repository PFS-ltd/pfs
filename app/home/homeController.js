(function () {
    var homeController = app.controller('HomeController',
        function ($scope, Auth, ngToast, $state, currentAuth, $location, settingsService, $http, incomeService) {
            
            if (currentAuth == null) {
                $state.transitionTo('root');
            };
            
            $scope.classes = ['', '', '', '', '', ''];
            $scope.changeClass = function(index) {
                $scope.classes.forEach(function(item, i, arr) {
                    (i != index) ? arr[i] = '' : arr[i] = 'active';
                })
            };
            $scope.locPaths = ['/home/income', '/home/costs', '/home/statistics', '/home/calendar', '/home/goals', '/home/settings']
            if ($scope.locPaths.indexOf($location.$$path) != -1) {
                $scope.classes.forEach(function(item, i, arr) {
                    (i != $scope.locPaths.indexOf($location.$$path)) ? arr[i] = '' : arr[i] = 'active';
                })
            };
        
            var incomeArr = incomeService.getIncomeAccounts();
            
            function amountMoney(arr){
                var amount =0;
                arr.forEach(function(item){
                    amount += item.amount;
                })
                return amount;
            }
        
            incomeArr.$watch(
                function (event) {
                    $scope.amount = amountMoney(incomeArr);
                }
            );
        
        //WTF?????
//        this.incomeArr = incomeService.getIncomeAccounts();
//        this.amount = 0;
//        this.incomeArr.forEach(function(item){
//            console.log(item);
//                    homeCtrl.amount += item.amount;
//                });
        
        
        
        //Currencies
            if (localStorage.getItem('converter') === null || localStorage.getItem('converter') === 'false') {
                localStorage.setItem('converter', 'false');
                $scope.seeConv = false;
            } else if (localStorage.getItem('converter') === 'true') $scope.seeConv = true;
            
            if (localStorage.getItem('rates') === null || localStorage.getItem('rates') === 'false') {
                localStorage.setItem('rates', 'false');
                $scope.seeRates = false;
            } else if (localStorage.getItem('rates') === 'true') $scope.seeRates = true;
        
            $scope.$on('widgets', function(event, data) {
                (data.widget === 'converter') ? $scope.seeConv = data.value : $scope.seeRates = data.value;
            });
        
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
                $scope.currencyRates.splice(3,1);   //delete bitcoin
                $scope.currencyRates.forEach(function(item, i, arr) {
                    $scope.currencyNames.push(arr[i].ccy);
                });
                $scope.currencyNames.push("UAH");
//                console.log($scope.currencyRates);
            }, function (error) {
                // console.log(error);
            });
            
            $scope.changeCurr = function() {
                ( $scope.i != ($scope.currencyRates.length-1) ) ? $scope.i++ : $scope.i = 0;
            };   
            $scope.convertCurr1 = function() {
                ( $scope.j != ($scope.currencyNames.length-1) ) ? $scope.j++ : $scope.j = 0;
                $scope.calculate();
            };  
            $scope.convertCurr2 = function() {
                ( $scope.k != ($scope.currencyNames.length-1) ) ? $scope.k++ : $scope.k = 0;
                $scope.calculate();
            }; 
            $scope.calculate = function() {
                if ($scope.currencyNames[$scope.j] === $scope.currencyNames[$scope.k]) $scope.currency2 = $scope.currency1;
                else if ($scope.currencyNames[$scope.j] != "UAH" && $scope.currencyNames[$scope.k] === "UAH") {
                            $scope.currency2 = $scope.currency1 * $scope.currencyRates[$scope.j].buy;
                    } else if ($scope.currencyNames[$scope.j] === "UAH" && $scope.currencyNames[$scope.k] != "UAH") {
                            $scope.currency2 = $scope.currency1 / $scope.currencyRates[$scope.k].sale;
                        } else if ($scope.currencyNames[$scope.j] != "UAH" && $scope.currencyNames[$scope.k] != "UAH") {
                            $scope.currency2 = ($scope.currency1 * $scope.currencyRates[$scope.j].buy) / $scope.currencyRates[$scope.k].sale;
                        }
            };
            
            $scope.signOut = function () {               
                Auth.$signOut().then(function () {
                    // var asdf = 'Прощай'
                    $state.transitionTo('root');
                    // ngToast.create(asdf);
                })
            }
        });

    homeController.$inject = ['$scope', 'Auth', 'ngToast', '$state', 'currentAuth', '$location', 'settingsService', '$http', 'incomeService']
})();