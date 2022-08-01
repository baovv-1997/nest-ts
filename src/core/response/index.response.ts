import { HttpStatus } from '@nestjs/common';
import { IResponse } from 'common/types/response.type';

export const buildSuccessResponse = (dataRes?: IResponse): IResponse => {
  return {
    data: dataRes?.data || null,
    message: dataRes?.message || '',
    statusCode: dataRes?.statusCode || HttpStatus.OK,
    success: true,
  };
};

export const buildFailedResponse = (dataRes?: IResponse): IResponse => {
  return {
    data: dataRes?.data || null,
    message: dataRes?.message || '',
    statusCode: dataRes?.statusCode || HttpStatus.BAD_REQUEST,
    success: false,
  };
};
