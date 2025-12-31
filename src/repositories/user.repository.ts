import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {User, UserRelations, Event} from '../models';
import {EventRepository} from './event.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {

  public readonly userEvent: HasManyRepositoryFactory<Event, typeof User.prototype.id>;

  public readonly UserRepository: HasManyRepositoryFactory<Event, typeof User.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('EventRepository') protected eventRepositoryGetter: Getter<EventRepository>,
  ) {
    super(User, dataSource);
    this.UserRepository = this.createHasManyRepositoryFactoryFor('UserRepository', eventRepositoryGetter,);
    this.registerInclusionResolver('UserRepository', this.UserRepository.inclusionResolver);
    this.userEvent = this.createHasManyRepositoryFactoryFor('userEvent', eventRepositoryGetter,);
    this.registerInclusionResolver('userEvent', this.userEvent.inclusionResolver);
  }
}
