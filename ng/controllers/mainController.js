app.controller('mainController', ['$scope', '$rootScope', 'sessionFactory', 'ngDialog', 'toaster', function($scope, $rootScope, sessionFactory, ngDialog, toaster){
  var session;
  $scope.startSession = function(){
    session = sessionFactory.getSession();
    if(!session){
      session = sessionFactory.setSession();
      toaster.pop('info', "Session Set", "You belong to session "+session.session, 5000);
    }
    var dialogScope = _.merge($scope.$new(true), {session: session.session});
    ngDialog.openConfirm({
      template: 'partials/dialogs/form.html',
      closeByEscape: true,
      closeByDocument: false,
      className: 'form-dialog ngdialog-theme-plain',
      closeByNavigation: true,
      showClose: false,
      scope: dialogScope,
      controller: 'formController'
    }).then(function(fo) {
      console.log('Submission Result', fo);
      toaster.pop('success', "Submission Successful", "You have successfully submitted!", 5000);
      $scope.formResult = fo;
    }, _.noop);
  };

}]);