import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Alert} from 'react-native';
import {Actions} from 'react-native-router-flux';
import RNPickerSelect from 'react-native-picker-select';
import {Icon} from '@rneui/themed';
import axios from 'axios';
const Selecter = props => {
  const {selectRoom} = props;
  const [area, setArea] = useState([]);
  const [selectarea, setSelectarea] = useState();

  const [floor, setFloor] = useState([]);
  const [selectfloor, setSelectfloor] = useState();

  const [room, setRoom] = useState([]);
  const [selectroom, setSelectroom] = useState();

  useEffect(() => {
    const urlareas = 'http://10.0.2.2/final3/blog/public/getRooms';
    axios
      .get(urlareas, {
        headers: {
          jwtToken: props.token,
        },
      })
      .then(response => {
        // console.log(response["data"]["result"]);
        setArea(response['data']['result']);
      })
      .catch(error => {
        error.response.status === 401
          ? (Alert.alert('Token已過期，請重新登入'), Actions.Login())
          : console.error('Error:', error);
      });

    const urlfloors =
      'http://10.0.2.2/final3/blog/public/getRooms/' + selectarea;
    axios
      .get(urlfloors, {
        headers: {
          jwtToken: props.token,
        },
      })
      .then(response => {
        // console.log(response["data"]["result"]);
        setFloor(response['data']['result']);
      })
      .catch(error => {
        error.response.status === 401
          ? (Alert.alert('Token已過期，請重新登入'), Actions.Login())
          : console.error('Error:', error);
      });

    const urlrooms =
      'http://10.0.2.2/final3/blog/public/getRooms/' +
      selectarea +
      '/' +
      selectfloor;
    axios
      .get(urlrooms, {
        headers: {
          jwtToken: props.token,
        },
      })
      .then(response => {
        // console.log(response["data"]["result"]);
        setRoom(response['data']['result']);
      })
      .catch(error => {
        error.response.status === 401
          ? (Alert.alert('Token已過期，請重新登入'), Actions.Login())
          : console.error('Error:', error);
      });

    return () => {};
  }, [selectarea, selectfloor, props]);

  return (
    <View style={styles.container}>
      <RNPickerSelect
        placeholder={{label: '區域', value: null}}
        onValueChange={value => {
          setSelectarea(value);
        }}
        items={area.map(a => ({label: a.name, value: a.name}))}
        useNativeAndroidPickerStyle={false}
        style={pickerSelectStyles}
      />
      <RNPickerSelect
        placeholder={{label: '樓層', value: null}}
        onValueChange={value => {
          setSelectfloor(value);
        }}
        items={floor.map(a => ({label: a.name, value: a.name}))}
        useNativeAndroidPickerStyle={false}
        style={pickerSelectStyles}
      />
      <RNPickerSelect
        placeholder={{label: '空間', value: null}}
        onValueChange={value => {
          setSelectroom(value);
          selectRoom(value);
        }}
        items={room.map(a => ({label: a.name, value: a.space_id}))}
        useNativeAndroidPickerStyle={false}
        style={pickerSelectStyles}
      />
    </View>
  );
};

export default Selecter;
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    //alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    margin: 10,
    width: 100,
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
