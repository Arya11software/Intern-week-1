export interface Employee {
  id: number;
  name: string;
  department: string;
  salary: number;
}

export interface EmployeeFormData {
  name: string;
  department: string;
  salary: string;
}

export interface ApiErrorBody {
  success: false;
  message: string;
}