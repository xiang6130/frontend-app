/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  RefreshControl,
  Text,
  View,
  StyleSheet,
  ScrollView,
  ToastAndroid,
  Modal,
  Alert,
} from 'react-native';
import {Card, Icon} from '@rneui/themed';
import axios from 'axios';
import {Actions} from 'react-native-router-flux';
import EditPage from '../EditPage';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};
const Recorded = porps => {
  const [refreshing, setRefreshing] = React.useState(false);

  const getAllBooking = porps.getAllBooking;

  const [open, setOpen] = useState(false);
  const [selectId, setSelectId] = useState();
  const handleOpen = id => {
    setSelectId(id);
    setOpen(!open);
  };
  const toggleDialog1 = () => {
    setOpen(!open);
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
    getAllBooking();
  }, [getAllBooking]);

  const handleDelete = id => {
    const url = 'http://10.0.2.2/final3/blog/public/removeBooking/' + id;
    axios
      .delete(url, {
        headers: {
          jwtToken: porps.token,
        },
      })
      .then(response => {
        // 確認是否抓到資料
        console.log(response);

        ToastAndroid.show('刪除成功', ToastAndroid.SHORT);
        getAllBooking();
      })
      .catch(error => {
        error.response.status === 401
          ? (Alert.alert('Token已過期，請重新登入'), Actions.Login())
          : ToastAndroid.show('刪除失敗', ToastAndroid.SHORT);
      });
  };
  const recording = porps.recording;

  return (
    <ScrollView
      style={{flex: 1}}
      alignItems="center"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      {recording.map(a => {
        return (
          <Card containerStyle={{width: 383}} key={a.booking_id}>
            <Card.Title style={{fontSize: 30, color: 'black'}}>
              {a.name}
              {a.class_name}
            </Card.Title>
            <Card.Divider />
            <View style={{flexDirection: 'row'}} justifyContent="center">
              <View alignItems="center">
                <Text style={{color: 'black', fontSize: 20}}>
                  開始時間:{a.start_datetime}
                </Text>
                <Text style={{color: 'black', fontSize: 20}}>
                  結束時間:{a.over_datetime}
                </Text>
              </View>
              <View style={{paddingLeft: 15, paddingTop: 3}}>
                <Icon
                  name="edit"
                  type="antdesign"
                  onPress={() => handleOpen(a.booking_id)}
                  buttonStyle={styles.button}
                />
                <Icon
                  name="delete"
                  type="antdesign"
                  onPress={() => handleDelete(a.booking_id)}
                  buttonStyle={styles.button}
                  color="red"
                />
              </View>
            </View>
          </Card>
        );
      })}
      <Modal
        transparent={true}
        animationType="slide"
        visible={open}
        onRequestClose={toggleDialog1}>
        <EditPage
          token={porps.token}
          spaceID={selectId}
          recording={porps.recording}
          close={toggleDialog1}
          getAllBooking={getAllBooking}
        />
      </Modal>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  tabs: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  button: {
    padding: 10,
  },
});
export default Recorded;
