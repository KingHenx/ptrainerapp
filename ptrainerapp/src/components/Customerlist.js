import React, {useState, useEffect} from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Button from '@material-ui/core/Button';
import { NavLink } from 'react-router-dom';
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';

var trainhref = "https://customerrest.herokuapp.com/api/trainings";
export { trainhref }

export default function Customerlist(props){
    const[customers, setCustomers] = useState([]);
    const[trainings, setTrainings] = useState([]);
    const[allTrainings, setAllTrainings] = useState();

    useEffect(() => fetchData(), []);
    
    useEffect(() => fetchAllTrainings(), []);

    console.log("here should be " + JSON.stringify(allTrainings));

    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content));
    }

    const fetchAllTrainings = () => {
        
        fetch('https://customerrest.herokuapp.com/gettrainings', {method: 'GET'})
        .then(res => setAllTrainings(res))
        .catch(err => console.error(err))
        
    }

    const toTrainings = (href) => {

        trainhref = href;

        document.getElementById('train').click();
    }

    const saveCustomer = (customer) => {
        fetch('https://customerrest.herokuapp.com/api/customers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
        })
        .then(res => fetchData())
        .catch(err => console.error(err))
    }

    const updateCustomer = (customer, link) => {
        fetch(link, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
        })
        .then(res => fetchData())
        .catch(err => console.error(err))
    }

    const deleteCustomer = (link) => {
        if(window.confirm('Do you want to Delete customer?')){
            fetch(link, {method: 'DELETE'})
            .then(res => fetchData())
            .catch(err => console.error(err))
        }
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
            widht: 100,
            sortable: false,
            filterable: false,
            accessor: 'links.2.href',
            Cell: row => <div>
             <Button size='small' color='primary' onClick={() => toTrainings(row.value)}>
                Trainings
            </Button>
            <NavLink id='train' to={"/trainings"} trainings={trainings}></NavLink></div>
        },
        {
            sortable: false,
            filterable: false,
            width: 100,
            Cell: row => <EditCustomer updateCustomer={updateCustomer} customer={row.original}/>
        },
        {
            sortable: false,
            filterable: false,
            width: 100,
            accessor: 'links.1.href',  
            Cell: row => <Button size='small' color='secondary' onClick={() => deleteCustomer(row.value)}>Delete</Button>
        }
    ]

    return(
        <div>
            <NavLink to={"/calendar"}>Calendar</NavLink>
            <AddCustomer saveCustomer={saveCustomer} />
            <ReactTable data={customers} columns={columns} />
            
        </div>
    );
}