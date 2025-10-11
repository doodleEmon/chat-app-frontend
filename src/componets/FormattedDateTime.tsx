import React from "react";

interface FormattedDateProps {
    date: string | Date;
    dateOrTime: string;
    className?: string;
}

export default function FormattedDateTime({ date, dateOrTime, className = "" }: FormattedDateProps): React.JSX.Element {
    const formatDate = (inputDate: string | Date): string => {
        try {
            const dateObj = typeof inputDate === 'string' ? new Date(inputDate) : inputDate;

            // Check if date is valid
            if (isNaN(dateObj.getTime())) {
                return 'Invalid date';
            }

            // Format: Monday, 25 Sep 2025, 10:15 AM
            const optionsForDate: Intl.DateTimeFormatOptions = {
                weekday: 'long',
                day: 'numeric',
                month: 'short',
                year: 'numeric'
            };

            const optionsForTime: Intl.DateTimeFormatOptions = {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            }

            if(dateOrTime === 'time') {
                return dateObj.toLocaleString('en-US', optionsForTime);
            } else {
                return dateObj.toLocaleString('en-US', optionsForDate);
            }

        } catch (error) {
            return 'Invalid date';
        }
    };

    return (
        <time className={className}>
            {formatDate(date)}
        </time>
    );
};