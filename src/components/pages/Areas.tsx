'use client';

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Grid2,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useAtomValue } from 'jotai';
import { areaDataSelector } from '@/store/atoms';

import { FacilityCard } from '../parts/facility-card/FacilityCard';
import FilterArea from '../parts/FilterArea';

export default function Areas() {
  const areaData = useAtomValue(areaDataSelector);

  return (
    <Container maxWidth="lg" component="main">
      <Box sx={{ mt: 12, mb: 5, minHeight: '60vh' }}>
        <FilterArea path="areas" />
        <Box>
          {areaData &&
            !!areaData.length &&
            areaData.map((data) => (
              <Accordion
                key={data.prefecture}
                sx={{
                  backgroundColor: 'transparent',
                  boxShadow: 'none',
                  mt: '0 !important',
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  sx={{
                    borderBottom: '1px solid #ccc !important',
                    borderRadius: 0,
                  }}
                >
                  <Typography>{data.prefecture}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {data.cities.map((city) => (
                    <Accordion
                      key={city.name}
                      sx={{
                        backgroundColor: 'transparent',
                        boxShadow: 'none',
                        mt: '0 !important',
                      }}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        sx={{
                          borderBottom: '1px solid #ccc !important',
                          borderRadius: 0,
                        }}
                      >
                        <Typography>{city.name}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Grid2 container spacing={2} columns={12}>
                          {city.facilities.map((facility) => (
                            <FacilityCard
                              facility={facility}
                              key={facility.id}
                            />
                          ))}
                        </Grid2>
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </AccordionDetails>
              </Accordion>
            ))}
        </Box>
      </Box>
    </Container>
  );
}
