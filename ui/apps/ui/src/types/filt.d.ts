export {};

declare global {
  interface Array<T> {
    filt(a: unknown[]): T[];
  }
}
