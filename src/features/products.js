import { createSlice } from '@reduxjs/toolkit'
import { uniq, deserialize, sortOptions } from "models/filter";

const initialState = {
  data: [],
  filters: [],
  meta: {
    page: 1,
  },
}

export const SortType = Object.freeze({
  latest: "latest",
  higherPrice: "higherPrice",
  lowerPrice: "lowerPrice",
});

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    updateData: (state, action) => {
      state.data = action.payload.data
    },
    updateFilter: (state, action) => {
      const { searchParams = {} } = action.payload
      const defaultSortType = sortOptions.find(
        (it) => it.value === (searchParams.sortType || SortType.latest)
      );

      const filters = uniq([
        defaultSortType,
        {
          group: "page",
          value: searchParams.page || 1,
        },
        {
          group: "text",
          value: searchParams.text || "",
        },
        ...deserialize(searchParams),
        ...(action.payload.params || [])
      ])

      state.filters = filters
    },
    updateMeta: (state, action) => {
      state.meta = action.payload.meta
    }
  },
})

// Action creators are generated for each case reducer function
export const { updateData, updateMeta, updateFilter } = productsSlice.actions

export default productsSlice.reducer
