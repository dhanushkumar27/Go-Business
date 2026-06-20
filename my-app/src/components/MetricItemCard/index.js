

import './index.css'

const MetricItemCard = (props) =>{
    const {eachMetric} = props
    const {label, value, kind} = eachMetric
    return(
        <li className='metric-item'>
            <p>{kind}</p>
            <p>{value}</p>
            <p>{label}</p>
        </li>
    )

}

export default MetricItemCard