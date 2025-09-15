import React from 'react';
import {View,Text} from 'react-native';
const MyContainer = () =>{
    return (
        <View>
            <Text>This is reusable container</Text>
            <Text style={{color:'blue',fontSize:50,fontStyle:'italic',fontFamily:''}}>Hello World!</Text>
        </View>
    );
};
export default MyContainer;