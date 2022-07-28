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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
