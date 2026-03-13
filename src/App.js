// import React from 'react';
import React, { useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import BottomTabs from './navigation/BottomTabs.js';
// import BottomTabs from './navigation/BottomTabs';
// import PushNotification from 'react-native-push-notification';
import notifee from '@notifee/react-native';
import HomeScreen from './screens/HomeScreen.js';

// import { NavigationContainer } from '@react-navigation/native';
// import { AuthProvider } from '../context/AuthContext.js';
// import RootNavigator from './navigation/RootNavigator';

export default function App() {
  useEffect(() => {
    async function requestPermission() {
      if (Platform.OS === 'android') {
        await notifee.requestPermission();
      }
    }

    requestPermission();
  }, []);

  return (
    <NavigationContainer>
      <HomeScreen />
      {/* <BottomTabs /> */}
    </NavigationContainer>
    // <AuthProvider>
    //   <NavigationContainer>
    //     <RootNavigator />
    //   </NavigationContainer>
    // </AuthProvider>
  );
}

// import React from 'react';
// import { SafeAreaView, StatusBar } from 'react-native';
// import HomeScreen from './screens/HomeScreen';

// export default function App() {
//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <StatusBar barStyle="dark-content" />
//       <HomeScreen />
//     </SafeAreaView>
//   );
// }
