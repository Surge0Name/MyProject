import React, {useState, useEffect} from "react";
import axios from "axios";
import Rating from "./Rating";

export default function Resto({ selectedCategory, selectedPrice, isOpenNow }) {
    const [Restaurants, setRestaurants] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;



    function getRandomPrice(){
        const priceLvl = ['$', '$$', '$$$', '$$$$', '$$$$$'];
        return priceLvl[Math.floor(Math.random() * priceLvl.length)];
    }

    function getRandomOpenNow(){
        return Math.random()<0.5
    }

    useEffect(() =>{
        const fetchRestaurants = async () => {
            try{
                const response = await axios.get("https://restaurant-api.dicoding.dev/list");
                const restaurantList = response.data.restaurants;

                const restaurantDetailsPromises = restaurantList.map(restaurant =>
                    axios.get(`https://restaurant-api.dicoding.dev/detail/${restaurant.id}`)
                );

                const restaurantDetailsResponses = await Promise.all(restaurantDetailsPromises);
                const restaurantWithDetails = restaurantDetailsResponses.map(res => 
                    {const Restaurants = res.data.restaurant;
                        Restaurants.price = getRandomPrice();
                        Restaurants.isOpenNow = getRandomOpenNow();
                        return Restaurants
                    });

                setRestaurants(restaurantWithDetails)
            } catch(error){
                console.log(error);
            }
        };
        
        fetchRestaurants();
    }, []);
    console.log(Restaurants)

    const handleLoadMore = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };



    const filteredRestaurant = Restaurants.filter((restaurant) =>{
        const categoryMatch = selectedCategory === "Categories" || restaurant.categories.some(category => category.name === selectedCategory);
        const priceMatch = selectedPrice === "Price" || restaurant.price === selectedPrice;
        const openNowMatch = !isOpenNow || restaurant.isOpenNow;

        return categoryMatch && priceMatch && openNowMatch;
    }
       
    ) ;

    const displayedRestaurants = filteredRestaurant.slice(0, currentPage * itemsPerPage);

    return(
        <>
            <h1 className="text-xl ml-5 ">All Restaurants</h1>
            <div className="grid grid-cols-4 gap-4">
                {
                    displayedRestaurants.map(response => (
                        <div key = {response.id} className="bg-white rounded-lg shadow-lg p-5">
                                        <div className="container grid">
                                            <img src= {`https://restaurant-api.dicoding.dev/images/small/${response.pictureId}`} alt = {response.name}/>
                                            <h2 className="text-5m font-bold">{response.name}</h2>
                                            <p><Rating rating={response.rating}/> {response.rating}</p>
                                            <p className="text-sm text-gray-500">City: {response.city}</p>
                                            <p className="text-sm text-gray-500">Categories: {
                                                response.categories.map(category => category.name).join(", ")
                                                }</p>
                                            <span className="flex w-full justify-between">
                                             <p className="text-sma text-gray-500">{response.price}</p>
                                             <p className={`text-sma text-grey-500 ${response.isOpenNow ? 'text-green-500' : 'text-red-500'}`}>{response.isOpenNow ? 'Open Now': 'Closed Now'} </p>
                                            </span>
                                            
                                            <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
                                                    Learn More
                                             </button>
                                        </div>
                                    </div>
                                
                    ))
                }
            </div>
            {displayedRestaurants.length < filteredRestaurant.length && (
                <div className="flex justify-center mt-5">
                    <button 
                    className="bg-gray-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick = {handleLoadMore}>
                        Load More..
                    </button>

                </div>
            )}

        </>

    )
}