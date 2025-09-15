import React from 'react';
import {Image} from 'react-native';
const MyImage = () => {
    return(
        <Image
        source={require('../assets/favicon.png')}
        style={{width:100,height:100}}
        />
    );
};
export default MyImage;