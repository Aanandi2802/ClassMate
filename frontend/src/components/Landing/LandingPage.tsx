// Author: Harshil Shah
import {Box} from "@chakra-ui/react";
import LandingPageHeader from "./LandingPageHeader";
import LandingCardViews from "./LandingCardViews";
import {useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";

const LandingPage = () => {

    const navigate = useNavigate();

    const location = useLocation();

    useEffect(() => {

        // Parse the query parameters from the location object
        const queryParams = new URLSearchParams(location.search);
        const feature = queryParams.get("feature");

        if (feature?.toLowerCase() === "forgetPassword".toLowerCase()) {
            navigate('/forgetPassword?user_id=' + queryParams.get("user_id"));
        }
    });
    return (
        <Box p={10}>

            <Box textAlign="left">
                <LandingPageHeader></LandingPageHeader>
            </Box>

            <Box textAlign="center">
                <LandingCardViews></LandingCardViews>
            </Box>
        </Box>
    );
};

export default LandingPage;
