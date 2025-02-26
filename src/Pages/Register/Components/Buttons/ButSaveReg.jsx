/* eslint-disable react/prop-types */
import './ButSaveReg.css'
import { FiSave } from "react-icons/fi";
import { PutUser } from '../../../../Requests/MethodRequest';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { PostUser } from '../../../../Requests/MethodRequest';
import PropTypes from 'prop-types';

export default function ButSaveReg({onSubmit, errors}){
    const Navigate = useNavigate()
    const { id } = useParams();

    ButSaveReg.propTypes = {
        onSubmit: PropTypes.func.isRequired,
    };

    async function submit(){
        const name = onSubmit.name

        if(name == 'submitedEditUser'){
            PutValueUser()
        }
        if(name == 'submitedRegUser'){
            PostValueUser()
        }
    }
    
    async function PutValueUser(){
        try{
            const response = await PutUser({permissionScreen: "PutUser"}, {data: await onSubmit()}, {id: id})
            if(response){
                Navigate('/User')
            }
        } catch (error){
            console.error("Error:", error);
        }
    }

    async function PostValueUser(){
        const response = await PostUser({permissionScreen: "PostUser"}, {data: await onSubmit()})
        if(response == 10001){
            console.log('kndjcvn')
            await errors(true)
        }else{
            Navigate('/User')
        }
    }

    return(
        <button className='ButSaveReg' onClick={submit}><FiSave className='iconButSaveReg'/>Save</button>
    )
}