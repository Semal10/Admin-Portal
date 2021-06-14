import React from 'react';
import { useHistory } from 'react-router';

const Home = ({isUser}) => {    
    const history = useHistory();

    if(!isUser){
        history.push('/login');
    }
    else{
        history.push('/dashboard');
    }

    return(
        <div></div>
    );
}

export default Home;