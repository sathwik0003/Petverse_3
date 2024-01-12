import React from 'react'
import german from '../assets/german.jpg'
import bulldog from '../assets/bulldog.jpg'
import pomarenian from '../assets/pomarenian.jpg'
import dobberman from '../assets/dobberman.jpg'
import samoyed from '../assets/samoyed.jpg'
import havanese from '../assets/havanese.jpg'
import GoldenRetriver from '../assets/GoldenRetriver.jpg'
import poodle from '../assets/poodle.jpg'
import './breeds.css'
import Header from '../componants/Header'
import Heade2r from '../componants/Heade2r'
import { Link, useParams } from 'react-router-dom';
import Footer from '../componants/mainpage/Footer'

const DogBreeds = () => {
    const { userid } = useParams();
    console.log(userid)
    return (
        <>
        {userid!=="undefined" ? (
            <Header />
          ) : <Heade2r/>}
        <div className="breeds">
            <div className="breeds-container">
                <div className="breeds-one">
                    <div className="breeds-card">
                        <div className="breeds-imgBx" id="#a1">
                            <img src={german} alt="" />
                        </div>
                        <div className="breeds-content">
                            <h2>German Shepherd</h2> 
                            <p> <b>Life expectancy </b> : 9 – 13 years </p>
                            <p><b>Colors</b>: Black, White, Black &amp; Tan, Black &amp;Black, Grey </p>
                            <p> <b>Origin</b> : Germany  </p>
                            <p> <b>Height</b>: Male: 60–65 cm  Female: 55–60 cm</p>
                            <p> <b>Weight</b> : Male: 30–40 kg  Female: 22–32 kg
                            </p>

                        </div>
                    </div>
                </div>
                <div className="breeds-two">
                    <div className="breeds-card" style={{height: '420px',
    width: '37vw'}}>
                        <div className="breeds-imgBx">
                            <img src={bulldog} alt="" />
                        </div>
                        <div className="breeds-content">
                            <h2>French Bulldog</h2>
                            <p> <b>Life expectancy </b> : 10 – 14 years </p>
                            <p><b>Colors</b>:White, Brindle, Fawn</p>
                            <p> <b>Origin</b> : France, England  </p>
                            <p> <b>Height</b>: Male: 28–30 cm  Female: 28–30 cm  </p>
                            <p> <b>Weight</b> : Male: 10-13 kg  Female: 9-13 kg&nbsp;</p>
                        </div>
                    </div>
                </div>
                <div className="breeds-three">
                    <div className="breeds-card">
                        <div className="breeds-imgBx">
                            <img src={pomarenian} alt="" />
                        </div>
                        <div className="breeds-content">
                            <h2>Pomarenian</h2> 
                            <p> <b>Life expectancy </b> : 12 – 16 years  </p>
                            <p><b>Colors</b>:White, Black, Blue, Red,Tan, Brown  
                            </p>
                            <p> <b>Origin</b> : India  </p>
                            <p> <b>Height</b>: Adult: 20 cm  </p>
                            <p> <b>Weight</b> : Adult: 1.9–3.5 kg&nbsp; </p>
                        </div>
                    </div>
                </div>
                <div className="breeds-two">
                    <div className="breeds-card" style={{height: '420px',
    width: '37vw'}}>
                        <div className="breeds-imgBx">
                            <img src={dobberman} alt="" />
                        </div>
                        <div className="breeds-content">
                            <h2>Dobbermann</h2> 

                            <p> <b>Life expectancy </b> : 10-13 years  </p>
                            <p><b>Colors</b>: Black, White, Fawn, Black &amp; Rust, Blue &amp; Rust, Red </p>
                            <p> <b>Origin</b> :India  </p>
                            <p> <b>Height</b>:Male: 66-72 cm  Female: 61-68 cm </p>
                            <p> <b>Weight</b> :Male: 40-45 kg  Female: 32-35 kg </p>
                        </div>
                    </div>
                </div>
                <div className="breeds-five">
                    <div className="breeds-card">
                        <div className="breeds-imgBx">
                            <img src={havanese} alt="" />
                        </div>
                        <div className="breeds-content">
                            <h2>Havanese</h2> 
                            <p> <b>Life expectancy </b> : 14-16 years </p>
                            <p><b>Colors</b>:White, Black, Havana Brown, Mahogany, Fawn, Tobacco</p>
                            <p> <b>Origin</b> : cuba  </p>
                            <p> <b>Height</b>: Adult: 23-27 cm  </p>
                            <p> <b>Weight</b> : Adult: 4.5-7.3 kg </p>
                        </div>
                    </div>
                </div>
                <div className="breeds-two">
                    <div className="breeds-card" style={{height: '420px',
    width: '37vw'}}>
                        <div className="breeds-imgBx">
                            <img src={GoldenRetriver} alt="" />
                        </div>
                        <div className="breeds-content">
                            <h2>Goldern Retriever</h2> 
                            <p> <b>Life expectancy </b> : 10-12 years  </p>
                            <p><b>Colors</b>:Dark Golden, Light Golden, Cream, Golden </p>
                            <p> <b>Origin</b> : United Kingdom  </p>
                            <p> <b>Height</b>:Male:56–61 cm  Female: 51–56 cm </p>
                            <p> <b>Weight</b> :Male: 30–34 kg&nbsp; Female: 25–32 kg </p>
                        </div>
                    </div>
                </div>
                <div className="breeds-eleven">
                    <div className="breeds-card">
                        <div className="breeds-imgBx">
                            <img src={samoyed} alt="" />
                        </div>
                        <div className="breeds-content">
                            <h2>Samoyed</h2> 
                            <p> <b>Life expectancy </b> : 12 – 14 years  </p>
                            <p><b>Colors</b>:White, White &amp; Biscuit</p>
                            <p> <b>Origin</b> : Russia, Siberia  </p>
                            <p> <b>Height</b>:Male:53–60 cm  Female:48–53 cm </p>
                            <p> <b>Weight</b> :Male: 20–30kg&nbsp; Female:16–20 kg </p>
                        </div>
                    </div>
                </div>
                <div className="breeds-two">
                    <div className="breeds-card" style={{height: '420px',
    width: '37vw'}}>
                        <div className="breeds-imgBx">
                            <img src={poodle} alt="" />
                        </div>
                        <div className="breeds-content">
                            <h2>Poodle</h2> 
                            <p> <b>Life expectancy </b> : 12 – 15 years  </p>
                            <p><b>Colors</b>: Black, White, Apricot, Cream, Black </p>
                            <p> <b>Origin</b> : Germany, France  </p>
                            <p> <b>Height</b>:Adult:41-61cm  </p>
                            <p> <b>Weight</b> :Adult: 20-31 kg </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
        </>
    )
}

export default DogBreeds