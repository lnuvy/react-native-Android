import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Movies from "../screens/Movies";
import Tv from "../screens/Tv";
import Search from "../screens/Search";
import { Text, View } from "react-native";

const Tab = createBottomTabNavigator();

const Tabs = () => (
  <Tab.Navigator
    // screenOptions = 모든 레이블에 적용 , options = 각각의 컴포넌트 적용
    screenOptions={{
      tabBarStyle: { backgroundColor: "tomato" },
      tabBarLabelPosition: "beside-icon",
    }}
  >
    <Tab.Screen
      name="Movies"
      component={Movies}
      options={{
        headerTitleStyle: { color: "cyan" },
        headerRight: () => (
          <View>
            <Text>Hello</Text>
          </View>
        ),
      }}
    />
    <Tab.Screen name="Tv" component={Tv} options={{ tabBarBadge: 5 }} />
    <Tab.Screen name="Search" component={Search} />
  </Tab.Navigator>
);

export default Tabs;
