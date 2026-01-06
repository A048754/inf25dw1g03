import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Tag, TagRelations, Event} from '../models';
import {EventRepository} from './event.repository';

export class TagRepository extends DefaultCrudRepository<
  Tag,
  typeof Tag.prototype.id,
  TagRelations
> {

  public readonly tagEvent: HasManyRepositoryFactory<Event, typeof Tag.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('EventRepository') protected eventRepositoryGetter: Getter<EventRepository>,
  ) {
    super(Tag, dataSource);
    this.tagEvent = this.createHasManyRepositoryFactoryFor('tagEvent', eventRepositoryGetter,);
    this.registerInclusionResolver('tagEvent', this.tagEvent.inclusionResolver);
  }
}
