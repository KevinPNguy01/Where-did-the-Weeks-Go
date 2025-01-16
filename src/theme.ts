import { createTheme } from "@mui/material";

export const theme = createTheme({
    palette: {
		mode: 'dark',
		text: {
			primary: 'rgba(255,255,255,0.87)',
		},
		background: {
			paper: '#222',
			default: '#333',
		},
    },
    typography: {
        allVariants: {
            color: 'rgba(255,255,255,0.87)',
          },      
    }
});