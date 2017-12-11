(function(){
    app.controller('ModalCountController', ['$uibModalInstance', 'storageFactory', 'data', function ($uibModalInstance, storageFactory, data) {
        var modalCountCtrl = this;

        this.storageFactory = storageFactory;
        this.data = data;
        this.count = this.data.item;
        this.seeXtra = this.data.item.regularRefill;

        var index = this.data.index,
            counts = this.storageFactory.counts;

        switch(this.data.eventType) {
            case 'edit':
                modalCountCtrl.varName = 'Редактировать';
                modalCountCtrl.ok = function () {
                    counts[index] = angular.extend(counts[index], modalCountCtrl.count);
    //                console.log(counts[index]);
    //                console.log(modalCountCtrl.storageFactory.counts);
                    $uibModalInstance.close();
                };

                modalCountCtrl.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };
                break;
            case 'add':
                modalCountCtrl.varName = 'Добавить';
                modalCountCtrl.ok = function () {
                    counts.push(modalCountCtrl.count)
    //                console.log(modalCountCtrl.storageFactory.counts);
                    $uibModalInstance.close();
                };

                modalCountCtrl.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };
                break;
            default:
                break;
        }
    }]);
})();