import React from 'react'
import Modal from './Modal'
import erImg from '../../images/er.png'
import styled from 'styled-components'
import { FaTimes } from 'react-icons/fa'
const ERModal = ({open,onClose}) => {
  return (
<Wrapper  className={open?'modal-overlay show-modal':'modal-overlay'}>
    <div className="er-container modal-container overflow-hidden h-[95vh] w-[80vw] grid place-items-center" >
         <button className="close-modal-btn" onClick={onClose}>
                <FaTimes/>
            </button>
            
            <img src={erImg} alt="er-diagram" border="0"  className=''/>
        </div>
    {/* </Modal> */}
    </Wrapper>  
  )
}

export default ERModal
const Wrapper=styled.div`
z-index: 100;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: var(--transition);
    
    .modal-container{
        min-height: 200px;
        background: #2f2e2e;
        border-radius: var(--borderRadius);
        text-align: center;
        display: grid;
        place-items: center;
        position: relative;
        overflow: auto;
    }
    
    .close-modal-btn{
        position:absolute;
        top: 1rem;
        right: 1rem;
        background: transparent;
        border-color: transparent;
        font-size: 2rem;
        cursor: pointer;
        color: var(--red-dark);
        transition: var(--transition);
        &:hover{
            scale: 1.1;
        }
    }
`