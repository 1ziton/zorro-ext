import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'nz-demo-echarts-bar',
  template: `
  <button nz-button type="button" (click)="chageDataset()">Change dateset</button>
  <div echarts [options]="chartOption" [dataset]="dataset" class="demo-chart"></div>
  `,
  styleUrls: ['./index.css']
})
export class NzDemoEchartsBarComponent implements OnInit {

  barChartDataset1 = [
    [10, 52, 200, 334, 390, 330, 220]
  ];

  barChartDataset2 = [
    [200, 32, 444, 666, 88, 352, 380]
  ];

  dataset = [
    [10, 52, 200, 334, 390, 330, 220]
  ];

  chartOption = {
    color: ['#3398DB'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {            /* 坐标轴指示器，坐标轴触发有效*/
        type: 'shadow'          /* 默认为直线，可选为：'line' | 'shadow'*/
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        axisTick: {
          alignWithLabel: true
        }
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: '直接访问',
        type: 'bar',
        barWidth: '60%'
      }
    ]
  };


  constructor() { }

  ngOnInit() {
  }

  chageDataset() {
    this.dataset = (this.dataset === this.barChartDataset2) ? this.barChartDataset1 : this.barChartDataset2;
  }

}