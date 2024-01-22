// styles.js

import { StyleSheet } from 'react-native';

export const commonStyles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  searchBarContainer: {
    marginTop:4,
    backgroundColor: '#00CED1',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 7,
    gap: 10,
    backgroundColor: 'white',
    borderRadius: 3,
    height: 38,
    flex: 1,
  },
  searchBarIcon: {
    paddingLeft: 10,
  },
  micIcon: {
    fontSize: 24,
    color: 'black',
  },
  addressContainer: {
    padding: 10,
  },
  addAddressButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    borderColor: '#D0D0D0',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    paddingVertical: 7,
    paddingHorizontal: 5,
  },
  addressItem: {
    borderWidth: 1,
    borderColor: '#D0D0D0',
    padding: 10,
    flexDirection: 'column',
    gap: 5,
    marginVertical: 5,
  },
  addressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  addressText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  locationIcon: {
    fontSize: 24,
    color: 'red',
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 7,
  },
  actionButton: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 5,
    borderWidth: 0.9,
    borderColor: '#D0D0D0',
    alignItems: 'center',
  },
});

export default commonStyles;
