(function(){
    app.controller('addIncomeSourceController', ['$uibModalInstance','$scope', 'ngToast', 'sourceNames', function ($uibModalInstance, $scope, ngToast, sourceNames) {
        
        $scope.sourceNames = sourceNames;
        
        $scope.source = {};
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
                else ($scope.sourceNames.indexOf(validName) === -1) ? $uibModalInstance.close(item) : ngToast.create({content: 'Источник с таким названием уже есть', className: 'danger'});
            }
        };
        
    }]);
})();