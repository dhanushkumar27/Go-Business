
import './index.css'

const ReferCard = (props) =>{
    const {referral} = props
    const {link,code} = referral
    return(
        <div className='refer-card'>
            <h1 className='refer-card-heading'>Refer friends and earn more</h1>
            <div className='refer-details-container'>
                <div className='refer-details'>
                    <p className='refer-link-code'>{link}</p>
                    <button type="button" className='copy-button'>Copy</button>
                </div>
                <div className='refer-details'>
                    <p className='refer-link-code'>{code}</p>
                    <button type="button" className='copy-button'>Copy</button>
                </div>
            </div>
        </div>
    )
}

export default ReferCard