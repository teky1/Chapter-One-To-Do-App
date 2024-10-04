import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
    },
    newTaskText: {
      fontSize: 30,
      color: "#FFFFFF",
      fontWeight: "500"
    },
    addButton: {
      backgroundColor: "#5DBB63",
      margin: 10,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      padding: 8
    },
    addButtonPressed: {
      backgroundColor: "#4e9c53"
    },
    taskActive: {
      margin: 8,
      padding: 20,
      borderWidth: 1,
      borderRadius: 10,
      borderColor: "#BBBBBB",
      flexDirection: "row",
      justifyContent: 'center',
      alignItems: 'center',
    },
    taskInactive: {
      backgroundColor: "#E5E5E5",
    },
    deleteButton: {
      color: "#BBBBBB",
      fontSize: 30,
      marginLeft: 10,
    },
    checkIcon: {
      fontSize: 20
    },
    taskText: {
      flex: 5,
      color: "#444444",
      paddingLeft: 16
    },
    taskList: {
      borderBottomWidth: 1,
      borderColor: "#BBBBBB"
    },
    sectionHeader: {
      fontWeight: "800",
      fontSize: 25,
      paddingTop: 15,
      textAlign: "center"
    },
    taskCountText: {
      fontWeight: "300",
      fontSize: 15,
      color: "#888",
      textAlign: "center",
      paddingBottom: 10
    },
    input: {
      margin: 10,
      padding: 15,
      fontSize: 15,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: "#DFDFDF"
    }
  
  });

  export { styles };