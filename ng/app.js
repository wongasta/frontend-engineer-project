var app = angular.module('project', ['ngMessages', 'LocalStorageModule', 'ngDialog', 'toaster']);

app.config(function (localStorageServiceProvider) {
  localStorageServiceProvider
    .setPrefix('proj')
    .setStorageType('localStorage');
});

app.run(['$rootScope', function($rootScope) {
  $rootScope.projectKeys = {
    sessionKey: 'current-session'
  };
}]);
