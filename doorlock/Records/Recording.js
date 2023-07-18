/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import {Card, BottomSheet, Icon, ListItem} from '@rneui/themed';

const Recording = porps => {
  const recorded = porps.recorded;
  return (
    <ScrollView alignItems="center">
      {recorded.map(a => {
        return (
          <ListItem
            key={a.booking_id}
            bottomDivider
            containerStyle={{
              backgroundColor: '#E0E0E0',
              //alignItems: 'center',
            }}>
            <View style={{width: '100%'}} alignItems="center">
              <View>
                <ListItem.Title style={{color: 'gray'}}>
                  {a.name}
                  {a.class_name}
                </ListItem.Title>
              </View>

              <View style={{textAlign: 'right'}}>
                <ListItem.Subtitle style={{color: 'gray'}}>
                  開始時間:{a.start_datetime}
                </ListItem.Subtitle>
                <ListItem.Subtitle style={{color: 'gray'}}>
                  結束時間:{a.over_datetime}
                </ListItem.Subtitle>
              </View>
            </View>
          </ListItem>
        );
      })}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  tabs: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});
export default Recording;
