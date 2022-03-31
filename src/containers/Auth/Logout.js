import React, {useEffect} from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authLogout } from '../../store/auth'

export default function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch( authLogout() );
    navigate( '/' )
  }, [navigate,dispatch])
  
  return (
    <div></div>
  )
}
