import { Controller, Post, Body, Get, Param,Logger  } from '@nestjs/common';
import { ChatService } from './chat.service';
import { Chat } from './chat.schema';

@Controller('chats') // Đảm bảo rằng controller sử dụng đúng route 'chats'
export class ChatController {
  private readonly logger = new Logger("Lỗi khi post");
  constructor(private readonly chatService: ChatService) {}

  // Lấy tất cả tin nhắn
  @Get()
  async getAllChats(): Promise<Chat[]> {
    return this.chatService.getAllChats();
  }

  // Lấy lịch sử trò chuyện giữa hai người dùng (sender và receiver)
  @Get(':sender/:receiver') // Đảm bảo route này được định nghĩa đúng
  async getChatHistory(
    @Param('sender') sender: string,
    @Param('receiver') receiver: string,
  ): Promise<Chat[]> {
    return this.chatService.getChatHistory(sender, receiver);
  }

  // Gửi tin nhắn
  @Post()
  async sendMessage(@Body() body: { sender: string, receiver: string, message: string }): Promise<Chat> {
    const { sender, receiver, message } = body;
    try {
      return await this.chatService.saveMessage(sender, receiver, message);
    } catch (error) {
      this.logger.error('Error sending message', error.stack);
      throw new Error('Could not send message');
    }
  }
  @Get('create-sample-data')
  async createSampleData() {
    return this.chatService.createSampleData();
  }
}
