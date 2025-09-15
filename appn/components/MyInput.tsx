import React, {useState} from 'react';
import {TextInput,View,Text} from 'react-native';

const MyInput =() => {
    const[text,setText]= useState("");
   
    return(
        <View>
            <Text>Enter something:</Text>
            <TextInput 
             placeholder="Type here"
             value={text}
             onChangeText={setText}
             style={{borderWidth:3,padding:5,marginTop:5}}
             />
             <Text>You typed:{text}</Text>
        </View>
    );
};
export default MyInput;