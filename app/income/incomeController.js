(function () {
    app.controller('IncomeController', ['$uibModal', '$scope', 'incomeService', 'settingsService', '$filter', 'ngToast', '$transitions', '$translate', function ($uibModal, $scope, incomeService, settingsService, $filter, ngToast, $transitions, $translate) {
        
        var incomeCtrl = this;
        this.incomeSourceArr = incomeService.getIncomeSource();
        this.incomeAccountsArr = incomeService.getIncomeAccounts();
        this.incomeTransfers = incomeService.getIncomeTransfersLast();
        this.rolesArr = settingsService.getRolesArray();
        
       
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
        //input end
        
        //modals
//            this.categoryModel = { title: '' };
        
        $transitions.onExit({exiting: 'home.income'}, function(transition) {
            localStorage.setItem('tempIncome', JSON.stringify(incomeCtrl.tmpIncome));
            // console.log(localStorage.getItem('tempIncome'));
        });
        
        $transitions.onStart({entering: 'home.income'}, function(transition) {
            incomeCtrl.tmpIncome = angular.extend({}, JSON.parse(localStorage.getItem('tempIncome')));
            // console.log(localStorage.getItem('tempIncome'));
//            incomeCtrl.tmpIncome = JSON.parse(tt);
            // console.log('temp:', incomeCtrl.tmpIncome);
            incomeCtrl.tmpIncome.sum = 33;
//            $scope.$digest();
        });
        
        this.validateInput = function(item) {
            //DATE
//                console.log(item)
            if (item.date === undefined) {
                $translate('Input date').then(function(content) {
                    ngToast.create({
                        "content": content,
                        "className": 'danger'
                        });
                });
                return false;
            }

            //WHO
            if (item.who === null || item.who === undefined) {
                $translate('Input participant').then(function(content) {
                    ngToast.create({
                        "content": content,
                        "className": 'danger'
                        });
                });
                return false;
            }

            //FROM
            if (item.from === null || item.from === undefined) {
                $translate('Input source').then(function(content) {
                    ngToast.create({
                        "content": content,
                        "className": 'danger'
                        });
                });
                return false;
            }

            //TO
            if (item.to === null || item.to === undefined) {
                $translate('Input source').then(function(content) {
                    ngToast.create({
                        "content": content,
                        "className": 'danger'
                        });
                });
                return false;
            }

            //SUM
            if (item.sum === null || item.sum === undefined) {
                $translate('Input sum').then(function(content) {
                    ngToast.create({
                        "content": content,
                        "className": 'danger'
                        });
                });
                return false;
            }

            return true;
        };

        this.makeIncomeTransfer = function (item) {
            item.from.id = item.from.$id;
            item.to.id = item.to.$id;
            item.date = $filter('date')(item.date, 'yyyy-MM-dd');
            // console.log(item);
            var account = incomeService.getItemInIncomeAccounts(item.to.id);
            account.amount = account.amount + item.sum;
            incomeService.updItemInIncomeAccounts(account);
            // console.log(account);
            // incomeService.addIncomeTransfer(item);
        };

        this.makeReverseIncomeTransfer = function (item) {
            var account = incomeService.getItemInIncomeAccounts(item.to.id);
            if ((account.amount - item.sum) < 0) {
                $translate('Cant cancel').then(function(content) {
                    ngToast.create({
                        "content": content + account.title,
                        "className": 'danger'
                        });
                });
            } else {
                account.amount = account.amount - item.sum;
//                console.log(account);
                incomeService.updItemInIncomeAccounts(account);
                incomeService.delIncomeTransfer(item);
                $translate('Recent delete').then(function(content) {
                    ngToast.create(content);
                });
            }
            // incomeService.addIncomeTransfer(item);
        };

        this.addIncomeTransfer = function (item) {
            var isValid = incomeCtrl.validateInput(item);

            if (isValid) {
                incomeCtrl.makeIncomeTransfer(item);

                incomeService.addIncomeTransfer(item);
                
                sessionStorage.removeItem('tempIncome');

                incomeCtrl.tmpIncome = {comment: ''}; //обнуляет значения инпута
//                    incomeCtrl.tmpIncome = angular.extend({}, incomeCtrl.inputFormModel); //обнуляет значения инпута <- так появляются пустые строки в select (из-за ng-value)
            }
        };

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
        };

        this.addIncomeSource = function () {
            var titles = [];
            incomeCtrl.incomeSourceArr.forEach(function(item, i, arr) {
                titles.push(arr[i].title);
            });
            var modalInstance = $uibModal.open({
                templateUrl: 'app/modals/income/addIncomeSource/addIncomeSource.html',
                controller: 'addIncomeSourceController',
                // controllerAs: 'modalSourceCtrl',
                size: 'md',
                resolve: {
                    sourceNames: function() {
                        return titles;
                    }
                }
            });
            modalInstance.result.then(function (result) {
                if (result) { incomeService.addItemInIncomeSource(result); }
            }, function () {
                //error
            });
        };

        this.editIncomeSource = function (item) {
            var titles = [],
                editItem = angular.extend({}, item);
            incomeCtrl.incomeSourceArr.forEach(function(item, i, arr) {
                titles.push(arr[i].title);
            });
            var modalInstance = $uibModal.open({
                templateUrl: 'app/modals/income/editIncomeSource/editIncomeSource.html',
                controller: 'editIncomeSourceController',
                // controllerAs: 'modalSourceCtrl',
                size: 'md',
                resolve: {
                    item: function() {
                        return editItem;
                    },
                    sourceNames: function() {
                        return titles;
                    }
                }
            });
            modalInstance.result.then(function (result) {
                if (result) {
                    incomeService.updItemInIncomeSource(angular.extend(item, result));
                    $translate('Category updated').then(function(content) {
                        ngToast.create({
                            "content": content,
                            "className": 'success'
                            });
                    });
                }
            }, function () {
                //error
            });
        };

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

        };

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
            var titles = [];
            incomeCtrl.incomeAccountsArr.forEach(function(item, i, arr) {
                titles.push(arr[i].title);
            });
            var modalInstance = $uibModal.open({
                templateUrl: 'app/modals/income/addIncomeAccount/addIncomeAccount.html',
                controller: 'addIncomeAccountController',
                // controllerAs: 'modalSourceCtrl',
                size: 'md',
                resolve: {
                    accountNames: function() {
                        return titles;
                    }
                }
            });
            modalInstance.result.then(function (result) {
                if (result) {
                    result = angular.extend(accountModel, result);
                    incomeService.addItemInIncomeAccounts(result);
                }
            }, function () {
                //error
            });
        };

        this.editIncomeAccount = function (item) {
            var editItem = angular.extend({}, item),
                titles = [];
            incomeCtrl.incomeAccountsArr.forEach(function(item, i, arr) {
                titles.push(arr[i].title);
            });
            var modalInstance = $uibModal.open({
                templateUrl: 'app/modals/income/editIncomeAccount/editIncomeAccount.html',
                controller: 'editIncomeAccountController',
                size: 'md',
                resolve: {
                    item: function () {
                        return editItem;
                    },
                    accountNames: function() {
                        return titles;
                    }
                }
            });
            modalInstance.result.then(function (result) {
                if (result) {
                    incomeService.updItemInIncomeAccounts(angular.extend(item, result));
                    $translate('Count updated').then(function(content) {
                        ngToast.create({
                            "content": content,
                            "className": 'success'
                            });
                    });
                }
            }, function () {
                //error
            });
        };

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
        };
        //modals end

        //sorts of income
        $scope.sortField = 'number';
        $scope.sortBy = function (field) {
            $scope.sortField = $scope.sortField === field ? '-' + $scope.sortField : field;
        };
        //end

    }]);
})();