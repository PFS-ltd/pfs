app.controller('EditExpenditureCategory',  function($scope, $uibModalInstance , correctCategory, ngToast ,costsCategoriesArr,$translate) {
  // 'storageFactory',storageFactory
    // $scope.storageFactory = storageFactory;
    $scope.correctCategory = correctCategory;
    $scope.costsCategoriesArr = costsCategoriesArr;
     
    $scope.valid = function (item) {
      if (item === undefined || item === '' ||  item=== null ) {
        $translate("fill the form").then(function(translation){
          ngToast.create ({
            'content':translation,
            "className": 'danger'
          })
          })
            return false;
        }
        else if ( item.title === "" || item.title ===undefined || item.title === null) {
          $translate("Indicate the name").then(function(translation){
						ngToast.create ({
							'content':translation,
							"className": 'danger'
						}) 
					  })
            return false;
        }
        
    return true;
    };

    $scope.cancel = function() {
		$uibModalInstance.dismiss('cancel');

	};

	$scope.ok = function (result) {
      
      var isValid  = $scope.valid(result);
      var sameName =  $scope.costsCategoriesArr.some(function(item){
      return (  item.title === result.title); 
      });
        if (isValid) {
          if(sameName){
            $translate("This name already exists").then(function(translation){
              ngToast.create ({
                'content':translation,
                "className": 'danger'
              })
              })
          }
          else {
            $uibModalInstance.close(result); 
          }
          
        }
           
      
    
    	
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

})