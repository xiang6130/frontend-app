import React, {useState} from 'react';
import {View, StyleSheet, Alert, ToastAndroid} from 'react-native';
import {Tab, TabView, Icon} from '@rneui/themed';
import Recorded from './Recorded';
import Recording from './Recording';
import {color} from 'react-native-reanimated';
import axios from 'axios';
import {Actions, ActionConst} from 'react-native-router-flux';

let date = new Date();
let today =
  date.getFullYear() +
  '-' +
  String(date.getMonth() + 1).padStart(2, '0') +
  '-' +
  String(date.getDate()).padStart(2, '0') +
  ' ' +
  String(date.getHours()).padStart(2, '0') +
  ':' +
  String(date.getMinutes()).padStart(2, '0') +
  ':' +
  String(date.getSeconds()).padStart(2, '0');

const Records = porps => {
  const [records, setRecords] = useState([]);
  const [index, setIndex] = React.useState(0);
  const getAllBooking = () => {
    const url = 'http://10.0.2.2/final3/blog/public/getAllBooking';
    axios
      .get(url, {
        headers: {
          jwtToken: porps.token,
        },
      })
      .then(response => {
        setRecords(response['data']['result']);
        console.log(response.data.result);
      })
      .catch(error => {
        error.response.status === 401
          ? (Alert.alert('Token已過期，請重新登入'), Actions.Login())
          : console.error('Error:', error);
      });
  };
  React.useEffect(() => {
    getAllBooking();
  }, []);
  const recording = records.filter(data => data.start_datetime > today);
  const history = records.filter(data => data.start_datetime < today);
  return (
    <View style={{flex: 1}}>
      <Tab value={index} onChange={e => setIndex(e)} variant="primary">
        <Tab.Item
          title="已預約"
          titleStyle={active => ({
            color: active ? 'black' : 'gray',
            fontSize: 20,
          })}
          buttonStyle={active => ({
            backgroundColor: active ? 'pink' : undefined,
          })}
          icon={{
            color: 'black',
            name: 'calendar-check-o',
            type: 'font-awesome',
            size: 40,
          }}
        />
        <Tab.Item
          title="歷史紀錄"
          titleStyle={active => ({
            color: active ? 'black' : 'gray',
            fontSize: 20,
          })}
          buttonStyle={active => ({
            backgroundColor: active ? 'pink' : undefined,
          })}
          icon={{
            color: 'black',
            name: 'calendar-multiple-check',
            type: 'material-community',
            size: 40,
          }}
        />
      </Tab>
      <TabView value={index} onChange={setIndex}>
        <TabView.Item>
          <Recorded
            recording={recording}
            token={porps.token}
            getAllBooking={getAllBooking}
          />
        </TabView.Item>
        <TabView.Item>
          <Recording recorded={history} />
        </TabView.Item>
      </TabView>
    </View>
  );
};
const styles = StyleSheet.create({
  tabs: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});
export default Records;
