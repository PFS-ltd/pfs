var app = angular.module('application',
    [
        'ui.bootstrap',
        'firebase',
        'ui.router',
        'ui.router.stateHelper',
        // 'ui.calendar',
        'ngToast',
        'daterangepicker',
        'nvd3',
        'ngAnimate',
        'ngSanitize',
        'ngAnimate',
        'angular-fullcalendar',
        'pascalprecht.translate',
        'xeditable',
        // 'colorpicker.module',
        'color.picker'
    ]);
    
app.run(["$transitions", "$state", "ngToast", '$rootScope', '$stateParams', 'editableOptions',
 function ($transitions, $state, ngToast, $rootScope, $stateParams, editableOptions) {
    $transitions.onError({}, function (result) {
        if (result._error.detail === "AUTH_REQUIRED") {
            ngToast.create({
                classname: 'default',
                content: "Please, sign in the app",
            });
            $state.go("root");
        }
    });
    editableOptions.theme = 'bs3';
}]);

app.value('styleLinks', ["node_modules/bootstrap/dist/css/bootstrap.css", 
                        "https://bootswatch.com/3/darkly/bootstrap.min.css",
                        "https://bootswatch.com/3/united/bootstrap.min.css",
                        "https://bootswatch.com/3/spacelab/bootstrap.min.css",
                        "https://bootswatch.com/3/simplex/bootstrap.min.css"]);

app.controller('MainCtrl', ['$scope', 'styleLinks', function($scope, styleLinks) {
    $scope.selected = localStorage.getItem("preferredStyle") || 0;
    $scope.styleLinks = styleLinks;
    $scope.style = $scope.styleLinks[$scope.selected];
    $scope.$on('styleChanged', function(event, index) {
//        $scope.selected = localStorage.getItem("preferredStyle");
        $scope.style = $scope.styleLinks[index];
    })
}])


