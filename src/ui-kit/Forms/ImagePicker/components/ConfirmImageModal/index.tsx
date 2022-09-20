import React, { FC, useState, useCallback } from 'react';
import { Image, StyleSheet, View } from 'react-native';

import { Button } from '../../../../Buttons';
import Modal, { ModalProps } from '../../../../Modal';
import TextInput from '../../../../TextInput';
import FormGroup from '../../../FormGroup';

import { showMessage } from 'react-native-flash-message';

interface ConfirmImageModalProps extends ModalProps {
  uri: string;
  onSave: (comment: string) => void;
}

const ConfirmImageModal: FC<ConfirmImageModalProps> = ({ uri, onSave, ...otherProps }) => {
  const [comment, setComment] = useState('');

  const handleSave = useCallback(() => {
    if (!comment) {
      showMessage({
        type: 'danger',
        icon: 'auto',
        message: 'Чтобы нажать Сохранить, сначала напишите комментарий',
      });

      return;
    }

    onSave(comment);
    setComment('');
  }, [comment]);

  return (
    <Modal showConfirm={false} {...otherProps}>
      <Image
        source={{ uri }}
        style={{
          height: 300,
        }}
        resizeMode="cover"
      />

      <View style={styles.controlsContainer}>
        <FormGroup>
          <TextInput value={comment} onChangeText={setComment} label="Комментарий" />
        </FormGroup>

        <Button onPress={handleSave}>Сохранить</Button>
      </View>
    </Modal>
  );
};

export default ConfirmImageModal;

const styles = StyleSheet.create({
  container: {},
  controlsContainer: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
});
