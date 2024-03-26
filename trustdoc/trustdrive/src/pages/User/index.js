import "./index.scss";

import { NavBar } from "../../components";

import React, { useRef } from "react";

import { useState } from 'react';

export default function User(props) {
    let document_id = useRef();
    const {contract} = props.info_state;
    const [genuinty, setgenuinty] = useState(null);
    const [d_prods, setd_prods] = useState([]);
    const [history, sethistory] = useState(false);

    const checkgenuine = async ()=>{
        const {contract} = props.info_state;
        const d_id = document_id.current.value;
        const genuinty = await contract.callStatic.checkgenuine(d_id);
        setgenuinty(genuinty);
    }

    const show_history = async ()=> {
        if (history == false) {
            const d_prods = await contract.getProductDetails();
            setd_prods(d_prods);
        }
        sethistory(!history);
    }

    return <div>
        <NavBar />
        <div className="product_form" >
            <div className="heading">
                Check Document
            </div>
            <div className="user_div"> 
                <input type="text" ref={ document_id } id="product_id" placeholder="Enter Document ID" /> 
            </div>
            <div className="user_div user_button">
                <button onClick={checkgenuine}> Submit </button>
            </div>
            {genuinty != null && (
                <>
                    <div className = "genuity">This product is {genuinty ? <span className='green'> genuine</span> : <span className='red'> not genuine</span>}</div>
                    <div  className="user_div user_button">
                        <button onClick={show_history}>Show History</button>
                        {history != false && (
                            <>
                                {d_prods.map((documents) => {
                                    if (documents.docid == document_id.current.value) {
                                        return (
                                            <div className="report">
                                                <div>User Name: {documents.uname}</div>
                                                <div>Date Added: {documents.udate}</div>
                                                <div>Document Name: {documents.docname}</div>
                                                <div>Document Content: {documents.doccontent}</div>
                                            </div>
                                        )
                                    }
                                })}
                            </>
                        )}
                    </div>
                </>
            )}
        </div>
    </div>
}