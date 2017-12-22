app.config(["$stateProvider", "ngToastProvider", '$locationProvider', '$urlRouterProvider', '$translateProvider','$provide',
    function ($stateProvider, ngToastProvider, $locationProvider, $urlRouterProvider, $translateProvider, $provide) {
        
        $locationProvider.hashPrefix('');

        $stateProvider
            .state({
                name: "root",
                url: '/',
                templateUrl: 'app/welcome/welcome.html',
                controller: 'WelcomeController',
                resolve: {
                    // controller will not be loaded until $requireSignIn resolves
                    "currentAuth": ["Auth", function (Auth) {
                        return Auth.$waitForSignIn();
                    }]
                }
            })
            .state({
                name: 'home',
                url: '/home',
                templateUrl: 'app/home/home.html',
                controller: 'HomeController',
                resolve: {
                    "currentAuth": ["Auth", function (Auth) {
                        return Auth.$requireSignIn();
                    }]
                },
            })
            .state('home.income', {
                url: "/income",
                templateUrl: 'app/income/income_page.template.html',
                controller: 'IncomeController as incomeCtrl',
                resolve: {

                    "currentAuth": ["Auth", function (Auth) {
                        return Auth.$requireSignIn();
                    }]
                },
            })
            .state('home.costs', {
                url: "/costs",
                templateUrl: "app/costs/costs_page.template.html",
                controller: "CostsController",
                
            })
            .state('home.calendar', {
                url: "/calendar",
                templateUrl: "app/calendar/calendar.template.html",
                controller: "CalendarsController",
            })
            .state('home.statistics', {
                url: "/statistics",
                templateUrl: "app/statistics/statistics_page.template.html",
                controller: "StatisticsController",
            })
            .state('home.settings', {
                url: "/settings",
                templateUrl: 'app/settings/settings.html',
                controller: 'SettingsController as settingsCtrl'
            })


        $urlRouterProvider.otherwise('home');

        ngToastProvider.configure({
            additionalClasses: 'my-animation',
            horizontalPosition: 'middle',
            verticalPosition: 'top',
            maxNumber: 0,
            combineDuplications: false
        });

        var configFirebase = {
            apiKey: "AIzaSyDb1E0iMLtDFdxQLJq4xN32IbzjiH0RrbY",
            authDomain: "direct-finance-assistant.firebaseapp.com",
            databaseURL: "https://direct-finance-assistant.firebaseio.com",
            projectId: "direct-finance-assistant",
            storageBucket: "direct-finance-assistant.appspot.com",
            messagingSenderId: "625613106920"
        };

        firebase.initializeApp(configFirebase);

        $provide.decorator('ColorPickerOptions', function($delegate) {
            var options = angular.copy($delegate);
            options.round = false;
            options.alpha = false;
            options.format = 'rgb';
            options.inputClass = 'form-control';
            return options;
        });
//        $translateProvider.translations('en', {
//            "Incomes": "Incomes",
//            "Costs": "Costs"
//        });
//
//        $translateProvider.translations('ru', {
//            "Incomes": 'Доходы",
//            "Costs": "Расходы"
//        });
        $translateProvider.useStaticFilesLoader({
            prefix: '/i18n/',
            suffix: '.json'
        });

        $translateProvider.preferredLanguage('ru');

    }]);










// children:[
//     {
//         name:'income',
//         url:"/income",
//         templateUrl: "app/income/income_page.template.html",
//         controller: "IncomeController",
//     },
//     {
//         name:'income',
//         url:"/income",
//         templateUrl: "app/income/income_page.template.html",
//         controller: "IncomeController",
//     },
//     {
//         name:'costs',
//         url:"/costs",
//         template: "<h2>Costs</h2>",
//     },
//     {
//         name:'calendar',
//         url:"/calendar",
//         template: "<h2>Calendar</h2>",
//     },
//     {
//         name:'statistics',
//         url:"/statistics",
//         template: "<h2>Statistics</h2>",
//     },
//     {
//         name:'income',
//        url:"/some",
//     templateUrl: "app/some/some.html",
//     controller: "SomeController"
//     },
//    ]
// })


// app.config(
//     function ($routeProvider, $locationProvider, ngToastProvider) {
//         $locationProvider.hashPrefix('');

//         $routeProvider
//             .when('/', {
//                 templateUrl: 'app/welcome/welcome.html',
//                 controller: 'WelcomeController',

//             })
//             .when('/home', {
//                 templateUrl: 'app/home/home.html',
//                 controller: 'HomeController',
//                 resolve: {
//                     // controller will not be loaded until $requireSignIn resolves
//                     "currentAuth": ["Auth", function (Auth) {
//                         return Auth.$requireSignIn();
//                     }]
//                 }
//             })
//             // .when('/some', {
//             //     templateUrl: 'app/some/some.html',
//             //     controller: 'someController',
//             //     resolve: {
//             //         // controller will not be loaded until $requireSignIn resolves
//             //         "currentAuth": ["Auth", "ngToast", function (Auth, ngToast) {
//             //             return Auth.$requireSignIn();
//             //         }]
//             //     }
//             // })
//             .otherwise({
//                 redirectTo: "/"
//             });

//         ngToastProvider.configure({
//             animation: 'fade',
//             horizontalPosition: 'middle',
//             verticalPosition: 'top',
//             maxNumber: 1,
//             combineDuplications: false
//         });

//         var config = {
//             apiKey: "AIzaSyDb1E0iMLtDFdxQLJq4xN32IbzjiH0RrbY",
//             authDomain: "direct-finance-assistant.firebaseapp.com",
//             databaseURL: "https://direct-finance-assistant.firebaseio.com",
//             projectId: "direct-finance-assistant",
//             storageBucket: "direct-finance-assistant.appspot.com",
//             messagingSenderId: "625613106920"
//         };
//         firebase.initializeApp(config);

//     }
// );