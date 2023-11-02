export const getTagType = (type: string) => {
  switch (type) {
    case '주량':
      return 'drinking-capacity'
    case '도수':
      return 'liquor-abv'
    case '2차분류':
      return 'liquor-detail'
    case '재료':
      return 'liquor-material'
    case '1차분류':
      return 'liquor-name'
    case '판매처':
      return 'liquor-sell'
    case '추천안주':
      return 'liquor-snack'
    case '상태':
      return 'state-type'
    case '맛':
      return 'taste-type'
    default:
      return 'drinking-capacity';
  }
}