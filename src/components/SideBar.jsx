import React from 'react'
import styled from 'styled-components'
import {FaBars} from 'react-icons/fa'
const SideBar = ({isModelOpen,onClose}) => {
  return (
    <Wrapper className={isModelOpen?'modal-overlay show-modals':'modal-overlay'}>
        <div className="modal-container">

        </div>
    </Wrapper>
  )
}

export default SideBar

const Wrapper=styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    .modal-container{
        background: white;
        width: 90vw;
        height: 30vh;
        border-radius: var(--borderRadius);
        max-width: var(--fixed-width);
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

    }
`