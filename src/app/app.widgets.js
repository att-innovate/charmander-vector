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

(function () {
    'use strict';

    /* Widgets */
    function widgetDefinitions(MetricDataModel,
                               CumulativeMetricDataModel,
                               containerCPUstatMetricTimeSeriesDataModel,
                               containerMemoryBytesMetricTimeSeriesDataModel,
                               MemoryUtilizationMetricDataModel,
                               NetworkBytesMetricDataModel,
                               CpuUtilizationMetricDataModel,
                               PerCpuUtilizationMetricDataModel,
                               MultipleMetricDataModel,
                               MultipleCumulativeMetricDataModel,
                               DummyMetricDataModel,
                               DiskLatencyMetricDataModel,
                               CumulativeUtilizationMetricDataModel,
                               vectorConfig) {

        var onSettingsClose = function(resultFromModal, widgetModel) {
            if (typeof resultFromModal !== 'undefined'){
                widgetModel.filter = resultFromModal.filter; 
            }    
        };

        var definitions = [
            {
                name: 'att.cpu.utilization',
                title: 'CPU Utilization',
                directive: 'line-time-series',
                dataAttrName: 'data',
                dataModelType: containerCPUstatMetricTimeSeriesDataModel,
                dataModelOptions: {
                    name: 'cgroup.cpuacct.stat.user',
                },
                size: {
                    width: '25%',
                    height: '250px'
                },
                enableVerticalResize: false,
                group: 'ATT',
                settingsModalOptions: {
                    templateUrl: 'app/dashboard/custom-widget-settings-template.html',
                    controller: 'customWidgetSettingsCtrl'
                },
                onSettingsClose: onSettingsClose,
                filter:''
            },
            {
                name: 'att.memory.utilization',
                title: 'Memory Usage',
                directive: 'line-time-series',
                dataAttrName: 'data',
                dataModelType: containerMemoryBytesMetricTimeSeriesDataModel,
                dataModelOptions: {
                    name: 'cgroup.memory.usage'
                },
                size: {
                    width: '25%',
                    height: '250px'
                },
                enableVerticalResize: false,
                group: 'ATT',
                filter:''
            },
            {
                name: 'kernel.all.load',
                title: 'Load Average',
                directive: 'line-time-series',
                dataAttrName: 'data',
                dataModelType: MetricDataModel,
                dataModelOptions: {
                    name: 'kernel.all.load'
                },
                size: {
                    width: '25%',
                    height: '250px'
                },
                enableVerticalResize: false,
                group: 'CPU'
            }, {
                name: 'kernel.all.runnable',
                title: 'Runnable',
                directive: 'line-time-series',
                dataAttrName: 'data',
                dataModelType: MetricDataModel,
                dataModelOptions: {
                    name: 'kernel.all.runnable'
                },
                size: {
                    width: '25%',
                    height: '250px'
                },
                enableVerticalResize: false,
                group: 'CPU',
                attrs: {
                    forcey: 4,
                    integer: true
                }
            }, {
                name: 'kernel.all.cpu.sys',
                title: 'CPU Utilization (System)',
                directive: 'line-time-series',
                dataAttrName: 'data',
                dataModelType: CumulativeUtilizationMetricDataModel,
                dataModelOptions: {
                    name: 'kernel.all.cpu.sys'
                },
                size: {
                    width: '25%',
                    height: '250px'
                },
                enableVerticalResize: false,
                group: 'CPU',
                attrs: {
                    forcey: 1,
                    percentage: true,
                    integer: false
                }
            }, {
                name: 'kernel.all.cpu.user',
                title: 'CPU Utilization (User)',
                directive: 'line-time-series',
                dataAttrName: 'data',
                dataModelType: CumulativeUtilizationMetricDataModel,
                dataModelOptions: {
                    name: 'kernel.all.cpu.user'
                },
                size: {
                    width: '25%',
                    height: '250px'
                },
                enableVerticalResize: false,
                group: 'CPU',
                attrs: {
                    forcey: 1,
                    percentage: true,
                    integer: false
                }
            }, {
                name: 'kernel.all.cpu',
                title: 'CPU Utilization',
                directive: 'area-stacked-time-series',
                dataAttrName: 'data',
                dataModelType: CpuUtilizationMetricDataModel,
                dataModelOptions: {
                    name: 'kernel.all.cpu'
                },
                size: {
                    width: '25%',
                    height: '250px'
                },
                enableVerticalResize: false,
                group: 'CPU',
                attrs: {
                    forcey: 1,
                    percentage: true,
                    integer: false
                }
            }, {
                name: 'kernel.percpu.cpu.sys',
                title: 'Per-CPU Utilization (System)',
                directive: 'line-time-series',
                dataAttrName: 'data',
                dataModelType: CumulativeUtilizationMetricDataModel,
                dataModelOptions: {
                    name: 'kernel.percpu.cpu.sys'
                },
                size: {
                    width: '25%',
                    height: '250px'
                },
                enableVerticalResize: false,
                group: 'CPU',
                attrs: {
                    forcey: 1,
                    percentage: true,
                    integer: false
                }
            }, {
                name: 'kernel.percpu.cpu.user',
                title: 'Per-CPU Utilization (User)',
                directive: 'line-time-series',
                dataAttrName: 'data',
                dataModelType: CumulativeUtilizationMetricDataModel,
                dataModelOptions: {
                    name: 'kernel.percpu.cpu.user'
                },
                size: {
                    width: '25%',
                    height: '250px'
                },
                enableVerticalResize: false,
                group: 'CPU',
                attrs: {
                    forcey: 1,
                    percentage: true,
                    integer: false
                }
            }, {
                name: 'kernel.percpu.cpu',
                title: 'Per-CPU Utilization',
                directive: 'line-time-series',
                dataAttrName: 'data',
                dataModelType: PerCpuUtilizationMetricDataModel,
                dataModelOptions: {
                    name: 'kernel.percpu.cpu'
                },
                size: {
                    width: '25%',
                    height: '250px'
                },
                enableVerticalResize: false,
                group: 'CPU',
                attrs: {
                    forcey: 1,
                    percentage: true,
                    integer: false
                }
            }, {
                name: 'mem.freemem',
                title: 'Memory Utilization (Free)',
                directive: 'line-time-series',
                dataAttrName: 'data',
                dataModelType: MetricDataModel,
                dataModelOptions: {
                    name: 'mem.freemem'
                },
                size: {
                    width: '25%',
                    height: '250px'
                },
                enableVerticalResize: false,
                group: 'Memory'
            }, {
                name: 'mem.util.used',
                title: 'Memory Utilization (Used)',
                directive: 'line-time-series',
                dataAttrName: 'data',
                dataModelType: MetricDataModel,
                dataModelOptions: {
                    name: 'mem.util.used'
                },
                size: {
                    width: '25%',
                    height: '250px'
                },
                enableVerticalResize: false,
                group: 'Memory'
            }, {
                name: 'mem.util.cached',
                title: 'Memory Utilization (Cached)',
                directive: 'line-time-series',
                dataAttrName: 'data',
                dataModelType: MetricDataModel,
                dataModelOptions: {
                    name: 'mem.util.cached'
                },
                size: {
                    width: '25%',
                    height: '250px'
                },
                enableVerticalResize: false,
                group: 'Memory'
            }, {
                name: 'mem',
                title: 'Memory Utilization',
                directive: 'area-stacked-time-series',
                dataAttrName: 'data',
                dataModelType: MemoryUtilizationMetricDataModel,
                dataModelOptions: {
                    name: 'mem'
                },
                size: {
                    width: '25%',
                    height: '250px'
                },
                enableVerticalResize: false,
                group: 'Memory',
                attrs: {
                    percentage: false,
                    integer: true
                }
            }, {
                name: 'network.interface.out.drops',
                title: 'Network Drops (Out)',
                directive: 'line-time-series',
                dataAttrName: 'data',
                dataModelType: MetricDataModel,
                dataModelOptions: {
                    name: 'network.interface.out.drops'
                },
                size: {
                    width: '25%',
                    height: '250px'
                },
                enableVerticalResize: false,
                group: 'Network',
                attrs: {
                    forcey: 10,
                    percentage: false,
                    integer: true
                }
            }, {
                name: 'network.interface.in.drops',
                title: 'Network Drops (In)',
                directive: 'line-time-series',
                dataAttrName: 'data',
                dataModelType: MetricDataModel,
                dataModelOptions: {
                    name: 'network.interface.in.drops'
                },
                size: {
                    width: '25%',
                    height: '250px'
                },
                enableVerticalResize: false,
                group: 'Network',
                attrs: {
                    forcey: 10,
                    percentage: false,
                    integer: true
                }
            }, {
                name: 'network.interface.drops',
                title: 'Network Drops',
                directive: 'line-time-series',
                dataAttrName: 'data',
                dataModelType: MultipleMetricDataModel,
                dataModelOptions: {
                    name: 'network.interface.drops',
                    metricDefinitions: {
                        '{key} in': 'network.interface.in.drops',
                        '{key} out': 'network.interface.out.drops'
                    }
                },
                size: {
                    width: '25%',
                    height: '250px'
                },
                enableVerticalResize: false,
                group: 'Network',
                attrs: {
                    forcey: 10,
                    percentage: false,
                    integer: true
                }
            }, {
                name: 'network.tcpconn.established',
                title: 'TCP Connections (Estabilished)',
                directive: 'line-time-series',
                dataAttrName: 'data',
                dataModelType: MetricDataModel,
                dataModelOptions: {
                    name: 'network.tcpconn.established'
                },
                size: {
                    width: '25%',
                    height: '250px'
                },
                enableVerticalResize: false,
                group: 'Network',
                attrs: {
                    percentage: false,
                    integer: true
                }
            }, {
                name: 'network.tcpconn.time_wait',
                title: 'TCP Connections (Time Wait)',
                directive: 'line-time-series',
                dataAttrName: 'data',
                dataModelType: MetricDataModel,
                dataModelOptions: {
                    name: 'network.tcpconn.time_wait'
                },
                enableVerticalResize: false,
                size: {
                    width: '25%',
                    height: '250px'
                },
                group: 'Network',
                attrs: {
                    percentage: false,
                    integer: true
                }
            }, {
                name: 'network.tcpconn.close_wait',
                title: 'TCP Connections (Close Wait)',
                directive: 'line-time-series',
                dataAttrName: 'data',
                dataModelType: MetricDataModel,
                dataModelOptions: {
                    name: 'network.tcpconn.close_wait'
                },
                size: {
                    width: '25%',
                    height: '250px'
                },
                enableVerticalResize: false,
                group: 'Network',
                attrs: {
                    percentage: false,
                    integer: true
                }
            }, {
                name: 'network.tcpconn',
                title: 'TCP Connections',
                directive: 'line-time-series',
                dataAttrName: 'data',
                dataModelType: MultipleMetricDataModel,
                dataModelOptions: {
                    name: 'network.tcpconn',
                    metricDefinitions: {
                        'established': 'network.tcpconn.established',
                        'time_wait': 'network.tcpconn.time_wait',
                        'close_wait': 'network.tcpconn.close_wait'
                    }
                },
                size: {
                    width: '25%',
                    height: '250px'
                },
                enableVerticalResize: false,
                group: 'Network',
                attrs: {
                    percentage: false,
                    integer: true
                }
            }, {
                name: 'network.interface.bytes',
                title: 'Network Throughput (kB)',
                directive: 'line-time-series',
                dataAttrName: 'data',
                filter:'',
                dataModelType: NetworkBytesMetricDataModel,
                dataModelOptions: {
                    name: 'network.interface.bytes'
                },
                size: {
                    width: '25%',
                    height: '250px'
                },
                enableVerticalResize: false,
                group: 'Network',
                attrs: {
                    percentage: false,
                    integer: true
                },
                settingsModalOptions: {
                    templateUrl: 'app/dashboard/custom-widget-settings-template.html',
                    controller: 'customWidgetSettingsCtrl'
                },
                onSettingsClose: onSettingsClose
            }, {
                name: 'disk.iops',
                title: 'Disk IOPS',
                directive: 'line-time-series',
                dataAttrName: 'data',
                dataModelType: MultipleCumulativeMetricDataModel,
                dataModelOptions: {
                    name: 'disk.iops',
                    metricDefinitions: {
                        '{key} read': 'disk.dev.read',
                        '{key} write': 'disk.dev.write'
                    }
                },
                size: {
                    width: '25%',
                    height: '250px'
                },
                enableVerticalResize: false,
                group: 'Disk'
            }, {
                name: 'disk.bytes',
                title: 'Disk Throughput (Bytes)',
                directive: 'line-time-series',
                dataAttrName: 'data',
                dataModelType: MultipleCumulativeMetricDataModel,
                dataModelOptions: {
                    name: 'disk.bytes',
                    metricDefinitions: {
                        '{key} read': 'disk.dev.read_bytes',
                        '{key} write': 'disk.dev.write_bytes'
                    }
                },
                size: {
                    width: '25%',
                    height: '250px'
                },
                enableVerticalResize: false,
                group: 'Disk'
            }, {
                name: 'disk.dev.avactive',
                title: 'Disk Utilization',
                directive: 'line-time-series',
                dataAttrName: 'data',
                dataModelType: CumulativeUtilizationMetricDataModel,
                dataModelOptions: {
                    name: 'disk.dev.avactive'
                },
                size: {
                    width: '25%',
                    height: '250px'
                },
                enableVerticalResize: false,
                group: 'Disk',
                attrs: {
                    forcey: 1,
                    percentage: true,
                    integer: false
                }
            }, {
                name: 'kernel.all.pswitch',
                title: 'Context Switches',
                directive: 'line-time-series',
                dataAttrName: 'data',
                dataModelType: CumulativeMetricDataModel,
                dataModelOptions: {
                    name: 'kernel.all.pswitch'
                },
                size: {
                    width: '25%',
                    height: '250px'
                },
                enableVerticalResize: false,
                group: 'CPU',
                attrs: {
                    percentage: false,
                    integer: true
                }
            }, {
                name: 'mem.vmstat.pgfault',
                title: 'Page Faults',
                directive: 'area-stacked-time-series',
                dataAttrName: 'data',
                dataModelType: MultipleCumulativeMetricDataModel,
                dataModelOptions: {
                    name: 'mem.vmstat.pgfault',
                    metricDefinitions: {
                        'page faults': 'mem.vmstat.pgfault',
                        'major page faults': 'mem.vmstat.pgmajfault'
                    }
                },
                size: {
                    width: '25%',
                    height: '250px'
                },
                enableVerticalResize: false,
                group: 'Memory',
                attrs: {
                    percentage: false,
                    integer: true
                }
            }, {
                name: 'network.interface.packets',
                title: 'Network Packets',
                directive: 'line-time-series',
                dataAttrName: 'data',
                dataModelType: MultipleCumulativeMetricDataModel,
                dataModelOptions: {
                    name: 'network.interface.packets',
                    metricDefinitions: {
                        '{key} in': 'network.interface.in.packets',
                        '{key} out': 'network.interface.out.packets'
                    }
                },
                size: {
                    width: '25%',
                    height: '250px'
                },
                enableVerticalResize: false,
                group: 'Network',
                attrs: {
                    percentage: false,
                    integer: true
                }
            }, {
                name: 'network.tcp.retrans',
                title: 'Network Retransmits',
                directive: 'line-time-series',
                dataAttrName: 'data',
                dataModelType: MultipleCumulativeMetricDataModel,
                dataModelOptions: {
                    name: 'network.tcp.retrans',
                    metricDefinitions: {
                        'retranssegs': 'network.tcp.retranssegs',
                        'timeouts': 'network.tcp.timeouts',
                        'listendrops': 'network.tcp.listendrops',
                        'fastretrans': 'network.tcp.fastretrans',
                        'slowstartretrans': 'network.tcp.slowstartretrans',
                        'syncretrans': 'network.tcp.syncretrans'
                    }
                },
                size: {
                    width: '25%',
                    height: '250px'
                },
                enableVerticalResize: false,
                group: 'Network',
                attrs: {
                    forcey: 10,
                    percentage: false,
                    integer: true
                }
            }, {
                name: 'disk.dev.latency',
                title: 'Disk Latency',
                directive: 'line-time-series',
                dataAttrName: 'data',
                dataModelType: DiskLatencyMetricDataModel,
                dataModelOptions: {
                    name: 'disk.dev.latency'
                },
                size: {
                    width: '25%',
                    height: '250px'
                },
                enableVerticalResize: false,
                group: 'Disk',
                attrs: {
                    percentage: false,
                    integer: true
                }
            }
        ];

        if (vectorConfig.enableCpuFlameGraph) {
          definitions.push({
            name: 'graph.flame.cpu',
            title: 'CPU Flame Graph',
            directive: 'cpu-flame-graph',
            dataModelType: DummyMetricDataModel,
            size: {
              width: '25%',
              height: '250px'
            },
            enableVerticalResize: false,
            group: 'CPU'
          });
        }

        if (vectorConfig.enableDiskLatencyHeatMap) {
          definitions.push({
            name: 'graph.heatmap.disk',
            title: 'Disk Latency Heat Map',
            directive: 'disk-latency-heat-map',
            dataModelType: DummyMetricDataModel,
            size: {
              width: '25%',
              height: '250px'
            },
            enableVerticalResize: false,
            group: 'Disk'
          });
        }

        return definitions;
    }

    var defaultWidgets = [
        {
            name: 'att.cpu.utilization',
            size: {
                width: '50%'
            }
        }, {
            name: 'att.memory.utilization',
            size: {
                width: '50%'
            }
        }, {
            name: 'network.interface.bytes',
            size: {
                width: '100%'
            }
        }
    ];

   var emptyWidgets = [];

    angular
        .module('app.widgets', [])
        .factory('widgetDefinitions', widgetDefinitions)
        .value('defaultWidgets', defaultWidgets)
        .value('emptyWidgets', emptyWidgets);

})();
