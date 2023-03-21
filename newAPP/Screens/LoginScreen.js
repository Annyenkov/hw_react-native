import { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Keyboard,
} from 'react-native';

const initialData = {
  email: '',
  password: '',
};

export const LoginScreen = ({ isShow }) => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isPasswordShow, setIsPasswordShow] = useState(true);
  const [data, setData] = useState(initialData);
  useEffect(() => {
    const hideSubscription = Keyboard.addListener('keyboardWillHide', () => {
      setIsShowKeyboard(false);
    });
    return () => {
      hideSubscription.remove();
    };
 }, []);
  const onSubmit = () => {
    console.log(data);
    setData(initialData);
  };
  return (
    <>
       <View style={{ ...styles.form, marginBottom: isShowKeyboard ? -210 : 0 }}>
        <Text
          style={styles.formTitle}
        >Войти</Text>
        <View>
          <TextInput
            style={styles.input}
            textAlign={"start"}
            placeholder={"Адрес электронной почты"}
            value={data.email}
            onFocus={() => setIsShowKeyboard(true)}
            onChangeText={(value) => setData((PrevData) => ({ ...PrevData, email: value }))}
          />
        </View>
        <View>
          <TextInput
            style={styles.input}
            textAlign={"start"}
            placeholder={"Пароль"}
            secureTextEntry={isPasswordShow}
            value={data.password}
            onFocus={() => setIsShowKeyboard(true)}
            onChangeText={(value) => setData((PrevData) => ({ ...PrevData, password: value }))}
          />
          <TouchableOpacity
            style={{ position: "absolute", right: 32, top: 32 }}
            onPress={() => setIsPasswordShow(!isPasswordShow)}
          >
            <Text>{isPasswordShow ? "Показать" : "Скрыть"}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.btn}
          activeOpacity={0.7}
          onPress={onSubmit}
        >
          <Text
            style={styles.btnText}
          >
            Войти
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.secondBtn}
        activeOpacity={0.7}
        onPress={()=> isShow(false)}
        >
          <Text
            style={{ color: "black" }}
          >
            Нет аккаунта? Зарегистрироваться
          </Text>
        </TouchableOpacity>
      </View>
    </>
  )
};

const styles = StyleSheet.create({
  form: {
    backgroundColor: "white",
    borderRadius: "25px 25px 0px 0px",
    marginBottom: 0,
  },
  formTitle: {
    fontFamily: "RobotoMedium",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    marginTop: 92,
    marginBottom: 16,
  },
  input: {
    fontFamily: "RobotoRegular",
    borderWidth: 1,
    backgroundColor: "#F6F6F6",
    borderColor: "#E8E8E8",
    borderRadius: 8,
    marginTop: 16,
    marginHorizontal: 16,
    padding: 16,
    fontSize: 16,
    fontWeight: "400",
  },
  btn: {
    fontFamily: "RobotoRegular",
    backgroundColor: "#FF6C00",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 16,
    borderRadius: 100,
    marginTop: 43,
  },
  btnText: {
    fontFamily: "RobotoRegular",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
    color: "#FFFFFF"
  },
  secondBtn: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 16,
    borderRadius: 100,
    marginTop: 16,
    marginBottom: 78,
  },
  image: {
    position: 'absolute',
    top: "-10%",
    left: "35%",
    width: 120,
    backgroundColor: '#F6F6F6',
    borderRadius: 16,
  }

});
