app.controller('ModalTablController', function ($scope,item,$uibModalInstance,$translate,billsCategories,goalsService,ngToast){
	$scope.billsCategories = billsCategories;
    console.log('item delete',item);
	$scope.item = item ;
	$scope.cancel = function() {
		$uibModalInstance.dismiss(false);

	};

	$scope.ok = function() {
		console.log(item.title);
		if (item.type === 'cost') {
			var bill = $scope.billsCategories.$getRecord(item.from.id);
			var goal = goalsService.getItemInGoalCategoriesByKey(item.to.id);
			 if((goal.sum - item.sum) < 0){
				$translate("It's not enough money on the account").then(function(translation){
					ngToast.create ({
						'content':translation,
						"className": 'danger'
					})
				  }) 
				  $uibModalInstance.dismiss(false);
			 }
			 else {
				$uibModalInstance.close(true);
			 }
		}
		else if (item.type === 'income') {
			var bill = $scope.billsCategories.$getRecord(item.to.id);
			var goal = goalsService.getItemInGoalCategoriesByKey(item.from.id);
			if ((bill.amount - item.sum)< 0) {
				$translate("It's not enough money on the account").then(function(translation){
					ngToast.create ({
						'content':translation,
						"className": 'danger'
					})
				  }) 
				  $uibModalInstance.dismiss(false);
			}
			else {
				$uibModalInstance.close(true);
			}
		}	
	};
});
