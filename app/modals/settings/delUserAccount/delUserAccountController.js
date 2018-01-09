(function(){
    app.controller('delUserAccountController', ['$uibModalInstance','$scope', function ($uibModalInstance, $scope) {
        $scope.cancel = function() {
            $uibModalInstance.close(false);
    
        };
    
        $scope.ok = function() {
            // console.log(item);
            // item.id = item.$id;
            $uibModalInstance.close(true);
        };
    }]) ;
})();