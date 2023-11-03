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

export const TagTypes = [
  {
    value: 'drinking-capacity', label: '주량',
  },
  {
    value: 'liquor-abv', label: '도수'
  },
  {
    value: 'liquor-name', label: '1차분류'
  },
  {
    value: 'liquor-detail', label: '2차분류'
  },
  {
    value: 'liquor-material', label: '재료'
  },
  {
    value: 'liquor-sell', label: '판매처'
  },
  {
    value: 'liquor-snack', label: '추천안주'
  },
  {
    value: 'state-type', label: '상태'
  },
  {
    value: 'taste-type', label: '맛'
  }
]