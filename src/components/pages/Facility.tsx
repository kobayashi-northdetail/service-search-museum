'use client';

import Container from '@mui/material/Container';
import MainContent from '../parts/MainContent';

export default function Facility() {
  return (
    <>
      <Container
        maxWidth="lg"
        component="main"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          mt: 12,
          mb: 10,
          gap: 4,
        }}
      >
        <MainContent />
        {/* TODO: 更新情報など表示するなら実装 */}
        {/* <Latest /> */}
      </Container>
    </>
  );
}
