/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import Header from './components/Header';
import Legend from './components/Legend';
import CalendarTable from './components/CalendarTable';
import Footer from './components/Footer';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export default function App() {
  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 bg-[#020617] flex items-center justify-center font-sans">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        className="w-full max-w-[1550px] bg-slate-900/40 backdrop-blur-xl p-8 md:p-12 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] rounded-[2.5rem] border border-slate-800 relative overflow-hidden"
      >
        {/* Abstract background glows */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full -mr-64 -mt-64 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-violet-600/10 rounded-full -ml-64 -mb-64 blur-[120px] pointer-events-none" />

        <div className="relative z-10 flex flex-col gap-10">
          <Header />
          <Legend />
          <CalendarTable />
          <Footer />
        </div>
      </motion.div>
    </div>
  );
}

