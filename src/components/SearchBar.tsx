import React, { useRef, useState } from 'react'
import { View, StyleSheet, TextInput, TextInputProps, Pressable } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

import { OS } from '../lib/consts'
import Colours from '../themes/colours'
import Fonts from '../themes/fonts'
import { my } from '../themes/utils'

const styles = StyleSheet.create( {
  clearButton: {
    color: Colours.TintedWhite,
    opacity: 0.6,
  },
  clearButtonContainer: {
    ...my(),
    marginLeft: -30,
    borderRadius: 100,
  },
  searchBar: {
    ...( OS.android && { paddingLeft: 10 } ),
    ...( OS.ios && { padding: 10 } ),
    flexDirection: 'row',
    borderRadius: 10,
    backgroundColor: Colours.LightGray,
    width: '100%',
    height: 36,
  },
  searchIcon: {
    ...my(),
    fontSize: 16,
    color: Colours.TintedWhite,
  },
  searchInputBox: {
    flex: 1,
    fontFamily: Fonts.NotoSansRegular,
    marginLeft: 5,
    color: Colours.TintedWhite,
    ...my(),
  },
} )

export type SearchBarProps = TextInputProps

const SearchBar = ( {
  onChangeText = () => {},
  style,
  ...props
}: SearchBarProps ) => {
  const inputRef = useRef<TextInput>( null )
  const [ input, setInput ] = useState( '' )

  const handleChangeText = ( text: string ) => {
    setInput( text )
    onChangeText( text )
  }

  const clearInput = () => {
    inputRef.current?.clear()
    setInput( '' )
  }

  return (
    <View style={[ styles.searchBar, style ]}>
      <Icon name="search" size={25} style={styles.searchIcon} />

      <TextInput
        ref={inputRef}
        placeholder="Search"
        keyboardAppearance="dark"
        placeholderTextColor={Colours.TintedWhite}
        style={styles.searchInputBox}
        clearButtonMode="never"
        autoCorrect={false}
        autoCapitalize="none"
        returnKeyType="search"
        onChangeText={handleChangeText}
        {...props}
      />

      {!!input.length && (
        <View style={styles.clearButtonContainer}>
          <Pressable onPress={clearInput}>
            <Icon style={styles.clearButton} name="close-circle" size={17} testID="clear-search" />
          </Pressable>
        </View>
      )}
    </View>
  )
}

export default SearchBar
