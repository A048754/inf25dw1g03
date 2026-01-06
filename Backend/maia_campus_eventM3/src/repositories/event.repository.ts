import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Event, EventRelations, Booking} from '../models';
import {BookingRepository} from './booking.repository';

export class EventRepository extends DefaultCrudRepository<
  Event,
  typeof Event.prototype.id,
  EventRelations
> {

  public readonly eventbooking: HasManyRepositoryFactory<Booking, typeof Event.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('BookingRepository') protected bookingRepositoryGetter: Getter<BookingRepository>,
  ) {
    super(Event, dataSource);
    this.eventbooking = this.createHasManyRepositoryFactoryFor('eventbooking', bookingRepositoryGetter,);
    this.registerInclusionResolver('eventbooking', this.eventbooking.inclusionResolver);
  }
}
