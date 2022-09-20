import React, { Component, useState } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  Platform,
  TouchableOpacity,
  PermissionsAndroid,
  Alert,
  Button,
} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import updateService from '../../services/updateApp/UpdateApp';
import { rootStore } from '../../store/RootStore';

const UpdateApp = () => {
  const [actualApp, setActualApp] = useState('') as any;
  console.log(actualApp);
  const getActualAppVersion = async () => {
    await updateService.getVersion().then(resp => setActualApp(resp?.applicationOptionValue));
  };
  const fileUrl = `https://clients.test.utg.group/clients/Distributor/GetFileFromMinio/${actualApp}`;

  const checkPermission = async () => {
    if (Platform.OS === 'ios') {
      downloadFile();
    } else {
      try {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE, {
          title: 'Storage Permission Required',
          message: 'Application needs access to your storage to download File',
          buttonPositive: '1',
        });
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          downloadFile();
          console.log('Storage Permission Granted.');
        } else {
          Alert.alert('Error', 'Storage Permission Not Granted');
        }
      } catch (err) {
        console.log('++++' + err);
      }
    }
  };
  const downloadFile = () => {
    // Get today's date to add the time suffix in filename
    let date = new Date();
    let FILE_URL = fileUrl;
    // let file_ext = getFileExtention(FILE_URL);
    //let file_ext = '.' + file_ext[0];
    const { config, fs } = RNFetchBlob;
    let RootDir = fs.dirs.DownloadDir;
    const android = RNFetchBlob.android;

    let options = {
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        mime: '*',
        description: 'downloading file...',
        notification: true,
        mediaScannable: true,
        path: RootDir + '/' + actualApp,
      },
    };
    config(options)
      .fetch('GET', FILE_URL, {
        Authorization: `Bearer ${rootStore.appStore?.keycloak?.token}`,
      })
      .then(res => {
        console.log(res.path());
      });
  };

  // const getFileExtention = fileUrl => {
  //   // To get the file extension
  //   return /[.]/.exec(fileUrl) ? /[^.]+$/.exec(fileUrl) : undefined;
  // };

  return (
    <>
      {actualApp ? (
        <>
          <View style={styles.mainButton}>
            <TouchableOpacity onPress={getActualAppVersion} style={styles.button}>
              <Text style={styles.text}> Обновить информацию</Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.actualApp}>{actualApp}</Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={checkPermission}>
            <Text style={styles.text}>Скачать</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActualApp('')} style={styles.button}>
            <Text style={styles.text}>Очистить </Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <View style={styles.mainButton}>
            <TouchableOpacity onPress={getActualAppVersion} color="white" style={styles.button}>
              <Text style={styles.text}>Показать актуальную версию </Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.actualApp}>{actualApp}</Text>
          </View>
        </>
      )}
    </>
  );
};

export default UpdateApp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  text: {
    color: '#fff',
    textAlign: 'center',
  },
  button: {
    width: '80%',
    padding: 10,
    backgroundColor: '#088F8F',
    margin: 10,
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  showActualApp: {
    fontFamily: 'Cochin',
    fontSize: 18,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderWidth: 1,
    borderColor: 'black',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'royalblue',
    color: '#141823',
  },
  downloadBtn: {
    fontFamily: 'Cochin',
    fontSize: 18,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderWidth: 1,
    borderColor: 'black',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'royalblue',
    color: '#141823',
  },
  mainButton: {
    fontWeight: 'bold',
    flexDirection: 'row',
    height: 100,
    padding: 20,
    marginTop: 45,
  },
  actualApp: {
    fontWeight: 'bold',
    flexDirection: 'row',
    fontSize: 24,
    height: 100,
    padding: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});
