/*export const EventList = (props) => (
  <List {...props}>
    <Datagrid >
      <NumberField source="id" />
      <TextField source="title" />
      <TextField source="description" />
      <TextField source="start_datetime" />
      <TextField source="end_datetime" />

      <ReferenceField source="roomId" reference="rooms">
        <TextField source="name" />
      </ReferenceField>

      <ReferenceField source="tagId" reference="tags">
        <TextField source="name" />
      </ReferenceField>

      <ReferenceField source="userId" reference="users">
        <TextField source="name" />
      </ReferenceField>
      <EditButton/>
    </Datagrid>
  </List>
);*/


/*import {
  List,
  Datagrid,
  TextField,
  NumberField,
  ReferenceField,
  EditButton, Edit, SimpleForm,
  TextInput, NumberInput, ReferenceInput, SelectInput*/
//} from "react-admin";


import {List, Datagrid, TextField, NumberField, 
 ReferenceField, EditButton, Edit, SimpleForm, TextInput,
 ReferenceInput, SelectInput, useRecordContext, Filter }
from "react-admin";


const PostTitle = () => {
  const record = useRecordContext();
  return record ? (<span> Event: {`"${record.title}"`}</span>):null
}

const EventFilter = (props) => (
  <Filter {...props}>
    {/*Búsqueda por campo propio del Event */}
    <TextInput label="Search" source="title" alwaysOn />

    {/*Filtro por relación: User */}
    <ReferenceInput label="User" source="userId" reference="users" allowEmpty>
      <SelectInput optionText="name" />
    </ReferenceInput>

    {/* Filtro por relación: Room */}
    <ReferenceInput label="Room" source="roomId" reference="rooms" allowEmpty>
      <SelectInput optionText="name" />
    </ReferenceInput>

    {/*Filtro por relación: Tag */}
    <ReferenceInput label="Tag" source="tagId" reference="tags" allowEmpty>
      <SelectInput optionText="name" />
    </ReferenceInput>
  </Filter>
);


export const EventList = (props) => (
  <List filters={<EventFilter/>}{...props}>
    <Datagrid>
      <NumberField source="id" />
      <TextField source="title" />
      <TextField source="description" />
      <TextField source="start_datetime" />
      <TextField source="end_datetime" />

      <ReferenceField source="roomId" reference="rooms">
        <TextField source="name" />
      </ReferenceField>

      <ReferenceField source="tagId" reference="tags">
        <TextField source="name" />
      </ReferenceField>

      <ReferenceField source="userId" reference="users">
        <TextField source="name" />
      </ReferenceField>

      <EditButton />
    </Datagrid>
  </List>
);


export const EventEdit = (props) => (
  <Edit title={<PostTitle/>} {...props}>
    <SimpleForm>
      <TextInput source="title" />
      <TextInput source="description" />
      <TextInput source="start_datetime" />
      <TextInput source="end_datetime" />

      <ReferenceInput source="roomId" reference="rooms">
        <SelectInput optionText="name" />
      </ReferenceInput>

      <ReferenceInput source="tagId" reference="tags">
        <SelectInput optionText="name" />
      </ReferenceInput>

      <ReferenceInput source="userId" reference="users">
        <SelectInput optionText="name" />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);
