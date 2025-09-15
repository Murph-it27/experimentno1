import React, {useState} from 'react';
import {View,Text,TextInput,Button} from 'react-native';
const App =() => {
  const [num1,setNum1] = useState('');
  const [num2,setNum2] = useState('');
  const [result,setResult] = useState('');

  const handleOperation = (operation: string) =>{
    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);
     if (isNaN(n1) || isNaN(n2)) {
      setResult('Please enter valid numbers');
      return;
     }
     switch(operation){
      case '+':
        setResult((n1+n2).toString());
        break;
      case '-':
        setResult((n1-n2).toString());
        break;
      case '*':
        setResult((n1*n2).toString());
        break;
      case '/':
        if (n2==0){
          setResult('Cannot divide by Zero.')
        } else{
          setResult((n1/n2).toString());
        }
        break;
     }
  };
  return(
    <View style={{ padding:20}}>
      <TextInput 
      placeholder="Enter first number"
      keyboardType="numeric"
      value={num1}
      onChangeText={setNum1} 
      style={{borderWidth:1,marginBottom:10,padding:5}}
      />
      <TextInput 
      placeholder="Enter second number"
      keyboardType="numeric"
      value={num2}
      onChangeText={setNum2} 
      style={{borderWidth:1,marginBottom:10,padding:5}}
      />

      <Button title = "Add" onPress={() => handleOperation ('+')}/>
      <Button title = "Subtract" onPress={() => handleOperation ('-')}/>
      <Button title = "Multiply" onPress={() => handleOperation ('*')}/>
      <Button title = "Divide" onPress={() => handleOperation ('/')}/>

        <Text style={{ marginTop:20,fontSize:18}}>
          Result: {result}
        </Text>
        
    </View>
  );
};
export default App;
