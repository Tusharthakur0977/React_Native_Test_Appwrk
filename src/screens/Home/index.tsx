/* eslint-disable react-hooks/exhaustive-deps */
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CustomInput from '../../components/CustomInput';
import Loader from '../../components/Loader';
import {fetchCurrencyCodes} from '../../redux/slices/fetchCurrencyCode';
import {
  setCurrency1,
  setCurrency1Value,
  setCurrency2,
} from '../../redux/slices/userData';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {RootStackParamList} from '../../routing/Routing';

type NavigationProps = NativeStackNavigationProp<RootStackParamList, 'home'>;

const Home = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProps>();
  const {data, loading} = useAppSelector(state => state.currencyCode);
  const {currency1, currency1Value, currency2} = useAppSelector(
    state => state.userData,
  );

  const handleSeeHistory = () => {
    navigation.navigate('history');
    dispatch(setCurrency1(''));
    dispatch(setCurrency2(''));
    dispatch(setCurrency1Value(''));
  };

  useEffect(() => {
    dispatch(fetchCurrencyCodes());
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        enableOnAndroid={true}
        extraScrollHeight={5}>
        <View style={styles.content}>
          <Text style={styles.title}>Currency Converter</Text>

          <View style={styles.inputsContainer}>
            {data && (
              <CustomInput
                title="From Currency"
                data={data?.supported_codes}
                currency={currency1}
                setCurrency={text => dispatch(setCurrency1(text))}
                value={currency1Value}
                setValue={text => dispatch(setCurrency1Value(text))}
              />
            )}

            <CustomInput
              title="To Currency"
              data={data?.supported_codes}
              currency={currency2}
              setCurrency={text => dispatch(setCurrency2(text))}
              isSecond={true}
            />
          </View>

          <View>
            <Pressable onPress={handleSeeHistory} style={styles.historyButton}>
              <Text style={styles.historyButtonText}>See History</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    padding: 15,
    alignItems: 'center',
    gap: 10,
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputsContainer: {
    flex: 1,
    gap: 100,
  },
  historyButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: 'white',
    borderRadius: 5,
    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
  },
  historyButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
