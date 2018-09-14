// tslint:disable

import { NgModule, EventEmitter, OnInit, ViewEncapsulation, Component, Input, Output, Inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { NzUploadModule, NzMessageService, UploadFile } from 'ng-zorro-antd';
import { YztUploadFile } from "./interface";

@Component({
    selector: 'yzt-upload',
    template: `
    <ng-template [ngIf]="type==='basic'">
        <nz-upload
            [nzAction]="action"
            [nzFileType]="fileType"
            [(nzFileList)]="_fileList"
            (nzChange)="handleChange($event)"
            [nzSize]="fileSize"
            [nzAccept]="fileAccept"
            [nzMultiple]="multiple"
            [nzDisabled]="disabled"
            [nzShowButton]="_fileList.length < fileNum"
            [nzRemove]="removeHandler"
            >
            <button nz-button  [disabled]="disabled">
            <i class="anticon anticon-upload"></i><span>{{uploadLabel}}</span>
            </button>
        </nz-upload>
    </ng-template>
    <ng-template [ngIf]="type==='avatar'">
        <nz-upload class="avatar-uploader"
            [nzAction]="action"
            [(nzFileList)]="_fileList"
            nzName="avatar"
            [nzAccept]="fileAccept"
            [nzSize]="fileSize"
            [nzDisabled]="disabled"
            [nzShowButton]="_fileList.length < fileNum"
            [nzShowUploadList]="false"
            [nzBeforeUpload]="beforeUpload"
            (nzChange)="handleChange($event)">
            <i *ngIf="!avatarUrl" class="anticon anticon-plus avatar-uploader-trigger"></i>
            <img *ngIf="avatarUrl" [src]="avatarUrl" class="avatar">
        </nz-upload>
    </ng-template>
    <ng-template [ngIf]="type==='picture-card'">
        <nz-upload
            class="yzt-upload-picture-card"
            [nzAction]="action"
            [(nzFileList)]="_fileList"
            nzListType="picture-card"
            [nzSize]="fileSize"
            [nzAccept]="fileAccept"
            [nzDisabled]="disabled"
            [nzMultiple]="multiple"
            [nzShowButton]="_fileList.length < fileNum"
            (nzChange)="handleChange($event)"
            [nzRemove]="removeHandler"
            [nzPreview]="handlePreview">
                <i class="anticon anticon-plus"></i>
                <div class="ant-upload-text">{{uploadLabel}}</div>
            </nz-upload>
            <nz-modal [nzVisible]="previewVisible" [nzContent]="modalContent" [nzFooter]="null" (nzOnCancel)="previewVisible=false">
            <ng-template #modalContent>
                <img [src]="previewImage" [ngStyle]="{ 'width': '100%' }" />
            </ng-template>
        </nz-modal>
    </ng-template>
    <ng-template [ngIf]="type==='picture'">
        <nz-upload
            [nzAction]="action"
            nzListType="picture"
            [nzAccept]="fileAccept"
            [nzDisabled]="disabled"
            [nzMultiple]="multiple"
            [nzRemove]="removeHandler"
            (nzChange)="handleChange($event)"
            [(nzFileList)]="_fileList">
            <button nz-button  [disabled]="disabled">
                <i class="anticon anticon-upload"></i><span>{{uploadLabel}}</span>
            </button>
        </nz-upload>
    </ng-template>
    <ng-template [ngIf]="type==='picture-inline'">
        <nz-upload class="upload-list-inline"
            [nzAction]="action"
            nzListType="picture"
            [nzMultiple]="multiple"
            [nzAccept]="fileAccept"
            [nzShowButton]="_fileList.length < fileNum"
            [nzDisabled]="disabled"
            [nzRemove]="removeHandler"
            (nzChange)="handleChange($event)"
            [(nzFileList)]="_fileList">
            <button nz-button  [disabled]="disabled">
                <i class="anticon anticon-upload"></i><span>{{uploadLabel}}</span>
            </button>
        </nz-upload>
    </ng-template>
    <ng-template [ngIf]="type==='drag'">
        <nz-upload class="yzt-upload-drag"
            nzType="drag"
            [nzAction]="action"
            [nzMultiple]="multiple"
            [nzAccept]="fileAccept"
            [nzDisabled]="disabled"
            [nzLimit]="fileNum"
            [nzRemove]="removeHandler"
            (nzChange)="handleChange($event)">
            <p class="ant-upload-drag-icon">
            <i class="anticon anticon-inbox"></i>
            </p>
            <p class="ant-upload-text">点击选择或将图片拖到这里</p>
        </nz-upload>
    </ng-template>
    `,
    styles: [`
    .avatar-uploader,
    .avatar-uploader-trigger,
    .avatar {
      width: 150px;
      height: 150px;
      display: block;
    }
  
    .avatar-uploader {
      display: block;
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
    }
  
    .avatar-uploader-trigger {
      display: table-cell;
      vertical-align: middle;
      font-size: 28px;
      color: #999;
    }
    .yzt-upload-picture-card i {
        font-size: 32px;
        color: #999;
      }
    .yzt-upload-picture-card .ant-upload-text {
        margin-top: 8px;
        color: #666;
      }

      .upload-list-inline .ant-upload-list-item {
        float: left;
        width: 200px;
        margin-right: 8px;
      }

      .yzt-upload-drag { display: block; }
      .yzt-upload-drag .ant-upload.ant-upload-drag { height: 180px; }
    `],
    encapsulation: ViewEncapsulation.None,
    preserveWhitespaces: false
})
export class YztUploadComponent implements OnInit {


    loading = false;

    avatarUrl: string;

    previewImage = '';

    previewVisible = false;

    _fileList: YztUploadFile[] | string = [];

    @Input()
    source = ''; //来源是否为老系统，存在则为老系统

    @Input()
    action = `baseConfig/uploadFile`; // 控制可以跨后端接口

    @Input()
    type = 'basic'; // 样式类型 'basic' | 'avatar' | 'picture-card' | 'picture' | 'picture-inline' | 'drag'

    @Input()
    valueType = 'array'; // 值类型 'string' | 'array'

    @Input()
    fileSize = 0; // 	限制文件大小，单位：KB；0 表示不限

    @Input()
    fileNum = 50; // 	限制上传文件数量，单位：个/张；默认50

    @Input()
    fileAccept: string = "image/*";

    @Input()
    disabled: boolean;

    @Input()
    fileType: string; // 限制文件类型，例如： image/png,image/jpeg,image/gif,image/bmp

    @Input()
    multiple: boolean = true; // 是否支持多选

    @Input()
    beforeUpload; // nzBeforeUpload

    @Input()
    removeHandler = (e) => {
        this._fileList = (<any>this._fileList).filter(file => {
            return file._id !== e._id;
        })
        this.fileListChange.emit(this._fileList);
    }; // nzRemove

    @Input()
    uploadLabel = '上传';

    /*   @Input()
      fileList: YztUploadFile[]; */

    @Input()
    set fileList(files: YztUploadFile[] | string) {
        this._fileList = this.getYztUploadFiles(files);
    }
    get fileList(): YztUploadFile[] | string {
        return this._fileList;
    }


    @Output()
    fileListChange: EventEmitter<YztUploadFile[] | string> = new EventEmitter<YztUploadFile[] | string>();

    @Output()
    onChange: EventEmitter<YztUploadFile[] | string> = new EventEmitter<YztUploadFile[] | string>();

    constructor(private msg: NzMessageService, @Inject('API_BASE_URL') private BASEURL) { }

    ngOnInit(): void {
        this._fileList = this.getYztUploadFiles(this.fileList);
    }

    handlePreview = (file: UploadFile) => {
        this.previewImage = file.url || file.thumbUrl;
        this.previewVisible = true;
    }

    private getBase64(img: File, callback: (img: any) => void) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    handleChange(info: { file: UploadFile, fileList: any[] }) {
        if (info.file.status === 'uploading') {
            this.loading = true;
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            this.getBase64(info.file.originFileObj, (img: any) => {
                this.loading = false;
                this.avatarUrl = img;
            });
            let files = this.getYztUploadFiles(info.fileList);
            if (this.valueType === 'string') {
                this.fileListChange.emit(_.map(files, 'url').join(','));
            } else {
                // 可能有坑，临时解决多选图片问题
                for (let i = 0; i < files.length; ++i) {
                    if ((<any>files[i])._id === undefined) return;
                }
                this.fileListChange.emit(files);
            }
            this.onChange.emit(files);
        }

    }

    getYztUploadFiles(files: any = this._fileList): YztUploadFile[] | string {

        if (typeof files === 'string' && files.length > 0) {
            let urls = files.split(',');
            files = [];
            urls.forEach(url => {
                let index = url.lastIndexOf('/');
                files.push({
                    _id: new Date().getTime(),
                    url: url,
                    name: url.substr(index) || ''
                })
            })
        } else {
            files = files || [];
        }
        let result = new Array(files.length);
        let count = -1;
        files.forEach(file => {
            count++;
            if (!this.source) {
                if (!file._id) {
                    file.status = file.status || 'done';
                    let resp = file.response;
                    if ((resp && resp.resultCode == '200' && resp.content)) {
                        file._id = resp.content._id
                        file.url = resp.content.path || file.path;
                    }
                    /*  if ((file.response && file.response[0])) {
                         file.key = file.response[0].key
                         file.url = file.response[0].path || file.path;
                     } */
                    file.message = file.key ? '上传失败' : ''
                    delete file.response;
                }

                result[count] = {
                    _id: file._id,
                    url: file.url,
                    name: file.name,
                    thumbUrl: file.thumbUrl,
                    status: file._id ? 'done' : 'error',
                    message: file._id ? '' : '上传失败'
                };
            } else {
                this.oldSystem(count, file, result);
            }
        });
        if (files.length >= this.fileNum) {
            this.disabled = true;
        }
        return result;
    }
    /**老系统上传数据格式兼容 */
    oldSystem(count, file, result) {
        if (!file.id) {
            file.status = file.status || 'done';
            let resp = file.response;
            if ((resp && resp.length)) {
                file._id = resp[0].id;
                file.id = resp[0].id;
                file.url = resp.url;
            }
            delete file.response;
        }

        result[count] = {
            _id: file._id,
            id: file.id,
            url: file.url,
            name: file.name,
            thumbUrl: file.thumbUrl,
            status: file.id ? 'done' : 'error',
            message: file.id ? '' : '上传失败'
        };
    }
}
