import { ApiClient } from "./api-client";
import { Department } from "../interfaces/department";
import { AxiosResponse } from "axios";

export class DepartmentApi extends ApiClient {
  private static classInstance: DepartmentApi;

  private constructor() {
    super("https://localhost:7102/api/Department");
  }

  public static getInstance() {
    if (!this.classInstance) {
      this.classInstance = new DepartmentApi();
    }

    return this.classInstance;
  }

  public getAllDepartments = (
    minimal: boolean = true
  ): Promise<AxiosResponse<Department[]>> =>
    this.instance.get<Department[]>(minimal ? "/?minimal=true" : "/");
}
