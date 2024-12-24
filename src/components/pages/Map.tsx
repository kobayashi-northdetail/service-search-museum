'use client';

import { Box, Container } from '@mui/material';
import FilterArea from '../parts/FilterArea';
import dynamic from 'next/dynamic';

const LeafletMap = dynamic(() => import('../parts/LeafletMap'), { ssr: false });

export default function Map() {
  return (
    <Container maxWidth="lg" component="main">
      <Box sx={{ pt: 12 }}>
        <FilterArea path="map" />
        <Box
          sx={{ display: 'flex', justifyContent: 'center', minHeight: '60vh' }}
        >
          <LeafletMap />
        </Box>
      </Box>
    </Container>
  );
}
