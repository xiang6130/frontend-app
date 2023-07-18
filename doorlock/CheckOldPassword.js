import React from 'react';
import {Dialog, Button} from '@rneui/themed';
import {TextInput, View, StyleSheet, ToastAndroid, Text} from 'react-native';

const CheckOldPassword = porps => {
  const {closeWindon, password, openUpdate} = porps;
  const [oldpassword, setOldpassword] = React.useState('');
  const check1 = () => {
    oldpassword === password
      ? (closeWindon(), openUpdate())
      : ToastAndroid.show('密碼錯誤', ToastAndroid.SHORT);
  };
  return (
    <View>
      <Text>請輸入舊密碼</Text>
      <TextInput
        style={styles.inPutText}
        onChangeText={text => setOldpassword(text)}
        value={oldpassword}
        underlineColorAndroid="transparent"
        placeholder="請輸入密碼"
        placeholderTextColor="#ccc"
        autoCapitalize="none"
        returnKeyType="next"
        secureTextEntry={true}
      />
      <Button
        title={'下一步'}
        onPress={check1}
        type="clear"
        containerStyle={{alignItems: 'flex-end'}}
      />
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
export default CheckOldPassword;
