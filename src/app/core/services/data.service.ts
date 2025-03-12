import { Injectable } from '@angular/core';
import { DataPoint, SeriesData, LineBarSeriesData } from '../interfaces/chart-options';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  getMonthlyLineChartData(): SeriesData[] {
    return [
      {
        name: 'Revenue',
        data: [
          { name: 'Jan', value: 120 },
          { name: 'Feb', value: 200 },
          { name: 'Mar', value: 150 },
          { name: 'Apr', value: 80 },
          { name: 'May', value: 70 },
          { name: 'Jun', value: 110 }
        ]
      },
      {
        name: 'Profit',
        data: [
          { name: 'Jan', value: 45 },
          { name: 'Feb', value: 82 },
          { name: 'Mar', value: 67 },
          { name: 'Apr', value: 34 },
          { name: 'May', value: 28 },
          { name: 'Jun', value: 48 }
        ]
      },
      {
        name: 'cost',
        data: [
          { name: 'Jan', value: 35 },
          { name: 'Feb', value: 32 },
          { name: 'Mar', value: 57 },
          { name: 'Apr', value: 84 },
          { name: 'May', value: 28 },
          { name: 'Jun', value: 68 }
        ]
      }
    ];
  }

  getProductBarChartData(): SeriesData[] {
    return [
      {
        name: '2023',
        data: [
          { name: 'Product A', value: 45 },
          { name: 'Product B', value: 92 },
          { name: 'Product C', value: 55 },
          { name: 'Product D', value: 107 }
        ]
      },
      {
        name: '2024',
        data: [
          { name: 'Product A', value: 65 },
          { name: 'Product B', value: 112 },
          { name: 'Product C', value: 78 },
          { name: 'Product D', value: 129 }
        ]
      },
      {
        name: 'cost',
        data: [
          { name: 'Jan', value: 35 },
          { name: 'Feb', value: 32 },
          { name: 'Mar', value: 57 },
          { name: 'Apr', value: 84 },
          { name: 'May', value: 28 },
          { name: 'Jun', value: 68 }
        ]
      }
    ];
  }


  getBarLineData(): LineBarSeriesData[] {
    return [
      {
        name: 'Sales',
        type: 'bar',
        data: [
          { name: 'Jan', value: 320 },
          { name: 'Feb', value: 332 },
          { name: 'Mar', value: 301 },
          { name: 'Apr', value: 334 },
          { name: 'May', value: 390 }
        ]
      },
      {
        name: 'money',
        type: 'bar',
        data: [
          { name: 'Jan', value: 200 },
          { name: 'Feb', value: 102 },
          { name: 'Mar', value: 10 },
          { name: 'Apr', value: 80 },
          { name: 'May', value: 390 }
        ]
      },
      {
        name: 'Trend',
        type: 'line',
        data: [
          { name: 'Jan', value: 320 },
          { name: 'Feb', value: 332 },
          { name: 'Mar', value: 301 },
          { name: 'Apr', value: 334 },
          { name: 'May', value: 390 }
        ]
      },
      {
        name: 'incomes',
        type: 'line',
        data: [
          { name: 'Jan', value: 200 },
          { name: 'Feb', value: 102 },
          { name: 'Mar', value: 10 },
          { name: 'Apr', value: 80 },
          { name: 'May', value: 390 }
        ]
      }
    ];
  }

  getDonutChartData() : SeriesData[] {
    return [
      {
        name: 'Revenue Sources',
        data: [
          { name: 'Product A', value: 335 },
          { name: 'Product B', value: 310 },
          { name: 'Product C', value: 234 },
          { name: 'Product D', value: 135 },
          { name: 'Product E', value: 154 }
        ]
      }
    ]
  }
}