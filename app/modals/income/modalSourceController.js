(function(){
    app.controller('ModalSourceController', ['$uibModalInstance', 'storageFactory', 'data', function ($uibModalInstance, storageFactory, data) {
        var modalSourceCtrl = this;

        this.storageFactory = storageFactory;
        this.data = data;
        this.source = modalSourceCtrl.data.item;

        var index = this.data.index,
            categories = this.storageFactory.categories;

        switch(this.data.eventType) {
            case 'edit':
                modalSourceCtrl.varName = 'Редактировать';
                modalSourceCtrl.ok = function () {
                    categories[index].title = modalSourceCtrl.source.title;
    //                console.log(categories[index]);
//                    console.log(modalSourceCtrl.storageFactory.categories);
                    $uibModalInstance.close();
                };

                modalSourceCtrl.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };
                break;
            case 'add':
                modalSourceCtrl.varName = 'Добавить';
                modalSourceCtrl.ok = function () {
                    categories.push(modalSourceCtrl.source)
//                    console.log(modalSourceCtrl.storageFactory.categories);
                    $uibModalInstance.close();
                };

                modalSourceCtrl.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };
                break;
            default:
                break;
        }
    }]);
})();