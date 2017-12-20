 app.controller('addTemplateCosts', function($scope, $uibModalInstance, billsCategories, costsCategoriesArr,rolesArr) {
			$scope.rolesArr = rolesArr;
	 $scope.validInput = function (item) {
               
                
                //WHO
                if (item.who === null || item.who === undefined) {
                    ngToast.create({
                        "content": "Укажите участника",
                        "className": 'danger'
                    })
                    return false;
                }
                
                //FROM
                if (item.from === null || item.from === undefined) {
                    ngToast.create({
                        "content": "Укажите счет",
                        "className": 'danger'
                    })
                    return false;
                }
                
                //TO
                if (item.to === null || item.to === undefined) {
                    ngToast.create({
                        "content": "Укажите категорию",
                        "className": 'danger'
                    })
                    return false;
                }
                
                //SUM
                if (item.sum === null || item.sum === undefined) {
                    ngToast.create({
                        "content": "Укажите сумму",
                        "className": 'danger'
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

	$scope.ok = function() {
		// $scope.newTemplateModel.comment = $scope.newTemplateModel.title;
		$uibModalInstance.close($scope.newTemplateModel);
		
	};
	

})