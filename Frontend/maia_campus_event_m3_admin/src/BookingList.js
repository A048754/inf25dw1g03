import {
  List,
  Datagrid,
  TextField,
  NumberField,
  ReferenceField,
  EditButton, Edit, SimpleForm,
  TextInput, NumberInput, ReferenceInput, SelectInput, useRecordContext, Filter
} from "react-admin";

const PostTitle = () => {
  const record = useRecordContext();
  return record ? (<span> Booking {`"${record.id}"`}</span>):null
}

const BookingFilter = (props) => (
  <Filter {...props}>
    <ReferenceInput
      label="Event"
      source="eventId"
      reference="events"
      allowEmpty
    >
      <SelectInput optionText="title" />
    </ReferenceInput>
  </Filter>
);

export const BookingList = (props) => (
  <List filters={<BookingFilter/>}{...props}>
    <Datagrid>
      <NumberField source="id" />

      <ReferenceField source="eventId" reference="events">
        <TextField source="title" />
      </ReferenceField>

      <TextField source="created_at" />
      <EditButton />
    </Datagrid>
  </List>
);

export const BookingEdit = (props) => (
  <Edit title={<PostTitle/>}{...props}>
    <SimpleForm>
      <ReferenceInput source="eventId" reference="events">
        <SelectInput optionText="title" />
      </ReferenceInput>

      <TextInput source="created_at" />
    </SimpleForm>
  </Edit>
);