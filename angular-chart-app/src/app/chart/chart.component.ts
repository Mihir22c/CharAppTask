// src/app/chart/chart.component.ts
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import * as echarts from 'echarts';

interface LetterFrequency {
  Letter: string;
  Freq: number;
}

interface StackBarData {
  categories: string[];
  series: { name: string; data: number[] }[];
}

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnInit {
  data: any; // Data fetched from the API

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.dataService.getData().subscribe((response) => {
      this.data = response;
      this.renderCharts();
    });
  }

  // renderCharts(): void {
  //   // Render Pie Chart
  //   const pieChart = echarts.init(document.getElementById('pieChart'));
  //   if (Array.isArray(this.data.pieData)) {
  //     const pieOption = {
  //       title: {
  //         text: 'Pie Chart',
  //       },
  //       series: [
  //         {
  //           name: 'Data',
  //           type: 'pie',
  //           radius: '50%',
  //           data: this.data.pieData,
  //         },
  //       ],
  //     };
  //     pieChart.setOption(pieOption);
  //   } else {
  //     console.error('Invalid data structure for Pie Chart:', this.data.pieData);
  //   }

  //   // Render Column Chart
  //   const columnChart = echarts.init(document.getElementById('columnChart'));
  //   const columnOption = {
  //     title: {
  //       text: 'Column Chart',
  //     },
  //     xAxis: {
  //       type: 'category',
  //       data: this.data.columnData.labels,
  //     },
  //     yAxis: {
  //       type: 'value',
  //     },
  //     series: [
  //       {
  //         name: 'Data',
  //         type: 'bar',
  //         data: this.data.columnData.values,
  //       },
  //     ],
  //   };
  //   columnChart.setOption(columnOption);

  //   // Render Line Chart
  //   const lineChart = echarts.init(document.getElementById('lineChart'));
  //   const lineOption = {
  //     title: {
  //       text: 'Line Chart',
  //     },
  //     xAxis: {
  //       type: 'category',
  //       data: this.data.lineData.labels,
  //     },
  //     yAxis: {
  //       type: 'value',
  //     },
  //     series: [
  //       {
  //         name: 'Data',
  //         type: 'line',
  //         data: this.data.lineData.values,
  //       },
  //     ],
  //   };
  //   lineChart.setOption(lineOption);

  //   // Render Stack Bar Chart
  //   const stackBarChart = echarts.init(document.getElementById('stackBarChart'));
  //   const stackBarOption = {
  //     title: {
  //       text: 'Stack Bar Chart',
  //     },
  //     xAxis: {
  //       type: 'category',
  //       data: this.data.stackBarData.categories,
  //     },
  //     yAxis: {
  //       type: 'value',
  //     },
  //     series: this.data.stackBarData.series.map((series: StackBarSeries) => ({
  //       name: series.name,
  //       type: 'bar',
  //       stack: 'stack',
  //       data: series.data,
  //     })),
  //   };
  //   stackBarChart.setOption(stackBarOption);
  // }

  renderCharts(): void {
    // Render Pie Chart
    const pieChart = echarts.init(document.getElementById('pieChart'));
    this.renderPieChart(pieChart);

    // Render Column Chart
    const columnChart = echarts.init(document.getElementById('columnChart'));
    this.renderColumnChart(columnChart);

    // Render Line Chart
    const lineChart = echarts.init(document.getElementById('lineChart'));
    this.renderLineChart(lineChart);

    // Render Stack Bar Chart
    const stackBarChart = echarts.init(document.getElementById('stackBarChart'));
    this.renderStackBarChart(stackBarChart);
  }
  private renderPieChart(chart: any): void {
    if (Array.isArray(this.data)) {
      const pieOption = {
        title: {
          text: 'Letter Frequency Pie Chart',
        },
        series: [
          {
            name: 'Frequency',
            type: 'pie',
            radius: '50%',
            data: this.data.map((item) => ({ value: item.Freq, name: item.Letter })),
          },
        ],
      };
      chart.setOption(pieOption);
    } else {
      console.error('Invalid data structure for Pie Chart:', this.data);
    }
  }

  private renderColumnChart(chart: any): void {
    if (Array.isArray(this.data)) {
      const columnOption = {
        title: {
          text: 'Letter Frequency Column Chart',
        },
        xAxis: {
          type: 'category',
          data: this.data.map((item) => item.Letter),
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            name: 'Frequency',
            type: 'bar',
            data: this.data.map((item) => item.Freq),
          },
        ],
      };
      chart.setOption(columnOption);
    } else {
      console.error('Invalid data structure for Column Chart:', this.data);
    }
  }

  private renderLineChart(chart: any): void {
    if (Array.isArray(this.data)) {
      const lineOption = {
        title: {
          text: 'Letter Frequency Line Chart',
        },
        xAxis: {
          type: 'category',
          data: this.data.map((item) => item.Letter),
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            name: 'Frequency',
            type: 'line',
            data: this.data.map((item) => item.Freq),
          },
        ],
      };
      chart.setOption(lineOption);
    } else {
      console.error('Invalid data structure for Line Chart:', this.data);
    }
  }

  private renderStackBarChart(chart: any): void {
    if (Array.isArray(this.data)) {
      // Example: Assuming you have a specific structure for Stack Bar data
      const stackBarOption = {
        title: {
          text: 'Stack Bar Chart',
        },
        xAxis: {
          type: 'category',
          data: this.data.map((item) => item.Letter),
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            name: 'Frequency',
            type: 'bar',
            stack: 'stack',
            data: this.data.map((item) => item.Freq),
          },
        ],
      };

      chart.setOption(stackBarOption);
    } else {
      console.error('Invalid data structure for Stack Bar Chart:', this.data);
    }
  }
}
