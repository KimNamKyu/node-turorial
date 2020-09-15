import React, {useEffect} from 'react'
import axios from 'axios';
function LandingPage() {

    useEffect(() => {
        axios.get('/api/hello') //cors(보안문제) => proxy로 해결 
        .then(resoponse => console.log(resoponse.data))
    }, [])

    return (
        <div>
            LandingPage
        </div>
    )
}

export default LandingPage