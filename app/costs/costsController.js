app.controller('CostsController',
  function ($uibModal, $log, $document, $scope, costsService, incomeService, settingsService, uibDateParser, $filter, ngToast) {
    $scope.costsCategoriesArr = costsService.getCostsCategoriesArray();
   console.log('costsCategoriesArr',$scope.costsCategoriesArr);
    $scope.templateCostsArr = costsService.getCostsTemplateArray();
    // console.log('$scope.templateCostsArr',$scope.templateCostsArr);
    $scope.costsTransferArrQuery = costsService.getCostsTransferArrayLast();
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
            ngToast.create({
                "content": "Укажите участника",
                "className": 'danger'
                })
            return false;
        }
    return true;
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
      console.log(item);
      var bill = $scope.billsCategories.$getRecord(item.from.id);
      var cost = costsService.getItemInCostsCategoriesByKey(item.to.id);
      console.log(bill.amount);
      if ((bill.amount - item.sum) < 0) {
        ngToast.create({
          "content": "Недоасточно денег на счету " + bill.title,
          "className": 'danger'
        })
      } else {
        bill.amount = bill.amount - item.sum;
        cost.sum = cost.sum + item.sum;
        if (cost.sum > cost.limitPayment && cost.limitPayment !=0) {
          ngToast.create({
            "content": "Вы превысили запланированный лимит по категории " + cost.title,
            "className": 'warning'
          })
        }
        $scope.billsCategories.$save(bill);
        costsService.updateItemInCostsCategories(cost);
        costsService.addItemInQueryCostsTransfer(item);
      }
    }
    var makeReverseTransfer = function (item) {
      var bill = $scope.billsCategories.$getRecord(item.from.id);
      var cost = costsService.getItemInCostsCategoriesByKey(item.to.id);
      
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
        size: 'lg',
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
        size: 'md'
      });
      modalDeleteCategory.result.then(function (result) {
        if (result) {
          costsService.delItemInCostsCategories(item);
        }
      });
    };

    $scope.editExpenditureCategory = function (item) {
      var modItem = angular.extend({},item);
      var modalEditExpenditureCategory = $uibModal.open({
        templateUrl: 'app/modals/costs/modalEditExpenditureCategory/template.html',
        controller: 'EditExpenditureCategory',
        size: 'lg',
        resolve: {
          correctCategory: function () {
            return modItem;
          }
        },
      });
      modalEditExpenditureCategory.result.then(function (result) {
        console.log(item)
        item = angular.extend(item, result);
        // costsService.updateItemInCostsCategories(angular.extend(item, result));
        costsService.updateItemInCostsCategories(item);
      });
    };



    $scope.makeTemplateTransfer = function (item) {
      console.log(item);
      var dateForTransfer = new Date();
      item.date = $filter('date')(dateForTransfer, 'yyyy-MM-dd');
      makeTransfer(item);
    };

    $scope.editTemplate = function (item) {
      console.log(item);
      var modItem = angular.extend({},item);
      console.log('item2', modItem);
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
        },
      });
      modalEditTemplate.result.then(function (result) {
        // var item = angular.extend({}, result);
        // console.log(item);
        // console.log(result);
        // var newItem = angular.extend({},result)
        // console.log(newItem);
        // console.log(item);
        costsService.updateItemInCostsTemplate(angular.extend(item,result));
        // $scope.templateCostsArr.$save(item);
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
        size: 'md'
      });
      modalDelete.result.then(function (result) {
        console.log('result', result);
        console.log(item);
        costsService.delItemInCostsTemplate(item);
        // if (result)
        //   storageFactory.allCosts.splice($index, 1);

      });
    }
    $scope.deleteTransfer = function (item) {
      var modalDelete = $uibModal.open({
        templateUrl: 'app/modals/costs/modalDelete/templateDelete.html',
        controller: 'ModalController',
        size: 'md'
      });
      modalDelete.result.then(function (result) {
        if (result) {
          costsService.delItemInQueryCostsTransferLast(item);
          console.log(item)
          makeReverseTransfer(item);
        }
        // if (result)
        //   storageFactory.allCosts.splice($index, 1);

      });
    }

  });
/*
  $scope.addTemplateCosts = function () {
    var modalAddTemplate = $uibModal.open({
      templateUrl: 'app/modals/modalAddTemplate/template.html',
      controller: 'addTemplateCosts',
      size: 'lg',
      resolve: {
        newTemplateModel: function () {
          return $scope.newTemplateModel;
        }
      },
    });
    modalAddTemplate.result.then(function (result) {
      storageFactory.templateCosts.push(result);
      $scope.newTemplateModel = angular.extend({}, $scope.templateModel);
    });
  };

  // создания модального окна на добавления категории расходов
  $scope.addExpenditureCategory = function () {
    var modalExpenditureCategory = $uibModal.open({
      templateUrl: 'app/modals/modaExpenditureCategory/template.html',
      controller: 'AddExpenditureCategory',
      size: 'lg',
      resolve: {
        newExpenditureCategoryModel: function () {
          return $scope.newExpenditureCategoryModel;
        }
      },
    });
    modalExpenditureCategory.result.then(function (result) {

      storageFactory.ExpenditureCategory.push(result)

      $scope.newExpenditureCategoryModel = angular.extend({}, $scope.ExpenditureCategoryModel);
    });
  };


  $scope.addCostsTemplate = function (item) {
    var obj = $scope.storageFactory.income.$getRecord(item.from.id);
    obj.amount = obj.amount - item.sum;
    $scope.storageFactory.income.$save(obj);
  };

  // создания модального окна для удаления расходов
  $scope.deleteCosts = function ($index) {
    var modalDelete = $uibModal.open({
      templateUrl: 'app/modals/modalDelete/templateDelete.html',
      controller: 'ModalController',
      size: 'md'
    });
    modalDelete.result.then(function (result) {
      console.log('result', result);
      if (result)
        storageFactory.allCosts.splice($index, 1);

    });

  };
  $scope.deleteTemplate = function ($index) {
    var modalDelteTemplate = $uibModal.open({
      templateUrl: 'app/modals/modalDeleteTemplate/templateDelete.html',
      controller: 'deleteTemplate',
      size: 'md'
    });
    modalDelteTemplate.result.then(function (result) {
      if (result)
        storageFactory.templateCosts.splice($index, 1);
    });
  };
  //создание модального окна удаления категории расходов
  $scope.deleteExpenditureCategory = function ($index) {
    var modalDeleteCategory = $uibModal.open({
      templateUrl: 'app/modals/modalDeleteExpenditureCategory/templateDelete.html',
      controller: 'modalDeleteExpenditureCategory',
      size: 'md'
    });
    modalDeleteCategory.result.then(function (result) {
      if (result)
        storageFactory.ExpenditureCategory.splice($index, 1);

    });
  };


  // создание модального окна на редактирование категории расхода
  $scope.editExpenditureCategory = function ($index) {
    var modalEditExpenditureCategory = $uibModal.open({
      templateUrl: 'app/modals/modalEditExpenditureCategory/template.html',
      controller: 'EditExpenditureCategory',
      size: 'lg',
      resolve: {
        correctCategory: function () {
          return $scope.storageFactory.ExpenditureCategory[$index];
        }
      },
    });
    modalEditExpenditureCategory.result.then(function (result) {

      $scope.storageFactory.ExpenditureCategory[$index] = result;
    });
  };


});
*/