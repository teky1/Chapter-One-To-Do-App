import { useState } from "react";
import { Pressable, Text, View, SectionList, TextInput, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FlashMessage, { showMessage } from "react-native-flash-message";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

import { styles } from "./styles";

export default function Index() {

  // State variable that represents entire task list split into Active and Completed
  // Data is specifically formatted to work best with <SectionList>
  const [tasks, setTasks] = useState([
    {
      title: "Active",
      data: ["Do the React Native Tech Screen "] // default active tasks
    },
    {
      title: "Completed",
      data: ["First Chapter One Interview", "Apply to Chapter One",] // default completed tasks
    },
  ]);

  // State variable representing the current state of the input field
  const [inpValue, setInpValue] = useState("");

  // Marks a task in the given section at the given index (id) complete
  const markCompleted = (id : number, section : string) => {

    let selectedTask = tasks[0].data[id]; // Targetted task

    // Updates the task state variable with a new state 
    // where the targetted task is marked completed
    setTasks((prev) => {
      let newActive = prev[0].data.filter((val, index)=>(index != id));
      let newCompleted = [selectedTask, ...prev[1].data];

      return [{...prev[0], data: newActive}, {...prev[1], data: newCompleted}];
    });

    // Displays a flash message to the user confirming 
    // the task has been marked complete
    showMessage({
      message: "Task Completed: \""+selectedTask+"\"",
      type: "success",
      floating: true,
    });
  }

  // Adds a new task to the active section of the list
  const createTask = (task : string) => {

    // Prevents the addition of empty tasks
    task = task.trim()
    if (task == "") return;

    // Updates task state variable to have the new task at the top
    // of the active list
    setTasks((prev) => {
      return [{...prev[0], data: [task, ...prev[0].data]}, prev[1]];
    });

    // Dispalys a flash message to the user confirming
    // that their task was created
    showMessage({
      message: "Task Created: \""+task+"\"",
      type: "info",
      floating: true,
    });
  }

  // Deletes a task in the given section at the given index (id)
  const removeTask = (id : number, section : string) => {

    // Isolates the selected task
    let selectedTask = tasks[(section == "Active") ? 0 : 1].data[id];

    // Updates the tasks state variable to not include the selected task
    setTasks((prev) => {
      let index = (section == "Active") ? 0 : 1;
      let newData = prev[index].data.filter((val, index)=>(index != id));
      
      if(index == 0) {
        return [{...prev[0], data: newData}, prev[1]];
      }
      return [prev[0], {...prev[1], data: newData}];
    });

    // Displays a flash message to the user confirming
    // that the selected task has been deleted
    showMessage({
      message: "Task Deleted: \""+selectedTask+"\"",
      type: "danger",
      floating: true,
    });

  }


  // Returns JSX object for a  task given its contents, section, and index 
  const renderTask = (task:string, section:string, index:number) => {

    return (
      // If task is in the active session, make it so that when it is pressed
      // the task is marked as completed.
      <Pressable
        onPress={() => ((section=="Active") ? markCompleted(index, section) : null)}
      >
        {/* Customize styling based on whether 
        the task is in active or inactive section */}
        <View style={(section=="Active") ? 
          [styles.taskActive] : [styles.taskActive, styles.taskInactive]}>

          <FontAwesomeIcon
            color="#BBBBBB"
            size={20}
            icon={(section=="Active") ? faCircle : faCircleCheck}
          />
          
          <Text style={styles.taskText}>{task}</Text>
          
          {/* Delete button which calls removeTask() on click */}
          <Pressable 
            onPress={()=>removeTask(index, section)}
            hitSlop={20}
          >
            <Text style={styles.deleteButton}>×</Text>
          </Pressable>
        </View>
      </Pressable>
    )

  } 

  return (
    // Safe Area View to prevent content from appearing behind
    // the notch on iOS devices
    <SafeAreaView style={styles.container}>
      {/* Section list displays all tasks in 
      both active and completed sections */}
      <SectionList
        sections={tasks}
        renderItem={({item, section, index}) => (
          renderTask(item, section.title, index) // Employs renderTask() method to display task
        )}
        renderSectionHeader={({ section }) => (
          // Displays section header and includes task count for each section
          <View>
            <Text style={styles.sectionHeader}>{section.title}</Text>
            <Text style={styles.taskCountText}>
              {tasks[(section.title == "Active") ? 0 : 1].data.length} tasks
            </Text>
          </View>
        )}
        style={styles.taskList}
        stickySectionHeadersEnabled={false}
      />

      {/* Prevents keyboard from covering up the input field */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TextInput
          style={styles.input}
          onChangeText={(text)=>setInpValue(text)}
          value={inpValue}
          placeholder="Write your new tasks here..."
          placeholderTextColor="#999999"
          onSubmitEditing={() => {
            // Handles the user hitting enter or return on their keyboard
            // Calls the createTask() method with the inputted task and then clears the input
            createTask(inpValue);
            setInpValue("");
          }}
        />
        <Pressable 
        // Adjusts the color of the add button when its pressed
        style={({pressed})=>(
          (pressed) ? [styles.addButton, styles.addButtonPressed] : [styles.addButton,]
        )}
        onPress={()=>{
          // Handles the user pressing the add task button
          // Calls the createTask() method with the inputted task and then clears the input
          createTask(inpValue);
          setInpValue("");
        }}
      >
        <Text style={styles.newTaskText}>Add Task</Text>
      </Pressable>
      </KeyboardAvoidingView>
 
      {/* Necessary tag for the flash messages to work */}
      <FlashMessage position="top"/>
    </SafeAreaView>
  );
}