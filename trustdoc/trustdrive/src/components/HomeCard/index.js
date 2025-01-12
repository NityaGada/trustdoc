import "./index.scss";

import { Link } from "react-router-dom";

export default function HomeCard(props) {
    return <div className="homecard">
        <div>
            <img src = {props.img} alt = {props.name}/>
        </div> 
        <div className="div_column">
            {/* <div>{props.name}</div> */}
            <div className="div_row">
                <button><Link to={props.registration}> {props.name} </Link></button>
            </div>
        </div> 
    </div>
}