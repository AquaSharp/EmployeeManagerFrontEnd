import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Spacer,
  VStack,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "../../ColorModeSwitcher";
import * as React from "react";
import { AddIcon } from "@chakra-ui/icons";
import { Routes, Route, Link as RouterLink } from "react-router-dom";
import { EmployeeTable } from "./EmployeeTable";
import { CreateEmployee } from "./CreateEmployee";
import { Employee } from "./Employee";

export const EmployeeIndex = () => {
  return (
    <Container display={"flex"} pt={3} maxWidth="100vw" maxHeight="100vh">
      <VStack display={"flex"} width="100%" height="100%" spacing={2}>
        <Box display={"flex"} width="100%">
          <Heading as={RouterLink} to={"/"} size={"xl"}>
            Employee Manager
          </Heading>
          <Spacer />
          <HStack spacing={3}>
            <Button
              as={RouterLink}
              to={"/employees/create"}
              colorScheme={"green"}
              leftIcon={<AddIcon />}
            >
              New Employee
            </Button>
            <ColorModeSwitcher />
          </HStack>
        </Box>

        <Box pt={10}>
          <Routes>
            <Route
              path="/"
              element={<EmployeeTable />} // Use the element prop instead of component
            />
            <Route
              path="/employees/create"
              element={<CreateEmployee />} // Use the element prop instead of component
            />
            <Route
              path="/employees/:guid"
              element={<Employee />} // Use the element prop instead of component
            />
          </Routes>
        </Box>
      </VStack>
    </Container>
  );
};
