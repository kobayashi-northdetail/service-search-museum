import { AllFacilityProps } from '@/types';
import { Avatar, Box, IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import FacilityCardDetail from '@/components/parts/facility-card/FacilityCardDetail';
import { KeyboardEvent, MouseEvent } from 'react';

type Anchor = 'top' | 'left' | 'bottom' | 'right';
export default function FacilityDrawer(
  anchor: Anchor,
  toggleDrawer: (
    anchor: Anchor,
    open: boolean
  ) => (event: KeyboardEvent | MouseEvent) => void,
  facility: AllFacilityProps
) {
  return (
    <Box
      sx={{
        width: 'auto',
        maxHeight: '80vh',
        overflowY: 'auto',
        position: 'relative',
      }}
      role="presentation"
      onClick={(e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        const target = e.target as HTMLElement;
        if (target.closest('.MuiDrawer-paper')) {
          return;
        }
        toggleDrawer(anchor, false)(e);
      }}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          right: 0,
          textAlign: 'right',
          height: 0,
          zIndex: 1,
        }}
      >
        <IconButton onClick={toggleDrawer(anchor, false)}>
          <Avatar sx={{ width: 20, height: 20 }}>
            <ClearIcon fontSize="small" sx={{ width: 15, height: 15 }} />
          </Avatar>
        </IconButton>
      </Box>
      <FacilityCardDetail facility={facility} />
    </Box>
  );
}
