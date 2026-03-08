export interface City {
  id: number;
  name: Record<'en' | 'hy' | 'ru', string>;
}

/** ~30 cities for Infocity (Armenia-focused) */
export const CITIES: City[] = [
  { id: 1, name: { en: 'Yerevan', hy: 'Երևան', ru: 'Ереван' } },
  { id: 2, name: { en: 'Gyumri', hy: 'Գյումրի', ru: 'Гюмри' } },
  { id: 3, name: { en: 'Vanadzor', hy: 'Վանաձոր', ru: 'Ванадзор' } },
  { id: 4, name: { en: 'Vagharshapat', hy: 'Վաղարշապատ', ru: 'Вагаршапат' } },
  { id: 5, name: { en: 'Abovyan', hy: 'Աբովյան', ru: 'Абовян' } },
  { id: 6, name: { en: 'Kapan', hy: 'Կապան', ru: 'Капан' } },
  { id: 7, name: { en: 'Hrazdan', hy: 'Հրազդան', ru: 'Раздан' } },
  { id: 8, name: { en: 'Armavir', hy: 'Արմավիր', ru: 'Армавир' } },
  { id: 9, name: { en: 'Artashat', hy: 'Արտաշատ', ru: 'Арташат' } },
  { id: 10, name: { en: 'Gavar', hy: 'Գավառ', ru: 'Гавар' } },
  { id: 11, name: { en: 'Goris', hy: 'Գորիս', ru: 'Горис' } },
  { id: 12, name: { en: 'Charentsavan', hy: 'Չարենցավան', ru: 'Чаренцаван' } },
  { id: 13, name: { en: 'Masis', hy: 'Մասիս', ru: 'Масис' } },
  { id: 14, name: { en: 'Ararat', hy: 'Արարատ', ru: 'Арарат' } },
  { id: 15, name: { en: 'Ijevan', hy: 'Իջևան', ru: 'Иджеван' } },
  { id: 16, name: { en: 'Ashtarak', hy: 'Աշտարակ', ru: 'Аштарак' } },
  { id: 17, name: { en: 'Dilijan', hy: 'Դիլիջան', ru: 'Дилижан' } },
  { id: 18, name: { en: 'Sisian', hy: 'Սիսիան', ru: 'Сисиан' } },
  { id: 19, name: { en: 'Alaverdi', hy: 'Ալավերդի', ru: 'Алаверди' } },
  { id: 20, name: { en: 'Stepanavan', hy: 'Ստեփանավան', ru: 'Степанаван' } },
  { id: 21, name: { en: 'Martuni', hy: 'Մարտունի', ru: 'Мартуни' } },
  { id: 22, name: { en: 'Spitak', hy: 'Սпитаք', ru: 'Спитак' } },
  { id: 23, name: { en: 'Vardenis', hy: 'Վարդենիս', ru: 'Варденис' } },
  { id: 24, name: { en: 'Yeghvard', hy: 'Եղվարդ', ru: 'Егвард' } },
  { id: 25, name: { en: 'Vedi', hy: 'Վեդի', ru: 'Веди' } },
  { id: 26, name: { en: 'Byureghavan', hy: 'Բյուրեղավան', ru: 'Бюрегаван' } },
  { id: 27, name: { en: 'Metsamor', hy: 'Մեծամոր', ru: 'Мецамор' } },
  { id: 28, name: { en: 'Berd', hy: 'Բերդ', ru: 'Берд' } },
  { id: 29, name: { en: 'Noyemberyan', hy: 'Նոյեմբերյան', ru: 'Ноемберян' } },
  { id: 30, name: { en: 'Tashir', hy: 'Տաշիր', ru: 'Ташир' } },
];
