
/*tslint:disable*/
import { Injectable } from "@angular/core";
import { API } from "./api";
@Injectable()
export class AreaService {
    cacheArea: any = {};
    constructor(public api: API) { }

    selectBoxHandler(): any {
        let api = this.api;
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
                api.call("CommonController.findAreasByParent", {
                    "code": select.value
                }).ok(json => {
                    let data = [];
                    boxs.push({
                        title: title,
                        data: data
                    });
                    let result: any[] = json.result;
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
                api.call("CommonController.findAreasByParent", {
                    "code": "000000000000"
                }).ok(json => {
                    let data = [];
                    boxs.push({
                        title: title,
                        data: data
                    });
                    let result: any[] = json.result;
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
     * 根据code回显名称
     */
    selectBoxLabelHandler(): any {
        return (selectBox, code) => {
            this.api.call("CommonController.generateLabelForArea", code).ok(json => {
                selectBox.label = json.result;
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
