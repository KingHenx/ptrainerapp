import React, {useState, useEffect} from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Button from '@material-ui/core/Button';
import { NavLink } from 'react-router-dom';


var trainhref = "https://customerrest.herokuapp.com/api/trainings";
export { trainhref }

export default function Customerlist(props){
    const[customers, setCustomers] = useState([]);
    const[trainings, setTrainings] = useState([]);

    useEffect(() => fetchData(), []);

    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content));
    }

    const toTrainings = (href) => {

        trainhref = href;

        document.getElementById('train').click();
    }


    const columns = [
        {
            
            Header: 'First Name',
            accessor: 'firstname'
        },
        {
            
            Header: 'Last Name',
            accessor: 'lastname'
        },
        {
            
            Header: 'Street Address',
            accessor: 'streetaddress'
        },
        {
            
            Header: 'Postcode',
            accessor: 'postcode'
        },
        {
            
            Header: 'City',
            accessor: 'city'
        },
        {
            
            Header: 'Email',
            accessor: 'email'
        },
        {
            
            Header: 'Phone',
            accessor: 'phone'
        },
        {
            
            sortable: false,
            filterable: false,
            accessor: 'links.2.href',
            Cell: row => <div>
             <Button size='small' color='primary' onClick={() => toTrainings(row.value)}>
                Trainings
            </Button>
            <NavLink id='train' to={"/trainings"} trainings={trainings}></NavLink></div>
        }
    ]

    return(
        <div>
            
            <ReactTable data={customers} columns={columns} />
            
        </div>
    );
}