// src/chat/schemas/chat.schema.ts
import { Schema, Document } from 'mongoose';

export interface Chat extends Document {
  sender: string;
  receiver: string;
  message: string;
  timestamp: Date;
}

export const ChatSchema = new Schema(
  {
    sender: { type: String, required: true }, // Người gửi
    receiver: { type: String, required: true }, // Người nhận
    message: { type: String, required: true }, // Nội dung tin nhắn
    timestamp: { type: Date, default: Date.now }, // Thời gian gửi
  },
  { collection: 'chats' } // Tên collection
);
