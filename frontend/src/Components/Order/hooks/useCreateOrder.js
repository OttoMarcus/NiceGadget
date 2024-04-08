import { useDispatch, useSelector } from "react-redux";
import { orderAddNew, orderAddNewUnAvt } from "../../../store/orders/OrderNew";

export const useCreateOrder = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const user = useSelector((state) => state.user.user);
  const totalCartPrice = useSelector((state) =>
    state.cart.cartItems.reduce(
      (total, item) => total + item.price * item.cartQuantity,
      0
    )
  );

  const createOrder = async (values) => {
    const token = localStorage.getItem("token") || null;
    const userId = user?._id || null;
    const resultSlice = userId?.slice(1, -1);
    const currentDate = new Date();

    const orderData = {
      products: cartItems,
      userFirstName: values.firstName,
      userLastName: values.lastName,
      deliveryAddress: values.deliveryAddress,
      shipping: { method: values.paymentMethod },
      totalSum: totalCartPrice,
      email: values.email,
      canceled: false,
      mobile: values.phoneNumber,
      letterSubject: "Order Confirmation",
      status: "Pending",
      data: currentDate,
    };

    if (token && resultSlice) {
      dispatch(orderAddNew({ ...orderData, customerId: userId }));
    } else if (!token) {
      dispatch(orderAddNewUnAvt(orderData));
    }
  };

  return createOrder;
};
