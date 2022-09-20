import { TreatmentTypesEnum } from '../../services/data';

export default (treatmentType: TreatmentTypesEnum) => {
  if (!treatmentType) return null;

  const map = {
    [TreatmentTypesEnum.Fuselage]: 'фюзеляжа',
    [TreatmentTypesEnum.Keel]: 'киля',
    [TreatmentTypesEnum.StabilizerBottom]: 'низа стабилизатора',
    [TreatmentTypesEnum.StabilizerTop]: 'верха стабилизатора',
    [TreatmentTypesEnum.WingBottom]: 'низа крыла',
    [TreatmentTypesEnum.WingTop]: 'верха крыла',
  };

  return map[treatmentType] ?? 'Неверно';
};
