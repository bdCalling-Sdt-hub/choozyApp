import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import React from 'react';

const data = [
  {
    id: '1',
    name: 'Alexa',
    message: 'I’m going to play padel',
    location: 'Madrid, Spain',
    level: '04',
    matches: '702',
    joined: '08',
  },
  {
    id: '2',
    name: 'Richardo Mathew',
    message: 'Wanna play today?',
    location: 'Madrid, Spain',
    level: '04',
    matches: '702',
    joined: '08',
  },
  {
    id: '3',
    name: 'Maria',
    message: 'Wanna play today?',
    location: 'Madrid, Spain',
    level: '04',
    matches: '702',
    joined: '08',
  },
  // Add more data here
];

const MatchCard = ({item}) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Image
          style={styles.avatar}
          source={{uri: 'https://via.placeholder.com/40'}}
        />
        <Text style={styles.name}>{item.name}</Text>
      </View>
      <Text style={styles.matches}>{item.matches} matches played</Text>
      <Text style={styles.message}>{item.message}</Text>
      <View style={styles.details}>
        <Text style={styles.detailText}>Level {item.level}</Text>
        <Text style={styles.detailText}>Location {item.location}</Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.joined}>{item.joined} joined</Text>
        <TouchableOpacity style={styles.joinButton}>
          <Text style={styles.joinButtonText}>Join</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const MatchList = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>We've found (47 Matches)</Text>
      <FlatList
        data={data}
        renderItem={({item}) => <MatchCard item={item} />}
        keyExtractor={item => item.id}
        numColumns={2} // Two-column layout
        columnWrapperStyle={styles.row}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#111',
  },
  title: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 15,
  },
  row: {
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    backgroundColor: '#2C2C2E',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    marginHorizontal: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  matches: {
    color: '#9A9A9A',
    fontSize: 14,
    marginBottom: 10,
  },
  message: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 10,
  },
  details: {
    marginBottom: 10,
  },
  detailText: {
    color: '#9A9A9A',
    fontSize: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  joined: {
    color: '#9A9A9A',
    fontSize: 12,
  },
  joinButton: {
    backgroundColor: '#FF9F29',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  joinButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default MatchList;
