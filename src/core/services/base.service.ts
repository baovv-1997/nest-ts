import { HttpException, HttpStatus } from "@nestjs/common";
import { IResponse } from "common/types/response.type";
import { ErrorCode } from "constants/errorCode";
import { buildFailedResponse } from "../response/index.response";

export class BaseService {
	response (dataRes: IResponse) {
    throw new HttpException( buildFailedResponse({
      ...dataRes
    }), HttpStatus.BAD_REQUEST)
	}
}