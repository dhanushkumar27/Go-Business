import {Link} from 'react-router-dom'

import './index.css'

const AllReferrals = (props) =>{
    const {eachReferral} = props 
    const {id,name, serviceName, date, profit} = eachReferral

    return(
    <Link className="referral-link-item" to={`referral/${id}`}>
        <li className="referal-item">
            <p className="referal-item-text">{name}</p>
            <p className="referal-item-text">{serviceName}</p>
            <p className="referal-item-text">{date}</p>
            <p className="referal-item-text">{profit}</p>
        </li>
    </Link>
        
    )
}

export default AllReferrals