import React from 'react';
import { useParams } from 'react-router-dom';
import { Image } from '@chakra-ui/react';
import Header from '../componants/Header';
import Footer from '../componants/mainpage/Footer';
import petparentmain1 from '../assets/petparentmain2.jpeg.jpg';
import petparentmain2 from '../assets/petparentmain1.jpeg.jpg';
import petparentmain3 from '../assets/petparentmain3.jpeg.jpg';
import './Petparentmain.css';

import Heade2r from '../componants/Heade2r'

const Petparentmain = () => {
    const { id } = useParams();
    const {userid}=useParams()

    // Assuming your petparentarray is defined here
    const petparentarray = [
        {
            image: petparentmain1,
            id:'f1',
            title: "Winter Pet Safety: Keeping Warm & Healthy",
            firstcontent: "Winter is magical. The snow falling from the sky and forming a soft blanket on the ground is beautiful. Even our pets love to play in the snow when that time of year comes around. Even though winter is wonderful, there are still some dangers that pet parents need to be aware of so that they can keep their pets safe. After all, your pet’s safety is the number one priority! ",
            subtitle1: "Why Can Winter be Dangerous for Pets? ",
            subcontent1: (
                <div>
                    With extremely cold temperatures comes a lot of trouble for everyone! We have the ability to bundle up in tons of layers and protect ourselves from those cold temperatures, but our pets do not. Here are some of the challenges our pets face during cold weather: <br />



                    <b>Dry Skin </b> - The outside air becomes extremely dry when the temperature drops and can dry out their skin, just like ours. We put lotion on our skin, but that isn’t exactly easy to do when you have a ton of fur. <br />


                    <b>Cold Ground</b> - With the air temperature going down, the ground temperature does too. Pets can get frostbite on their paw pads or extremely dry skin that can chip and crack, causing them pain. <br />


                    <b>Body Temperature</b> - Hypothermia is a risk of our pets spending too much time in the cold. Even though they have fur, it does not protect them from extreme temperatures. This can happen really fast if their fur gets wet from the snow.<br />


                    <b>Salted Pavement</b> - Road salt can be corrosive and damaging to car parts and pavement, so it can definitely damage your pet’s paws. Wipe their paws off after going outside to make sure it doesn’t stay there too long.<br />


                    <b>Cars </b>- Car engines stay warm for quite some time after they are turned off. Cats love to crawl up into accessible parts of cars to take a nap where it is cozy. This is obviously very dangerous should someone start their car again and try to drive off. Not only this, but leaving your dog in the car during extremely cold temperatures can be just as dangerous.
                </div>
            ),
            subtitle2: "How to Improve Winter Pet Safety: ",
            subcontent2: (
                <div>
                    There are plenty of ways to improve winter pet safety while still letting them enjoy the snow and cold temperature.<br />
                    <b>Protect Their Paws</b> - There are a lot of ways that a pet’s paw pads can be damaged during the winter. Cold grounds, salted pavement and dry skin can also lead to painful damage for them. There are several ways to protect their paws from things like this. Pet parents should try using paw pad balm before sending their pet outside or taking them on walks. This or they can try using little pet booties to keep their skin from touching anything. Remember, wipe their paws after coming in from outside.<br />
                    <b>Brush Their Fur</b> - Dry skin isn't fun, so in order to help your pet combat it, brush their fur regularly. This will remove excess dander and fur that might be building up and making the problem worse.<br />
                    <b>Keep Them Dry</b> - Having wet fur is a really fast and sure way to dry out their skin and decrease the temperature of their body. After a jaunt in the snow or splashing in puddles, be sure to dry your pet with towels or a hair dryer. Although your pet shakes off excess water from their coat, they can still be damp. To prevent dry skin, bathe your pet less frequently. If they need a bath, use pet shampoos that are hydrating to the skin. To keep their body temperature up, don’t send them outside with wet fur or let them play too long in the snow before bringing them inside.<br />
                    <b>Always Check Your Car</b> - If you know that there are cats that like to hang around your house or that your cat adventures outside from time to time, always check your car before driving it. Cats like to hide under the hood and up above tires.<br />
                    <b>Indoor Exercise </b>- If the temperature is too cold, but you’re worried about your dog’s exercise levels, find ways to get them moving indoors. Dog toys like ropes and balls can still help get their heart rate up without exposing them to the elements.<br />
                    <b>Heated Pet Beds</b>  - If your pet has to spend any amount of time outside, make sure they have a cozy pet bed to come home to. Heated dog pets and heated cat beds can be a great way to sooth your pet’s cold joints while bringing their body temperature back up.<br />
                    <b>Winter Shelter For Dogs</b> - If your dog or cat is going to be outside for a few minutes, make sure they have a place to take shelter if they want to. Winter dog supplies, like winter dog shelters, can be a great place for them to escape the wind until it's time for them to come back inside.<br />
                    <b>Check Their Water</b> -  check outdoor water bowls to make sure they don’t freeze. Change the water regularly or make sure they have access to their water inside
                </div>
            ),
            subtitle3: "When to Bring Your Dog (or Cat) Inside",
            subcontent3: (
                <div>
                    For dogs, this can actually vary between breeds. There are dogs, like huskies and malamutes, that are built to handle colder temperatures. Smaller dogs like chihuahuas might not be able to stand the cold hardly at all.<br />
                    The colder it is outside, the shorter their playtime should be. Never leave your dog out in the cold in weather that you would not be comfortable in, yourself. Running around for a few minutes is totally ok, but once playtime is over, bring them back inside to get warm.<br />
                    For indoor/outdoor cats, it is best to transition to a fully indoor living situation until the weather warms back up. This will improve winter pet safety and keep them protected from the elements, cars or any other winter pet danger.<br />
                    Information in this article is not intended to diagnose, treat or cure your pet and is not a substitute for veterinary care provided by a licensed veterinarian. For any medical or health-related advice concerning the care and treatment of your pet, contact your veterinarian.
                </div>
            ),
        },
        {
            image: petparentmain2,
            id: 'f2',
            title: "Prep Your Dog for Parties",
            firstcontent: "Celebrations any time of year can be fun, safe and stress-free when you include your dog. Just teach your dog a few basic commands and follow these helpful tips.",
            subtitle1: "Preparing pets for a party",
            subcontent1: (
                <div>
                    If you're throwing a holiday bash this year, help keep your dog safe and happy by remembering to:<br />

                    *Keep your dog on a leash or in a crate while everyone arrives so they don't accidentally get out the door<br />
                    *Establish a don't feed the dog rule with your guests<br />
                    *Find a private room or crate to keep your pet in while you are entertaining if they get nervous around crowds and noise<br />
                    *Practice some pre-training if your pet likes to bark when the doorbell rings<br />
                </div>
            ),
            subtitle2: "Sit (so they won't jump on guests):",
            subcontent2: "Grab a treat and place it right at the dog's nose to get their attention. Keeping the treat right on the end of the dog's nose, slowly move it up and back over their head. As they follow the treat, their head should come up and they should sit. Once they're sitting, say good dog and give them the treat. When you have practiced enough that you are sure they will sit, you can begin to say the word sit right before you put the treat at their nose.",
            subtitle3: "Stay (so they don't run out the door):",
            subcontent3: "Ask your dog to sit and praise them when they obey. While your dog is sitting, say stay and place your hand flat with your palm facing the dog. Wait 2-3 seconds and then give your dog a treat. You can increase the time they stay by a couple of seconds every three repetitions. It's best to remain right beside them until you've worked up to 30 seconds.",
        },
        {
            image: petparentmain3,
            id: 'f3',
            title: "Toxic Holiday Plants & Symptoms to Look for",
            firstcontent: "Make your home beautiful for the holidays – and safe for your cat – by avoiding these seasonal plants that can be toxic to your feline friend:",
            subtitle1: "1: Holiday and Seasonal Decorative Plants",
            subcontent1: (
                <div>
                    *Amaryllis spp.<br />
                    *Chrysanthemum spp<br />
                    *American Mistletoe Phoradendron spp<br />
                    *Autumn Crocus Colchicum autumnale<br />
                    *Bittersweet Celastrus spp<br />
                    *Japanese Euonymus japonicus<br />
                    *Holly Ilex spp<br />
                    *Christmas Rose Helleborus niger<br />
                    *Crown of Thorn Euphorbia milii<br />
                    *Poinsettia E. pulcherrima<br />
                    *Jerusalem Cherry Solanum pseudocapsicum
                </div>
            ),
            subtitle2: "2: Symptoms of Plant Poisoning, Careful",
            subcontent2: (
                <div>
                    *Continual <br />
                    *Diarrhea<br />
                    *Refusal of food<br />
                    *Pale gums or tongue<br />
                    *Swollen tongue<br />
                    *Abdominal pain<br />
                    *Convulsions
                </div>
            ),
            subtitle3: "3: What to Do",
            subcontent3: "If your cat is displaying any one or combination of these symptoms, it is possible it has ingested a poisonous plant. Plant poisoning is dangerous, and medical attention should be sought immediately. Try to identify the plant that has been ingested and have its scientific name available when you contact your veterinarian. This information will provide for a quicker diagnosis and treatment of your pet.",
        },
    ];

    // Find the object with the matching id
    const selectedPetParent = petparentarray.find(item => item.id === id);

    if (!selectedPetParent) {
        // Handle the case where no matching item is found, for example, redirect to a 404 page
        return <div>Not Found</div>;
    }

    const { image, title, firstcontent, subtitle1, subcontent1, subtitle2, subcontent2, subtitle3, subcontent3 } = selectedPetParent;

    return (
        <div>
          {userid !== "undefined" ? (
        <Header />
      ) : <Heade2r/>}
            <div className='parentimage'>
                <Image src={image} alt="" height='27vw' width='70vw' borderRadius='2vw' />
            </div>
            <div className='companyname'>
                petverse
            </div>
            <div className='parenttitle1'>
                {title}
            </div>
            <div className='firstcontentparent'>
                {firstcontent}
            </div>
            <div className='headingparent'>
                {subtitle1}
            </div>
            <div className='descparent'>
                {subcontent1}
            </div>
            <div className='headingparent'>
                {subtitle2}
            </div>
            <div className='descparent'>
                {subcontent2}
            </div>
            <div className='headingparent'>
                {subtitle3}
            </div>
            <div className='descparent'>
                {subcontent3}
            </div>
            <Footer />
        </div>
    );
}

export default Petparentmain;
