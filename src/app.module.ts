import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatModule } from './chat/chat.module';
import { ChatGateway } from './chat/chat.gateway';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://chatUhpnat:chatUhpnat@cluster0.n7mku.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'),
    ChatModule
  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
