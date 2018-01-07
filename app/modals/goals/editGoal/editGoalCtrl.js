 app.controller('editGoalCtrl', function($scope,$uibModalInstance,ngToast,item,goalArr){
    $scope.goalArr = goalArr;
    $scope.item = item ;

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
                ngToast.create ({
                    'content' : 'Такое имя уже существует',
                    "className" : 'danger'
                });
            }
            else {
                $uibModalInstance.close(result);
            }
            
        }
        
    };
});