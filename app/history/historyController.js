(function () {
    app.controller('HistoryController', ['$scope', 'incomeService', 'goalsService', 'ngToast', '$translate', 'costsService', function ($scope, incomeService, goalsService, ngToast, $translate, costsService) {
        var historyCtrl = this;
        
        this.incomeTransfers = incomeService.getIncomeTransfers();
        this.costTransfers = costsService.getCostsTransferArray();
        this.goalsTransfers = goalsService.getGoalsTransferArr();
//        console.log(this.goalsTransfers);
        this.totalLength = this.incomeTransfers.length;
        this.viewItems = "10";
        this.currentPage = 1;
        this.itemsPerPage = 10;
        this.search = '';
        this.dateFormat = $translate.instant('Date format');
        
        this.compareDate = function(a, b) {
            if (a.date > b.date) return -1;
            if (a.date < b.date) return 1;
        };
        
        this.incomeTransfers.sort(historyCtrl.compareDate);
        this.tabSelected = function(tab) {
            if (tab == 0) historyCtrl.totalLength = historyCtrl.incomeTransfers.length;
            else if (tab == 1) {
                historyCtrl.totalLength = historyCtrl.costTransfers.length;
                this.costTransfers.sort(historyCtrl.compareDate);
                }
                    else if (tab == 2) {
                        historyCtrl.totalLength = historyCtrl.goalsTransfers.length;
                        this.goalsTransfers.sort(historyCtrl.compareDate);
                    }
            historyCtrl.currentPage = 1;
        }
        
        this.setItemsPerPage = function(num) {
            historyCtrl.itemsPerPage = num;
            historyCtrl.currentPage = 1;
        }
        
        $scope.sortField = '-date';
        $scope.sortBy = function (field) {
            $scope.sortField = ($scope.sortField === field) ? ('-' + $scope.sortField) : field;
        };
    }]);
})();