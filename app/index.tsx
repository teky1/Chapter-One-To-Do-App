import { useState } from "react";
import { Button, Pressable, Text, View, StyleSheet, SectionList, TextInput, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {

  const [tasks, setTasks] = useState([
    {
      title: "Active",
      data: ["This is task 1", "This is task 2"]
    },
    {
      title: "Completed",
      data: ["This is completed 1", "This is completed 2"]
    },
  ]);

  const [inpValue, setInpValue] = useState("");

  const markCompleted = (id : number, section : string) => {

    let selectedTask = tasks[0].data[id];
    setTasks((prev) => {
      let newActive = prev[0].data.filter((val, index)=>(index != id));
      let newCompleted = [...prev[1].data, selectedTask];

      return [{...prev[0], data: newActive}, {...prev[1], data: newCompleted}];
    });
  }

  const createTask = (task : string) => {

    task = task.trim()
    if (task == "") return;

    setTasks((prev) => {
      return [{...prev[0], data: [...prev[0].data, task]}, prev[1]];
    });
  }

  const removeTask = (id : number, section : string) => {

    setTasks((prev) => {
      let index = (section == "Active") ? 0 : 1;
      let newData = prev[index].data.filter((val, index)=>(index != id));
      
      if(index == 0) {
        return [{...prev[0], data: newData}, prev[1]];
      }
      return [prev[0], {...prev[1], data: newData}];
    });

  }

  return (
    <SafeAreaView style={styles.container}>
      <SectionList
        sections={tasks}
        renderItem={({item, section, index}) => (
          <View style={(section.title=="Active") ? 
            [styles.taskActive] : [styles.taskActive, styles.taskInactive]}>
            
            <Text style={styles.taskText}>{item}</Text>

            <Pressable onPress={()=>removeTask(index, section.title)}>
              <Text style={styles.deleteButton}>×</Text>
            </Pressable>
          </View>
        )}
        renderSectionHeader={({ section }) => (
          <Text style={styles.sectionHeader}>{section.title}</Text>
        )}
        style={styles.taskList}
        stickySectionHeadersEnabled={false}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TextInput
          style={styles.input}
          onChangeText={(text)=>setInpValue(text)}
          value={inpValue}
          placeholder="Write your new tasks here..."
          placeholderTextColor="#999999"
        />
        <Pressable 
        style={({pressed})=>(
          (pressed) ? [styles.addButton, styles.addButtonPressed] : [styles.addButton,]
        )}
        onPress={()=>{
          createTask(inpValue);
          setInpValue("");
        }}
      >
        <Text style={styles.newTaskText}>Add Task</Text>
      </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

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
    marginLeft: 10
  },
  taskText: {
    flex: 5,
    color: "#444444"
  },
  taskList: {
    borderBottomWidth: 1,
    borderColor: "#BBBBBB"
  },
  sectionHeader: {
    fontWeight: "800",
    fontSize: 25,
    padding: 15,
    textAlign: "center"
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


