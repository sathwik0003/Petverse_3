import React from 'react'
import Serbian from '../assets/german.jpg'
import shoecat from '../assets/bulldog.jpg'
import BombayCat from '../assets/pomarenian.jpg'
import Turkishangora from '../assets/dobberman.jpg'
import toyger from '../assets/samoyed.jpg'
import shorthair from '../assets/havanese.jpg'
import JapaneseBobtail from '../assets/GoldenRetriver.jpg'
import chausie from '../assetspoodle.jpg'
import './breeds.css'


const breeds2 = () => {
    return (
        <div classNameName="breeds2">
            <div className="breeds2.container">
                <div className="breeds2.one">
                    <div className="breeds2.card">
                        <div className="breeds2.imgBx" id="#a1">
                            <img src={Serbian} alt="" />
                        </div>
                        <div className="breeds2.content">
                            <h2>Serbian Cat</h2> 
                            <p> <b>Life expectancy </b> : 12-15 years </p>
                            <p><b>Colors</b>:  red, blue, silver, white, black </p>
                            <p> <b>Origin</b> : Russia   </p>
                            <p> <b>Height</b>:Adult:30cm tall</p>
                            <p> <b>Weight</b> : Adult:4.5-6.8 kgs
                            </p>

                        </div>
                    </div>
                </div>
                <div className="breeds2.two">
                    <div className="breeds2.card" style={{height:'722px',width:'25vw'}}>
                        <div className="breeds2.imgBx">
                            <img src={shoecat} alt="" />
                        </div>
                        <div className="breeds2.content">
                            <h2>Snow shoecat</h2>
                            <p> <b>Life expectancy </b> :14-20 years </p>
                            <p><b>Colors</b>:blue, seal, lilac and chocolate</p>
                            <p> <b>Origin</b> :United States,Philadelphia  </p>
                            <p> <b>Height</b>: Adult:25 cm  </p>
                            <p> <b>Weight</b> : Adult:3-6 kgs </p>
                        </div>
                    </div>
                </div>
                <div className="breeds2.three">
                    <div className="breeds2.card">
                        <div className="breeds2.imgBx">
                            <img src={BombayCat} alt="" />
                        </div>
                        <div className="breeds2.content">
                            <h2>Bombay Cat</h2> 
                            <p> <b>Life expectancy </b> :15-20 years    </p>
                            <p><b>Colors</b>:Black 
                            </p>
                            <p> <b>Origin</b> : United States,Thailand   </p>
                            <p> <b>Height</b>: Adult:28-36cm  </p>
                            <p> <b>Weight</b> : Adult:4-7 kgs </p>
                        </div>
                    </div>
                </div>
                <div className="breeds2.two">
                    <div className="breeds2.card" style={{height:'722px',width:'25vw'}}>
                        <div className="breeds2.imgBx">
                            <img src={Turkishangora} alt="" />
                        </div>
                        <div className="breeds2.content">
                            <h2>Turkish angora</h2> 

                            <p> <b>Life expectancy </b> : 9-14 years </p>
                            <p><b>Colors</b>: White, black, blue, red; multi-colored </p>
                            <p> <b>Origin</b> :Turkey  </p>
                            <p> <b>Height</b>:Adult:20-25cm</p>
                            <p> <b>Weight</b> :Adult:2.3-4.5 kgs </p>
                        </div>
                    </div>
                </div>
                <div className="breeds2.five">
                    <div className="breeds2.card">
                        <div className="breeds2.imgBx">
                            <img src={toyger} alt="" />
                        </div>
                        <div className="breeds2.content">
                            <h2>Toyger</h2> 
                            <p> <b>Life expectancy </b> :9-13 years </p>
                            <p><b>Colors</b>:chocolate, brown,sable </p>
                            <p> <b>Origin</b> :United States </p>
                            <p> <b>Height</b>: Adult:23-33cm  </p>
                            <p> <b>Weight</b> : Adult:4-7 kgs </p>
                        </div>
                    </div>
                </div>
                <div className="breeds2.two">
                    <div className="breeds2.card" style={{height:'722px',width:'25vw'}}>
                        <div className="breeds2.imgBx">
                            <img src={shorthair} alt="" />
                        </div>
                        <div className="breeds2.content">
                            <h2>Amercian Shorthair</h2> 
                            <p> <b>Life expectancy </b> : 15-20 years  </p>
                            <p><b>Colors</b>:white, black  ebony, red  orange, blue </p>
                            <p> <b>Origin</b> : Europe,North AMerica   </p>
                            <p> <b>Height</b>:Adult:20-25cm  </p>
                            <p> <b>Weight</b> :Adult:5-7 kgs </p>
                        </div>
                    </div>
                </div>
                <div className="breeds2.eleven">
                    <div className="breeds2.card">
                        <div className="breeds2.imgBx">
                            <img src={JapaneseBobtail} alt="" />
                        </div>
                        <div className="breeds2.content">
                            <h2>Japanese Bobtail</h2> 
                            <p> <b>Life expectancy </b> : 9-15 years  </p>
                            <p><b>Colors</b>:white,black,ebony, red , orange,</p>
                            <p> <b>Origin</b> : Japan,South East Asia </p>
                            <p> <b>Height</b>:Adult:20-23 cm </p>
                            <p> <b>Weight</b> :Adult:2.7-5.4 kgs</p>
                        </div>
                    </div>
                </div>
                <div className="breeds2.two">
                    <div className="breeds2.card" style={{height:'722px',width:'25vw'}}>
                        <div className="breeds2.imgBx">
                            <img src={chausie} alt="" />
                        </div>
                        <div className="breeds2.content">
                            <h2> Chausie</h2> 
                            <p> <b>Life expectancy </b> : 12 – 14 years  </p>
                            <p><b>Colors</b>: black, black grizzled tabby, and black </p>
                            <p> <b>Origin</b> :  Egypt </p>
                            <p> <b>Height</b>:Adult:35-45 cm</p>
                            <p> <b>Weight</b> :Adult:6-9 kgs </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default breeds2