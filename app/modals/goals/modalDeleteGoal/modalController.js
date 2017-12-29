app.controller('ModalController', function ($scope, $uibModalInstance, item,ngToast){
	console.log('item delete',item);
	$scope.item = item ;
	console.log(item.comment);
	$scope.cancel = function() {
		$uibModalInstance.dismiss(false);

	};

	$scope.ok = function() {
		if (item.sum > 0){
			ngToast.create ({
				'content' : 'Переведите деньги на счет',
				'className' : 'danger'
			});	
			$uibModalInstance.dismiss(false);
		}
		else {
			$uibModalInstance.close(true);
		}
		
	};
});

