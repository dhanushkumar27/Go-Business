import {useState,useEffect} from 'react'
import {useParams} from 'react-router-dom'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'

import DashboardHeader from '../../components/DashboardHeader'

import './index.css'

  const apiStatus = {
        initial:'INITIAL',
        success:'SUCCESS',
        failure:'FAILURE',
        inProgress:'IN_PROGRESS'
    }

const Referral = () =>{
    const [currentState, setCurrentState] = useState(apiStatus.initial)
    const [referralData,setReferralData] = useState({})
    const {id} = useParams()

    useEffect(() => {
        getReferralsData()
    }, [])

    const getReferralsData = async () => {
        setCurrentState(apiStatus.inProgress)
        const url = `https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com/api/referrals?id=${id}`
        const token = Cookies.get('jwt_token')
        const options = {
            headers:{
                Authorization:`Bearer ${token}`
            }
        }
        const response = await fetch(url,options)
        const result = await response.json()
        if(result.success){
            const {data} = result
            const {referrals} = data
            console.log(referrals)
            setReferralData(referrals[0])
            setCurrentState(apiStatus.success)
        }else{
            setCurrentState(apiStatus.failure)
        }
    }



    const successView = () => {
        const {name,id,serviceName,profit,date} = referralData
        return(
            <div>
                <Link to="/">
                    <p>back to dashboard</p>
                </Link>
                <h1>Referral Details</h1>
                <p>Full Information for this refferal partner.</p>
                <ul className='referral-details-container'>
                    <li className='referral-details-item'>REFERRAL ID: <span className='referral-details-span'>{id}</span></li>
                    <li className='referral-details-item'>NAME: <span className='referral-details-span'>{name}</span> </li>
                    <li className='referral-details-item'>SERVICE NAME: <span className='referral-details-span'>{serviceName}</span></li>
                    <li className='referral-details-item'>DATE: <span className='referral-details-span'>{date}</span></li>
                    <li className='referral-details-item'>PROFIT: <span className='referral-details-span'>{profit}</span></li>
                </ul>
            </div>
        )
    }

    const failureView = () => <h1>Failure</h1>

    const inProgressView = () => <h1>In Progress</h1>


    const renderReferralDetails = () =>{
    switch(currentState){
        case apiStatus.success:
        return successView()
        
        case apiStatus.failure:
        return failureView()
        
        case apiStatus.inProgress:
        return inProgressView()

        default:
            return null
    }

}




    return (
        <div className='referral-page'> 
        <DashboardHeader/>
        {renderReferralDetails()}
        </div>
    )
}


export default Referral