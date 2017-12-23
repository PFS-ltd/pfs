app.controller('GoalController', function($scope,$uibModal,ngToast){
    $scope.goalArr = [];
    $scope.goalInput = {
        who: '',
        from: {
            id: '',
            title : ''
        },
        to : {
            id: '',
            title: ''
        },
        sum : 0,
        date : '',
        comment: '',
    };
    $scope.goalCategoryModel = {
        title : '',
        sumMax : 0 , 
        sumValue : 0 ,
    };
    

    $scope.addNewGoal = function () {
        newGoal = angular.extend({},$scope.goalCategoryModel);
        var modalCreateGoal = $uibModal.open({
        templateUrl: 'app/modals/goals/addNewGoal/template.html',
        controller: 'addNewGoalCtrl',
        size: 'lg',
        resolve: {
            newGoal : function () {
                return newGoal;
            },
        },
      });
      modalCreateGoal.result.then(function (result) {
        $scope.goalArr.push(result);
        console.log($scope.goalArr);
      }, function() {
        console.log('close');
      }); 
    };



});