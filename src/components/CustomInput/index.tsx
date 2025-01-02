/* eslint-disable react-hooks/exhaustive-deps */
import React, {FC, useEffect, useMemo, useState} from 'react';
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
  title: string;
};

const CustomInput: FC<CustomInputProps> = React.memo(props => {
  const {
    data,
    setValue,
    value = '',
    currency,
    setCurrency,
    isSecond = false,
    title,
  } = props;

  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const {data: currencyData} = useAppSelector(state => state.currecyData);
  const {currency1Value, currency1, currency2} = useAppSelector(
    state => state.userData,
  );

  const validateAmount = (text: string) => {
    if (!/^\d*\.?\d*$/.test(text)) {
      setError('Please enter a valid number');
    } else {
      setError(null);
      setValue && setValue(text);
    }
  };

  const filteredCurrecny = useMemo(() => {
    if (!currencyData || !isSecond) return 0;
    const rate = Object.entries(currencyData?.conversion_rates).find(
      ([key]) => key === currency,
    )?.[1];
    return rate ? Number(rate) * Number(currency1Value) : 0;
  }, [currencyData, isSecond, currency, currency1Value]);

  const showConvertedAmount = useMemo(
    () => currency1 && currency1Value && currency2,
    [currency1, currency1Value, currency2],
  );

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

  const renderItem = (item: any) => (
    <View style={styles.itemContainer}>
      <Text>{item[1]}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.gap}>
        <Text>Select Currency</Text>
        {data && (
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            data={data}
            renderItem={renderItem}
            maxHeight={300}
            placeholder={currency || 'Select Currency'}
            value={currency}
            onChange={item => setCurrency(item[0])}
            labelField={0}
            valueField={0}
          />
        )}
      </View>

      <View style={styles.gap}>
        {isSecond ? (
          showConvertedAmount && (
            <View style={styles.gap}>
              <Text>Converted Rate</Text>
              <Text>{filteredCurrecny}</Text>
            </View>
          )
        ) : (
          <View style={styles.gap}>
            <Text>Enter Amount</Text>
            <TextInput
              value={value}
              onChangeText={validateAmount}
              placeholder="Enter Amount"
              keyboardType="number-pad"
              style={styles.textInput}
              accessibilityLabel="Amount Input"
            />
            {error && <Text style={styles.errorText}>{error}</Text>}
          </View>
        )}
      </View>
    </View>
  );
});

export default CustomInput;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 15,
    width: '90%',
    gap: 30,
    backgroundColor: 'white',
    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 5px',
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  gap: {
    gap: 10,
  },
  itemContainer: {
    padding: 10,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  textInput: {
    borderWidth: 0.5,
    borderColor: 'grey',
    padding: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 5,
  },
});
