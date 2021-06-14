import React from 'react';
import { useHistory } from 'react-router';

const Home = ({userState}) => {    
    const history = useHistory();
    console.log(userState);
    if(userState.type==='Failure'){
        history.push('/login');
    }
    else if(userState.type==='Success'){
        history.push('/dashboard');
    }
    else{
        return(
            <div>Loading...</div>
        );
    }

    return(
        <div></div>
    );
}

export default Home;