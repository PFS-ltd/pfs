(function () {
    app.controller('IncomeController', ['$uibModal', '$document', '$scope', 'incomeService', 'settingsService', '$filter', 'ngToast', 
        function ($uibModal, $document, $scope, incomeService, settingsService, $filter, ngToast) {
            var incomeCtrl = this;
            this.incomeSourceArr = incomeService.getIncomeSource();
            this.incomeAccountsArr = incomeService.getIncomeAccounts();
            this.incomeTransfers = incomeService.getIncomeTransfersLast();
            this.rolesArr = settingsService.getRolesArray();

            // console.log(this.incomeSourceArr);
            // console.log(this.incomeAccountsArr);
            // console.log(this.incomeTransfers);
            // console.log(this.rolesArr);

            // this.storageFactory = storageFactory;

            //datapicker
//            this.dt = new Date();
//            this.today = function () {
//                incomeCtrl.tmpIncome.date = new Date();
//            };
//            

            this.dateOptions = {
                format: 'yy',
                maxDate: new Date(2020, 5, 22)
            };

            this.open = function () {
                incomeCtrl.popup.opened = true;
            };

            this.popup = {
                opened: false
            };
            //end

            //big mfn input
//            this.inputFormModel = {
//                who: '',
//                sum: null,
//                from: {
//                    id: '',
//                    title: ''
//                },
//                to: {
//                    id: '',
//                    title: ''
//                },
//                date: '',
//                comment: ''
//            };
//
//            this.tmpIncome = angular.extend({}, this.inputFormModel);
            this.tmpIncome = {comment: ''};

            // this.addIncomeForm = function (date) {
            //     //            console.log(date.toLocaleDateString());
            //     incomeCtrl.tmpIncome.date = date.toLocaleDateString();
            //     incomeCtrl.storageFactory.history.push(incomeCtrl.tmpIncome);
            //     incomeCtrl.tmpIncome = angular.extend({}, incomeCtrl.inputFormModel);
            //     incomeCtrl.today();
            // }
            //input end
            //modals
//            this.categoryModel = { title: '' };
            this.validateInput = function(item) {
                //DATE
//                console.log(item)
                if (item.date === undefined) {
                    ngToast.create({
                        "content": "Укажите дату",
                        "className": 'warning'
                    })
                    return false;
                }
                
                //WHO
                if (item.who === null || item.who === undefined) {
                    ngToast.create({
                        "content": "Укажите участника",
                        "className": 'warning'
                    })
                    return false;
                }
                
                //FROM
                if (item.from === null || item.from === undefined) {
                    ngToast.create({
                        "content": "Укажите источник",
                        "className": 'warning'
                    })
                    return false;
                }
                
                //TO
                if (item.to === null || item.to === undefined) {
                    ngToast.create({
                        "content": "Укажите счет",
                        "className": 'warning'
                    })
                    return false;
                }
                
                //SUM
                if (item.sum === null || item.sum === undefined) {
                    ngToast.create({
                        "content": "Укажите сумму",
                        "className": 'warning'
                    })
                    return false;
                }
                
                return true;
            }

            this.makeIncomeTransfer = function (item) {
                item.from.id = item.from.$id;
                item.to.id = item.to.$id;
                item.date = $filter('date')(item.date, 'yyyy-MM-dd');
                console.log(item);
                var account = incomeService.getItemInIncomeAccounts(item.to.id);
                account.amount = account.amount + item.sum;
                incomeService.updItemInIncomeAccounts(account);
                // console.log(account);
                // incomeService.addIncomeTransfer(item);
            }
            
            this.makeReverseIncomeTransfer = function (item) {
                var account = incomeService.getItemInIncomeAccounts(item.to.id);
                if ((account.amount - item.sum) < 0) {
                    ngToast.create({
                        "content": "Невозможно отменить операцию, т.к. на счету " + account.title + " будет отрицательная сумма",
                        "className": 'warning'
                    })
                } else {
                    account.amount = account.amount - item.sum;
                    console.log(account);
                    incomeService.updItemInIncomeAccounts(account);
                    incomeService.delIncomeTransfer(item);
                    ngToast.create('Внесенный доход удален')
                }
                // incomeService.addIncomeTransfer(item);
            }

            this.addIncomeTransfer = function (item) {
                var isValid = incomeCtrl.validateInput(item);
                
                if (isValid) {
                    incomeCtrl.makeIncomeTransfer(item);

                    incomeService.addIncomeTransfer(item);
                
                    incomeCtrl.tmpIncome = {comment: ''}; //обнуляет значения инпута
//                    incomeCtrl.tmpIncome = angular.extend({}, incomeCtrl.inputFormModel); //обнуляет значения инпута <- так появляются пустые строки в select (из-за ng-value)
                }
            }

            this.delIncomeTransfer = function (item) {
                var modalInstance = $uibModal.open({
                    templateUrl: 'app/modals/income/delIncomeTransfer/delIncomeTransfer.html',
                    controller: 'delIncomeTransferController',
                    // controllerAs: 'modalSourceCtrl',
                    size: 'md',
                    resolve: {
                        item: function () {
                            return item;
                        }
                    }
                });
                modalInstance.result.then(function (result) {
                    if (result) {
                        incomeCtrl.makeReverseIncomeTransfer(item);
                    }
                }, function () {
                    //error
                });
            }

            this.addIncomeSource = function () {
                var modalInstance = $uibModal.open({
                    templateUrl: 'app/modals/income/addIncomeSource/addIncomeSource.html',
                    controller: 'addIncomeSourceController',
                    // controllerAs: 'modalSourceCtrl',
                    size: 'md',
                });
                modalInstance.result.then(function (result) {
                    if (result) { incomeService.addItemInIncomeSource(result); }
                }, function () {
                    //error
                });
            }
            
            this.editIncomeSource = function (item) {
                var editItem = angular.extend({}, item);
                var modalInstance = $uibModal.open({
                    templateUrl: 'app/modals/income/editIncomeSource/editIncomeSource.html',
                    controller: 'editIncomeSourceController',
                    // controllerAs: 'modalSourceCtrl',
                    size: 'md',
                    resolve: {
                        item: function () {
                            return editItem;
                        }
                    }
                });
                modalInstance.result.then(function (result) {
                    if (result) { 
                        incomeService.updItemInIncomeSource(angular.extend(item, result));
                        ngToast.create({
                            content:'Категория ' + result.title + ' успешно обновлена',
                            timeout: 3000
                        });
                    }
                }, function () {
                    //error
                });
            }
            
            this.delIncomeSource = function (item) {
                var modalInstance = $uibModal.open({
                    templateUrl: 'app/modals/income/delIncomeSource/delIncomeSource.html',
                    controller: 'delIncomeSourceController',
                    // controllerAs: 'modalSourceCtrl',
                    size: 'md',
                    resolve: {
                        item: function () {
                            return item;
                        }
                    }
                });
                modalInstance.result.then(function (result) {
                    if (result) { incomeService.delItemInIncomeSource(item); }
                }, function () {
                    //error
                });

            }

            var accountModel = {
                title: '',
                amount: 0,
                regularRefill: false,
                regularRefillSum: 0,
                frequencyOfPayment: 0,
                dateOfRefill: '',
                incomeCategory: ''
            };

            this.addIncomeAccount = function () {
                var modalInstance = $uibModal.open({
                    templateUrl: 'app/modals/income/addIncomeAccount/addIncomeAccount.html',
                    controller: 'addIncomeAccountController',
                    // controllerAs: 'modalSourceCtrl',
                    size: 'md',
                });
                modalInstance.result.then(function (result) {
                    if (result) {
                        result = angular.extend(accountModel, result);
                        incomeService.addItemInIncomeAccounts(result);
                    }
                }, function () {
                    //error
                });
            }
            
            this.editIncomeAccount = function (item) {
                var editItem = angular.extend({}, item);
                var modalInstance = $uibModal.open({
                    templateUrl: 'app/modals/income/editIncomeAccount/editIncomeAccount.html',
                    controller: 'editIncomeAccountController',
                    size: 'md',
                    resolve: {
                        item: function () {
                            return editItem;
                        }
                    }
                });
                modalInstance.result.then(function (result) {
                    if (result) {
                        incomeService.updItemInIncomeAccounts(angular.extend(item, result));
                        ngToast.create('Счет успешно обновлен');
                    }
                }, function () {
                    //error
                });
            }
            
            this.delIncomeAccount = function (item) {
                var modalInstance = $uibModal.open({
                    templateUrl: 'app/modals/income/delIncomeAccount/delIncomeAccount.html',
                    controller: 'delIncomeAccountController',
                    size: 'md',
                    resolve: {
                        item: function () {
                            return item;
                        }
                    }
                });
                modalInstance.result.then(function (result) {
                    if (result) { incomeService.delItemInIncomeAccounts(item); }
                }, function () {
                    //error
                });
            }
            //modals end
            
            $scope.sortField = 'number';
            $scope.sortBy = function (field) {
                $scope.sortField = $scope.sortField === field ? '-' + $scope.sortField : field;
            };
        }]);
})();