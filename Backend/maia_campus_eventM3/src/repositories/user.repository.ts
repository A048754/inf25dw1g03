import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Event, User, UserRelations} from '../models';
import {EventRepository} from './event.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {

  public readonly userEvent: HasManyRepositoryFactory<Event, typeof User.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('EventRepository') protected eventRepositoryGetter: Getter<EventRepository>,
  ) {
    super(User, dataSource);
    this.userEvent = this.createHasManyRepositoryFactoryFor('userEvent', eventRepositoryGetter,);
    this.registerInclusionResolver('userEvent', this.userEvent.inclusionResolver);
  }
}
