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
    console.log('Hello world!')
}, []);
    function handleImage(e){
        const files = Array.from(e.target.files); // Преобразуваме FileList в масив
        const imageArray = [];
    
        files.forEach((file) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                imageArray.push(reader.result);
                if (imageArray.length === files.length) {
                    setImages(imageArray); // Запазваме всички изображения в state
                }
            };
            reader.onerror = (error) => {
                console.log("Error", error);
            };
        });
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
   const  createApiCall = async (e) => {
        e.preventDefault();
        const data = {...formData, images}
        try {
          const response = await fetch(`${apiUrl}/sunglasses/add`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });
    
          const result = await response.json();
          setMessage(result.message);
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
                        <option value={'Aviator'}>Aviator </option>
                        <option value={'round'}>Round <img src="/images/round.jpeg" alt="" /></option>
                        <option value={'Round'}>Squared <img src="/images/squared.jpeg" alt="" /></option>
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

            <div>
                <input type="file" accept="image/*"  multiple onChange={handleImage}/>
                <button onClick={createApiCall}>Submit</button>
            </div>
        </>
        
      );
}

export default Create