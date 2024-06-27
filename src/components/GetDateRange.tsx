import { Box } from '@mui/material';
import { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { DateRange } from '@mui/x-date-pickers-pro';
import { SingleInputDateRangeField } from '@mui/x-date-pickers-pro/SingleInputDateRangeField';

interface DateRangePickerProps {
    value: DateRange<Dayjs>;
    setValue: (newValue: DateRange<Dayjs>) => void;
}

const GetDateRange: React.FC<DateRangePickerProps> = ({ value, setValue }) => {

    return (
        <Box maxWidth={"400px"}>
            {/* <LocalizationProvider dateAdapter={AdapterDayjs}> */}
            <DemoContainer components={['SingleInputDateRangeField']}>
                <DateRangePicker
                    // localeText={{ start: 'Check-in', end: 'Check-out' }}
                    slots={{ field: SingleInputDateRangeField }}
                    value={value}
                    onChange={(newValue) => setValue(newValue)}
                />
            </DemoContainer>
            {/* </LocalizationProvider> */}
        </Box>
    );
};

export default GetDateRange;