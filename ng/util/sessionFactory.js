app.factory('sessionFactory', ['$rootScope', 'localStorageService', function($rootScope, localStorageService){
  var lsKey = $rootScope.projectKeys.sessionKey;
  return {
    getSession: function(){
      return localStorageService.get(lsKey);
    },
    setSession: function(){
      localStorageService.set(lsKey, {
        session_id: moment().format(),
        session: (Math.floor(Math.random() * 2))?'a':'b'
      });
      console.log("Session Set", this.getSession());
      return this.getSession();
    }
  };
}]);
