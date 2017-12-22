(function () {
    app.controller('CalendarsController', ['$scope', 'incomeService', 'settingsService', 'costsService',
        '$filter', 'ngToast', 'Auth', 'currentAuth', '$timeout', 'calendarService', '$uibModal', '$compile',
        function ($scope, incomeService, settingsService, costsService, $filter,
            ngToast, Auth, currentAuth, $timeout, calendarService, $uibModal, $compile) {


            $scope.eventSources = calendarService.getEvents();
            
            $scope.calendarOptions = {
                locale: 'ru',
                height: 450,
                views: 'month',
                themeSystem: 'bootstrap3',
                eventLimit: true,
                dayClick: function (date) {
                    console.log(date)
                    var modalEventCalendar = $uibModal.open({
                        templateUrl: 'app/modals/calendar/add/addCalendarEvent.html',
                        controller: 'addCalendarEventController',
                        size: 'lg',
                        resolve: {
                            date:function() {
                                return  date.format();
                            }
                        }
                    });
                    modalEventCalendar.result.then(function (result) {
                        if (result) {
                            $scope.eventSources.$add(result);
                        }
                    });
                },
                customButtons: {
                    myCustomButton: {
                        text: 'Добавить',
                        click: function (date) {
                            var modalEventCalendar = $uibModal.open({
                                templateUrl: 'app/modals/calendar/add/addCalendarEvent.html',
                                controller: 'addCalendarEventController',
                                size: 'lg',
                                resolve: {
                                    date:function() {
                                        return  date;
                                    }
                                }
                            });
                            modalEventCalendar.result.then(function (result) {
                                if (result) {
                                    $scope.eventSources.$add(result);
                                }
                            });
                        }
                    }
                },
                editable: true,
                allDayDefault: true,
                header: {
                    left: 'myCustomButton',
                    center: 'title',
                    right: 'today prev,next'
                },
                eventDurationEditable: false,
                eventDrop: function (event, delta, revertFunc) {
                    var itemToUpd = $scope.eventSources.filter(function (item) {
                        if (item.$id == event.$id) {
                            item.start = event.start.format();
                            return item;
                        }
                    })
                    $scope.eventSources.$save(itemToUpd[0]);
                },
                eventClick: function (calEvent) {
                    var modalEventCalendar = $uibModal.open({
                        templateUrl: 'app/modals/calendar/edit/editCalendarEvent.html',
                        controller: 'EditCalendarEventController',
                        size: 'lg',
                        resolve: {
                            item: function () {
                                return calEvent;
                            },
                        }
                    });
                        modalEventCalendar.result.then(function (result) {
                            if (result.action == 'ok') {
                            var itemToUpd = $scope.eventSources.filter(function (item) {
                                if (item.$id == result.item.$id) {
                                    item.start = result.item.start.format();
                                    item.description = result.item.description;
                                    item.title = result.item.title;
                                    item.color = result.item.color;
                                    return item;
                                }
                            })
                            $scope.eventSources.$save(itemToUpd[0]);
                        } else if (result.action == 'del') {
                            var itemToUpd = $scope.eventSources.filter(function (item) {
                                if (item.$id == result.item.$id) {
                                    return item;
                                }
                            })
                            $scope.eventSources.$remove(itemToUpd[0]);
                        }
                    });
                },
                eventRender: function (event, element, view) {
                    element.attr({
                        "tooltip-placement": "top",
                        "tooltip-class": "tooltip-info",
                        "uib-tooltip": event.description,
                        "tooltip-append-to-body": true
                    });
                    $compile(element)($scope);
                },
            };
        }])
})()