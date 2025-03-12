import { Component, OnInit } from '@angular/core';
import { LineChartComponent } from '../../shared/components/line-chart/line-chart.component';
import { BarChartComponent } from '../../shared/components/bar-chart/bar-chart.component';
import { DataService } from '../../core/services/data.service';
import { ChartOptions, SeriesData, LineBarSeriesData } from '../../core/interfaces/chart-options';
import { LineBarChartComponent } from '../../shared/components/linebar-chart/linebar-chart.component';
import { DonutChartComponent } from '../../shared/components/donut-chart/donut-chart.component';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  standalone: true,
  imports: [LineChartComponent, BarChartComponent, LineBarChartComponent, DonutChartComponent]  
})
export class DashboardComponent implements OnInit {
  lineChartOptions: ChartOptions = {};
  lineChartSeries: SeriesData[] = [];
  
  barChartOptions: ChartOptions = {};
  barChartSeries: SeriesData[] = [];

  lineBarChartOptions : ChartOptions = {};
  lineBarChartSeries : LineBarSeriesData[] = [];

  donutChartOptions : ChartOptions = {};
  donutChartSeries : SeriesData[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.lineChartOptions = {
      title: 'Monthly Performance',
      xAxisLabel: 'Months',
      yAxisLabel: 'Amount ($)',
      smooth: true,
      legend: {
        show: true,
        position: 'top'
      },
      color: ['#3398DB', '#36CBCB', '#F6A23C', '#7B68EE', '#FF6347']
    };

    this.barChartOptions = {
      title: 'Product Performance',
      xAxisLabel: 'Products',
      yAxisLabel: 'Sales',
      legend: {
        show: true,
        position: 'top'
      },
      color: ['#3398DB', '#36CBCB', '#F6A23C', '#7B68EE', '#FF6347']
    };

    this.lineBarChartOptions = {
      title: 'Sales & Trend Analysis',
      xAxisLabel: 'Month',
      yAxisLabel: 'Value',
      smooth: true,
      legend: {
        show: true,
        position: 'top'
      },
      color: ['#3398DB', '#F6A23C', '#36CBCB', '#7B68EE', '#FF6347']
    };

    this.donutChartOptions = {
      title: 'Revenue Distribution',
      legend: {
        show: true,
        position: 'bottom'
      },
      color: ['#3398DB', '#36CBCB', '#F6A23C', '#7B68EE', '#FF6347'],
      otherOptions: {
        centerText: {
          formatter: '{b}: {c}', 
          fontSize: 14,
          fontWeight: 'bold',
          color: '#666'
        }
      }
    };

    this.lineChartSeries = this.dataService.getMonthlyLineChartData();
    this.barChartSeries = this.dataService.getProductBarChartData();
    this.lineBarChartSeries = this.dataService.getBarLineData();
    this.donutChartSeries = this.dataService.getDonutChartData()
  }
}