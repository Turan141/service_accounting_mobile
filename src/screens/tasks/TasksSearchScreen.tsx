import React, { FC, useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { RefreshControl, StyleSheet } from 'react-native';
import { ScrollViewContainer } from '../../ui-kit/Containers';
import { TasksCalendar, TasksOldSearchQueries } from '../../components/Tasks';
import { SearchBar } from '../../ui-kit/Forms';
import SpinnerLoading from '../../ui-kit/SpinnerLoading';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { TasksScreenProps } from '../../navigation/props';
import { observer } from 'mobx-react';
import { useAppStore, useDictionariesStore, useTendersStore, useUserStore } from '../../store/hooks';
import { storageService } from '../../services';
import { TENDER_SEARCH_RESULTS_KEY } from '../../utils';
import { TaskStatusesEnum } from '../../services/data';
import { DocumentItemView } from '../../typings/swagger/api';
import { Select } from '../../ui-kit/Selects';
import { colors } from '../../theme';
import { logToConsole } from '../../utils/formatting';
import { useForm, Controller } from 'react-hook-form';

export interface TenderSearchFormValues {
  aircraftParking: DocumentItemView;
  onboardType: DocumentItemView;
  searchQuery: string;
}

const FILTER_HEIGHT = 150;

const TasksSearchScreen: FC<TasksScreenProps> = ({ navigation }) => {
  const { user } = useUserStore();
  const { loading } = useAppStore();
  const { parking, onboardTypes, getDictionaryItemsByType } = useDictionariesStore();
  const { tenders, showResults, getTenders, setShowResults, setCurrentTender } = useTendersStore();
  const [oldSearchQueries, setOldSearchQueries] = useState<string[]>([]);

  const [filterParking, setFilterParking] = useState<string>('');
  const [filterTransports, setFilterTransports] = useState<string>('');

  const animatedValue = useSharedValue(150);

  const toggleFilter = useCallback(() => {
    const config = { duration: 100 };
    if (animatedValue.value === FILTER_HEIGHT) {
      animatedValue.value = withTiming(0, config);
    } else {
      animatedValue.value = withTiming(FILTER_HEIGHT, config);
    }
  }, []);

  const filterStyle = useAnimatedStyle(() => {
    return {
      height: animatedValue.value,
      opacity: interpolate(animatedValue.value, [0, FILTER_HEIGHT], [0, 1]),
      paddingVertical: interpolate(animatedValue.value, [0, FILTER_HEIGHT], [0, 15]),
    };
  }, []);

  const {
    handleSubmit,
    formState: { errors, isDirty },
    control,
    watch,
    setError,
    clearErrors,
    reset,
    setValue,
  } = useForm<TenderSearchFormValues>({
    defaultValues: {
      aircraftParking: null,
      onboardType: null,
      searchQuery: '',
    },
    resolver: undefined,
    context: undefined,
    criteriaMode: 'firstError',
    shouldFocusError: false,
    shouldUnregister: false,
    shouldUseNativeValidation: false,
    delayError: undefined,
  });

  const parkingItem = watch('aircraftParking');
  const onboardItem = watch('onboardType');

  const resetForm = useCallback(() => {
    reset();
    fetchData('');
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Controller
          control={control}
          rules={{
            required: false,
          }}
          name="searchQuery"
          render={({ field: { onChange, value } }) => (
            <SearchBar
              dirty={isDirty}
              value={value}
              onChangeText={onChange}
              onClear={resetForm}
              onFocus={() => setShowResults(false)}
              onSubmitEditing={handleEndSearchInput}
              onToggleFilter={toggleFilter}
            />
          )}
        />
      ),
    });
  }, []);

  useEffect(() => {
    handleEndSearchInput();
  }, []);

  useEffect(() => {
    getDictionaryItemsByType('AircraftParkings', {
      skip: 0,
      take: 40,
      valuesFilter: {
        airport: 'EE47EA3C-84F9-4B87-8686-AA7B2662F454',
      },
      propertiesSearch:
        filterParking.length > 0
          ? {
              fullMatch: true,
              properties: ['parkingNumber'],
              value: filterParking,
            }
          : undefined,
    });
  }, [filterParking]);

  useEffect(() => {
    getDictionaryItemsByType('Transports', {
      skip: 0,
      take: 40,
      filter: {
        name: filterTransports,
      },
    });
  }, [filterTransports]);

  useEffect(() => {
    fetchOldSearchQueries();
  }, [tenders]);

  useEffect(() => {
    fetchData(watch('searchQuery'));
  }, [parkingItem, onboardItem]);

  const fetchOldSearchQueries = async () => {
    const data = await storageService.getItem(TENDER_SEARCH_RESULTS_KEY);

    setOldSearchQueries(data || []);
  };

  const fetchData = useCallback(async (searchString: string) => {
    setValue('searchQuery', searchString);
    getTenders({
      take: 20,
      skip: 0,
      filter: {
        number: !isNaN(+searchString) ? searchString : undefined,
        statuses: [TaskStatusesEnum.Confirmed],
        valuesFilter: {
          serviceName: isNaN(+searchString) ? searchString : undefined,
          parking: watch('aircraftParking')?.masterCode,
          aircraftType: watch('onboardType')?.masterCode,
        },
      },
    });
    // Update the list of previous search queries in AsyncStorage
    if (searchString && !oldSearchQueries.includes(searchString)) {
      storageService.setItem(TENDER_SEARCH_RESULTS_KEY, [searchString, ...oldSearchQueries]);
    }
  }, []);

  const handleEndSearchInput = useCallback(() => {
    fetchData(watch('searchQuery'));
  }, []);

  if (loading) {
    return <SpinnerLoading />;
  }

  return (
    <>
      <Animated.View style={[styles.filter, filterStyle]}>
        <Controller
          control={control}
          rules={{
            required: false,
          }}
          name="aircraftParking"
          render={({ field: { onChange, value } }) => (
            <Select
              containerStyle={{ marginBottom: 10 }}
              value={value}
              searchValue={filterParking}
              setSearchValue={setFilterParking}
              valueStyle={{ color: colors.blue.light }}
              label={'Место стоянки'}
              items={parking}
              onSelect={onChange}
            />
          )}
        />
        <Controller
          control={control}
          rules={{
            required: false,
          }}
          name="onboardType"
          render={({ field: { onChange, value } }) => (
            <Select
              value={value}
              searchValue={filterTransports}
              setSearchValue={setFilterTransports}
              label={'Бортовой номер'}
              valueStyle={{ color: colors.blue.light }}
              items={onboardTypes}
              onSelect={onChange}
            />
          )}
        />
      </Animated.View>
      <ScrollViewContainer
        noPadding
        refreshControl={<RefreshControl refreshing={loading} onRefresh={() => fetchData('')} />}
      >
        {!showResults ? (
          <TasksOldSearchQueries items={oldSearchQueries} onSelect={query => fetchData(query)} />
        ) : (
          <TasksCalendar
            setCurrentTender={setCurrentTender}
            loading={loading}
            showResults={showResults}
            items={tenders}
            hideTime
          />
        )}
      </ScrollViewContainer>
    </>
  );
};

const styles = StyleSheet.create({
  filter: {
    padding: 15,
    backgroundColor: colors.blue.dark,
  },
});

export default observer(TasksSearchScreen);
