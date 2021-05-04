import React, { useMemo, useContext } from "react";
// import api from '../apis/root';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    chakra,
    Button
} from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { useTable, useSortBy } from "react-table";
import { SessionContext } from "./contexts/SessionContext";
import "./Results.css";

const Results = ({ valueArray }) => {
    // eslint-disable-next-line no-unused-vars
    const { session, sessionUpdate } = useContext(SessionContext);
    console.log(session);
    const sessionData = useMemo(() => session, [session]);
    // const data = useMemo(
    //     () => [
    //         {
    //             center_id: 1234,
    //             name: "District General Hostpital",
    //             name_l: "",
    //             state_name: "Maharashtra",
    //             state_name_l: "",
    //             district_name: "Satara",
    //             district_name_l: "",
    //             block_name: "Jaoli",
    //             block_name_l: "",
    //             pincode: "413608",
    //             lat: 28.7,
    //             long: 77.1,
    //             from: "09:00:00",
    //             to: "18:00:00",
    //             fee_type: "Paid",
    //             fee: "250",
    //             session_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    //             date: "31-05-2021",
    //             available_capacity: 50,
    //             min_age_limit: 18,
    //             vaccine: "COVISHIELD",
    //             slots: ["FORENOON", "AFTERNOON"]
    //         }
    //     ],
    //     []
    // );
    const columns = useMemo(
        () => [
            {
                Header: "name",
                accessor: "name"
            },
            {
                Header: "Block Name",
                accessor: "block_name"
            },
            {
                Header: "Address",
                accessor: "address"
            },
            {
                Header: "Pin Code",
                accessor: "pincode"
            },
            {
                Header: "Start at",
                accessor: "from"
            },
            {
                Header: "Ends at",
                accessor: "to"
            },
            {
                Header: "Service Type",
                accessor: "fee_type"
            },
            {
                Header: "Fees",
                accessor: "fee"
            },
            {
                Header: "Available Capacity",
                accessor: "available_capacity"
            },
            {
                Header: "Age Limit",
                accessor: "min_age_limit"
            },
            {
                Header: "Vaccine",
                accessor: "vaccine"
            },
            {
                Header: "Direction"
            }
        ],
        []
    );
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = useTable({ columns, data: sessionData }, useSortBy);

    return (
        <Table style={{ overflowY: "scroll" }} mt={50} {...getTableProps()}>
            <Thead>
                {headerGroups.map((headerGroup) => (
                    <Tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            <Th
                                {...column.getHeaderProps(
                                    column.getSortByToggleProps()
                                )}
                                isNumeric={column.isNumeric}
                            >
                                {column.render("Header")}
                                <chakra.span pl="4">
                                    {column.isSorted ? (
                                        column.isSortedDesc ? (
                                            <TriangleDownIcon aria-label="sorted descending" />
                                        ) : (
                                            <TriangleUpIcon aria-label="sorted ascending" />
                                        )
                                    ) : null}
                                </chakra.span>
                            </Th>
                        ))}
                    </Tr>
                ))}
            </Thead>
            <Tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                    prepareRow(row);
                    return (
                        <Tr {...row.getRowProps()}>
                            {row.cells.map((cell) => (
                                <Td
                                    {...cell.getCellProps()}
                                    isNumeric={cell.column.isNumeric}
                                >
                                    {cell.render("Cell")}
                                </Td>
                            ))}
                            <Td>
                                <Button>Directions</Button>
                            </Td>
                        </Tr>
                    );
                })}
            </Tbody>
        </Table>
    );
};

export default Results;
