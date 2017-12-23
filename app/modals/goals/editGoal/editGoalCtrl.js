 app.controller('editGoalCtrl', function($scope,$uibModalInstance,ngToast,item){

    $scope.item = item ;
     console.log($scope.newGoal);
    $scope.cancel = function () {
        $uibModalInstance.dismiss('false');
    };
    $scope.ok = function (result) {
        console.log(result);
        $uibModalInstance.close(result);
    };
});