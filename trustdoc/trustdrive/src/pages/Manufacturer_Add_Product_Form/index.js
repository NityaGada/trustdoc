import "./index.scss";

import { NavBar } from "../../components";

import { useLocation } from "react-router-dom";

import { Link, useNavigate } from "react-router-dom";

import React, { useState, useRef } from "react";

export default function Manufacturer_Add_Product_Form(props) {
    const { state } = useLocation();
    const [doc_content, setdoc_content] = useState("");
    let navigate = useNavigate();
    let username = useRef();
    let date = useRef();
    let doc_id = useRef();
    let doc_name = useRef();
    // let doc_content = useRef();
    const handleFileUpload = (event) => {
        const file = event.target.files[0]; // Get the selected file
        const reader = new FileReader();

        reader.onload = function (e) {
            const fileContent = e.target.result;
            console.log(fileContent);
            setdoc_content(fileContent);
        };

        reader.readAsText(file);
    };

    const addProduct = async () => {
        const { contract } = props.info_state;
        const uname = username.current.value;
        const udate = date.current.value;
        const docid = doc_id.current.value;
        const docname = doc_name.current.value;
        const doccontent = doc_content; // Use the state variable directly
        console.log("Values to be passed to addProduct:");
        console.log("uname:", uname);
        console.log("udate:", udate);
        console.log("docid:", docid);
        console.log("docname:", docname);
        console.log("doccontent:", doccontent);
        try {
            const transaction = await contract.addProduct(uname, udate, docid, docname, doccontent);
            await transaction.wait();
            console.log("Transaction is complete");
            navigate("/add");
        } catch (error) {
            console.error("Error while adding product:", error);
        }
    }

    return <div>
        <NavBar />
        <div className="product_form">
            <div className="heading">
                Add Document
            </div>
            <div className="form_div">
                <input type="text" ref={ username } placeholder="User Name" />
                <input type="text" ref={ date } placeholder="Add Date"/>
            </div>
            <div className="form_div">
                <input type="text" ref={ doc_id } id="product_id" placeholder="Document ID"/>
                <input type="text" ref={ doc_name } placeholder="Document Name"/>
            </div>
            <div className="form_div">
                <input type="file" onChange={handleFileUpload} />
            </div>
            <div className="form_div form_button">
                <button onClick={addProduct}>Submit</button>
            </div>
        </div>
    </div>
}