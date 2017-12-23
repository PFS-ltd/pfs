app.controller('ModalController', function ($scope, $uibModalInstance, item){
	$scope.item = item ;
	console.log(item.comment);
	$scope.cancel = function() {
		$uibModalInstance.dismiss(false);

	};

	$scope.ok = function() {
		$uibModalInstance.close(true);
	};
});

