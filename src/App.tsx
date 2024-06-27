import dayjs, { Dayjs } from 'dayjs';
import GetDateRange from './components/GetDateRange'
import { DateRange, LocalizationProvider } from '@mui/x-date-pickers-pro';
import { useState } from 'react';
import { useRateCalendar } from './hooks/useRateCalender';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Alert, Box, CircularProgress, Container, Typography } from '@mui/material';
import RoomCategorySection from './components/RoomCategorySection';

function App() {

  // const [value, setValue] = useState<DateRange<Dayjs>>([dayjs(), dayjs()])
  const [value, setValue] = useState<DateRange<Dayjs>>([null, null])

  const startDate = value[0]?.add(1, 'day')?.toISOString().split('T')[0] || '';
  const endDate = value[1]?.add(1, 'day')?.toISOString().split('T')[0] || '';

  console.log(startDate, endDate);

  const { data, isLoading, error } = useRateCalendar(startDate, endDate);

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Container>
          <Box className="rate-calender-title">
            <Typography variant='h6' sx={{ marginBottom: "10px", fontWeight: "600" }}>Rate Calender</Typography>
            <GetDateRange value={value} setValue={setValue} />
          </Box>
          {isLoading && <CircularProgress />}
          {error && <Alert severity="error">Error loading data</Alert>}
          {data ? (
            <RoomCategorySection roomCategories={data} />
          ) : (
            <Alert severity="info">Please select a Date Range.</Alert>
          )}
        </Container>
      </LocalizationProvider>
    </>
  )
}

export default App
