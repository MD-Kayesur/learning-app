import React, { useState } from 'react';
import { Kohana } from 'react-native-textinput-effects';
import { TextInputProps, ViewStyle, TextStyle } from 'react-native';
import MaterialsIcon from 'react-native-vector-icons/MaterialIcons';

interface CustomInputProps extends TextInputProps {
  label: string;
  iconName: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  iconName,
  value,
  onChangeText,
  placeholder = '',
  ...props
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  
  // Check if it's a password field to toggle visibility
  const isPasswordField = props.secureTextEntry;
  
  const handleIconPress = () => {
    if (isPasswordField) {
      setIsPasswordVisible(!isPasswordVisible);
    }
  };
  
  const getIconName = () => {
    if (isPasswordField) {
      return isPasswordVisible ? 'visibility' : 'visibility-off';
    }
    return iconName;
  };

  // Fixed styles
  const containerStyle: ViewStyle = { backgroundColor: '#f9f5ed' };
  const labelStyleObj: TextStyle = { color: '#91627b' };
  const inputStyleObj: TextStyle = { color: '#91627b' };
  const labelContainerStyleObj: ViewStyle | any = { padding: 20 };
  const iconContainerStyleObj: ViewStyle = { padding: 20 };

  return (
    <Kohana
      style={containerStyle}
      label={label}
      iconClass={MaterialsIcon}
      iconName={getIconName()}
      iconColor={'#f4d29a'}
      inputPadding={16}
      labelStyle={labelStyleObj}
      inputStyle={inputStyleObj}
      labelContainerStyle={labelContainerStyleObj}
      iconContainerStyle={iconContainerStyleObj}
      useNativeDriver={true}
      autoCapitalize="none"
      value={value}
      placeholder={placeholder}
      onChangeText={onChangeText}
      secureTextEntry={props.secureTextEntry && !isPasswordVisible}
      onIconPress={isPasswordField ? handleIconPress : undefined}
      {...props}
    />
  );
};

export default CustomInput;