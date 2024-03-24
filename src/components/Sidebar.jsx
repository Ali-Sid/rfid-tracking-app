import { useState } from 'react';
import { Flex, IconButton, VStack, Text, useBreakpointValue, Icon } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';

const Sidebar = ({isOpen, toggleSidebar}) => {
  // const [isOpen, setIsOpen] = useState(false);

  // const handleToggle = () => {
  //   setIsOpen(!isOpen);
  // };

  const sidebarWidth = useBreakpointValue({ base: '0px', md: '300px' });
  const sidebarContentWidth = useBreakpointValue({ base: '0px', md: '100%' });

  // Adjust the sidebar width based on the isOpen state
  // const sidebarWidth = isOpen ? '300px' : '0px';
  return (
    <Flex
      direction="column"
      bg="#eee"
      color="red"
      h="100vh"
      w={isOpen ? sidebarWidth : '0px'}
      position="fixed"
      top="5%"
      left="0"
      zIndex="10"
      boxShadow="2xl"
      overflowX="hidden"
      transition="width 0.3s ease"
    >
      {/* <Flex justify="space-between" p="4" alignItems="center">
        {isOpen ? (
          <IconButton
            aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
            icon={<Icon as={HamburgerIcon} />}
            onClick={toggleSidebar}
          />
        ) : (
          <IconButton
            aria-label="Open sidebar"
            icon={<Icon as={HamburgerIcon} />}
            onClick={toggleSidebar}
          />
        )}
      </Flex> */}
      <VStack spacing="4" p="4" align="start" w={sidebarContentWidth}>
        <Text fontSize="xl">Items</Text>
      </VStack>
    </Flex>
  );
};

export default Sidebar;
