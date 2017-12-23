app.controller('addNewGoalCtrl', function($scope,$uibModalInstance,ngToast){

    $scope.cancel = function () {
        $uibModalInstance.close();
    };
    $scope.ok = function () {
        $uibModalInstance.close();
    };
});