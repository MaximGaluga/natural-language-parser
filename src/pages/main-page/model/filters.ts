import { RadioGroupProps } from 'ant-design-vue'
import { FILTER_TYPE } from './types'

const filters: RadioGroupProps['options'] = [
	{ label: 'Выкл.', value: FILTER_TYPE.NONE },
	{ label: 'Сущ.', value: FILTER_TYPE.NOUN },
	{ label: 'Прил. (полное)', value: FILTER_TYPE.ADJF },
	{ label: 'Прил. (краткое)', value: FILTER_TYPE.ADJS },
	{ label: 'Компаратив', value: FILTER_TYPE.COMP },
	{ label: 'Гл. (лич. ф.)', value: FILTER_TYPE.VERB },
	{ label: 'Гл. инф.', value: FILTER_TYPE.INFN },
	{ label: 'Прич. (полное)', value: FILTER_TYPE.PRTF },
	{ label: 'Прич. (краткое)', value: FILTER_TYPE.PRTS },
	{ label: 'Деепр.', value: FILTER_TYPE.GRND },
	{ label: 'Числит.', value: FILTER_TYPE.NUMR },
	{ label: 'Нареч.', value: FILTER_TYPE.ADVB },
	{ label: 'Мест.-сущ.', value: FILTER_TYPE.NPRO },
	{ label: 'Предикатив', value: FILTER_TYPE.PRED },
	{ label: 'Предлог', value: FILTER_TYPE.PREP },
	{ label: 'Союз', value: FILTER_TYPE.CONJ },
	{ label: 'Частица', value: FILTER_TYPE.PRCL },
	{ label: 'Междометие', value: FILTER_TYPE.INTJ },
];

export { filters }