import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './app/users/users.module';
import { SendgridModule } from './app/sendgrid/sendgrid.module';
import { MailModule } from './app/mail/mail.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ProductsModule } from './app/products/products.module';
import { OrdersModule } from './app/orders/orders.module';
import { AuthModule } from './auth/auth.module';
import { AbilityModule } from './ability/ability.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    ScheduleModule.forRoot(),
    UsersModule,
    SendgridModule,
    MailModule,
    ProductsModule,
    OrdersModule,
    AuthModule,
    AbilityModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
