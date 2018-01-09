app.controller('AddExpenditureCategory', ['$scope', '$uibModalInstance', 'newExpenditureCategoryModel', 'ngToast','$translate' , 'costsCategoriesArr',
					function($scope, $uibModalInstance, newExpenditureCategoryModel,ngToast,$translate, costsCategoriesArr) {

	$scope.costsCategoriesArr = costsCategoriesArr;
	
	// $scope.costsName = [];
	// costsCategoriesArr.forEach(function (item){
	// 	$scope.costsName.push(item.title)
	// })

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

		$uibModalInstance.close(false);

	};

	$scope.ok = function(result) {
		var isValid = $scope.valid(result);   
		
			
		
		
		if(isValid){
			var sameName =  $scope.costsCategoriesArr.some(function(item){ 
				return (  item.title === result.title); 
				});
			var trimValid = result.title.trim();
				if(trimValid.length) {
						if(sameName) {
							$translate("This name already exists").then(function(translation){
								ngToast.create ({
									'content':translation,
									"className": 'danger'
								})
							  })
							result.title = undefined;
						}
						else {
							$uibModalInstance.close(result);
						}
						

						
				}
				else {
					$translate("Invalid name").then(function(translation){
						ngToast.create ({
							'content':translation,
							"className": 'danger'
						})
					  })

				}
		
		}
  	
		
	};
	
}])
