(function () {

    var ValidationApp = angular.module('ValidationApp', []);

    var MyCtrl = function ($scope) {
        var _this = this;

        $scope.doStuff = function () {
            _this.doStuff();
        };

        $scope.save = function () {
            _this.save($scope);
        };

    };

    MyCtrl.prototype.doStuff = function () {
        //Really long function body
    };

    MyCtrl.prototype.save = function ($scope) {
        alert("Inside save form function");
        $scope.$broadcast('show-errors-check-validity');
        if ($scope.userForm.$valid) {
            alert("Form saved");
            $scope.$broadcast('reset-errors');
        } else{
            alert("Please fill in the required fields before submitting the form");
        }
    };


    MyCtrl.$inject = ['$scope'];
    ValidationApp.controller('MyController', MyCtrl);

    //Create a module to validate the form
    ValidationApp.directive('showErrors', function ($timeout) {
        return {
            restrict: 'A',
            require: '^form',
            link: function (scope, el, attr, MyCtrl) {
                // find the text box element, which has the 'name' attribute
                var inputEl = el[0].querySelector("[name]");
                // convert the native text box element to an angular element
                var inputNgEl = angular.element(inputEl);
                // get the name on the text box so we know the property to check
                // on the form controller
                var inputName = inputNgEl.attr('name');
                // only apply the has-error class after the user leaves the text box
                inputNgEl.bind('blur', function () {
                    el.toggleClass('has-error', MyCtrl[inputName].$invalid);
                })

                scope.$on('show-errors-check-validity', function () {
                    el.toggleClass('has-error', MyCtrl[inputName].$invalid);
                });

                scope.$on('reset-errors', function () {
                    //To prevent race condition, we are using the timeout to wait until the digest cycle is completed
                    $timeout(function () {
                        el.removeClass('has-error');
                    }, 0 , false);

                });
            }
        }
    });

})();