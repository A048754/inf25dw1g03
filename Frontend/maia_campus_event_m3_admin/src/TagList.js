import {
  List,
  Datagrid,
  TextField,
  NumberField, 
  EditButton, Edit,
  TextInput,SimpleForm,
} from "react-admin";

export const TagList = (props) => (
  <List {...props}>
    <Datagrid >
      <NumberField source="id" />
      <TextField source="name" />
      <EditButton/>
    </Datagrid>
  </List>
);
 




export const TagEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="name" />
    </SimpleForm>
  </Edit>
);
 