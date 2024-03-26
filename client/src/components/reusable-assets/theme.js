// theme.js
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
 components: {
    IconButton: {
      baseStyle: {
        border: "none", // Ensure no border
        _focus: {
          boxShadow: "none", // Remove focus shadow
          border: "none", // Ensure no border on focus
        },
        _hover: {
          boxShadow: "none", // Remove hover shadow
          border: "none", // Ensure no border on hover
        },
        _active: {
          boxShadow: "none", // Remove active shadow
          border: "none", // Ensure no border on active
        },
        _disabled: {
          boxShadow: "none", // Remove disabled shadow
          border: "none", // Ensure no border on disabled
        },
      },
    },
 },
});

export default theme;
