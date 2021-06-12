import "./App.css";

import React , {useState , useEffect} from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';

const Dashboard = ({isUser}) => {    
    const history = useHistory();
    const [list , setList] = useState([]);

    // if(!isUser){
    //     history.push('/login');
    // }
    // else{
    //     history.push('/dashboard');
    // }

    useEffect(()=>{
        axios.get('http://localhost:8080/students')
        .then(res => {
            setList(res.data);
        });
    },[])

    console.log(list);

    return(
        <div className='dashboard-main'>
            <div className="heading-line"></div>
            <div className="second-line"></div>
            <div className="container">
                <div className="filters"></div>
                <div className="content">
                    {list.map(item => {
                        return (<p>{item.name}</p>);
                    })}
                </div>
            </div>
        </div>
    );
}

export default Dashboard; 