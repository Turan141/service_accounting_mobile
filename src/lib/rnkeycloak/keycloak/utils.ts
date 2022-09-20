import { fetch as origFetch } from 'react-native-ssl-pinning';
import isIP from '../../../utils/http/isIp';

const fetch = (url, options) => {
  return origFetch(url, {
    ...options,
    ...(isIP(url) && {
      sslPinning: {
        certs: ['ca'],
      },
    }),
    disableAllSecurity: !isIP(url),
    timeoutInterval: 10000,
  });
};

export async function fetchJSON<T>(url: string, token?: string): Promise<T> {
  const jsonRes = await fetch(url, {
    headers: {
      Accept: 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
    },
  });

  return await jsonRes.json();
}
