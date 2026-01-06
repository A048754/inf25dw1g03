import {
  List,
  Datagrid,
  TextField,
  EmailField,
  NumberField,
  Edit,
  EditButton,
  SimpleForm,
  TextInput,
  
  
} from "react-admin"; 

export const UserList = (props) => (
  <List {...props}>
    <Datagrid >
        <NumberField source="id" />
        <TextField source="name" />
        <EmailField source="email" />
        <TextField source="password" />
        <TextField source="role" />
      <EditButton/>
    </Datagrid>
  </List>
);

export const UserEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="email" />
      <TextInput source="password" />
      <TextInput source="role" />
    </SimpleForm>
  </Edit>
);