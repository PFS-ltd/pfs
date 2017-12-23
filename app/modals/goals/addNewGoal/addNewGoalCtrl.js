 app.controller('addNewGoalCtrl', function($scope,$uibModalInstance,ngToast,newGoal){

     $scope.newGoal = newGoal;
     console.log($scope.newGoal);
    $scope.cancel = function () {
        $uibModalInstance.dismiss('false');
    };
    $scope.ok = function (result) {
        console.log(result);
        $uibModalInstance.close(result);
    };
});