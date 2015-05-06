/**!
 */
 (function () {
     'use strict';

     /**
     * @name ScenarioService
     */
     function ScenarioService($http, $rootScope) {

        /**
        * @name getScenario
        * @desc
        */
        function getScenario() {
            return $http.get($rootScope.properties.scenario+'.json');
        }

        //////////

        return {
            getScenario: getScenario
        };
    }

    angular
        .module('app.services')
        .factory('ScenarioService', ScenarioService);

 })();
