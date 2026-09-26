import type { ApiErrorBody, Employee, EmployeeFormData } from "@/types/employee";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  if (!apiBaseUrl) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured.");
  }

  let response: Response;
  try {
    response = await fetch(`${apiBaseUrl}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      cache: "no-store",
    });
  } catch {
    throw new Error("Could not reach the Employee API. Check that the backend is running.");
  }

  if (!response.ok) {
    let errorBody: Partial<ApiErrorBody> = {};
    try {
      errorBody = await response.json() as ApiErrorBody;
    } catch {
      // Use a general message if the API did not return JSON.
    }
    throw new ApiError(errorBody.message || "The request could not be completed.", response.status);
  }

  return response.json() as Promise<T>;
}

export function getEmployees(): Promise<Employee[]> {
  return request<Employee[]>("/employees");
}

export function getEmployee(id: number): Promise<Employee> {
  return request<Employee>(`/employees/${id}`);
}

export function createEmployee(data: EmployeeFormData): Promise<Employee> {
  return request<Employee>("/employees", {
    method: "POST",
    body: JSON.stringify({ ...data, salary: Number(data.salary) }),
  });
}

export function updateEmployee(id: number, data: EmployeeFormData): Promise<Employee> {
  return request<Employee>(`/employees/${id}`, {
    method: "PUT",
    body: JSON.stringify({ ...data, salary: Number(data.salary) }),
  });
}

export function deleteEmployee(id: number): Promise<{ success: true; message: string }> {
  return request<{ success: true; message: string }>(`/employees/${id}`, { method: "DELETE" });
}