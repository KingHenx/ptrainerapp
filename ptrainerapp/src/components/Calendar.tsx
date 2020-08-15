import React from 'react';
//import './App.css';
import { Inject, ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, EventSettingsModel } from '@syncfusion/ej2-react-schedule';
import {DataManager, WebApiAdaptor} from '@syncfusion/ej2-data';


class Calendar extends React.Component {


    private localData: EventSettingsModel = {
        dataSource: [{
            Subject: 'Jogging',
            EndTime: new Date(2020, 7, 11, 7, 0),
            StartTime: new Date(2020, 7, 11, 6, 0)
        }]
    };
    private remoteData = new DataManager({
        url: 'http://js.syncfusion.com/demos/ejservices/api/Schedule/LoadData',
        adaptor: new WebApiAdaptor,
        crossDomain: true
        //{ dataSource: this.remoteData}
    })
    public render() {
        return <ScheduleComponent currentView='Month' eventSettings={this.localData}>
            <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
        </ScheduleComponent>
        
    }
}

export default Calendar;