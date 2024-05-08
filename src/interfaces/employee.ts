import { Department } from "./department";

export interface Employee {
  id: number;
  guid: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  dateOfBirth: string;
  age: number;
  salary: number;
  // FIX: foreign key
  departmentId: number;
  createdAt: Date;
  updatedAt: Date;
  // FIX: add this nullable department so it will send as blank or undefined in http request (null and undefined is different)
  department?: Department;
}
