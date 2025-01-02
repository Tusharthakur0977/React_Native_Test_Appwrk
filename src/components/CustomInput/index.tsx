/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {FC, useEffect, useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {fetchCurrencyData} from '../../redux/slices/fetchCurrencyData';
import {setHistory} from '../../redux/slices/userData';
import {useAppDispatch, useAppSelector} from '../../redux/store';

type CustomInputProps = {
  data: string[];
  value?: string;
  setValue?: (text: string) => void;
  currency: string;
  setCurrency: (text: string) => void;
  isSecond?: boolean;
};

const CustomInput: FC<CustomInputProps> = props => {
  const {
    data,
    setValue,
    value,
    currency,
    setCurrency,
    isSecond = false,
  } = props;
  const dispatch = useAppDispatch();
  const [isFocus, setIsFocus] = useState(false);
  const {data: currencyData} = useAppSelector(state => state.currecyData);
  const {currency1Value, currency1, currency2, currency2Value} = useAppSelector(
    state => state.userData,
  );

  const renderItem = (item: any) => {
    return (
      <View style={{padding: 10}}>
        <Text>{item[1]}</Text>
      </View>
    );
  };

  const filteredCurrecny =
    currencyData &&
    isSecond &&
    Number(
      Object.entries(currencyData?.conversion_rates)
        .filter(([key]) => key === currency)
        .flat(1)[1],
    ) * Number(currency1Value);

  const showConvertedAmount = currency1 && currency1Value && currency2;

  useEffect(() => {
    if (value && currency) {
      setTimeout(() => {
        dispatch(fetchCurrencyData(currency));
      }, 1500);
    }
  }, [value, currency, filteredCurrecny]);

  useEffect(() => {
    if (showConvertedAmount && filteredCurrecny) {
      setTimeout(() => {
        dispatch(
          setHistory({
            convertedFrom: currency1,
            convertedFromAmount: currency1Value,
            convertedTo: currency2,
            convertedToAmount:
              typeof filteredCurrecny === 'number' ? filteredCurrecny : 0,
          }),
        );
      }, 1500);
    }
  }, [filteredCurrecny, showConvertedAmount]);

  return (
    <View
      style={{
        padding: 10,
        borderRadius: 20,
        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
        width: '90%',
        gap: 30,
      }}>
      <View style={{gap: '10'}}>
        <Text>Select Currency</Text>
        {data && (
          <Dropdown
            style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            data={data}
            renderItem={renderItem}
            maxHeight={300}
            placeholder={currency ? currency : 'Select Currency'}
            value={currency}
            onChange={item => {
              setCurrency(item[0]);
              setIsFocus(false);
            }}
            labelField={0}
            valueField={0}
          />
        )}
      </View>

      <View style={{gap: 10}}>
        {isSecond ? (
          showConvertedAmount && (
            <View style={{gap: 20}}>
              <Text>Converted Rate</Text>
              <Text>{filteredCurrecny}</Text>
            </View>
          )
        ) : (
          <View style={{gap: 20}}>
            <Text>Enter Amount</Text>
            <TextInput
              value={value}
              onChangeText={text => setValue && setValue(text)}
              placeholder="Enter Amount"
              keyboardType="number-pad"
              style={{borderWidth: 0.5, borderColor: 'grey', padding: 10}}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'red',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },

  button: {
    alignItems: 'center',
    backgroundColor: '#efefef',
    height: 50,
    width: '90%',
    paddingHorizontal: 10,
    zIndex: 1,
  },
  buttonText: {
    flex: 1,
    textAlign: 'center',
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
});
