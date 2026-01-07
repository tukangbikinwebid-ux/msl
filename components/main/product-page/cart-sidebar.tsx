// // components/main/product-page/cart-sidebar.tsx
// "use client";
// import React from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { X, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
// import { useRouter } from "next/navigation";
// import Image from "next/image";

// interface CartSidebarProps {
//   isOpen: boolean;
//   onClose: () => void;
//   items: any[];
//   onRemove: (id: string) => void;
// }

// const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose, items, onRemove }) => {
//   const router = useRouter();
//   const primaryBlue = "#2563EB";

//   const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <>
//           {/* Overlay */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={onClose}
//             className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100]"
//           />

//           {/* Sidebar Panel */}
//           <motion.div
//             initial={{ x: "100%" }}
//             animate={{ x: 0 }}
//             exit={{ x: "100%" }}
//             transition={{ type: "spring", damping: 25, stiffness: 200 }}
//             className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-[101] flex flex-col"
//           >
//             {/* Header */}
//             <div className="p-6 border-b border-slate-100 flex items-center justify-between">
//               <div className="flex items-center gap-3">
//                 <ShoppingBag className="w-6 h-6 text-blue-600" />
//                 <h2 className="text-xl font-bold text-slate-800">Keranjang Saya</h2>
//                 <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2.5 py-1 rounded-full">
//                   {items.length}
//                 </span>
//               </div>
//               <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
//                 <X className="w-6 h-6 text-slate-500" />
//               </button>
//             </div>

//             {/* Content List */}
//             <div className="flex-1 overflow-y-auto p-6 space-y-6">
//               {items.length > 0 ? (
//                 items.map((item) => (
//                   <div key={item.id} className="flex gap-4 group">
//                     <div className="relative w-20 h-20 rounded-xl bg-slate-100 overflow-hidden flex-shrink-0">
//                       <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
//                     </div>
//                     <div className="flex-1">
//                       <h3 className="font-bold text-slate-800 text-sm leading-tight mb-1 group-hover:text-blue-600 transition-colors">
//                         {item.name}
//                       </h3>
//                       <p className="text-blue-600 font-bold text-sm">
//                         {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(item.price)}
//                       </p>
//                       <div className="flex items-center justify-between mt-2">
//                         <span className="text-xs text-slate-500 font-medium">Qty: {item.quantity}</span>
//                         <button 
//                           onClick={() => onRemove(item.id)}
//                           className="text-red-400 hover:text-red-600 transition-colors flex items-center gap-1 text-xs"
//                         >
//                           <Trash2 className="w-3.5 h-3.5" /> Hapus
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
//                   <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center">
//                     <ShoppingBag className="w-10 h-10 text-slate-300" />
//                   </div>
//                   <p className="text-slate-500 font-medium">Wah, keranjangmu masih kosong nih.</p>
//                   <button onClick={onClose} className="text-blue-600 font-bold text-sm underline">Mulai Belanja</button>
//                 </div>
//               )}
//             </div>

//             {/* Footer / Checkout Button */}
//             {items.length > 0 && (
//               <div className="p-6 border-t border-slate-100 bg-slate-50/50">
//                 <div className="flex items-center justify-between mb-6">
//                   <span className="text-slate-500 font-medium">Subtotal</span>
//                   <span className="text-2xl font-extrabold text-slate-900">
//                      {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(subtotal)}
//                   </span>
//                 </div>
//                 <button
//                   onClick={() => {
//                     onClose();
//                     router.push("/checkout");
//                   }}
//                   className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl text-white font-bold transition-all shadow-lg hover:shadow-blue-200 hover:-translate-y-0.5 active:scale-95"
//                   style={{ background: primaryBlue }}
//                 >
//                   Checkout Sekarang <ArrowRight className="w-5 h-5" />
//                 </button>
//                 <p className="text-center text-[11px] text-slate-400 mt-4">
//                   Pajak dan biaya pengiriman dihitung saat checkout.
//                 </p>
//               </div>
//             )}
//           </motion.div>
//         </>
//       )}
//     </AnimatePresence>
//   );
// };

// export default CartSidebar;

// hooks/use-cart.ts
import { create } from 'zustand';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

interface CartStore {
  cartItems: CartItem[];
  isOpen: boolean;
  open: () => void;
  close: () => void;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
}

const useCart = create<CartStore>((set) => ({
  // Data Dummy untuk Preview
  cartItems: [
    {
      id: "1",
      name: "Website Company Profile Corporate",
      price: 6000000,
      quantity: 1,
      imageUrl: "/sample-image.png",
    },
    {
      id: "2",
      name: "E-Commerce Beauty Store",
      price: 3500000,
      quantity: 1,
      imageUrl: "/sample-image.png",
    },
  ],
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  addItem: (item) => set((state) => ({ cartItems: [...state.cartItems, item] })),
  removeItem: (id) => set((state) => ({
    cartItems: state.cartItems.filter((i) => i.id !== id)
  })),
}));

export default useCart;