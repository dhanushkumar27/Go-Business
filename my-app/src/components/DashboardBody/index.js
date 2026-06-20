import {useState,useEffect} from 'react'
import Cookies from 'js-cookie'

import MetricItemCard from '../MetricItemCard'
import ServiceSummaryCard from '../ServiceSummaryCard'
import ReferCard from '../ReferCard'
import AllReferrals from '../AllReferrals'

import './index.css'

  const apiStatus = {
        initial:'INITIAL',
        success:'SUCCESS',
        failure:'FAILURE',
        inProgress:'IN_PROGRESS'
    }

const DashboardBody = () =>{
    const [currentStatus,setCurrentStatus] = useState(apiStatus.initial)
    const [overviewDetails,setOverviewDetails] = useState({})
    const [referralsDetails,setReferralsDetails] = useState([])
    const [sortOrder,setSortOrder] = useState('desc')
    const [searchText, setSearchText] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
        
    useEffect(() => {
            const getDashboardSummary = async () => {
    try {
        setCurrentStatus(apiStatus.inProgress)

        const url =
            'https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com/api/referrals'

        const token = Cookies.get('jwt_token')

        const options = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }

        const response = await fetch(url, options)
        const result = await response.json()

        if (result.success) {
            const {data} = result
            const {metrics, referral, serviceSummary} = data
            
            setOverviewDetails({
                metrics,
                referral,
                serviceSummary,
            })

            setCurrentStatus(apiStatus.success)
        } else {
            setCurrentStatus(apiStatus.failure)
        }
    } catch (error) {
        setCurrentStatus(apiStatus.failure)
    }
}
        getDashboardSummary()
    }, [])

    useEffect(() => {
    setCurrentPage(1)
     const getAllReferralsData = async () => {
    try {
        const url = `https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com/api/referrals?search=${searchText}&sort=${sortOrder}`

        const token = Cookies.get('jwt_token')

        const options = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }

        const response = await fetch(url, options)
        const result = await response.json()
        if (result.success) {
            const {data} = result
            const {referrals} = data
            setReferralsDetails(referrals)
            setCurrentStatus(apiStatus.success)
        } else {
            setCurrentStatus(apiStatus.failure)
        }
    } catch (error) {
        setCurrentStatus(apiStatus.failure)
    }
}

    getAllReferralsData()

}, [sortOrder, searchText])

   


    const lastIndex = currentPage * 10
    const firstIndex = lastIndex - 10

    const slicedReferralsData = referralsDetails.slice(firstIndex,lastIndex)

    console.log(slicedReferralsData)
        const totalPages = Math.ceil(referralsDetails.length/10)
    

    const previousButton = () => {
        if(currentPage >= 2){
            setCurrentPage(prev => prev - 1)
        }
        
    } 
    const nextButton = () => {
        if(currentPage < totalPages){
            setCurrentPage(prev => prev + 1)
        }
    }


    const pageNumbers = Array.from({length:totalPages}, (_,index) => index +1)
    
   

    const successView = () => {
    const {metrics = [],referral = {},serviceSummary = {}} = overviewDetails
    
  
        return(
        <div>
            <div className='overview-card'>
                <h1 className='overview-heading'>Overview</h1>
                <ul className='metrics-unorder-list-container'>
                    {
                        metrics.map(eachItem => 
                        <MetricItemCard key={eachItem.id} eachMetric = {eachItem}/>
                    )
                    }
                </ul>
            </div>

                <ServiceSummaryCard serviceSummary = {serviceSummary}/>

                <ReferCard referral={referral}/>

                <div className='allReferrals-container'>
                    <div className='allReferrals-header-container'>
                        <h1 className='allReferrals-heading'>All Referrals</h1>
                        <div className='search-and-sort-container'>
                            <div>
                                <label className='search-label' htmlFor="search">Search</label>
                                <input className='search-input' placeholder='Name or Service...' id="search" type="search" value={searchText} onChange={(event)=>setSearchText(event.target.value)}/>
                            </div>
                            <div>
                                <label className='sort-label' htmlFor="sortBy">Sort By</label>
                                <select className='sort-select' id="sortBy" value={sortOrder} onChange={(event)=>setSortOrder(event.target.value)}>
                                    <option className='sort-option' value="desc">Newest First</option>
                                    <option value="asc">Oldest First</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <ul className='referrals-unorder-list-container'>
                        <li className='referrals-header-listItem'>
                            <p className='referrals-header-listItem-text'>NAME</p>
                            <p className='referrals-header-listItem-text'>SERVICE</p>
                            <p className='referrals-header-listItem-text'>DATE</p>
                            <p className='referrals-header-listItem-text'>PROFIT</p>
                        </li>
                        {
                            slicedReferralsData.map(eachReferral => <AllReferrals key={eachReferral.id} eachReferral={eachReferral}/>)
                        }
                    </ul>
                    <div className='allReferrals-footer-container'>
                                    <p>
                Showing {firstIndex + 1} -{' '}
                {lastIndex > referralsDetails.length
                    ? referralsDetails.length
                    : lastIndex}{' '}
                of {referralsDetails.length} entries
            </p>
                        
                        <div className='pageNumbers-container'>
                            <button className='previous-button' type="button" onClick={previousButton}>Previous</button>
                            <div>
                            {
                                pageNumbers.map(page =>(
                                    <button type="button" className='pageNumber-button' key={page} onClick={()=>setCurrentPage(page)}>{page}</button>
                                ))
                            }
                            </div>
                            <button className='next-button' type="button" onClick={nextButton}>Next</button>
                        </div>
                
                    </div>
                </div>
        </div>
        )
    }

    const failureView = () => <h1>Failure</h1>

    const inProgressView = () => <h1>In Progress</h1>

    const renderDashboard = () =>{
    switch(currentStatus){
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
        <div className='dashboard-body-container'>
            <h1 className='dashboard-heading'>Referrals Dashboard</h1>
            <p className='dashboard-para'>Track your Referrals, earnings,partner activity in one place.</p>
            {renderDashboard()}
            
        </div>
    )
}


export default DashboardBody