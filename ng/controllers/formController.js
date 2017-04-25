app.controller('formController', ['$scope', '$rootScope', 'toaster', function($scope, $rootScope, toaster){

  var fields = ['pf_name', 'pf_email', 'pf_phone', 'pf_city', 'pf_address', 'pf_state', 'pf_zip'];
  $scope.fo = {};
  $scope.phoneRegex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;
  $scope.zipRegex = /^[0-9]{5}(?:-[0-9]{4})?$/;

  $scope.signUpCheck = function(inputName){
    if(!inputName){ return 'error_border'; }
    return (inputName.$dirty && !inputName.$invalid)?'correct_border':'error_border';
  };

  $scope.evenListenerLog = function(value){
    console.log('Field Value Updated: ', value);
  };

  $scope.submitInfo = function(pf){
    var validationFailed = _.reduce(fields, function(failed, v, k){
      if(failed){ return failed }
      return !(_.isEmpty(pf[v].$error));
    }, false);
    if(validationFailed){
      toaster.pop('error', "Validation Failed", "Please check your inputs", 5000);
      return false;
    }
    $scope.fo = _.merge($scope.fo, {session: $scope.session});
    return true;
  };

}]);