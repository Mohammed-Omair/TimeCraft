import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'stretch',
    paddingBottom: 0,
    borderRadius: 10,
    backgroundColor: 'lightblue',
    marginHorizontal: 25,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  infoContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 10,  // Add margin to separate from the buttons
  },
  taskTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black',
  },
  taskDescription: {
    color: 'gray',
    fontSize: 12,
    marginTop: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 50,  // Define a height for buttons
  },
  editButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',  // Center the button content
    backgroundColor: '#71ACCE',
  },
  deleteButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',  // Center the button content
    backgroundColor: '#f8d7da',  // Light red background for the delete button
  },
  dimmed: {
    backgroundColor: 'darkgrey',
    opacity: 0.4,
  },
  undimmed: {
    backgroundColor: 'lightblue',
    opacity: 1,
  },
});

export default styles;
