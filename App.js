import React, { Component } from 'react';
import CodePush from 'react-native-code-push';
import OneSignal from 'react-native-onesignal'; 
import { StatusBar, YellowBox } from 'react-native';

import Routes from './src/routes';

YellowBox.ignoreWarnings([
  'Unrecognized WebSocket'
]);

class App extends Component {
  constructor(props) {
    super(props);

    OneSignal.init('c5a844fb-b57d-4b4c-bd15-88c26cb96864');
    
    OneSignal.addEventListener('received', this.onReceived );
    OneSignal.addEventListener('opened', this.onOpened );
    OneSignal.addEventListener('ids', this.onIds );

  }

  componentWillUnmount() {
    OneSignal.addEventListener('received', this.onReceived );
    OneSignal.addEventListener('opened', this.onOpened );
    OneSignal.addEventListener('ids', this.onIds );
  }

  onReceived = (data) => {

  }

  onOpened = (notification) => {

  }

  onIds = id => {}

  render() {
    return (
      <>
        <StatusBar backgroundColor="#7d40e7" barStyle="light-content" />
        <Routes />
      </>
    );
  }
}

export default CodePush({
  checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
})(App);
