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
