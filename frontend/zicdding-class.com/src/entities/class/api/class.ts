import { classListData } from './mock';
import type { ApiResponse } from '../model/class.type';

export const getClasses = async (): Promise<ApiResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(classListData);
    }, 1000);
  });
};
