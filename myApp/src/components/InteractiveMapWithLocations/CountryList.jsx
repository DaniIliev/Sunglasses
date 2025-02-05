import React, { useEffect, useState } from 'react';  
import "./InteractiveMapWithLocations.css"
import { FaLocationDot } from "react-icons/fa6";
const BASE_URL = 'https://api.speedy.bg/v1'; // Основен URL  
const userName = 'Daniel'; // Замени с твоето потребителско име  
const password = 'dani04'; // Замени с твоята парола  
const language = 'BG'; // Избор на език, ако е необходимо  

const fetchCountries = async () => {  
    const url = `http://localhost:5200/api/countries?username=Daniel&password=dani04&lang=BG`;  

    try {  
        const response = await fetch(url, {  
            method: 'GET',  
            credentials: 'include', // Включи, ако използваш credentials  
        });  

        if (!response.ok) {  
            throw new Error(`Грешка при извличането: ${response.statusText}`);  
        }  

        const data = await response.text(); // Чете отговора като текст (CSV)  
        console.log(data);  
        // Обработка на получените данни  
    } catch (error) {  
        console.error('Възникна грешка:', error);  
    }  
};

const CountryList = () => {  
  const [cities, setCities] = useState([])
  useEffect(() => {  

    fetchCountries()
        .then(result => setCities(result));  
  }, []);  

  return (  
    <div className='office'> 
        <p className="officeName">Studentsci grad Sofia</p>
        <p className='location'><FaLocationDot/> Ul nqkoq si</p>
        <p>Град: Добрич</p>
        <p className='choiceBTN'>Избери</p>
    </div>  
  );  
};  

export default CountryList;