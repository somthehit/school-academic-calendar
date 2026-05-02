export default function Legend() {
  const items = [
    { label: 'शनिबार (Saturday)', color: 'bg-rose-500/20 border-rose-500/30 ring-1 ring-rose-500/10' },
    { label: 'परीक्षा (Exams)', color: 'bg-amber-500/20 border-amber-500/30 ring-1 ring-amber-500/10' },
    { label: 'विवा / सार्वजनिक विदा (Vacation)', color: 'bg-emerald-500/20 border-emerald-500/30 ring-1 ring-emerald-500/10' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-6 bg-slate-800/20 rounded-[1.5rem] border border-slate-800 shadow-inner">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-4 group">
          <div className={`w-8 h-8 rounded-lg border transition-all group-hover:scale-110 ${item.color}`}></div>
          <span className="text-sm font-bold text-slate-300 tracking-tight">{item.label}</span>
        </div>
      ))}
      <div className="flex items-center gap-4 text-rose-500 group">
        <span className="text-2xl font-black transition-transform group-hover:rotate-12">📖</span>
        <span className="text-sm font-bold text-slate-300 tracking-tight">पढाइ हुने दिन (Teaching Days)</span>
      </div>
    </div>
  );
}
