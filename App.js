import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Toast from "react-native-toast-message";
import { AuthProvider } from "./components/AuthContext";
import { NotificationProvider } from "./components/NotificationContext";

import screens from "./components/Screen";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

const Stack = createStackNavigator();

// Auth stack for login and signup
const AuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      options={{ headerShown: false }}
      name="Login"
      component={Login}
    />
    <Stack.Screen name="SignUp" component={SignUp} />
    {screens.map((screen) => (
      <Stack.Screen
        key={screen.name}
        name={screen.name}
        component={screen.component}
        options={{ headerShown: false, ...(screen.options || {}) }}
      />
    ))}
  </Stack.Navigator>
);

const App = () => {
  return (
    <AuthProvider>
      <NotificationProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Auth">
            <Stack.Screen
              name="Auth"
              component={AuthStack}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
        <Toast ref={(ref) => Toast.setRef(ref)} />
      </NotificationProvider>
    </AuthProvider>
  );
};

export default App;
