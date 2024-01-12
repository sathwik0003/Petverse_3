
import { Link } from 'react-router-dom';
import Header from '../componants/Header'
import { Image } from '@chakra-ui/react'
import {  Card, } from 'react-bootstrap';

import Footer from '../componants/mainpage/Footer';
import toy1main from '../assets/toy_mainpage.webp'
import toy2main from '../assets/tou_mainpage2.webp'
import toy3main from '../assets/toy_mainpage3.webp'
import toy4main from '../assets/toy_mainpage4.webp'
import maincat from '../assets/main_cats.webp'
import maindog from '../assets/main_dogs.webp'
import ComplaintsButton from './Comp1';
import PetcardParent from '../componants/mainpage/PetcardParent';
import origen from '../assets/origen.png'
import pedigree from '../assets/pedigree.jpg'
import sheba from '../assets/sheba.jpg'
import whiskas from '../assets/whiskas.jpg'
import happypuppy from '../assets/happypuppy.jpg'
import royalcanin from '../assets/royalcanin.png'
import catfood from '../assets/catfood.jpg'
import catbed from '../assets/catbed.webp'
import cattoy from '../assets/cattoy.webp'

import catcloth from '../assets/catclothing.jpeg.jpg'
import catgroom from '../assets/catgrooming.jpeg.jpg'
import dogfood from '../assets/dogfood.jpeg.jpg'
import dogbed from '../assets/dogbed.webp'
import dogtoy from '../assets/dogtoy.jpg'

import dogcloth from '../assets/dogclothing.webp'
import doggroom from '../assets/doggrooming.jpg'
import kittenplaying from '../assets/kittenplaying.mp4'
import kemr from '../assets/kittenessentialsmainred.webp'
import pemr from '../assets/puppyessentialsmainred.webp'

import './MainUser.css'
import PriceMain from '../componants/mainpage/PriceMain';
import { motion} from 'framer-motion';
import { useParams } from 'react-router-dom';
import Heade2r from '../componants/Heade2r'


const MainUser = () => {
  const { userid } = useParams();
  console.log(userid)
 

  
  return (
    <div>
        {userid !== undefined ? (
        <Header />
      ) : <Heade2r/>}

      <div>
        <div className="container">
          <div className="video-wrapper">

            <video
              src={kittenplaying}
              autoPlay
              loop
              playsInline
              muted
              className="video"
            />
            <div className="overlay">
              <div className="titled">BUY OUR EXCLUSIVE PET TOYS</div>
              <div className="buttons">
              {userid === "undefined" ? (
                <Link to={`/user/products/${userid}/CAT/Toy`}>
                <button className="button">Kitty Toys</button>
                </Link>
                
      ) : 
                <Link to={`/user/products/${userid}/CAT/Toy`}>
                <button className="button">Kitty Toys</button>
                </Link>}
              {userid !== "undefined" ? (
                <Link to={`/user/products/${userid}/DOG/Toy`}>
                <button className="button">Puppie Toys</button>
                </Link>
      ) :  <Link to={`/user/products/${userid}/DOG/Toy`}>
                <button className="button">Puppie Toys</button>
                </Link>}
             
               
                
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className='redmain'>
          {userid !== undefined ? (
            <Link className='custom-link' to={`/user/products/${userid}/DOG`}>
              <Image src={pemr} alt="" height='15vw' width='43vw' />
            </Link>
      ) :  <Link className='custom-link' to={`/user/products/${userid}/DOG`}>
              <Image src={pemr} alt="" height='15vw' width='43vw' />
            </Link>}
            {userid !== undefined ? (
              <Link className='custom-link' to={`/user/products/${userid}/CAT`}>
              <Image src={kemr} alt="" height='15vw' width='43vw' />
            </Link>
      ) :   <Link className='custom-link' to={`/user/products/${userid}/CAT`}>
              <Image src={kemr} alt="" height='15vw' width='43vw' />
            </Link>}
            
           
          </div>
          <motion.div initial={{}} animate={{}} transition={{}}>
            <Card.Title className='title' style={{fontSize:'3rem'}}>Purr-chase For Feline Friend</Card.Title>
            <div className='category1'>
              <div className='category2'>
              {userid !== undefined ? (
                <Link className='custom-link' to={`/user/products/${userid}/CAT/Bed`}>
                  <Image src={catbed} alt="" boxSize='145px' />
                  <div className='categorydiv'>CAT BEDS</div>
                </Link>):(
                  <Link className='custom-link' to={`/user/products/${userid}/CAT/Bed`}>
                  <Image src={catbed} alt="" boxSize='145px' />
                  <div className='categorydiv'>CAT BEDS</div>
                </Link>

                )}
                {userid !== undefined ? (
                <Link className='custom-link' to={`/user/products/${userid}/CAT/Food`}>
                  <Image src={catfood} alt="" boxSize='145px' />
                  <div className='categorydiv'>CAT FOOD</div>
                </Link>):(
                  <Link className='custom-link' to={`/user/products/${userid}/CAT/Food`}>
                  <Image src={catfood} alt="" boxSize='145px' />
                  <div className='categorydiv'>CAT FOOD</div>
                </Link>
                )}
                {userid !== undefined ? (
                <Link className='custom-link' to={`/user/products/${userid}/CAT/Toy`}>
                  <Image src={cattoy} alt="" boxSize='145px' />
                  <div className='categorydiv'>CAT TOYS</div>
                </Link>):(
                  <Link className='custom-link' to={`/user/products/${userid}/CAT/Toy`}>
                  <Image src={cattoy} alt="" boxSize='145px' />
                  <div className='categorydiv'>CAT TOYS</div>
                </Link>

                )}
                {userid !== undefined ?(
                <Link className='custom-link' to={`/user/products/${userid}/CAT/Grooming`}>
                  <Image src={catgroom} alt="" boxSize='145px' />
                  <div className='categorydiv'>CAT GROOMING</div>
                </Link>):(
                  <Link className='custom-link' to={`/user/products/${userid}/CAT/Grooming`}>
                  <Image src={catgroom} alt="" boxSize='145px' />
                  <div className='categorydiv'>CAT GROOMING</div>
                </Link>

                )}
                {userid !== undefined ?(
                <Link className='custom-link' to={`/user/products/${userid}/CAT/Clothing`}>
                  <Image src={catcloth} alt="" boxSize='145px' />
                  <div className='categorydiv'>CAT CLOTHING</div>
                </Link>):(
                  <Link className='custom-link' to={`/user/products/CAT/${userid}/Clothing`}>
                  <Image src={catcloth} alt="" boxSize='145px' />
                  <div className='categorydiv'>CAT CLOTHING</div>
                </Link>

                )}

              </div>
            </div>
          </motion.div>
          <Card.Title className='title' style={{fontSize:'3rem'}}>Engage your Pets with Toys</Card.Title>
          <div className='maincard1toys'>
            <Link className='custom-link' >
              <Image src={toy1main} alt="" boxSize='20vw' className='toyimage1' />
            </Link>
            <Link className='custom-link'>
              <Image src={toy2main} alt="" boxSize='20vw' className='toyimage1' />
            </Link>
            <Link className='custom-link'>
              <Image src={toy3main} alt="" boxSize='20vw' className='toyimage1' />
            </Link>
            <Link className='custom-link'>
              <Image src={toy4main} alt="" boxSize='20vw' className='toyimage1' />
            </Link>
          </div>
          <div>
            <Card.Title className='title' style={{fontSize:'3rem'}}>High-End Haven for Discerning Dogs</Card.Title>
            <div className='category1'>
              <div className='category2'>
              {userid !== undefined ? (
                <Link className='custom-link' to={`/user/products/${userid}/DOG/Bed`}>
                  <Image src={dogbed} alt="" boxSize='145px' />
                  <div className='categorydiv'>DOG BEDS</div>
                </Link>):(
                  <Link className='custom-link' to={`/user/products/${userid}/DOG/Bed`}>
                  <Image src={dogbed} alt="" boxSize='145px' />
                  <div className='categorydiv'>DOG BEDS</div>
                </Link>

                )}
                {userid !== undefined ? (
                <Link className='custom-link' to={`/user/products/${userid}/DOG/Food`}>
                  <Image src={dogfood} alt="" boxSize='145px' />
                  <div className='categorydiv'>DOG FOOD</div>
                </Link>):(
                  <Link className='custom-link' to={`/user/products/${userid}/DOG/Food`}>
                  <Image src={dogfood} alt="" boxSize='145px' />
                  <div className='categorydiv'>DOG FOOD</div>
                </Link>

                )}
                {userid !== undefined ? (
                <Link className='custom-link' to={`/user/products/${userid}/DOG/Toy`}>
                  <Image src={dogtoy} alt="" boxSize='145px' />
                  <div className='categorydiv'>DOG TOYS</div>
                </Link>):(
                  <Link className='custom-link' to={`/user/products/${userid}/DOG/Toy`}>
                  <Image src={dogtoy} alt="" boxSize='145px' />
                  <div className='categorydiv'>DOG TOYS</div>
                </Link>

                )}
                {userid !== undefined ? (
                <Link className='custom-link' to={`/user/products/${userid}/DOG/Grooming`}>
                  <Image src={doggroom} alt="" boxSize='145px' />
                  <div className='categorydiv'>DOG GROOMING</div>
                </Link>):(
                  <Link className='custom-link' to={`/user/products/${userid}/DOG/Grooming`}>
                  <Image src={doggroom} alt="" boxSize='145px' />
                  <div className='categorydiv'>DOG GROOMING</div>
                </Link>

                )}
                {userid !== undefined ? (
                <Link className='custom-link' to={`/user/products/${userid}/DOG/Clothing`}>
                  <Image src={dogcloth} alt="" boxSize='145px' />
                  <div className='categorydiv'>DOG CLOTHING</div>
                </Link>):(
                  <Link className='custom-link' to={`/user/products/${userid}/DOG/Clothing`}>
                  <Image src={dogcloth} alt="" boxSize='145px' />
                  <div className='categorydiv'>DOG CLOTHING</div>
                </Link>

                )}
              </div>
            </div>
          </div>


          <Card.Title className='title' style={{fontSize:'3rem'}}>Learn about Breeds</Card.Title>
          <div className='categoryimage'>
            <Link className='custom-link' to={`/dogbreeds/${userid}`}>
              <Image src={maincat} alt="" height='23vw' width='38vw' />
            </Link>
            <Link className='custom-link' to={`/dogbreeds/${userid}`}>
              <Image src={maindog} alt="" height='23vw' width='38vw' />
            </Link>
          </div>
          <PriceMain userid={userid}/>
          <div>
            <Card.Title className='title' style={{fontSize:'3rem'}}>Popular Brands</Card.Title>
            <div className='brandimage'>
              <Link className='custom-link' to={`/user/products/brandname/Royal Canine`}>
                <Image src={royalcanin} alt="" boxSize='10vw' />
              </Link>
              <Link className='custom-link' to={`/user/products/brandname/Sheba`}>
                <Image src={sheba} alt="" boxSize='10vw' />
              </Link>
              <Link className='custom-link' to={`/user/products/brandname/Pedigree`}>
                <Image src={pedigree} alt="" boxSize='10vw' />
              </Link>
              <Link className='custom-link' to={`/user/products/brandname/Origen`}>
                <Image src={origen} alt="" boxSize='10vw' />
              </Link>
              <Link className='custom-link' to={`/user/products/brandname/Happy Puppy`}>
                <Image src={happypuppy} alt="" boxSize='10vw' />
              </Link>
              <Link className='custom-link' to={`/user/products/brandname/Whiskas`}>
                <Image src={whiskas} alt="" boxSize='10vw' />
              </Link>
            </div>
          </div>
          <div>
            <Card.Title className='parenttitle' style={{fontSize:'3rem'}}>Know this petparents</Card.Title>
            <div>
              <PetcardParent userid={userid}></PetcardParent>
            </div>
          </div>
        </div>

       
        {userid !== undefined ? (
          <>
          <Footer />
          <ComplaintsButton/>
          </>
      ) : 
      <Footer />}
        
      </div>
    </div>
  )
}

export default MainUser