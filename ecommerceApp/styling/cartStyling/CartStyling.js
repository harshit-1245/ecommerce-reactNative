import { StyleSheet } from 'react-native';

export const cartScreenStyles = StyleSheet.create({
  container: {
    marginTop: 55,
    flex: 1,
    backgroundColor: 'white',
  },
  searchBarContainer: {
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
    marginLeft: 10,
  },
  subtotalContainer: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  emiText: {
    marginHorizontal: 10,
  },
  proceedButton: {
    backgroundColor: '#FFC72C',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    marginTop: 10,
  },
  proceedButtonText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  divideLine: {
    height: 1,
    borderColor: '#D0D0D0',
    borderWidth: 1,
    marginTop: 16,
  },
  cartItemContainer: {
    marginHorizontal: 10,
  },
});

export const cartItemStyles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginVertical: 10,
    padding: 10,
    gap: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginRight: 10,
  },
  detailsContainer: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    marginBottom: 8,
    color: 'grey',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  stockIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 5,
  },
  inStock: {
    color: 'green',
  },
  rating: {
    fontWeight: '500',
    fontSize: 16,
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityAdjustmentButton: {
    backgroundColor: '#4CAF50',
    padding: 8,
    borderRadius: 5,
    marginRight: 10,
  },
  quantityText: {
    fontSize: 16,
    marginRight: 10,
  },
  deleteButtonContainer: {
    padding: 10,
  },
  deleteButton: {
    backgroundColor: 'black',
    padding: 8,
    borderRadius: 5,
    marginRight: 10,
  },
  deleteButtonText: {
    color: 'white',
  },
  laterOnSectionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 15,
  },
  saveForLaterButton: {
    backgroundColor: 'white',
    paddingHorizontal: 8,
    paddingVertical: 10,
    borderRadius: 5,
    borderColor: '#C0C0C0',
    borderWidth: 0.6,
  },
  seeMoreButton: {
    backgroundColor: 'white',
    paddingHorizontal: 8,
    paddingVertical: 10,
    borderRadius: 5,
    borderColor: '#C0C0C0',
    borderWidth: 0.6,
  },
  laterButtonText: {
    color: 'black',
  },
});
