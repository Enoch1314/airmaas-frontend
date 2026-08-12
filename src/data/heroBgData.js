/** Shared photo plates for page heroes (from welcome asset set). */
export const HERO_PHOTOS = {
  skylineA: '/images/welcome/bg-brand.jpg',
  skylineB: '/images/welcome/bg-direct.jpg',
  skylineC: '/images/welcome/bg-smart.jpg',
  skylineD: '/images/welcome/bg-guarantee.jpg',
  gallery: '/images/welcome/memory-1.jpg',
  bund: '/images/welcome/memory-2.jpg',
  cafe: '/images/welcome/memory-3.jpg',
}

/** Page → photo. Varied on purpose so consecutive screens don't feel identical. */
export const pageHeroPhoto = {
  home: HERO_PHOTOS.bund,
  directPlan: HERO_PHOTOS.skylineB,
  smartPlan: HERO_PHOTOS.skylineC,
  needConfirm: HERO_PHOTOS.skylineA,
  generating: HERO_PHOTOS.gallery,
  compare: HERO_PHOTOS.skylineD,
  planDetail: HERO_PHOTOS.skylineB,
  timeGuarantee: HERO_PHOTOS.skylineD,
  serviceSelect: HERO_PHOTOS.cafe,
  matching: HERO_PHOTOS.skylineA,
  orderConfirm: HERO_PHOTOS.skylineC,
  bookingSuccess: HERO_PHOTOS.bund,
  itinerary: HERO_PHOTOS.skylineC,
  flight: HERO_PHOTOS.skylineB,
  flightScenic: HERO_PHOTOS.bund,
  activity: HERO_PHOTOS.gallery,
  returnAdjust: HERO_PHOTOS.skylineA,
  tripAdjust: HERO_PHOTOS.skylineC,
  tripResult: HERO_PHOTOS.cafe,
  weekendReport: HERO_PHOTOS.gallery,
  reportCover: HERO_PHOTOS.bund,
  timeBank: HERO_PHOTOS.cafe,
  profile: HERO_PHOTOS.skylineD,
}
