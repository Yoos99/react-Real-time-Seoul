export const getAgeGroupClassName = (ageGroup) => {
  switch (ageGroup) {
    case '10대':
      return 'teenagers';
    case '20대':
      return 'twenties';
    case '30대':
      return 'thirties';
    case '40대':
      return 'forties';
    case '50대':
      return 'fifties';
    case '60대':
      return 'sixties';
    default:
      return '';
  }
};
