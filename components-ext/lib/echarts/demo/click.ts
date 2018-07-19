import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'nz-demo-echarts-click',
  template: `
  <div echarts class="demo-chart"
  [options]="chartOption"
  (chartClick)="onChartClick($event)"
  (chartDblClick)="onChartDblClick($event)">
</div>
  `,
  styleUrls: ['./index.css']
})
export class NzDemoEchartsClickComponent implements OnInit {

  chartOption = {
    title: {
      text: '某地区蒸发量和降水量',
      subtext: '纯属虚构'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['蒸发量', '降水量']
    },
    toolbox: {
      show: true,
      feature: {
        dataView: { show: true, readOnly: false },
        magicType: { show: true, type: ['line', 'bar'] },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    calculable: true,
    xAxis: [
      {
        type: 'category',
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: '蒸发量',
        type: 'bar',
        data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
        markPoint: {
          data: [
            { type: 'max', name: '最大值' },
            { type: 'min', name: '最小值' }
          ]
        },
        markLine: {
          data: [
            { type: 'average', name: '平均值' }
          ]
        }
      },
      {
        name: '降水量',
        type: 'bar',
        data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
        markPoint: {
          data: [
            { name: '年最高', value: 182.2, xAxis: 7, yAxis: 183 },
            { name: '年最低', value: 2.3, xAxis: 11, yAxis: 3 }
          ]
        },
        markLine: {
          data: [
            { type: 'average', name: '平均值' }
          ]
        }
      }
    ]
  };

  constructor() { }

  ngOnInit() {
  }

  /**
    * 图表单击事件
    * @param params
    */
  onChartClick(params) {
    ////console.log('click event: ', params);
    alert('你点击了' + params.seriesName)
  }
  /**
   * 图表双击事件
   * @param params
   */
  onChartDblClick(params) {
    ////console.log('dblclick event: ', params);
    alert('你双击了' + params.seriesName)
  }
}