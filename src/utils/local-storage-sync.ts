declare const localStorage: Storage;

type LocalStorageMethodOption<T> = {
  defaultValue?: T;
  suppressError: boolean;
};

export class LocalStorageSync {
  static getObject<T = unknown>(key: string, options?: LocalStorageMethodOption<T>): T {
    try {
      return JSON.parse(localStorage.getItem(key) || '');
    } catch (x) {
      if (options?.suppressError) {
        return options?.defaultValue as T;
      }

      throw x;
    }
  }

  static setObject(key: string, item: unknown, options?: LocalStorageMethodOption<void>) {
    try {
      return localStorage.setItem(key, JSON.stringify(item));
    } catch (x) {
      if (!options?.suppressError) {
        throw x;
      }

      return options?.defaultValue;
    }
  }
}
