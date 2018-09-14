import { UploadFile } from 'ng-zorro-antd';

export interface YztUploadFile extends UploadFile{
    id?:string;
    _id:string;
    url:string;
    name:string;
    key?:string;
    path?:string;
    etag?:string;
    [key: string]: any;
}