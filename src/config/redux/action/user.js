import axios from 'axios'

export const getListContact = (search) => async (dispatch) => {
    try {
        const token = localStorage.getItem('token')
        console.log(token);
        dispatch({ type: "GET_LISTCONTACT_PENDING" });
        console.log('apakah dispatch jalan');
        const result = await axios.get(`${process.env.REACT_APP_API_URL}/users/listUser?search=${search}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        console.log('apakah dispatch seteleah get data jalan');
        // console.log(result);
        const users = result.data.data
        console.log(users);
        dispatch({ type: 'GET_ALL_USERS', payload: users })
    } catch (error) {
        console.log(error);
    }
}

export const getProfile = () => async (dispatch) => {
    try {
        const token = localStorage.getItem('token')
        console.log(token);
        dispatch({ type: "GET_PROFILE_PENDING" });
        console.log('apakah dispatch jalan');
        const result = await axios.get(`${process.env.REACT_APP_API_URL}/users/profile`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        // console.log(result);
        const profile = result.data.data
        console.log(profile);
        dispatch({ type: 'GET_PROFILE_SUCCESS', payload: profile })
    } catch (error) {
        console.log(error);
    }
}