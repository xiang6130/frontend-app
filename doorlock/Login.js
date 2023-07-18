/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {ScrollView, Text, View, StyleSheet, ToastAndroid} from 'react-native';
import {Button, Input, Icon} from '@rneui/themed';
import {Actions} from 'react-native-router-flux';
import TianYan from '@webank/wt-console';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
const Login = porps => {
  const [account, setAccount] = useState('kkk@yahoo.com');
  const [password, setPassword] = useState('123');
  const {handleLogin} = porps;
  const storeData = (key, keyVel) => {
    try {
      AsyncStorage.setItem(key, keyVel);
      console.log('worked');
    } catch (e) {
      console.log('error');
    }
  };

  const doLogin = () => {
    axios
      .post('http://10.0.2.2/final3/blog/public/doLogin', {
        account: account,
        password: password,
      })
      .then(response => {
        console.log(response['data']['result'][0]);
        response['data']['result'][0]['name'] !== 'admin'
          ? (handleLogin(response['data']['token']),
            ToastAndroid.show('登入成功', ToastAndroid.SHORT),
            Actions.tabBar({token: response['data']['token']}))
          : ToastAndroid.show('請登入非管理員帳號', ToastAndroid.SHORT);
      })
      .catch(error => {
        //console.error('Error:', error.response['status']);
        if (error.response['status'] == 401) {
          ToastAndroid.show('帳號或密碼錯誤', ToastAndroid.SHORT);
        }
      });
  };
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        height: '100%',
      }}>
      <Input
        disabledInputStyle={{background: '#ddd'}}
        inputContainerStyle={{
          background: 'white',
          borderWidth: 1,
          borderRadius: 5,
        }}
        label="帳號"
        leftIcon={
          <Icon
            name="account-circle-outline"
            type="material-community"
            size={35}
          />
        }
        value={account}
        onChangeText={value => setAccount(value)}
        leftIconContainerStyle={{}}
        rightIcon={
          <Icon name="close" size={20} onPress={() => setAccount('')} />
        }
        rightIconContainerStyle={{}}
        placeholder="Enter Name"
      />

      <Input
        disabledInputStyle={{background: '#ddd'}}
        inputContainerStyle={{
          background: 'white',
          borderWidth: 1,
          borderRadius: 5,
        }}
        label="密碼"
        leftIcon={<Icon name="user-lock" type="font-awesome-5" size={25} />}
        value={password}
        onChangeText={value => setPassword(value)}
        leftIconContainerStyle={{}}
        rightIcon={
          <Icon name="close" size={20} onPress={() => setPassword('')} />
        }
        rightIconContainerStyle={{}}
        placeholder="Enter Password"
        secureTextEntry={true}
      />
      <Button title="登入" onPress={() => doLogin()} />
      <TianYan
        consoleOptions={{
          showTimestamp: true, // 展示日志时间戳
          ignoreRedBox: true, // 隐藏默认红屏
          ignoreYellowBox: true, // 隐藏默认小黄条
        }}
      />
    </View>
  );
};

export default Login;
