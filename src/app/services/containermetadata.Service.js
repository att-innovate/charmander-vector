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

            if (value === undefined){
                return idMap[key];
            } else {
                idMap[key] = value;
            }

        }

        function clearIdDictionary(){
            idMap = {};
        }

        /**
        * @name resolveId
        * @desc
        */
        function resolveId(instanceKey) {
            if ( typeof $window[containerConfig.functionName] === 'function' ){
                var dockerId = instanceKey.split('/')[2];
                $window[containerConfig.functionName](dockerId, $rootScope.properties).then(function(response){
                    idDictionary(dockerId,response);
                });
            } else {
                idDictionary(instanceKey,instanceKey);

            }
            
        }

        /**
        * @name setGlobalFilter
        * @desc
        */
        var globalFilter = '';
        function setGlobalFilter(word){
            globalFilter = word;
        }

        /**
        * @name getGlobalFilter
        * @desc
        */
        function getGlobalFilter(){
            return globalFilter;
        }

        //////////

        return {
            setGlobalFilter: setGlobalFilter,
            getGlobalFilter: getGlobalFilter,
            idDictionary: idDictionary,
            clearIdDictionary: clearIdDictionary,
            resolveId: resolveId
        };
    }

    angular
        .module('app.services')
        .factory('ContainerMetadataService', ContainerMetadataService);

 })();
