 app.controller('addNewGoalCtrl', function($scope,$uibModalInstance,ngToast,newGoal,goalArr,$translate){
    $scope.goalArr = goalArr;
     $scope.newGoal = newGoal;

     $scope.validForm = function (item) {
        if(item === undefined || item === null || item ===""){
            $translate("fill the form").then(function(translation){
                ngToast.create ({
                    'content':translation,
                    "className": 'danger'
                })
              })
            return false;
        }
       else if (item.title === null || item.title === undefined || item.title === ''){
        $translate("Indicate the name").then(function(translation){
            ngToast.create ({
                'content':translation,
                "className": 'danger'
            })
          })
           return false;
       }
        else if (item.sumMax === null || item.sumMax === undefined || item.sumMax === 0) {
            $translate("Indicate the sum").then(function(translation){
                ngToast.create ({
                    'content':translation,
                    "className": 'danger'
                })
              })
         return false;
     }
     
     return true;
    };

    //  console.log($scope.newGoal);
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
                        $translate("This name already exists").then(function(translation){
                            ngToast.create ({
                                'content':translation,
                                "className": 'danger'
                            })
                          })
                        result.title = undefined;
                    }
                    else {
                        $uibModalInstance.close(result);
                    } 
                }
    };
});