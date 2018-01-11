 app.controller('editGoalCtrl', function($scope,$uibModalInstance,ngToast,item,goalArr,$translate){
    $scope.goalArr = goalArr;
    $scope.item = item ;
    console.log('item', item)

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
    $scope.cancel = function () {
        $uibModalInstance.dismiss('false');
    };
    $scope.ok = function (result) {
        var valid = $scope.validForm(result) ;
        // console.log(valid)
        var sameName =  $scope.goalArr.some(function(item) {
			return (  item.title === result.title); 
		});
        if (valid){
            if (sameName) {
                $translate("This name already exists").then(function(translation){
                    ngToast.create ({
                        'content':translation,
                        "className": 'danger'
                    })
                  })
                 
            }
           else if(result.sumMax < item.sum) {
            $translate( "The goal amount must exceed the accumulation amount").then(function(translation){
                ngToast.create ({
                    'content':translation,
                    "className": 'danger'
                })
              })
            }
            
            else {
                $uibModalInstance.close(result);
            }
            
        }
        
    };
});