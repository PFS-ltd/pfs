(function () {
    app.controller('SettingsController', ['$scope', 'settingsService', '$translate', function ($scope, settingsService, $translate) {
//        $scope.prefLang = settingsService.getPrefLang();
////        console.log($scope.prefLang)
//        $scope.lang = $scope.prefLang.language;
        var settingsCtrl = this;
        
        settingsCtrl.roles = settingsService.getRolesArray();
//        console.log($scope.roles);
        
        settingsCtrl.lang = localStorage.getItem('preferredLanguage') || 'ru';
        
        settingsCtrl.changeLanguage = function(key) {
            $translate.use(key);
            localStorage.setItem('preferredLanguage', key);
        }
        
        settingsCtrl.style = localStorage.getItem('preferredStyle') || 0;
        settingsCtrl.changeStyle = function () {
            localStorage.setItem('preferredStyle', settingsCtrl.style);
            
            $scope.$emit('styleChanged', settingsCtrl.style);

//            console.log(localStorage.getItem('preferredStyle'))
        }
        
        settingsCtrl.newRole = '';
        settingsCtrl.addRole = function() {
            settingsCtrl.roles.push({title: settingsCtrl.newRole});
            settingsCtrl.newRole = '';
        };
        
        settingsCtrl.saveSettings = function() {
//            $scope.prefLang.language = lang;
//            console.log($scope.prefLang);
//            settingsService.updatePrefLang($scope.prefLang);
//            localStorage.setItem('preferredLanguage', $scope.prefLang);
            var val1 = localStorage.getItem('preferredLanguage'),
                val2 = localStorage.getItem('preferredStyle');
            
            console.log(val1);
            console.log(val2);
        }
        
        settingsCtrl.applyRoles = function () {
            
        }
        
    }]);
})();