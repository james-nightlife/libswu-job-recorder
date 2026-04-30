import axios from 'axios';

const getUserInfo = async (username) => {
    try{
        const response = await axios.post(
            `https://api.swu.ac.th/centralapi/v1/EmployeeSwuActive/${username}`,
            {},
            {
                headers: {
                    'x-api-key': process.env.SWU_API_KEY,
                    "Content-Type": false
                }
            }
        );
        const data = response.data;
        const user = data.filter((x) => (x.buasri_id === username))[0]
    
    return {
        name: `${user.name_th} ${user.lname_th}`
    };
    }catch(e){
        console.error(e)
    }
}

export default getUserInfo;