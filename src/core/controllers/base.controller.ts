import { IResponse } from "common/types/response.type";
import { buildSuccessResponse } from "core/response/index.response";

export class BaseController {
  successResponse (dataRes?: IResponse) {
    return buildSuccessResponse(dataRes)
	}
}