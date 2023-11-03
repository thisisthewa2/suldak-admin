export const Color = {
  primary: "#1677ff",
  primaryHover: "#4096ff",

  yellow: '#f1d953',
  green: "#60d083",
  greenHover: "#57bd7b",
  red: '#ff3d60',
  redHover: "#eb4f64",
  gray: '#6C757D',
  grayHover: '#5c636a'
}

/** 다크 모드 테마 */
export const darkTheme = {
  ...Color,
  bgColor: "#1e222d",
  componentBgColor: "#262b3a",
  boxShadow: 'none',
  hoverColor: "#303744",

  // 텍스트 색상
  text: {
    primary: "#EFF2F7",
    secondary: "#919BAE",
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
  },

  nav: {
    bgColor: "#262b3a",
    textColor: "#EFF2F7",
    hoverColor: "#303744",
  }
}

/** 라이트 모드 테마 */
export const lightTheme = {
  ...Color,
  bgColor: "#f3f3f4",
  componentBgColor: "#FFFFFF",
  boxShadow: '0 1px 1px rgba(0,0,0,.08)',
  hoverColor: "#C0C0C0",

  text: {
    primary: "#343A40",
    secondary: "#505D69",
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
  },

  nav: {
    bgColor: "#FFFFFF",
    textColor: "#343A40",
    hoverColor: "#C0C0C0"
  }
}


export const theme = {
  lightTheme, darkTheme
}