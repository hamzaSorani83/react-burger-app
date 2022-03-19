import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function withNavigate( Wrappercomponent ) {
  const Wrapper = (props) => {
    const navigate = useNavigate();

    return <Wrappercomponent navigate={navigate} {...props} />;
  };

  return Wrapper;
}
