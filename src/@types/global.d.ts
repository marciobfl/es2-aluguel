declare global {
  type MakeRequired<T, K extends keyof T> = T & Required<Pick<T, K>>;
}

export {};
