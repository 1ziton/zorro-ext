
import { Injectable } from "@angular/core";
@Injectable()
export class YZTUtil {
    /**
     * 关键字数组分解成含'|'的字符串
     * @param arr 分解的数组
     * @param keyName 对象关键字
     */
    generateColumnKey(arr: Array<string | Object>, keyName: string): string {
        if (!arr.length) return '';
        let fields = [];
        if (typeof arr[0] === "string") {
            for (let item of arr) {
                fields.push(item);
            }
        } else {
            for (let item of arr) {
                fields.push(item[keyName]);
            }
        }
        fields.sort();
        let key = "";
        for (let field of fields) {
            if (key.length > 0) {
                key += "|";
            }
            key += field;
        }
        return key;
    }
}