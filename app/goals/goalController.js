app.controller('GoalController', function($scope, $log, $document,$uibModal,ngToast, goalsService,costsService,incomeService, settingsService, uibDateParser, $filter, $translate){
    $scope.costsTransferArrQuery = costsService.getCostsTransferArrayLast();
    // console.log('$scope.costsTransferArrQuery',$scope.costsTransferArrQuery);
    $scope.incomeTransfers = incomeService.getIncomeTransfersLast();
    // console.log('incomeTransfer', $scope.incomeTransfers);
    $scope.billsCategories = incomeService.getIncomeAccounts();
    // console.log('billCat', $scope.billsCategories);
    $scope.goalArr = goalsService.getGoalsArr();
    $scope.goalsTransferArr = goalsService.getGoalsTransferArr();
    $scope.dateFormat = $translate.instant('Date format');

   
    // goalsService.getGoalsTransferArr().$loaded(function (arr){
    //     $scope.GoalTransArr = arr;
    //     function sortDate (a,b) {
    //       if( a.date > b.date ) return -1;
    //       if( a.date < b.date ) return 1;
    //     };
    //     $scope.GoalTransArr.sort(sortDate);
    //       console.log($scope.GoalTransArr.length);
    //       $scope.totalItems = $scope.GoalTransArr.length
    //       if( $scope.totalItems > 50){
    //         return $scope.totalItems = 50;
    //        }
    //        else if ($scope.totalItems <= 50) {
    //          return $scope.totalItems = $scope.GoalTransArr.length;
    //        }
    //       $scope.GoalTransArr.$watch( function (event) {
    //         $scope.totalItems = $scope.GoalTransArr.length
            
    //       })
    //      });
    //      $scope.currentPage = 1;
        //  $scope.itemsPerPage = 5;

        //  $scope.newArrayForTable = function (item) {
        //     Array.prototype.diff = function(a) {
        //         return this.filter(function(i) {return a.indexOf(i) > -1;});
        //     };

        //    return $scope.newArrayForTable = $scope.goalsTransferArr.diff(item)
        //     console.log($scope.newArrayForTable,'smt stupid')
        //  }
        
    
  
    // $scope.setPage = function (pageNo) {
    //   $scope.currentPage = pageNo;
    // // };
  
//     $scope.pageChanged = function() {
//       console.log('Page changed to: ' + $scope.currentPage);
//     };
  
//   $scope.setItemsPerPage = function(num) {
//     $scope.itemsPerPage = num;
//     $scope.currentPage = 1; //reset to first page

//   }

    // console.log('goalArr', $scope.goalArr)
    $scope.rolesArr = settingsService.getRolesArray();
    // console.log('$scope.rolesArr', $scope.rolesArr);
    $scope.isCollapsed = true;
    // $scope.openTable = function (key) {
    //     console.log(key)
    //     return $scope.isCollapsed = !$scope.isCollapsed;
        
    // };
     
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
        type:'cost'
    };
    $scope.goalCategoryModel = {
        title : '',
        sumMax : 0 , 
        sum : 0 ,
    };

    $scope.newCosts = angular.extend({},$scope.goalInput);
    // $scope.newCosts.date = new Date();
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


       if (item.date === undefined) {
        $translate('Indicate the date').then(function(translation){
            ngToast.create ({
                'content':translation,
                "className": 'danger'
            })
          })
           return false;
       }
       
       //WHO
       if (item.who === null || item.who === undefined) {
        $translate('Indicate the participant').then(function(translation){
            ngToast.create ({
                'content':translation,
                "className": 'danger'
            })
          })
           return false;
       }
       
       //FROM
       if (item.from === null || item.from === undefined) {
        $translate("Indicate the account").then(function(translation){
            ngToast.create ({
                'content':translation,
                "className": 'danger'
            })
          })
           return false;
       }
       
       //TO
       if (item.to === null || item.to === undefined) {
        $translate("Indicate the category").then(function(translation){
            ngToast.create ({
                'content':translation,
                "className": 'danger'
            })
          })
           return false;
       }
       
       //SUM
       if (item.sum === null || item.sum === undefined || item.sum === 0 || item.sum < 0) {
        $translate("Indicate the sum").then(function(translation){
            ngToast.create ({
                'content':translation,
                "className": 'danger'
            })
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
        $translate("Accumulation Successfully Added").then(function(translation){
            ngToast.create ({
                'content':translation,
                "className": 'success'
            })
          })
        
        // console.log($scope.goalArr);
      }, function() {
        // console.log('close');
      }); 
    };


    $scope.deleteGoalCategory = function(item){
        var delGoal = $uibModal.open ({
            templateUrl: 'app/modals/goals/modalDeleteGoal/templateDelete.html',
            controller: 'ModalGoalController',
            size: 'sm',
            resolve: {
                item: function () {
                    return item;
                },
            },
        });
        delGoal.result.then(function (result) {
            
            goalsService.delGoal(item);
            $translate("Accumulation Successfully Deleted").then(function(translation){
                ngToast.create ({
                    'content':translation,
                    "className": 'success'
                })
              }) 
          }, function() {
            // console.log('close');
          });
       
    }
    $scope.editGoalCategory = function(item){
        if($scope.isCollapsed === false){
            $scope.openTable();
        }
        
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
            $translate("Editing was successful").then(function(translation){
                ngToast.create ({
                    'content':translation,
                    "className": 'success'
                })
              }) 
        }, function () {
            item = angular.extend(item,backup);
        });
        
    }
    var makeTransfer = function (item) {
        var bill = $scope.billsCategories.$getRecord(item.from.id);
        // console.log('bill',bill)
        // var cost = costsService.getItemInCostsCategoriesByKey(item.to.id);
        var goal = goalsService.getItemInGoalCategoriesByKey(item.to.id);
        // console.log('goal', goal)
        if ((bill.amount - item.sum) < 0) {
            $translate("It's not enough money on the account").then(function(translation){
                ngToast.create ({
                    'content':translation,
                    "className": 'danger'
                })
              }) 
        } 
        else if( (goal.sum + item.sum) > goal.sumMax ){
            $translate("Maximum amount exceeded").then(function(translation){
                ngToast.create ({
                    'content':translation,
                    "className": 'danger'
                })
            })
        }
        else  {
            bill.amount = bill.amount - item.sum;
            goal.sum = goal.sum + item.sum;
            $scope.billsCategories.$save(bill);
            goalsService.addGoalsTransferArr(item);
            goalsService.updGoal(goal);
          
        }
      };
      $scope.addGoalAsCost = function (item) {
        // console.log(item);
        var isValid = $scope.validInput(item);
        if(isValid) {
            // console.log('item', item)
            item.from.id = item.from.$id;
            item.to.id = item.to.$id;
            // console.log('item.to.id',item.to.id )
            item.date = $filter('date')(item.date, 'yyyy-MM-dd');
            item.type = 'income';
            makeTransfer(item);
            $scope.newCosts = {comment: ''};
            $scope.today();
        }
    };
      var makeReverseTransfer = function (item) {
        if (item.type === 'cost') {
            var bill = $scope.billsCategories.$getRecord(item.to.id);
            var goal = goalsService.getItemInGoalCategoriesByKey(item.from.id);
            if ((bill.amount - item.sum)< 0) {
                		$translate("It's not enough money on the account").then(function(translation){
                			ngToast.create ({
                				'content':translation,
                				"className": 'danger'
                			})
                          }) 
            }
            else {                   
                bill.amount = bill.amount - item.sum;
                goal.sum = goal.sum + item.sum;
                $scope.billsCategories.$save(bill);
                goalsService.updGoal(goal);
                goalsService.delGoalsTransferArr(item);
                goalsService.updGoalsTransferArr();
            }

        }
        else if (item.type === 'income') {
            var bill = $scope.billsCategories.$getRecord(item.from.id);
                var goal = goalsService.getItemInGoalCategoriesByKey(item.to.id);
            if((goal.sum - item.sum) < 0){
                		$translate("It's not enough money on the account").then(function(translation){
                			ngToast.create ({
                				'content':translation,
                				"className": 'danger'
                			})
                          });
                        }
            else {
                
                console.log('bill',bill);
                console.log('goal',goal);
                
                  bill.amount = bill.amount + item.sum;
                  goal.sum = goal.sum - item.sum;
                  
                  $scope.billsCategories.$save(bill);
                  goalsService.updGoal(goal);
                  goalsService.delGoalsTransferArr(item);
                  goalsService.updGoalsTransferArr();
            }
           
        }
       

          // costsService.addItemInCostsTransfer(item);
        }
        $scope.deleteTransfer = function (item) {
            // console.log(item);
            var delGoal = $uibModal.open ({
                templateUrl: 'app/modals/goals/modalDeleteGoal/templateDelete.html',
                controller: 'ModalTablController',
                size: 'sm',
                resolve: {
                    item: function () {
                        return item;
                    },
                    billsCategories : function () {
                        return $scope.billsCategories;
                    }
                },
            });
            delGoal.result.then(function (result) {
                if (item.type === 'cost') {
                    var bill = $scope.billsCategories.$getRecord(item.to.id);
                    var goal = goalsService.getItemInGoalCategoriesByKey(item.from.id);
                        if ((bill.amount - item.sum)< 0) {
                                $translate("It's not enough money on the account").then(function(translation){
                                    ngToast.create ({
                                        'content':translation,
                                        "className": 'danger'
                                    })
                                  });
                        }
                        else {                   
                        bill.amount = bill.amount - item.sum;
                        goal.sum = goal.sum + item.sum;
                        $scope.billsCategories.$save(bill);
                        goalsService.updGoal(goal);
                        goalsService.delGoalsTransferArr(item);
                        goalsService.updGoalsTransferArr();
                        $translate("Accumulation Successfully Deleted").then(function(translation){
                            ngToast.create ({
                                'content':translation,
                                "className": 'success'
                            })
                          })  
                        }
                }
                else if (item.type === 'income') {
                    // var bill = $scope.billsCategories.$getRecord(item.from.id); 
                    var bill = incomeService.getItemInIncomeAccounts(item.from.id)
                    var goal = goalsService.getItemInGoalCategoriesByKey(item.to.id);
                        if( (goal.sum - item.sum) < 0){
                                $translate("It's not enough money on the account").then(function(translation){
                                    ngToast.create ({
                                        'content':translation,
                                        "className": 'danger'
                                    })
                                  })
                        }
                         else  {
                        console.log('bill',bill);
                        // console.log('goal',goal);
                        
                          bill.amount = bill.amount + item.sum;
                          goal.sum = goal.sum - item.sum;
                          
                          $scope.billsCategories.$save(bill);
                          goalsService.updGoal(goal);
                          goalsService.delGoalsTransferArr(item);
                          goalsService.updGoalsTransferArr();
                          $translate("Accumulation Successfully Deleted").then(function(translation){
                            ngToast.create ({
                                'content':translation,
                                "className": 'success'
                            })
                          })  
                    }
                  } 
              }); 
        }
        $scope.deleteGoalCategory = function(item){
            var delGoal = $uibModal.open ({
                templateUrl: 'app/modals/goals/modalDeleteGoal/templateDelete.html',
                controller: 'ModalGoalController',
                size: 'sm',
                resolve: {
                    item: function () {
                        return item;
                    }, 
                }, 
            });
            delGoal.result.then(function (result) {
                goalsService.delGoal(item);
                $translate("Accumulation Successfully Deleted").then(function(translation){
                    ngToast.create ({
                        'content':translation,
                        "className": 'success'
                    })
                  })  
              }, function() {
                // console.log('close');
              });
           
        }
   


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
            // console.log(result);
            result.from.id = result.from.$id;
            result.to.id = result.to.$id;
            // result.who = result.who.title;
            result.type = 'cost';
            $scope.makeIncomeTransfer(result);
            // incomeService.addIncomeTransfer(result);
            goalsService. addGoalsTransferArr(result);
            // console.log('goalsTransfer',$scope.goalsTransferArr );
            $translate('The transaction was successful').then(function(translation){
                ngToast.create ({
                    'content':translation,
                    "className": 'success'
                })
            })
           
            
             
          }, function() {
            // console.log('close');
          });
    };
    $scope.makeIncomeTransfer = function (item) {
        var goal = goalsService.getItemInGoalCategoriesByKey(item.from.id);
        // var bill = $scope.billsCategories.$getRecord(item.from.id);
        item.date = $filter('date')(item.date, 'yyyy-MM-dd');
        // console.log(item);
        var account = incomeService.getItemInIncomeAccounts(item.to.id);
        account.amount = account.amount + item.sum;
        goal.sum = goal.sum - item.sum;
        incomeService.updItemInIncomeAccounts(account);
        goalsService.updGoal(goal);

    }
    //        pagination


//     $scope.viewby = 5;
//     $scope.totalItems = $scope.goalsTransferArr.length;
//     $scope.currentPage = 1;
//     $scope.itemsPerPage = $scope.viewby;
    
  
//     $scope.setPage = function (pageNo) {
//       $scope.currentPage = pageNo;
//     };
  
//     $scope.pageChanged = function() {
//       console.log('Page changed to: ' + $scope.currentPage);
//     };
  
//   $scope.setItemsPerPage = function(num) {
//     $scope.itemsPerPage = num;
//     $scope.currentPage = 1; //reset to first page
//   }
});
