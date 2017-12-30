  app.controller('transferCtrl', function($scope, $uibModalInstance, ngToast,item,billsCategories,goalArr,rolesArr) {
	$scope.item = item;
	$scope.billsCategories = billsCategories;
	$scope.goalArr = goalArr;
	$scope.rolesArr = rolesArr;
    $scope.cancel = function() {
		$uibModalInstance.dismiss('cancel');

	};

	$scope.ok = function(result) {
		console.log('result', result);
		if( (result.from.sum -result.sum ) < 0 ) {
			ngToast.create ({
				"content": 'Недостаточно средств, укажите другую сумму',
        "className": 'danger'
			});
		}
		 else {
			result.date = new Date ();
		console.log(result);
		$uibModalInstance.close(result);	
		}
		
	};
	

})