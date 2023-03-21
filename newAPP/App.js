import React, { useState, useEffect } from 'react';
import { useFonts } from 'expo-font';

import { 
  StyleSheet,
  View,
  ImageBackground,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import { RegistrationScreen } from './Screens/RegistrationScreen';
import { LoginScreen } from './Screens/LoginScreen';

const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

export default function App() {
  const [show, isShow] = useState(true)
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [dimensions, setDimensions] = useState({
    window: windowDimensions,
    screen: screenDimensions,
  });

  const [loadFonts] = useFonts({
    RobotoMedium: require('./assets/fonts/Roboto-Medium.ttf'),
    RobotoRegular: require('./assets/fonts/Roboto-Regular.ttf')
  });

 useEffect(() => {
    const hideSubscription = Keyboard.addListener('keyboardWillHide', () => {
      setIsShowKeyboard(false);
    });
    return () => {
      hideSubscription.remove();
    };
 }, []);
  
  useEffect(() => {
    const subscription = Dimensions.addEventListener(
      'change',
      ({window, screen}) => {
        setDimensions({window, screen});
      },
    );
    return () => subscription?.remove();
  });
  
  if (!loadFonts) {
    return null;
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => Keyboard.dismiss()}
    >
      <View style={styles.container}>
        <ImageBackground
          style={styles.bgImage}
          source={require("./assets/images/photo_BG.jpg")}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
             <View style={{ ...styles.form, marginBottom: isShowKeyboard ? -210 : 0 }}>
            {show === false ? <RegistrationScreen
                setIsShowKeyboard={setIsShowKeyboard}
                isShowKeyboard={isShowKeyboard}
                isShow={isShow}
            /> : <LoginScreen
                  setIsShowKeyboard={setIsShowKeyboard}
                  isShowKeyboard={isShowKeyboard}
                  isShow={isShow}
              />}
              </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  bgImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  form: {
    backgroundColor: "white",
    borderRadius: "25px 25px 0px 0px",
    marginBottom: 0,
  },
});
