 app.controller('addNewGoalCtrl', function($scope,$uibModalInstance,ngToast,newGoal,goalArr){
    $scope.goalArr = goalArr;
     $scope.newGoal = newGoal;

     $scope.validForm = function (item) {
        if(item === undefined || item === null || item ===""){
            ngToast.create({
                'content': 'Заполните форму',
                'className': 'danger'
            })
            return false;
        }
       else if (item.title === null || item.title === undefined || item.title === ''){
           ngToast.create({
               'content': 'Укажите название',
               'className': 'danger'
           });
           return false;
       }
        else if (item.sumMax === null || item.sumMax === undefined || item.sumMax === 0) {
         ngToast.create({
             "content": "Укажите сумму",
             "className": 'danger'
         })
         return false;
     }
     
     return true;
    };

     console.log($scope.newGoal);
    $scope.cancel = function () {
        $uibModalInstance.dismiss('false');
    };
    $scope.ok = function (result) {
        var valid = $scope.validForm(result);
        var sameName =  $scope.goalArr.some(function(item){
			return (  item.title === result.title); 
			});
        // console.log('same?',sameName);
        if (valid) {
                    if (sameName){
                        ngToast.create ({
                            'content' : 'Такое имя уже существует',
                            "className" : 'danger'
                        });
                        result.title = undefined;
                    }
                    else {
                        $uibModalInstance.close(result);
                    } 
                }
    };
});