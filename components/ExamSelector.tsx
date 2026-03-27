
import React from 'react';
import { EXAMS } from '../constants';
import { SelectedExam, Laterality } from '../types';
import { Plus, Trash2 } from 'lucide-react';

interface ExamSelectorProps {
  selectedExams: SelectedExam[];
  onChange: (exams: SelectedExam[]) => void;
}

export const ExamSelector: React.FC<ExamSelectorProps> = ({ selectedExams, onChange }) => {
  const addExam = () => {
    const firstExam = EXAMS[0];
    onChange([...selectedExams, { id: firstExam.id, name: firstExam.name, laterality: 'AO' }]);
  };

  const removeExam = (index: number) => {
    const newExams = [...selectedExams];
    newExams.splice(index, 1);
    onChange(newExams);
  };

  const updateExam = (index: number, updates: Partial<SelectedExam>) => {
    const newExams = [...selectedExams];
    if (updates.id) {
        const found = EXAMS.find(e => e.id === updates.id);
        if (found) {
            newExams[index] = { ...newExams[index], id: found.id, name: found.name };
        }
    } else {
        newExams[index] = { ...newExams[index], ...updates };
    }
    onChange(newExams);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <label className="block text-sm font-medium text-gray-700">Exames Solicitados</label>
        <button
          type="button"
          onClick={addExam}
          className="flex items-center gap-1 text-xs font-semibold bg-blue-50 text-blue-600 px-3 py-1.5 rounded-md hover:bg-blue-100 transition-colors"
        >
          <Plus size={14} /> Adicionar Exame
        </button>
      </div>

      {selectedExams.map((exam, index) => (
        <div key={index} className="flex gap-2 items-start bg-gray-50 p-3 rounded-lg border border-gray-200">
          <div className="flex-1 space-y-2">
            <select
              value={exam.id}
              onChange={(e) => updateExam(index, { id: e.target.value })}
              className="w-full text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              {EXAMS.map((e) => (
                <option key={e.id} value={e.id}>{e.name}</option>
              ))}
            </select>
            
            <div className="flex gap-4">
              {['AO', 'OD', 'OE', 'N/A'].map((lat) => (
                <label key={lat} className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name={`lat-${index}`}
                    value={lat}
                    checked={exam.laterality === lat}
                    onChange={(e) => updateExam(index, { laterality: e.target.value as Laterality })}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-xs text-gray-600 font-medium">{lat}</span>
                </label>
              ))}
            </div>
          </div>
          
          <button
            type="button"
            onClick={() => removeExam(index)}
            className="text-red-400 hover:text-red-600 transition-colors p-1"
          >
            <Trash2 size={18} />
          </button>
        </div>
      ))}

      {selectedExams.length === 0 && (
        <p className="text-center py-4 text-sm text-gray-400 border-2 border-dashed border-gray-200 rounded-lg italic">
          Nenhum exame selecionado.
        </p>
      )}
    </div>
  );
};
