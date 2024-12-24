import { Box, SxProps } from '@mui/material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  tabName: string;
  sx?: SxProps;
}

export default function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, tabName, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`${tabName}-${index}`}
      aria-labelledby={`${tabName}-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </Box>
  );
}

export function a11yProps(index: number, tabName: string) {
  return {
    id: `${tabName}-${index}`,
    'aria-controls': `${tabName}-tabpanel-${index}`,
  };
}
