app.controller('GoalController', function($scope,$uibModal,ngToast, goalsService){
    $scope.goalArr = goalsService.getGoalsArr();
    console.log($scope.goalArr);
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
        goalsService.addGoal(result);
        ngToast.create ({
            'content' : 'Накопление успешно добавлено',
            'className' : 'success'
        }) 
        console.log($scope.goalArr);
      }, function() {
        console.log('close');
      }); 
    };


    $scope.deleteGoalCategory = function(item){
        var delGoal = $uibModal.open ({
            templateUrl: 'app/modals/goals/modalDeleteGoal/templateDelete.html',
            controller: 'ModalController',
            size: 'md',
            resolve: {
                item: function () {
                    return item;
                },
            },
        });
        delGoal.result.then(function (result) {
            goalsService.delGoal(item);
            ngToast.create ({
                'content' : 'Накопление успешно удалено',
                'className' : 'success'
            }) 
          }, function() {
            console.log('close');
          });
       
    }
    $scope.editGoalCategory = function(item){
        var editGoal = $uibModal.open ({
            templateUrl: 'app/modals/goals/editGoal/template.html',
            controller : 'editGoalCtrl',
            size: 'lg',
            resolve: {
                item : function (){
                    return item;
                }
            }
        });
        editGoal.result.then (function (result){
            goalsService.updGoal(item);
            ngToast.create ({
                'content': 'Редактирование прошло успешно',
                'className': 'success'
            })
        }, function () {
            console.log('cancel');
        });
        
    }
});