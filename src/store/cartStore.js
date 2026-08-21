import { create } from 'zustand';

export const useCartStore = create((set, get) => ({
  items: [],
  total: 0,
  count: 0,
  
  addItem: (product, variantName = null) => {
    const items = get().items;
    const existingIndex = items.findIndex(
      item => item.product.id === product.id && item.selectedVariant === variantName
    );

    let price = product.price;
    if (variantName && product.variants) {
      const variant = product.variants.find(v => v.name === variantName || v.title === variantName);
      if (variant) price = variant.price;
    }

    let newItems = [];
    if (existingIndex > -1) {
      newItems = [...items];
      newItems[existingIndex].quantity += 1;
    } else {
      newItems = [...items, { product, selectedVariant: variantName, price, quantity: 1 }];
    }

    const total = newItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const count = newItems.reduce((sum, item) => sum + item.quantity, 0);
    set({ items: newItems, total, count });
  },

  removeItem: (productId, variantName = null) => {
    const items = get().items;
    const newItems = items.filter(
      item => !(item.product.id === productId && item.selectedVariant === variantName)
    );
    const total = newItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const count = newItems.reduce((sum, item) => sum + item.quantity, 0);
    set({ items: newItems, total, count });
  },

  updateQty: (productId, quantity, variantName = null) => {
    const items = get().items;
    const existingIndex = items.findIndex(
      item => item.product.id === productId && item.selectedVariant === variantName
    );

    if (existingIndex > -1) {
      const newItems = [...items];
      if (quantity <= 0) {
        newItems.splice(existingIndex, 1);
      } else {
        newItems[existingIndex].quantity = quantity;
      }
      const total = newItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const count = newItems.reduce((sum, item) => sum + item.quantity, 0);
      set({ items: newItems, total, count });
    }
  }
}));
