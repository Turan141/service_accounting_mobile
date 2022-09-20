import React, { FC, useEffect } from 'react';
import { StyleSheet } from 'react-native';

import { ScrollViewContainer } from '../../ui-kit/Containers';
import { FormGroup } from '../../ui-kit/Forms';
import SpinnerLoading from '../../ui-kit/SpinnerLoading';
import ImagesPreview from '../../components/ImagesPreview';

import { useAppStore, useServicesStore } from '../../store/hooks';
import { observer } from 'mobx-react-lite';
import { format } from 'date-fns';
import NoDataFound from '../../components/NoDataFound';

const PhotofixationScreen: FC = () => {
  const { loading } = useAppStore();
  const { photofixationImages, getPhotofixationImages } = useServicesStore();

  useEffect(() => {
    getPhotofixationImages();
  }, []);

  if (loading) return <SpinnerLoading />;

  return (
    <ScrollViewContainer>
      {photofixationImages.length ? (
        <FormGroup>
          {photofixationImages.map((image, idx) => (
            <ImagesPreview
              key={idx}
              items={image.images.map(img => ({ id: img.id, comment: img.comment, uri: img.url }))}
              title={format(new Date(image.dateTime), 'd.MM.y')}
              isBase64
              showComments={false}
            />
          ))}
        </FormGroup>
      ) : (
        <NoDataFound />
      )}
    </ScrollViewContainer>
  );
};

export default observer(PhotofixationScreen);

const styles = StyleSheet.create({});
