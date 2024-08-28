import React, {useState} from "react";
import Resto from "../resto_list/resto_list";

export default function Main(){

    const [showPriceDropdown, setShowPriceDropdown] = useState(false);
    const [selectedPrice, setSelectedPrice] = useState("Price");

    const[showCategoriesDropdown, setShowCategoriesDropdown] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("Categories");

    const [isOpenNow, setIsOpenNow] = useState(false)

    const manualCategories = ["Modern", "Bali", "Jawa", "Sop", "Italia", "Spanyol", "Sunda"]
    

    const handlePriceSelect = (price) => {
        setSelectedPrice(price);
        setShowPriceDropdown(false);
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setShowCategoriesDropdown(false);
    
    };

    const handleOpenNow = () =>{
        setIsOpenNow(!isOpenNow)
    }

    return(
        <>
        <div className="ml-5 w-3/6">
            <h1 className="text-3xl">Restaurants</h1>
            <p className="mb-5">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse non pulvinar diam, ut fermentum turpis. 
                Nulla elementum aliquet velit non laoreet. Aliquam sed augue nisi.</p>
        </div>
        <div className="flex w-full ml-0 border-t-2 border-b-2 h-14">
            <p className="mt-2.5 ml-5">Filter By:</p>
            <div className="py-3.5 px-3 flex item-center ">
                <input  
                    id="openNow_filter" 
                    type="checkbox" 
                    checked={isOpenNow}
                    onChange={handleOpenNow}
                    className= "w-4 h-4 rounded-full border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                <label htmlFor="openNow_filter" className="ml-2 text-sm font-medium text-gray-400 dark:text-gray-500">Open Now</label>
            </div>
            <div className="dropdown-wrapper" style={{zIndex:1000, position:'relative'}}>
                <button id= "Pricedefaultbutton" data-dropdown-toggle= "dropdown"
                className="px-3 py-3 text-center inline-flex items-center" 
                type="button"
                onClick={()=>setShowPriceDropdown(!showPriceDropdown)}>
                    {selectedPrice}
                    <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 4 4 4-4" /></svg>
                </button>
                {/*actual dropdown for price*/}
                <div id="Price" 
                     className={` ${showPriceDropdown ? "" : "hidden"} bg-white divide-y divide-gray-100 rounded-lg shadow w-44`}
                     > 
                   <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="Pricedefaultbutton">
                        <li className="text-slate-500 cursor-pointer" onClick={()=>handlePriceSelect("$")}>1. $</li>
                        <li className="text-slate-500 cursor-pointer" onClick={()=>handlePriceSelect("$$")}>2. $$</li>
                        <li className="text-slate-500 cursor-pointer" onClick={()=>handlePriceSelect("$$$")}>3. $$$</li>
                        <li className="text-slate-500 cursor-pointer" onClick={()=>handlePriceSelect("$$$$")}>4. $$$$</li>

                    </ul>
                </div>
            </div>    
            <div className="dropdown-wrapper" style={{zIndex:1000, position: 'relative'}}>
                <button id= "Categoriesdefaultbutton" data-dropdown-toggle= "dropdown"
                className="px-3 py-3 text-center inline-flex items-center" 
                type="button"
                onClick={()=>setShowCategoriesDropdown(!showCategoriesDropdown)}>
                    {selectedCategory}
                    <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 4 4 4-4" /></svg>
                </button>
                {/*actual dropdown for categ */}
                <div id="Categories" 
                     className={`z-10 ${showCategoriesDropdown ? "" : "hidden"} bg-white divide-y divide-gray-100 rounded-lg shadow w-44`}
                     > 
                   <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="Categoriesdefaultbutton">
                        {manualCategories.map((category, index) =>
                            <li key={index} className="text-slate-500 cursor-pointer" onClick={()=>handleCategorySelect(category)}>
                                {index + 1}. {category}
                            </li>
                        )

                        }   
                    </ul>
                </div>
            </div>    
        </div>
        <Resto selectedCategory={selectedCategory} selectedPrice={selectedPrice} isOpenNow={isOpenNow}/>
        </>
    )
}