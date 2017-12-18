app.directive('langSwitcher', langSwitcherDirective);

function langSwitcherDirective() {
    return {
        restrict: 'E',
        templateUrl: 'app/directives/lang-switcher/lang-switcher.html',
        scope: {
            //@ - чтение из атрибута
            //& - привязка функции
            //= - 2хстороняя привязка (наподобие ng-model), может изменить значение в контролере 
        },
        link: function(scope, element, attrs) {},
        controller: function($scope, $translate) {
//            $scope.currentLang = localStorage.getItem("_тут место где хранится знач. языка по умолчанию") || 'en')
            //localStorage задача знач. 
            $scope.currentLang = 'ru';
            $scope.languages = [
                {key: 'en', name: 'English'},
                {key: 'ру', name: 'Русский'}
            ];
            
            $scope.showLangs = false;
            
            $scope.changeLang = function(lang) {
                $translate.use(lang);
//                localStorage.setItem("_тут место где хранится знач. языка по умолчанию", lang);
                $scope.currentLang = lang;
                $scope.showLangs = false;
            }
        }
    }
}