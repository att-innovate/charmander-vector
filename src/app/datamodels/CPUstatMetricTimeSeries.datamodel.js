/**!
 *
 */
 (function () {
     'use strict';

    /**
    * @name CPUstatMetricTimeSeriesDataModel
    * @desc
    */
    function CPUstatMetricTimeSeriesDataModel(IdService, WidgetDataModel, MetricListService, VectorService) {
        var DataModel = function () {
            return this;
        };

        DataModel.prototype = Object.create(WidgetDataModel.prototype);

        DataModel.prototype.init = function () {
            WidgetDataModel.prototype.init.call(this);

            this.name = this.dataModelOptions ? this.dataModelOptions.name : 'metric_' + VectorService.getGuid();
            var widgetDefinition = this;

            // create create base metrics
            var cpuSysMetric = MetricListService.getOrCreateCumulativeMetric('cgroup.cpuacct.stat.user'),
                cpuUserMetric = MetricListService.getOrCreateCumulativeMetric('cgroup.cpuacct.stat.system'),
                derivedFunction,
                idDictionary = {};

            derivedFunction = function () {
                var returnValues = [],
                    lastValue2 = [];

                if ( cpuSysMetric.data.length > 0 && cpuUserMetric.data.length > 0){

                    angular.forEach(cpuSysMetric.data, function (instance) {
                        if (instance.values.length > 0 && instance.key.indexOf('docker/')!== -1) {
                            lastValue2.push(instance.previousValue);
                            IdService.getId(instance.key.split('/')[2])
                                .success(function(data){

                                    if (data.indexOf(widgetDefinition.widgetScope.widget.filter) !==-1) {
                                        idDictionary[instance.key.split('/')[2]] = data;    
                                    }
                                })
                                .error(function(){
                                    idDictionary[instance.key.split('/')[2]] = instance.key;
                            });
                        }
                    });

                    angular.forEach(cpuUserMetric.data, function (instance) {
                        if (instance.values.length > 0 && instance.key.indexOf('docker/')!== -1) {
                            var lastValue = instance.values[instance.values.length - 1];
                            
                            var name = idDictionary[instance.key.split('/')[2]] || instance.key;
                            if (name.indexOf(widgetDefinition.widgetScope.widget.filter) !==-1) {
                            returnValues.push({
                                timestamp: lastValue.x,
                                key: name,
                                value: instance.previousValue / lastValue2.shift()
                            });

                            }
                        }
                    });
                    
                }

                return returnValues;
            };

            // create derived metric
            this.metric = MetricListService.getOrCreateDerivedMetric(this.name, derivedFunction);

            this.updateScope(this.metric.data);
        };

        DataModel.prototype.destroy = function () {
            // remove subscribers and delete derived metric
            MetricListService.destroyDerivedMetric(this.name);

            // remove subscribers and delete base metrics
            MetricListService.destroyMetric('cgroup.cpuacct.stat.user');
            MetricListService.destroyMetric('cgroup.cpuacct.stat.system');

            WidgetDataModel.prototype.destroy.call(this);
        };

        return DataModel;
    }

    angular
        .module('app.datamodels')
        .factory('CPUstatMetricTimeSeriesDataModel', CPUstatMetricTimeSeriesDataModel);
 })();
