import { create } from "zustand";

export const usePosStore = create((set, get) => ({
  cartItems: [],
  selectedMember: null,
  pendingOrderId: null,

  setCartItems: (items) => {
    set({
      cartItems: items,
    });
  },
  addItem: (item) => {
    const { cartItems } = get(); //get

    const existingItem = cartItems.find(
      (cartItem) =>
        cartItem.itemType === item.itemType && cartItem.id === item.id,
    );

    if (existingItem) {
      //find if same item increase quantity if not add item
      if (
        existingItem.maxQuantity != null &&
        existingItem.quantity >= existingItem.maxQuantity
      ) {
        return;
      }

      const updatedCartItems = cartItems.map((cartItem) =>
        cartItem.itemType === item.itemType && cartItem.id === item.id
          ? {
              ...cartItem,
              quantity: cartItem.quantity + 1,
            }
          : cartItem,
      );

      set({
        cartItems: updatedCartItems,
      });

      return;
    }

    set({
      cartItems: [
        ...cartItems,
        {
          ...item,
          quantity: item.quantity ?? 1,
        },
      ],
    });
  },

  increaseQuantity: (itemType, id) => {
    const { cartItems } = get();

    const updatedCartItems = cartItems.map((item) => {
      if (item.itemType !== itemType || item.id !== id) {
        return item;
      }

      if (item.maxQuantity != null && item.quantity >= item.maxQuantity) {
        return item;
      }

      return {
        ...item,
        quantity: item.quantity + 1,
      };
    });

    set({
      cartItems: updatedCartItems,
    });
  },

  decreaseQuantity: (itemType, id) => {
    const { cartItems } = get();

    const updatedCartItems = cartItems
      .map((item) => {
        if (item.itemType !== itemType || item.id !== id) {
          return item;
        }

        return {
          ...item,
          quantity: item.quantity - 1,
        };
      })
      .filter((item) => item.quantity > 0);

    set({
      cartItems: updatedCartItems,
    });
  },

  removeItem: (itemType, id) => {
    const { cartItems } = get();

    const updatedCartItems = cartItems.filter(
      (item) => !(item.itemType === itemType && item.id === id),
    );

    set({
      cartItems: updatedCartItems,
    });
  },

  clearCart: () => {
    set({
      cartItems: [],
    });
  },

  setSelectedMember: (member) => {
    set({
      selectedMember: member,
    });
  },

  clearSelectedMember: () => {
    set({
      selectedMember: null,
    });
  },

  setPendingOrderId: (orderId) => {
    set({
      pendingOrderId: orderId,
    });
  },

  clearPendingOrderId: () => {
    set({
      pendingOrderId: null,
    });
  },

  resetOrder: () => {
    set({
      cartItems: [],
      selectedMember: null,
      pendingOrderId: null,
    });
  },
}));
