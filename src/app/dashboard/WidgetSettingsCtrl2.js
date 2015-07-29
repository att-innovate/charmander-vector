
(function () {
    'use strict';

angular.module('ui.dashboard')
  .controller('WidgetSettingsCtrl2', ['$scope', '$modalInstance', 'widget', function ($scope, $modalInstance, widget) {

    // add widget to scope
    $scope.widget = widget;

    // set up result object
    //$scope.result = $.extend(true, {}, widget);
    $scope.result = angular.extend({},$scope.result, widget);

    $scope.ok = function () {
      $modalInstance.close($scope.result);
      //console.log('widget:',widget);
    };

    $scope.cancel = function () {

      $modalInstance.dismiss('cancel');
    };
  }]);

})();