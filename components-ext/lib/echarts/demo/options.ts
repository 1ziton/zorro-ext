import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'nz-demo-echarts-options',
  template: `
  <button nz-button [nzType]="'primary'" [nzType]="'primary'" (click)="changeOptions()" [disabled]="revert">Change Options
  </button>
  <button nz-button [nzType]="'primary'" [nzType]="'primary'" (click)="revertOptions()" [disabled]="!revert">Revert Options
  </button>
  <div echarts [options]="chartOption" [dataset]="dataset" class="demo-chart"></div>
  `,
  styleUrls: ['./index.css']
})
export class NzDemoEchartsOptionsComponent implements OnInit {
  revert = false;
  defaultOptions = {
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
        barWidth: '60%',
        markPoint:{}
      }
    ]
  }
  barChartDataset1 = [
    [10, 52, 200, 334, 390, 330, 220]
  ];

  barChartDataset2 = [
    [200, 32, 444, 666, 88, 352, 380]
  ];

  dataset = [
    [10, 52, 200, 334, 390, 330, 220]
  ];

  chartOption = Object.assign(this.defaultOptions);


  constructor() { }

  ngOnInit() {
  }


  changeOptions() {
    this.chartOption = Object.assign(this.defaultOptions);
    this.chartOption['legend'] = { show: true };
    this.chartOption['legend'].data = [{ name: '直接访问', icon: 'circle' }];
    this.chartOption.series[0]['type']='line';
    this.revert = true;
  }

  revertOptions() {
    this.chartOption = Object.assign(this.defaultOptions);
    this.chartOption.series[0]['type']='bar';
    this.revert = false;
  }

  chageDataset() {
    this.dataset = (this.dataset === this.barChartDataset2) ? this.barChartDataset1 : this.barChartDataset2;
  }

}