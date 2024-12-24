'use client';

import {
  Box,
  Button,
  CardMedia,
  IconButton,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { AllFacilityProps } from '@/types';
import dynamic from 'next/dynamic';
import { SyntheticEvent, useEffect, useState } from 'react';
import CustomTabPanel, { a11yProps } from '../CustomTabPanel';
import { useAtomValue } from 'jotai';
import { loginUserAtom, loginUserParamsSelector } from '@/store/atoms';
import { supabase } from '@/libs/supabaseClient';
import dayjs from 'dayjs';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const LeafletMap = dynamic(() => import('../LeafletMap'), { ssr: false });

export default function FacilityCardDetail({
  facility,
}: {
  facility: AllFacilityProps;
}) {
  const placeName = encodeURIComponent(facility.name);
  const address = encodeURIComponent(facility.address);
  const googleMapUrl = `https://www.google.com/maps/search/?api=1&query=${placeName}+${address}`;
  const handleOpenGoogleMap = () => {
    window.open(googleMapUrl, '_blank');
  };

  const loginUser = useAtomValue(loginUserAtom);
  const loginUserParams = useAtomValue(loginUserParamsSelector);

  const [tabValue, setTabValue] = useState(0);
  const handleTabValueChange = (_: SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const [userNotes, setUserNotes] = useState<
    { id: string; note: string; created_at: string; updated_at?: string }[]
  >([]);
  const fetchNotes = async () => {
    if (!loginUser || !facility.id) return; // ログインしていない場合や施設IDが無効な場合は処理しない

    const userId =
      typeof loginUserParams.id === 'object'
        ? loginUserParams.id.value
        : loginUserParams.id;
    try {
      const { data, error } = await supabase
        .from('user_notes') // テーブル名は適宜変更
        .select('id, note, created_at, updated_at') // 必要なカラムを指定
        .eq('facility_id', facility.id)
        .eq('user_id', userId); // ユーザーIDで絞り込み

      if (error) {
        console.error('メモ取得エラー:', error.message);
      } else {
        setUserNotes(data || []); // データを状態に保存
      }
    } catch (error) {
      console.error('メモ取得中にエラーが発生しました:', error);
    }
  };
  useEffect(() => {
    fetchNotes();
  }, [loginUser, facility.id]);

  const [newNote, setNewNote] = useState('');
  const handleAddNote = async () => {
    if (!newNote.trim()) return;
    const userId =
      typeof loginUserParams.id === 'object'
        ? loginUserParams.id.value
        : loginUserParams.id;
    try {
      const { error } = await supabase.from('user_notes').insert({
        facility_id: facility.id,
        user_id: userId,
        note: newNote,
        created_at: new Date().toISOString(),
      });
      if (error) throw error;
      setUserNotes((prev) => [
        ...prev,
        {
          id: String(prev.length + 1),
          note: newNote,
          created_at: new Date().toISOString(),
        },
      ]);
      setNewNote('');
      fetchNotes();
    } catch (error) {
      console.error('ノートの追加に失敗しました:', error);
    }
  };

  const deleteNote = async (noteId: string) => {
    if (confirm('このノートを削除しますか？')) {
      try {
        const { error } = await supabase
          .from('user_notes') // テーブル名を適切に設定
          .delete()
          .eq('id', noteId); // ノートIDで削除

        if (error) throw error;

        // 状態から該当ノートを削除
        setUserNotes((prevNotes) =>
          prevNotes.filter((note) => note.id !== noteId)
        );
      } catch (error) {
        console.error('ノートの削除に失敗しました:', error);
      }
    }
  };

  return (
    <Box>
      {loginUser && (
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={tabValue}
            onChange={handleTabValueChange}
            aria-label="facility card tab"
          >
            <Tab label="施設情報" {...a11yProps(0, 'facilityCard')} />
            <Tab label="ノート" {...a11yProps(1, 'facilityCard')} />
          </Tabs>
        </Box>
      )}
      <CustomTabPanel value={tabValue} index={0} tabName="facilityCard">
        <Stack
          className="facility-card-detail"
          sx={{
            p: 2,
            pb: { xs: 8, md: 2 },
            flexDirection: { xs: 'column', md: 'row' },
            gap: 2,
          }}
        >
          <CardMedia
            component="img"
            alt="green iguana"
            image={facility.image || '/img/noimage.png'}
            sx={{
              aspectRatio: '5 / 4',
              width: { xs: 'auto', md: '50%' },
              maxHeight: { xs: '30vh', md: 'none' },
              alignSelf: { xs: 'center', md: 'flex-start' },
            }}
          />
          <Box
            sx={{
              alignSelf: { xs: 'center', md: 'auto' },
              width: { xs: '100%', md: '50%' },
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
            }}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ mb: '4px', pr: { xs: 0, md: '20px' } }}
            >
              <Typography sx={{ fontSize: 20, fontWeight: 'bold' }}>
                {facility.name}
              </Typography>
              {facility.url && (
                <Button
                  component="a"
                  variant="outlined"
                  size="small"
                  href={facility.url}
                  target="_blank"
                  endIcon={<OpenInNewIcon fontSize="small" />}
                  sx={{
                    fontSize: 12,
                    textDecoration: 'none',
                    alignSelf: 'flex-end',
                    flexShrink: 0,
                  }}
                >
                  公式サイト
                </Button>
              )}
            </Stack>
            <Box sx={{ mb: 1 }}>
              <Typography sx={{ fontSize: 14, color: '#333', lineHeight: 1.2 }}>
                〒{facility.postCode}
              </Typography>
              <Typography sx={{ fontSize: 14, color: '#333', lineHeight: 1.2 }}>
                {facility.address}
              </Typography>
            </Box>
            <Box sx={{ flex: 1, height: '100%', minHeight: '30vh' }}>
              <LeafletMap facility={facility} />
            </Box>
            {/* 地図ページに遷移するボタン追加 */}
            <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
              <Button
                variant="outlined"
                size="small"
                onClick={handleOpenGoogleMap}
                sx={{
                  fontSize: 12,
                  textDecoration: 'none',
                  textTransform: 'none',
                }}
              >
                Google Mapで開く
              </Button>
              <Button
                variant="contained"
                size="small"
                href={`/map/?facilityName=${facility.name}`}
                sx={{ fontSize: 12, textDecoration: 'none' }}
              >
                地図ページに移動する
              </Button>
            </Stack>
          </Box>
        </Stack>
      </CustomTabPanel>
      {loginUser && (
        <CustomTabPanel
          value={tabValue}
          index={1}
          tabName="facilityCard"
          sx={{ minHeight: { xs: 400, md: 500 } }}
        >
          <Stack sx={{ mb: 1 }}>
            <TextField
              id="new-note"
              label="ノートを入力してください"
              multiline
              rows={2}
              variant="outlined"
              fullWidth
              sx={{ mb: 1 }}
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              onMouseDown={(e) => e.stopPropagation()}
              onKeyDown={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
            />
            <Button
              variant="contained"
              color="primary"
              sx={{
                alignSelf: 'flex-end',
              }}
              onClick={(e) => {
                e.stopPropagation();
                handleAddNote();
              }}
              onKeyDown={(e) => {
                e.stopPropagation();
              }}
            >
              追加
            </Button>
          </Stack>
          <Box>
            {userNotes.length > 0 ? (
              userNotes
                // ノートを作成日時の降順で表示
                .sort((a, b) => dayjs(b.created_at).diff(dayjs(a.created_at)))
                .map((note, index) => (
                  <Box key={index} sx={{ mb: 2 }}>
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Typography
                        sx={{
                          fontSize: '0.875rem',
                          color: 'text.secondary',
                          lineHeight: 1.5,
                        }}
                      >
                        {dayjs(note.created_at).format('YYYY/MM/DD HH:mm:ss')}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={() => deleteNote(note.id)}
                        sx={{ textTransform: 'none', fontSize: '0.875rem' }}
                      >
                        <DeleteOutlineIcon />
                      </IconButton>
                    </Stack>
                    <Typography variant="body1">{note.note}</Typography>
                  </Box>
                ))
            ) : (
              <Typography variant="body2" color="textSecondary">
                ノートがありません
              </Typography>
            )}
          </Box>
        </CustomTabPanel>
      )}
    </Box>
  );
}
