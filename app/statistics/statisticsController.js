(function () {
    app.controller('StatisticsController', ['$scope', 'incomeService', 'settingsService', 'costsService', '$filter', 'ngToast', 'Auth', 'currentAuth', '$timeout',
        function ($scope, incomeService, settingsService, costsService, $filter, ngToast, Auth, currentAuth, $timeout) {
            $scope.load = true;

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
                });
            };
    
            $scope.data = {};
            $scope.data.date = {
                startDate: moment().subtract(8, 'd'),
                endDate: moment()
            };
    
    
            $scope.data.options = {
                applyClass: 'btn btn-success',
                locale: {
                    applyLabel: "Принять",
                    fromLabel: "From",
                    format: "YYYY-MM-DD",
                    toLabel: "To",
                    cancelLabel: 'Отмена',
                    customRangeLabel: 'Свой диапазон'
                },
                ranges: {
                    'Последние 7 дней': [moment().subtract(1, 'w'), moment()],
                    'Последние 30 дней': [moment().subtract(29, 'days'), moment()],
                    'Этот месяц': [moment().startOf('month'), moment().endOf('month')],
                    'Прошлый месяц': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
                },
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
                        axisLabel: 'Кол-во денег',
                        axisLabelDistance: -30,
                        tickFormat: function (d) {
                            return d3.format()(d);
                        },
                    },
                    // objectequality:true,
                },
            };
            var sumOfOperationsFilterBydate = function (arr, role) {
                var operation = 0;
                arr.filter(function (item) {
                    if (moment(item.date).isBetween($scope.data.date.startDate._d, $scope.data.date.endDate._d, null, '[]')) {
                        if (role == 'Общий') {
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
                                "label": "Расходы",
                                "value": sumOfOperationsFilterBydate($scope.costsTransfers, $scope.data.role.title),
                                'color': 'red'
                            },
                            {
                                "label": "Доходы",
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
                        axisLabel: 'Сумма',
                        axisLabelDistance: -20,
                        tickFormat: function (d) {
                            return d3.format()(d);
                        }
                    },
                    showControls: false,
    
                }
            }
    
            $scope.chart2.data = function () {
    
                var filteredCosts = $scope.costsTransfers.filter(function (item) {
                    if (moment(item.date).isBetween($scope.data.date.startDate._d, $scope.data.date.endDate._d, null, '[]')) {
                        if ($scope.data.role.title == 'Общий') {
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
                        values: [],
                    });
                }
    
                dataForChart.forEach(function (item) {
                    for (let i = 0, day = moment($scope.data.date.startDate).dayOfYear(); i < moment($scope.data.date.endDate).dayOfYear() - moment($scope.data.date.startDate).dayOfYear() + 1; i++ , day++) {
                        item.values.push({
                            x: moment(new Date(moment($scope.data.date.endDate).year(), 0, day)).format('YYYY-MM-DD'),
                            y: null,
                        })
                    }
                    filteredCosts.forEach(function (item2) {
                        if (item.key == item2.title) {
                            item.values.forEach(function (itemValues) {
                                if (itemValues.x == item2.date) {
                                    // console.log(item2.sum);
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
                    legend: {
                        margin: {
                            top: 5,
                            right: 5,
                            bottom: 5,
                            left: 0
                        }
                    }
                }
            }
    
            $scope.chart3.data = function () {
    
    
                var filteredCosts = $scope.costsTransfers.filter(function (item) {
                    if (moment(item.date).isBetween($scope.data.date.startDate._d, $scope.data.date.endDate._d, null, '[]')) {
                        if ($scope.data.role.title == 'Общий') {
                            return item.title = item.to.title
                        } else {
                            if (item.who == $scope.data.role.title || item.who.title === $scope.data.role.title) {
                                return item.title = item.to.title
                            }
                        }
                    }
                });
                console.log(filteredCosts)
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
                console.log(dataForChart)
                return dataForChart;
            };
    
    
    
            $scope.chart4.options = {
                chart: {
                    type: 'pieChart',
                    height: 400,
                    donut: false,
                    x: function (d) { return d.key; },
                    y: function (d) { return d.y; },
                    showLabels: false,
                    duration: 500,
                    labelThreshold: 0.01,
                    labelSunbeamLayout: true,
                    legend: {
                        margin: {
                            top: 5,
                            right: 5,
                            bottom: 5,
                            left: 0
                        }
                    }
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