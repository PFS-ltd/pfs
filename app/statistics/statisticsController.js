(function () {
    app.controller('StatisticsController', ['$scope', 'incomeService', 'settingsService', 'costsService', '$filter', 'ngToast', 'Auth', 'currentAuth', '$timeout', 'calendarLocale', '$translate',
        function ($scope, incomeService, settingsService, costsService, $filter, ngToast, Auth, currentAuth, $timeout, calendarLocale, $translate) {
            $scope.load = true;

            var translation = $translate.instant([
                'Mutual',
                'BarChart',
                'PieChart',
                'LastSeven',
                'LastThirty',
                'ThisMonth',
                'LastMonth',
                'Incomes',
                'Costs',
                'NoData',
                'Total']);
            var lastSeven = translation.LastSeven;
            var lastThirty = translation.LastThirty;
            var thisMonth = translation.ThisMonth;
            var lastMonth = translation.LastMonth;
            var noDataMsg = translation.NoData;
            var costs = translation.Costs;
            var incomes = translation.Incomes;
            var total = translation.Total;

            var myRanges = {};
            myRanges[lastSeven] = [moment().subtract(1, 'w'), moment()],
                myRanges[lastThirty] = [moment().subtract(29, 'days'), moment()],
                myRanges[thisMonth] = [moment().startOf('month'), moment().endOf('month')],
                myRanges[lastMonth] = [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]

            $scope.rolesArray = settingsService.getRolesArray();
            $scope.incomeTransfers = incomeService.getIncomeTransfers();
            $scope.costsTransfers = costsService.getCostsTransferArray();
            $scope.costsTransfers.$loaded(
                function (arr) {
                    $scope.load = false;
                }
            )

            $scope.chart1 = {};
            $scope.chart2 = {};
            $scope.chart3 = {};
            $scope.chart4 = {};



            $scope.update = function () {
                $scope.chart1.api.update();
                $scope.chart2.api.update();
                $scope.chart3.api.update();
                $scope.chart4.api.update();
            }

            $scope.select = function (arg) {
                $scope.selectedTab = arg;
                $timeout(function () {
                    if (arg === 1) $scope.chart1.api.update();
                    else if (arg === 2) $scope.chart2.api.update();
                    else if (arg === 3) $scope.chart3.api.update();
                    else if (arg === 4) $scope.chart4.api.update();
                }, 50);
            };

            $scope.data = {};
            $scope.data.date = {
                startDate: moment().subtract(8, 'd'),
                endDate: moment()
            };
            $scope.data.role = {
                title: "who"
            }

            $scope.data.options = {
                applyClass: 'btn btn-success',
                locale: calendarLocale[localStorage.getItem('preferredLanguage')],
                opens: "left",
                ranges: myRanges,
                eventHandlers: {
                    'apply.daterangepicker': function () {
                        $scope.update();
                    }
                }
            };



            $scope.chart1.options = {
                chart: {
                    type: 'discreteBarChart',
                    height: 400,
                    margin: {
                        top: 20,
                        right: 20,
                        bottom: 50,
                        left: 55
                    },
                    x: function (d) { return d.label; },
                    y: function (d) { return d.value; },
                    showValues: true,
                    valueFormat: function (d) {
                        return d3.format('.0f')(d);
                    },
                    duration: 500,
                    // xAxis: {
                    //     axisLabel: 'Кол-во денег'
                    // },
                    yAxis: {
                        // axisLabel: 'Кол-во денег',
                        axisLabelDistance: -30,
                        tickFormat: function (d) {
                            return d3.format()(d);
                        },
                    },
                    noData: noDataMsg,
                },
            };
            var sumOfOperationsFilterBydate = function (arr, role) {
                var operation = 0;
                arr.filter(function (item) {
                    if (moment(item.date).isBetween($scope.data.date.startDate._d, $scope.data.date.endDate._d, null, '[]')) {
                        if (role == 'Общий' || role == 'Mutual') {
                            return operation += item.sum;
                        } else {
                            if (item.who == role || item.who.title === role) {
                                return operation += item.sum;
                            }
                        }
                    }
                });
                return operation;
            };

            $scope.chart1.data = function () {
                return [
                    {
                        values: [
                            {
                                "label": costs,
                                "value": sumOfOperationsFilterBydate($scope.costsTransfers, $scope.data.role.title),
                                'color': 'red'
                            },
                            {
                                "label": incomes,
                                "value": sumOfOperationsFilterBydate($scope.incomeTransfers, $scope.data.role.title),
                                'color': 'green'
                            }
                        ]
                    },
                ];
            };

            $scope.chart2.options = {
                chart: {
                    type: 'multiBarChart',
                    height: 400,
                    margin: {
                        top: 20,
                        right: 20,
                        bottom: 65,
                        left: 45
                    },
                    clipEdge: true,
                    duration: 500,
                    stacked: true,
                    valueFormat: function (d) {
                        return d3.format('.2f')(d);
                    },
                    xAxis: {
                        // axisLabel: 'дата',
                        showMaxMin: false,
                        tickFormat: function (d) {
                            return d3.time.format(d);
                        },
                        rotateLabels: -45
                    },
                    yAxis: {
                        axisLabel: total,
                        axisLabelDistance: -20,
                        tickFormat: function (d) {
                            return d3.format()(d);
                        }
                    },
                    showControls: false,
                    noData: noDataMsg,
                    legend: {
                        margin: {
                            top: 5,
                            right: 5,
                            bottom: 5,
                            left: 0
                        },
                        vers: 'furious'
                    },
                    legendPosition: 'bottom',
                }
            }

            $scope.chart2.data = function () {

                var filteredCosts = $scope.costsTransfers.filter(function (item) {
                    if (moment(item.date).isBetween($scope.data.date.startDate._d, $scope.data.date.endDate._d)) {
                        if ($scope.data.role.title == 'Общий' || $scope.data.role.title == 'Mutual') {
                            return item.title = item.to.title
                        } else {
                            if (item.who == $scope.data.role.title || item.who.title === $scope.data.role.title) {
                                return item.title = item.to.title
                            }
                        }
                    }
                });
                function unique(arr) {
                    var obj = {};
                    for (var i = 0; i < arr.length; i++) {
                        var str = arr[i].to.title;
                        obj[str] = true;
                    }
                    return Object.keys(obj);
                };

                var categoriesArr = unique(filteredCosts);

                var dataForChart = [];
                // var startYear = moment(date).startOf('Year');
                // var endYear = moment(date).endOf('Year');
                for (let i = 0; i < categoriesArr.length; i++) {
                    dataForChart.push({
                        key: categoriesArr[i],
                        values: [],
                    });
                }

                dataForChart.forEach(function (item) {
                    if (moment($scope.data.date.startDate).year() == moment($scope.data.date.endDate).year()) {
                        for (let i = 0, day = moment($scope.data.date.startDate).dayOfYear(); i < moment($scope.data.date.endDate).dayOfYear() - moment($scope.data.date.startDate).dayOfYear() + 1; i++ , day++) {
                            item.values.push({
                                x: moment(new Date(moment($scope.data.date.endDate).year(), 0, day)).format('YYYY-MM-DD'),
                                y: null,
                            })
                        }
                    } else {
                        for (let i = 0,
                            dayOfYear1 = moment($scope.data.date.startDate).dayOfYear(),
                            dayOfYear2 = moment($scope.data.date.endDate).dayOfYear(),
                            startOfYear = 1,
                            endOfYear = 365,
                            range = (endOfYear - dayOfYear1) + (dayOfYear2 - startOfYear) + 1;

                            i < range;

                            i++
                        ) {
                            if (dayOfYear1 <= endOfYear) {
                                item.values.push({
                                    x: moment(new Date(moment($scope.data.date.startDate).year(), 0, dayOfYear1)).format('YYYY-MM-DD'),
                                    y: null,
                                });
                                dayOfYear1++;
                            } else {
                                if (startOfYear <= dayOfYear2) {
                                    item.values.push({

                                        x: moment(new Date(moment($scope.data.date.endDate).year(), 0, startOfYear)).format('YYYY-MM-DD'),
                                        y: null,
                                    })
                                    startOfYear++;
                                }
                            }
                        }
                    }
                    filteredCosts.forEach(function (item2) {
                        if (item.key == item2.title) {
                            item.values.forEach(function (itemValues) {
                                if (itemValues.x == item2.date) {
                                    itemValues.y += item2.sum;
                                }
                            })
                        }
                    })
                })
                return dataForChart;
            }

            $scope.chart3.options = {
                chart: {
                    type: 'pieChart',
                    height: 400,
                    x: function (d) { return d.key; },
                    y: function (d) { return d.y; },
                    showLabels: true,
                    duration: 500,
                    labelThreshold: 0.01,
                    labelSunbeamLayout: true,
                    noData: noDataMsg,
                    legend: {
                        margin: {
                            top: 5,
                            right: 5,
                            bottom: 5,
                            left: 0
                        },
                        vers: 'furious'
                    },
                    legendPosition: 'bottom',
                }
            }

            $scope.chart3.data = function () {


                var filteredCosts = $scope.costsTransfers.filter(function (item) {
                    if (moment(item.date).isBetween($scope.data.date.startDate._d, $scope.data.date.endDate._d, null, '[]')) {
                        if ($scope.data.role.title == 'Общий' | $scope.data.role.title == 'Mutual')  {
                            return item.title = item.to.title
                        } else {
                            if (item.who == $scope.data.role.title || item.who.title === $scope.data.role.title) {
                                return item.title = item.to.title
                            }
                        }
                    }
                });
                function unique(arr) {
                    var obj = {};
                    for (var i = 0; i < arr.length; i++) {
                        var str = arr[i].to.title;
                        obj[str] = true;
                    }
                    return Object.keys(obj);
                };

                var categoriesArr = unique(filteredCosts);

                var dataForChart = [];

                for (let i = 0; i < categoriesArr.length; i++) {
                    dataForChart.push({
                        key: categoriesArr[i],
                        y: 0
                    })
                }

                dataForChart.forEach(function (item) {
                    filteredCosts.forEach(function (item2) {
                        if (item.key == item2.title) {
                            item.y += item2.sum;
                        }
                    })
                });
                return dataForChart;
            };



            $scope.chart4.options = {
                chart: {
                    type: 'pieChart',
                    height: 400,
                    donut: false,
                    x: function (d) { return d.key; },
                    y: function (d) { return d.y; },
                    showLabels: true,
                    duration: 500,
                    labelThreshold: 0.01,
                    labelSunbeamLayout: true,
                    legend: {
                        margin: {
                            top: 5,
                            right: 5,
                            bottom: 5,
                            left: 0
                        },
                        vers: 'furious'
                    },
                    legendPosition: 'bottom',
                    noData: noDataMsg,
                }
            }

            $scope.chart4.data = function () {

                var filterIncome = $scope.incomeTransfers.filter(function (item) {
                    if (moment(item.date).isBetween($scope.data.date.startDate._d, $scope.data.date.endDate._d, null, '[]')) {
                        return item.title = item.from.title
                    }
                });

                function unique(arr) {
                    var obj = {};
                    for (var i = 0; i < arr.length; i++) {
                        var str = arr[i].from.title;
                        obj[str] = true;
                    }
                    return Object.keys(obj);
                };

                var categoriesArr = unique(filterIncome);

                var dataForChart = [];

                for (let i = 0; i < categoriesArr.length; i++) {
                    dataForChart.push({
                        key: categoriesArr[i],
                        y: 0
                    })
                }

                dataForChart.forEach(function (item) {
                    filterIncome.forEach(function (item2) {
                        if (item.key == item2.title) {
                            item.y += item2.sum;
                        }
                    })
                });
                return dataForChart;
            };

        }])
})()