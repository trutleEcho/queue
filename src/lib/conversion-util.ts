class ConversionUtil {
    /**
     * Utility functions for time and money conversions
     */

    /**
     * Formats a date to a readable string
     * @param date - Date to format (can be Date object, timestamp, or ISO string)
     * @param format - Optional format ('short', 'long', or 'relative')
     * @returns Formatted date string
     */
    formatDate = (date: Date | number | string, format: 'short' | 'long' | 'relative' = 'short'): string => {
        const dateObj = new Date(date);

        switch (format) {
            case 'long':
                return dateObj.toLocaleDateString('en-IN', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                });

            case 'relative':
                const now = new Date();
                const diff = now.getTime() - dateObj.getTime();
                const seconds = Math.floor(diff / 1000);
                const minutes = Math.floor(seconds / 60);
                const hours = Math.floor(minutes / 60);
                const days = Math.floor(hours / 24);

                if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
                if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
                if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
                return 'Just now';

            default: // short
                return dateObj.toLocaleDateString('en-IN', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                });
        }
    };

    /**
     * Formats a timestamp to time string
     * @param timestamp - Timestamp to format
     * @param format - Optional format (12 or 24 hour)
     * @returns Formatted time string
     */
    formatTime = (ms: number, format: '12h' | '24h' = '12h'): string => {
        const istDate = new Date(ms + 5.5 * 60 * 60 * 1000);

        return istDate.toLocaleTimeString('en-IN', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: format === '12h',
            timeZone: 'UTC', // already shifted, so use UTC
        });
    };


    /**
     * Formats currency amount to INR
     * @param amount - Amount to format
     * @param format - Optional format ('compact' or 'full')
     * @returns Formatted currency string
     */
    formatCurrency = (amount: number, format: 'compact' | 'full' = 'full'): string => {
        const formatter = new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
        });

        if (format === 'compact') {
            if (amount >= 10000000) {
                return `₹${(amount / 10000000).toFixed(2)}Cr`;
            }
            if (amount >= 100000) {
                return `₹${(amount / 100000).toFixed(2)}L`;
            }
            if (amount >= 1000) {
                return `₹${(amount / 1000).toFixed(2)}K`;
            }
        }

        return formatter.format(amount);
    };

    /**
     * Converts 24-hour format to 12-hour format
     * @param time - Time in 24-hour format (HH:mm)
     * @returns Time in 12-hour format with AM/PM
     */
    convertTo12Hour = (time: string): string => {
        const [hours, minutes] = time.split(':').map(Number);
        const period = hours >= 12 ? 'PM' : 'AM';
        const hours12 = hours % 12 || 12;
        return `${hours12}:${minutes.toString().padStart(2, '0')} ${period}`;
    };

    /**
     * Converts 12-hour format to 24-hour format
     * @param time - Time in 12-hour format (hh:mm AM/PM)
     * @returns Time in 24-hour format
     */
    // convertTo24Hour = (time: string): string => {
    //     const [timeStr, period] = time.split(' ');
    //     const [hours, minutes] = timeStr.split(':').map(Number);
    //
    //     if (period === 'PM' && hours !== 12) hours += 12;
    //     if (period === 'AM' && hours === 12) hours = 0;
    //
    //     return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    // };

    /**
     * Converts minutes to hours and minutes
     * @param minutes - Total minutes
     * @returns Formatted duration string
     */
    formatDuration = (minutes: number): string => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;

        if (hours === 0) return `${mins}min`;
        if (mins === 0) return `${hours}hr`;
        return `${hours}hr ${mins}min`;
    };

    toPaise = (rupees: number): number => {
        return Number((rupees * 100).toFixed(0));
    }

    msToTimeString = (ms: number): string => {
        // Add 5.5 hours to get actual IST time from stored UTC ms
        const istDate = new Date(ms + 5.5 * 60 * 60 * 1000);

        const hours = istDate.getUTCHours().toString().padStart(2, '0');
        const minutes = istDate.getUTCMinutes().toString().padStart(2, '0');

        return `${hours}:${minutes}`;
    };

    /**
     * Converts IST time string (HH:mm) to milliseconds since UTC midnight.
     */
    timeStringToMilliseconds = (timeStr: string): number => {
        const [hours, minutes] = timeStr.split(":").map(Number);

        // Create IST date manually: 1970-01-01T00:00:00+05:30
        const istBase = Date.UTC(1970, 0, 1, hours - 5, minutes - 30); // shift back to UTC

        return istBase;
    };

    getStartOfTodayInMillis(): number {
        const now = new Date();
        const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        return startOfToday.getTime();
    }
}

export const conversionUtil = new ConversionUtil();