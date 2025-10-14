import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_GETALL_CATEGORY } from "../../api/api";
import type { Category } from "../../utils/types";

const BASE_URL = API_GETALL_CATEGORY;

//Lấy tất cả danh mục
export const getAllCategory = createAsyncThunk("category/getAll", async () => {
  const res = await axios.get(BASE_URL);
  return res.data;
});

//Thêm mới danh mục
export const addCategory = createAsyncThunk(
  "category/add",
  async (new_category: Category) => {
    const res = await axios.post(BASE_URL, new_category);
    return res.data;
  }
);

//Cập nhật danh mục
export const updateCategory = createAsyncThunk(
  "category/update",
  async (updatedCategory: Category) => {
    const res = await axios.put(`${BASE_URL}/${updatedCategory.id}`, updatedCategory);
    return res.data;
  }
);

//Xóa danh mục
export const deleteCategory = createAsyncThunk(
  "category/delete",
  async (id: number) => {
    await axios.delete(`${BASE_URL}/${id}`);
    return id;
  }
);

const CategorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [] as Category[],
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      //GET ALL
      .addCase(getAllCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(getAllCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Không thể tải danh mục";
      })

      //ADD
      .addCase(addCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories.push(action.payload);
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Thêm danh mục thất bại";
      })

      //UPDATE
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.categories.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) state.categories[index] = action.payload;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Cập nhật danh mục thất bại";
      })

      //DELETE
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = state.categories.filter(
          (item) => item.id !== action.payload
        );
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Xóa danh mục thất bại";
      });
  },
});

export default CategorySlice.reducer;