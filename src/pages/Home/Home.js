import "./home.css"
import Header from "../../components/Header/Header"
import React, { useEffect, useState } from "react"
import { SliderData } from "../../components/Header/SliderData"

function Home() {


    return (
        <div className="home">
        <Header slides={SliderData} />
        </div>
    )
}

export default Home