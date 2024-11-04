
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../../Context/authContext";


const Detail = () => {
    const {base_url} = useAuth();
    const { id } = useParams();
    console.log(id);

    const [leave, setLeave] = useState([]);
    useEffect(() => {
        const fetchLeave = async () => {

            // try {
            //     const response = await axios.get(`${base_url}/api/leave/detail/${id}`, {
            //         headers: {
            //             "Authorization": `Bearer ${localStorage.getItem('token')}`
            //         }
            //     });
            //     console.log("Fetched data:");
            //     if (response.data.success) {
            //         setLeave(response.data.leave);
            //     }
            // } catch(error) {
            //     if (error.response && !error.response.data.error) {
            //         alert(error.response.data.error);
            //     }
            // }

            try {
                const response = await axios.get(`${base_url}/api/leave/detail/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (response.data.success) {
                    setLeave(response.data.leave);
                }
            } catch (error) {
                console.error("Error fetching leave details:", error);
                alert("An error occurred while fetching leave details");
            }
        }
        fetchLeave();
    }, []);


    return (

        <>
            {leave ? (
                <Wrapper className="container mt-5">
                    <h2 className="text-center m-4">Leave Details</h2>
                    <div className="d-flex align-items-center p-5 mt-5 emp_view">
                        <div className="m-5">
                            <img className="emp_image" src={`${base_url}/${leave?.employeeId?.userId?.profileImage}`} alt="Profile" />
                        </div>
                        <div className="mx-4">
                            
                            <p>Name: <span>{leave?.employeeId?.userId?.name || 'N/A'}</span></p>
                            <p>Employee Id: <span>{leave?.employeeId?.employeeId || 'N/A'}</span></p>
                            <p>Reason: <span>{leave?.reason || 'N/A'}</span></p>
                            <p>Leave Type: <span>{leave?.leaveType || 'N/A'}</span></p>
                            <p>Department: <span>{leave?.employeeId?.department?.dep_name || 'N/A'}</span></p>
                            <p>Start Date: <span>{new Date(leave.startDate).toLocaleDateString()}</span></p>
                            <p>End Date: <span>{new Date(leave.endDate).toLocaleDateString()}</span></p>
                            <p>Status: <span>{leave?.status || 'N/A'}</span></p>
                        </div>
                    </div>
                </Wrapper>
            ) : (<div>Loading...</div>)}
        </>
    );



};


const Wrapper = styled.div`

.emp_image{
    height:300px;
    width:300px;
    border-radius:50%;
}
.emp_view{
    background:white;
    height:30rem;
}
`


export default Detail;