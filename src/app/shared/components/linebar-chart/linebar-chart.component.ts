import { Component, Input, OnChanges, SimpleChanges, ElementRef } from '@angular/core';
import { NgxEchartsDirective } from 'ngx-echarts';
import { EChartsOption } from 'echarts';
import { ChartOptions, SeriesData } from '../../../core/interfaces/chart-options';
import { CommonModule } from '@angular/common';


export interface LineBarSeriesData extends SeriesData {
  type: 'line' | 'bar';
}

@Component({
  selector: 'app-linebar-chart',
  templateUrl: './linebar-chart.component.html',
  styleUrl: './linebar-chart.component.scss',
  standalone: true,
  imports: [NgxEchartsDirective]
})
export class LineBarChartComponent implements OnChanges {
  @Input() options!: ChartOptions;
  @Input() series: LineBarSeriesData[] = [];
  @Input() width: string = '100%';
  @Input() height: string = '400px';

  chartOptions: EChartsOption = {};
  
  constructor(private el: ElementRef) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['options'] || changes['series']) {
      this.updateChartOptions();
    }
  }

  private updateChartOptions() {
    const {
      title = 'Line Bar Chart',
      xAxisLabel = 'Category',
      yAxisLabel = 'Value',
      smooth = true,
      legend = { show: true, position: 'top' },
      grid = { 
        top: 60, 
        bottom: 40, 
        left: '8%', 
        right: '5%' 
      },
      color
    } = this.options;

    const container = this.el.nativeElement.querySelector('.chart-container');
    if (container) {
      container.style.width = this.width;
      container.style.height = this.height;
    }

    const categories = [...new Set(this.series.flatMap(s => s.data.map(d => d.name)))];

    this.chartOptions = {
      title: {
        text: title,
        left: 'center',
        textStyle: {
          fontSize: 18,
          fontWeight: 'bold',
          color: '#666'
        },
        padding: [0, 0, 20, 0]
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        },
        formatter: function(params: any) {
          let result = `<div style="font-weight:bold;margin-bottom:5px;">${params[0].name}</div>`;
          params.forEach((param: any) => {
            result += `<div style="display:flex;justify-content:space-between;align-items:center;margin:3px 0;">
              <span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${param.color};"></span>
              <span>${param.seriesName} (${param.seriesType}): </span>
              <span style="font-weight:bold;margin-left:5px;">${param.value}</span>
            </div>`;
          });
          return result;
        }
      },
      legend: {
        show: legend.show,
        top: legend.position === 'top' ? 20 : 'bottom',
        data: this.series.map(s => s.name),
        textStyle: {
          color: '#666'
        },
        itemGap: 20
      },
      grid: {
        top: grid.top,
        bottom: grid.bottom,
        left: grid.left,
        right: grid.right,
        containLabel: true
      },
      xAxis: {
        type: 'category',
        name: xAxisLabel,
        nameLocation: 'middle',
        nameGap: 30,
        data: categories,
        nameTextStyle: {
          color: '#000',
          fontWeight: 'bold',
          fontSize: 14
        },
        axisLine: {
          lineStyle: {
            color: '#ccc',
            width: 2
          }
        },
        axisTick: {
          alignWithLabel: true,
          length: 5
        },
        axisLabel: {
          interval: 0,
          fontSize: 12,
          margin: 15
        }
      },
      yAxis: {
        type: 'value',
        name: yAxisLabel,
        nameLocation: 'middle',
        nameGap: 50,
        nameTextStyle: {
          color: '#000',
          fontWeight: 'bold',
          fontSize: 14,
          padding: [0, 0, 10, 0]
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: '#ccc',
            width: 2
          }
        },
        axisTick: {
          show: true
        },
        splitLine: {
          lineStyle: {
            type: 'dashed',
            color: '#ccc'
          }
        }
      },
      series: this.series.map(s => {
        if (s.type === 'line') {
          return {
            name: s.name,
            type: 'line',
            smooth: smooth,
            symbolSize: 6,
            itemStyle: {
              shadowColor: 'rgba(0, 0, 0, 0.3)',
              shadowBlur: 2
            },
            lineStyle: {
              width: 3
            },
            emphasis: {
              lineStyle: {
                width: 4,
                shadowBlur: 5,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              },
              itemStyle: {
                borderWidth: 2,
                shadowBlur: 5,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            data: s.data.map(d => d.value)
          };
        } else {
          return {
            name: s.name,
            type: 'bar',
            barWidth: '20%',
            barGap: '10%',
            itemStyle: {
              borderRadius: [4, 4, 0, 0],
              shadowColor: 'rgba(0, 0, 0, 0.1)',
              shadowBlur: 4,
              shadowOffsetY: 2
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetY: 5,
                shadowColor: 'rgba(0, 0, 0, 0.3)'
              }
            },
            data: s.data.map(d => d.value)
          };
        }
      }),
      color: color,
      backgroundColor: 'rgba(255, 255, 255, 0.9)'
    };
  }
}