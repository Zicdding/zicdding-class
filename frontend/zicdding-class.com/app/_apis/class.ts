import { classListData } from './mock';
import type { ApiResponse } from './mock/class/data';

export const getClasses = async (): Promise<ApiResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(classListData);
    }, 1000);
  });
};
