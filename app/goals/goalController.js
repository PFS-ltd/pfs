app.controller('GoalController', function($scope,$uibModal,ngToast){


    $scope.createNewGoal = function () {
        var modalCreateGoal = $uibModal.open({
        templateUrl: 'app/modals/goals/addNewGoal/template.html',
        controller: 'addNewGoalCtrl',
        size: 'lg',
      });
    };



});