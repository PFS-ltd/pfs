(function () {
    app.controller('addCalendarEventController', ['$uibModalInstance', '$scope', 'date','calendarLocale',
        function ($uibModalInstance, $scope, date, calendarLocale) {
            console.log(date);
            // debugger
            $scope.data = {
                date: {
                    startDate: date == undefined ? moment() : moment(date),
                    endData: ""
                },
                options: {
                    locale: calendarLocale['ru'],
                    singleDatePicker: true,
                    applyClass: 'btn btn-success',
                    autoApply: true,
                    showCustomRangeLabel: false,
                }
            };


            $scope.cancel = function () {
                $uibModalInstance.close(false);

            };

            $scope.ok = function (item) {
                console.log(item);
                console.log($scope.data.date);
                // var date = $scope.data.date.startDate == undefined ? $scope.data.date : $scope.data.date.startDate
                // var color = item.color == undefined ? null : item.color
                // var description = item.description == undefined ? null : item.description;
                item.start = $scope.data.date.startDate == undefined ? $scope.data.date.startDate.format() : $scope.data.date.startDate.format();
                item.color = item.color == undefined ? null : item.color;
                item.description = item.description == undefined ? null : item.description;
                $uibModalInstance.close(item);
            };
        }]);
})();