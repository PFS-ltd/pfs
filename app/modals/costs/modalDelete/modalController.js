(function(){
'use strict';


app.controller('ModalController', ModalController);

function ModalController($scope, $uibModalInstance) {
	$scope.cancel = function() {
		$uibModalInstance.close(false);

	};

	$scope.ok = function() {
		$uibModalInstance.close(true);
	};
}
ModalController.$inject = [
	'$scope',
	'$uibModalInstance',
];
})();