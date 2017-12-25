var app = angular.module('application',
    [
        'ui.bootstrap',
        'firebase',
        'ui.router',
        'ui.router.stateHelper',
        'ngToast',
        'daterangepicker',
        'nvd3',
        'ngAnimate',
        'ngSanitize',
        'ngAnimate',
        'pascalprecht.translate',
    ]);

    
app.run(["$transitions", "$state", "ngToast", '$rootScope', '$stateParams', 
 function ($transitions, $state, ngToast, $rootScope, $stateParams ) {
    $transitions.onError({}, function (result) {
        if (result._error.detail === "AUTH_REQUIRED") {
            ngToast.create({
                classname: 'default',
                content: "Please, sign in the app",
            });
            $state.go("root");
        }
    });
}]);


