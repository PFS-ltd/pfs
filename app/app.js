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


