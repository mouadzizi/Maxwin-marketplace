import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import DashStack from '../navigation/DashStack';
import DrawerContent from '../navigation/DrawerContent';
import Privacy from '../pages/home/PrivacyPage';
import Contact from '../pages/home/ContactUs';

const DrawerMEnu = createDrawerNavigator();

export default function Drawer() {
  return (
      <DrawerMEnu.Navigator backBehavior='none' initialRouteName="DashStack"
      drawerContent={props => <DrawerContent {...props} />
      }>
        <DrawerMEnu.Screen name="DashStack" component={DashStack} />
        <DrawerMEnu.Screen name="Privacy" component={Privacy} />
        
        <DrawerMEnu.Screen name="Contact" component={Contact} />
      </DrawerMEnu.Navigator>
  );
}