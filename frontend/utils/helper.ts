
const { DateTime } = require('luxon');

export const formatForFrontend = (date: string | Date): string => {
    const normalizedDateStr = typeof date === 'string'
      ? date.replace(/(\d{2})\.(\d{2})\.(\d{2})/, '$1:$2:$3')
      : null;

    const jsDate = normalizedDateStr
      ? new Date(normalizedDateStr)
      : new Date(date);

    if (isNaN(jsDate.getTime())) return '-';

    const dt = DateTime.fromJSDate(jsDate, { zone: 'Asia/Jakarta' });
    if (!dt.isValid) return '-';

    return dt.toFormat('LLLL d, yyyy');
  };
