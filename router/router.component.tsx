import React, { useEffect, useState } from 'react';
import DrawerNavigatorComponent from './DrawerNavigation';
import { enableScreens } from 'react-native-screens';
import { ReducerState } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../user/config';
import { getUser } from '../store/actions';
import { LoginStackNavigator } from './MainStackNavigator.component';

enableScreens();

function RouterComponent(props: any) {
  const [loggedIn, setLoggedin] = useState(false);
  const inputUser = (state: ReducerState) => state.userReducer.userLogin;

  const newUser = useSelector(inputUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onIdTokenChanged(function (user: any) {
      if (user) {
        //Logged in
        console.log(user);
        setLoggedin(true);
        user
          .getIdTokenResult()
          .then((token: any) => {
            const role = {
              ROLE_QC: token.claims.ROLE_QC,
              ROLE_VP: token.claims.ROLE_VP,
              ROLE_TRAINER: token.claims.ROLE_TRAINER,
            };
            const tokenTemp = token.token;
            dispatch(
              getUser({ email: user.email, token: tokenTemp, role: role })
            );
          })
          .catch((err: any) => console.log(err));
      } else {
        //logged out
        setLoggedin(false);
        console.log('Logged out');
      }
    });
  }, []);

  return (
    <>{loggedIn ? <DrawerNavigatorComponent /> : <LoginStackNavigator />}</>
  );
}

export default RouterComponent;
