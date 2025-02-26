/* eslint-disable react/prop-types */
import './Delete.css';
import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { DeleteUser } from '../../../../Requests/MethodRequest';

const Delete = forwardRef((props, ref) => {
  const boxRef = useRef(null);
  const [id, setid] = useState('')

  function openBoxGroupUser() {
    const box = boxRef.current;
    if (box.style.display == 'none') {
      box.style.display = 'flex';
    } else {
      box.style.display = 'none';
    }
  }

  function setIds(id){
    setid(id)
    openBoxGroupUser()
  }

  useImperativeHandle(ref, () => ({
    setIds,
  }));

  const deleteItem = async () => {
    if(props.type == 'User'){
      await DeleteUser({permissionScreen: "DeleteUser"}, {id: id})
      openBoxGroupUser()
      window.location.reload()
    }
  }

  return(
    <div className='backDelete' ref={boxRef} style={{ display:'none' }}>
      <div className='cardDelete'>
        <h2>Confirma a Deleçao do Item?</h2>
        <div className='ButtonsCardDelete'>
          <button onClick={openBoxGroupUser}>Cancelar</button>
          <button onClick={deleteItem}>Confirmar</button>
        </div>
      </div>
    </div>
  )
})

Delete.displayName = 'Delete';
export default Delete