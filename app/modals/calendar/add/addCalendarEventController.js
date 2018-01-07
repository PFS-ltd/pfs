(function () {
    app.controller('addCalendarEventController', ['$uibModalInstance', '$scope', 'date', 'calendarLocale', 'ngToast', '$translate',
        function ($uibModalInstance, $scope, date, calendarLocale, ngToast, $translate) {
            // console.log(date);
            // debugger
            $scope.data = {
                date: {
                    startDate: date == undefined ? moment() : moment(date),
                    endData: ""
                },
                options: {
                    locale: calendarLocale[localStorage.getItem('preferredLanguage')],
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
                // console.log(item);
                if (!item || item.title == undefined || item.title === "" ) {
                    $translate( "Empty name").then(function(translation){
                        ngToast.create({
                            className: 'warning',
                            content: translation
                        });
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