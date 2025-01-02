import React from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {History as IHistory} from '../../redux/slices/userData';
import {useAppSelector} from '../../redux/store';

const History = () => {
  const {history} = useAppSelector(state => state.userData);

  const renderItem = ({item}: {item: IHistory}) => (
    <View style={styles.historyItem}>
      <Text style={styles.historyText}>
        Converted From: {`${item.convertedFrom} : ${item.convertedFromAmount}`}
      </Text>
      <Text style={styles.historyText}>
        Converted To: {`${item.convertedTo} : ${item.convertedToAmount}`}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>User History</Text>
        <FlatList
          style={styles.flatList}
          contentContainerStyle={styles.flatListContent}
          data={history}
          renderItem={renderItem}
          keyExtractor={item => item.convertedFrom + item.convertedFromAmount}
        />
      </View>
    </SafeAreaView>
  );
};

export default History;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  flatList: {
    width: '100%',
  },
  flatListContent: {
    gap: 20,
  },
  historyItem: {
    padding: 20,
    width: '100%',
    borderRadius: 8,
    backgroundColor: 'white',
    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
  },
  historyText: {
    fontSize: 16,
  },
});
