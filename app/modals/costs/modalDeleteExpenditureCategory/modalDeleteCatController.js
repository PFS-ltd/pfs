


app.controller('modalDeleteExpenditureCategory', function($scope , $uibModalInstance, item){
	$scope.item = item ;

	$scope.cancel = function() {
		$uibModalInstance.close(false);

	};

	$scope.ok = function() {
		$uibModalInstance.close(true);
	};


});