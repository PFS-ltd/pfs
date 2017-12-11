app.controller('EditExpenditureCategory', ['$scope', '$uibModalInstance','correctCategory', function($scope, $uibModalInstance , correctCategory ) {
  // 'storageFactory',storageFactory
    // $scope.storageFactory = storageFactory;
    $scope.correctCategory = correctCategory;
     
    
    $scope.cancel = function() {
		$uibModalInstance.close();

	};

	$scope.ok = function () {
    
    $uibModalInstance.close(correctCategory);
    	
	};


	$scope.today = function() {
        $scope.date = new Date();
        
           };
        $scope.today();
  
        $scope.dateOptions = {
        format: 'yy',
       };
 
        $scope.openPicker = function() {
          $scope.popup.opened = true;
        };

        $scope.setDate = function(year, month, day) {
        $scope.date = new Date(year, month, day);
        };
   
        $scope.popup = {
          opened: false
        };

}])