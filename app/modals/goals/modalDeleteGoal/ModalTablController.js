app.controller('ModalTablController', function ($scope,item,$uibModalInstance){
    console.log('item delete',item);
	$scope.item = item ;
	$scope.cancel = function() {
		$uibModalInstance.dismiss(false);

	};

	$scope.ok = function() {
			$uibModalInstance.close(true);
	};
});
 