import { loginUserParamsSelector } from '@/store/atoms';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { TransitionProps } from '@mui/material/transitions';
import { useAtomValue } from 'jotai';
import { forwardRef, ReactElement, Ref } from 'react';

type AccountSettingProps = {
  accountOpen: boolean;
  handleAccountClose: () => void;
};

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<unknown>;
  },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AccountSetting({
  accountOpen,
  handleAccountClose,
}: AccountSettingProps) {
  const theme = useTheme();
  const fullScreenAccount = useMediaQuery(theme.breakpoints.down('md'));
  const loginUserParams = useAtomValue(loginUserParamsSelector);

  return (
    <Dialog
      fullScreen={fullScreenAccount}
      open={accountOpen}
      onClose={handleAccountClose}
      aria-labelledby="responsive-dialog-title"
      TransitionComponent={fullScreenAccount ? Transition : undefined}
    >
      <DialogTitle id="responsive-dialog-title">アカウント設定</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          {Object.entries(loginUserParams).map(([key, value]) => (
            <Stack
              key={key}
              direction="row"
              spacing={1}
              alignItems="center"
              sx={{
                pb: 1,
                borderBottom: '1px solid',
                borderColor: 'divider',
              }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                {value.title} :
              </Typography>
              <Typography variant="body1">{value.value}</Typography>
            </Stack>
          ))}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAccountClose} autoFocus>
          閉じる
        </Button>
      </DialogActions>
    </Dialog>
  );
}
