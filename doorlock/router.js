import React, {useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {
  Router,
  Stack,
  Scene,
  Actions,
  Tabs,
  LegacyTabs,
} from 'react-native-router-flux';
import {Icon} from '@rneui/themed';

import Records from './Records/SpaceRecord';
import UserInfo from './UserInfo';
import Login from './Login';
import Calendar from './Calendarr';
import Report from './report';

const Routes = () => {
  const [mytoken, setToken] = useState();
  const hendleLogin = value => {
    setToken(value);
  };
  return (
    <Router>
      <Stack key="root" headerLayoutPreset="center">
        <Scene
          key="Login"
          component={Login}
          title="登入"
          handleLogin={hendleLogin}
          hideTabBar
          initial
        />
        <Tabs
          key="tabBar"
          title="門禁管理系統"
          rightTitle="登出"
          activeTintColor="blue"
          inactiveTintColor="gray"
          onRight={() => Actions.Login({handleLogin: hendleLogin})}>
          <Scene
            key="Calendar"
            component={Calendar}
            tabBarLabel="空間預約"
            token={mytoken}
            hideNavBar
            icon={() => (
              <Icon name="book-online" type="material" color="blue" />
            )}
          />
          <Scene
            key="Records"
            component={Records}
            tabBarLabel="預約紀錄"
            token={mytoken}
            hideNavBar
            icon={() => <Icon name="history" type="material" color="blue" />}
          />
          <Scene
            key="UserInfo"
            component={UserInfo}
            tabBarLabel="使用者資訊"
            token={mytoken}
            hideNavBar
            icon={() => (
              <Icon name="user-circle-o" type="font-awesome" color="blue" />
            )}
          />
          <Scene
            key="Report"
            component={Report}
            tabBarLabel="問題回報"
            token={mytoken}
            hideNavBar
            icon={() => (
              <Icon name="report-problem" type="material" color="blue" />
            )}
          />
        </Tabs>
      </Stack>
    </Router>
  );
};

export default Routes;
