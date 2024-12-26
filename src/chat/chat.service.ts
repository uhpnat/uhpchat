import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chat } from './chat.schema';

@Injectable()
export class ChatService {
  constructor(@InjectModel('Chat') private chatModel: Model<Chat>) {}

  // Lưu tin nhắn vào MongoDB
  async saveMessage(sender: string, receiver: string, message: string): Promise<Chat> {
    try {
      // Kiểm tra dữ liệu đầu vào
      if (!sender || !receiver || !message) {
        throw new Error('Missing required fields: sender, receiver, or message');
      }
      const newChat = new this.chatModel({
        sender,
        receiver,
        message,
        timestamp: new Date(),
      });

      return await newChat.save();
    } catch (error) {
      // Xử lý lỗi
      console.error('Error saving message:', error);
      throw new Error('Error saving message');
    }
  }

  // Lấy tất cả tin nhắn
  async getAllChats(): Promise<Chat[]> {
    return this.chatModel.find().exec();
  }

  // Lấy lịch sử trò chuyện giữa hai người dùng
  async getChatHistory(sender: string, receiver: string): Promise<Chat[]> {
    return this.chatModel
      .find({
        $or: [
          { sender, receiver },
          { sender: receiver, receiver: sender },
        ],
      })
      .sort({ timestamp: 1 }) // Sắp xếp theo thời gian
      .exec();
  }

  async createSampleData() {
    const sampleChats = [
      { sender: 'tanphu', receiver: 'admin', message: 'Hello Admin' },
      { sender: 'admin', receiver: 'tanphu', message: 'Hello Võ Tấn Phú!' },
    ];

    await this.chatModel.insertMany(sampleChats);
    return 'Sample data inserted';
  }
}
