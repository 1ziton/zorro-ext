
/*tslint:disable*/
import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
@Injectable()
export class AreaService {
    cacheArea: any = {};
    constructor(public apiService: ApiService) { }

    selectBoxHandler(): any {
        let api = this.apiService;
        return (boxs, select, boxLen = 3) => {
            // 设置Tab页标题，根据深度来设置不同的标题
            let title: string;
            switch (boxs.length) {
                case 0: title = "省/直辖市/自治区"; break;
                case 1: title = "市/市辖区"; break;
                case 2: title = "区/县"; break;
                case 3: title = "街道/村"; break;
                default: title = "居委会/村委会";
            }
            // 判断当前是否已选择了一个父项，如果选择了，则根据父乡去取子项信息，否则取根项信息
            if (select) {
                let cacheArea = this.getCache(select.value);
                // 如果存在缓存，走缓存
                if (cacheArea.length) {
                    let data = [];
                    boxs.push({
                        title: title,
                        data: data
                    });
                    for (let area of cacheArea) {
                        if (area.code === "000000000000") {
                            continue;
                        }
                        data.push({
                            label: area.name,
                            value: area.code,
                            id: area.id,
                            level: area.level,
                            end: boxs.length == boxLen
                        });
                    }
                    return;
                }
                api.findAreaList([{
                    "parentCode": select.value
                }]).subscribe(json => {
                    let data = [];
                    boxs.push({
                        title: title,
                        data: data
                    });
                    let result: any[] = json.content;
                    this.setCache(select.value, result); // 缓存请求数据
                    for (let area of result) {
                        if (area.code === "000000000000") {
                            continue;
                        }
                        data.push({
                            label: area.name,
                            value: area.code,
                            id: area.id,
                            level: area.level,
                            end: boxs.length == boxLen
                        });
                    }
                });
            } else {
                let cacheArea = this.getCache("000000000000");
                // 如果存在缓存，走缓存
                if (cacheArea.length) {
                    let data = [];
                    boxs.push({
                        title: title,
                        data: data
                    });
                    for (let area of cacheArea) {
                        if (area.code === "000000000000") {
                            continue;
                        }
                        data.push({
                            label: area.name,
                            level: area.level,
                            id: area.id,
                            value: area.code
                        });
                    }
                    return;
                }
                api.findAreaList([{
                    "parentCode": "000000000000"
                }]).subscribe(json => {
                    let data = [];
                    boxs.push({
                        title: title,
                        data: data
                    });
                    let result: any[] = json.content;
                    this.setCache("000000000000", result); // 缓存请求数据
                    for (let area of result) {
                        if (area.code === "000000000000") {
                            continue;
                        }
                        data.push({
                            label: area.name,
                            level: area.level,
                            id: area.id,
                            value: area.code
                        });
                    }
                });
            }
        };
    }
    /**
     * 根据code回显名称getAreaByCode
     */
    selectBoxLabelHandler(): any {
        return (selectBox, code) => {
            this.apiService.getAreaByCode([{
                "code": code
            }]).subscribe(json => {
                selectBox.label = json.content && json.content.mergerName;
            });
        };
    }
    /**
     * 设置缓存
     * @param code 编码
     * @param data 区域数组
     */
    setCache(code: string, data) {
        try {
            let cacheAreaStr = sessionStorage.getItem('cacheAreaData') || '{}';
            let cacheArea = JSON.parse(cacheAreaStr);
            cacheArea[code] = data;
            let newCache = JSON.stringify(cacheArea);
            sessionStorage.setItem('cacheAreaData', newCache);
        } catch (e) {
        }
    }
    /**
     *获取缓存
     * @param code 编码
     */
    getCache(code: string) {
        try {
            let cacheAreaStr = sessionStorage.getItem('cacheAreaData') || '{}';
            let cacheArea = JSON.parse(cacheAreaStr);
            return cacheArea[code] || [];
        } catch (e) {
            return [];
        }
    }
}
