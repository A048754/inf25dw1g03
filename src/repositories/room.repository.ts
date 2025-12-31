import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Room, RoomRelations, Event} from '../models';
import {EventRepository} from './event.repository';

export class RoomRepository extends DefaultCrudRepository<
  Room,
  typeof Room.prototype.id,
  RoomRelations
> {

  public readonly room: HasManyRepositoryFactory<Event, typeof Room.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('EventRepository') protected eventRepositoryGetter: Getter<EventRepository>,
  ) {
    super(Room, dataSource);
    this.room = this.createHasManyRepositoryFactoryFor('room', eventRepositoryGetter,);
    this.registerInclusionResolver('room', this.room.inclusionResolver);
  }
}
