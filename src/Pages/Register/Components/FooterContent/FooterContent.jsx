/* eslint-disable react/prop-types */
import ButReturnReg from '../Buttons/ButReturnReg'
import ButSaveReg from '../Buttons/ButSaveReg'
import './FooterContent.css'

export default function FooterContent({link, onSubmit, errors}){
    return(
        <div className='FooterContent'>
            <ButReturnReg link={link}/>
            <ButSaveReg onSubmit={onSubmit} errors={errors}/>
        </div>
    )
}