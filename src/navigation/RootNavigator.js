import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { AuthContext } from '../context/AuthContext';
// import AuthStack from './AuthStack';
import BottomTabs from './BottomTabs';
import AuthStack from './Authstack.js';
import { AuthContext } from '../../context/AuthContext.js';
// import AuthStack from './AuthStack';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const { token } = useContext(AuthContext);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {token ? (
        <Stack.Screen name="App" component={BottomTabs} />
      ) : (
        <Stack.Screen name="Auth" component={AuthStack} />
      )}
    </Stack.Navigator>
  );
}

// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { useContext } from 'react';
// import { AuthContext } from '../../context/AuthContext';
// import BottomTabs from './BottomTabs';

// const Stack = createNativeStackNavigator();

// export default function RootNavigator() {
//   const { token } = useContext(AuthContext);

//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       {token ? (
//         <Stack.Screen name="App" component={BottomTabs} />
//       ) : (
//         <Stack.Screen name="App" component={BottomTabs} />
//         // <Stack.Screen name="Auth" component={AuthStack} />
//       )}
//     </Stack.Navigator>
//   );
// }
