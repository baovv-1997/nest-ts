import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "common/schemas/user.schema";
import { BaseService } from "core/services/base.service";
import { Model } from "mongoose";

export class DoctorService extends BaseService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
    super();
  }

  async getDoctorById(queryDto: any): Promise<User> {
    return this.userModel.findById(queryDto.id);
  }
}