/**!
 */
 (function () {
     'use strict';

     /**
     * @name IdService
     */
     function IdService($http, $rootScope) {

        /**
        * @name getId
        * @desc
        */
        function getId(id) {
            return $http.get('http://' + $rootScope.properties.host + ':' + '31900' +'/getid/'+id);
        }

        //////////

        return {
            getId: getId
        };
    }

    angular
        .module('app.services')
        .factory('IdService', IdService);

 })();
