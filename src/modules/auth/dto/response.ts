import { ApiProperty } from "@nestjs/swagger";
import { Role } from "common/schemas/user.schema";

export class LoginRes {
  @ApiProperty()
  email: string;

  @ApiProperty({ enum: Role})
  role: Role;

  @ApiProperty()
  id: string;

  @ApiProperty()
  token: string;

  @ApiProperty()
  refreshToken: string;
}