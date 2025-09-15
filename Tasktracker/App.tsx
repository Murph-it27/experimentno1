import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";

const App = () => {
  const [task, setTask] = useState('');
  const [category, setCategory] = useState('Personal');
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [tasks, setTasks] = useState<{ id: number, task: string, category: string, dueDate: Date | null }[]>([]);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  // Function to handle task addition
  const addTask = () => {
    if (task.trim() === '' || !dueDate) {
      alert('Please enter a task and select a due date/time');
      return;
    }

    const newTask = { 
      id: Date.now(),
      task, 
      category, 
      dueDate 
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setTask(''); // Clear input field
    setDueDate(null); // Clear selected date
  };

  // Handle date selection
  const handleDateConfirm = (date: Date) => {
    setDueDate(date);
    setDatePickerVisible(false);
  };

  // Render each task item
  const renderTaskItem = ({ item }: { item: { task: string, category: string, dueDate: Date | null } }) => (
    <View style={styles.taskItem}>
      <Text>{item.task} ({item.category})</Text>
      <Text>Due: {item.dueDate ? item.dueDate.toLocaleString() : 'Not set'}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter task"
        value={task}
        onChangeText={setTask}
        style={styles.input}
      />
      
      <TextInput
        placeholder="Category"
        value={category}
        onChangeText={setCategory}
        style={styles.input}
      />
      
      <TouchableOpacity onPress={() => setDatePickerVisible(true)} style={styles.button}>
        <Text style={styles.buttonText}>Select Due Date & Time</Text>
      </TouchableOpacity>

      <Button title="Add Task" onPress={addTask} />

      <FlatList
        data={tasks}
        renderItem={renderTaskItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.taskList}
      />

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleDateConfirm}
        onCancel={() => setDatePickerVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  button: {
    padding: 10,
    backgroundColor: '#00BFFF',
    marginBottom: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  taskList: {
    marginTop: 20,
  },
  taskItem: {
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
});

export default App;
