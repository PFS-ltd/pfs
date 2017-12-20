(function(){
    app.controller('editIncomeAccountController', ['$uibModalInstance','$scope', 'ngToast', 'accountNames', 'item', function ($uibModalInstance, $scope, ngToast, accountNames, item) {
        
        $scope.item = item;
        $scope.accountNames = accountNames;
        
        $scope.accountNames.splice($scope.accountNames.indexOf(item.title), 1);
        
        $scope.cancel = function() {
                $uibModalInstance.dismiss('cancel');
        };
    
        $scope.ok = function(item) {
            if (item.title === '') {
                ngToast.create({
                    content: 'Некорректное название', 
                    className: 'danger'
                });
            } else if ($scope.accountNames.indexOf(item.title) === -1) {
//                        console.log(item);
                        item.id = item.$id;
                        $uibModalInstance.close(item);
                    } else ngToast.create({content: 'Источник с таким названием уже есть', className: 'danger'});
        };
        
    }]) ;
})();