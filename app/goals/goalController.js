app.controller('GoalController', function($scope, $log, $document,$uibModal,ngToast, goalsService,costsService,incomeService, settingsService, uibDateParser, $filter){
    $scope.costsTransferArrQuery = costsService.getCostsTransferArrayLast();
    // console.log('$scope.costsTransferArrQuery',$scope.costsTransferArrQuery);
    $scope.incomeTransfers = incomeService.getIncomeTransfersLast();
    console.log('incomeTransfer', $scope.incomeTransfers);
    $scope.billsCategories = incomeService.getIncomeAccounts();
    // console.log('billCat', $scope.billsCategories);
    $scope.goalArr = goalsService.getGoalsArr();
    // console.log('goalArr', $scope.goalArr)
    $scope.rolesArr = settingsService.getRolesArray();
    // console.log('$scope.rolesArr', $scope.rolesArr);
    $scope.isCollapsed = true;
  
    $scope.MyFilter = function (key) {
        return key.title;
    }
    $scope.goalInput = {
        who: '',
        from: {
            id: 'sad34s',
            title : 'cash'
        },
        to : {
            id: 'dflkm232',
            title: 'mazda'
        },
        sum : 0,
        date : '',
        comment: '',
    };
    $scope.goalCategoryModel = {
        title : '',
        sumMax : 0 , 
        sum : 0 ,
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

    $scope.validInput = function (item) {
        //DATE
        // console.log(item)
       if (item.date === undefined) {
           ngToast.create({
               "content": "Укажите дату",
               "className": 'danger'
           })
           return false;
       }
       
       //WHO
       if (item.who === null || item.who === undefined) {
           ngToast.create({
               "content": "Укажите участника",
               "className": 'danger'
           })
           return false;
       }
       
       //FROM
       if (item.from === null || item.from === undefined) {
           ngToast.create({
               "content": "Укажите счет",
               "className": 'danger'
           })
           return false;
       }
       
       //TO
       if (item.to === null || item.to === undefined) {
           ngToast.create({
               "content": "Укажите категорию",
               "className": 'danger'
           })
           return false;
       }
       
       //SUM
       if (item.sum === null || item.sum === undefined) {
           ngToast.create({
               "content": "Укажите сумму",
               "className": 'danger'
           })
           return false;
       }
       
       return true;

};

    $scope.addNewGoal = function () {
        newGoal = angular.extend({},$scope.goalCategoryModel);
        var modalCreateGoal = $uibModal.open({
        templateUrl: 'app/modals/goals/addNewGoal/template.html',
        controller: 'addNewGoalCtrl',
        size: 'md',
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
        // console.log($scope.goalArr);
      }, function() {
        console.log('close');
      }); 
    };


    $scope.deleteGoalCategory = function(item){
        var delGoal = $uibModal.open ({
            templateUrl: 'app/modals/goals/modalDeleteGoal/templateDelete.html',
            controller: 'ModalController',
            size: 'sm',
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
            size: 'md',
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
    var makeTransfer = function (item) {
        var bill = $scope.billsCategories.$getRecord(item.from.id);
        // var cost = costsService.getItemInCostsCategoriesByKey(item.to.id);
        var goal = goalsService.getItemInGoalCategoriesByKey(item.to.id);
  
        if ((bill.amount - item.sum) < 0) {
          ngToast.create({
            "content": "Недоасточно денег на счету " + bill.title,
            "className": 'danger'
          })
        } else {
          bill.amount = bill.amount - item.sum;
          goal.sum = goal.sum + item.sum;
        //   if (cost.sum > cost.limitPayment && cost.limitPayment !=0) {
        //     ngToast.create({
        //       "content": "Вы превысили запланированный лимит по категории " + cost.title,
        //       "className": 'warning'
        //     })
        //   }
          $scope.billsCategories.$save(bill);
          costsService.addItemInQueryCostsTransfer(item);
          goalsService.updGoal(goal);
          
        }
      }
      var makeReverseTransfer = function (item) {
        var bill = $scope.billsCategories.$getRecord(item.from.id);
        var goal = goalsService.getItemInGoalCategoriesByKey(item.to.id);
        
          bill.amount = bill.amount + item.sum;
          goal.sum = goal.sum - item.sum;
          
          $scope.billsCategories.$save(bill);
          goalsService.updGoal(goal);

          // costsService.addItemInCostsTransfer(item);
        }
        $scope.deleteTransfer = function (item) {
            var delGoal = $uibModal.open ({
                templateUrl: 'app/modals/goals/modalDeleteGoal/templateDelete.html',
                controller: 'ModalTablController',
                size: 'md',
                resolve: {
                    item: function () {
                        return item;
                    },
                },
            });
            delGoal.result.then(function (result) {
                costsService.delItemInQueryCostsTransferLast(item);
          console.log(item)
          makeReverseTransfer(item);
                ngToast.create ({
                    'content' : 'Накопление успешно удалено',
                    'className' : 'success'
                }) 
              }, function() {
                console.log('close');
              }); 
        }
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


    // var makeTransfer = function (item) {
    //     console.log(item);
    //     var bill = $scope.billsCategories.$getRecord(item.from.id);
    //     console.log('bill' , bill);
    //     console.log('billAmount',bill.amount);
    //     var goal = goalsService.getItemInGoalCategoriesByKey(item.to.id);
    //     console.log(bill.amount);
    //     if ((bill.amount - item.sumValue) < 0) {
    //       ngToast.create({
    //         "content": "Недоасточно денег на счету " + bill.title,
    //         "className": 'danger'
    //       })
    //     } else {
    //       bill.amount = bill.amount - item.sumValue;
    //       goal.sumValue = goal.sumValue + item.sumValue;
    //     //   if (goal.sumValue > cost.limitPayment && cost.limitPayment !=0) {
    //     //     ngToast.create({
    //     //       "content": "Вы превысили запланированный лимит по категории " + cost.title,
    //     //       "className": 'warning'
    //     //     })
    //     //   }
    //       $scope.billsCategories.$save(bill);
    //     //   costsService.updateItemInCostsCategories(cost);
    //     //   costsService.addItemInQueryCostsTransfer(item);

    //       goalsService.updGoal(goal);
    //       costsService.addItemInQueryCostsTransfer(item);
    //     }
    //   }


    $scope.addGoalAsCost = function (item) {
        console.log(item);
        var isValid = $scope.validInput(item);
        if(isValid) {
            item.from.id = item.from.$id;
            item.to.id = item.to.$id;
            item.date = $filter('date')(item.date, 'yyyy-MM-dd');
            

            makeTransfer(item);
            $scope.newCosts = {comment: ''};
            $scope.today();
        }
    };


    $scope.transferGoalToBill = function (item) {
        var goalToBill = $uibModal.open ({
            templateUrl: 'app/modals/goals/transferGoalToBill/template.html',
            controller: 'transferCtrl',
            size: 'md',
            resolve : {
                item : function () {
                    return item;
                },
                billsCategories : function () {
                    return $scope.billsCategories;
                },
                goalArr : function () {
                    return $scope.goalArr;
                },
                rolesArr : function () {
                    return $scope.rolesArr;
                },
            },
        }); 
        goalToBill.result.then(function (result) {
            console.log(result);
            result.from.id = result.from.$id;
            result.to.id = result.to.$id;
            result.who = result.who.title;
            $scope.makeIncomeTransfer(result);
            incomeService.addIncomeTransfer(result);
            ngToast.create ({
                'content':'Перевод прошел успешно',
                "className": 'success'
            })
            
             
          }, function() {
            console.log('close');
          });
    };
    $scope.makeIncomeTransfer = function (item) {
        var goal = goalsService.getItemInGoalCategoriesByKey(item.from.id);
        // var bill = $scope.billsCategories.$getRecord(item.from.id);
        item.date = $filter('date')(item.date, 'yyyy-MM-dd');
        console.log(item);
        var account = incomeService.getItemInIncomeAccounts(item.to.id);
        account.amount = account.amount + item.sum;
        goal.sum = goal.sum - item.sum;
        incomeService.updItemInIncomeAccounts(account);
        goalsService.updGoal(goal);
        // console.log(account);
        // incomeService.addIncomeTransfer(item);
    }
    // $scope.addIncomeTransfer = function (item) {
    //         $scope.makeIncomeTransfer(item);
    //         incomeService.addIncomeTransfer(item);
        
    // }

});
