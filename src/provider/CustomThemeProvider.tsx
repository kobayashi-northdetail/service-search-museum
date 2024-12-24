'use client';

import { createTheme, ThemeProvider } from '@mui/material';

export default function CustomThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = createTheme({});
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
