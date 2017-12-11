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
            this.dt = new Date();
            this.today = function () {
                incomeCtrl.dt = new Date();
            };
            this.today();

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
            this.inputFormModel = {
                who: '',
                sum: null,
                from: {
                    id: '',
                    title: ''
                },
                to: {
                    id: '',
                    title: ''
                },
                date: '',
                comment: ''
            };

            this.tmpIncome = angular.extend({}, this.inputFormModel);

            // this.addIncomeForm = function (date) {
            //     //            console.log(date.toLocaleDateString());
            //     incomeCtrl.tmpIncome.date = date.toLocaleDateString();
            //     incomeCtrl.storageFactory.history.push(incomeCtrl.tmpIncome);
            //     incomeCtrl.tmpIncome = angular.extend({}, incomeCtrl.inputFormModel);
            //     incomeCtrl.today();
            // }
            //input end
            //modals
            this.categoryModel = { title: '' };

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
                    incomeService.delIncomeTransfer(item)
                }
                // incomeService.addIncomeTransfer(item);
            }

            this.addIncomeTransfer = function (item) {
                incomeCtrl.makeIncomeTransfer(item);

                incomeService.addIncomeTransfer(item);

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

            //   $scope.addNewCosts = function (item) {

            //     item.from.id = item.from.$id;
            //     item.to.id = item.to.$id;
            //     item.date = $filter('date')(item.date, 'yyyy-MM-dd');

            //     // costsService.addItemInCostsTransfer(item);
            //     makeTransfer(item);
            //     $scope.newCosts = angular.extend({}, $scope.costsModel);
            //     $scope.today();
            //   };


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
                var modalInstance = $uibModal.open({
                    templateUrl: 'app/modals/income/editIncomeSource/editIncomeSource.html',
                    controller: 'editIncomeSourceController',
                    // controllerAs: 'modalSourceCtrl',
                    size: 'md',
                    resolve: {
                        item: function () {
                            return item;
                        }
                    }
                });
                modalInstance.result.then(function (result) {
                    if (result) { incomeService.updItemInIncomeSource(result); }
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
                        result = angular.extend({}, accountModel, result);
                        incomeService.addItemInIncomeAccounts(result);
                    }
                }, function () {
                    //error
                });
            }
            this.editIncomeAccount = function (item) {
                var modalInstance = $uibModal.open({
                    templateUrl: 'app/modals/income/editIncomeAccount/editIncomeAccount.html',
                    controller: 'editIncomeAccountController',
                    size: 'md',
                    resolve: {
                        item: function () {
                            return item;
                        }
                    }
                });
                modalInstance.result.then(function (result) {
                    if (result) {
                        incomeService.updItemInIncomeAccounts(result);
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




            this.openSourceModal = function (parentSelector, eventType, category, index) {
                var parentElem = parentSelector ? angular.element($document[0].querySelector('.modal-target ' + parentSelector)) : undefined;
                var modalInstance = $uibModal.open({
                    templateUrl: 'app/modals/income/modalEditIncome.html',
                    controller: 'ModalSourceController',
                    controllerAs: 'modalSourceCtrl',
                    size: 'md',
                    appendTo: parentElem,
                    resolve: {
                        data: function () {
                            return {
                                item: angular.extend({}, category),
                                eventType: eventType,
                                index: index
                            };
                        }
                    }
                });

                modalInstance.result.then(function () {
                    //success
                }, function () {
                    //error
                });
            };

            this.countModel = {
                title: '',
                amount: 0,
                regularRefill: false,
                regularRefillSum: 0,
                frequencyOfPayment: 0,
                dateOfRefill: '',
                incomeCategory: ''
            };

            this.openCountModal = function (parentSelector, eventType, count, index) {
                var parentElem = parentSelector ? angular.element($document[0].querySelector('.modal-target ' + parentSelector)) : undefined;
                var modalInstance = $uibModal.open({
                    templateUrl: 'app/modals/income/modalAddEditCount.html',
                    controller: 'ModalCountController',
                    controllerAs: 'modalCountCtrl',
                    size: 'md',
                    appendTo: parentElem,
                    resolve: {
                        data: function () {
                            return {
                                item: angular.extend({}, count),
                                eventType: eventType,
                                index: index
                            };
                        }
                    }
                });

                modalInstance.result.then(function () {
                    //                success
                }, function () {
                    //              on error
                });
            };

            this.openRemoveModal = function (parentSelector, deleteSource, title, index) {
                var parentElem = parentSelector ? angular.element($document[0].querySelector('.modal-target ' + parentSelector)) : undefined;
                var modalInstance = $uibModal.open({
                    templateUrl: 'app/modals/income/modalRemove.html',
                    controller: 'ModalRemoveController',
                    controllerAs: 'modalRemoveCtrl',
                    size: 'sm',
                    appendTo: parentElem,
                    resolve: {
                        data: function () {
                            return {
                                source: deleteSource,
                                title: title,
                                index: index
                            };
                        }
                    }
                });

                modalInstance.result.then(function () {
                    //                success
                }, function () {
                    //              error
                });
            };
            //modals end

        }]);
})();