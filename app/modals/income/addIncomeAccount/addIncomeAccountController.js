(function(){
    app.controller('addIncomeAccountController', ['$uibModalInstance', '$scope', 'ngToast', 'accountNames', function ($uibModalInstance, $scope, ngToast, accountNames) {
        
        $scope.account = {};
        $scope.accountNames = accountNames;
        
        $scope.cancel = function() {
            $uibModalInstance.close(false);
        };
    
        $scope.ok = function(item) {
            if (item.title === undefined) { ngToast.create({content: 'Укажите название', className: 'danger'});
            } else {
                var validName = item.title.trim();
                if (!validName.length) {
                    ngToast.create({content: 'Некорректное название', className: 'danger'});
                    item.title = undefined;
                }
                else ($scope.accountNames.indexOf(validName) === -1) ? $uibModalInstance.close(item) : ngToast.create({content: 'Счет с таким названием уже есть', className: 'danger'});
            }
        };
        
    }]);
})();