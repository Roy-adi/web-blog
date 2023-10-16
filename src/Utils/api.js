import axios from "axios";
export  const Base_url = "http://localhost:1337"

const params ={
    headers:{
        Authorization: "Bearer 9e686b381c8a59ff4545d3af3a14e8a851b383fad431f319924bc348d0569af098a3a47dbfe4e0e748b5e3620ec93972e8660bafafac6140a2b8353e1aa8d9f81287bd1ab9cee4f09188dec125f382def7efd6de554ee3a36a5139b89fb84a8b4b42b3c884b92d7d7cd77c7bab3a57182085c3172d575998a54e16d721063e1f ",
    },
}


export const fetchDataFromApi = async (url) => {
   
    try {
        const { data } = await axios.get(
            Base_url + url,
            params
        );
        console.log(data);
        return data;
    } catch (err) {
        console.log(err + "went wrong");
        return err;
    }
};

export const sendDataFromApi = async (url, params) => {
    console.log('Sending data:', params);
    try {
        const { data } = await axios.post(
            Base_url + url,
            params
        );
        console.log('Response data:', data);
        return data;
    } catch (err) {
        console.log(err + "went wrong");
        return err;
    }
};




export const editDataFromApi = async (url, params) => {
    console.log('Sending data:', params);
    try {
        const { data } = await axios.put(
            Base_url + url,
            params
        );
        console.log('Response data:', data);
        return data;
    } catch (err) {
        console.log(err + "went wrong");
        return err;
    }
};


export const deleteDataFromApi = async (url, params) => {
    console.log('Sending data:', params);
    try {
        const { data } = await axios.delete(
            Base_url + url,
            params
        );
        console.log('Response data:', data);
        return data;
    } catch (err) {
        console.log(err + "went wrong");
        return err;
    }
};