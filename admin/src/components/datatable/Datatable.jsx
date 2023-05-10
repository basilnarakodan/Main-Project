import { Button, Toolbar } from "@mui/material";
import "./datatable.scss"
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useState } from "react";
// import { userRows, userColumns } from "../../datatablesource";
import { Link, useNavigate } from "react-router-dom";
import { deleteJobById, deleteAnnouncementById, deleteUserById } from "../../services/adminService";

const Datatable = ({ col, row, noaction, name }) => {
    const navigate = useNavigate();
    let path;
    var del;
    if(row==undefined){
        row="";
        console.log(row);
    }
    switch (name) {
        case "jobList":
            path = "/job/test";
            del = function deleteJobById2(id) {
                deleteJobById(id)
                window.location.reload();
            }
            break;
        case "announcementList":
            path = "/announcement/test";
            del = function deleteAnnouncementById2(id) {
                deleteAnnouncementById(id)
                window.location.reload();
            }
            break;
        case "userList":
            path = "/users/test";
            del = function deleteUserById2(id) {
                deleteUserById(id)
                window.location.reload();
            }
            break;
        default:
            break;
    }

    const actionColumn = [{
        field: 'action', headerName: 'Action', width: "150", renderCell: (params) => {
            return (
                <div className="cellAction">

                    <a onClick={() => { navigate(path, { state: { job: params.row } }) }}>
                        <div className="viewButton">View</div>
                    </a>
                    <a onClick={() => { del(params.row.id) }}>
                        <div className="deleteButton">Delete</div>
                    </a>
                </div>
            )
        }
    },]

    return (
        <div className="datatable">
            <DataGrid
                rows={row}
                columns={noaction ? col : col.concat(actionColumn)}
                // pageSize={5}
                // rowsPerPageOptions={[5]}
                checkboxSelection
                getRowId={(row) => row.id}
                components={{ Toolbar: GridToolbar }}
            />
        </div>
    )
}

export default Datatable