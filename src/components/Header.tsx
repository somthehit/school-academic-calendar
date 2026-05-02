import { motion } from 'motion/react';

export default function Header() {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center"
    >
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-2">
          श्री जनशक्ति <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-violet-400 font-extrabold">आधारभूत विद्यालय</span>
        </h1>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-400 tracking-wide">पुनर्वास नगरपालिका-९, सितावस्ती, कञ्चनपुर</h2>
      </div>
      <div className="mt-8 flex justify-center">
        <div className="bg-indigo-600/10 border border-indigo-500/20 px-8 py-2 rounded-full shadow-lg shadow-indigo-500/10">
          <p className="text-xl md:text-2xl font-black text-rose-400 tracking-wider">
            शैक्षिक सत्र २०८३ को वार्षिक कार्यक्रम
          </p>
        </div>
      </div>
    </motion.header>
  );
}
