import { useEffect } from 'react';
import { BaseNavigationProp } from '../navigation/props';

/**
 * Hook to hide tabbar from the nested component
 *
 * @param {*} navigation - Navigation object
 */
const useHideTabbar = (navigation: BaseNavigationProp) => {
  useEffect(() => {
    const parent = navigation.dangerouslyGetParent();

    parent.setOptions({ tabBarVisible: false });

    return () => {
      parent.setOptions({ tabBarVisible: true });
    };
  }, []);
};

export default useHideTabbar;
