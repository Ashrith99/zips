import React from 'react'
import './AboutRestaurant.css'
import { generalpics } from '../../assets/pictures/pictures'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

const AboutRestaurant = () => {
    const restaurantheading = "Suraj"
    const isAboutRes = true;
  return (
    <>
    <Header isAddpage={isAboutRes} />
    <div className="main-container">
        <div className="restaurant-heading"><h2>{restaurantheading}</h2></div>
        <div className="restaurant-img"><img src="src/assets/pictures/suraj_img.png" alt="" /></div>
        <div className="restaurant-desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus dolorum porro illo. Incidunt eius numquam ea suscipit? Esse aliquid reprehenderit sapiente quidem sunt dolore, eius voluptates eligendi provident recusandae nemo dolorum aspernatur omnis ratione laboriosam blanditiis minus illo fugit obcaecati corrupti amet magnam earum tempore consectetur! Beatae quae quisquam commodi temporibus! Non, omnis eum. Iste eligendi similique eos. Velit omnis quasi dolore explicabo perferendis delectus ratione quaerat aspernatur, perspiciatis incidunt laboriosam aliquam, dicta necessitatibus dolores dolor dignissimos ad quo, voluptatibus doloribus placeat similique quis! Laudantium quidem est architecto molestiae, aliquid corrupti, similique voluptatem tempore eum a, odit ducimus necessitatibus autem?</div>
    </div>
    <Footer/>
    </>
  )
}

export default AboutRestaurant