import {
    Component,
    OnInit,
    Input,
    NgModule,
    Output,
    EventEmitter,
    TemplateRef,
    Type,
    ComponentFactory,
    ViewChild,
    ViewContainerRef,
    ComponentRef,
    ContentChild
} from '@angular/core';
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { NgZorroAntdModule } from '../../../../index.showcase';
import { GridUtilService } from './share/grid-util.service';
import { API } from '../services/api';
import { DirectivesModule } from '../share/directives/yzt-directives.modules';
import { YZTViewerDirectiveModule } from '../yzt-viewer/yzt-viewer.directive';
import { Subject } from 'rxjs/Subject';

interface PageData {
    content: Array<any>;
    numberOfElements: number;
    [portName: string]: any;
}

class GridIconIF {
    field: '';
    prop: '';
    iconTemplate: TemplateRef<any>
}

export interface PageIndexAndSize {
    first: number,
    rows: number
}

@Component({
    selector: `yzt-grid`,
    templateUrl: `yzt-grid.component.html`,
    styleUrls: [`yzt-grid.component.scss`]
})
export class UIGridComponent {
    @ViewChild('gridImg', { read: ViewContainerRef }) gridImg: ViewContainerRef;

    _data: PageData;
    _dataSet = [];
    _selections: any;
    _loading = false;
    _pagination = true;
    _fixScrollY = 0;
    _title = '';
    _titleTpl: TemplateRef<any>;
    _exportLoading = false;
    _editCol = false;
    //用于存放可选列
    targetColumns: any[] = [];
    //备份完整columns
    editColumns: any[] = [];
    //grid表格按钮控制
    buttonGather = {
        showEditColumn: true,
        enableExport: true,
    }
    /**
     * 控制页码
     */
    _first = 1;
    _rows = 10;
    /**
     * 控制多选
     */
    _allChecked = false;
    _indeterminate = false;
    _displayData = [];
    // 自定义图片实例
    _iconComp = {};
    // 表头搜索
    _searchCustom: { [k: string]: TemplateRef<any> } = {};
    _hasSearch: number;

    set editCol(show: boolean) {
        if (show) {
            this.editColumns = [...this.columns, ...this.targetColumns];
        }
        this._editCol = show;
    }

    @Output() load: EventEmitter<PageIndexAndSize> = new EventEmitter();
    @Output() selectionChange: EventEmitter<any> = new EventEmitter();
    @Output() cellClick: EventEmitter<any> = new EventEmitter();
    @Output() cellOver: EventEmitter<any> = new EventEmitter();
    @Output() exportCSV: EventEmitter<any> = new EventEmitter();

    @Input() id: string;
    @Input() columns = [];
    @Input() showSizeChanger = false; // 未知用途
    @Input() pageSizeValues = [10, 30, 50, 100];
    @Input() showTitle = true;
    @Input() mulitipy = false;

    @Input()
    set data(value: PageData) {
        this._loading = false;
        if (!value) return;
        // 手动调用查询，解决分页问题
        // if (value.size) {
        //     this.pageRow = value.size;
        //     this.dt.first = value.number * value.size;
        // }
        let content = value['content'] || [];
        //优化表格重复赋值性能
        for (let row of content) {
            for (let c of [].concat(this.columns).concat(this.targetColumns)) {
                if (c.field && row[c.field] === undefined) {
                    Object.defineProperty(row, c.field, { value: "" });
                }
            }
        }
        this._displayData = value['content'] = content;
        this._data = value;
    }

    get data(): PageData {
        return this._data;
    }

    @Input()
    set fixScroll(height: any) {
        this._fixScrollY = parseInt(height);
    }

    // 设置头部
    @Input()
    set title(value: string | TemplateRef<void>) {
        if (value instanceof TemplateRef) {
            this._titleTpl = value;
        } else {
            this._title = value;
        }
    }

    // 设置搜索
    @Input()
    set searchTmpl(templs: any[]) {
        if (templs) {
            let ref;
            templs.forEach((templ, i) => {
                ref = Object.keys(templ._def.references)[0].split('_')[1].toString();
                Object.defineProperty(this._searchCustom, ref, {
                    value: templ
                })
            })
            this._hasSearch = templs.length ? 1 : 0;
        }
    }

    @Input()
    set selection(value: Array<any>) {
        // 单选接受一个对象多选接受数组
        if (!this.util.isEqual(this._selections, value)) {
            this._selections = value;
            this.selectionChange.emit(value);
        }
    }


    constructor(private util: GridUtilService,
        public _vcr: ViewContainerRef,
        public api: API) {
    }

    ngOnInit() {
        this.onLazyLoad();
        if (this.id) {
            let columnsMap = localStorage[this.id];
            if (columnsMap) {
                columnsMap = JSON.parse(columnsMap);
                let sourceColumns = columnsMap["sourceColumns"];
                let targetColumns = columnsMap["targetColumns"];
                if (sourceColumns && targetColumns && this.util.generateColumnKey([...sourceColumns, ...targetColumns]) === this.util.generateColumnKey(this.columns)) {
                    this.columns = sourceColumns;
                    this.targetColumns = targetColumns;
                }
            }
        }
        this.editColumns = this.columns;
        this.editColumns.forEach((column, i) => {
            Object.defineProperties(column, {
                title: { value: column.header },
                disabled: { value: column.transferVisabled || false }
            })
        })

    }

    ngOnChanges() {
    }

    ngOnDestroy() {
        if (this.id) {
            localStorage[this.id] = JSON.stringify({
                sourceColumns: this.columns,
                targetColumns: this.targetColumns
            });
        }
    }

    isNeedSearch(column: any) {
        for (let value in column) {
            if (column[value] && column[value].indexOf('search_') !== -1)
                return column[value].split('_')[1];
        }
        return 0;
    }

    editChange(change: any) {
        let originChange = change,
            items = originChange.list;

        items.forEach((item, index) => {
            if (change.from === 'left') {
                this.editColumns.forEach(column => {
                    if (item['field'] === column['field'] && column.direction !== 'right')
                        column.direction = 'right';
                })
            } else {
                this.targetColumns.forEach(column => {
                    if (item['field'] === column['field'] && column.direction === 'right')
                        column.direction = 'left';
                })
            }
        })

        this.columns = this.editColumns.filter(column => column.direction !== 'right');
        this.targetColumns = this.editColumns.filter(column => column.direction === 'right');
        // 重新赋值，保证穿梭框排序保持最新一次
        this.editColumns = [...this.columns, ...this.targetColumns];
    }

    onLazyLoad(page: PageIndexAndSize = { first: this._first, rows: this._rows }): any {
        this._loading = true;
        this.load.emit(page);
    }

    refreshData(isSize = false) {
        if (isSize) {
            this._first = 1;
        }
        let page = { first: this._first, rows: this._rows };
        this.onLazyLoad(page);
    }

    getIconInstance({ outField, outProp, iconTemplate }) {
        this._iconComp = {
            outField: outField || '',
            outProp: outProp || '',
            iconTemplate: iconTemplate || '',
        }
    }

    /**
     * 记录选择事件
     * @param rows
     */
    onRowSelectChange(data: any) {
        data.checked = !data.checked;

        this.mulitipy ? this.refreshStatus() : this.selection = data;

        return false;
    }

    /**
     * 选择checkbox
     */
    refreshStatus(event?: MouseEvent) {
        if (event) {
            event.stopPropagation();
        }
        const selections = this._displayData.filter(value => value.checked === true);
        const allChecked = this._displayData.every(value => value.checked === true);
        const allUnChecked = this._displayData.every(value => !value.checked);
        this._allChecked = allChecked;
        this._indeterminate = (!allChecked) && (!allUnChecked);
        this.selection = selections;
    }

    /**
     * 全选和反选
     * @param value 
     * @param data 
     */
    checkAll(value, data: Array<any>) {
        if (value) {
            this._displayData.forEach(data => {
                data.checked = true;
            });
        } else {
            this._displayData.forEach(data => {
                data.checked = false;
            });
        }
        this.refreshStatus();
    }


    /**
     * cell点击事件
     * @param event
     * @param row
     * @param field
     */
    onCellClick(event: Event, row: any, field: any) {
        event.stopPropagation();
        let value = row[field];
        this.cellClick.emit({
            row: row,
            field: field,
            value: value,
            originalEvent: event
        });
    }

    /**
     * 鼠标mouseover事件
     */
    onCellMouseover(event: any, row: any, field: any) {
        event.stopPropagation();
        // let value = this.value(row, field);
        let value = row[field];
        this.cellOver.emit({
            row: row,
            field: field,
            value: value,
            originalEvent: event
        });
    }

    /**
     * 数据转为字符串
     * @param val
     * @returns {any}
     * @constructor
     */
    dataToStr(val: any) {
        let resultData;
        if (typeof val == 'number') {
            resultData = val.toString();
        } else if (typeof val == 'undefined') {
            resultData = '';
        } else if (val == null) {
            resultData = '';
        } else if (typeof val == 'object') {
            resultData = JSON.stringify(val);
        } else if (typeof val == 'boolean') {
            resultData = val ? '是' : '否';
        } else {
            resultData = val;
        }
        return resultData;
    }

    /**
     * 对有textLength属性的column进行字节数量控制
     * @param val
     * @param textLength
     * @returns {string|void|any}
     */
    replaceTextOmit(val: any, textLength: number = 20) {
        let resultData, temp;

        resultData = this.dataToStr(val);
        if (typeof resultData === 'string') {
            temp = resultData.slice(0, textLength);
            return resultData.length > textLength ? `${temp}...` : resultData;
        } else {
            return resultData;
        }
    }

    /**
     *
     * @param grid
     * @param data
     * @param isFailed 失败了
     */
    doExportCSV(grid, data, isFailed?: boolean) {
        grid.exportDisable = false;
        if (isFailed) {
            return;
        }
        let columns = grid.columns;
        var csv = '\ufeff';
        //headers
        for (var i = 0; i < columns.length; i++) {
            if (columns[i].field && !columns[i].hidden) {
                csv += '"' + (columns[i].header || columns[i].field) + '"';
                if (i < (columns.length - 1)) {
                    csv += ",";
                }
            }
        }
        //body
        data.forEach(function (record, i) {
            csv += '\n';
            for (var i_1 = 0; i_1 < columns.length; i_1++) {
                if (columns[i_1].field && !columns[i_1].hidden) {
                    let value = Object.defineProperty(record, columns[i_1].field, null);
                    if (typeof value === 'string') {
                        value = value.replace('"', '""');
                    } else if (value === null || value === 'null' || value === 'undefined') {
                        value = "";
                    }
                    if (!isNaN(Number(value)) && value.length > 12) {
                        csv += '"' + value + '\ufeff"';
                    } else {
                        csv += '"' + value + '"';
                    }
                    if (i_1 < (columns.length - 1)) {
                        csv += ",";
                    }
                }
            }
        });
        var blob = new Blob([csv], {
            type: 'text/csv;charset=utf-8;'
        });
        if (window.navigator.msSaveOrOpenBlob) {
            navigator.msSaveOrOpenBlob(blob, '导出.csv');
        }
        else {
            var link = document.createElement("a");
            link.style.display = 'none';
            document.body.appendChild(link);
            if (link.download !== undefined) {
                link.setAttribute('href', URL.createObjectURL(blob));
                link.setAttribute('download', '导出.csv');
                link.click();
            }
            else {
                csv = 'data:text/csv;charset=utf-8,' + csv;
                window.open(encodeURI(csv));
            }
            document.body.removeChild(link);
        }
    }

    exportDisable = false;

    exportCSVIntenal() {
        let $this = this;
        this.exportDisable = true;
        this.exportCSV.emit({
            done: $this.doExportCSV,
            grid: $this
        });
    }

}

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgZorroAntdModule,
        DirectivesModule,
        YZTViewerDirectiveModule
    ],
    declarations: [
        UIGridComponent
    ],
    exports: [UIGridComponent]
})
export class UIGridModule { }
