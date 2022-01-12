export abstract class ValueRef<T> {
  public getValue: () => T;
  public setValue: (value: T) => void;

  setCallbacks(getValue: () => T, setValue: (value: T) => void) {
    this.getValue = getValue;
    this.setValue = setValue;
  }
};
