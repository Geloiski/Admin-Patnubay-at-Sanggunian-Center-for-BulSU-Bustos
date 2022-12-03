const theme = (isDarkMode) => ({

    palette: {
        mode: isDarkMode ? 'light' : "dark",
        primary: {
          //main: "#FF0000",
          main:"#2E8359",

        },
        secondary: {
          main: '#3A1C1C',
        },

        tertiary: {
          main: '#fff',
        },
        
        
      
      },
      typography: {
        fontFamily: 'sans-serif',
      },
       components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: "#6b6b6b #2b2b2b",
          "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
            backgroundColor: "white",
            width: 4,
          },
          "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
            borderRadius: 8,
            backgroundColor: "#2E8359",
            minHeight: 10,
            borderRight: "2px solid #2E8359",
            
     
          },
          "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus": {
            backgroundColor: "#959595",
          },
          "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active": {
            backgroundColor: "#959595",
          },
          "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#959595",
          },
          "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
            backgroundColor: "#2b2b2b",
          },
        },
      },
    },
  },
      
});

export default theme;