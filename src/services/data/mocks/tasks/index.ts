import { TaskSchema } from '../..';

export const noSignTasks: TaskSchema[] = [
  {
    id: 232,
    title: 'ТКО',
    time: '2021-05-27T18:21:00',
    location: 'АБВ5040',
    status: 'pending',
    signDetails: null,
    type: 'ppo',
    customer: 'Победа',
    airline: 'Победа',
    borderNumber: 'VQ-BJH',
    aircraftType: 'Airbus 320',
    mc: 25,
    workStartDate: '2021-05-27T13:15:00',
    additionalInfo: '-',
    route: {
      from: 'СЫВ',
      to: 'ВНК',
    },
    flight: 'ЮТ376',
    staEta: '00:00 / 23:41',
    date: '2021-05-27T18:21:00',
    board: 'VQ-BIG',
    arrival: 'Расписание 00:05. Прибыл 23:53 (-00:12)',
    parking: '29 (ТЭ)',
    platform: 'ВНК – Перрон 1',
    terminal: 'A',
    exit: '-',
    passFact: '91/5/0',
    passAodb: '91/5/0',
    luggageFact: '0/0/1198/0',
    luggageAodb: '0/0/1198',
  },
  {
    id: 233,
    title: 'ТКО',
    time: '2021-05-27T18:21:00',
    location: 'АБВ5040',
    status: 'in_progress',
    signDetails: null,
    type: 'ppo',
    customer: 'Победа',
    airline: 'Победа',
    borderNumber: 'VQ-BJH',
    aircraftType: 'Airbus 320',
    mc: 25,
    workStartDate: '2021-05-27T13:15:00',
    additionalInfo: '-',
    route: {
      from: 'СЫВ',
      to: 'ВНК',
    },
    flight: 'ЮТ376',
    staEta: '00:00 / 23:41',
    date: '2021-05-27T18:21:00',
    board: 'VQ-BIG',
    arrival: 'Расписание 00:05. Прибыл 23:53 (-00:12)',
    parking: '29 (ТЭ)',
    platform: 'ВНК – Перрон 1',
    terminal: 'A',
    exit: '-',
    passFact: '91/5/0',
    passAodb: '91/5/0',
    luggageFact: '0/0/1198/0',
    luggageAodb: '0/0/1198',
  },
];
