
export type Laterality = 'AO' | 'OD' | 'OE' | 'N/A';

export interface Doctor {
  id: string;
  name: string;
  crm: string;
  rqe?: string;
  signatureUrl?: string; // URL da imagem do carimbo/assinatura
}

export interface Exam {
  id: string;
  name: string;
}

export interface SelectedExam {
  id: string;
  name: string;
  laterality: Laterality;
}

export interface MedicalRequestData {
  patientName: string;
  examDate: string;
  doctorId: string;
  exams: SelectedExam[];
  clinicalIndication: string;
}
