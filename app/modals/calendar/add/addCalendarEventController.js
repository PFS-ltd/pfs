(function () {
    app.controller('addCalendarEventController', ['$uibModalInstance', '$scope', 'date', 'calendarLocale', 'ngToast',
        function ($uibModalInstance, $scope, date, calendarLocale, ngToast) {
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
                if (!item || item.title == undefined || item.title === "" ) {
                    ngToast.create({
                        className: 'warning',
                        content: 'Название не может быть пустым '
                    });

                } else {
                    item.start = $scope.data.date.startDate == undefined ? $scope.data.date.startDate.format() : $scope.data.date.startDate.format();
                    item.color = item.color == undefined ? null : item.color;
                    item.description = item.description == undefined ? null : item.description;
                    $uibModalInstance.close(item);
                }
            };
        }]);
})();