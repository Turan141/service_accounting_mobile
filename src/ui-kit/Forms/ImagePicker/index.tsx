import React, { useState, useCallback, ReactNode, Fragment } from 'react';
import { View, Text, StyleSheet, ViewProps, Image } from 'react-native';
import { colors, fonts, layout } from '../../../theme';

import { IconButton, TouchableRipple } from 'react-native-paper';
import Modal from '../../Modal';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import { ImageLibraryOptions, launchCamera, launchImageLibrary, ImagePickerResponse } from 'react-native-image-picker';
import { ConfirmImageModal } from './components';
import { uniqueId } from 'lodash';
import { ImageAsset } from '../../../services/data';

export interface ImagePickerProps extends ViewProps {
  label?: string;
  uploadButton?: ReactNode;
  onSelect?: (files: ImageAsset[]) => void;
}

const options: ImageLibraryOptions = {
  mediaType: 'photo',
  includeBase64: true,
};

const ImagePicker = ({ label = 'Добавить фото', style, onSelect = () => {}, ...otherProps }: ImagePickerProps) => {
  const [files, setFiles] = useState([]);
  const [modal, setModal] = useState(false);
  const [typeComment, setTypeComment] = useState(false);
  const [currentAssetUri, setCurrentAssetUri] = useState('');

  const handleSaveComment = useCallback(
    (comment: string) => {
      onSelect(
        files.map(file => ({
          ...file,
          comment,
        }))
      );

      setTypeComment(false);
    },
    [files]
  );

  const handleTakePicturePress = useCallback((): void => {
    setModal(false);

    launchCamera(options, addAssetsCb);
  }, [files]);

  const handleFromGalleryPress = useCallback((): void => {
    setModal(false);

    launchImageLibrary(options, addAssetsCb);
  }, [files]);

  const addAssetsCb = useCallback(
    ({ assets, didCancel }: ImagePickerResponse) => {
      if (didCancel) return;

      if (assets.length > 0) {
        const assetsWithId = assets.map(asset => ({
          ...asset,
          id: +uniqueId(),
        }));

        setTypeComment(true);
        setCurrentAssetUri(assetsWithId[0].uri);

        setFiles(prevFiles => [...prevFiles, ...assetsWithId]);
      }
    },
    [files]
  );

  return (
    <Fragment>
      <View
        style={{
          alignItems: files.length > 0 ? 'flex-start' : 'center',
          flexDirection: files.length > 0 ? 'column' : 'row',
          justifyContent: files.length > 0 ? 'flex-start' : 'space-between',
        }}
        {...otherProps}
      >
        <Text style={fonts.paragraphRegular}>{label}</Text>

        <View style={styles.imagesContainer}>
          {files.map((file: ImageAsset) => (
            <Image
              key={file.id}
              source={{
                uri: file.uri,
              }}
              style={{
                width: 100,
                height: 100,
                marginRight: 10,
                marginBottom: 10,
              }}
              resizeMode="cover"
            />
          ))}

          <View style={layout.alignCenter}>
            <IconButton
              icon="plus"
              size={35}
              onPress={() => setModal(true)}
              style={{
                backgroundColor: colors.gray.secondary,
                padding: 0,
                margin: 0,
                width: 35,
                height: 35,
              }}
              color={colors.white}
            />
          </View>
        </View>
      </View>

      <ConfirmImageModal visible={typeComment} uri={currentAssetUri} onSave={handleSaveComment} />

      <Modal
        onBackdropPress={() => setModal(false)}
        visible={modal}
        showConfirm={false}
        bodyContainerStyle={{ padding: 0 }}
      >
        <TouchableRipple rippleColor={colors.blue.light} onPress={handleTakePicturePress}>
          <View style={styles.listItem}>
            <MaterialIcon name="camera" size={26} color={colors.gray.primary} />
            <Text style={styles.listText}>Сделать фото</Text>
          </View>
        </TouchableRipple>

        <TouchableRipple rippleColor={colors.blue.light} onPress={handleFromGalleryPress}>
          <View style={styles.listItem}>
            <MaterialIcon name="image" size={26} color={colors.gray.primary} />
            <Text style={styles.listText}>Выбрать из галереи</Text>
          </View>
        </TouchableRipple>
      </Modal>
    </Fragment>
  );
};

export default ImagePicker;

const styles = StyleSheet.create({
  imagesContainer: {
    ...layout.rowAlignItemsCenter,
    flexWrap: 'wrap',
  },
  listItem: {
    ...layout.rowAlignItemsCenter,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  listText: {
    ...fonts.paragraphMedium,
    color: colors.black,
    flexGrow: 1,
    marginLeft: 24,
  },
});
