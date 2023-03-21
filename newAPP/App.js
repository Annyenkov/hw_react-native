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
  const [dimensions, setDimensions] = useState({
    window: windowDimensions,
    screen: screenDimensions,
  });

  const [loadFonts] = useFonts({
    RobotoMedium: require('./assets/fonts/Roboto-Medium.ttf'),
    RobotoRegular: require('./assets/fonts/Roboto-Regular.ttf')
  });
  
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
            {show === false ? <RegistrationScreen
                isShow={isShow}
            /> : <LoginScreen
                  isShow={isShow}
              />}
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
});
