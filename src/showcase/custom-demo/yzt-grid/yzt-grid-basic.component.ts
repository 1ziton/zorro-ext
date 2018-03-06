import { Component, OnInit, HostListener } from '@angular/core';
import { GridUtilService } from '../../../custom-components/lib/yzt-grid/share/grid-util.service';
import { Subject } from 'rxjs';

class OptField {
  id: string = '';
  name: string = '';
  fullName: string = '';
  code: string = '';
}

@Component({
  selector: 'yzt-grid-basic',
  template: `
    <yzt-grid #grid_basic [data]="data" [columns]="columns" [(selection)]="selection" mulitipy="true" (load)="load($event)" (exportCSV)="exportCSV($event)" (headSearch)="getOpt($event)" [searchTmpl]="[search_id, search_name,search_fullName, search_code]">
      <grid-icon #grid_icon [ui_grid]="grid_basic" [outField]="'name'" [outProp]="'lock'">
        <ng-template #iconTemplate let-name="lock">
          <a *ngIf="name" href="javascript:void(0);" title="锁定" class="operation-a operation-lock"><i></i></a>
          <a *ngIf="!name" href="javascript:void(0);" title="未锁定" class="operation-a operation-unlock"><i></i></a>
        </ng-template>
      </grid-icon>
      
      <ng-template #search_id>
        <nz-select [(ngModel)]="searchField.id" (nzOpenChange)="optSelect($event)">
          <nz-option *ngFor="let i of [1,2]" [nzLabel]="i" [nzValue]="i"></nz-option>
        </nz-select>
      </ng-template>
      <ng-template #search_name>
        <nz-select [(ngModel)]="searchField.name" (nzOpenChange)="optSelect($event)">
          <nz-option *ngFor="let i of [3,4,'ooo']" [nzLabel]="i" [nzValue]="i"></nz-option>
        </nz-select>
      </ng-template>
      <ng-template #search_fullName>
        <nz-input [(ngModel)]="searchField.fullName"></nz-input>
      </ng-template>
      <ng-template #search_code>
        <yzt-shipper [(ngModel)]="searchField.code" (nzOpenChange)="optSelect($event)"></yzt-shipper>
      </ng-template>
    </yzt-grid>
    <button class="operate" nz-button (click)="getSel()">获取选中数据</button>
    <nz-modal [nzVisible]="isVisible" [nzTitle]="'测试数据'" [nzContent]="modalContent" (nzOnCancel)="handleCancel()">
      <ng-template #modalContent>
        <p>{{selection}}</p>
      </ng-template>
    </nz-modal>
  `,
  styles: [`
    .operate {
      margin-top: 10px;
    }
    a.operation-a {
      display: inline-block;
      height: 38px;
      line-height: 38px;
      text-align: left;
      color: #728597;
    }
    a.operation-a>i {
      width: 15px;
      height: 15px;
      display: inline-block;
      margin-right: 5px;
      vertical-align: middle;
    }
    a.operation-unlock>i {
      background: url(./assets/custom-img/operation.png) no-repeat -1px -120px;
      background-size: 122px;
    }
    a.operation-lock>i {
      background: url(./assets/custom-img/operation.png) no-repeat 0px -49px;
      background-size: 122px;
    }
  `]
})
export class UIGridBasicComponent implements OnInit {
  isVisible = false;
  data = {};
  columns = [];
  columnsHeader: any[] = [
    "ID-id-120px-search_select-true",
    "简称-name-120px",
    "全称-fullName-200px",
    "代码-code-150px",
    "缩略图-picture-80px---true"
  ];
  selection = [];

  searchField = new OptField();

  oldValue = {};
  private searchStream = new Subject<any>();

  constructor(private util: GridUtilService) {


    this.searchStream.debounceTime(250)
      .subscribe(_ => {
        console.log(this.searchField);
      })
  }

  ngOnInit() {
    for (let i = 0; i < this.columnsHeader.length; i++) {
      let arr = this.columnsHeader[i].split('-');
      this.columns[i] = {};
      Object.assign(this.columns[i],
        {
          header: arr[0],
          field: arr[1],
          width: arr[2],
          search: arr[3],
          link: arr[4],
          thumbnail: arr[5]
        });
    }
  }

  load(page) {
    fetch('./assets/simulate-data/data.json', { method: 'get' }).then(result => result.json())
      .then(data => {
        this.data = data;
      })
  }

  getSel() {
    let tempArr = [];
    this.isVisible = true;
    this.selection.map(v => {
      tempArr.push(JSON.stringify(v));
    })
    this.selection = tempArr;
  }

  handleCancel() {
    this.isVisible = false;;
  }

  exportCSV(e) {
    console.log(e)
  }

  getOpt(e) {
    console.log(e);
  }


  @HostListener('keydown', ['$event'])
  keydown(event) {
    var e = event || window.event;
    if (e && e.keyCode == 13) {
      this.searchStream.next()
    }
  }

  optSelect(e) {
    if (e) {
      this.oldValue = this.util.cloneDeep(this.searchField);
    }
    if (!e && !this.util.isEqual(this.searchField, this.oldValue)) {
      console.log(this.searchField);
    }
  }
}


