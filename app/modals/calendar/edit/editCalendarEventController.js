(function () {
    app.controller('EditCalendarEventController', ['$uibModalInstance', '$scope', 'item', 'calendarLocale', 'ngToast',
        function ($uibModalInstance, $scope, item, calendarLocale, ngToast) {
            $scope.item = item;
            console.log($scope.item);


            $scope.data = {
                options: {
                    locale: calendarLocale['ru'],
                    singleDatePicker: true,
                    applyClass: 'btn btn-success',
                    autoApply: true,
                    showCustomRangeLabel: false,
                }
            };
            console.log($scope.data);


            $scope.cancel = function () {
                $uibModalInstance.close(false);

            };

            $scope.ok = function (item, action) {
                if (!item || item.title == undefined || item.title === "" ) {
                    ngToast.create({
                        className: 'warning',
                        content: 'Название не может быть пустым '
                    });

                } else {
                    var color = item.color == undefined ? null : item.color;
                    var description = item.description == undefined ? null : item.description;
                    item.color = color;
                    item.description = description;
                    var result = {
                        item: item,
                        action: action,
                    }
                    $uibModalInstance.close(result);
                }
            };

            $scope.delete = function (item, action) {
                if (!item || item.title == undefined) {
                    ngToast.create({
                        className: 'warning',
                        content: 'Название не может быть пустым '
                    });
                } else {
                    var result = {
                        item: item,
                        action: action,
                    }
                    $uibModalInstance.close(result);
                }
            }
        }]);
})();