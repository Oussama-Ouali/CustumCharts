import { Component, Input, OnChanges, SimpleChanges, ElementRef } from '@angular/core';
import { NgxEchartsDirective } from 'ngx-echarts';
import { EChartsOption } from 'echarts';
import { ChartOptions, SeriesData } from '../../../core/interfaces/chart-options';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.scss',
  standalone: true,
  imports: [CommonModule, NgxEchartsDirective]
})
export class BarChartComponent implements OnChanges {
  @Input() options!: ChartOptions;
  @Input() series: SeriesData[] = [];
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
      title = 'Bar Chart',
      xAxisLabel = 'X Axis',
      yAxisLabel = 'Y Axis',
      legend = { show: true, position: 'top' },
      grid = { 
        top: 60, 
        bottom: 40, 
        left: '10%', 
        right: '10%' 
      }
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
          fontSize: 14,
          fontWeight: 'bold',
          color: '#333'
        }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        show: legend.show,
        top: legend.position === 'top' ? 'top' : 'bottom',
        data: this.series.map(s => s.name),
        textStyle: {
          color: '#666'
        }
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
        data: categories,
        nameTextStyle: {
          color: '#666'
        },
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        }
      },
      yAxis: {
        type: 'value',
        name: yAxisLabel,
        nameTextStyle: {
          color: '#666'
        },
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        }
      },
      series: this.series.map(s => ({
        name: s.name,
        type: 'bar',
        barWidth: '60%',
        itemStyle: {
          borderRadius: [4, 4, 0, 0]
        },
        data: s.data.map(d => d.value)
      })),
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      color: ['#3398DB', '#36CBCB', '#F6A23C', '#7B68EE', '#FF6347']
    };
  }
}