export default function Footer() {
  const signatures = [
    { title: 'प्रधानाध्यापक' },
    { title: 'शिक्षक प्रतिनिधि' },
    { title: 'विव्यस अध्यक्ष' }
  ];

  return (
    <div className="mt-20 flex flex-wrap justify-between items-end border-t border-slate-800 pt-12 text-slate-400">
      {signatures.map((sig, index) => (
        <div key={index} className="text-center w-full md:w-auto mb-12 md:mb-0 px-10 group">
          <div className="border-t-2 border-dashed border-slate-700 w-64 mx-auto mb-4 h-1 transition-all group-hover:border-indigo-500/50 group-hover:w-72"></div>
          <p className="font-black text-xl text-slate-500 transition-colors group-hover:text-indigo-400">{sig.title}</p>
        </div>
      ))}
    </div>
  );
}
