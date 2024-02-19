// {
//   "id": "12312",
//   "variant": "11",
//   "capacity": "128",
//   "color": "blue",
//   "price": "123123",
// oldPrice: 123123
//   "picture": "url",
//   "refCategory": "Iphone11Model?color=silver&capacity=128"
// }
// {
//   "id": "12313",
//   "variant": "11",
//   "capacity": "256",
//   "color": "blue",
//   "price": "123123",
//   "picture": "url",
//   "refCategory": "Iphone11Model?color=silver&capacity=128"
// }
// {
//   "id": "12314",
//   "variant": "11",
//   "capacity": "512",
//   "color": "blue",
//   "price": "123123",
//   discount:
//   "picture": "url",
//   "refCategory": "Iphone11Model?color=silver&capacity=128"
// }
//
// HotPrice
// id, discount
//
// if(discount) {
//   return (newPrice - newPrice * discount) * quantity
// }
// return price * quantity
//
// product?.newPrice

import { useLocation } from 'react-router-dom';

const MyComponent = () => {
  let location = useLocation();
...useState

  useEffect(() => {
    console.log(location.pathname);
  }, []);

  return ();

};

export default MyComponent;