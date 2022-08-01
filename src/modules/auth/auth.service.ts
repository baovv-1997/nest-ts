import { Injectable } from '@nestjs/common';
import { BaseService } from 'core/services/base.service';
import { LoginReqDto, RegisterReqDto } from './dto/request';
import { ErrorCode } from 'constants/errorCode';
import { signData } from 'utils/jwt';
import { IDataSign } from 'common/types/dataSign.type';
import { LoginRes } from './dto/response';
import { InjectModel } from '@nestjs/mongoose';
import { Role, User, UserDocument } from 'common/schemas/user.schema';
import { Model } from 'mongoose';
import { hashString } from 'utils/encode';

@Injectable()
export class AuthService extends BaseService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
    super();
  }

  async login(loginDto: LoginReqDto): Promise<LoginRes> {
    const user = await this.userModel.findOne({ email: loginDto.email, role: loginDto.role})
    if(!user) {
      this.response({ statusCode: ErrorCode.EMAIL_NOT_FOUND})
    } 

    if(hashString(loginDto.password) !== user.password) {
      this.response({ statusCode: ErrorCode.EMAIL_OR_PASSWORD_WRONG})
    }


    const dataSign: IDataSign = {
      uid: user.id,
      email: user.email,
      role: user.role,
    }

    const token = signData<IDataSign>(dataSign, process.env.JWT_AUTH_IN);
    const refreshToken = signData<IDataSign>(dataSign, process.env.JWT_REFRESH_IN);
    await this.userModel.updateOne({id: user.id}, {refreshToken} );

    return {token, role: user.role, id: user.id, email: user.email, refreshToken};
  }

  async register(dataDto: RegisterReqDto): Promise<User> {
    const user = await this.userModel.findOne({ email: dataDto.email});
    if(user) {
      this.response({ statusCode: ErrorCode.EMAIL_IS_ALREADY_EXISTS});
    }

    const data: Pick<User, 'email' | 'password' | 'role'> = {
      email: dataDto.email,
      password: hashString(dataDto.password),
      role: dataDto.role
    }

    const createdUser = new this.userModel(data);
    return createdUser.save();
  }
}
