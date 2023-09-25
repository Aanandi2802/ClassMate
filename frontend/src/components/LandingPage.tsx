// Author: Viral Siddhapura
import React from "react";
import { Box, Divider } from "@chakra-ui/react";
import LandingPageHeader from "./Landing/LandingPageHeader";
import LandingCardViews from "./Landing/LandingCardViews";

const LandingPage = () => {
  return (
    <Box p={10}>
      
        <Box textAlign="left">
            <LandingPageHeader></LandingPageHeader>
        </Box>

        <Divider mt={8} borderColor="black" borderWidth={2} />

        <Box textAlign="center">
            <LandingCardViews></LandingCardViews>
        </Box>

        <Divider mt={8} borderColor="black" borderWidth={2} />

        {/* <Box textAlign="center">
            <LandingFooter></LandingFooter>
        </Box> */}
    </Box>
  );
};

export default LandingPage;
