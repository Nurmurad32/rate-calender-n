
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchRateCalendar = async (startDate: string, endDate: string) => {
    const response = await axios.get(
        `https://api.bytebeds.com/api/v1/property/1/room/rate-calendar/assessment?start_date=${startDate}&end_date=${endDate}`
    );
    return response.data.data;
};

export const useRateCalendar = (startDate: string, endDate: string) => {
    return useQuery(
        {
            queryKey: ['rateCalendar', startDate, endDate],
            queryFn: () => fetchRateCalendar(startDate, endDate),
        }
    );
};
