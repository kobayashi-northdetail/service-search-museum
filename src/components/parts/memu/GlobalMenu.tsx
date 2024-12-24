'use client';

import { supabase } from '@/libs/supabaseClient';
import { loginUserAtom } from '@/store/atoms';
import {
  alpha,
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  styled,
  Toolbar,
} from '@mui/material';
import { useAtomValue } from 'jotai';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import MuseumIcon from '@mui/icons-material/Museum';
import MapIcon from '@mui/icons-material/Map';
import PinDropIcon from '@mui/icons-material/PinDrop';
import InfoIcon from '@mui/icons-material/Info';
import HelpIcon from '@mui/icons-material/Help';
import ForumIcon from '@mui/icons-material/Forum';
import MenuIcon from '@mui/icons-material/Menu';
import SitemarkIcon from './SitemarkIcon';
import ClearIcon from '@mui/icons-material/Clear';
import AccountSetting from './AccountSetting';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: 'blur(24px)',
  border: '1px solid',
  borderColor: theme.palette.divider,
  backgroundColor: alpha(theme.palette.background.default, 0.4),
  boxShadow: theme.shadows[1],
  padding: '8px 12px',
}));

export function GlobalMenu() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  // buttonをクリックしたらページ遷移する
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const handlePageTransition = (path: string) => {
    router.push(`${path}?${params.toString()}`);
    setOpen(false);
  };

  const loginUser = useAtomValue(loginUserAtom);
  const [accountMenuAnchorEl, setAccountMenuAnchorEl] =
    useState<null | HTMLElement>(null);
  const accountMenuOpen = Boolean(accountMenuAnchorEl);
  const handleAccountMenuClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAccountMenuAnchorEl(event.currentTarget);
  };
  const handleAccountMenuClose = () => {
    setAccountMenuAnchorEl(null);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setOpen(false);
    handleAccountMenuClose();
    router.push('/login');
  };

  const [accountOpen, setAccountOpen] = useState(false);
  const handleAccountOpen = () => {
    setAccountOpen(true);
    handleAccountMenuClose();
    setOpen(false);
  };
  const handleAccountClose = () => {
    setAccountOpen(false);
  };

  return (
    <StyledToolbar variant="dense" disableGutters sx={{ py: '4px' }}>
      <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0 }}>
        <SitemarkIcon />
        <Box sx={{ display: { xs: 'none', md: 'flex' }, ml: 'auto', gap: 2 }}>
          <Button
            variant="text"
            color="info"
            size="small"
            onClick={() => handlePageTransition('/facilities')}
            sx={{ fontWeight: 'bold' }}
            startIcon={<MuseumIcon fontSize="small" sx={{ mt: '-2px' }} />}
          >
            施設一覧
          </Button>
          <Button
            variant="text"
            color="info"
            size="small"
            onClick={() => handlePageTransition('/map')}
            sx={{ fontWeight: 'bold' }}
            startIcon={<MapIcon fontSize="small" sx={{ mt: '-2px' }} />}
          >
            地図
          </Button>
          <Button
            variant="text"
            color="info"
            size="small"
            onClick={() => handlePageTransition('/areas')}
            sx={{ fontWeight: 'bold' }}
            startIcon={<PinDropIcon fontSize="small" sx={{ mt: '-2px' }} />}
          >
            地域
          </Button>
          <Button
            variant="text"
            color="info"
            size="small"
            onClick={() => handlePageTransition('/info')}
            sx={{ fontWeight: 'bold' }}
            startIcon={<InfoIcon fontSize="small" sx={{ mt: '-2px' }} />}
          >
            新着情報
          </Button>
          <Button
            variant="text"
            color="info"
            size="small"
            onClick={() => handlePageTransition('/guide')}
            sx={{ fontWeight: 'bold' }}
            startIcon={<HelpIcon fontSize="small" sx={{ mt: '-2px' }} />}
          >
            操作方法
          </Button>
          <Button
            variant="text"
            color="info"
            size="small"
            onClick={() => handlePageTransition('/contact')}
            sx={{ fontWeight: 'bold' }}
            startIcon={<ForumIcon fontSize="small" sx={{ mt: '-2px' }} />}
          >
            お問い合わせ
          </Button>
          {loginUser && (
            <>
              <IconButton size="small" onClick={handleAccountMenuClick}>
                <Avatar
                  src={loginUser?.user?.user_metadata?.avatar_url || ''}
                  sx={{ width: 34, height: 34 }}
                />
              </IconButton>
              <Menu
                id="account-menu"
                anchorEl={accountMenuAnchorEl}
                open={accountMenuOpen}
                onClose={handleAccountMenuClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                {loginUser && (
                  <MenuItem onClick={handleAccountOpen} sx={{ fontSize: 14 }}>
                    アカウント設定
                  </MenuItem>
                )}
                <MenuItem onClick={handleLogout} sx={{ fontSize: 14 }}>
                  {loginUser ? 'ログアウト' : 'ログイン'}
                </MenuItem>
              </Menu>
            </>
          )}
        </Box>
      </Box>
      <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1 }}>
        {loginUser ? (
          <IconButton
            aria-label="Menu button"
            size="small"
            onClick={toggleDrawer(true)}
          >
            <Avatar
              src={loginUser?.user?.user_metadata?.avatar_url || ''}
              sx={{ width: 34, height: 34 }}
            />
          </IconButton>
        ) : (
          <IconButton
            aria-label="Menu button"
            size="small"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon fontSize="small" />
          </IconButton>
        )}
        <Drawer
          anchor="top"
          open={open}
          onClose={toggleDrawer(false)}
          PaperProps={{
            sx: {
              top: 'var(--template-frame-height, 0px)',
            },
            inert: !open ? true : undefined,
          }}
        >
          <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <IconButton onClick={toggleDrawer(false)}>
                <Avatar sx={{ width: 20, height: 20 }}>
                  <ClearIcon fontSize="small" sx={{ width: 15, height: 15 }} />
                </Avatar>
              </IconButton>
            </Box>
            <Box
              component={'ul'}
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                p: 0,
                li: {
                  flex: '0 0 50%',
                  color: '#333',
                },
              }}
            >
              <MenuItem onClick={() => handlePageTransition('/facilities')}>
                <MuseumIcon fontSize="small" sx={{ mr: 1, mt: '-2px' }} />
                施設一覧
              </MenuItem>
              <MenuItem onClick={() => handlePageTransition('/map')}>
                <MapIcon fontSize="small" sx={{ mr: 1, mt: '-2px' }} />
                地図
              </MenuItem>
              <MenuItem onClick={() => handlePageTransition('/areas')}>
                <PinDropIcon fontSize="small" sx={{ mr: 1, mt: '-2px' }} />
                地域
              </MenuItem>
              <MenuItem onClick={() => handlePageTransition('/info')}>
                <InfoIcon fontSize="small" sx={{ mr: 1, mt: '-2px' }} />
                新着情報
              </MenuItem>
              <MenuItem onClick={() => handlePageTransition('/guide')}>
                <HelpIcon fontSize="small" sx={{ mr: 1, mt: '-2px' }} />
                操作方法
              </MenuItem>
              <MenuItem onClick={() => handlePageTransition('/contact')}>
                <ForumIcon fontSize="small" sx={{ mr: 1, mt: '-2px' }} />
                お問い合わせ
              </MenuItem>
            </Box>
            {loginUser && (
              <>
                <Divider sx={{ my: 3 }} />
                <Stack direction="row" justifyContent="space-around">
                  {loginUser && (
                    <>
                      <MenuItem sx={{ width: '100%' }}>
                        <Button
                          color="primary"
                          onClick={handleAccountOpen}
                          fullWidth
                        >
                          アカウント設定
                        </Button>
                      </MenuItem>
                    </>
                  )}
                  <MenuItem sx={{ width: '100%' }}>
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={handleLogout}
                      fullWidth
                    >
                      {loginUser ? 'ログアウト' : 'ログイン'}
                    </Button>
                  </MenuItem>
                </Stack>
              </>
            )}
          </Box>
        </Drawer>
      </Box>
      <AccountSetting
        accountOpen={accountOpen}
        handleAccountClose={handleAccountClose}
      />
    </StyledToolbar>
  );
}
