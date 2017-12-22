(function () {
    app.controller('EditCalendarEventController', ['$uibModalInstance', '$scope', 'item', 'calendarLocale',
        function ($uibModalInstance, $scope, item, calendarLocale) {
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

                var color = item.color == undefined ? null : item.color;
                var description = item.description == undefined ? null : item.description;
                item.color = color;
                item.description = description;
                var result = {
                    item: item,
                    action: action,
                }
                $uibModalInstance.close(result);
            };

            $scope.delete = function(item, action){
                console.log(action)
                var result = {
                    item: item,
                    action: action,
                }
                $uibModalInstance.close(result);
            }
        }]);
})();