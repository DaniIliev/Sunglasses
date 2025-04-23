import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import './Create.css'
import { REACT_APP_API_URL } from '../../../env';

const Create = () => {
    const apiUrl = REACT_APP_API_URL; 
    const [images, setImages] = useState([])
    const [message, setMessage] = useState('');
    const [mainImage, setMainImage] = useState(null); 
    const [formData, setFormData] = useState({
      name: '',
      frameWidth: '',
      frameHeight: '',
      lensWidth: '',
      templeLength: '',
      gender: '---',
      frameShape: '---',
      lensType: '---',
      frameMaterial: '---',
      UV_Protection: '---',
  });


  useEffect(() => {

}, []);
    function handleMainImage(e) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setMainImage(reader.result);
        };
        reader.onerror = (error) => {
            console.log("Main image error", error);
        };
    }
    // function handleImage(e){
    //     const files = Array.from(e.target.files); // Преобразуваме FileList в масив
    //     const imageArray = [];
    
    //     files.forEach((file) => {
    //         const reader = new FileReader();
    //         reader.readAsDataURL(file);
    //         reader.onload = () => {
    //             imageArray.push(reader.result);
    //             if (imageArray.length === files.length) {
    //                 setImages(imageArray); // Запазваме всички изображения в state
    //             }
    //         };
    //         reader.onerror = (error) => {
    //             console.log("Error", error);
    //         };
    //     });
    // }

    function handleAdditionalImages(e) {
        const files = Array.from(e.target.files);
        const imageArray = [];
    
        files.forEach((file) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                imageArray.push(reader.result);
                if (imageArray.length === files.length) {
                    setImages(imageArray); // множествени снимки
                }
            };
            reader.onerror = (error) => {
                console.log("Additional images error", error);
            };
        });
    }
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
//    const  createApiCall = async (e) => {
//         e.preventDefault();
//         const data = {...formData, images}
//         try {
//           const response = await fetch(`${apiUrl}/sunglasses/add`, {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(data),
//           });
    
//           const result = await response.json();
//           setMessage(result.message);
//         } catch (error) {
//           setMessage('Възникна грешка при качването.');
//           console.error(error);
//         }
//     };

const createApiCall = async (e) => {
    e.preventDefault();
    
    const combinedImages = mainImage ? [mainImage, ...images] : [...images]; // основната е първа
    const data = { ...formData, images: combinedImages };

    try {
        const response = await fetch(`${apiUrl}/sunglasses/add`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        setMessage(result.message);
        setFormData({
            name: '',
            frameWidth: '',
            frameHeight: '',
            lensWidth: '',
            templeLength: '',
            gender: '---',
            frameShape: '---',
            lensType: '---',
            frameMaterial: '---',
            UV_Protection: '---',
        });
        setImages([]);
        alert(result.message);
        setMainImage(null);
    } catch (error) {
        setMessage('Възникна грешка при качването.');
        console.error(error);
    }
};


    return (
        <>
            <Box
            component="form"
            sx={{ '& > :not(style)': { m: 1 } }}
            noValidate
            autoComplete="off"
            >
            <div className="textFields">
            <TextField  name='frameWidth' label="FRAME WIDTH (MM)" variant="standard"  onChange={handleChange}/>
                    <TextField  name='frameHeight' label="FRAME HEIGHT (MM)" variant="standard" onChange={handleChange}/>
                    <TextField  name='lensWidth' label="LENS WIDTH (MM)" variant="standard" onChange={handleChange}/>
                    <TextField  name='templeLength' label="TEMPLE LENGTH (MM)" variant="standard" onChange={handleChange}/>
                    <TextField  name='price' label="ACTUAL PRICE" variant="standard" onChange={handleChange}/>
                    <TextField  name='oldPrice' label="OLD PRICE" variant="standard" onChange={handleChange}/>
                    <TextField  name='name' label="NAME" variant="standard"  onChange={handleChange}/>
            </div>
            <div className="selectOption">
                    <FormControl fullWidth>
                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                        GENDER
                        </InputLabel>
                        <NativeSelect
                        defaultValue={"---"}
                        onChange={handleChange}
                        inputProps={{
                            name: 'gender',
                            id: 'uncontrolled-native',
                        }}
                        >
                        <option value="----">---</option>
                        <option value={'Man'}>Man</option>
                        <option value={'Women'}>Women</option>
                        <option value={'Unisex'}>Unisex</option>
                        </NativeSelect>
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                        FRAME COLOR
                        </InputLabel>
                        <NativeSelect
                        defaultValue={"---"}
                        onChange={handleChange}
                        inputProps={{
                            name: 'frameColor',
                            id: 'uncontrolled-native',
                        }}
                        >
                        <option value="----">---</option>
                        <option value={'black'}>Black</option>
                        <option value={'blue'}>Blue</option>
                        <option value={'clear'}>Clear</option>
                        <option value={'gold'}>Gold</option>
                        <option value={'green'}>Green</option>
                        <option value={'grey'}>Grey</option>
                        <option value={'multi'}>Multi</option>
                        <option value={'neural'}>Neural</option>
                        <option value={'clear'}>Clear</option>
                        <option value={'orange'}>Orange</option>
                        <option value={'pink'}>Pink</option>
                        <option value={'purple'}>Purple</option>
                        <option value={'red'}>Red</option>
                        <option value={'silver'}>Silver</option>
                        <option value={'tort'}>Tort</option>
                        <option value={'white'}>White</option>
                        <option value={'yellow'}>Yellow</option>
                        </NativeSelect>
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                        FRAME SHAPE
                        </InputLabel>
                        <NativeSelect
                        defaultValue={"---"}
                        onChange={handleChange}
                        inputProps={{
                            name: 'frameShape',
                            id: 'uncontrolled-native',
                        }}
                        >
                        <option value="---">---</option>
                        <option value={'Pilot/Aviator'}>Aviator </option>
                        <option value={'Round'}>Round <img src="/images/round.jpeg" alt="" /></option>
                        <option value={'Squared'}>Squared <img src="/images/squared.jpeg" alt="" /></option>
                        <option value={'Rechtangular'}>Rechtangular <img src="/images/rechtangular.jpeg" alt="" /></option>
                        <option value={'Cat eye'}>Cat eye <img src="/images/catEye.jpeg" alt="" /></option>
                        </NativeSelect>
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                        LENS TYPE
                        </InputLabel>
                        <NativeSelect
                        defaultValue={"---"}
                        onChange={handleChange}
                        inputProps={{
                            name: 'lensType',
                            id: 'uncontrolled-native',
                        }}
                        >
                        <option value="---">---</option>
                        <option value={'Standart sun lenses'}>Standart sun lenses </option>
                        <option value={'Polarized'}>Polarized </option>
                        <option value={'Mirrored'}>Mirrored </option>
                        <option value={'With a color transition'}>With a color transition </option>
                        <option value={'Diobtric sunglasses'}>Diobtric sunglasses </option>
                        </NativeSelect>
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                        FRAME MATERIAL
                        </InputLabel>
                        <NativeSelect
                        defaultValue={"---"}
                        onChange={handleChange}
                        inputProps={{
                            name: 'frameMaterial',
                            id: 'uncontrolled-native',
                        }}
                        >
                        <option value="----">---</option>
                        <option value={'Man'}>Plastic</option>
                        <option value={'Women'}>Metal</option>
                        <option value={'Unisex'}>Hybrid</option>
                        </NativeSelect>
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                        UV PROTECTION
                        </InputLabel>
                        <NativeSelect
                        defaultValue={"---"}
                        onChange={handleChange}
                        inputProps={{
                            name: 'UV_Protection',
                            id: 'uncontrolled-native',
                        }}
                        >
                        <option value="----">---</option>
                        <option value={'0'}>CATEGORY 0</option>
                        <option value={'1'}>CATEGORY 1</option>
                        <option value={'2'}>CATEGORY 2</option>
                        <option value={'3'}>CATEGORY 3</option>
                        <option value={'4'}>CATEGORY 4</option>
                        </NativeSelect>
                    </FormControl>
                    <label htmlFor="description">Description:</label>
                <textarea
                  id="description"
                  name="description"
                  onChange={handleChange}
                  placeholder="Write your description here..."
                  required
                  rows="5"
                  cols="40"
                />
            </div>
            <img src="/images/sizeModel.webp" alt="" className='sizeModel'/>
            </Box>

            <div style={{padding: "5em"}}>
                {/* <input type="file" accept="image/*"  multiple onChange={handleImage}/> */}
                <label>Основно изображение (1 снимка):</label>
                <input type="file" accept="image/*" onChange={handleMainImage} />
                
                <label>Допълнителни изображения:</label>
                <input type="file" accept="image/*" multiple onChange={handleAdditionalImages} />
                <button onClick={createApiCall}>Submit</button>
            </div>
        </>
        
      );
}

export default Create