import React, { FC } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { fonts } from '../../../../theme';

import { ImageAsset } from '../../../../services/data';
import { Button } from '../../../../ui-kit/Buttons';
import Modal, { ModalProps } from '../../../../ui-kit/Modal';

interface ConfirmImageModalProps extends ModalProps {
  image: ImageAsset;
  isBase64?: boolean;
  onClose: () => void;
}

const ConfirmImageModal: FC<ConfirmImageModalProps> = ({
  image,
  isBase64 = false,
  onClose = () => {},
  ...otherProps
}) => {
  return (
    <Modal showConfirm={false} {...otherProps}>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: isBase64 ? `data:image/jpeg;base64,${image?.uri}` : image?.uri,
          }}
          style={{
            height: 300,
          }}
          resizeMode="contain"
        />
      </View>

      <View style={styles.commentContainer}>
        <Text style={fonts.bodyMedium}>{image?.comment}</Text>
      </View>

      <View style={styles.controlsContainer}>
        <Button onPress={onClose}>Закрыть</Button>
      </View>
    </Modal>
  );
};

export default ConfirmImageModal;

const styles = StyleSheet.create({
  imageContainer: {},
  commentContainer: {
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  controlsContainer: {
    paddingHorizontal: 10,
  },
});
