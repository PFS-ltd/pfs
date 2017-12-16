app.controller('AddExpenditureCategory', ['$scope', '$uibModalInstance', 'newExpenditureCategoryModel', 
					function($scope, $uibModalInstance, newExpenditureCategoryModel ) {

    
    $scope.cancel = function() {

		$uibModalInstance.dismiss();

	};

	$scope.ok = function() {
  	
		console.log($scope.newExpenditureCategoryModel);
		$uibModalInstance.close($scope.newExpenditureCategoryModel);	
	};
	
}])