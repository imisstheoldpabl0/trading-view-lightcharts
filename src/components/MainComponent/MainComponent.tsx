import * as React from "react";
import { createChart, IChartApi } from 'lightweight-charts';
import nvidiaSampleData from '../../data/nvidiaSampleData';

type MainComponentProps = {
  data?: {
    time: string;
    open: number;
    high: number;
    low: number;
    close: number;
  }[];
};

const MainComponent: React.FC<MainComponentProps> = ({ data = [] }) => {
  const chartContainerRef = React.useRef<HTMLDivElement>(null);
  const chartRef = React.useRef<IChartApi | null>(null);

  React.useEffect(() => {
    if (chartContainerRef.current) {
      // Create chart
      const chart = createChart(chartContainerRef.current, {
        width: 600,
        height: 400,
        layout: {
          background: { color: '#ffffff' },
          textColor: '#333',
        },
        grid: {
          vertLines: { color: '#f0f0f0' },
          horzLines: { color: '#f0f0f0' },
        },
      });

      // Create candlestick series
      const candlestickSeries = chart.addCandlestickSeries({
        upColor: '#26a69a',
        downColor: '#ef5350',
        borderVisible: false,
        wickUpColor: '#26a69a',
        wickDownColor: '#ef5350',
      });

      // Set the data
      candlestickSeries.setData(data);

      // Store chart instance for cleanup
      chartRef.current = chart;

      // Resize handler
      const handleResize = () => {
        if (chartContainerRef.current) {
          chart.applyOptions({
            width: chartContainerRef.current.clientWidth,
          });
        }
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        chart.remove();
      };
    }
  }, [data]);

  return (
    <div ref={chartContainerRef} />
  );
};

export default MainComponent;
