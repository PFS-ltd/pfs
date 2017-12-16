(function () {
    app.controller('StatisticsController', ['$uibModal', '$scope', 'incomeService', 'settingsService', 'costsService', '$filter', 'ngToast', 'Auth', 'currentAuth',
        function ($uibModal, $scope, incomeService, settingsService, costsService, $filter, ngToast, Auth, currentAuth) {
            $scope.incomeTransfers = incomeService.getIncomeTransfers();
            $scope.costsTransfers = costsService.getCostsTransferArray();

            $scope.chart1Options = {
                chart: {
                    type: 'discreteBarChart',
                    height: 450,
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
                    duration: 1000,
                    // xAxis: {
                    //     axisLabel: 'Кол-во денег'
                    // },
                    yAxis: {
                        axisLabel: 'Кол-во денег',
                        axisLabelDistance: -30
                    }
                }
            }
            $scope.chart2Options = {
                chart: {
                    type: 'multiBarChart',
                    height: 450,
                    margin: {
                        top: 20,
                        right: 20,
                        bottom: 45,
                        left: 45
                    },
                    clipEdge: true,
                    duration: 500,
                    stacked: true,
                    xAxis: {
                        // axisLabel: 'дата',
                        showMaxMin: false,
                        tickFormat: function (d) {
                            return d3.time.format(d);
                        }
                    },
                    yAxis: {
                        axisLabel: 'Сумма',
                        axisLabelDistance: -20,
                        tickFormat: function (d) {
                            return d3.format(',.1f')(d);
                        }
                    },

                }
            }
            $scope.chart3Options = {
                chart: {
                    type: 'pieChart',
                    height: 500,
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
            $scope.chart4Options = {
                chart: {
                    type: 'pieChart',
                    height: 500,
                    x: function (d) { return d.key; },
                    y: function (d) { return d.y; },
                    showLabels: true,
                    duration: 500,
                    labelThreshold: 0.01,
                    labelSunbeamLayout: true,
                    legend: {
                        margin: {
                            top: 5,
                            right: 35,
                            bottom: 5,
                            left: 0
                        }
                    }
                }
            }
            $scope.datePicker = {};
            $scope.datePicker.date = {
                startDate: moment().subtract(6, 'days'),
                endDate: moment()
            };
            $scope.datePicker2 = {};
            $scope.datePicker2.date = {
                startDate: moment().subtract(6, 'days'),
                endDate: moment()
            };
            $scope.datePicker3 = {};
            $scope.datePicker3.date = {
                startDate: moment().subtract(6, 'days'),
                endDate: moment()
            };
            // $scope.datePicker.date = {startDate: null, endDate: null};
            // $scope.$watch('date', function (newDate) {
            //     console.log('New date set: ', newDate);
            // }, true);

            $scope.options = {
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

                    'Последние 7 дней': [moment().subtract(6, 'days'), moment()],
                    'Последние 30 дней': [moment().subtract(29, 'days'), moment()],
                    'Этот месяц': [moment().startOf('month'), moment().endOf('month')],
                    'Прошлый месяц': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
                },
            };



            $scope.makeLineChart = function (date) {

                function sumOfOperationsFilterBydate(arr) {
                    var operation = 0;
                    arr.filter(function (item) {
                        if (moment(item.date).isBetween(date.startDate._d, date.endDate._d, null, '[]')
                            || moment(item.date).isSame(date.startDate._d, 'day')
                            || moment(item.date).isSame(date.endDate._d, 'day')) {
                            return operation += item.sum;
                        }
                    });
                    return operation;
                };

                var costsSum = sumOfOperationsFilterBydate($scope.costsTransfers);
                var incomeSum = sumOfOperationsFilterBydate($scope.incomeTransfers)

                $scope.chart1Data = [
                    {
                        values: [
                            {
                                "label": "Расходы",
                                "value": costsSum,
                                'color': 'red'
                            },
                            {
                                "label": "Доходы",
                                "value": incomeSum,
                                'color': 'green'
                            }
                        ]
                    },
                ]
            };

            $scope.makeMultiBarChart = function (date) {
             
                range = moment(date.endDate).dayOfYear() - moment(date.startDate).dayOfYear() + 1;
                var rangeDateArr = [];
                for (let i = 0, day = moment(date.startDate).dayOfYear(); i < range; day++ , i++) {
                    rangeDateArr[i] = {
                        x: day,
                        date: moment(new Date(moment(date.endDate).year(), 0, day)).format('YYYY-MM-DD'),
                    }
                }
                console.log(rangeDateArr);
        
        
                // console.log(filterdateStart)
        
                $scope.costsSum = 0;
                var filteredCosts = $scope.costsTransfers.filter(function (item) {
                    //    console.log(moment(item.date).isSame(filterdateStart, 'day'))
                    if (moment(item.date).isBetween(date.startDate._d, date.endDate._d, null, '[]') || moment(item.date).isSame(date.startDate._d, 'day') || moment(item.date).isSame(date.endDate._d, 'day')) {
                        return item.title = item.to.title
                    }
                });
                console.log(filteredCosts)
                function unique(arr) {
                    var obj = {};
                    for (var i = 0; i < arr.length; i++) {
                        var str = arr[i].to.title;
                        obj[str] = true; // запомнить строку в виде свойства объекта
                    }
                    // console.log(obj);
                    return Object.keys(obj); // или собрать ключи перебором для IE8-
                };
        
                var keyForData = unique(filteredCosts);
                console.log(keyForData);
                var dataForChart = [];
                for (let i = 0; i < keyForData.length; i++) {
                    dataForChart.push({
                        key: keyForData[i],
                        values: []
                    })
                }
                console.log(dataForChart);
                dataForChart.forEach(function (item) {
                    for (let i = 0; i < rangeDateArr.length; i++) {
                        item.values.push({
                            x: rangeDateArr[i].date,
                            date: rangeDateArr[i].date,
                            y: 0,
                            y0: 0
                        })
                    }
                })
                console.log(dataForChart);
        
                arrToDel = filteredCosts;
                var arr3 = [];
        
                dataForChart.forEach(function (item) {
                    filteredCosts.forEach(function (item2) {
                        if (item.key == item2.title) {
                            item.values.forEach(function (itemValues) {
                                if (itemValues.date == item2.date) {
                                    itemValues.y += item2.sum;
                                    itemValues.y0 += item2.sum;
                                }
                            })
                        }
                    })
                });
             
                console.dir(dataForChart);
                
                // console.log(arr3);
                // console.log(filteredCosts);
                // // console.log($scope.costsSum);
                // // $scope.incomeSum = 0;
                // var filterIncome = $scope.incomeTransfers.filter(function (item) {
                //     if (moment(item.date).isBetween(filterdateStart, filterdateEnd, null, '[]')) {
                //         return item;
                //     }
                // })
        
                // console.log(filterIncome);
        
                $scope.chart2Data = dataForChart;
            
            };

            $scope.makePieChartCosts = function (date) {
                var filterdateStart = date.startDate._d;
                var filterdateEnd = date.endDate._d;
                range = moment(date.endDate).dayOfYear() - moment(date.startDate).dayOfYear() + 1;
                var rangeDateArr = [];
                for (let i = 0, day = moment(date.startDate).dayOfYear(); i < range; day++ , i++) {
                    rangeDateArr[i] = {
                        x: day,
                        date: moment(new Date(moment(date.endDate).year(), 0, day)).format('YYYY-MM-DD'),
                    }
                }
                console.log(rangeDateArr);
                console.log(filterdateStart)

                $scope.costsSum = 0;
                var filteredCosts = $scope.costsTransfers.filter(function (item) {
                    //    console.log(moment(item.date).isSame(filterdateStart, 'day'))
                    if (moment(item.date).isBetween(filterdateStart, filterdateEnd, null, '[]') || moment(item.date).isSame(filterdateStart, 'day') || moment(item.date).isSame(filterdateEnd, 'day')) {
                        return item.title = item.to.title
                    }

                });
                console.log(filteredCosts)

                function unique(arr) {
                    var obj = {};
                    for (var i = 0; i < arr.length; i++) {
                        var str = arr[i].to.title;
                        obj[str] = true; // запомнить строку в виде свойства объекта
                    }
                    // console.log(obj);
                    return Object.keys(obj); // или собрать ключи перебором для IE8-
                };

                var keyForData = unique(filteredCosts);
                console.log(keyForData);
                var dataForChart = [];
                for (let i = 0; i < keyForData.length; i++) {
                    dataForChart.push({
                        key: keyForData[i],
                        y: 0
                    })
                }
                console.log(dataForChart);
                dataForChart.forEach(function (item) {
                    filteredCosts.forEach(function (item2) {
                        if (item.key == item2.title) {
                            item.y += item2.sum;
                        }
                    })
                });
                $scope.chart3Data = dataForChart;
            };
            $scope.makePieChartIncome = function (date) {
                var filterdateStart = date.startDate._d;
                var filterdateEnd = date.endDate._d;
                range = moment(date.endDate).dayOfYear() - moment(date.startDate).dayOfYear() + 1;
                var rangeDateArr = [];

                for (let i = 0, day = moment(date.startDate).dayOfYear(); i < range; day++ , i++) {
                    rangeDateArr[i] = {
                        x: day,
                        date: moment(new Date(moment(date.endDate).year(), 0, day)).format('YYYY-MM-DD'),
                    }
                }
                // console.log(rangeDateArr);
                console.log(filterdateStart)

                // $scope.costsSum = 0;
                console.log($scope.incomeTransfers);
                var filterIncome = $scope.incomeTransfers.filter(function (item) {
                    if (moment(item.date).isBetween(filterdateStart, filterdateEnd, null, '[]') || moment(item.date).isSame(filterdateStart, 'day') || moment(item.date).isSame(filterdateEnd, 'day')) {
                        // console.log(item.date)
                        return item.title = item.from.title
                    }

                });
                console.log(filterIncome);
                // console.log($scope.incomeSum);
                // console.log(filteredCosts)

                function unique(arr) {
                    var obj = {};
                    for (var i = 0; i < arr.length; i++) {
                        var str = arr[i].from.title;
                        obj[str] = true; // запомнить строку в виде свойства объекта
                    }
                    // console.log(obj);
                    return Object.keys(obj); // или собрать ключи перебором для IE8-
                };

                var keyForData = unique(filterIncome);
                console.log(keyForData);
                var dataForChart = [];
                for (let i = 0; i < keyForData.length; i++) {
                    dataForChart.push({
                        key: keyForData[i],
                        y: 0
                    })
                }
                console.log(dataForChart);
                dataForChart.forEach(function (item) {
                    filterIncome.forEach(function (item2) {
                        if (item.key == item2.title) {
                            item.y += item2.sum;
                        }
                    })
                });
                $scope.chart4Data = dataForChart;
            }
        }])
})();