import React from 'react'
import styled from 'styled-components'
import {FaTimes} from 'react-icons/fa'
const Modal = ({open=true,onClose,width="33vw",height="40vh",children,autoClose=true}) => {
  return (
    <Wrapper  className={open?'modal-overlay show-modal':'modal-overlay'}>
        <div className="modal-container" style={{width:`${width}`,height:`${height}`}}>
            {autoClose &&
            <button className="close-modal-btn" onClick={onClose}>
                <FaTimes/>
            </button>
            }
            {children}
        </div>
    </Wrapper>  
    )
}

export default Modal

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
    opacity: 1;
    
    .modal-container{
        min-height: 200px;
        background: white;
        border-radius: var(--borderRadius);
        max-width: var(--max-width);
        text-align: center;
        display: grid;
        place-items: center;
        position: relative;
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