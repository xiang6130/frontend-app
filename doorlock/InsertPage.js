import React from 'react';
import {Button, Icon} from '@rneui/themed';
import {
  KeyboardAvoidingView,
  TextInput,
  View,
  StyleSheet,
  ToastAndroid,
  Text,
  ScrollView,
  Alert,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import axios from 'axios';
import {Actions} from 'react-native-router-flux';

const InsertPage = porps => {
  const {token, roomID, close, getAllBooking} = porps;

  const [purpose, setPurpose] = React.useState('');
  const fixTimezone = a => {
    const fix = a;
    fix.setHours(a.getHours() - a.getTimezoneOffset() / 60);
    return fix;
  };
  const [startdate, setStartDate] = React.useState(fixTimezone(new Date()));
  const [overdate, setOverDate] = React.useState(fixTimezone(new Date()));
  const fixTimezoneOffset = a => {
    const fix = a;
    fix.setHours(a.getHours() + a.getTimezoneOffset() / 60);
    let fix2 = gettime(fix);
    return fix2;
  };
  const gettime = data => {
    let value =
      data.getFullYear() +
      '-' +
      checkTime(data.getMonth() + 1) +
      '-' +
      checkTime(data.getDate()) +
      '-' +
      checkTime(data.getHours()) +
      '-' +
      checkTime(data.getMinutes()) +
      '-' +
      checkTime(data.getSeconds());
    return value;
  };
  const checkTime = i => {
    if (i < 10) {
      i = '0' + i;
    }
    return i;
  };
  const insertBtn = () => {
    const url = 'http://10.0.2.2/final3/blog/public/newBooking';
    // 將前端資料傳送到後端
    axios
      .post(
        url,
        {
          space_id: roomID,
          purpose: purpose,
          start_datetime: fixTimezoneOffset(startdate),
          over_datetime: fixTimezoneOffset(overdate),
        },
        {
          headers: {
            // 確認權限
            jwtToken: token,
          },
        },
      )
      .then(response => {
        console.log(response['data'].status);
        if (response.data.status === 208) {
          ToastAndroid.show(
            '新增失敗，起始時間不可早於當前時間',
            ToastAndroid.SHORT,
          );
        } else if (response.data.status === 204) {
          ToastAndroid.show('新增失敗，預約時間衝突', ToastAndroid.SHORT);
        } else if (response.data.status === 206) {
          ToastAndroid.show(
            '新增失敗，結束時間在開始時間之前',
            ToastAndroid.SHORT,
          );
        } else {
          ToastAndroid.show('新增成功', ToastAndroid.SHORT);

          getAllBooking();
          close();
        }
      })
      .catch(error => {
        error.response.status === 401
          ? (Alert.alert('Token已過期，請重新登入'), Actions.Login())
          : ToastAndroid.show('新增失敗', ToastAndroid.SHORT);
      });
  };

  return (
    <ScrollView
      style={styles.modalContainer}
      contentContainerStyle={{alignItems: 'center'}}>
      <KeyboardAvoidingView behavior="padding">
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={styles.InPutTitle}>新增預約</Text>
          <Icon
            name="close"
            type="font-awesome"
            containerStyle={{
              justifyContent: 'center',
              marginLeft: 30,
            }}
            onPress={() => close()}
          />
        </View>
        <Text>開始時間</Text>
        <DatePicker
          locale="zh-tw"
          date={startdate}
          onDateChange={setStartDate}
          minuteInterval={30}
          androidVariant="nativeAndroid"
          format="YYYY-MM-DD HH:mm"
          minimumDate={fixTimezone(new Date())}
        />
        <Text>結束時間</Text>
        <DatePicker
          locale="zh-tw"
          date={overdate}
          onDateChange={setOverDate}
          minuteInterval={30}
          androidVariant="nativeAndroid"
          format="YYYY-MM-DD HH:mm"
          minimumDate={startdate}
        />
        <Text>使用目的</Text>
        <TextInput
          onChangeText={text => setPurpose(text)}
          value={purpose}
          style={styles.inPutText}
          placeholder=""
          textAlign="left"
          textAlignVertical="top"
          fontsize={20}
        />
      </KeyboardAvoidingView>
      <Button title={'送出'} onPress={insertBtn} />
    </ScrollView>
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
    fontSize: 14, // 標題文字大小
    paddingVertical: 10, // 上下垂直內聚大小
    marginRight: 10,
    color: 'black',
    borderWidth: 2,
    borderRadius: 10,
  },
  modalContainer: {
    flex: 1,

    marginTop: 120,
    backgroundColor: '#FFFFFF',
    borderRadius: 3,
    shadowColor: 'gray',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    padding: 3,
  },
});
export default InsertPage;
