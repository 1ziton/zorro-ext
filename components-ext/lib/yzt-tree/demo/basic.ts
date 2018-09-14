import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-yzt-tree-basic',
  template: `
  <p-tree [value]="filesTreeData" selectionMode="checkbox" [(selection)]="selectedFiles"></p-tree>
  `
})
export class NzDemoYztTreeBasicComponent {
  filesTreeData = [];
  selectedFiles = [];
  constructor() { }

  ngOnInit() {
    fetch('./assets/simulate-data/files.json', { method: 'get' }).then(result => result.json())
      .then(json => this.filesTreeData = json['data'])
  }
}
