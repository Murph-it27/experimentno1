import React, {useState} from 'react';
import {Button,View,Text} from 'react-native';
const MyButton = () => {
    const [message,setMessage]= useState("");

    const handlePress = () =>{
        setMessage('Button was pressed!');
    };

    return (
        <View>
            <Button title ="Click me"
            onPress={handlePress} />
            <Text>{message}</Text>
        </View>
    );
};
export default MyButton;