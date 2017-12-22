(function(){
    app.controller('editIncomeSourceController', ['$uibModalInstance', '$scope', 'ngToast', 'item', 'sourceNames', function ($uibModalInstance, $scope, ngToast, item, sourceNames) {
        
        $scope.item = item;
        $scope.sourceNames = sourceNames;
        
        $scope.sourceNames.splice($scope.sourceNames.indexOf(item.title), 1); //удаляет из массива title текущей категории чтобы нормально реагировало на Сохранить если изменений не сделали
        
        $scope.cancel = function() {
            $uibModalInstance.close(false);
        };
    
        $scope.ok = function(item) {
            if (item.title === '') {
                ngToast.create({
                    content: 'Некорректное название', 
                    className: 'danger'
                });
            } else if ($scope.sourceNames.indexOf(item.title) === -1) {
//                        console.log(item);
                        item.id = item.$id;
                        $uibModalInstance.close(item);
                    } else ngToast.create({content: 'Источник с таким названием уже есть', className: 'danger'});
        };
        
    }]) ;
})();