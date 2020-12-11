import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import {
  BidEventPayload,
  DeleteAuctionEventPayload,
  JoinAuctionEventPayload,
  LeaveAuctionEventPayload,
} from '../interfaces';
import { BidEventResponse } from '../interfaces/bid-event-response.interface';

@WebSocketGateway()
export class AuctionGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  afterInit(initServer: Server) {
    console.log(`Init.`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('join-auction')
  async handleJoinAuctionEvent(
    @MessageBody() payload: JoinAuctionEventPayload,
    @ConnectedSocket() client: Socket,
  ): Promise<string> {
    const { socketAuctionId } = payload;
    client.join(`${socketAuctionId}`);
    console.log(`Client joined room: ${socketAuctionId}`);
    console.log('client.adapter.rooms :>> ', client.adapter.rooms);
    return `Client joined room: ${socketAuctionId}`;
  }

  @SubscribeMessage('leave-auction')
  async handleLeaveAuctionEvent(
    @MessageBody() payload: LeaveAuctionEventPayload,
    @ConnectedSocket() client: Socket,
  ): Promise<string> {
    const { socketAuctionId } = payload;
    client.leave(`${socketAuctionId}`);
    console.log(`Client left room: ${socketAuctionId}`);
    console.log('client.adapter.rooms :>> ', client.adapter.rooms);
    return `Client joined room: ${socketAuctionId}`;
  }

  @SubscribeMessage('bid')
  async handleBidEvent(
    @MessageBody() payload: BidEventPayload,
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    const { socketAuctionId, bidPrice } = payload;
    const responsePayload: BidEventResponse = {
      bidPrice,
    };
    client.broadcast.to(socketAuctionId).emit('bid', responsePayload);
  }

  @SubscribeMessage('delete-auction')
  async handleDeleteAuctionEvent(
    @MessageBody() payload: DeleteAuctionEventPayload,
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    const { socketAuctionId } = payload;
    client.broadcast.to(socketAuctionId).emit('delete-auction');
  }
}
