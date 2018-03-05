/**
 * 异常类型组件服务
 */
import {Injectable} from "@angular/core";
import { API } from "./api";

@Injectable()
export class AbnormalTypeService{

    constructor(public api:API){}

    selectBoxHandler():any {
        let api = this.api;
        return (boxs,select)=>{
            // 设置Tab页标题，根据深度来设置不同的标题
            let title:string;
            switch (boxs.length){
                case 0:title="异常大类";break;
                case 1:title="异常小类";break;
            }

            // 判断当前是否已选择了一个父项，如果选择了，则根据父乡去取子项信息，否则取根项信息
            if(select){
                api.call("AbnormalTypeController.abnormalTypeFind",{
                    first:0,
                    rows:9999
                },{
                    "parentId":select.value
                }).ok(json=>{
                    let data = [];
                    boxs.push({
                        title:title,
                        data:data
                    });
                    let result:any[] = json.result.content;
                    for(let type of result){
                        data.push({
                            label:type.name,
                            value:type.id,
                            end:boxs.length==2
                        });
                    }
                });
            }
            else {
                api.call("AbnormalTypeController.abnormalTypeFind",{
                    first:0,
                    rows:9999
                },{}).ok(json=>{
                    let data = [];
                    boxs.push({
                        title:title,
                        data:data
                    });
                    let result:any[] = json.result.content;
                    for(let type of result){
                        data.push({
                            label:type.name,
                            value:type.id
                        });
                    }
                }).fail(json=>{
                    ////console.log(json);
                });
            }
        };
    }

    selectBoxLabelHandler():any{
        return (selectBox,code)=>{
            this.api.call("AbnormalTypeController.generateLabelForAbnormalType",code).ok(json=>{
                selectBox.label = json.result;
            });

        };
    }
}
