app.controller('ModalGoalController', function ($scope, $uibModalInstance, item,ngToast,$translate){
	console.log('item delete',item);
	$scope.item = item ;
	// console.log(item.comment);
	$scope.cancel = function() {
		$uibModalInstance.dismiss(false);

	};
	
	$scope.ok = function() {
		if (item.sum > 0){
			$translate("Transfer the balance to the account").then(function(translation){
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
		
	};
});

