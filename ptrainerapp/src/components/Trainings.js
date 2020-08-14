import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Traininglist from './Traininglist';
import Button from '@material-ui/core/Button';
import {trainhref} from './Customerlist.js';


import { NavLink } from 'react-router-dom';
 
const Trainings = (props) => {
    
    const toCustomerlist = () => {
        document.getElementById('customer').click();
    }

    

    return (
       <div>
            <Button size='small' color='primary' onClick={() => toCustomerlist()}>
                back
            </Button>
           <NavLink id='customer' to="/"></NavLink>
            <Traininglist href={trainhref} />
            <Button size='small' color='primary' onClick={() => toCustomerlist()}>
                back
            </Button>
       </div>
    );
}
 
export default Trainings;