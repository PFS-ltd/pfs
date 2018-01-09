(function () {
    app.controller('SettingsController', ['$uibModal', '$scope', 'settingsService', '$translate', 'ngToast', 'Auth', '$state', 'localeFactory', function ($uibModal, $scope, settingsService, $translate, ngToast, Auth, $state, localeFactory) {

        var settingsCtrl = this;
        
        
        this.roles = settingsService.getRolesArray();
        this.style = localStorage.getItem('preferredStyle') || 0;
        this.lang = localStorage.getItem('preferredLanguage') || 'ru';
        
        //change language
        this.changeLanguage = function(key) {
            $translate.use(key);
            localStorage.setItem('preferredLanguage', key);
            localeFactory.setLocale(key);
        }
        
        //change theme
        this.changeStyle = function () {
            localStorage.setItem('preferredStyle', settingsCtrl.style);
            
            $scope.$emit('styleChanged', settingsCtrl.style);
        };
        
//        console.log($locale);
        //user profile
        this.email = Auth.$getAuth().email;
        this.oldPass = '';
        this.newPass = '';
        this.confirmPass = '';
        this.class3 = 'col-lg-4 col-md-4 col-sm-4';
        this.seeError3 = false;
        this.class4 = 'col-lg-4 col-md-4 col-sm-4';
        this.seeError4 = false;
        this.seeError5 = false;
        this.confirmMailField = false;
        this.class5 = 'form-group col-lg-4 col-md-4 col-sm-4';
        this.mailPass = '';
        this.seeError6 = false;
//        settingsCtrl.confirmMailField
        
        this.checkMail = function(newMail) {
            if (newMail === '') return $translate('Empty mail').then(function(content) { return content; });
            else if (newMail.indexOf('@') === -1 || newMail.indexOf('.') === -1 || (newMail.indexOf('@') > newMail.lastIndexOf('.')) === true) return $translate('Invalid format').then(function(content) { return content; });
        }
        
        this.mailChanged = function(mail) {
            if (mail !== Auth.$getAuth().email) settingsCtrl.confirmMailField = true;
        }
        
        this.clearClass4 = function() {
            settingsCtrl.seeError6 = false;
            settingsCtrl.class5 = 'form-group col-lg-4 col-md-4 col-sm-4';
        }
        
        this.updateMail = function(pass, mail) {
            Auth.$signInWithEmailAndPassword(Auth.$getAuth().email, pass).then(function(user) {
                user.updateEmail(mail);
                settingsCtrl.confirmMailField = false;
                $translate('Email updated').then(function(content) {
                    ngToast.create({
                        "content": content,
                        "className": 'success'
                    });
                });
            },
            function() {
                settingsCtrl.seeError6 = true;
                settingsCtrl.class5 = 'form-group col-lg-4 col-md-4 col-sm-4 has-error';
            });
        }
        
        this.clearClass3 = function() {
            settingsCtrl.class3 = 'col-lg-4 col-md-4 col-sm-4';
            settingsCtrl.seeError3 = false;
            settingsCtrl.class4 = 'col-lg-4 col-md-4 col-sm-4';
            settingsCtrl.seeError4 = false;
            settingsCtrl.seeError5 = false;
        }
        // console.log(Auth.$getAuth());
        
        this.changePass = function(oldPass, newPass, confirmPass) {
            Auth.$signInWithEmailAndPassword(Auth.$getAuth().email, oldPass).then(function(user) {
                if (newPass.length < 6) {
                    settingsCtrl.class4 = 'col-lg-4 col-md-4 col-sm-4 has-error';
                    settingsCtrl.seeError5 = true;
                } else if (newPass !== confirmPass){
                    settingsCtrl.class4 = 'col-lg-4 col-md-4 col-sm-4 has-error';
                    settingsCtrl.seeError4 = true;
                } else if (newPass === confirmPass) {
                    user.updatePassword(newPass);
                    $translate('Password updated').then(function(content) {
                        ngToast.create({
                            "content": content,
                            "className": 'success'
                        });
                    });
                    settingsCtrl.oldPass = '';
                    settingsCtrl.newPass = '';
                    settingsCtrl.confirmPass = '';
                }
            },
            function() {
                settingsCtrl.class3 = 'col-lg-4 col-md-4 col-sm-4 has-error';
                settingsCtrl.seeError3 = true;
            });
        };
        
        //widgets
        (localStorage.getItem('rates') === 'false') ? this.seeRates = false : this.seeRates = true;
        (localStorage.getItem('converter') === 'false') ? this.seeConv = false : this.seeConv = true;
        
        this.widgets = function(widget, value) {
            localStorage.setItem(widget, value);
            $scope.$emit('widgets', {'widget': widget, 'value': value});
        }
        
        //Roles
        this.newRole = '';
        this.class1 = 'form-group col-lg-4 col-md-4 col-sm-4';
        this.seeError1 = false;
        
        this.clearClass1 = function() {
                settingsCtrl.class1 = 'form-group col-lg-4 col-md-4 col-sm-4';
                settingsCtrl.seeError1 = false;
        }
        
        
        this.addRole = function() {
            if (settingsCtrl.newRole != '') {
//            console.log(settingsCtrl.newRole);
                settingsService.addRole({title: settingsCtrl.newRole});
                settingsCtrl.newRole = '';
                $translate('Add new participant').then(function(content) {
                    ngToast.create({
                        "content": content,
                        "className": 'success'
                    });
                });
            } else {
                settingsCtrl.class1 = 'form-group col-lg-4 col-md-4 col-sm-4 has-error';
                settingsCtrl.seeError1 = true;
            }
        };

        this.checkName = function(newName) {
//            if (newName === '') return "Имя не может быть пустым";
            if (newName === '') return $translate('Empty name').then(function(content) { return content; });
        }
        
        this.updateRole = function(item) {
//            console.log(data);
            settingsService.updateRole(item);
            $translate('Participant successfully updated').then(function(content) {
                        ngToast.create({
                            "content": content,
                            "className": 'success'
                        });
            });
        }
        
        this.deleteRole = function(item) {
//            console.log(settingsCtrl.roles);
//            console.log('length: ' + settingsCtrl.roles.length);
            if (settingsCtrl.roles.length > 1) {
                settingsService.delIRole(item);
                $translate('Participant deleted').then(function(content) {
                    ngToast.create({
                        "content": content,
                        "className": 'success'
                    });
                });
            } else {
                $translate('Must be minimum one participant').then(function(content) {
                    ngToast.create({
                        "content": content,
                        "className": 'danger'
                    });
                });
            }
        }
        
        //del account
        this.pass = '';
        this.class2 = 'form-group col-lg-4 col-md-4 col-sm-4';
        this.seeError2 = false;
        
        this.clearClass2 = function() {
                settingsCtrl.class2 = 'form-group col-lg-4 col-md-4 col-sm-4';
                settingsCtrl.seeError2 = false;
        }
        
        this.deleteUser = function(pass) {
            Auth.$signInWithEmailAndPassword(Auth.$getAuth().email, pass).then(function() {
       
                var modalInstance = $uibModal.open({
                    templateUrl: 'app/modals/settings/delUserAccount/delUserAccount.html',
                    controller: 'delUserAccountController',
                    // controllerAs: 'modalSourceCtrl',
                    size: 'sm'
                });
                modalInstance.result.then(function (result) {
                    if (result) {
                        settingsService.delUser(Auth.$getAuth().uid);
                        Auth.$deleteUser().then(function(){
                            $state.go('root');
                            $translate('Your account is deleted').then(function(content) {
                                ngToast.create({
                                    "content": content,
                                    "className": 'success'
                                });
                            });
                        });
                    }
                }, function () {
                    //error
                });
            },
            function() {
                settingsCtrl.class2 = 'form-group col-lg-4 col-md-4 col-sm-4 has-error';
                settingsCtrl.seeError2 = true;
            });
        }
    }]);
})();