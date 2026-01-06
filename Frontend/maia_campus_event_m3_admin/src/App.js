import { Admin, Resource } from "react-admin";
import lb4Provider from "react-admin-lb4";

// List & Edit components
import { UserList, UserEdit } from "./UserList";
import { RoomList, RoomEdit } from "./RoomList";
import { EventList, EventEdit } from "./EventList";
import { TagList, TagEdit } from "./TagList";
import { BookingList, BookingEdit } from "./BookingList";

// Icons (Material UI)
import PeopleIcon from "@mui/icons-material/People";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import EventIcon from "@mui/icons-material/Event";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";

const dataProvider = lb4Provider("http://localhost:3005");

export default function App() {
  return (
    <Admin dataProvider={dataProvider}>
      <Resource name="users" list={UserList} edit={UserEdit} icon={PeopleIcon}/>
      <Resource name="rooms" list={RoomList} edit={RoomEdit} icon={MeetingRoomIcon}/>
      <Resource name="events" list={EventList} edit={EventEdit}icon={EventIcon}  />
      <Resource name="tags" list={TagList} edit={TagEdit} icon={LocalOfferIcon} />
      <Resource name="bookings" list={BookingList} edit={BookingEdit} icon={EventAvailableIcon}/>
    </Admin>
  );
}
