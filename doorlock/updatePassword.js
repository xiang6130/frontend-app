import React from 'react';
import {Dialog, Button} from '@rneui/themed';
import {
  TextInput,
  View,
  StyleSheet,
  ToastAndroid,
  Text,
  Alert,
} from 'react-native';
import axios from 'axios';
import {Actions} from 'react-native-router-flux';
const UpdatePassword = porps => {
  const {closeWindon, token} = porps;
  const [newpassword, setNewpassword] = React.useState('');
  const [checkpassword, setCheckpassword] = React.useState('');
  const url = 'http://10.0.2.2/final3/blog/public/updatepassword';
  const check1 = () => {
    checkpassword === newpassword
      ? (axios
          .put(
            url,
            {password: newpassword},
            {
              headers: {
                jwtToken: token,
              },
            },
          )
          .then(response => {
            Alert.alert('密碼修改成功,請重新登入', ToastAndroid.SHORT);
            Actions.Login();
          })
          // 舊密碼輸入正確
          .catch(error => {
            error.response.status === 401
              ? (Alert.alert('Token已過期，請重新登入'), Actions.Login())
              : console.error('Error:', error);
          }),
        closeWindon())
      : ToastAndroid.show('密碼錯誤', ToastAndroid.SHORT);
  };
  return (
    <View>
      <Text>請輸入新密碼</Text>
      <TextInput
        style={styles.inPutText}
        onChangeText={text => setNewpassword(text)}
        value={newpassword}
        underlineColorAndroid="transparent"
        placeholder="請輸入新密碼"
        placeholderTextColor="#ccc"
        autoCapitalize="none"
        returnKeyType="next"
        secureTextEntry={true}
      />
      <Text>確認新密碼</Text>
      <TextInput
        style={styles.inPutText}
        onChangeText={text => setCheckpassword(text)}
        value={checkpassword}
        underlineColorAndroid="transparent"
        placeholder="請再次輸入新密碼"
        placeholderTextColor="#ccc"
        autoCapitalize="none"
        returnKeyType="next"
        secureTextEntry={true}
      />
      <View style={{flexDirection: 'row'}} justifyContent="flex-end">
        <Button title={'取消'} onPress={closeWindon} type="clear" />
        <Button title={'確認'} onPress={check1} type="clear" />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  InPutTitle: {
    textAlign: 'right', // 標題文字置中
    fontSize: 26, // 標題文字大小
    fontWeight: 'bold', // 標題文字粗細
    paddingVertical: 10, // 上下垂直內聚大小
    color: 'black',
  },

  inPutText: {
    textAlign: 'left', // 標題文字置中
    fontSize: 26, // 標題文字大小
    paddingVertical: 10, // 上下垂直內聚大小
    marginRight: 10,
    color: 'black',
  },
});
export default UpdatePassword;
