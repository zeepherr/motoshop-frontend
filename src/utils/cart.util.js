// prepared  to add
export const productToCartItem = (product) => {
  return {
    id: product.id,
    itemType: "PRODUCT",
    name: product.name,
    unitPrice: product.sellingPrice,
    availableStock: product.stockQuantity,
  };
};

export const serviceToCartItem = (service) => {
  return {
    id: service.id,
    itemType: "SERVICE",
    name: service.name,
    unitPrice: service.price,
    availableStock: null,
  };
};

export const buildCheckoutPayload = ({
  cartItems,
  selectedMember,
  paymentMethod,
  receivedAmount,
}) => {
  const items = cartItems.map((item) => {
    if (item.itemType === "PRODUCT") {
      return {
        itemType: "PRODUCT",
        productId: item.id,
        quantity: item.quantity,
      };
    }

    return {
      itemType: "SERVICE",
      serviceId: item.id,
      quantity: item.quantity,
    };
  });

  return {
    memberId: selectedMember?.id ?? null,
    items,
    paymentMethod,
    receivedAmount: Number(receivedAmount),
  };
};

export const buildHoldPayload = ({
  cartItems,
  selectedMember,
  paymentMethod,
}) => {
  const items = cartItems.map((item) => {
    if (item.itemType === "PRODUCT") {
      return {
        itemType: "PRODUCT",
        productId: item.id,
        quantity: item.quantity,
      };
    }

    return {
      itemType: "SERVICE",
      serviceId: item.id,
      quantity: item.quantity,
    };
  });

  return {
    customerType: selectedMember ? "MEMBER" : "GUEST",
    memberId: selectedMember?.id ?? null,
    paymentMethod,
    items,
  };
};

export const pendingOrderToCartItems = (orderItems = []) => {
  return orderItems.map((item) => ({
    id: item.itemType === "PRODUCT" ? item.productId : item.serviceId,

    itemType: item.itemType,

    name: item.itemNameSnapshot,

    unitPrice: Number(item.unitPrice),

    quantity: item.quantity,

    maxQuantity: null,
  }));
};
