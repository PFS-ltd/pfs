app.controller('GoalController', function($scope, $log, $document,$uibModal,ngToast, goalsService,costsService,incomeService, settingsService, uibDateParser, $filter){
    $scope.costsTransferArrQuery = costsService.getCostsTransferArrayLast();
    console.log('$scope.costsTransferArrQuery',$scope.costsTransferArrQuery);
    $scope.billsCategories = incomeService.getIncomeAccounts();
    console.log($scope.goalArr)
    $scope.goalArr = goalsService.getRolesArray();
    console.log('goalArr', $scope.goalArr)
    $scope.rolesArr = settingsService.getRolesArray();
    console.log('$scope.rolesArr', $scope.rolesArr);
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
    $scope.newCosts = {};
    $scope.newCosts.date = new Date();
    // добавление даты и календаря в инпут 
    $scope.today = function () {
      $scope.newCosts.date = new Date();

    };
    $scope.today();

    $scope.dateOptions = {
      format: 'yy',
      maxDate: new Date(2020,5,22)
    };

    $scope.openPicker = function () {
      $scope.popup.opened = true;
    };

    $scope.setDate = function (year, month, day) {
      $scope.date = new Date(year, month, day);
    };

    $scope.popup = {
      opened: false
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
            goalArr : function () {
                return $scope.goalArr;
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
    var modItem = angular.extend({},item);
    var backup = angular.extend({},item);
    item.title = undefined;
        var editGoal = $uibModal.open ({
            templateUrl: 'app/modals/goals/editGoal/template.html',
            controller : 'editGoalCtrl',
            size: 'lg',
            resolve: {
                item : function (){
                    return modItem;
                },
                goalArr : function () {
                    return $scope.goalArr;
                },
            }
        });
        editGoal.result.then (function (result){
            item  = angular.extend(item,result);
            goalsService.updGoal(item);
            ngToast.create ({
                'content': 'Редактирование прошло успешно',
                'className': 'success'
            })
        }, function () {
            item = angular.extend(item,backup);
        });
        
    }
});