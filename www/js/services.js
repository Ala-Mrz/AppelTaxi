angular.module('starter.services', [])

.service('Rest', function($q, $http, Config, $ionicLoading) {

  var head = {
        headers : {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
        }
    };

  this.get = function (url) {
    var deferred = $q.defer();
      $http({
        method: 'GET',
        url: url
      }).then(function success(res) {
        deferred.resolve(res.data);
      }, function error(err) {
        deferred.reject(err);
      });

      return deferred.promise;
    };

    this.put = function (url, data) {
      var deferred = $q.defer();
      $http({
        method: 'PUT',
        url: url,
        data: data
      }).then(function success(res) {
        deferred.resolve(res.data);
      }, function error(err) {
        deferred.reject(err);
      });

      return deferred.promise;
    };

    this.post = function (url, d) {
    var deferred = $q.defer();
      $http.post(url, $.param(d), head).then(function success(res) {
        deferred.resolve(res.data);
      }, function error(err) {
        deferred.reject(err);
      });

      return deferred.promise;
    };

    this.delete = function (url) {
      var deferred = $q.defer();
      $http({
        method: 'DELETE',
        url: url
      }).then(function success(res) {
        deferred.resolve(res.data);
      }, function error(err) {
        deferred.reject(err);
      });

      return deferred.promise;
    };


    this.showToast = function(message) {
        message = message ;
        $ionicLoading.show({ template: message, noBackdrop: true, duration: 1000 });
    };


});