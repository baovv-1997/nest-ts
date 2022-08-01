import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsIn, IsNotEmpty } from "class-validator";
import { Role } from "common/schemas/user.schema";

export class LoginReqDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @ApiProperty({ enum: Role })
  @IsNotEmpty()
  @IsIn(Object.values(Role))
  role: Role;
}

export class RegisterReqDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @ApiProperty({ enum: Role })
  @IsNotEmpty()
  @IsIn(Object.values(Role))
  role: Role;
}