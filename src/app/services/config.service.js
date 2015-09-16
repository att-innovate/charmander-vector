/**!
 */
 (function () {
     'use strict';

     /**
     * @name ConfigService
     */
     function ConfigService($http, $rootScope, $q, configFunctions, $window) {

        /**
        * @name saveConfig
        * @desc
        */

        function saveConfig(currentConfig, activeWidgets){
            if ( typeof $window[configFunctions.save] === 'function' ){
              var deferred = $q.defer();
                $window[configFunctions.save](currentConfig, activeWidgets).then(function(response){
                  deferred.resolve(response);
                });
              return deferred.promise;
            }

        }

        /**
        * @name deleteConfig
        * @desc
        */

        function deleteConfig(configName){
            if ( typeof $window[configFunctions.delete] === 'function' ){
              var deferred = $q.defer();
                $window[configFunctions.delete](configName).then(function(response){
                  deferred.resolve(response);
                });
              return deferred.promise;
            }            

        }

        /**
        * @name loadConfig
        * @desc load from localstorage or from rest API
        */

        function loadConfig(){
            if ( typeof $window[configFunctions.load] === 'function' ){
              var deferred = $q.defer();
              $window[configFunctions.load]().then(function(response){

                  deferred.resolve(response);
              });

              return deferred.promise;
            }

        }

        //////////

        return {
            saveConfig: saveConfig,
            deleteConfig: deleteConfig,
            loadConfig: loadConfig,
        };
    }

    angular
        .module('app.services')
        .factory('ConfigService', ConfigService);

 })();
