import React, { useEffect, useState } from 'react'
import Order from '../../components/Order/Order';
import axios from '../../axios-orders'
import Spinner from '../../components/OrderList/Spinner/Spinner'
import SweetAlert from 'react-bootstrap-sweetalert';
import { useNavigate } from 'react-router-dom';

export default function Orders() {
  const [ loading,setLoading ] = useState( false );
  const [ error,setError ] = useState( null );
  const [ orders,setOrders ] = useState( [] );
  const navigate = useNavigate();
  
  useEffect( () => {
    setLoading(true)
        axios.get('/orders.json')
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
        .catch(err => {
          setLoading( false );
          setError( err.message );
        });
  }, [])
  return (
    <div>
        {
        error 
          ? <SweetAlert error title="Error!" onConfirm={() => {navigate('/burger')}} >{error}</SweetAlert> 
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
