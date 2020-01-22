import React from 'react';
import CodePush from 'react-native-code-push';
import { StatusBar, YellowBox } from 'react-native';

import Routes from './src/routes';

YellowBox.ignoreWarnings([
  'Unrecognized WebSocket'
]);

function App() {
  return (
    <>
      <StatusBar backgroundColor="#7d40e7" barStyle="light-content" />
      <Routes />
    </>
  );
}

export default CodePush({
  checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
})(App);
