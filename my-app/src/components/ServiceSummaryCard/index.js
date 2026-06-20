
import './index.css'

/* 
activeReferrals
: 
"0 + 0"
service
: 
"some service"
totalRefEarnings
: 
"$0.00"
yourReferrals
: 
"0 + 0"
*/
const ServiceSummaryCard = (props) =>{
    const {serviceSummary} = props 
    
    return(
        <div className='service-summery-card'>
            <h1 className='service-summery-heading'>Service Summary</h1>
            <ul className="service-summery-unorder-list-container">
                <li className='service-summery-list-item'>
                    <h1 className='service-summery-heading'>Service</h1>
                    <p className='service-summery-para'>{serviceSummary.service}</p>
                </li>
                <li className='service-summery-list-item'>
                    <h1 className='service-summery-heading'>your Referrals</h1>
                    <p className='service-summery-para'>{serviceSummary.yourReferrals}</p>
                </li>
                <li className='service-summery-list-item'>
                    <h1 className='service-summery-heading'>activeReferrals</h1>
                    <p className='service-summery-para'>{serviceSummary.activeReferrals}</p>
                </li>
                <li className='service-summery-list-item'>
                    <h1 className='service-summery-heading'>totalRefEarnings</h1>
                    <p className='service-summery-para'>{serviceSummary.totalRefEarnings}</p>
                </li>
            </ul>
        </div>
        
    )
}

export default ServiceSummaryCard