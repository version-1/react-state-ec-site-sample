import { useCallback, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import qs from "qs";
import { uniq, serialize, sort } from "models/filter";
import { fetchProducts } from "services/api";
import { updateData, updateFilter, updateMeta } from "features/products";

export const SortType = Object.freeze({
  latest: "latest",
  higherPrice: "higherPrice",
  lowerPrice: "lowerPrice",
});

export const useFilter = () => {
  const dispatch = useDispatch();
  const { meta, data, filters } = useSelector((state) => state.products);
  const [searchParams, setSearchParams] = useSearchParams();

  const serializedFilters = useMemo(() => serialize(filters), [filters]);
  const tags = useMemo(
    () =>
      filters.filter((item) =>
        ["price", "categories", "size", "color"].includes(item.group)
      ),
    [filters]
  );

  useEffect(() => {
    dispatch(updateFilter({ searchParams: qs.parse(searchParams.toString()) }));
  }, [dispatch, searchParams]);

  const fetch = useCallback(
    async (params = {}) => {
      const _params = {
        ...serializedFilters,
        ...params,
      };
      const res = await fetchProducts(_params);
      if (!res.data) {
        return;
      }

      const { data, ...rest } = res;
      const { limit, totalCount } = rest;

      const maxPage = Math.floor(totalCount / limit) + 1;
      const { sortType } = params;
      const sortedData = sort(sortType, data);

      dispatch(updateMeta({ meta: { ...rest, maxPage } }));
      dispatch(updateData({ data: sortedData }));
    },
    [dispatch, serializedFilters]
  );

  const update = useCallback(
    async (params) => {
      const _params = uniq(params);
      dispatch(updateFilter({ params: _params }));

      const serializedParams = serialize(_params);
      setSearchParams(qs.stringify(serializedParams));

      const res = await fetch(serializedParams);
      if (!res) {
        return
      }

      const { limit, totalCount } = res;
      const maxPage = Math.floor(totalCount / limit) + 1;
      if (maxPage < serializedFilters.page) {
        return update([
          ..._params,
          {
            group: "page",
            value: maxPage,
          },
        ]);
      }
    },
    [dispatch, fetch, setSearchParams, serializedFilters.page]
  );

  const reset = useCallback(() => {
    update(
      [
        {
          group: "page",
          value: 1,
        },
        {
          group: "text",
          value: "",
        },
      ],
      true
    );
  }, [update]);

  const has = useCallback(
    (target) => {
      return !!filters.find(
        (item) => item.group === target.group && item.value === target.value
      );
    },
    [filters]
  );

  const add = useCallback(
    (item) => {
      update([...filters, item]);
    },
    [update, filters]
  );

  const remove = useCallback(
    (target) => {
      const _filters = filters.filter(
        (item) => !(item.group === target.group && item.value === target.value)
      );

      update(_filters);
    },
    [update, filters]
  );

  const search = useCallback(
    (value) => {
      add({
        group: "text",
        value,
      });
    },
    [add]
  );

  const paginate = useCallback(
    (value) => {
      add({
        group: "page",
        value,
      });
    },
    [add]
  );

  return {
    data,
    meta,
    fetch,
    filters,
    tags,
    update,
    has,
    add,
    remove,
    search,
    paginate,
    reset,
  };
};
