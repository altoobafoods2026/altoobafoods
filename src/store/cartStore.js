import { create } from 'zustand';

function saveCartToStorage(items) {
  if (typeof window === 'undefined') return;
  try {
    const serializable = items.map((it) => {
      let variantId = it.selectedVariant && it.product?.variants?.find(
        (v) => v.name === it.selectedVariant || v.title === it.selectedVariant
      )?.id;
      if (!variantId && it.product?.variants?.[0]?.id) variantId = it.product.variants[0].id;
      if (!variantId) variantId = it.product?.id || '1';

      return {
        id: variantId,
        variantId: variantId,
        title: it.product?.title || it.title || it.name || '',
        name: it.product?.title || it.title || it.name || '',
        selectedVariant: it.selectedVariant,
        price: it.price,
        quantity: it.quantity,
        image: it.product?.images?.[0]?.url || it.product?.image || '',
        featuredImage: it.product?.images?.[0]?.url || it.product?.image || '',
        product: it.product
      };
    });

    localStorage.setItem('cart', JSON.stringify(serializable));
    localStorage.setItem('altooba_cart', JSON.stringify(serializable));
  } catch (e) {
    console.warn('Could not save cart to localStorage', e);
  }
}

function loadInitialCart() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem('cart') || localStorage.getItem('altooba_cart');
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.map((it) => ({
      product: it.product || {
        id: it.id,
        title: it.title || it.name,
        price: it.price,
        images: it.image ? [{ url: it.image }] : []
      },
      selectedVariant: it.selectedVariant || null,
      price: Number(it.price || 0),
      quantity: Number(it.quantity || 1)
    }));
  } catch (e) {
    return [];
  }
}

const initialItems = loadInitialCart();
const initialTotal = initialItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
const initialCount = initialItems.reduce((sum, item) => sum + item.quantity, 0);

export const useCartStore = create((set, get) => ({
  items: initialItems,
  total: initialTotal,
  count: initialCount,
  
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
    saveCartToStorage(newItems);
    set({ items: newItems, total, count });
  },

  removeItem: (productId, variantName = null) => {
    const items = get().items;
    const newItems = items.filter(
      item => !(item.product.id === productId && item.selectedVariant === variantName)
    );
    const total = newItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const count = newItems.reduce((sum, item) => sum + item.quantity, 0);
    saveCartToStorage(newItems);
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
      saveCartToStorage(newItems);
      set({ items: newItems, total, count });
    }
  },

  clearCart: () => {
    saveCartToStorage([]);
    try {
      localStorage.removeItem('shopify_cart_id');
    } catch (e) {}
    set({ items: [], total: 0, count: 0 });
  }
}));
