import { Injectable } from '@angular/core';
import { StorageService, StorageType } from 'rebirth-storage';

@Injectable()
export class ReStorageService {
  static STORAGE_VALUE_KEY = 'value';

  constructor(private storageService: StorageService) {
    // 默认是sessionStorage存储
    this.storageService.setDefaultStorageType(StorageType.sessionStorage);
  }

  save(key: string, value: any, storageType?: StorageType) {
    return this.storageService.put(
      { pool: key, key: ReStorageService.STORAGE_VALUE_KEY, storageType },
      value,
    );
  }

  get<T>(key: string, storageType?: StorageType): T {
    return this.storageService.get({
      pool: key,
      key: ReStorageService.STORAGE_VALUE_KEY,
      storageType
    }) as T;
  }

  remove(key: string, storageType?: StorageType) {
    return this.storageService.remove({ pool: key, storageType });
  }

  clear(storageType?: StorageType) {
    return this.storageService.removeAll({ storageType });
  }
}
