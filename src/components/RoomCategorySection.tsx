import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React from 'react';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';

interface RoomCategory {
    id: string;
    name: string;
    occupancy: number;
    inventory_calendar: IRoomInventoryCalender[];
    rate_plans: IRatePlan[];
}

interface IRoomInventoryCalender {
    id: string;
    date: Date;
    available: number;
    status: boolean;
    booked: number;
}

interface IRatePlan {
    id: number;
    name: string;
    calendar: IRateCalendar[];
}

interface IRateCalendar {
    id: string;
    date: Date;
    rate: number;
    min_length_of_stay: number;
    reservation_deadline: number;
}

interface RoomCategorySectionProps {
    roomCategories: RoomCategory[];
}

const formatDate = (date: Date, format: string) => {
    const options: Intl.DateTimeFormatOptions = {};
    if (format.includes('MMM')) options.month = 'short';
    if (format.includes('YYYY')) options.year = 'numeric';
    if (format.includes('ddd')) options.weekday = 'short';
    if (format.includes('DD')) options.day = 'numeric';
    return new Intl.DateTimeFormat('en-US', options).format(date);
};

const RoomCategorySection: React.FC<RoomCategorySectionProps> = ({ roomCategories }) => {
    console.log(roomCategories);

    const getMonthYearSpan = (inventory_calendar: IRoomInventoryCalender[]) => {
        const spanMap = new Map<string, number>();
        inventory_calendar.forEach(inventory => {
            const monthYear = formatDate(new Date(inventory.date), 'MMM YYYY');
            if (spanMap.has(monthYear)) {
                spanMap.set(monthYear, (spanMap.get(monthYear) || 0) + 1);
            } else {
                spanMap.set(monthYear, 1);
            }
        });
        return spanMap;
    };

    return (
        <Box>
            <Box sx={{ my: 2 }}>
                <TableContainer component={Paper} >
                    <Table size="small">
                        <TableHead>
                            {roomCategories.slice(0, 1).map((category) => {
                                const monthYearSpan = getMonthYearSpan(category.inventory_calendar);
                                return (
                                    <React.Fragment key={category.id}>
                                        <TableRow>
                                            <TableCell className='p-0' sx={{ visibility: "hidden" }} rowSpan={2}>Month</TableCell>
                                            {category.inventory_calendar.map((inventory, index) => {
                                                const currentMonthYear = formatDate(new Date(inventory.date), 'MMM YYYY');
                                                const colSpan = monthYearSpan.get(currentMonthYear);
                                                if (index === 0 || formatDate(new Date(category.inventory_calendar[index - 1].date), 'MMM YYYY') !== currentMonthYear) {
                                                    return (
                                                        <TableCell className='p-0' key={inventory.id} colSpan={colSpan} align="left">
                                                            {currentMonthYear}
                                                        </TableCell>
                                                    );
                                                }
                                                return null;
                                            })}
                                            <TableCell></TableCell>
                                        </TableRow>
                                        <TableRow>
                                            {category.inventory_calendar.map((inventory) => (
                                                <TableCell key={inventory.id} align="right" className='p-0'>
                                                    {formatDate(new Date(inventory.date), 'ddd')} <br />
                                                    {formatDate(new Date(inventory.date), 'DD')}
                                                </TableCell>
                                            ))}
                                            <TableCell></TableCell>
                                        </TableRow>
                                    </React.Fragment>
                                );
                            })}
                        </TableHead>
                        {roomCategories.map((category) => (
                            <React.Fragment key={category.id}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="left" colSpan={category.inventory_calendar.length + 2} className='table-room-box'>
                                            <Box className="room-name-btn-box">
                                                <Typography variant="h5" sx={{ padding: "5px" }}>
                                                    {category.name}
                                                </Typography>
                                                <Typography className='bulk-btn'>
                                                    <AddIcon />   BULK EDIT
                                                </Typography>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>Room Status</TableCell>
                                        {category.inventory_calendar.map((inventory) => (
                                            <TableCell
                                                align="right"
                                                key={inventory.id}
                                                sx={{
                                                    backgroundColor: inventory.status ? '#2F7D31' : '#EF534F',
                                                    color: 'white',
                                                    borderColor: inventory.status ? '#4BAd4E' : '#D63A37'
                                                }}>
                                                {inventory.status ? 'Open' : 'Close'}
                                            </TableCell>
                                        ))}
                                        <TableCell className='blank-cell'></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Rooms to Sell</TableCell>
                                        {category.inventory_calendar.map((inventory) => (
                                            <TableCell
                                                align="right"
                                                key={inventory.id}
                                                sx={{
                                                    backgroundColor: inventory.status ? '' : '#EF534F',
                                                    color: inventory.status ? '' : 'white',
                                                    borderColor: inventory.status ? '' : '#D63A37'
                                                }}
                                            >
                                                {inventory.available}
                                            </TableCell>
                                        ))}
                                        <TableCell></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Net Booked</TableCell>
                                        {category.inventory_calendar.map((inventory) => (
                                            <TableCell
                                                align="right"
                                                key={inventory.id}
                                                sx={{
                                                    backgroundColor: inventory.status ? '' : '#EF534F',
                                                    color: inventory.status ? '' : 'white',
                                                    borderColor: inventory.status ? '' : '#D63A37'
                                                }}>
                                                {inventory.booked}
                                            </TableCell>
                                        ))}
                                        <TableCell></TableCell>
                                    </TableRow>
                                    {category.rate_plans.map((ratePlan) => (
                                        <React.Fragment key={ratePlan.id}>
                                            <TableRow>
                                                <TableCell>
                                                    <Box >
                                                        <Typography className='room-rate'>{ratePlan?.name}</Typography>
                                                        <Typography className='icon-text'><PersonIcon /> x {category?.occupancy}</Typography>
                                                    </Box>
                                                </TableCell>
                                                {ratePlan.calendar.map((rateCalendar, index) => {
                                                    const inventoryStatus = category.inventory_calendar[index]?.status;
                                                    return (
                                                        <TableCell
                                                            align="right"
                                                            key={rateCalendar.id}
                                                            sx={{
                                                                backgroundColor: inventoryStatus ? '' : '#EF534F',
                                                                color: inventoryStatus ? '' : 'black',
                                                                borderColor: inventoryStatus ? '' : '#D63A37'
                                                            }}
                                                        >
                                                            {rateCalendar.rate}
                                                        </TableCell>
                                                    );
                                                })}
                                                <TableCell></TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Min. Length of stay</TableCell>
                                                {ratePlan.calendar.map((rateCalendar, index) => {
                                                    const inventoryStatus = category.inventory_calendar[index]?.status;
                                                    return (
                                                        <TableCell
                                                            align="right"
                                                            key={rateCalendar.id}
                                                            sx={{
                                                                backgroundColor: inventoryStatus ? '' : '#EF534F',
                                                                color: inventoryStatus ? '' : 'black',
                                                                borderColor: inventoryStatus ? '' : '#D63A37'
                                                            }}
                                                        >
                                                            {rateCalendar.min_length_of_stay}
                                                        </TableCell>
                                                    );
                                                })}
                                                <TableCell></TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Min. advance reservation</TableCell>
                                                {ratePlan.calendar.map((rateCalendar, index) => {
                                                    const inventoryStatus = category.inventory_calendar[index]?.status;
                                                    return (
                                                        <TableCell
                                                            align="right"
                                                            key={rateCalendar.id}
                                                            sx={{
                                                                backgroundColor: inventoryStatus ? '' : '#EF534F',
                                                                color: inventoryStatus ? '' : 'black',
                                                                borderColor: inventoryStatus ? '' : '#D63A37'
                                                            }}
                                                        >
                                                            {rateCalendar.reservation_deadline}
                                                        </TableCell>
                                                    );
                                                })}
                                                <TableCell></TableCell>
                                            </TableRow>
                                        </React.Fragment>
                                    ))}
                                </TableBody>
                            </React.Fragment>
                        ))}
                    </Table>
                </TableContainer>
            </Box>
        </Box >
    );
};

export default RoomCategorySection;
