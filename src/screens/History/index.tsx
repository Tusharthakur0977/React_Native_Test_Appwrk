import React from 'react';
import {FlatList, SafeAreaView, Text, View} from 'react-native';
import {History as IHistory} from '../../redux/slices/userData';
import {useAppSelector} from '../../redux/store';

const History = () => {
  const {history} = useAppSelector(state => state.userData);

  const renderItem = ({item}: {item: IHistory}) => {
    return (
      <View
        style={{
          padding: 20,
          width: '100%',
          boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
        }}>
        <Text>
          Converted From :{' '}
          {`${item.convertedFrom} : ${item.convertedFromAmount}`}
        </Text>
        <Text>
          Converted To : {`${item.convertedTo} : ${item.convertedToAmount}`}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, alignItems: 'center', padding: 20}}>
        <Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold'}}>
          User History
        </Text>

        <FlatList
          style={{
            width: '100%',
          }}
          contentContainerStyle={{
            gap: 20,
          }}
          data={history}
          renderItem={renderItem}
          keyExtractor={item => item.convertedFrom + item.convertedFromAmount}
        />
      </View>
    </SafeAreaView>
  );
};

export default History;
