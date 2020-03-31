import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,  
    paddingTop: Constants.statusBarHeight + 20,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  headerText: {
    fontSize: 15,
    color: '#737380',
  },

  headerTextBold: {
    fontWeight: 'bold',
  },

  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#737380'
  },

  title: {
    fontSize: 30,
    marginBottom: 16,
    marginTop: 30,
    color: '#13131a',
    fontWeight: 'bold',
  },

  causeList: {
    marginTop: 25,
  },

  cause: {
    padding: 24,
    borderRadius: 8,
    backgroundColor: '#FFF',
    marginBottom: 16,
  },

  causeProperty: {
    fontSize: 14,
    color: '#41414d',
    fontWeight: 'bold',
  },

  causeValue: {
    marginTop: 8,
    fontSize: 15,
    marginBottom: 24,
    color: '#737380',
  },

  detailsButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  detailsButtonText: {
    color: '#e02041',
    fontSize: 15,
    fontWeight: 'bold',
  }
});