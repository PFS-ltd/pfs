app.controller('editTemplateCtrl', function ($scope, $uibModalInstance, item, costsCategoriesArr, billsCategories, templateCosts) {
	// console.log(correctTemplate);
	// $scope.storageFactory = storageFactory;
	// $scope.correctTemplate = correctTemplate;
	// console.log(item);

	$scope.correctTemplate = item;
	
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
	
	



	$scope.cancel = function () {
		$uibModalInstance.close(false);

	};

	$scope.ok = function (item) {
		$uibModalInstance.close(item)
	};


})