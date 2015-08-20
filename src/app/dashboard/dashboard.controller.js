/**!
 *
 *  Copyright 2015 Netflix, Inc.
 *
 *     Licensed under the Apache License, Version 2.0 (the "License");
 *     you may not use this file except in compliance with the License.
 *     You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 *     Unless required by applicable law or agreed to in writing, software
 *     distributed under the License is distributed on an "AS IS" BASIS,
 *     WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *     See the License for the specific language governing permissions and
 *     limitations under the License.
 *
 */

/*jslint node: true*/
/*global angular*/
/*jslint browser: true*/
/*jslint nomen: true */

(function () {
    'use strict';

    /**
    * @name DashboardCtrl
    * @desc Main dashboard Controller
    */
    function DashboardCtrl($document, $rootScope, $log, $route, $routeParams, $location, $timeout, widgetDefinitions, widgets, DashboardService) {
        var vm = this;
        var path = $route.current.$$route.originalPath;


        /**
        * @name visibilityChanged
        * @desc Pauses/resumes interval updates if window/tab is out of focus.
        */
        function visibilityChanged() {
            if ($document[0].hidden || $document[0].webkitHidden ||
                $document[0].mozHidden || $document[0].msHidden) {
                DashboardService.cancelInterval();
            } else {
                DashboardService.updateInterval();
            }
        }

        /**
        * @name activate
        * @desc Initiliazes DashboardController
        */
        function activate() {
            DashboardService.initializeProperties();

            if ($routeParams.protocol) {
                $rootScope.properties.protocol = $routeParams.protocol;
                $log.info('Protocol: ' + $routeParams.protocol);
            }

            if ($routeParams.host) {
                vm.inputHost = $routeParams.host;
                $log.info('Host: ' + $routeParams.host);
                if ($routeParams.hostspec) {
                    $rootScope.properties.hostspec = $routeParams.hostspec;
                    $log.info('Hostspec: ' + $routeParams.hostspec);
                }

                $rootScope.properties.widgets = $routeParams.widgets; //sets the scenario parameters

                DashboardService.updateHost(vm.inputHost);

            }

            // hack to deal with window/tab out of focus
            $document[0]
                .addEventListener('visibilitychange', visibilityChanged, false);
            $document[0]
                .addEventListener('webkitvisibilitychange', visibilityChanged, false);
            $document[0]
                .addEventListener('msvisibilitychange', visibilityChanged, false);
            $document[0]
                .addEventListener('mozvisibilitychange', visibilityChanged, false);

            $log.info('Dashboard controller initialized with ' + path + ' view.');
        }

        var widgetsToLoad = widgets;

        if ($routeParams.widgets !== undefined ){
            var indexArr = $routeParams.widgets.split(','); 
            var arr = [];

            for(var a =0; a< indexArr.length; a++){
                arr.push(widgetDefinitions[indexArr[a]]);
            }
            widgetsToLoad = arr;

        }

        vm.dashboardOptions = {
            hideToolbar: true,
            widgetButtons: false,
            hideWidgetName: true,
            hideWidgetSettings: false,
            widgetDefinitions: widgetDefinitions,
            defaultWidgets: widgetsToLoad
        };
        if ($routeParams.widgets === undefined){
            var urlArr=[];

            for(var b=0; b< widgets.length;b++){
                for(var c=0; c< widgetDefinitions.length;c++){
                    if (widgetDefinitions[c].name === widgets[b].name){
                        urlArr.push(c); 
                    }
                }
            }
            $location.search('widgets', urlArr.toString());
        }else{
            //check for invalid character
            if ($routeParams.widgets){

                var arr1 = $routeParams.widgets.split(',');
                for(var z =0; z< arr1.length;z++){
                    var zz = arr1[z];
                    if ( ! /^\d+$/.test(zz) ) {
                        $location.search('widgets', null); 
                        break;
                     }
                 }
            }
        }

        //refactor widget mapping into service
        vm.widgetMapping={};
        for (var f=0; f< widgetDefinitions.length; f++){
            vm.widgetMapping[widgetDefinitions[f].name]=f;
        }

        // Export controller public functions
        vm.updateInterval = DashboardService.updateInterval;
        vm.updateHost = function() {
            DashboardService.updateHost(vm.inputHost);
        };
        vm.updateFilter = function() {
            DashboardService.updateFilter(vm.globalFilter);
        };
        vm.addWidgetToURL = function(widgetObj){
            var newUrl ='';
            if ($routeParams.widgets === undefined) {
                $routeParams.widgets = '';
            } else {
                newUrl = ',';
            }
            newUrl = newUrl + widgetDefinitions.indexOf(widgetObj);
            $location.search('widgets', $routeParams.widgets + newUrl);
        };
        vm.removeWidgetFromURL = function(widgetObj){
            var indexArr = $routeParams.widgets.split(',');
            for (var d=0; d< indexArr.length; d++){
                if (indexArr[d] == vm.widgetMapping[widgetObj.name]){
                    indexArr.splice(d,1);
                    break;
                }
            }
            if (indexArr.length < 1){
                $location.search('widgets', null);
            } else {
               $location.search('widgets', indexArr.toString()); 
            }
            
        };
        vm.removeAllWidgetFromURL = function(){
            $location.search('widgets', null);
        };
        vm.updateFilterWidget = function(widgetModel, modalInput) {
            widgetModel.filter=modalInput.result;
        };
        vm.clearFilterWidget = function(widgetModel) {
            widgetModel.filter='';
        };
        vm.updateWindow = DashboardService.updateWindow;
        vm.isHostnameExpanded = false;
        vm.inputHost = '';
        vm.globalFilter ='';
        activate();
    }

    DashboardCtrl.$inject = [
        '$document',
        '$rootScope',
        '$log',
        '$route',
        '$routeParams',
        '$location',
        '$timeout',
        'widgetDefinitions',
        'widgets',
        'DashboardService'
    ];

    angular
        .module('app.controllers', [])
        .controller('DashboardController', DashboardCtrl);

})();
