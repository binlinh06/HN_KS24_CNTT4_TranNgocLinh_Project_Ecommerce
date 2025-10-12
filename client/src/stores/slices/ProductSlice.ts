import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_GETALL_PRODUCT } from "../../api/api";
import type { Product } from "../../utils/types";

const BASE_URL = API_GETALL_PRODUCT;

// 🟢 Lấy tất cả sản phẩm
export const getAllProduct = createAsyncThunk("product/getAll", async () => {
  const res = await axios.get(BASE_URL);
  return res.data;
});

// 🟢 Thêm mới sản phẩm
export const addProduct = createAsyncThunk(
  "product/add",
  async (new_product: Product) => {
    const res = await axios.post(BASE_URL, new_product);
    return res.data;
  }
);

// 🟢 Cập nhật sản phẩm
export const updateProduct = createAsyncThunk(
  "product/update",
  async (updatedProduct: Product) => {
    const res = await axios.put(`${BASE_URL}/${updatedProduct.id}`, updatedProduct);
    return res.data;
  }
);

// 🟢 Xóa sản phẩm
export const deleteProduct = createAsyncThunk(
  "product/delete",
  async (id: number) => {
    await axios.delete(`${BASE_URL}/${id}`);
    return id;
  }
);

const ProductSlice = createSlice({
  name: "product",
  initialState: {
    products: [] as Product[],
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET ALL
      .addCase(getAllProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getAllProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Không thể tải sản phẩm";
      })

      // ADD
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Thêm sản phẩm thất bại";
      })

      // UPDATE
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.products.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) state.products[index] = action.payload;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Cập nhật sản phẩm thất bại";
      })

      // DELETE
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter(
          (item) => item.id !== action.payload
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Xóa sản phẩm thất bại";
      });
  },
});

export default ProductSlice.reducer;
