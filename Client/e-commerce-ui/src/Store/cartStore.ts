import { cartStoreActionsType, cartStoreType, cartItemsType, CartItemFromAPI, cartType } from '@/utils/types'
import { create } from 'zustand'

// Helper function to convert API cart items to the expected format
const transformCartItems = (apiItems: CartItemFromAPI[], userId: string): cartItemsType => {
  return apiItems.map((item) => {
    const cartItem: cartType = {
      id: item.product.id,
      name: item.product.name,
      shortDescription: item.product.shortDescription,
      description: item.product.description || '',
      price: item.priceAdd, // Use priceAdd from cart item (price at time of adding)
      productSizes: [], // Not included in API response, but not needed for cart display
      productColors: item.product.productColors.map(color => ({
        id: color.id,
        name: color.name,
        hexCode: color.hexCode || '',
        imgURL: color.imgURL,
        productId: color.productId
      })),
      quantity: item.quantity,
      categoryId: item.product.categoryId,
      selectedColor: item.selectedColor,
      selectedSize: item.selectedSize,
      userId: userId,
      cartItemId: item.id // Store the cart item ID for deletion
    };
    return cartItem;
  });
};

const useCartStore = create<cartStoreType & cartStoreActionsType>()(

  (set) => ({
    cart: [],
    hasHydrated: false,
    setCart: (cart: cartItemsType) => set({ cart }),
    fetchCart: async (userId: string) => {
      try {
        const response = await fetch(`/api/Cart/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const apiItems: CartItemFromAPI[] = await response.json()
        const transformedCart = transformCartItems(apiItems, userId)
        set({ cart: transformedCart })
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    },
    addToCart: async (product) => {
      try {
        const response = await fetch(`/api/Cart`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(product),
        })
        const apiItems: CartItemFromAPI[] = await response.json()
        const transformedCart = transformCartItems(apiItems, product.userId)
        set({ cart: transformedCart });

      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    },
    removeFromCart: async (product) => {
      try {
        await fetch(`/api/Cart/${product.userId}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            productId: product.id,
            selectedColor: product.selectedColor,
            selectedSize: product.selectedSize
          }),
        })
        set((state) => ({
          cart: state.cart.filter(
            item => item.cartItemId !== product.cartItemId
          )
        }));
      } catch (error) {
        console.error("Error removing from cart:", error);
        // Fallback to local state update on error
        set((state) => ({
          cart: state.cart.filter(item =>
            !(item.id === product.id &&
              item.selectedSize === product.selectedSize &&
              item.selectedColor === product.selectedColor
            )
          )
        }))
      }
    },
    clearCart: () => set({ cart: [] }),
  })
)


export default useCartStore;