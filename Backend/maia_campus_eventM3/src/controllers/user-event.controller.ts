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
  User,
} from '../models';
import {UserRepository} from '../repositories';

export class UserEventController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
  ) { }

  @get('/users/{id}/events', {
    responses: {
      '200': {
        description: 'Array of User has many Event',
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
    return this.userRepository.userEvent(id).find(filter);
  }

  @post('/users/{id}/events', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(Event)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof User.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Event, {
            title: 'NewEventInUser',
            exclude: ['id'],
            optional: ['userId']
          }),
        },
      },
    }) event: Omit<Event, 'id'>,
  ): Promise<Event> {
    return this.userRepository.userEvent(id).create(event);
  }

  @patch('/users/{id}/events', {
    responses: {
      '200': {
        description: 'User.Event PATCH success count',
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
    return this.userRepository.userEvent(id).patch(event, where);
  }

  @del('/users/{id}/events', {
    responses: {
      '200': {
        description: 'User.Event DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Event)) where?: Where<Event>,
  ): Promise<Count> {
    return this.userRepository.userEvent(id).delete(where);
  }
}
