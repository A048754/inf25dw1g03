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
  Room,
} from '../models';
import {RoomRepository} from '../repositories';

export class RoomEventController {
  constructor(
    @repository(RoomRepository) protected roomRepository: RoomRepository,
  ) { }

  @get('/rooms/{id}/events', {
    responses: {
      '200': {
        description: 'Array of Room has many Event',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Event)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Event>,
  ): Promise<Event[]> {
    return this.roomRepository.events(id).find(filter);
  }

  @post('/rooms/{id}/events', {
    responses: {
      '200': {
        description: 'Room model instance',
        content: {'application/json': {schema: getModelSchemaRef(Event)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Room.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Event, {
            title: 'NewEventInRoom',
            exclude: ['id'],
            optional: ['roomId']
          }),
        },
      },
    }) event: Omit<Event, 'id'>,
  ): Promise<Event> {
    return this.roomRepository.events(id).create(event);
  }

  @patch('/rooms/{id}/events', {
    responses: {
      '200': {
        description: 'Room.Event PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Event, {partial: true}),
        },
      },
    })
    event: Partial<Event>,
    @param.query.object('where', getWhereSchemaFor(Event)) where?: Where<Event>,
  ): Promise<Count> {
    return this.roomRepository.events(id).patch(event, where);
  }

  @del('/rooms/{id}/events', {
    responses: {
      '200': {
        description: 'Room.Event DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Event)) where?: Where<Event>,
  ): Promise<Count> {
    return this.roomRepository.events(id).delete(where);
  }
}
