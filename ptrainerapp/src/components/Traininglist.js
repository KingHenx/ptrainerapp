import React, {useState, useEffect} from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import AddTraining from './AddTraining';
import Button from '@material-ui/core/Button';
import { NavLink } from 'react-router-dom';

export default function Traininglist(props){
    const[trainings, setTrainings] = useState([]);

    useEffect(() => fetchData(props.href), []);

    const fetchData = (href) => {
        fetch(href)
        .then(response => response.json())
        .then(data => setTrainings(data.content));
    }

    const saveTraining = (training) => {
        fetch('https://customerrest.herokuapp.com/api/trainings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(training)
        })
        .then(res => fetchData(props.href))
        .catch(err => console.error(err))
    }

    const deleteTraining = (link) => {
        if(window.confirm('Do you want to Delete training?')){
            fetch(link, {method: 'DELETE'})
            .then(res => fetchData(props.href))
            .catch(err => console.error(err))
        }

    }
    
    const columns = [
        {
            Header: 'Date',
            accessor: 'date'
        },
        {
            Header: 'Duration',
            accessor: 'duration'
        },
        {
            Header: 'Activity',
            accessor: 'activity'
        },
        {
            sortable: false,
            filterable: false,
            width: 100,
            accessor: 'links.0.href',  
            Cell: row => <Button size='small' color='secondary' onClick={() => deleteTraining(row.value)}>Delete</Button>
        }
        
    ]

    return(
        <div>
            <AddTraining saveTraining={saveTraining} href={props.href}/>
            <ReactTable data={trainings} columns={columns} />
        </div>
    );
}