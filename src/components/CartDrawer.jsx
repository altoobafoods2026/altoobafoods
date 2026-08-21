import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { formatPrice } from '../utils/formatPrice';

export default function CartDrawer({ isOpen, onClose }) {
  const items = useCartStore((state) => state.items);
  const updateQty = useCartStore((state) => state.updateQty);
  const removeItem = useCartStore((state) => state.removeItem);
  
  const total = useCartStore((state) => state.total);
  const count = useCartStore((state) => state.count);

  // Prevent background scrolling when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#0d2018]/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md h-full bg-parchment border-l border-forest/10 shadow-2xl flex flex-col justify-between z-10 animate-fade-up">
        {/* Header */}
        <div className="p-6 border-b border-forest/10 flex items-center justify-between">
          <h2 className="font-serif font-bold text-2xl text-forest">Your Journey ({count})</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-forest hover:bg-forest/5 focus:outline-none cursor-pointer"
            aria-label="Close cart"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items List */}
        <div className="flex-grow overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="text-center py-20">
              <svg className="w-16 h-16 text-muted-green mx-auto mb-4 stroke-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              <h3 className="font-serif text-lg text-forest font-semibold mb-2">Your cart is empty</h3>
              <p className="text-sm text-forest/60 mb-6">Begin your wellness journey by adding botanical remedies.</p>
              <button
                onClick={onClose}
                className="rounded-full px-6 py-2.5 bg-forest text-parchment text-xs uppercase tracking-wider font-bold hover:bg-[#2b4c29] transition-colors cursor-pointer"
              >
                Explore Remedies
              </button>
            </div>
          ) : (
            items.map((item, idx) => {
              const variantObj = item.selectedVariant && item.product.variants?.find(v => (v.name === item.selectedVariant || v.title === item.selectedVariant));
              const itemThumb = variantObj?.image || item.product.images[0];

              return (
                <div key={idx} className="flex gap-4 border-b border-forest/5 pb-4">
                  {/* Product Image */}
                  <div className="w-20 h-20 rounded-xl bg-[#FAF7F2] p-1 overflow-hidden flex-shrink-0 flex items-center justify-center border border-forest/5">
                    <img src={itemThumb} alt={item.product.name} className="w-full h-full object-contain mix-blend-multiply" />
                  </div>

                  {/* Details */}
                  <div className="flex-grow flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="font-serif font-bold text-base text-forest leading-tight line-clamp-1">{item.product.name}</h4>
                        <button
                          onClick={() => removeItem(item.product.id, item.selectedVariant)}
                          className="text-[#7a2020] hover:opacity-85 text-xs font-semibold cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                      {item.selectedVariant && (
                        <p className="text-xs text-[#c8a86a] font-sans font-bold mt-0.5">Option: {item.selectedVariant}</p>
                      )}
                    </div>

                  <div className="flex justify-between items-center mt-2">
                    {/* Quantity Selector */}
                    <div className="flex items-center border border-forest/15 rounded-full overflow-hidden">
                      <button
                        onClick={() => updateQty(item.product.id, item.quantity - 1, item.selectedVariant)}
                        className="px-2.5 py-1 text-forest hover:bg-forest/5 font-bold focus:outline-none"
                      >
                        -
                      </button>
                      <span className="px-2 text-sm text-forest font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateQty(item.product.id, item.quantity + 1, item.selectedVariant)}
                        className="px-2.5 py-1 text-forest hover:bg-forest/5 font-bold focus:outline-none"
                      >
                        +
                      </button>
                    </div>

                    <span className="font-serif font-bold text-forest text-base">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                </div>
              </div>
            );
          })
          )}
        </div>

        {/* Footer Area */}
        {items.length > 0 && (
          <div className="p-6 border-t border-forest/10 bg-warm-light">
            <div className="flex justify-between items-baseline mb-4">
              <span className="text-sm uppercase tracking-wider text-forest/70 font-semibold">Subtotal</span>
              <span className="text-2xl font-serif font-bold text-forest">{formatPrice(total)}</span>
            </div>
            <p className="text-xs text-forest/60 mb-6">Taxes and shipping computed at checkout.</p>
            <div className="space-y-3">
              <Link
                to="/checkout"
                onClick={onClose}
                className="block text-center w-full rounded-full py-4 text-xs font-sans font-bold uppercase tracking-wider bg-forest text-parchment hover:bg-[#2b4c29] transition-colors cursor-pointer"
              >
                Proceed to Checkout
              </Link>
              <Link
                to="/cart"
                onClick={onClose}
                className="block text-center w-full rounded-full py-4 text-xs font-sans font-bold uppercase tracking-wider border border-forest/20 text-forest hover:bg-forest/5 transition-colors cursor-pointer"
              >
                View Cart Details
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
