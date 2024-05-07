import {
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
  Spacer,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import React, { useState } from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { Department } from "../../../interfaces/department";
import { EmployeeService } from "../../../services/employee-service";
import { CalculateAgeEffect } from "../../../effects/calculateAge.effect";
import { PopulateDepartmentOptionsEffect } from "../../../effects/populateDepartmentOptions.effect";
import { Employee } from "../../../interfaces/employee";
import { SetEmployeeFormDataEffect } from "../../../effects/setEmployeeFormData.effect";
import { useNavigate } from "react-router-dom";
import { EmployeeFormProps } from "../../../types/EmployeeFormProps";

export const EmployeeForm = ({
  formType,
  employeeDetails,
  isLoading,
}: EmployeeFormProps) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    watch,
    reset,
    setValue,
  } = useForm();

  const routerHistory = useNavigate();

  const dateOfBirth = watch("dateOfBirth");
  const toastHook = useToast();
  const employeeService = new EmployeeService(toastHook);
  const [isDepartmentSelected, setIsDepartmentSelected] = useState(false);
  const [departments, setDepartments] = useState<Department[] | null>(null);

  const goToHome = () => {
    routerHistory("/");
  };

  const resetForm = () => {
    reset();
    setIsDepartmentSelected(false);
  };

  CalculateAgeEffect(setValue, dateOfBirth);
  PopulateDepartmentOptionsEffect(setDepartments);
  SetEmployeeFormDataEffect(employeeDetails, setValue, setIsDepartmentSelected);

  const onSubmit: SubmitHandler<FieldValues> = async (
    formData: FieldValues
  ) => {
    // Convert or process formData to match the Employee type
    const employeeData: Employee = {
      id: formData.id,
      guid: formData.guid,
      firstName: formData.firstName,
      lastName: formData.lastName,
      emailAddress: formData.emailAddress,
      dateOfBirth: formData.dateOfBirth,
      age: formData.age,
      salary: formData.salary,
      department: formData.department,
      createdAt: formData.createdAt,
      updatedAt: formData.updatedAt,
    };

    // Call your existing logic with the converted employeeData
    switch (formType) {
      case "create": {
        return employeeService.createEmployee(employeeData).then(() => {
          goToHome();
        });
      }
      case "update": {
        return employeeService
          .updateEmployee(
            employeeDetails ? employeeDetails.guid : employeeData.guid,
            employeeData
          )
          .then(() => {
            goToHome();
          });
      }
    }
  };

  return (
    <Center height="100%">
      {isLoading && <Spinner size={"xl"} thickness={"4px"} />}
      {!isLoading && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl mb={2} isInvalid={!!errors.departmentId} isRequired>
            <FormLabel htmlFor="departmentId">Department</FormLabel>
            <Select
              id="departmentId"
              {...register("departmentId", {
                validate: (value) => value > 0 || "Department is required",
                valueAsNumber: true,
              })}
              onChange={(e) =>
                setIsDepartmentSelected(Number(e.target.value) > 0)
              }
            >
              <option value="0">Choose a Department...</option>
              {departments?.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </Select>
          </FormControl>

          <HStack mb={2}>
            <FormControl
              isInvalid={!!errors.firstName}
              isRequired
              isDisabled={!isDepartmentSelected}
            >
              <FormLabel htmlFor="firstName">First Name</FormLabel>
              <Input
                id="firstName"
                placeholder="i.e. John"
                {...register("firstName", {
                  required: "First name is required",
                })}
              />
            </FormControl>

            <FormControl
              isInvalid={!!errors.firstName}
              isRequired
              isDisabled={!isDepartmentSelected}
            >
              <FormLabel htmlFor="lastName">Last Name</FormLabel>
              <Input
                id="lastName"
                placeholder="i.e. Doe"
                {...register("lastName", {
                  required: "Last name is required",
                })}
              />
            </FormControl>
          </HStack>

          <FormControl
            mb={2}
            isInvalid={!!errors.emailAddress}
            isRequired
            isDisabled={!isDepartmentSelected}
          >
            <FormLabel htmlFor="emailAddress">Email Address</FormLabel>
            <Input
              id="emailAddress"
              type={"email"}
              placeholder="i.e. john.doe@example.com"
              {...register("emailAddress", {
                required: "Email address is required",
              })}
            />
          </FormControl>

          <HStack mb={2}>
            <FormControl
              isInvalid={!!errors.dateOfBirth}
              isRequired
              isDisabled={!isDepartmentSelected}
            >
              <FormLabel htmlFor="dateOfBirth">Date of Birth</FormLabel>
              <Input
                id="dateOfBirth"
                type={"date"}
                placeholder="i.e. 06-08-1997"
                {...register("dateOfBirth", {
                  required: "Date of birth is required",
                  // valueAsDate: true,
                })}
              />
            </FormControl>

            <FormControl
              isInvalid={!!errors.age}
              isRequired
              isReadOnly
              isDisabled={!isDepartmentSelected}
            >
              <FormLabel htmlFor="age">Age</FormLabel>
              <Input
                id="age"
                type={"number"}
                placeholder="i.e. 24"
                {...register("age", {
                  required: "Age is required",
                  valueAsNumber: true,
                })}
              />
            </FormControl>
          </HStack>

          <FormControl
            mb={2}
            isInvalid={!!errors.salary}
            isRequired
            isDisabled={!isDepartmentSelected}
          >
            <FormLabel htmlFor="salary">Salary</FormLabel>
            <InputGroup>
              <InputLeftAddon children="₱" />
              <Input
                id="salary"
                type={"number"}
                step={0.01}
                placeholder="i.e. 65000.00"
                {...register("salary", {
                  required: "Salary is required",
                  setValueAs: (value) => Number.parseFloat(value).toFixed(2),
                })}
              />
            </InputGroup>
          </FormControl>

          <HStack mt={5}>
            <Spacer />
            <Button variant={"ghost"} type={"reset"} onClick={resetForm}>
              Reset
            </Button>

            <Button
              isDisabled={!isDepartmentSelected}
              leftIcon={<CheckIcon />}
              colorScheme={formType === "update" ? "orange" : "green"}
              isLoading={isSubmitting}
              type={"submit"}
            >
              {formType === "update" ? "Update" : "Save"}
            </Button>
          </HStack>
        </form>
      )}
    </Center>
  );
};
