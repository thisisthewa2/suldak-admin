export const commonColor = {
  primary: "#1677ff",
  primaryHover: "#4096ff",
}

/** 다크 모드 테마 */
export const darkTheme = {
  ...commonColor,
  bgColor: "#121212",
  componentBgColor: "#242424",
  boxShadow: 'none',
  hoverColor: "#4A4A4A",

  // 텍스트 색상
  text: {
    primary: "#E4E4E4",
    secondary: "#B0B0B0",
  },

  // 강조용 색상
  utils: {
    accent: "#1E88E5",
    accentHover: "#1A78D1",
    error: "FF6B6B",
    errorHover: "#E65C5C",
    success: "#81C784",
    successHover: "#74B475"
  },

  // 폼 색상
  form: {
    border: 'rgba(255, 255, 255, 0.25)'
  }
}

/** 라이트 모드 테마 */
export const lightTheme = {
  ...commonColor,
  bgColor: "#F2EDF3",
  componentBgColor: "#F4F4F4",
  boxShadow: '10px 10px 15px 2px #bac1ce',
  hoverColor: "#C0C0C0",

  text: {
    primary: "#333333",
    secondary: "#666666",
  },

  utils: {
    accent: "#007BFF",
    accentHover: "#0068E6",
    error: "#D9534F",
    errorHover: "#C24845",
    success: "#5CB85C",
    successHover: "#53A753"
  },

  form: {
    border: '#dee2e6'
  }
}


export const theme = {
  lightTheme, darkTheme
}