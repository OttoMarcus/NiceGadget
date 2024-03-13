export const CreateFavorUser = async (user, products) => {
  const favorPost = await fetch(`http://localhost:4000/api/wishlist`, {
    method: `POST`,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: user._id, products: products }),
  });
};
