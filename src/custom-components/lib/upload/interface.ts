import { UploadFile } from "../../../components/ng-zorro-antd.module";

export interface YztUploadFile extends UploadFile{
    id:string;
    url:string;
    name:string;
    path?:string;
    etag?:string;
}