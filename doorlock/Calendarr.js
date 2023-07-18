import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Modal,
  ToastAndroid,
  Alert,
  RefreshControl,
} from 'react-native';
import {Button, Dialog, CheckBox, FAB} from '@rneui/themed';
import WeekView from 'react-native-week-view';
import {Actions} from 'react-native-router-flux';
import Selecter from './Selecter';
import axios from 'axios';
import InsertPage from './InsertPage';
import EditPage from './EditPage';

import {defined} from 'react-native-reanimated';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};
const Calendarr = porps => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [roomID, setroomID] = useState(null);
  const [userInfo, setUserInfo] = useState({
    account: '',
    emp_id: '',
    dept_id: '',
    email: '',
    emp_name: '',
    dept_name: '',
    password: '',
  });

  const [selectEvent, setSelectEvent] = useState('');
  const toggleDialog1 = () => {
    roomID === null
      ? ToastAndroid.show('請先選擇空間', ToastAndroid.SHORT)
      : setOpen1(!open1);
  };
  const toggleDialog2 = e => {
    if (e.color === '#5151A2') {
      setSelectEvent(e.id);
      setOpen2(!open2);
    } else {
      ToastAndroid.show('無修改權限，非原預約人', ToastAndroid.SHORT);
    }
  };
  const close = () => {
    setOpen2(!open2);
  };
  const SelectRoom = ID => {
    setroomID(ID);
    //console.log(roomID);
  };
  const [test, setTest] = React.useState([
    {
      id: 1,
      description: 'Event',
      startDate: new Date(2022, 10, 27, 16, 0),
      endDate: new Date(2022, 10, 27, 16, 30),
      color: '#AAAAFF	',
    },
  ]);
  const [allEvent, setAllEvent] = React.useState();
  const getAllEvent = yy => {
    setAllEvent(
      yy.map(a => ({
        booking_id: a.booking_id,
        emp_id: a.emp_id,
        class_name: a.class_name,
        start_datetime: a.start,
        over_datetime: a.end,
        purpose: a.title,
        space_id: roomID,
      })),
    );
  };
  const getEvent = yy => {
    setTest(
      yy.map(a => ({
        id: a.booking_id,
        description: a.title,
        startDate: new Date(a.start),
        endDate: new Date(a.end),
        // eslint-disable-next-line eqeqeq
        color: a.emp_id == userInfo.emp_id ? '#5151A2' : '#FF9D6F',
        //'#7D7DFF',
      })),
    );
  };
  const apiGetBooking = () => {
    const url =
      'http://10.0.2.2/final3/blog/public/getAllAvailableBooking/' + roomID;
    axios
      .get(url, {
        headers: {
          jwtToken: porps.token,
        },
      })
      .then(response => {
        console.log(response['data']['result']);
        getEvent(response['data']['result']);
        getAllEvent(response['data']['result']);
      })
      .catch(error => {
        error.response.status === 401
          ? (Alert.alert('Token已過期，請重新登入'), Actions.Login())
          : console.error('Error:', error);
      });
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    apiGetBooking();
    wait(500).then(() => setRefreshing(false));
  }, []);

  // 顯示各空間預約紀錄
  useEffect(() => {
    apiGetBooking();
    axios
      .get('http://10.0.2.2/final3/blog/public/getUserInfo', {
        headers: {
          // 確認權限rr
          jwtToken: porps.token,
        },
      })
      // 回傳成功
      .then(response => {
        console.log(response['data']);
        // 成功抓取資料並且設定在UserInfo裡
        setUserInfo(response['data']['result'][0]);
      })
      // 回傳錯誤
      .catch(error => {
        error.response.status === 401
          ? (Alert.alert('Token已過期，請重新登入'), Actions.Login())
          : console.error('Error:', error);
      });
  }, [porps.token, roomID]);

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <Selecter token={porps.token} selectRoom={SelectRoom} />
      <WeekView
        events={test}
        selectedDate={new Date()}
        numberOfDays={7}
        timeStep={30}
        startHour={8}
        hoursInDisplay={12}
        beginAgendaAt={8 * 60}
        endAgendaAt={22 * 60}
        onEventPress={events => {
          toggleDialog2(events);
        }}
        eventContainerStyle={{borderRadius: 3, paddingLeft: 2}}
        headerStyle={{
          backgroundColor: '#A6A6D2',
          color: '#ffffff',
          borderColor: '#fff',
        }}
        locale="zh-tw"
      />
      <FAB
        placement="right"
        icon={{name: 'add', color: 'white'}}
        color="green"
        onPress={toggleDialog1}
      />
      <Modal
        transparent={true}
        animationType="slide"
        visible={open1}
        onRequestClose={toggleDialog1}>
        <InsertPage
          token={porps.token}
          roomID={roomID}
          close={toggleDialog1}
          getAllBooking={apiGetBooking}
        />
      </Modal>
      <Modal
        transparent={true}
        animationType="slide"
        visible={open2}
        onRequestClose={close}>
        <EditPage
          token={porps.token}
          spaceID={selectEvent}
          recording={allEvent}
          close={close}
          getAllBooking={apiGetBooking}
        />
      </Modal>
    </ScrollView>
  );
};

export default Calendarr;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
