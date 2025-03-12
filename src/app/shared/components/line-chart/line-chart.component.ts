import { Component, Input, OnChanges, SimpleChanges, ElementRef } from '@angular/core';
import { NgxEchartsDirective } from 'ngx-echarts';
import { EChartsOption } from 'echarts';
import { ChartOptions, SeriesData } from '../../../core/interfaces/chart-options';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.scss',
  standalone: true,
  imports: [NgxEchartsDirective]
})
export class LineChartComponent implements OnChanges {
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
      title = 'Line Chart',
      xAxisLabel = 'X Axis',
      yAxisLabel = 'Y Axis',
      smooth = true,
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
        },
        padding: [0, 0, 20, 0]
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'line'
        }
      },
      legend: {
        show: legend.show,
        top: legend.position === 'top' ? 20 : 'bottom',
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
        type: 'line',
        smooth: smooth,
        lineStyle: {
          width: 3
        },
        data: s.data.map(d => d.value)
      })),
      backgroundColor: 'rgba(255, 255, 255, 0.9)'
    };
  }
}