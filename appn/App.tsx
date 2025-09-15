import React from 'react';
import {View,Text,StyleSheet} from 'react-native';
import MyContainer from './components/MyContainer';
import MyImage from './components/MyImage';
import Textstyle from './style/Textstyle';
import MyInput from './components/MyInput';
import MyButton from './components/MyButton';
const App = () => {
  return (
    <View>
      <Text> This is the main app.</Text>
      <MyContainer/>{/*Reusing the container*/}
      <MyImage/>
      <MyInput/>
      <MyButton/>
      <Text style={[style.color,style.bold]}>Hello!!!</Text>  
      <Text style={[style.bold,style.base]}>App Development</Text> 
      <Text style={Textstyle.heading}>External Style</Text>
    </View>    
  );
};
//Internal Style
const style= StyleSheet.create({
  color:{
    color:'red',
    fontSize:30,
  },
  base:{
    color:'black',
    fontSize:50,
    fontStyle:'italic',
  },
  bold:{
    fontWeight:'bold',
  },
});

export default App;