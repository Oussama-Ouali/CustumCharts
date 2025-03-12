import { Component, Input, OnChanges, SimpleChanges, ElementRef } from '@angular/core';
import { NgxEchartsDirective } from 'ngx-echarts';
import { EChartsOption } from 'echarts';
import { ChartOptions, SeriesData } from '../../../core/interfaces/chart-options';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-donut-chart',
  standalone: true,
  templateUrl: './donut-chart.component.html',
  styleUrl: './donut-chart.component.scss',
  imports: [CommonModule, NgxEchartsDirective]
})
export class DonutChartComponent implements OnChanges {
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
      title = 'Donut Chart',
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


    const seriesData = this.series.length > 0 ? 
      this.series[0].data.map(item => ({
        name: item.name,
        value: item.value
      })) : [];

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
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      legend: {
        show: legend.show,
        top: legend.position === 'top' ? 20 : 'bottom',
        orient: 'horizontal',
        data: seriesData.map(item => item.name),
        textStyle: {
          color: '#666'
        },
        itemGap: 10,
        icon: 'circle'
      },
      series: [{
        name: this.series.length > 0 ? this.series[0].name : 'Data',
        type: 'pie',
        radius: ['50%', '70%'], 
        center: ['50%', '50%'],
        avoidLabelOverlap: true,
        itemStyle: {
          borderRadius: 4,
          borderColor: '#fff',
          borderWidth: 2,
          shadowBlur: 10,
          shadowColor: 'rgba(0, 0, 0, 0.2)'
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '14',
            fontWeight: 'bold'
          },
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        },
        labelLine: {
          show: false
        },
        data: seriesData
      }],
      color: color,
      backgroundColor: 'rgba(255, 255, 255, 0.9)'
    };

    if (this.options.otherOptions?.centerText) {
      const centerText = this.options.otherOptions.centerText;
      
      (this.chartOptions.series as any)[0].label = {
        show: true,
        position: 'center',
        formatter: centerText.formatter || '{c}',
        fontSize: centerText.fontSize || 16,
        fontWeight: centerText.fontWeight || 'bold',
        color: centerText.color || '#666'
      };
    }
  }
}