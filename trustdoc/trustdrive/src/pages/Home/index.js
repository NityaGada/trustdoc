import "./index.scss";

import { HomeCard, NavBar } from "../../components";

import admin from "../../images/admin.svg";
import user from "../../images/user.svg";

export default function Home(props) {
    return <div className="home">
        <NavBar />
        <div className="hrow">
            <HomeCard name="Add" img= { admin } alt = "add" registration="/add" />
            <HomeCard name="View" img= { user } alt = "view" registration="/view" />
        </div>
    </div>
}