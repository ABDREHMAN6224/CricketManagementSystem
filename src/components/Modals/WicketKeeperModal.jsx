import React,{useState} from 'react'
import Modal from './Modal'
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { updateCurrentWicketKeeper,updateWicketKeeper } from '../../features/wicketKeeperReducers';
import PictureInput from '../inputs/PictureInput';
import TextInput from '../inputs/TextInput';

const WicketKeeperModal = ({open,onClose,loading=false,keeper,viewOnly=false}) => {
  if(loading){
    return(
    <Modal open={open} onClose={onClose} >
        <div className="loading"></div>
    </Modal>

    )
  }
  const {playerid,playername,totalcatches,totalstumps,playerpicpath}=keeper;
  const [keeperPicture,setPicture]=useState(playerpicpath);
  const [name,setName]=useState(playername);
  const [stumps,setStumps]=useState(totalstumps);
  const [catches,setCatches]=useState(totalcatches);
  const [load,setLoad]=useState(false);
  const dispatch=useDispatch();
  const handleSave=()=>{
    if(name=="" || stumps==="" || catches==="" || keeperPicture===""){
      toast.error("Please fill all the fields");
      return;
    }
    if(name.trim().length<3){
      toast.error("Player name should be atleast 3 characters long");
      return;
    }
    if(name===""){
      toast.error("Please enter player name");
      return;
    }
    if(stumps<0){
      toast.error("Stumps cannot be negative");
      return;
    }
    if(catches<0){
      toast.error("Catches cannot be negative");
      return;
    }
    if(stumps===totalstumps && catches===totalcatches && name===playername && keeperPicture===playerpicpath){
      toast.info("No changes made");
      return;
    }
    setLoad(true);
    dispatch(updateCurrentWicketKeeper({playerid,catches,stumps,playername:name,playerpicpath:keeperPicture}));
    dispatch(updateWicketKeeper({playerid,catches,stumps,playername:name,playerpicpath:keeperPicture}));
    toast.success("updated successfully");
    setTimeout(()=>{
      setLoad(false);
      onClose();
    },2000)
  }
  const handleClose=()=>{
    onClose();
  }

  return (
    <Modal open={open} onClose={handleClose} width={"600px"} height={"auto"}>
        <div className='py-12 px-6'>
              <div className="flex flex-col items-center justify-center gap-2">
                  <h3 className='text-3xl font-bold pb-3'>{viewOnly?"View ":"Edit "}Wicket Keeper</h3>
                <div className="flex flex-col items-center justify-center gap-4">
                  <div className="flex items-center flex-col justify-center gap-2">
                    <PictureInput disabled={viewOnly} hoverLabel="Update Picture" picture={keeperPicture} setPicture={setPicture} />
                    <h3 className="text-2xl font-bold">{name}</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-x-16 gap-y-1">
                    <TextInput disabled={viewOnly} label="Player Name" value={name} onChange={e=>setName(e.target.value)} />
                    <TextInput disabled={viewOnly} label="Stumps" value={stumps} onChange={e=>setStumps(e.target.value)} type='number'/>
                    <TextInput disabled={viewOnly} label="Catches" value={catches} onChange={e=>setCatches(e.target.value)} type='number'/>

                  </div>
                  {!viewOnly &&
                    <button className="btn btn-primary btn-block" onClick={handleSave} disabled={load||viewOnly}>{load?"Saving ...":"Save"}</button>
                  }
                </div>
              </div>
        </div>
    </Modal> 
  )
}

export default WicketKeeperModal