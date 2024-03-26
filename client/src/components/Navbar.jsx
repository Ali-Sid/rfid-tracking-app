import { HamburgerIcon } from '@chakra-ui/icons'
import { Box, Flex, IconButton, Icon } from '@chakra-ui/react'
import React from 'react'

function Navbar({isOpen, toggleSidebar}) {
  return (
    <Box bg="white.500" w="100vw" color="black" display="flex" alignItems="center" justifyContent="left">
      {/* <Flex justify="space-between" p={{ base: "2", md: "4" }} alignItems="center">
        {isOpen ? (
          <IconButton
            aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
            icon={<Icon as={HamburgerIcon} />}
            onClick={toggleSidebar}
            // size="sm"
            border="none"
            backgroundColor="#fff"
            _focus={{
              boxShadow: "none",
              outline: "none", // Remove the default focus outline
            }}
          />
        ) : (
          <IconButton
            aria-label="Open sidebar"
            icon={<Icon as={HamburgerIcon} />}
            onClick={toggleSidebar}
            // size="sm"
            border="none"
            backgroundColor="#fff"
            _focus={{
              boxShadow: "none",
              outline: "none", // Remove the default focus outline
            }}
          />
        )}
      </Flex> */}
    </Box>
  )
}

export default Navbar