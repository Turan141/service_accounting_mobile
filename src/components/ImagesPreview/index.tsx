import React, { FC, useState } from 'react';
import { Image, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { fonts, layout } from '../../theme';

import { ImageAsset } from '../../services/data';
import { TouchableRipple } from 'react-native-paper';
import { ImagePreviewModal } from './components';

export interface ImagesPreviewProps {
  title?: string;
  items: ImageAsset[];
  containerStyle?: StyleProp<ViewStyle>;
  showComments?: boolean;
  showCommentsLabel?: boolean;
  isBase64?: boolean;
}

const ImagesPreview: FC<ImagesPreviewProps> = ({
  title,
  items = [],
  containerStyle,
  showComments = true,
  showCommentsLabel = true,
  isBase64 = false,
}) => {
  const [preview, setPreview] = useState(false);
  const [previewImage, setPreviewImage] = useState<ImageAsset>(null);

  const handleOpenPreview = (image: ImageAsset) => {
    setPreviewImage(image);
    setPreview(true);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {title && <Text style={styles.title}>{title}</Text>}

      <View style={styles.imagesContainer}>
        {items.map((image: ImageAsset) => (
          <View style={{ marginRight: 20 }} key={image.id}>
            <TouchableRipple
              onPress={() => handleOpenPreview(image)}
              style={{ marginRight: 10, marginBottom: 10 }}
              borderless
            >
              <Image
                source={{
                  uri: isBase64 ? `data:image/jpeg;base64,${image?.uri}` : image?.uri,
                }}
                style={{
                  width: 100,
                  height: 100,
                }}
                resizeMode="cover"
              />
            </TouchableRipple>

            {image.comment && showComments ? (
              <View style={{ marginBottom: 10 }}>
                {showCommentsLabel && <Text style={fonts.paragraphRegular}>Комментарий</Text>}
                <Text style={fonts.paragraphSemibold}>{image.comment}</Text>
              </View>
            ) : null}
          </View>
        ))}
      </View>

      <ImagePreviewModal isBase64={isBase64} visible={preview} onClose={() => setPreview(false)} image={previewImage} />
    </View>
  );
};

export default ImagesPreview;

const styles = StyleSheet.create({
  container: {},
  title: {
    ...fonts.paragraphRegular,
    marginBottom: 10,
  },
  imagesContainer: {
    ...layout.rowAlignItemsCenter,
    flexWrap: 'wrap',
  },
});
