import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Event,
  Booking,
} from '../models';
import {EventRepository} from '../repositories';

export class EventBookingController {
  constructor(
    @repository(EventRepository) protected eventRepository: EventRepository,
  ) { }

  @get('/events/{id}/bookings', {
    responses: {
      '200': {
        description: 'Array of Event has many Booking',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Booking)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Booking>,
  ): Promise<Booking[]> {
    return this.eventRepository.eventbooking(id).find(filter);
  }

  @post('/events/{id}/bookings', {
    responses: {
      '200': {
        description: 'Event model instance',
        content: {'application/json': {schema: getModelSchemaRef(Booking)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Event.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Booking, {
            title: 'NewBookingInEvent',
            exclude: ['id'],
            optional: ['eventId']
          }),
        },
      },
    }) booking: Omit<Booking, 'id'>,
  ): Promise<Booking> {
    return this.eventRepository.eventbooking(id).create(booking);
  }

  @patch('/events/{id}/bookings', {
    responses: {
      '200': {
        description: 'Event.Booking PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Booking, {partial: true}),
        },
      },
    })
    booking: Partial<Booking>,
    @param.query.object('where', getWhereSchemaFor(Booking)) where?: Where<Booking>,
  ): Promise<Count> {
    return this.eventRepository.eventbooking(id).patch(booking, where);
  }

  @del('/events/{id}/bookings', {
    responses: {
      '200': {
        description: 'Event.Booking DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Booking)) where?: Where<Booking>,
  ): Promise<Count> {
    return this.eventRepository.eventbooking(id).delete(where);
  }
}
