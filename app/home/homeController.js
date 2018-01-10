(function () {
    var homeController = app.controller('HomeController',
        function ($scope, Auth, ngToast, $state, currentAuth, $location, settingsService, $http, incomeService) {
            
            var homeCtrl = this;
        
            if (currentAuth == null) {
                $state.transitionTo('root');
            };
            
            this.classes = ['', '', '', '', '', '', ''];
            this.changeClass = function(index) {
                homeCtrl.classes.forEach(function(item, i, arr) {
                    (i != index) ? arr[i] = '' : arr[i] = 'active';
                })
            };
            this.locPaths = ['/home/income', '/home/costs', '/home/statistics', '/home/calendar', '/home/goals', '/home/settings', '/home/history']
            if (this.locPaths.indexOf($location.$$path) != -1) {
                this.classes.forEach(function(item, i, arr) {
                    (i != homeCtrl.locPaths.indexOf($location.$$path)) ? arr[i] = '' : arr[i] = 'active';
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
                    homeCtrl.amount = amountMoney(incomeArr);
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
                this.seeConv = false;
            } else if (localStorage.getItem('converter') === 'true') this.seeConv = true;
            
            if (localStorage.getItem('rates') === null || localStorage.getItem('rates') === 'false') {
                localStorage.setItem('rates', 'false');
                this.seeRates = false;
            } else if (localStorage.getItem('rates') === 'true') this.seeRates = true;
        
            $scope.$on('widgets', function(event, data) {
                (data.widget === 'converter') ? homeCtrl.seeConv = data.value : homeCtrl.seeRates = data.value;
            });
        
            this.currencyRates = [];
            this.currencyNames = [];
            this.currency1 = 0;
            this.currency2 = 0;
            this.i = 0;
            this.j = 0;
            this.k = 0;
            $http.get("https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5").then(function (response) {
//                console.log(response)
                homeCtrl.currencyRates = response.data;
                homeCtrl.currencyRates.splice(3,1);   //delete bitcoin
                homeCtrl.currencyRates.forEach(function(item, i, arr) {
                    item.buy = (+item.buy).toFixed(3);
                    item.sale = (+item.sale).toFixed(3);
//                    console.log(item)
                    homeCtrl.currencyNames.push(arr[i].ccy);
                });
                homeCtrl.currencyNames.push("UAH");
//                console.log($scope.currencyRates);
            }, function (error) {
                // console.log(error);
            });
            
            this.changeCurr = function() {
                ( homeCtrl.i != (homeCtrl.currencyRates.length-1) ) ? homeCtrl.i++ : homeCtrl.i = 0;
            };   
            this.convertCurr1 = function() {
                ( homeCtrl.j != (homeCtrl.currencyNames.length-1) ) ? homeCtrl.j++ : homeCtrl.j = 0;
            };  
            this.convertCurr2 = function() {
                ( homeCtrl.k != (homeCtrl.currencyNames.length-1) ) ? homeCtrl.k++ : homeCtrl.k = 0;
            }; 
            this.calculate = function() {
                if (homeCtrl.currencyNames[homeCtrl.j] === homeCtrl.currencyNames[homeCtrl.k]) homeCtrl.currency2 = homeCtrl.currency1;
                else if (homeCtrl.currencyNames[homeCtrl.j] != "UAH" && homeCtrl.currencyNames[homeCtrl.k] === "UAH") {
                            homeCtrl.currency2 = homeCtrl.currency1 * homeCtrl.currencyRates[homeCtrl.j].buy;
                    } else if (homeCtrl.currencyNames[homeCtrl.j] === "UAH" && homeCtrl.currencyNames[homeCtrl.k] != "UAH") {
                            homeCtrl.currency2 = homeCtrl.currency1 / homeCtrl.currencyRates[homeCtrl.k].sale;
                        } else if (homeCtrl.currencyNames[homeCtrl.j] != "UAH" && homeCtrl.currencyNames[homeCtrl.k] != "UAH") {
                            homeCtrl.currency2 = (homeCtrl.currency1 * homeCtrl.currencyRates[homeCtrl.j].buy) / homeCtrl.currencyRates[homeCtrl.k].sale;
                        }
            };
            
            this.signOut = function () {               
                Auth.$signOut().then(function () {
                    // var asdf = 'Прощай'
                    $state.transitionTo('root');
                    // ngToast.create(asdf);
                })
            }
        });

    homeController.$inject = ['$scope', 'Auth', 'ngToast', '$state', 'currentAuth', '$location', 'settingsService', '$http', 'incomeService']
})();