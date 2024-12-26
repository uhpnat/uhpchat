import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { ChatSchema } from './chat.schema';
import { ChatGateway } from './chat.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Chat', schema: ChatSchema }]),
  ],
  providers: [ChatService, ChatGateway],  // ChatService và ChatGateway được khai báo đúng ở đây
  controllers: [ChatController],
  exports: [ChatService]
})
export class ChatModule {}