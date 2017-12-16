var app = angular.module('application',
    [
        'ui.bootstrap',
        'firebase',
        'ui.router',
        'ui.router.stateHelper',
        'ngToast',
        'daterangepicker',
        // 'googlechart'
        'nvd3',
        'ngAnimate',
        'ngSanitize',
    ]);

    
app.run(["$transitions", "$state", "ngToast",'$rootScope', '$stateParams',
 function ($transitions, $state, ngToast,$rootScope, $stateParams) {
    $transitions.onError({}, function (result) {
        if (result._error.detail === "AUTH_REQUIRED") {
            ngToast.create({
                classname: 'default',
                content: "Please, sign in the app"
            });
            $state.go("root");
        }
    });
}]);


