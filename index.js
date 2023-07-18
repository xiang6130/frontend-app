/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

//关闭其中某些yellow警告
console.ignoredYellowBox = [
  'Warning: BackAndroid is deprecated. Please use BackHandler instead.',
  'source.uri should not be an empty string',
  'Invalid props.style key',
];
// 关闭全部yellow警告
console.disableYellowBox = true;

AppRegistry.registerComponent(appName, () => App);
