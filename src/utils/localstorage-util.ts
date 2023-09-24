import { v4 as uuidv4 } from 'uuid';

import { LAYOUTS } from '@/constants';
import type { ContentAll } from '@/types/content-all';
import type { LayoutItem } from '@/types/layouts';

const RES_GEN_KEY = 'res-gen-data';

export type LocalStorageData = {
  layouts: LayoutItem[];
  items: ContentAll[];
  isEditorVisible: boolean;
};

export type JsonType = {
  [key: string]: any;
};

export class LocalStorageUtil {
  get data(): LocalStorageData {
    return JSON.parse(window.localStorage.getItem(RES_GEN_KEY)!) || {};
  }

  set data(value: JsonType) {
    window.localStorage.setItem(RES_GEN_KEY, JSON.stringify(value));
  }

  get layouts() {
    return this.data.layouts?.length ? this.data.layouts : [{ layoutId: uuidv4(), layoutType: LAYOUTS.SINGLE }];
  }

  get items() {
    return this.data.items?.length ? this.data.items : [];
  }

  get isEditorVisible() {
    return this.data.isEditorVisible;
  }
}

export const localStorageUtil = new LocalStorageUtil();

export default localStorageUtil;
