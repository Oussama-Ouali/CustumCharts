import { Component, OnInit } from '@angular/core';
import { LineChartComponent } from '../../shared/components/line-chart/line-chart.component';
import { BarChartComponent } from '../../shared/components/bar-chart/bar-chart.component';
import { DataService } from '../../core/services/data.service';
import { ChartOptions, SeriesData } from '../../core/interfaces/chart-options';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  standalone: true,
  imports: [LineChartComponent, BarChartComponent]  
})
export class DashboardComponent implements OnInit {
  lineChartOptions: ChartOptions = {};
  lineChartSeries: SeriesData[] = [];
  
  barChartOptions: ChartOptions = {};
  barChartSeries: SeriesData[] = [];

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
      }
    };

    this.barChartOptions = {
      title: 'Product Performance',
      xAxisLabel: 'Products',
      yAxisLabel: 'Sales',
      legend: {
        show: true,
        position: 'top'
      }
    };

    this.lineChartSeries = this.dataService.getMonthlyLineChartData();
    this.barChartSeries = this.dataService.getProductBarChartData();
  }
}