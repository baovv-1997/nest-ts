import { Body, Controller, Get, Query, Request, UseGuards } from "@nestjs/common";
import { Role } from "common/schemas/user.schema";
import { BaseController } from "core/controllers/base.controller";
import { AuthGuard } from "core/guards/auth.guard";
import { RolesGuard } from "core/guards/role.guard";
import { DoctorService } from "./doctor.service";

@Controller('/api/doctors')
@UseGuards(new RolesGuard([Role.doctor]))
@UseGuards(AuthGuard)

export class DoctorController extends BaseController {
  constructor(private readonly doctorService: DoctorService) {
    super();
  }

  @Get()
  async login(@Request() { user }: { user: any}, @Query() query: any) {
    console.log('user', user);
    const result = await this.doctorService.getDoctorById(query);
    
    return this.successResponse({ data: result})
  }
}