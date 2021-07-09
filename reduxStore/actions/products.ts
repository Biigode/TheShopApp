import Product from "../../models/product";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";

export const fetchProducts = () => {
  try {
    return async (dispatch: any) => {
      const response = await fetch(
        "https://theshopapp-2071e-default-rtdb.firebaseio.com/products.json"
      );
      if (!response.ok) {
        throw new Error("something went wrong");
      }
      const resData = await response.json();
      const loadedProducts = [];
      for (const key in resData) {
        loadedProducts.push(
          new Product(
            key,
            "u1",
            resData[key].title,
            resData[key].imageUrl,
            resData[key].description,
            resData[key].price
          )
        );
      }
      dispatch({ type: SET_PRODUCTS, products: loadedProducts });
    };
  } catch (error) {
    throw error;
  }
};

export const deleteProduct = (productId: any) => {
  return { type: DELETE_PRODUCT, productId: productId };
};
export const createProduct = (
  title: string,
  description: string,
  imageUrl: string,
  price: number
) => {
  try {
    return async (dispatch: any) => {
      const response = await fetch(
        "https://theshopapp-2071e-default-rtdb.firebaseio.com/products.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            description,
            imageUrl,
            price,
          }),
        }
      );
      const resData = await response.json();
      dispatch({
        type: CREATE_PRODUCT,
        productData: {
          id: resData.name,
          title,
          description,
          imageUrl,
          price,
        },
      });
    };
  } catch (error) {
    console.log("erro" + error);
  }
};

export const updateProduct = (
  id: string,
  title: string,
  description: string,
  imageUrl: string
) => {
  return {
    type: UPDATE_PRODUCT,
    productId: id,
    productData: {
      title,
      description,
      imageUrl,
    },
  };
};
