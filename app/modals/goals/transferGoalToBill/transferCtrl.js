  app.controller('transferCtrl', function($scope, $uibModalInstance, ngToast,item,billsCategories,goalArr,rolesArr) {
	$scope.item = item;
	$scope.billsCategories = billsCategories;
	$scope.goalArr = goalArr;
	$scope.rolesArr = rolesArr;
    $scope.cancel = function() {
		$uibModalInstance.dismiss('cancel');

	};

	$scope.ok = function(result) {
		result.date = new Date ();
		console.log(result);
		$uibModalInstance.close(result);	
	};
	

})