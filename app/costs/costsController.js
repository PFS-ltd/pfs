 app.controller('CostsController',
  function ($uibModal, $log, $document, $scope, costsService, incomeService, settingsService, uibDateParser, $filter, $rootScope, ngToast,$translate,$timeout) {
    if($rootScope.reversed){} else $rootScope.reversed = false;
    $scope.costsCategoriesArr = costsService.getCostsCategoriesArray();
  //  console.log('costsCategoriesArr',$scope.costsCategoriesArr);
    $scope.templateCostsArr = costsService.getCostsTemplateArray();
    console.log('$scope.templateCostsArr',$scope.templateCostsArr);
    $scope.costsTransferArrQuery = costsService.getCostsTransferArrayLast().reverse();
    
   
  $scope.dateFormat = $translate.instant('Date format');

    // for  Pagination 
    // costsService. getCostsTransferArrayLast().$loaded(function (arr){
    //   if($rootScope.reversed == false) {$scope.arrFireLast = arr.reverse();
    //   $rootScope.reversed = true;
    //   console.log($scope.arrFireLast)
    //   } else {
    //     $scope.arrFireLast = arr;
    //   console.log($scope.arrFireLast)
        
    //   }
    //   $scope.CostArray=$scope.arrFireLast.concat() ;
    // $scope.CostArray= $filter('orderBy')(CostArr,index);
    // .sort(sortDate);
    //         function sortDate (a,b) {
    //           if( a.date > b.date ) return -1;
    //           if( a.date < b.date ) return 1;
    //         };
  //   console.log($scope.CostArray);
    
  //     console.log($scope.CostArray.length);
  //     $scope.totalItems = $scope.CostArray.length
  //     if( $scope.totalItems > 50){
  //       return $scope.totalItems = 50;
  //      }
  //      else if ($scope.totalItems <= 50) {
  //        return $scope.totalItems = $scope.CostArray.length;
  //      }
  //    })

  //   $scope.currentPage = 1;
  //   $scope.itemsPerPage = 5;
    
  
  //   $scope.setPage = function (pageNo) {
  //     $scope.currentPage = pageNo;
  //   };
  
  //   $scope.pageChanged = function() {
  //     console.log('Page changed to: ' + $scope.currentPage);
  //   };
  
  // $scope.setItemsPerPage = function(num) {
  //   $scope.itemsPerPage = num;
  //   $scope.currentPage = 1; 
  // }
 
  //    $timeout( function(){
  //     $scope.$watch('CostArray' ,function () {
  //         console.log('as');
         
  //         $scope.CostArray.sort(sortDate);
  //         function sortDate (a,b) {
  //           if( a.date > b.date ) return -1;
  //           if( a.date < b.date ) return 1;
  //         };
  //         $scope.totalItems = $scope.CostArray.length;
  //         if( $scope.totalItems > 50){
  //           return $scope.totalItems = 50;
  //          }
  //          else if ($scope.totalItems <= 50) {
  //            return $scope.totalItems = $scope.CostArray.length;
  //          }
  //       });
  // }, 2000 );
    
 
    //  $scope.allCostArray = costsService.getCostsTransferArray();
    // console.log($scope.CostArray.length);
  //   var costArr = costsService.getCostsTransferArrayLast();
  //   function fixScope (arr) {
  //     var lngth = arr.length;
  //     return lngth;
  //   };
  //   costArr.$watch(
  //     function (event) {
  //         $scope.costsLength = fixScope(costArr);
  //     }
  // );


    
    
    $scope.costsTransfers = costsService.getCostsTransferArray();
    // console.log('$scope.costsTransferArrQuery',$scope.costsTransferArrQuery);
    // $scope.costsTransferArr = costsService.getCostsTransferArray();
    $scope.billsCategories = incomeService.getIncomeAccounts();
    $scope.rolesArr = settingsService.getRolesArray();
    // console.log('$scope.rolesArr', $scope.rolesArr);

    // главн инпут
    $scope.costsModel = {
      who: '',
      from: {
        id: "sdfg32",
        title: "базовая категория"
      },
      to: {
        id: "3123sdfg32",
        title: "базовая категория"
      },
      sum: 0,
      date: '',
      comment: '',
    };
 

    $scope.ExpenditureCategoryModel = {
      title: 'базовая категория',
      limitPayment: 0,
      regularPayment: false,
      regularPaSum: 0,
      refillRate: '',
      datePayment: '',
      income: '',
      sum: 0
    }

    $scope.templateModel = {
      title: '',
      who: '',
      from: {
        id: "sdfg32",
        title: "базовая категория"
      },
      to: {
        id: "3123sdfg32",
        title: "базовая категория"
      },
      sum: 0,
      date: '',
      comment: '',
    }
    $scope.valid = function (item) {
      if (item.title === undefined || item.title === null) {
        $translate('Indicate the participant').then(function(tranlsation){
            ngToast.create({
                "content": "tranlsation",
                "className": 'danger'
                })
              });
            return false;
        }
    return true;
    };   

    $scope.validInput = function (item) {
                 //DATE
                 // console.log(item)
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
                if (item.sum === null || item.sum === undefined) {
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
    //независимые копии моделей 
    // $scope.newCosts = angular.extend({}, $scope.costsModel);
    $scope.newExpenditureCategoryModel = angular.extend({}, $scope.ExpenditureCategoryModel);
    $scope.newTemplateModel = angular.extend({}, $scope.templateModel);

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


    var makeTransfer = function (item) {
      // console.log(item);
      var bill = $scope.billsCategories.$getRecord(item.from.id);
      var cost = costsService.getItemInCostsCategoriesByKey(item.to.id);
      // console.log(bill);
      // console.log(bill.amount);
      if ((bill.amount - item.sum) < 0) {
        $translate("It's not enough money on the account").then(function(translation){
          ngToast.create ({
              'content':translation,
              "className": 'danger'
          })
        })
      } else {
        bill.amount = bill.amount - item.sum;
        cost.sum = cost.sum + item.sum;
        if (cost.sum > cost.limitPayment && cost.limitPayment !=0) {
          $translate("Full cost").then(function(translation){
            ngToast.create ({
                'content':translation +' '+ cost.title,
                "className": 'warning'
            })
          })
          
        }
        $scope.billsCategories.$save(bill);
        costsService.updateItemInCostsCategories(cost);
        costsService.addItemInQueryCostsTransfer(item);
       
 
        // чтобы норм добавлял страницы в пагинатор
        // costsService.getCostsTransferArray().$loaded(function (arr){
        //   $scope.CostArray = arr;
         
        //     console.log($scope.CostArray.length);
        //     $scope.totalItems = $scope.CostArray.length
        //     if( $scope.totalItems > 50){
        //       return $scope.totalItems = 50;
        //      }
        //      else if ($scope.totalItems <= 50) {
        //        return $scope.totalItems = $scope.CostArray.length;
        //      }
        //     $scope.CostArray.$watch( function (event) {
        //       $scope.totalItems = $scope.CostArray.length
              
        //     })
        //    } )
      }
    }
    var makeReverseTransfer = function (item) {
      var bill = $scope.billsCategories.$getRecord(item.from.id);
      var cost = costsService.getItemInCostsCategoriesByKey(item.to.id);
      // console.log(bill)
        bill.amount = bill.amount + item.sum;
        cost.sum = cost.sum - item.sum;
        
        $scope.billsCategories.$save(bill);
        costsService.updateItemInCostsCategories(cost);
        // costsService.addItemInCostsTransfer(item);
      }
    


    $scope.addNewCosts = function (item) {
      var isValid = $scope.validInput(item);
      if(isValid){


      item.from.id = item.from.$id;
      item.to.id = item.to.$id;
      item.date = $filter('date')(item.date, 'yyyy-MM-dd');

      // costsService.addItemInCostsTransfer(item);
      makeTransfer(item);
      // $scope.newCosts = angular.extend({}, $scope.costsModel);
      $scope.newCosts = {comment: ''};
      $scope.today();
      

      
      }
    };


    $scope.addExpenditureCategory = function () {
      var modalExpenditureCategory = $uibModal.open({
        templateUrl: 'app/modals/costs/modaExpenditureCategory/template.html',
        controller: 'AddExpenditureCategory',
        size: 'md',
        resolve: {
          newExpenditureCategoryModel: function () {
            return $scope.newExpenditureCategoryModel;
          },
          costsCategoriesArr : function () {
            return $scope.costsCategoriesArr ;
          } 
        },
      });
      modalExpenditureCategory.result.then(function (result) {
        if (result) {
         itemToSave = angular.extend({}, $scope.newExpenditureCategoryModel, result);
        costsService.addItemInCostsCategories(itemToSave); 
        }
      });
    };


    $scope.deleteExpenditureCategory = function (item) {
      var modalDeleteCategory = $uibModal.open({
        templateUrl: 'app/modals/costs/modalDeleteExpenditureCategory/templateDelete.html',
        controller: 'modalDeleteExpenditureCategory',
        size: 'sm',
        resolve :{
          item : function () {
            return item
          },
        },
      });
      modalDeleteCategory.result.then(function (result) {
        if (result) {
          costsService.delItemInCostsCategories(item);
        }
      });
    };

    $scope.editExpenditureCategory = function (item) {
      var modItem = angular.extend({},item);
      var backup = angular.extend({},item);
      item.title = undefined;
      var modalEditExpenditureCategory = $uibModal.open({
        templateUrl: 'app/modals/costs/modalEditExpenditureCategory/template.html',
        controller: 'EditExpenditureCategory',
        size: 'md',
        resolve: {
          correctCategory: function () {
            return modItem;
          },
          costsCategoriesArr : function () {
            return $scope.costsCategoriesArr;
          },
        },
      });
      modalEditExpenditureCategory.result.then(function (result) {
        // console.log(item)
        item = angular.extend(item, result);
        costsService.updateItemInCostsCategories(item);
        $translate("Success edit cost").then(function(translation){
          ngToast.create ({
              'content':translation,
              "className": 'success'
          })
        })
        
      }, function() {
        item = angular.extend(item, backup);
        $log.info('Modal dismissed at: ' + new Date());
      });
    };



    $scope.makeTemplateTransfer = function (item) {
      // console.log(item);
      var dateForTransfer = new Date();
      item.date = $filter('date')(dateForTransfer, 'yyyy-MM-dd');
      makeTransfer(item);
    };

    $scope.editTemplate = function (item) {

      // console.log(item);
      var modItem = angular.extend({},item);
      var backup = angular.extend({},item);
      item.comment = undefined;
      // console.log('item2', modItem);
      var modalEditTemplate = $uibModal.open({
        templateUrl: 'app/modals/costs/modalEditTemplate/template.html',
        controller: 'editTemplateCtrl',
        size: 'lg',
        resolve: {
          item: modItem,
          billsCategories: function () {
            return $scope.billsCategories;
          },
          costsCategoriesArr: function () {
            return $scope.costsCategoriesArr;
          },
          templateCosts: function () {
            return $scope.templateCostsArr
          },
          templateCostsArr : function () {
            return $scope.templateCostsArr;
          },
          rolesArr : function () {
            return $scope.rolesArr;
          },
        },
      });
      modalEditTemplate.result.then(function (result) {

        costsService.updateItemInCostsTemplate(angular.extend(item,result));
        $translate("Success edit template").then(function(translation){
          ngToast.create ({
              'content':translation,
              "className": 'success'
          })
        })
      }, function() {
        item = angular.extend(item,backup);
        $log.info('Modal dismissed at: ' + new Date());
      });
    };

  // $scope.editTemplate = function (item) {
  //   var modalEditTemplate = $uibModal.open({
  //     templateUrl: 'app/modals/costs/modalEditTemplate/template.html',
  //     controller: 'editTemplateCtrl',
  //     size: 'lg',
  //     resolve: {
  //       item: item,
  //       incomeCategories: function () {
  //         return $scope.storageFactory.income;
  //       },
  //       templateCosts: function () { 
  //         return $scope.templateCosts },
  //     },
  //   });
  //   modalEditTemplate.result.then(function (result) {
  //     // console.log(result);
  //     // var newItem = angular.extend({},result)
  //     // console.log(newItem);
  //     console.log(item);
  //     $scope.templateCosts.$save(item);
  //   });
  // };


    $scope.addTemplateCosts = function () {
      var modalAddTemplate = $uibModal.open({
        templateUrl: 'app/modals/costs/modalAddTemplate/template.html',
        controller: 'addTemplateCosts',
        size: 'lg',
        resolve: {
          billsCategories: function () {
            return $scope.billsCategories;
          },
          costsCategoriesArr: function () {
            return $scope.costsCategoriesArr;
          },
          rolesArr : function () {
            return $scope.rolesArr;
          },
          templateCostsArr : function() {
            return $scope.templateCostsArr;
          },

        },
      });
      modalAddTemplate.result.then(function (result) {
        costsService.addItemInCostsTemplate(result);
        // storageFactory.templateCosts.push(result);
        // $scope.newTemplateModel = angular.extend({}, $scope.templateModel);
      });
    };

    $scope.deleteTemplate = function (item) {
      var modalDelete = $uibModal.open({
        templateUrl: 'app/modals/costs/modalDeleteTemplate/templateDelete.html',
        controller: 'ModalController',
        size: 'sm' , 
        resolve: {
          item: function () {
            return item;
          },
        },
      });
      modalDelete.result.then(function (result) {
        // console.log('result', result);
        // console.log(item);
        costsService.delItemInCostsTemplate(item);
        // if (result)
        //   storageFactory.allCosts.splice($index, 1);

      });
    }
    $scope.deleteTransfer = function (item) {
      // console.log(item)
      var modalDelete = $uibModal.open({
        templateUrl: 'app/modals/costs/modalDelete/templateDelete.html',
        controller: 'ModalController',
        size: 'sm',
        resolve: {
          item : function () {
            return item;
          }
        }
      });
      modalDelete.result.then(function (result) {
        if (result) {
          
          makeReverseTransfer(item);
          console.log(item)
          $scope.costsTransferArrQuery.$remove(item);
          // costsService.delItemInCostsTransfer(item);
          // costsService.getCostsTransferArray().$loaded(function (arr){
          //   $scope.CostArray = arr;
          //     // console.log($scope.CostArray.length);
          //     $scope.totalItems = $scope.CostArray.length
          //    } )
        }
        

      });
    }
    $scope.type = function (item) {
      var value = ((item.sum / item.limitPayment) * 100);
      if (value < 25) {
        return 'success';
      } else if (value < 50) {
        return 'info';
      } else if (value < 95) {
        return 'warning';
      } else {
        return "danger";
      }
    }

    function calculateSumOfCosts(arr) {
      var date = new Date();
      var startDate = moment(date).startOf('month');
      var endDate = moment(date).endOf('month');
      var filteredCosts = arr.filter(function (item) {
        if (moment(item.date).isBetween(startDate, endDate, null, '[]')) {
          return item;
        }
      });
      $scope.costsCategoriesArr.forEach(function (item) {
        item.sum = 0;
      });
      $scope.costsCategoriesArr.forEach(function (item) {
        filteredCosts.forEach(function (cost) {
          if (cost.to.title === item.title) {
            item.sum += cost.sum;
          }
        })
      })
    };


  

  // $scope.$watch('CostArray' ,function () {
  //   console.log('as')
  //   $scope.totalItems = $scope.CostArray.length;
  // });

  });
  
