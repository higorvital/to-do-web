import React, { useCallback } from 'react';

import DatePicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import { Container } from './styles';

interface CalendarProps{
    selectedDate: Date;
    setSelectedDate(day: Date): void;
}

const Calendar: React.FC<CalendarProps> = ({selectedDate, setSelectedDate}) => {

    const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {

        if(modifiers.available){
    
          setSelectedDate(day);
        }
    }, [setSelectedDate]);

    return (
        <Container>
            <DatePicker 
                weekdaysShort = {['D','S','T','Q','Q','S','S']}
                fromMonth={new Date()}
                // disabledDays={[{daysOfWeek: [0,6]}, ...disabledDays]}
                modifiers={{
                    available: { daysOfWeek: [0,1,2,3,4,5,6]}
                }}
                selectedDays={selectedDate}
                onDayClick={handleDateChange}
                months={[
                    'Janeiro',
                    'Fevereiro',
                    'Março',
                    'Abril',
                    'Maio',
                    'Junho',
                    'Julho',
                    'Agosto',
                    'Setembro',
                    'Outubro',
                    'Novembro',
                    'Dezembro'
                ]}
            />
        </Container>
    )
}

export default Calendar;