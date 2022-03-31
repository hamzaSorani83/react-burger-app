import React, { useEffect, useState } from 'react'
import Order from '../../components/Order/Order';
import axios from '../../axios-orders'
import Spinner from '../../components/OrderList/Spinner/Spinner'
import SweetAlert from 'react-bootstrap-sweetalert';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Orders() {
  const [ loading,setLoading ] = useState( false );
  const [ error,setError ] = useState( null );
  const [ orders,setOrders ] = useState( [] );
  const navigate = useNavigate();
  const token = useSelector( state => state.auth.token );
  useEffect( () => {
    setLoading( true )
        axios.get('/orders.json?auth=' + token)
        .then(res => {
          const fetchedOrders = [];
          for (let key in res.data) {
            fetchedOrders.push({
              ...res.data[key],
              id: key
            });
          }
          setLoading( false );
          setOrders(fetchedOrders)
        })
        .catch(error => {
          setLoading( false );
          if (error.response) {
            setError(error.response.data.error)
          } else {
            setError(error.message)
          }
        });
  },[token] )
  return (
    <div style={{ paddingTop: '20px', paddingBottom: '40px' }}>
        {
        error 
          ? <SweetAlert error title="Error!" onConfirm={() => {navigate('/')}} >{error}</SweetAlert> 
          : loading
            ?  <Spinner />
            : orders.map( order => (
                <Order 
                  key={order.id}
                  ingredients={order.ingredients}
                  price={order.price} />
              ))
        }
    </div>
  )
}

export default React.memo( Orders );