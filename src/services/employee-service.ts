import { MESSAGES } from "../constants/message";
import { Axios, AxiosError } from "axios";
import { Employee } from "../interfaces/employee";
import {
  ToastId,
  UseToastOptions,
  //CloseAllToastsOptions,
} from "@chakra-ui/react";
import { EmployeeApi } from "../api/employee-api";

export type tHook = {
  (options?: UseToastOptions | undefined): string | number | undefined;
  close: (id: ToastId) => void;
  //closeAll: (options?: CloseAllToastOptions | undefined) => void;
  update(
    id: ToastId,
    options: Pick<
      UseToastOptions,
      | "position"
      | "onCloseComplete"
      | "duration"
      | "title"
      | "status"
      | "render"
      | "description"
      | "isClosable"
      | "variant"
    >
  ): void;
  isActive: (id: ToastId) => boolean | undefined;
};


export class EmployeeService { 
  private readonly _employeeApi: EmployeeApi;
  private readonly _toast;

  public constructor(toastHook: tHook) {
    this._employeeApi = EmployeeApi.getInstance();
    this._toast = toastHook;
  }

  public async createEmployee(employee: Employee) {
    return this._employeeApi
    .CreateEmployee(employee)
    .then(({data}) => {
      this._toast({
        title: MESSAGES.EMPLOYEE.CREATED,
        description: `${data.firstName}'s employee record has been saved to the database.`,
        status: 'success',
        position: 'top-right',
        isClosable: true,
      })
    })
    .catch((error: AxiosError) => {
      this._toast({
        title: 'Something went wrong while creating new Employee record',
        description: error.message,
        status: 'error',
        position: 'top-right',
        isClosable: true,
      })
    })
  }

  public async updateEmployee(guid: string, employee: Employee) {
    return this._employeeApi
    .UpdateEmployee(guid, employee)
    .then(({data}) => {
      this._toast({
        title: MESSAGES.EMPLOYEE.UPDATED,
        description: `${data.firstName}'s employee record has been updated in the database.`,
        status: 'success',
        position: 'top-right',
        isClosable: true,
      })
    })
    .catch((error: AxiosError) => {
      this._toast({
        title: 'Something went wrong while updating new Employee record',
        description: error.message,
        status: 'error',
        position: 'top-right',
        isClosable: true,
      })
    })
  }

  public async deleteEmployee(guid: string) {
    return this._employeeApi
    .DeleteEmployee(guid)
    .then(() => {
      this._toast({
        title: MESSAGES.EMPLOYEE.DELETED,
        description: `Employee record has been DELETED from the database.`,
        status: 'success',
        position: 'top-right',
        isClosable: true,
      })
    })
    .catch((error: AxiosError) => {
      this._toast({
        title: 'Something went wrong while deleting the employee',
        description: error.message,
        status: 'error',
        position: 'top-right',
        isClosable: true,
      })
    })
  }
}
