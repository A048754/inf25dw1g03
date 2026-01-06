import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Event} from './event.model';

@model()
export class Booking extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @belongsTo(() => Event)
  eventId: number;

  @property({
    type: 'string',
  })
  created_at?: string;

  constructor(data?: Partial<Booking>) {
    super(data);
  }
}

export interface BookingRelations {
  // describe navigational properties here
}

export type BookingWithRelations = Booking & BookingRelations;
