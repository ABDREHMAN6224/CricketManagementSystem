import React from 'react'
import styled from 'styled-components'

const Loader = () => {
  return (
<Wrapper  className={open?'modal-overlay show-modal':'modal-overlay'}>
            <div className="loading"></div>
    </Wrapper>    )
}

export default Loader
const Wrapper=styled.div`
z-index: 999999;
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