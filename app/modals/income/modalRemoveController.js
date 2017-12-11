(function(){
    app.controller('ModalRemoveController', ['$uibModalInstance', 'storageFactory', 'data', function ($uibModalInstance, storageFactory, data) {
        var modalRemoveCtrl = this;

        this.storageFactory = storageFactory;
        this.data = data;
        this.title = data.title;

        var index = this.data.index,
            field = this.data.source;

        this.ok = function () {
           field.splice(index, 1);
    //        console.log(modalRemoveCtrl.storageFactory);
            $uibModalInstance.close();
        };

        this.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }]);
})();