app.controller('AddExpenditureCategory', ['$scope', '$uibModalInstance', 'newExpenditureCategoryModel', 'ngToast' , 'costsCategoriesArr',
					function($scope, $uibModalInstance, newExpenditureCategoryModel,ngToast, costsCategoriesArr) {

	$scope.costsCategoriesArr = costsCategoriesArr;
	
	$scope.costsName = [];
	costsCategoriesArr.forEach(function (item){
		$scope.costsName.push(item.title)
	})

    $scope.valid = function (item) {
    	if (item === undefined || item === '' ||  item=== null ) {
            ngToast.create({
                "content": "Укажите название",
                "className": 'danger'
                })
            return false;
        }
        else if ( item.title === "" || item.title ===undefined || item.title === null) {
        	ngToast.create({
                "content": "Укажите название",
                "className": 'danger'
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
		var sameName =  $scope.costsCategoriesArr.some(function(item){
			return (  item.title === result.title); 
			});
			
		
		
		if(isValid){
			var trimValid = result.title.trim();
				if(trimValid.length) {
						if(sameName) {
							ngToast.create({
							'content': ' Такое имя уже существует',
							'className': 'danger'	
							});
							result.title = undefined;
						}
						else {
							$uibModalInstance.close(result);
						}
						

					
				}
				else {
					ngToast.create({
					'content': ' Некорректное имя',
					'className': 'danger'
					})

				}
		
		}
  	
		
	};
	
}])

// arr = [
//     {
// 		title : 'jeka',
// 		name : 'dsa'
// 	},
//     {
// 		title : 'nika',
// 		name : 'sass'
// 	}
// ];

// result = {
// 	title: 'kas'
// }
// function sameName(obj) {
// 	return (result.title === result.title) {

// 		return true
// 	}
// 	return false
// }

// arr.some(sameName)


// function sameName(obj) {
// 							return obj.title === costsCategoriesArr.title  
// 						};
// 						if( costsCategoriesArr.some(sameName(result))) {
// 							ngToast.create ({
// 							'content' : 'same name',
// 							'className':'warning'
// 						});
// 						}













