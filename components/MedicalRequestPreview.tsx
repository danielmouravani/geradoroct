
import React from 'react';
import { MedicalRequestData, Doctor } from '../types';

interface MedicalRequestPreviewProps {
  data: MedicalRequestData;
  selectedDoctor: Doctor;
}

export const MedicalRequestPreview: React.FC<MedicalRequestPreviewProps> = ({ data, selectedDoctor }) => {
  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="print-area bg-white w-full aspect-[1/1.4142] p-[1.5cm] shadow-xl mx-auto flex flex-col font-courier text-[#000000] overflow-hidden min-h-[29.7cm]">
      {/* Centered Vertical Header */}
      <header className="flex flex-col items-center text-center mb-8 text-blue-800 shrink-0">
        <div className="mb-3">
          <img 
            src="https://assets.zyrosite.com/ALpeJ4P1RzcZJLwB/logo-Awv4rRww1ESzKogR.png" 
            alt="Logo Centro da Saúde Ocular" 
            className="h-20 w-auto object-contain"
          />
        </div>
        <div className="font-bold leading-tight">
          <h1 className="underline mb-1 tracking-wider text-[11pt]">CENTRO DA SAÚDE OCULAR DRª. KÁTIA MELLO</h1>
          <p className="font-normal text-[9pt] leading-snug">
            AV. PRESIDENTE VARGAS 132, SALA 301 - 25 DE AGOSTO<br />
            DUQUE DE CAXIAS - RJ - CEP 25.070-330<br />
            TELS.(21)2772-7063 E (21) 2673-1882<br />
            www.centrokatiamello.com.br
          </p>
        </div>
      </header>

      {/* Patient Info */}
      <section className="mb-8 space-y-1.5 text-[10pt] uppercase shrink-0">
        <div className="flex items-baseline">
          <span className="font-bold min-w-[130px]">PACIENTE:</span>
          <span className="border-b border-gray-300 flex-grow pb-0.5 min-h-[1.2rem]">
            {data.patientName || ''}
          </span>
        </div>
        <div className="flex items-baseline">
          <span className="font-bold min-w-[130px]">DATA DO EXAME:</span>
          <span className="border-b border-gray-300 flex-grow pb-0.5 min-h-[1.2rem]">
            {formatDate(data.examDate)}
          </span>
        </div>
        <div className="flex items-baseline">
          <span className="font-bold min-w-[130px]">MÉDICO:</span>
          <span className="border-b border-gray-300 flex-grow pb-0.5 min-h-[1.2rem]">
            {selectedDoctor.name}
          </span>
        </div>
        <div className="flex items-baseline">
          <span className="font-bold min-w-[130px]">CRM:</span>
          <span className="border-b border-gray-300 flex-grow pb-0.5 min-h-[1.2rem]">
            {selectedDoctor.crm}
          </span>
        </div>
      </section>

      {/* Request Body - FLEX GROW TO PUSH FOOTER DOWN */}
      <main className="flex-grow mt-2 overflow-hidden">
        <p className="mb-6 font-bold text-[10pt] uppercase italic underline">SOLICITO A REALIZAÇÃO DOS SEGUINTES EXAMES:</p>
        
        <ul className="mb-8 space-y-3 ml-4">
          {data.exams.length > 0 ? (
            data.exams.map((exam, idx) => (
              <li key={idx} className="flex items-start text-[10pt] uppercase font-bold">
                <span className="mr-2">►</span>
                <span>
                  {exam.name} {exam.laterality !== 'N/A' && `(${exam.laterality})`}
                </span>
              </li>
            ))
          ) : (
            <li className="text-gray-300 italic">Nenhum exame selecionado...</li>
          )}
        </ul>

        {data.clinicalIndication && (
          <div className="mt-8 text-[10pt] uppercase leading-relaxed p-4 bg-gray-50 border-l-4 border-blue-200">
            <span className="underline font-bold">INDICAÇÃO CLÍNICA:</span><br/>
            <span className="mt-2 block line-clamp-6">{data.clinicalIndication}</span>
          </div>
        )}
      </main>

      {/* Footer / Stamp Area - FORCED TO BOTTOM */}
      <footer className="mt-auto flex flex-col items-center shrink-0 w-full pt-8 pb-10">
        <div className="flex justify-center w-full relative">
            {/* Somente o Carimbo */}
            {selectedDoctor.signatureUrl ? (
              <div className="flex justify-center w-full">
                 <img 
                  src={selectedDoctor.signatureUrl} 
                  alt="Carimbo" 
                  className="h-32 w-auto object-contain mix-blend-multiply contrast-125 grayscale opacity-90 rotate-[-1deg]"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                 />
              </div>
            ) : (
              <div className="opacity-30 grayscale contrast-125 scale-[1.0] pointer-events-none pb-8">
                   <svg width="150" height="75" viewBox="0 0 120 60" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 40 Q 30 10 60 35 T 110 20" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" />
                      <path d="M15 45 Q 35 15 65 40 T 115 25" fill="none" stroke="#2563eb" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
                   </svg>
                   <div className="text-[8pt] text-gray-400 font-bold uppercase tracking-widest mt-2 text-center">CARIMBO DIGITAL</div>
              </div>
            )}
        </div>
      </footer>
    </div>
  );
};
