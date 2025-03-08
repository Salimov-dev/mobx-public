import { makeAutoObservable } from "mobx";

class CounterStore {
  private _count = 0;
  savedCount: null | number = null;

  get count() {
    return this._count;
  }

  get total() {
    return this.count * 3;
  }

  set count(value: number) {
    if (value < 0) {
      this._count = 0;
    } else if (value > 20) {
      this._count = 20;
    } else {
      this._count = value;
    }
  }

  constructor() {
    makeAutoObservable(this);
  }

  increment = (value: number) => {
    this.count += value;
  };

  decrement = (value: number) => {
    this.count -= value;
  };

  saveCount = () => {
    this.savedCount = this.count;
  };

  removeSavedCount = () => {
    this.savedCount = null;
  };
}

export default new CounterStore();
