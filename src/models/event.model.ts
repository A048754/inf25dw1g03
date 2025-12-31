import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {Booking} from './booking.model';
import {Room} from './room.model';
import {Tag} from './tag.model';
import {User} from './user.model';

@model()
export class Event extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'string',
  })
  description?: string;

  @property({
    type: 'string',
    required: true,
  })
  start_datetime: string;

  @property({
    type: 'string',
    required: true,
  })
  end_datetime: string;

  @belongsTo(() => Room)
  roomId: number;

  @belongsTo(() => Tag)
  tagId: number;

  @belongsTo(() => User)
  userId: number;

  @hasMany(() => Booking)
  bookings: Booking[];

  constructor(data?: Partial<Event>) {
    super(data);
  }
}

export interface EventRelations {
  // describe navigational properties here
}

export type EventWithRelations = Event & EventRelations;
