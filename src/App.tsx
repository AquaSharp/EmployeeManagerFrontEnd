import React from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { EmployeeIndex } from "./components/employee/EmployeeIndex";

// Define your Chakra UI theme
const theme = extendTheme({
  // Your theme configuration here
});

// App component
const App = () => (
  <ChakraProvider theme={theme}>
    <EmployeeIndex />
  </ChakraProvider>
);

export default App;
