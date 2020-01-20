import styled from 'styled-components/native';

export const Avatar = styled.Image`
  width: 54px;
  height: 54px;
  border-radius: 4px;
  border-width: 2px;
  border-color: #fff;
`;

export const Container = styled.View`
  width: 260px;
`;
export const Name = styled.Text`
  font-weight: bold;
  font-size: 16px;
`;
export const Bio = styled.Text`
  color: #666;
  margin-top: 5px;
`;
export const Techs = styled.Text`
  margin-top: 5px;
`;

export const Form = styled.View`
  position: absolute;
  bottom: 20px;
  left: 20px;
  right: 20px;
  z-index: 5;
  flex-direction: row;
`;

export const Input = styled.TextInput`
  flex: 1;
  height: 50px;
  background: #fff;
  color: #333;
  border-radius: 25px;
  padding: 0 20px;
  font-size: 16px;
  elevation : 2;
`;

export const Button = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  background: #8e4dff;
  border-radius: 25px;
  justify-content: center;
  align-items: center;
  margin-left: 15px;
`;

export const TextButton = styled.Text``;