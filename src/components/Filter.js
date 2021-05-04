import React, { useContext, useEffect, useState } from "react";
import { fetchByDistrict, fetchDistricts, fetchStates } from "../apis/requests";
import {
    Container,
    HStack,
    Box,
    Select,
    Heading,
    Center,
    Divider,
    Input,
    NumberInput,
    NumberInputField
} from "@chakra-ui/react";
import { SessionContext } from "./contexts/SessionContext";

const Filter = () => {
    const [states, setStates] = useState([]);
    const [selectDistrict, setSelectedDistrict] = useState(null);
    // const [sessions, setSessions] = useState([]);
    const { setSession } = useContext(SessionContext);
    const [districts, setDistricts] = useState([]);
    const [startDate, setStartDate] = useState(new Date());

    useEffect(() => {
        fetchStates().then((data) => {
            setStates(data);
        });
    }, []);

    const renderOptions = (options) => {
        return options.map(({ value, label }) => {
            return (
                <option key={value} value={value}>
                    {label}
                </option>
            );
        });
    };

    const stateChange = (e) => {
        fetchDistricts(e.target.value).then((data) => {
            setDistricts(data);
        });
    };

    const districtChange = (e) => {
        setSelectedDistrict(e.target.value);
        fetchByDistrict(e.target.value, startDate).then((data) => {
            setSession(data.sessions);
            // setSessions(data);
        });
    };

    const onFeeChange = (e) => {
        // console.log(selectDistrict);
        console.log(e.target.value);
        if (selectDistrict) {
            fetchByDistrict(selectDistrict, startDate).then((data) => {
                const fltd = data.sessions.filter((record) => {
                    return record.fee_type === e.target.value;
                });
                setSession(fltd);
            });
        }
    };
    const AgeLimit = (e) => {
        // console.log(selectDistrict);
        console.log(e.target.value);
        if (selectDistrict) {
            fetchByDistrict(selectDistrict, startDate).then((data) => {
                const fltd = data.sessions.filter((record) => {
                    return (
                        parseInt(record.min_age_limit) <=
                        parseInt(e.target.value)
                    );
                });
                setSession(fltd);
            });
        }
    };

    const dateSetter = (e) => {
        let a = [];
        a = e.target.value.split("-");
        const date = `${a[2]}-${a[1]}-${a[0]}`;
        setStartDate(date);
        if (selectDistrict !== null) {
            fetchByDistrict(selectDistrict, date).then((data) => {
                setSession(data.sessions);
                // setSessions(data);
            });
        }
    };

    return (
        <Container maxW="container.xl">
            <Center p={3}>
                <Heading as="h1" size="xl" style={{ alignContent: "center" }}>
                    CovInfo
                </Heading>
            </Center>
            <Divider></Divider>
            <HStack spacing={4}>
                <Box w="100%" pr={1} pl={1} pt={5}>
                    <Input
                        placeholder="Please Select Date"
                        type="date"
                        onChange={dateSetter}
                    ></Input>
                </Box>
                <Box w="100%" pl={1} pr={1} pt={5} color="black">
                    <Select onChange={stateChange}>
                        {" "}
                        <option value="null">Select State</option>
                        {renderOptions(states)}{" "}
                    </Select>
                </Box>
                <Box w="100%" pr={1} pl={1} pt={5} color="black">
                    <Select onChange={districtChange}>
                        <option value="null">Select District</option>{" "}
                        {renderOptions(districts)}
                    </Select>
                </Box>
                <Box w="100%" pr={1} pl={1} pt={5} color="black">
                    <Select onChange={onFeeChange}>
                        <option value="null">Select Fee Type</option>
                        <option value="Free">Free</option>
                        <option value="Paid">Paid</option>
                    </Select>
                </Box>
                <Box w="100%" pr={1} pl={1} pt={5} color="black">
                    <NumberInput placeholder="Enter Age" min={10} max={20}>
                        <NumberInputField
                            placeholder="Enter Age"
                            onChange={AgeLimit}
                        />
                    </NumberInput>
                </Box>
            </HStack>
            <Divider></Divider>
        </Container>
    );
};

export default Filter;
