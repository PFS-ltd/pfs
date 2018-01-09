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
        'angular-fullcalendar',
        'pascalprecht.translate',
        'xeditable',
        // 'colorpicker.module',
        'color.picker'
    ]);
    
app.run(["$transitions", "$state", "ngToast", '$rootScope', '$stateParams', 'editableOptions', '$translate', 
 function ($transitions, $state, ngToast, $rootScope, $stateParams, editableOptions, $translate) {
    $transitions.onError({}, function (result) {
        if (result._error.detail === "AUTH_REQUIRED") {
            $translate("Please, sign in").then(function(content) {
                ngToast.create({
                    className: 'warning',
                    content: content,
                });
            });
            $state.go("root");
        }
    });
    editableOptions.theme = 'bs3';
}]);

app.value('styleLinks', ["node_modules/bootstrap/dist/css/bootstrap.css", 
                        "css/themes/slate/bootstrap.css",
                        "css/themes/cerulean/bootstrap.css",
                        "css/themes/spacelab/bootstrap.css",
                        "css/themes/simplex/bootstrap.css"]);

app.controller('MainCtrl', ['$scope', 'styleLinks', 'localeFactory', function($scope, styleLinks, localeFactory) {
    $scope.selected = localStorage.getItem("preferredStyle") || 0;
    $scope.styleLinks = styleLinks;
    $scope.style = $scope.styleLinks[$scope.selected];
    (localStorage.getItem('preferredLanguage') === 'ru') ? localeFactory.setLocale('ru') : localeFactory.setLocale('en');
    $scope.$on('styleChanged', function(event, index) {
        $scope.style = $scope.styleLinks[index];
    });

}])