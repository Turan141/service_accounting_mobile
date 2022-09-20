import React, { useMemo } from 'react';
import { DocumentItemNamesEnum } from '../../store/data/documents';
import Paper from '../../ui-kit/Paper';
import Divider from '../../ui-kit/Divider';
import { SimpleList } from '../../ui-kit/Lists';
import { format } from 'date-fns';
import colors from '../../theme/colors';
import { useTendersStore } from '../../store/hooks';
import { TaskStatusesEnum } from '../../services/data';

interface MonoServiceExecutionTimeProps {
  itemType: DocumentItemNamesEnum;
  language: 'ru' | 'en';
}

const sign = {
  ru: {
    completeTime: 'Время окончания:',
    startTime: 'Время начала:',
    duration: 'Продолжительность (мин.):',
    forcedDownTimeTime: 'Время простоя:',
    outcome: 'Итог:',
  },
  en: {
    completeTime: 'End time:',
    startTime: 'Start time:',
    duration: 'Duration (minutes):',
    forcedDownTimeTime: 'Downtime:',
    outcome: 'Outcome:',
  },
};

const MonoServiceExecutionTime: React.FC<MonoServiceExecutionTimeProps> = ({ itemType, language }) => {
  const {
    currentTender: { properties, items, status },
  } = useTendersStore();

  const forcedDownTimeTime = useMemo(() => {
    const data = items?.find(item => item.type === DocumentItemNamesEnum.ForcedDownTime);
    if (data && data.status === TaskStatusesEnum.Completed) {
      return format(new Date(+data.properties?.completed - +data.properties?.started), 'mm:ss');
    }
    return null;
  }, []);

  const data = items?.find(item => item.type === itemType);
  const started = data.properties?.started;
  const completed = data.properties?.completed;

  return (
    <Paper title={sign[language].outcome} titleStyle={{ marginBottom: 0 }} style={{ marginBottom: 0 }}>
      <Divider />
      <SimpleList>
        {started && completed && (
          <>
            <SimpleList.Item
              title={sign[language].startTime}
              value={format(new Date(+started), 'dd.MM.y в HH:mm')}
              hideBorder
            />
            <SimpleList.Item
              title={sign[language].completeTime}
              value={format(new Date(+completed), 'dd.MM.y в HH:mm')}
              hideBorder
            />
            <SimpleList.Item
              title={sign[language].duration}
              value={Math.ceil((+completed - +started) / 60000).toString()}
              hideBorder
            />
          </>
        )}
        {forcedDownTimeTime && (
          <SimpleList.Item
            titleStyle={{ color: colors.red.primary }}
            valueStyle={{ color: colors.red.primary }}
            title={sign[language].forcedDownTimeTime}
            value={forcedDownTimeTime}
            hideBorder
          />
        )}
      </SimpleList>
    </Paper>
  );
};

export default MonoServiceExecutionTime;
