export interface ChartOptions {
    title?: string;
    xAxisLabel?: string;
    yAxisLabel?: string;
    smooth?: boolean;
    type? : string;
    legend?: {
      show: boolean;
      position: 'top' | 'bottom';
    };
    grid?: {
      top: number;
      bottom: number;
      left: string;
      right: string;
    };
    color?: string[];
    otherOptions?: any;
  }
  
  export interface DataPoint {
    name: string;
    value: number;
  }
  
  export interface SeriesData {
    name: string;
    data: DataPoint[];
    type ?: string | undefined;
  }

  export interface LineBarSeriesData extends SeriesData {
    type: 'line' | 'bar';
  }