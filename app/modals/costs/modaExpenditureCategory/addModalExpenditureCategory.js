app.controller('AddExpenditureCategory', ['$scope', '$uibModalInstance', 'newExpenditureCategoryModel', 
					function($scope, $uibModalInstance, newExpenditureCategoryModel ) {

    
    $scope.cancel = function() {

		$uibModalInstance.close();

	};

	$scope.ok = function() {
  	
		console.log($scope.newExpenditureCategoryModel);
		$uibModalInstance.close($scope.newExpenditureCategoryModel);
		
	};
	
}])