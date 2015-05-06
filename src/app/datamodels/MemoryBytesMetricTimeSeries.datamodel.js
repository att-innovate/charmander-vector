/**!
 *
 */

 (function () {
     'use strict';

    /**
    * @name MemoryBytesMetricTimeSeriesDataModel
    * @desc
    */
    function MemoryBytesMetricTimeSeriesDataModel(ScenarioService, $rootScope, WidgetDataModel, MetricListService, VectorService) {
        var DataModel = function () {
            return this;
        };

        DataModel.prototype = Object.create(WidgetDataModel.prototype);

        DataModel.prototype.init = function () {
            WidgetDataModel.prototype.init.call(this);

            this.name = this.dataModelOptions ? this.dataModelOptions.name : 'metric_' + VectorService.getGuid();

            // create create base metrics
            var inMetric = MetricListService.getOrCreateCumulativeMetric('cgroup.memory.usage'),
                //outMetric = MetricListService.getOrCreateCumulativeMetric('network.interface.out.bytes'),
                derivedFunction;

            // create derived function
            derivedFunction = function () {
                var returnValues = [],
                    lastValue;         

                angular.forEach(inMetric.data, function (instance) {
                    if (instance.values.length > 0 && instance.key.indexOf("docker/")!== -1) {
                        lastValue = instance.values[instance.values.length - 1];
                        returnValues.push({
                            timestamp: lastValue.x,
                            key: instance.key,
                            value: instance.previousValue / 1024 / 1024
                        });
                    }
                });


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
            MetricListService.destroyMetric('cgroup.memory.usage');

            WidgetDataModel.prototype.destroy.call(this);
        };

        return DataModel;
    }

    angular
        .module('app.datamodels')
        .factory('MemoryBytesMetricTimeSeriesDataModel', MemoryBytesMetricTimeSeriesDataModel);
 })();
