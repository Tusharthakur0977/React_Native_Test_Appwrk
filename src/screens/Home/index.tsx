/* eslint-disable react-hooks/exhaustive-deps */
import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Pressable, SafeAreaView, Text, View} from 'react-native';
import CustomInput from '../../components/CustomInput';
import Loader from '../../components/Loader';
import {fetchCurrencyCodes} from '../../redux/slices/fetchCurrencyCode';
import {
  setCurrency1,
  setCurrency1Value,
  setCurrency2,
} from '../../redux/slices/userData';
import {useAppDispatch, useAppSelector} from '../../redux/store';
const Home = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const {data, loading} = useAppSelector(state => state.currencyCode);
  const {currency1, currency1Value, currency2} = useAppSelector(
    state => state.userData,
  );

  const handleSeehistory = () => {
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
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, padding: 15, alignItems: 'center', gap: 10}}>
        <Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold'}}>
          Currency Converter
        </Text>

        <View style={{flex: 1, gap: 100}}>
          {data && (
            <CustomInput
              data={data?.supported_codes}
              currency={currency1}
              setCurrency={text => dispatch(setCurrency1(text))}
              value={currency1Value}
              setValue={text => dispatch(setCurrency1Value(text))}
            />
          )}

          <CustomInput
            data={data?.supported_codes}
            currency={currency2}
            setCurrency={text => dispatch(setCurrency2(text))}
            isSecond={true}
          />
        </View>

        <View>
          <Pressable onPress={handleSeehistory}>
            <Text style={{color: 'blue'}}>See History</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;
