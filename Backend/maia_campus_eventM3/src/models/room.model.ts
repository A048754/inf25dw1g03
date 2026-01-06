import {Entity, hasMany, model, property} from '@loopback/repository';
import {Event} from './event.model';

@model()
export class Room extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'number',
    required: true,
  })
  capacity: number;

  @property({
    type: 'string',
    required: true,
  })
  building: string;

  @property({
    type: 'string',
  })
  description?: string;

  @hasMany(() => Event)
  events: Event[];

  constructor(data?: Partial<Room>) {
    super(data);
  }
}

export interface RoomRelations {
  // describe navigational properties here
}

export type RoomWithRelations = Room & RoomRelations;
