/**
 * Created by mahidharchowdarymullapudi on 10/16/16.
 */
var CartList = angular.module('CartList', []);

var CartCtrl = function ($scope) {
    var _this = this;

    $scope.getPhones = function () {
        _this.getPhones($scope);
    };

};

CartCtrl.prototype.getPhones = function ($scope) {
    alert("Inside the getPhones method of cartApp");
    $scope.phones = [
        {
            name: 'Nexus S',
            snippet: 'Fast just got faster with Nexus S.'
        }, {
            name: 'Motorola XOOM™ with Wi-Fi',
            snippet: 'The Next, Next Generation tablet.'
        }, {
            name: 'MOTOROLA XOOM™',
            snippet: 'The Next, Next Generation tablet.'
        }
    ];
};

CartCtrl.$inject = ['$scope'];
CartList.controller('CartController', CartCtrl);
