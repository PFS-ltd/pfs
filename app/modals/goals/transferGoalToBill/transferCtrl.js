  app.controller('transferCtrl', function($scope, $uibModalInstance, ngToast,item,billsCategories,goalArr,rolesArr,$translate) {
	$scope.item = item;
	$scope.billsCategories = billsCategories;
	$scope.goalArr = goalArr;
	$scope.rolesArr = rolesArr;
    $scope.cancel = function() {
		$uibModalInstance.dismiss('cancel');

	};

	$scope.ok = function(result) {
		// console.log('result', result);
		if( (result.from.sum -result.sum ) < 0 ) {
			$translate("It's not enough money on the account").then(function(translation){
				ngToast.create ({
						'content':translation,
						"className": 'danger'
				})
			}) 
		}
		 else {
			result.date = new Date ();
		// console.log(result);
		$uibModalInstance.close(result);	
		}
		
	};
	

})