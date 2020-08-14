import React, {useState, useEffect} from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';



export default function Traininglist(props){
    const[trainings, setTrainings] = useState([]);

    useEffect(() => fetchData(props.href), []);

    const fetchData = (href) => {
        fetch(href)
        .then(response => response.json())
        .then(data => setTrainings(data.content));
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
        
    ]

    return(
        <div>
            <ReactTable data={trainings} columns={columns} />
        </div>
    );
}