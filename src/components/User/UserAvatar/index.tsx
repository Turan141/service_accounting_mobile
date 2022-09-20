import React, { FC } from 'react';
import { Image, StyleSheet } from 'react-native';

import { TouchableRipple } from 'react-native-paper';

export interface UserAvatarProps {
  size?: number;
  avatarUrl?: string;
  onPress?: () => void;
}

const UserAvatar: FC<UserAvatarProps> = ({ size = 26, avatarUrl, onPress }) => {
  return (
    <TouchableRipple borderless style={styles.container} onPress={onPress}>
      <Image
        // TODO: Use avatarUrl to show user avatar
        source={require('../../../assets/images/user.png')}
        resizeMode="contain"
        style={{
          width: size,
          height: size,
        }}
      />
    </TouchableRipple>
  );
};

export default UserAvatar;

const styles = StyleSheet.create({
  container: {
    borderRadius: 50,
  },
});
