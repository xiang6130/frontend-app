/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  ToastAndroid,
  Alert,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import RNPickerSelect from 'react-native-picker-select';
import Selecter from './Selecter';
import {Button} from '@rneui/base';
import axios from 'axios';
import Toast from 'react-native-toast-message';

const UselessTextInput = props => {
  return <TextInput {...props} editable maxLength={200} />;
};

const report = props => {
  const [reportText, setReportText] = useState('');
  const [roomID, setroomID] = useState('');

  const SelectRoom = ID => {
    setroomID(ID);
    console.log(roomID);
  };

  const reportButton = () => {
    const url = 'http://10.0.2.2/final3/blog/public/newReport';
    // 將前端資料傳送到後端
    axios
      .post(
        url,
        {
          space_id: roomID,
          content: reportText,
        },
        {
          headers: {
            // 確認權限
            jwtToken: props.token,
          },
        },
      )
      .then(response => {
        console.log(response['data']);
        ToastAndroid.show('回報成功', ToastAndroid.SHORT);
        setReportText('');
      })
      .catch(error => {
        error.response.status === 401
          ? (Alert.alert('Token已過期，請重新登入'), Actions.Login())
          : ToastAndroid.show('回報失敗', ToastAndroid.SHORT);
      });
  };
  return (
    <View style={styles.container}>
      <Selecter token={props.token} selectRoom={SelectRoom} />
      <Text style={styles.text}>回報狀況：</Text>
      <View style={{borderWidth: 1.5, margin: 8, borderRadius: 5}}>
        <UselessTextInput
          multiline
          numberOfLines={4}
          onChangeText={text => setReportText(text)}
          value={reportText}
          style={styles.inputText}
          placeholder="回報說明"
          textAlign="left"
          textAlignVertical="top"
          fontsize={20}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignContent: 'center',
          justifyContent: 'center',
        }}>
        <Button
          title="送出"
          containerStyle={{
            width: 200,
            marginHorizontal: 50,
            marginVertical: 10,
          }}
          onPress={reportButton}
        />
      </View>
    </View>
  );
};
export default report;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
  },
  inputText: {
    fontSize: 30,
    //fontWeight: 'bold',
    color: 'black',
  },
});
