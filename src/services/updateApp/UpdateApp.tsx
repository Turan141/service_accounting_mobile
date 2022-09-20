import { GET } from '../../utils';
import { logToConsole } from '../../utils/formatting';
import BaseService from '../BaseService';

// ReactNativeBlobUtil.config({
//   fileCache: true,
//   // android only options, these options be a no-op on IOS
//   addAndroidDownloads: {
//     // Show notification when response data transmitted
//     notification: true,
//     // Title of download notification
//     title: 'Great ! Download Success ! :O ',
//     // File description (not notification description)
//     description: 'An image file.',
//     mime: 'image/png',
//     // Make the file scannable  by media scanner
//     mediaScannable: true,
//   },
// })
//   .fetch('GET', 'http://example.com/image1.png')
//   .then(() => console.log('hello'));

export class UpdateService extends BaseService {
  basePath = '/clients';

  // downloadPDF = async (fileName: string): Promise<any> => {
  //   //Define path to store file along with the extension
  //   const path = `${DocumentDirectoryPath}/${fileName}.pdf`;
  //   const headers = {
  //     Accept: 'application/pdf',
  //     'Content-Type': 'application/pdf',
  //     Authorization: `Bearer [token]`,
  //   };
  //   //Define options
  //   const options: any = {
  //     fromUrl: `/clients/Distributor/GetFileFromMinio/${fileName}`,
  //     toFile: path,
  //     headers: headers,
  //   };
  //   //Call downloadFile
  //   const response = await downloadFile(options);
  //   return response.promise.then(async res => {
  //     if (res && res.statusCode === 200 && res.bytesWritten > 0) {
  //       console.log(res);
  //     } else {
  //       console.log(res);
  //     }
  //   });
  // };

  getVersion = async () => {
    try {
      const response = await this.send(GET, '', '/ApplicationOption/MobileVersion', {}, {});
      return response;
    } catch (error) {
      logToConsole(error);
    }
  };
  downloadApp = async (fileName: any) => {
    try {
      const response = await this.send(GET, '', `/Distributor/GetFileFromMinio/${fileName}`, {}, {});

      console.log(response);
      //   logToConsole(response);
      return response;
    } catch (error) {
      logToConsole(error);
    }
  };
}
const updateService = new UpdateService();

export default updateService;
// {
//     fileCache: true,
//     addAndroidDownloads : {
//       useDownloadManager : true, // setting it to true will use the device's native download manager and will be shown in the notification bar.
//       notification : false,
//       description : 'Downloading image.'
//     }
