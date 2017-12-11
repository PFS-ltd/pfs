(function(){
'use strict';


app.controller('deleteTemplate', deleteTemplate);

function deleteTemplate($scope, $uibModalInstance) {
	$scope.cancel = function() {
		$uibModalInstance.close(false);

	};

	$scope.ok = function() {
		$uibModalInstance.close(true);
	};
}
deleteTemplate.$inject = [
	'$scope',
	'$uibModalInstance',
];
})();