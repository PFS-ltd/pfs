  app.controller('addTemplateCosts', function($scope, $uibModalInstance, billsCategories, costsCategoriesArr,rolesArr, ngToast,templateCostsArr,$translate) {
			$scope.rolesArr = rolesArr;
			$scope.templateCostsArr = templateCostsArr;
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
              	else if (item.comment === null || item.comment === undefined || item.comment === ''){
					$translate("Indicate the name").then(function(translation){
						ngToast.create ({
							'content':translation,
							"className": 'danger'
						}) 
					  })
              		return false;
              	}
                else if (item.who === null || item.who === undefined) {
                    $translate('Indicate the participant').then(function(translation){
						ngToast.create ({
							'content':translation,
							"className": 'danger'
						})
					  })
                    return false;
                }
                
                //FROM
                else if (item.from === null || item.from === undefined) {
					$translate("Indicate the account").then(function(translation){
						ngToast.create ({
							'content':translation,
							"className": 'danger'
						})
					  })
                    return false;
                }
                
                //TO
                else if (item.to === null || item.to === undefined) {
                    $translate("Indicate the category").then(function(translation){
						ngToast.create ({
							'content':translation,
							"className": 'danger'
						})
					  })
                    return false;
                }
                
                //SUM
                else if (item.sum === null || item.sum === undefined || item.sum === 0) {
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
	$scope.costsCategoriesArr = costsCategoriesArr.map(function (item) {
		return {
			id: item.$id,
			title: item.title
		};
	});
	$scope.billsCategories = billsCategories.map(function (item) {
		return {
			id: item.$id,
			title: item.title
		};
	});
    

    $scope.cancel = function() {
		$uibModalInstance.close();

	};

	$scope.ok = function(result) {
		var isValid = $scope.validInput(result);  
		
		console.log('sameNAm', sameName);
		if (isValid){
			var sameName =  $scope.templateCostsArr.some(function(item){
				return (  item.comment === result.comment); 
				});
			if(sameName){
				$translate("This name already exists").then(function(translation){
					ngToast.create ({
						'content':translation,
						"className": 'danger'
					})
				  })
							result.comment = undefined;
			}
			else {
				$uibModalInstance.close($scope.newTemplateModel);
			}
			
		}
		// $scope.newTemplateModel.comment = $scope.newTemplateModel.title;
		
		
	};
	

})