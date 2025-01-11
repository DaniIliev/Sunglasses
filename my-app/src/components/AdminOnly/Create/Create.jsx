import React, { useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import './Create.css'
const Create = () => {
    const [image, setImage] = useState('')
    function handleImage(e){
        console.log(e.target.files)
        setImage(e.target.files[0])
    }

    function createApi(){
        console.log('api')
    }

    return (
        <>
            <Box
            component="form"
            sx={{ '& > :not(style)': { m: 1 } }}
            noValidate
            autoComplete="off"
            >
            <div className="textFields">
                    <TextField id="standard-basic" label="FRAME WIDTH (MM)" variant="standard" />
                    <TextField id="standard-basic" label="FRAME HEIGHT (MM)" variant="standard" />
                    <TextField id="standard-basic" label="LENS WIDTH (MM)" variant="standard" />
                    <TextField id="standard-basic" label="TEMPLE LENGTH (MM)" variant="standard" />
            </div>
            <div className="selectOption">
                    <FormControl fullWidth>
                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                        GENDER
                        </InputLabel>
                        <NativeSelect
                        defaultValue={"---"}
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
                        inputProps={{
                            name: 'gender',
                            id: 'uncontrolled-native',
                        }}
                        >
                        <option value="---">---</option>
                        <option value={''}>Aviator </option>
                        <option value={20}>Round <img src="/images/round.jpeg" alt="" /></option>
                        <option value={30}>Squared <img src="/images/squared.jpeg" alt="" /></option>
                        <option value={30}>Rechtangular <img src="/images/rechtangular.jpeg" alt="" /></option>
                        <option value={30}>Cat eye <img src="/images/catEye.jpeg" alt="" /></option>
                        </NativeSelect>
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                        LENS TYPE
                        </InputLabel>
                        <NativeSelect
                        defaultValue={"---"}
                        inputProps={{
                            name: 'gender',
                            id: 'uncontrolled-native',
                        }}
                        >
                        <option value="---">---</option>
                        <option value={''}>Standart sun lenses </option>
                        <option value={20}>Polarized </option>
                        <option value={30}>Mirrored </option>
                        <option value={30}>With a color transition </option>
                        <option value={30}>Diobtric sunglasses </option>
                        </NativeSelect>
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                        FRAME MATERIAL
                        </InputLabel>
                        <NativeSelect
                        defaultValue={"---"}
                        inputProps={{
                            name: 'gender',
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
                        inputProps={{
                            name: 'gender',
                            id: 'uncontrolled-native',
                        }}
                        >
                        <option value="----">---</option>
                        <option value={'Man'}>CATEGORY 0</option>
                        <option value={'Man'}>CATEGORY 1</option>
                        <option value={'Man'}>CATEGORY 2</option>
                        <option value={'Man'}>CATEGORY 3</option>
                        <option value={'Man'}>CATEGORY 4</option>
                        </NativeSelect>
                    </FormControl>
            </div>
            <img src="/images/sizeModel.webp" alt="" className='sizeModel'/>
            </Box>

            <div>
                <input type="file" accept="image/*" onChange={handleImage}/>
                <button onClick={createApi}>Submit</button>
            </div>
        </>
        
      );
}

export default Create