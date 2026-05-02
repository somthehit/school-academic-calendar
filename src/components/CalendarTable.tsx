import { CALENDAR_DATA } from '../data/calendarData';

export default function CalendarTable() {
  const columnHeaders = Array.from({ length: 32 }, (_, i) => i + 1);
  const statHeaders = [
    'विद्यालय खुल्ने दिन',
    'पढाइ हुने दिन',
    'शनिबार',
    'आइतबार',
    'सार्वजनिक विदा',
    'परीक्षा विदा',
    'विद्यालय अतिरिक्त',
    'जम्मा दिन'
  ];

  const mergableMarkers = [
    'वि', 'द', 'ति', 'प', 'योजना', 'निर्माण कार्य', ' भर्ना अवधि', 'वार्षिकोत्सव', 'रिजल्ट', 'अर्ध', 'परीक्षा', 'तयारी', 'नतिजा प्रकाशन', 'सरस्वती पूजा', 'पिकनिक १ दिन', 'वि.स.स गठन'
  ];

  const getEventName = (marker: string, count: number) => {
    switch (marker) {
      case 'वि': return `वर्षे विदा (${count})`;
      case 'द': return `दशैं विदा (${count})`;
      case 'ति': return `तिहार विदा (${count})`;
      case 'प': return `परीक्षा (${count})`;
      case 'योजना': return `योजना (${count} दिन)`;
      case 'निर्माण कार्य': return `निर्माण कार्य (${count} दिन)`;
      case ' भर्ना अवधि': return `भर्ना अवधि (${count} दिन)`;
      case 'वार्षिकोत्सव': return `वार्षिकोत्सव (${count} दिन)`;
      case 'रिजल्ट': return count > 1 ? `नतिजा प्रकाशन (${count} दिन)` : `नतिजा प्रकाशन`;
      case 'अर्ध': return `अर्ध वार्षिक परीक्षा`;
      case 'परीक्षा': return `परीक्षा (${count} दिन)`;
      case 'तयारी': return `तयारी (${count} दिन)`;
      case 'नतिजा प्रकाशन': return `नतिजा प्रकाशन (${count} दिन)`;
      case 'वि.स.स गठन': return `वि.स.स गठन (${count} दिन)`;
      default: return marker;
    }
  };

  const getCellClass = (content: string | null, span: number = 1) => {
    if (!content) return 'border-slate-800';
    if (content === 'शनि' || content === 'आइत') return 'weekend-col font-bold border-rose-500/10 text-[10px]';
    if (content === 'परीक्षा' || content === 'अर्ध' || content === 'रिजल्ट' || content === 'प') 
      return `exam-period font-black ${span > 1 ? 'text-xs' : 'text-[10px]'} border-amber-500/10 py-2`;
    if (mergableMarkers.includes(content) || content === 'निर्माण' || content === 'कार्य' || content === 'योजना') 
      return `vacation-period font-black ${span > 1 ? 'text-xs' : 'text-[10px]'} border-emerald-500/10 py-2`;
    if (content === '🚩' || content === '📖') return 'text-rose-500 font-black text-xl drop-shadow-[0_0_8px_rgba(244,63,94,0.3)]';
    return 'holiday-marker font-bold leading-tight px-0 text-rose-400 text-[10px]';
  };

  const renderCellContent = (content: string | null, span: number = 1) => {
    if (!content) return '';
    if (span > 1 && mergableMarkers.includes(content)) {
      return getEventName(content, span);
    }
    if (content === 'वि') return 'वि';
    if (content === 'द') return 'द';
    if (content === 'ति') return 'ति';
    if (content === 'प') return 'प';
    return content;
  };

  const calculateMonthStats = (days: (string | null)[]) => {
    const stats = {
      schoolOpen: 0,
      teachingDays: 0,
      saturdays: 0,
      sundays: 0,
      holidays: 0,
      examHolidays: 0,
      extra: 0,
      total: days.length
    };

    days.forEach(day => {
      if (!day) return;
      if (day === 'शनि') stats.saturdays++;
      else if (day === 'आइत') stats.sundays++;
      else if (day === '📖' || day === '🚩') stats.teachingDays++;
      else if (['प', 'परीक्षा', 'अर्ध', 'रिजल्ट', 'परीक्षा'].includes(day)) stats.examHolidays++;
      else if (['योजना', 'निर्माण कार्य', ' भर्ना अवधि', 'वार्षिकोत्सव', 'तयारी', 'नतिजा प्रकाशन', 'सरस्वती पूजा', 'वि.स.स गठन'].includes(day)) stats.extra++;
      else if (['वि', 'द', 'ति'].includes(day)) stats.holidays++;
      else stats.holidays++; // Catch-all for specific named holidays
    });

    stats.schoolOpen = stats.teachingDays + stats.examHolidays + stats.extra;
    return stats;
  };

  return (
    <div className="overflow-x-auto rounded-[2rem] border border-slate-800 shadow-2xl">
      <table className="w-full border-collapse calendar-table">
        <thead>
          <tr className="bg-slate-900 border-b border-slate-700">
            <th className="month-header text-white sticky left-0 bg-slate-900 border-slate-800 font-black py-4">महिना</th>
            <th className="month-header text-white border-slate-800 font-black">गते</th>
            {columnHeaders.map(num => (
              <th key={num} className="text-slate-400 border-slate-800 text-[10px] sm:text-xs py-4 px-1 min-w-[34px] font-bold">{num}</th>
            ))}
            {statHeaders.map(header => (
              <th key={header} className="bg-indigo-900/30 text-indigo-200 border-slate-800 text-[9px] leading-tight px-1 py-4 font-black min-w-[50px] uppercase tracking-tighter">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {CALENDAR_DATA.map((month, mIdx) => {
            const stats = calculateMonthStats(month.days as string[]);
            const segments: { content: string | null; span: number }[] = [];
            let i = 0;
            while (i < month.days.length) {
              const current = month.days[i];
              let span = 1;

              if (current && mergableMarkers.includes(current)) {
                while (i + span < month.days.length && month.days[i + span] === current) {
                  span++;
                }
              }

              segments.push({ content: current, span: span });
              i += span;
            }

            const totalUsedSpan = segments.reduce((sum, s) => sum + s.span, 0);
            const emptyCols = 32 - totalUsedSpan;

            return (
              <tr key={mIdx} className="hover:bg-slate-800/40 transition-colors group">
                <td className="month-header font-black text-indigo-400 sticky left-0 bg-slate-900/90 backdrop-blur-sm border-r border-r-slate-800 transition-colors group-hover:bg-slate-800">{month.name}</td>
                <td className="font-bold text-slate-600 bg-slate-900/40 border-slate-800">गते</td>
                
                {segments.map((seg, sIdx) => (
                  <td 
                    key={sIdx} 
                    colSpan={seg.span} 
                    className={getCellClass(seg.content as string, seg.span)}
                  >
                    {renderCellContent(seg.content as string, seg.span)}
                  </td>
                ))}
                
                {emptyCols > 0 && (
                  <td colSpan={emptyCols} className="border-slate-800"></td>
                )}

                <td className="total-col">{stats.schoolOpen}</td>
                <td className="total-col">{stats.teachingDays}</td>
                <td className="total-col">{stats.saturdays}</td>
                <td className="total-col">{stats.sundays}</td>
                <td className="total-col">{stats.holidays}</td>
                <td className="total-col">{stats.examHolidays}</td>
                <td className="total-col">{stats.extra}</td>
                <td className="total-col font-black text-white bg-indigo-900/40 border-l border-slate-700">{stats.total}</td>
              </tr>
            );
          })}
        </tbody>
        <tfoot className="bg-slate-900 text-slate-100 font-black">
          {(() => {
            const totals = CALENDAR_DATA.reduce((acc, month) => {
              const stats = calculateMonthStats(month.days as string[]);
              return {
                schoolOpen: acc.schoolOpen + stats.schoolOpen,
                teachingDays: acc.teachingDays + stats.teachingDays,
                saturdays: acc.saturdays + stats.saturdays,
                sundays: acc.sundays + stats.sundays,
                holidays: acc.holidays + stats.holidays,
                examHolidays: acc.examHolidays + stats.examHolidays,
                extra: acc.extra + stats.extra,
                total: acc.total + stats.total,
              };
            }, { schoolOpen: 0, teachingDays: 0, saturdays: 0, sundays: 0, holidays: 0, examHolidays: 0, extra: 0, total: 0 });

            return (
              <tr>
                <td colSpan={2} className="text-right px-6 py-5 border-slate-800 uppercase text-xs tracking-widest text-slate-500">जम्मा दिन</td>
                <td colSpan={32} className="text-center italic border-slate-800 text-slate-400 font-medium">संकेत: 📖 पढाइ हुने दिन</td>
                <td className="bg-slate-950 border-slate-800 text-indigo-400 text-sm">{totals.schoolOpen}</td>
                <td className="bg-slate-950 border-slate-800 text-indigo-400 text-sm">{totals.teachingDays}</td>
                <td className="bg-slate-950 border-slate-800 text-indigo-400 text-sm">{totals.saturdays}</td>
                <td className="bg-slate-950 border-slate-800 text-indigo-400 text-sm">{totals.sundays}</td>
                <td className="bg-slate-950 border-slate-800 text-indigo-400 text-sm">{totals.holidays}</td>
                <td className="bg-slate-950 border-slate-800 text-indigo-400 text-sm">{totals.examHolidays}</td>
                <td className="bg-slate-950 border-slate-800 text-indigo-400 text-sm">{totals.extra}</td>
                <td className="bg-indigo-600 text-white border-transparent text-xl py-5 shadow-[inset_0_2px_12px_rgba(255,255,255,0.2)]">{totals.total}</td>
              </tr>
            );
          })()}
        </tfoot>

      </table>
    </div>
  );
}
