export interface ChartOptions {
    title?: string;
    xAxisLabel?: string;
    yAxisLabel?: string;
    smooth?: boolean;
    legend?: {
      show: boolean;
      position: 'top' | 'bottom';
      data?: DataPoint[];
    };
    grid?: {
      top: number;
      bottom: number;
      left: string;
      right: string;
    };
  }
  
  export interface DataPoint {
    name: string;
    value: number;
  }
  
  export interface SeriesData {
    name: string;
    data: DataPoint[];
  }