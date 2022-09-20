export function routeCategory(item: any, lang: 'ru' | 'en') {
  switch (item.properties.category) {
    case '1':
      if (lang === 'ru') {
        return 'Гейт';
      } else {
        return 'Gate';
      }
    case '0':
      if (lang === 'ru') {
        return 'MC';
      } else {
        return 'Parking place';
      }
    case '2':
      if (lang === 'ru') {
        return 'Брифинг';
      } else {
        return 'Briefing';
      }
    case '3':
      if (lang === 'ru') {
        return 'Другое';
      } else {
        return 'Other';
      }
  }
}
