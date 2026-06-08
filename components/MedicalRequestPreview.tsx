
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
    <div className="print-area bg-white w-full aspect-[1/1.4142] p-[1.0cm] shadow-xl mx-auto flex flex-col font-courier text-[#000000] overflow-hidden min-h-[29.7cm]">
      {/* Centered Vertical Header */}
      <header className="flex flex-col items-center text-center mb-4 text-blue-800 shrink-0">
        <div className="mb-2">
          <img 
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDQuiD1qkNsRZQhRiJdI_o6IjDVktnGBcb6w&s" 
            alt="Logo Centro da Saúde Ocular" 
            referrerPolicy="no-referrer"
            className="h-16 w-auto object-contain"
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
      <section className="mb-4 space-y-1 text-[10pt] uppercase shrink-0">
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
            {selectedDoctor.crm} {selectedDoctor.rqe ? ` / RQE: ${selectedDoctor.rqe}` : ''}
          </span>
        </div>
      </section>

      {/* Request Body - FLEX GROW TO PUSH FOOTER DOWN */}
      <main className="flex-grow mt-1 overflow-hidden">
        <p className="mb-4 font-bold text-[10pt] uppercase italic underline">SOLICITO A REALIZAÇÃO DOS SEGUINTES EXAMES:</p>
        
        <ul className="mb-4 space-y-1.5 ml-4">
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
          <div className="mt-4 text-[10pt] uppercase leading-relaxed p-3 bg-gray-50 border-l-4 border-blue-200">
            <span className="underline font-bold">INDICAÇÃO CLÍNICA:</span><br/>
            <span className="mt-1 block line-clamp-4">{data.clinicalIndication}</span>
          </div>
        )}
      </main>

      {/* Footer / Stamp Area - FORCED TO BOTTOM */}
      <footer className="mt-auto flex flex-col items-center shrink-0 w-full pt-2 pb-6">
        <div className="flex flex-col items-center justify-center w-full">
            {/* Somente o Carimbo */}
            {selectedDoctor.signatureUrl ? (
              <div className="flex justify-center w-full">
                 <img 
                  src={selectedDoctor.signatureUrl} 
                  alt="Carimbo" 
                  referrerPolicy="no-referrer"
                  className="h-32 w-auto object-contain mix-blend-multiply contrast-125 opacity-95"
                  onError={(e) => {
                    console.warn("Could not load image reference:", selectedDoctor.signatureUrl);
                  }}
                 />
              </div>
            ) : (
              <div className="opacity-30 grayscale contrast-125 scale-[1.0] pointer-events-none pb-4 text-center">
                   <svg width="150" height="75" viewBox="0 0 120 60" xmlns="http://www.w3.org/2000/svg" className="mx-auto">
                      <path d="M10 40 Q 30 10 60 35 T 110 20" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" />
                      <path d="M15 45 Q 35 15 65 40 T 115 25" fill="none" stroke="#2563eb" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
                   </svg>
                   <div className="text-[8pt] text-gray-400 font-bold uppercase tracking-widest mt-2">{selectedDoctor.name}</div>
              </div>
            )}
        </div>
      </footer>
    </div>
  );
};
