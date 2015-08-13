/**!
 */
 (function () {
     'use strict';

     /**
     * @name ContainerMetadataService
     */
     function ContainerMetadataService($http, $rootScope, $q, containerConfig, $window) {

        /**
        * @name idDictionary
        * @desc
        */

        var idMap = {};
        function idDictionary(key, value){
            if (key.indexOf('docker/') !==-1){
                key = key.split('/')[2];
            } 
                
            if (key === value) {
                return key;   
            }

            if (value === undefined){
                return idMap[key];
            } else {
                idMap[key] = value;
            }

        }

        /**
        * @name resolveId
        * @desc
        */

        function resolveId(instanceKey) {
            
            if ( typeof $window[containerConfig.functionName] === 'function' ){
                var dockerId = instanceKey.split('/')[2];
                $window[containerConfig.functionName](dockerId).then(function(response){
                    idDictionary(dockerId,response);
                });
            } else {
                idDictionary(instanceKey,instanceKey);
            }
            
        }

        //////////

        return {
            idDictionary:idDictionary,
            resolveId: resolveId
        };
    }

    angular
        .module('app.services')
        .factory('ContainerMetadataService', ContainerMetadataService);

 })();
