import {Entity, model, property} from '@loopback/repository';

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
    type: 'number',
    required: true,
  })
  room_id: number;

  @property({
    type: 'number',
    required: true,
  })
  tag_id: number;

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


  constructor(data?: Partial<Event>) {
    super(data);
  }
}

export interface EventRelations {
  // describe navigational properties here
}

export type EventWithRelations = Event & EventRelations;
