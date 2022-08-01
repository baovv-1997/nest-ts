import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { DoctorModule } from './user/doctor.module';

@Module({
  imports: [ MongooseModule.forRoot(process.env.MONGODB_URL), AuthModule, DoctorModule],
})
export class AppModule {}
