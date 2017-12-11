app.controller('addTemplateCosts', function($scope, $uibModalInstance, billsCategories, costsCategoriesArr) {
					
	$scope.costsCategoriesArr = costsCategoriesArr.map(function (item) {
		return {
			id: item.$id,
			title: item.title
		};
	});
	$scope.billsCategories = billsCategories.map(function (item) {
		return {
			id: item.$id,
			title: item.title
		};
	});
    

    $scope.cancel = function() {
		$uibModalInstance.close();

	};

	$scope.ok = function() {
		// $scope.newTemplateModel.comment = $scope.newTemplateModel.title;
		$uibModalInstance.close($scope.newTemplateModel);
		
	};
	

})