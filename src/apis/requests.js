import _ from "lodash";
import api from "./root";

export const fetchStates = async () => {
    try {
        const data = await api.get("/v2/admin/location/states");
        const options = _.map(data.data.states, ({ state_id, state_name }) => {
            return { value: state_id, label: state_name };
        });
        return options;
    } catch (error) {
        console.log(error);
    }
};
export const fetchDistricts = async (id) => {
    try {
        const data = await api.get(`/v2/admin/location/districts/${id}`);
        const options = _.map(
            data.data.districts,
            ({ district_id, district_name }) => {
                return { value: district_id, label: district_name };
            }
        );
        // console.log(options)
        return options;
    } catch (error) {
        console.log(error);
    }
};

export const fetchByDistrict = async (id, date) => {
    try {
        const data = await api.get(
            `/v2/appointment/sessions/public/findByDistrict`,
            {
                params: {
                    district_id: id,
                    date: date
                }
            }
        );
        return data.data;
    } catch (error) {
        console.log(error);
    }
};
