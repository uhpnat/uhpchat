import { Injectable, Logger } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer, SubscribeMessage } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
@WebSocketGateway({
  cors: {
    origin: ['http://localhost:3000', 'http://127.0.0.1:5500'],
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  },
})
@Injectable()  // Đảm bảo dùng @Injectable() trong Gateway
export class ChatGateway {
  constructor(
    private readonly chatService: ChatService, // Tiêm service
  ) {}
  @WebSocketServer()
  server: Server;
  private readonly logger = new Logger('ChatGateway');
  afterInit(server: Server) {
    this.logger.log('Socket server initialized');
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('send_message')
  async handleMessage(
    client: Socket,
    payload: { sender: string; receiver: string; message: string },
  ): Promise<void> {
    this.logger.log(`Message received: ${JSON.stringify(payload)}`);
    await this.chatService.saveMessage(payload.sender, payload.receiver, payload.message);
    // Phát lại thông điệp đến các client khác
    this.server.emit('receive_message', payload);
  }
}
