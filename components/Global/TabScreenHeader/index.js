import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import { AuthContext } from "../../../context"; // Ensure correct path

export function TabScreenHeader({
  leftComponent,
  isSearchBtnVisible,
  isMoreBtnVisible,
}) {
  const { dispatch } = useContext(AuthContext);
  const [data, setData] = useState({isSearchFieldVisible: false});

  const toggleSearchField = () => {
    setData({ ...data, isSearchFieldVisible: !data.isSearchFieldVisible });
  };

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    // Optional: navigate to login screen or perform other cleanup tasks
  };

  return (
    <View style={styles.headerContainer}>
      {leftComponent()}
      <View style={styles.headerRightContainer}>
        {isSearchBtnVisible && (
          <View style={styles.searchContainer}>
            {data.isSearchFieldVisible ? (
              <View style={styles.searchInputWrapper}>
                <TextInput
                  placeholder="Search"
                  style={styles.searchInputField}
                  placeholderTextColor="#ccc"
                />
                <TouchableOpacity onPress={toggleSearchField}>
                  <MaterialIcons name="close" size={20} />
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity onPress={toggleSearchField}>
                <Feather name="search" size={22} />
              </TouchableOpacity>
            )}
          </View>
        )}
        {isMoreBtnVisible && (
          <Menu>
            <MenuTrigger>
              <Feather name="more-vertical" size={22} />
            </MenuTrigger>
            <MenuOptions>
              <MenuOption onSelect={handleLogout}>
                <Text style={styles.menuOptionText}>Log out</Text>
              </MenuOption>
            </MenuOptions>
          </Menu>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  headerRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchContainer: {
    marginRight: 15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 35,
  },
  searchInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    width: 170,
    paddingHorizontal: 7,
    height: 35,
  },
  searchInputField: {
    fontSize: 15,
    flex: 1,
  },
  menuOptionText: {
    fontSize: 16,
    padding: 10,
  },
});