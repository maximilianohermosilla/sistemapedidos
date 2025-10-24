import { useEffect, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import "react-day-picker/dist/style.css";
import "./DatePicker.css";
import { parseDMYHM } from '../utils/ParseDateUtil';

export default function DatePicker({date, emitDate}: any) {
    const [selectedDate, setSelectedDate] = useState(date);
    const [selectedTime, setSelectedTime] = useState('20:00');

    useEffect(() => {
        const dateString = parseDMYHM(`${selectedDate?.toLocaleDateString()} ${selectedTime}`);
        emitDate(dateString);
    }, [selectedDate, selectedTime]);

    const handleDateSelect = (date: any) => {
        setSelectedDate(date ?? selectedDate);
    };

    const handleTimeChange = (e: any) => {
        setSelectedTime(e.target.value);
    };

    return (
        <>
            <div className="text-xs w-full mx-auto">
                <DayPicker
                    navLayout='after'
                    mode="single"
                    selected={selectedDate || new Date()}
                    onSelect={handleDateSelect}
                    disabled={{ before: date }}
                />
            </div>
            <div className="flex gap-3 justify-between my-3">
                <p className="text-md mt-1">Seleccione Horario:</p>
                <input
                    className="w-30 px-2 rounded-sm"
                    type="time"
                    value={selectedTime}
                    onChange={handleTimeChange}
                />
            </div>
            <p className="text-gray-500 mt-5 text-center">Seleccionado: {selectedDate?.toLocaleDateString()} {selectedTime}</p>
        </>
    );
}
