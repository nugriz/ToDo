import 'react-native-gesture-handler';
import React, { createContext } from 'react';
import { useContext } from 'react';
import {
  SafeAreaView,
  Button,
  TextInput,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableHighlight
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

// mulai dari sini buat strogae global biar bisa dipake banyak komponen

const TodoserContext = createContext(null)

const TodoserProvider = ({ children }) => {
  const [todos, setTodos] = React.useState([
    {
      text: "Learn about React",
      isCompleted: false
    },
    {
      text: "Meet friend for lunch",
      isCompleted: false
    },
    {
      text: "Build really cool todo app!",
      isCompleted: false
    }
  ]);
  return (
    <TodoserContext.Provider value={{ todos, setTodos }}>
      {children}
    </TodoserContext.Provider>
  )
}

// mulai dari sini buat halaman yang tugasnya belum dikerjakan ya, oke

function Todo({ todo, index, completeTodo, removeTodo }) {

  if (!todo.isCompleted) {
   return (
    <View style={{
      flex: 1,
      flexDirection: 'row',
      alignItems: 'stretch',
      padding: 5
    }}>
      <View style={{ width: 200 , padding: 5}}>
      <Text style={{ textDecorationLine: todo.isCompleted ? "line-through" : "none" }}>
            {todo.text}
      </Text>
      </View>
      <View style={{ backgroundColor: "green" , width: 70 , padding: 5 , margin: 5 , borderRadius: 5}}>
        <TouchableHighlight underlayColor={"purple"} onPress={() => completeTodo(index)}>
          <Text>Complete</Text>
        </TouchableHighlight>
      </View>
      <View style={{ backgroundColor: "red" , padding: 5, margin: 5 , borderRadius: 5}}>
        <TouchableHighlight onPress={() => removeTodo(index)}>
          <Text>X</Text>
        </TouchableHighlight>
      </View>
    </View>
  );} else {
    return (
    <View></View>
  );
  }
}

function TodoForm({ addTodo }) {
  const [value, setValue] = React.useState("Tuliskan Tugasmu disini!");

  const handleSubmit = () => {

    if (!value) return;
    addTodo(value);
    setValue("Tuliskan Tugasmu disini!");
  };

  return (
    <View style={{ padding: 5}}>
    <TextInput 
        onSubmitEditing={handleSubmit}
        value={value}
        onChangeText={value => setValue(value)}
    />
    </View>
  );
}

function Main() {
  const { todos, setTodos } = useContext(TodoserContext)

  const addTodo = text => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  };

  const completeTodo = (index,text) => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = true;
    setTodos(newTodos);
  };

  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <ScrollView>
      <View>
        {todos.map((todo, index) => (
          <Todo
            key={index}
            index={index}
            todo={todo}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
          />
        ))}
        <TodoForm addTodo={addTodo} />
      </View>
    </ScrollView>
  );}

// mulai dari sini buat halaman yang tugasnya udah dikerjakan ya

function DoneTodo({ todo, index, removeTodo }) {
  if(todo.isCompleted){
    return (
      <View style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'stretch',
        padding: 5
      }}>
        <View style={{ backgroundColor: "green" , padding: 5, margin: 5 , borderRadius: 5}}>
        <Text style={{ textDecorationLine: todo.isCompleted ? "line-through" : "" }}>
              {todo.text}
        </Text>
        </View>
        <View style={{ backgroundColor: "red" , padding: 5, margin: 5 , borderRadius: 5}}>
          <TouchableHighlight onPress={() => removeTodo(index)}>
            <Text>X</Text>  
          </TouchableHighlight>
        </View>
      </View>
    );}else{
      return(<View></View>)
    }
}


function Done(){
  const { todos, setTodos } = useContext(TodoserContext)

  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };
  return (
    <ScrollView>
      <View>
        {todos.map((todo, index) => (
          <DoneTodo
            key={index}
            index={index}
            todo={todo}
            removeTodo={removeTodo}
          />
        ))}
      </View>
    </ScrollView>
  );
}

// mulai dari sini buat bikin tombol navigasi yang di bawah ya

const Tab = createBottomTabNavigator();

function App() {
  return(
  <TodoserProvider>
    <NavigationContainer>
      <StatusBar backgroundColor = "purple"/>
    
      <Tab.Navigator tabBarOptions =  {{
  activeTintColor: '#e91e63',
  labelStyle: {
    fontSize: 50
  },
  style: {
    backgroundColor: 'black',
    height: 100
  },
}}> 
          <Tab.Screen name="To-Do" component={Main} />
          <Tab.Screen name="Done" component={Done} />
      </Tab.Navigator>
      
    </NavigationContainer>
  </TodoserProvider>
  );
}
export default App;
