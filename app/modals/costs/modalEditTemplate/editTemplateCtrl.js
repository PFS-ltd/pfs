 app.controller('editTemplateCtrl', function ($scope, $uibModalInstance, item, costsCategoriesArr, billsCategories, templateCosts, ngToast,templateCostsArr,rolesArr) {
	// console.log(correctTemplate);
	// $scope.storageFactory = storageFactory;
	// $scope.correctTemplate = correctTemplate;
	// console.log(item);
  $scope.costsCategoriesArr=costsCategoriesArr;
//   console.log($scope.costsCategoriesArr);
	$scope.templateCostsArr = templateCostsArr;
	$scope.correctTemplate = item;
	$scope.rolesArr = rolesArr;
  $scope.abracadabra = item.from;
//   console.log($scope.abracadabra)
	 $scope.validInput = function (item) {
               	if(item === undefined || item === null || item ===""){
               		ngToast.create({
               			'content': 'Заполните форму',
               			'className': 'danger'
               		})
               		return false;
               	}
              	else if (item.comment === null || item.comment === undefined || item.comment === ''){
              		ngToast.create({
              			'content': 'Укажите название',
              			'className': 'danger'
              		});
              		return false;
              	}
                else if (item.who === null || item.who === undefined) {
                    ngToast.create({
                        "content": "Укажите участника",
                        "className": 'danger'
                    })
                    return false;
                }
                
                //FROM
                else if (item.from === null || item.from === undefined) {
                    ngToast.create({
                        "content": "Укажите счет",
                        "className": 'danger'
                    })
                    return false;
                }
                
                //TO
                else if (item.to === null || item.to === undefined) {
                    ngToast.create({
                        "content": "Укажите категорию",
                        "className": 'danger'
                    })
                    return false;
                }
                
                //SUM
                else if (item.sum === null || item.sum === undefined) {
                    ngToast.create({
                        "content": "Укажите сумму",
                        "className": 'danger'
                    })
                    return false;
                }
                
                return true;
            }
	
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
	
	



	$scope.cancel = function () {
		$uibModalInstance.dismiss('cancel');

	};

	$scope.ok = function (result) {
		var isValid = $scope.validInput(result);
		var sameName =  $scope.templateCostsArr.some(function(result){
			return (  item.comment === result.comment); 
			});
		if (isValid) {
			if (sameName){
				ngToast.create({
							'content': ' Такое имя уже существует',
							'className': 'danger'	
							});
							result.comment = undefined;
			}
			else {
			$uibModalInstance.close(result);
			}	
		}
		
	};


})