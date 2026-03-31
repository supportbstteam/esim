// store/cartSlice.ts
import { api } from "@/lib/api";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// Types
export interface Plan {
  id: string;
  name: string;
  price: number;
  validityDays: number;
}

export interface CartItem {
  id: string;
  plan: Plan;
  quantity: number;
}

export interface Cart {
  id: string;
  user: { id: string };
  items: CartItem[];
  isCheckedOut: boolean;
}

interface AddToCartResponse {
  cart: Cart;
  addedPlans: { planId: string }[] | null;
  failedPlans: { planId: string; reason: string }[] | null;
}

interface CartState {
  cart: Cart | null;
  failedPlans:
    | null
    | {
        planId: string;
        reason: string;
      }[];
  addedPlans:
    | null
    | {
        planId: string;
      }[];
  loading: boolean;
  error: string | null;
}

// Initial State
const initialState: CartState = {
  failedPlans: null,
  addedPlans: null,
  cart: null,
  loading: false,
  error: null,
};

// Async Thunks
export const fetchCart = createAsyncThunk<Cart>(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const data = await api<{ cart: Cart }>({
        url: "/user/add-to-cart/",
        method: "GET",
      });
      // console.log("----- data in teh fetch cart -----", data);
      return data.cart;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  },
);

export const addToCart = createAsyncThunk<
  AddToCartResponse,
  { planId: string; quantity?: number }[]
>("cart/addToCart", async (plans, { rejectWithValue }) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data: any = await api({
      url: "/user/add-to-cart/create",
      method: "POST",
      data: { plans }, // 🔹 wrap in object to match backend
    });

    console.log("---- response int the add to cart ----", data);
    return {
      cart: data.cart,
      addedPlans: data?.addedPlans || null,
      failedPlans: data?.failedPlans || null,
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    // console.error("----- error in add to cart -----", err);
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const updateCartItem = createAsyncThunk<
  CartItem,
  { cartItemId: string; quantity: number }
>(
  "cart/updateCartItem",
  async ({ cartItemId, quantity }, { rejectWithValue }) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data: any = await api({
        url: `/user/add-to-cart/update/${cartItemId}`,
        method: "PUT",
        data: { quantity }, // ❌ TypeScript thinks { quantity } !== { cartItem: CartItem }
      });

      console.log("----- response in the update cart items -----", data);

      return data.cartItem;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  },
);

export const removeCartItem = createAsyncThunk<string, string>(
  "cart/removeCartItem",
  async (cartItemId, { rejectWithValue }) => {
    try {
      await api({
        url: `/user/add-to-cart/delete/${cartItemId}`,
        method: "DELETE",
      });
      return cartItemId;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  },
);

export const removeWholeCart = createAsyncThunk<void, void>(
  "cart/removeWholeCart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api({
        url: "/user/add-to-cart/remove-cart",
        method: "DELETE",
      });

      console.log("----- response in remove whole cart -----", response);
    } catch (err: any) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  },
);

// Slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cart = null;
      state.addedPlans = null;
      state.failedPlans = null;
      state.loading = false;
      state.error = null;
    },
    clearAddToCartState: (state) => {
      state.failedPlans = null;
      state.addedPlans = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch Cart
    builder.addCase(fetchCart.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      fetchCart.fulfilled,
      (state, action: PayloadAction<Cart>) => {
        state.cart = action.payload;
        state.loading = false;
      },
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    builder.addCase(fetchCart.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(removeWholeCart.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(removeWholeCart.fulfilled, (state) => {
      state.cart = null;
      state.addedPlans = null;
      state.failedPlans = null;
      state.loading = false;
    });

    // Add to Cart
    builder.addCase(addToCart.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(
      addToCart.fulfilled,
      (state, action: PayloadAction<AddToCartResponse>) => {
        state.cart = action.payload.cart;
        state.addedPlans = action.payload.addedPlans;
        state.failedPlans = action.payload.failedPlans;
        state.loading = false;
      },
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    builder.addCase(addToCart.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Update Cart Item
    builder.addCase(
      updateCartItem.fulfilled,
      (state, action: PayloadAction<CartItem>) => {
        if (!state.cart) return;
        const index = state.cart.items.findIndex(
          (i) => i.id === action.payload.id,
        );
        if (index !== -1) state.cart.items[index] = action.payload;
      },
    );

    // Remove Cart Item
    builder.addCase(
      removeCartItem.fulfilled,
      (state, action: PayloadAction<string>) => {
        if (!state.cart) return;
        state.cart.items = state.cart.items.filter(
          (i) => i.id !== action.payload,
        );
      },
    );
  },
});

export const { clearCart,clearAddToCartState } = cartSlice.actions;
export default cartSlice.reducer;
