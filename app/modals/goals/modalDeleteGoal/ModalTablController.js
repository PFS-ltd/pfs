app.controller('ModalTablController', function ($scope,item,$uibModalInstance,$translate,billsCategories,goalsService,ngToast){
	$scope.billsCategories = billsCategories;
	$scope.goalsService = goalsService;
	console.log('item delete',item);
	console.log(item.type)
		console.log(item.sum)
	$scope.item = item ;
	$scope.cancel = function() {
		$uibModalInstance.dismiss(false);

	};

	$scope.ok = function() {
		$uibModalInstance.close(true);
	};
});
