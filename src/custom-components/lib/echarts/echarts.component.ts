import {
    Directive,
    ElementRef,
    Renderer,
    Input,
    Output,
    HostListener,
    OnChanges,
    OnDestroy,
    SimpleChange,
    EventEmitter,
    OnInit,
    NgModule
} from "@angular/core";
import { Http } from "@angular/http";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
//声明全局变量占用
declare var echarts: any;

@Directive({
    selector: '[echarts]'
})
export class EchartsDirective implements OnInit, OnChanges, OnDestroy {

    @Input() options: any;

    @Input() dataset: any[];

    @Input() theme: string;

    @Input() loading: boolean;

    // chart events:
    @Output() chartClick: EventEmitter<any> = new EventEmitter<any>();

    @Output() chartDblClick: EventEmitter<any> = new EventEmitter<any>();

    @Output() chartMouseDown: EventEmitter<any> = new EventEmitter<any>();

    @Output() chartMouseUp: EventEmitter<any> = new EventEmitter<any>();

    @Output() chartMouseOver: EventEmitter<any> = new EventEmitter<any>();

    @Output() chartMouseOut: EventEmitter<any> = new EventEmitter<any>();

    @Output() chartGlobalOut: EventEmitter<any> = new EventEmitter<any>();

    public myChart: any = null;
    public currentWindowWidth: any = null;

    constructor(public el: ElementRef, public renderer: Renderer, public http: Http) {
    }

    ngOnInit(): void {
        // this.initMapData()
    }

    public createChart() {
        this.theme = this.theme || 'default';
        this.currentWindowWidth = window.innerWidth;
        return echarts.init(this.el.nativeElement);
    }

    initMapData() {
        this.http.get('./assets/map/china.json').subscribe(chinaJson => {
            echarts.registerMap('china', chinaJson);
        })
    }

    public updateChart() {
        //根据类型注册地图
        let series = this.options && this.options.series && this.options.series[0] && this.options.series[0];
        if (series['type'] === 'map') {
            let mapType = series['mapType'];
            this.http.get(`./assets/map/${mapType}.json`).subscribe((data) => {
                const mapJson = JSON.parse((<any>data)._body);
                echarts.registerMap(mapType, mapJson);
                this.myChart.setOption(this.options);
                this.myChart.resize();
            });
        } else {
            this.myChart.setOption(this.options);
            this.myChart.resize();
        }
    }

    @HostListener('window:resize', ['$event']) onWindowResize(event: any) {
        if (event.target.innerWidth !== this.currentWindowWidth) {
            this.currentWindowWidth = event.target.innerWidth;
            if (this.myChart) {
                this.myChart.resize();
            }
        }
    }

    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        if (changes['dataset']) {
            this.onDatasetChange(this.dataset);
        }

        if (changes['options']) {
            this.onOptionsChange(this.options);
        }

        if (changes['loading']) {
            this.onLoadingChange(this.loading);
        }
    }

    ngOnDestroy() {
        if (this.myChart) {
            this.myChart.dispose();
            this.myChart = null;
        }
    }

    public onOptionsChange(opt: any) {
        if (opt) {
            if (!this.myChart) {
                this.myChart = this.createChart();

                // register events:
                this.registerEvents(this.myChart);
            }

            if (this.hasData()) {
                this.updateChart();
            } else if (this.dataset && this.dataset.length) {
                this.mergeDataset(this.dataset);
                this.updateChart();
            }
        }
    }

    public onDatasetChange(dataset: any[]) {
        if (this.myChart && this.options) {
            if (!this.options.series) {
                this.options.series = [];
            }

            this.mergeDataset(dataset);
            this.updateChart();
        }
    }

    public onLoadingChange(loading: boolean) {
        if (this.myChart) {
            if (loading) {
                this.myChart.showLoading();
            } else {
                this.myChart.hideLoading();
            }
        }
    }

    public mergeDataset(dataset: any[]) {
        for (let i = 0, len = dataset.length; i < len; i++) {
            if (!this.options.series[i]) {
                this.options.series[i] = { data: dataset[i] };
            } else {
                this.options.series[i].data = dataset[i];
            }
        }
    }

    /**
     * method to check if the option has dataset.
     */
    public hasData(): boolean {
        if (!this.options.series || !this.options.series.length) {
            return false;
        }

        for (let serie of this.options.series) {
            if (serie.data && serie.data.length > 0) {
                return true;
            }
        }

        return false;
    }

    public registerEvents(myChart: any) {
        if (myChart) {
            // register mouse events:
            myChart.on('click', (e: any) => {
                this.chartClick.emit(e);
            });
            myChart.on('dblClick', (e: any) => {
                this.chartDblClick.emit(e);
            });
            myChart.on('mousedown', (e: any) => {
                this.chartMouseDown.emit(e);
            });
            myChart.on('mouseup', (e: any) => {
                this.chartMouseUp.emit(e);
            });
            myChart.on('mouseover', (e: any) => {
                this.chartMouseOver.emit(e);
            });
            myChart.on('mouseout', (e: any) => {
                this.chartMouseOut.emit(e);
            });
            myChart.on('globalout', (e: any) => {
                this.chartGlobalOut.emit(e);
            });
        }
    }
}

@NgModule({
    declarations: [
        EchartsDirective
    ],
    exports: [EchartsDirective],
    imports: [
        CommonModule,
        FormsModule
    ]
})
export class EchartsModule { }