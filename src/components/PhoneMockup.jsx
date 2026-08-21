import { motion } from 'framer-motion';
import { ShieldCheck, User, Paperclip, Camera, Mic, Smile, Battery, Wifi, Signal } from 'lucide-react';

export default function PhoneMockup({ className = '' }) {
  return (
    <div className={`relative mx-auto w-[280px] sm:w-[320px] h-[580px] sm:h-[650px] rounded-[3rem] p-[4px] bg-gradient-to-br from-[#2a2a35] to-[#0a0a0f] shadow-[20px_20px_60px_#040406,-20px_-20px_60px_#1a1a24] ${className}`}>
      {/* Bisel interno del celular */}
      <div className="relative w-full h-full rounded-[2.8rem] bg-[#050505] overflow-hidden shadow-[inset_0_0_20px_rgba(0,0,0,0.8),inset_2px_2px_5px_rgba(255,255,255,0.05)] border border-white/5">
      {/* Botones laterales (Simulados) */}
      <div className="absolute -left-[4px] top-32 w-[4px] h-12 bg-gradient-to-r from-[#1a1a22] to-[#2a2a35] rounded-l-md shadow-[-2px_2px_5px_rgba(0,0,0,0.5)]" />
      <div className="absolute -left-[4px] top-48 w-[4px] h-12 bg-gradient-to-r from-[#1a1a22] to-[#2a2a35] rounded-l-md shadow-[-2px_2px_5px_rgba(0,0,0,0.5)]" />
      <div className="absolute -right-[4px] top-40 w-[4px] h-16 bg-gradient-to-l from-[#1a1a22] to-[#2a2a35] rounded-r-md shadow-[2px_2px_5px_rgba(0,0,0,0.5)]" />

      {/* Reflejo de pantalla (Glass reflection) */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent pointer-events-none z-30" />

      {/* Dynamic Island / Notch realista & Status Bar */}
      <div className="absolute top-0 inset-x-0 h-14 z-30 pt-3 px-5 flex items-start justify-between pointer-events-none">
        {/* Hora */}
        <span className="text-white text-[11px] font-medium tracking-wide">10:18</span>
        
        {/* Dynamic Island */}
        <div className="w-24 h-7 bg-black rounded-full flex items-center justify-between px-2.5 shadow-[inset_0_-1px_2px_rgba(255,255,255,0.1)] -mt-1 pointer-events-auto">
          <div className="w-2 h-2 rounded-full bg-[#111] shadow-[inset_0_0_2px_rgba(255,255,255,0.3)] relative overflow-hidden">
             <div className="absolute inset-0 bg-blue-500/20 blur-[1px]"></div>
          </div>
          <div className="w-2 h-2 rounded-full bg-[#0a4d2e] blur-[1px]"></div>
        </div>

        {/* Iconos de Estado */}
        <div className="flex items-center gap-1.5 text-white">
          <Signal size={12} strokeWidth={2.5} />
          <Wifi size={12} strokeWidth={2.5} />
          <Battery size={14} strokeWidth={2} />
        </div>
      </div>

      {/* App Header (WhatsApp style) */}
      <div className="bg-[#0B141A] pt-14 pb-3 px-4 flex items-center gap-3 relative z-20 shadow-md">
        <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center overflow-hidden border border-white/10 shrink-0">
          <User size={24} className="text-neutral-400 mt-2" />
        </div>
        <div className="flex-1">
          <div className="text-white font-semibold text-[14px] leading-none mb-1">Soluciones Digitales</div>
          <div className="text-[#25D366] text-[11px] font-medium tracking-wide leading-none">en línea</div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="p-5 space-y-6 relative h-full">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>
        
        {/* Messages */}
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="bg-[#1E1E24] text-neutral-300 p-3.5 rounded-2xl rounded-tl-sm max-w-[85%] text-[13px] relative z-10 leading-relaxed shadow-md"
        >
          ¿Cómo va el proyecto "Soluciones Digitales"?
          <span className="text-[9px] text-neutral-500 float-right mt-2 ml-3">10:14</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="bg-[#005c4b] text-white p-3.5 rounded-2xl rounded-tr-sm max-w-[85%] ml-auto text-[13px] relative z-10 leading-relaxed shadow-md"
        >
          Hola. El desarrollo está casi listo. Estamos en pruebas finales.
          <span className="text-[9px] text-white/60 float-right mt-2 ml-3 flex items-center gap-1">10:16 <svg viewBox="0 0 16 11" width="12" height="10" fill="currentColor" className="text-[#53bdeb]"><path d="M11.832 0l-5.698 5.698-2.617-2.616-1.503 1.503 4.12 4.12 7.201-7.202z"></path><path d="M15.5 0l-5.698 5.698-1.042-.998 1.503-1.503 4.12-4.12zM3.486 9.704L2.03 11.233.527 9.704z"></path></svg></span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.5 }}
          className="bg-[#1E1E24] text-neutral-300 p-3.5 rounded-2xl rounded-tl-sm max-w-[85%] text-[13px] relative z-10 leading-relaxed shadow-md"
        >
          Genial, avísame para el lanzamiento.
          <span className="text-[9px] text-neutral-500 float-right mt-2 ml-3">10:18</span>
        </motion.div>

        {/* Status Badge overlay */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 2, type: 'spring' }}
          className="absolute bottom-20 left-1/2 -translate-x-1/2 bg-[#25D366]/10 border border-[#25D366]/30 backdrop-blur-md px-5 py-3 rounded-full flex items-center gap-3 shadow-[0_10px_30px_rgba(37,211,102,0.2)] whitespace-nowrap z-20"
        >
          <ShieldCheck size={20} className="text-[#25D366]" />
          <span className="text-[#25D366] font-bold text-sm tracking-wide uppercase">Cuenta Segura</span>
        </motion.div>
      </div>

      {/* Footer / Input Bar (WhatsApp style) */}
      <div className="absolute bottom-0 inset-x-0 bg-[#0B141A] p-2 flex items-end gap-2 z-20 shadow-[0_-5px_20px_rgba(0,0,0,0.5)]">
        <div className="flex-1 bg-[#202C33] rounded-full min-h-[42px] flex items-center px-3 gap-3 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.3),inset_-1px_-1px_2px_rgba(255,255,255,0.05)] border border-white/5">
          <Smile size={20} className="text-[#8696A0] shrink-0" />
          <div className="flex-1 text-[#8696A0] text-[13px]">Mensaje</div>
          <Paperclip size={20} className="text-[#8696A0] shrink-0" />
          <Camera size={20} className="text-[#8696A0] shrink-0" />
        </div>
        <div className="w-[42px] h-[42px] rounded-full bg-[#00A884] flex items-center justify-center shrink-0 shadow-[4px_4px_10px_rgba(0,0,0,0.4),-1px_-1px_5px_rgba(255,255,255,0.1)] border border-[#25D366]/50">
          <Mic size={20} className="text-white drop-shadow-md" />
        </div>
      </div>
      
      {/* Fin del bisel interno */}
      </div>
    </div>
  );
}
