(function () {
    app.controller('HistoryController', ['$scope', 'incomeService', 'goalsService', 'ngToast', '$translate', 'costsService', function ($scope, incomeService, goalsService, ngToast, $translate, costsService) {
        var historyCtrl = this;
        
        this.viewItems = "10";
        this.currentPage = 1;
        this.itemsPerPage = 10;
        this.search = '';
        this.dateFormat = $translate.instant('Date format');
        this.tabIndex = 0;
        
        this.compareDate = function(a, b) {
            if (a.date > b.date) return -1;
            if (a.date < b.date) return 1;
        };
        
        this.filterHandler = function(item) {
            var count = 0;
//            console.log(item);
            for (var key in item) {
                if (String(key)[0] != '$') {
                    if (typeof item[key] === 'object') {
                        if ( (item[key].title).indexOf(historyCtrl.search) != -1 ) count++;
                    } else if (typeof item[key] === 'number') {
                                if (String(item[key]).indexOf(historyCtrl.search) != -1) count++;
                            }
                }
            }
            if (count) return item;
        };
        
        this.incomeTransfers = (incomeService.getIncomeTransfers()).sort(historyCtrl.compareDate);
        this.costTransfers = (costsService.getCostsTransferArray()).sort(historyCtrl.compareDate);
        this.goalsTransfers = (goalsService.getGoalsTransferArr()).sort(historyCtrl.compareDate);
        
        this.incomes = this.incomeTransfers.concat();
        this.costs = this.costTransfers.concat();
        this.goals = this.goalsTransfers.concat();
        
        this.totalLength = this.incomes.length;
        
//        this.incomeTransfers.sort(historyCtrl.compareDate);
//        this.costTransfers.sort(historyCtrl.compareDate);
//        this.goalsTransfers.sort(historyCtrl.compareDate);
        
        this.tabSelected = function(tab) {
            if (tab == 0) {
                historyCtrl.totalLength = historyCtrl.incomes.length;
                historyCtrl.tabIndex = tab;
            }
            else if (tab == 1) {
//                console.log(historyCtrl.costs);
                historyCtrl.totalLength = historyCtrl.costs.length;
                historyCtrl.tabIndex = tab;
                }
                    else if (tab == 2) {
                        historyCtrl.totalLength = historyCtrl.goals.length;
                        historyCtrl.tabIndex = tab;
                    }
            historyCtrl.currentPage = 1;
        };
        
        this.setItemsPerPage = function(num) {
            historyCtrl.itemsPerPage = num;
            historyCtrl.currentPage = 1;
        };
        
        this.filterBy = function() {
                historyCtrl.incomes = historyCtrl.incomeTransfers.filter(historyCtrl.filterHandler);
                historyCtrl.costs = historyCtrl.costTransfers.filter(historyCtrl.filterHandler);
                historyCtrl.goals = historyCtrl.goalsTransfers.filter(historyCtrl.filterHandler);
                historyCtrl.tabSelected(historyCtrl.tabIndex);
        };
            
        $scope.sortField = '-date';
        $scope.sortBy = function (field) {
            $scope.sortField = ($scope.sortField === field) ? ('-' + $scope.sortField) : field;
        };
    }]);
})();