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
  Tag,
  Event,
} from '../models';
import {TagRepository} from '../repositories';

export class TagEventController {
  constructor(
    @repository(TagRepository) protected tagRepository: TagRepository,
  ) { }

  @get('/tags/{id}/events', {
    responses: {
      '200': {
        description: 'Array of Tag has many Event',
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
    return this.tagRepository.tagEvent(id).find(filter);
  }

  @post('/tags/{id}/events', {
    responses: {
      '200': {
        description: 'Tag model instance',
        content: {'application/json': {schema: getModelSchemaRef(Event)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Tag.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Event, {
            title: 'NewEventInTag',
            exclude: ['id'],
            optional: ['tagId']
          }),
        },
      },
    }) event: Omit<Event, 'id'>,
  ): Promise<Event> {
    return this.tagRepository.tagEvent(id).create(event);
  }

  @patch('/tags/{id}/events', {
    responses: {
      '200': {
        description: 'Tag.Event PATCH success count',
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
    return this.tagRepository.tagEvent(id).patch(event, where);
  }

  @del('/tags/{id}/events', {
    responses: {
      '200': {
        description: 'Tag.Event DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Event)) where?: Where<Event>,
  ): Promise<Count> {
    return this.tagRepository.tagEvent(id).delete(where);
  }
}
