import React from "react";
import Header from '../../components/AdminHeader';
import { useAppContext } from '../../Context';
import Skeleton from 'react-loading-skeleton';
// import { Link } from 'react-router-dom';
// import Loader from '../components/Loader';
// import Sidebar from '../components/Sidebar';
import { fetchAllStaff, deleteStaff } from "../../helpers/api";
import { capitalize } from '../../helpers/functions';

function StaffList(props) {

    const [isLoading, setIsLoading] = React.useState(false);
    const [data, setData] = React.useState([]);

    const handleDelete = async (id, role) => {
        const { status } = await deleteStaff(id, role);
        if (status === 200) {
            // update staff
            let _data = data.filter(staff => staff.id !== id);
            setData(_data);
        }
    }

    React.useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            const { status, data } = await fetchAllStaff();
            if (status === 200) {
                setData(data.staffList);
                console.log(data.staffList);
            }
            setIsLoading(false);
        }
        fetchData();
    }, []);

    return (
        <div>
            <Header data={props} />
            <div className="mt-5">
                <div className="container">
                    <p className="lead text-center">Members of staff</p>
                    <table id="staff-list" className="table table-bordered mt-3">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                {/* <th scope="col">ID</th> */}
                                <th scope="col">Name</th>
                                <th scope="col">Role</th>
                                <th scope="col">Email</th>
                                <th scope="col">Phone</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!isLoading ?
                                (data && data.length > 0 &&
                                    data.map((staff, index) => (
                                        <tr key={`staff-${staff.id}`}>
                                            <th scope="row">{index}</th>
                                            {/* <th>{staff.id}</th> */}
                                            <td>{staff.name}</td>
                                            <td>{capitalize(staff.role)}</td>
                                            <td>{staff.email}</td>
                                            <td>{staff.mobile}</td>
                                            <td>
                                                <button type="button" onClick={() => handleDelete(staff.id, staff.role)} className="btn btn-danger">Delete</button>
                                            </td>
                                        </tr>
                                    ))

                                    // <td>
                                    //     <p className="text-center my-4">No member of staff is registered on this platform.</p>
                                    // </td>
                                )
                                :
                                <tr>
                                    <th scope="row"><Skeleton /></th>
                                    <td><Skeleton /></td>
                                    <td><Skeleton /></td>
                                    <td><Skeleton /></td>
                                    <td><Skeleton /></td>
                                    <td>
                                        {/* <button type="button" className="btn btn-danger">Delete</button> */}
                                        <Skeleton />
                                    </td>
                                </tr>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default StaffList;