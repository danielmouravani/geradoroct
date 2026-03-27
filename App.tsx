
import React, { useState } from 'react';
import { Printer, Eye, FileText, Settings, User, ClipboardList, UserPlus, Trash2, Edit3, Image as ImageIcon } from 'lucide-react';
import { DOCTORS as INITIAL_DOCTORS } from './constants';
import { MedicalRequestData, Doctor } from './types';
import { ExamSelector } from './components/ExamSelector';
import { MedicalRequestPreview } from './components/MedicalRequestPreview';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'form' | 'doctors'>('form');
  const [doctors, setDoctors] = useState<Doctor[]>(INITIAL_DOCTORS);
  const [formData, setFormData] = useState<MedicalRequestData>({
    patientName: '',
    examDate: new Date().toISOString().split('T')[0],
    doctorId: doctors[0]?.id || '',
    exams: [],
    clinicalIndication: ''
  });

  const handlePrint = () => {
    window.print();
  };

  const updateDoctor = (id: string, updates: Partial<Doctor>) => {
    setDoctors(prev => prev.map(doc => doc.id === id ? { ...doc, ...updates } : doc));
  };

  const addDoctor = () => {
    const newDoc: Doctor = {
      id: Math.random().toString(36).substr(2, 9),
      name: 'Novo Médico',
      crm: '000000',
    };
    setDoctors([...doctors, newDoc]);
  };

  const removeDoctor = (id: string) => {
    if (doctors.length <= 1) return;
    setDoctors(doctors.filter(d => d.id !== id));
    if (formData.doctorId === id) {
      setFormData({ ...formData, doctorId: doctors.find(d => d.id !== id)?.id || '' });
    }
  };

  const currentDoctor = doctors.find(d => d.id === formData.doctorId) || doctors[0];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Navbar */}
      <nav className="no-print bg-white border-b border-slate-200 px-6 py-3 flex justify-between items-center sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-2 rounded-lg">
            <FileText className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-800 leading-tight">Painel de Pedidos</h1>
            <p className="text-xs text-slate-500 font-medium">Centro da Saúde Ocular Drª. Kátia Mello</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-all shadow-md active:scale-95"
          >
            <Printer size={18} />
            Imprimir Pedido
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 container mx-auto p-4 md:p-6 lg:p-8 flex flex-col lg:flex-row gap-8">
        
        {/* Sidebar / Form */}
        <div className="no-print w-full lg:w-[420px] shrink-0 space-y-6">
          
          {/* Tabs */}
          <div className="flex bg-white p-1 rounded-xl shadow-sm border border-slate-200">
            <button 
              onClick={() => setActiveTab('form')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === 'form' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              <ClipboardList size={16} /> Pedido
            </button>
            <button 
              onClick={() => setActiveTab('doctors')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === 'doctors' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              <User size={16} /> Médicos & Carimbos
            </button>
          </div>

          {activeTab === 'form' ? (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-6 animate-in fade-in slide-in-from-left-4 duration-300">
              <div className="space-y-4">
                <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                  <User size={16} /> Identificação
                </h2>
                
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-slate-700">Paciente</label>
                  <input
                    type="text"
                    placeholder="Nome completo"
                    value={formData.patientName}
                    onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                    className="w-full border-slate-200 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm py-2.5"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-slate-700">Data do Exame</label>
                    <input
                      type="date"
                      value={formData.examDate}
                      onChange={(e) => setFormData({ ...formData, examDate: e.target.value })}
                      className="w-full border-slate-200 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm py-2.5"
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-slate-700">Selecionar Médico</label>
                    <select
                      value={formData.doctorId}
                      onChange={(e) => setFormData({ ...formData, doctorId: e.target.value })}
                      className="w-full border-slate-200 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm py-2.5"
                    >
                      {doctors.map((doc) => (
                        <option key={doc.id} value={doc.id}>{doc.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <hr className="border-slate-100" />

              <div className="space-y-4">
                <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                  <ClipboardList size={16} /> Exames & Indicação
                </h2>
                
                <ExamSelector
                  selectedExams={formData.exams}
                  onChange={(exams) => setFormData({ ...formData, exams })}
                />

                <div className="space-y-1">
                  <label className="block text-sm font-medium text-slate-700">Indicação Clínica</label>
                  <textarea
                    rows={2}
                    placeholder="Motivo do exame..."
                    value={formData.clinicalIndication}
                    onChange={(e) => setFormData({ ...formData, clinicalIndication: e.target.value })}
                    className="w-full border-slate-200 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm py-2.5 resize-none"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="flex justify-between items-center">
                <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Gerenciar Médicos</h2>
                <button 
                  onClick={addDoctor}
                  className="text-xs bg-green-50 text-green-600 px-2 py-1 rounded flex items-center gap-1 font-bold hover:bg-green-100"
                >
                  <UserPlus size={14} /> Novo
                </button>
              </div>

              <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                {doctors.map((doc) => (
                  <div key={doc.id} className="p-4 border border-slate-100 rounded-xl bg-slate-50 space-y-3 relative group">
                    <button 
                      onClick={() => removeDoctor(doc.id)}
                      className="absolute top-2 right-2 text-slate-300 hover:text-red-500 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 size={16} />
                    </button>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-slate-400">
                        <User size={14} />
                        <input
                          type="text"
                          value={doc.name}
                          placeholder="Nome do Médico"
                          onChange={(e) => updateDoctor(doc.id, { name: e.target.value })}
                          className="bg-transparent border-none focus:ring-0 p-0 text-sm font-bold text-slate-800 w-full"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-white border border-slate-200 rounded-lg p-2">
                          <label className="block text-[10px] uppercase font-bold text-slate-400">CRM</label>
                          <input
                            type="text"
                            value={doc.crm}
                            onChange={(e) => updateDoctor(doc.id, { crm: e.target.value })}
                            className="w-full border-none focus:ring-0 p-0 text-xs text-slate-600 font-medium"
                          />
                        </div>
                        <div className="bg-white border border-slate-200 rounded-lg p-2">
                          <label className="block text-[10px] uppercase font-bold text-slate-400">RQE</label>
                          <input
                            type="text"
                            value={doc.rqe || ''}
                            placeholder="Opcional"
                            onChange={(e) => updateDoctor(doc.id, { rqe: e.target.value })}
                            className="w-full border-none focus:ring-0 p-0 text-xs text-slate-600 font-medium"
                          />
                        </div>
                      </div>

                      <div className="bg-white border border-slate-200 rounded-lg p-2">
                        <label className="block text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
                          <ImageIcon size={10} /> URL do Carimbo / Assinatura
                        </label>
                        <input
                          type="text"
                          value={doc.signatureUrl || ''}
                          placeholder="Link da imagem (transparente pref.)"
                          onChange={(e) => updateDoctor(doc.id, { signatureUrl: e.target.value })}
                          className="w-full border-none focus:ring-0 p-0 text-xs text-slate-500 font-mono"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3 items-start">
             <div className="bg-blue-100 p-2 rounded-full text-blue-600">
                <Settings size={18} />
             </div>
             <div>
                <h3 className="text-sm font-bold text-blue-900">Associação de Carimbos</h3>
                <p className="text-xs text-blue-700 leading-relaxed mt-1">
                  Na aba de Médicos, você pode inserir a URL de uma imagem de assinatura (PNG com fundo transparente funciona melhor). Se não inserir, o sistema gera um carimbo padrão.
                </p>
             </div>
          </div>
        </div>

        {/* Preview Area */}
        <div className="flex-1 flex flex-col items-center">
          <div className="no-print w-full max-w-[21cm] mb-4 flex justify-between items-center text-slate-500 px-2">
            <span className="text-xs font-semibold flex items-center gap-2 uppercase tracking-widest">
                <Eye size={14} /> Pré-visualização Real-Time
            </span>
            <span className="text-xs">Padronização A4 • {currentDoctor.name}</span>
          </div>
          <div className="w-full max-w-[21cm]">
             <MedicalRequestPreview data={formData} selectedDoctor={currentDoctor} />
          </div>
        </div>

      </main>
    </div>
  );
};

export default App;
