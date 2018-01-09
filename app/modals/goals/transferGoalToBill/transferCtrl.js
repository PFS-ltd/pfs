  app.controller('transferCtrl', function($scope, $uibModalInstance, ngToast,item,billsCategories,goalArr,rolesArr,$translate) {
	$scope.item = item;
	$scope.billsCategories = billsCategories;
	$scope.goalArr = goalArr;
	$scope.rolesArr = rolesArr;
    $scope.cancel = function() {
		$uibModalInstance.dismiss('cancel');
	};
	$scope.validInput = function (item) {
		if(item === undefined || item === null || item ===""){
            $translate("fill the form").then(function(translation){
                ngToast.create ({
                    'content':translation,
                    "className": 'danger'
                })
              })
            return false;
        }
		   
		   //WHO
		   if (item.who === null || item.who === undefined) {
			$translate('Indicate the participant').then(function(translation){
				ngToast.create ({
					'content':translation,
					"className": 'danger'
				})
			  })
			   return false;
		   }
		   
		   //FROM
		   if (item.from === null || item.from === undefined) {
			$translate("Indicate the account").then(function(translation){
				ngToast.create ({
					'content':translation,
					"className": 'danger'
				})
			  })
			   return false;
		   }
		   
		   //TO
		   if (item.to === null || item.to === undefined) {
			$translate("Indicate the category").then(function(translation){
				ngToast.create ({
					'content':translation,
					"className": 'danger'
				})
			  })
			   return false;
		   }
		   
		   //SUM
		   if (item.sum === null || item.sum === undefined || item.sum === 0) {
			$translate("Indicate the sum").then(function(translation){
				ngToast.create ({
					'content':translation,
					"className": 'danger'
				})
			  })
			   return false;
		   }
		   
		   return true;
	

	};

	$scope.ok = function(result) {
		console.log('result', result);
		var valInp = $scope.validInput(result);
		if(valInp){
			if( (result.from.sum -result.sum ) < 0 ) {
				$translate("It's not enough money on the account").then(function(translation){
					ngToast.create ({
							'content':translation,
							"className": 'danger'
					})
				}) 
			}
			else {
				result.date = new Date ();
			console.log(result);
			$uibModalInstance.close(result);	
			}
		}
		
		
		
	};
	

})