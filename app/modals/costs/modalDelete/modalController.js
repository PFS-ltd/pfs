(function(){
'use strict';


app.controller('ModalController', ModalController);

function ModalController($scope, $uibModalInstance,item) {
	$scope.item = item;
	// console.log(item)
	$scope.cancel = function() {
		$uibModalInstance.close(false);

	};

	$scope.ok = function() {
		$uibModalInstance.close(true);
	};
}

})();