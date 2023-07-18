import React, {Component, useEffect, useState} from 'react';
import {Text, View, StyleSheet, TextInput, Alert} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {Button, Divider, Dialog} from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getToken} from './Token';
import axios from 'axios';
import CheckOldPassword from './CheckOldPassword';
import UpdatePassword from './updatePassword';

const UserInfo = porps => {
  const [userInfo, setUserInfo] = useState({
    account: '',
    emp_id: '',
    dept_id: '',
    email: '',
    emp_name: '',
    dept_name: '',
    password: '',
  });
  const [visible1, setVisible1] = useState(false);
  const toggleDialog1 = () => {
    setVisible1(!visible1);
  };
  const [visible2, setVisible2] = useState(false);
  const toggleDialog2 = () => {
    setVisible2(!visible2);
  };
  const [index, setIndex] = React.useState(0);

  useEffect(() => {
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

    return () => {};
  }, [porps.token]);
  return (
    <View
      style={{
        height: '100%',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: '#FFFFFF',
      }}>
      <View style={styles.infoContent}>
        <Text style={styles.infoTitle}>員工姓名</Text>
        <Divider width={1.5} />
        <Text style={styles.infoText}>{userInfo.emp_name}</Text>
      </View>

      <View style={styles.infoContent}>
        <Text style={styles.infoTitle}>員工編號</Text>
        <Divider width={1.5} />
        <Text style={styles.infoText}>{userInfo.emp_id}</Text>
      </View>

      <View style={styles.infoContent}>
        <Text style={styles.infoTitle}>部門編號</Text>
        <Divider width={1.5} />
        <Text style={styles.infoText}>{userInfo.dept_id}</Text>
      </View>
      <View style={styles.infoContent}>
        <Text style={styles.infoTitle}>部門名稱</Text>
        <Divider width={1.5} />
        <Text style={styles.infoText}>{userInfo.dept_name}</Text>
      </View>
      <View style={styles.infoContent}>
        <Text style={styles.infoTitle}>E-MAIL</Text>
        <Divider width={1.5} />
        <Text style={styles.infoText}>{userInfo.email}</Text>
      </View>

      <View style={{paddingTop: 35}}>
        <Button title="修改密碼" radius="6" onPress={toggleDialog1} />
      </View>
      <Dialog isVisible={visible1} onBackdropPress={toggleDialog1}>
        <Dialog.Title
          title="修改密碼"
          titleStyle={{textAlign: 'center', color: '#000000', fontSize: 24}}
        />
        <CheckOldPassword
          closeWindon={toggleDialog1}
          password={userInfo.password}
          openUpdate={toggleDialog2}
        />
      </Dialog>
      <Dialog isVisible={visible2} onBackdropPress={toggleDialog2}>
        <Dialog.Title
          title="修改密碼"
          titleStyle={{textAlign: 'center', color: '#000000', fontSize: 24}}
        />
        <UpdatePassword token={porps.token} closeWindon={toggleDialog2} />
      </Dialog>
    </View>
  );
};
const styles = StyleSheet.create({
  content: {
    flexDirection: 'column', // 每個 TodoItem 區塊透過水平方向排列
    alignItems: 'center', // 垂直置中
  },
  infoTitle: {
    fontSize: 13, // 標題文字大小
    fontWeight: 'bold', // 標題文字粗細
    paddingVertical: 10, // 上下垂直內聚大小
    marginLeft: 10,
    marginRight: 0,
    color: 'gray',
  },
  InPutTitle: {
    textAlign: 'right', // 標題文字置中
    fontSize: 26, // 標題文字大小
    fontWeight: 'bold', // 標題文字粗細
    paddingVertical: 10, // 上下垂直內聚大小
    color: 'black',
  },
  infoText: {
    //textAlign: 'center', // 標題文字置中
    fontSize: 26, // 標題文字大小
    fontWeight: 'bold', // 標題文字粗細
    paddingVertical: 10, // 上下垂直內聚大小
    marginRight: 10,
    color: 'black',
    paddingLeft: 10,
  },
  inPutText: {
    flex: 0.6,
    textAlign: 'left', // 標題文字置中
    fontSize: 26, // 標題文字大小
    paddingVertical: 10, // 上下垂直內聚大小
    marginRight: 10,
    color: 'black',
  },
  infoContent: {
    // 每個 TodoItem 區塊透過水平方向排列
    textAlign: 'center',
  },
  button: {
    borderRadius: 3,
  },
});

export default UserInfo;
