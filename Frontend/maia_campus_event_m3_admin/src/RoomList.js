import {
  List,
  Datagrid,
  TextField,
  NumberField, NumberInput,
  EditButton, Edit,
  TextInput,SimpleForm,
} from "react-admin";

export const RoomList = (props) => (
  <List {...props}>
    <Datagrid>
      <NumberField source="id" />
      <TextField source="name" />
      <NumberField source="capacity" />
      <TextField source="building" />
      <TextField source="description" />
      <EditButton/>
    </Datagrid>
  </List>
);

export const RoomEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source = "name"/>
      <NumberInput source="capacity" />
      <TextInput source="building" />
      <TextInput source="description" />
    </SimpleForm>
  </Edit>
);