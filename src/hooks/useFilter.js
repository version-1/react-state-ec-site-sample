import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import qs from "qs";
import { uniq, serialize, sort, deserialize, sortOptions } from "models/filter";
import { fetchProducts } from "services/api";

export const SortType = Object.freeze({
  latest: "latest",
  higherPrice: "higherPrice",
  lowerPrice: "lowerPrice",
});

export const useFilter = () => {
  const [meta, setMeta] = useState({});
  const [data, setData] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const defaultSortType = sortOptions.find(
    (it) => it.value === (searchParams.get("sortType") || SortType.latest)
  );

  const [filters, setFilters] = useState(() =>
    uniq([
      defaultSortType,
      {
        group: "page",
        value: searchParams.get("page") || 1,
      },
      {
        group: "text",
        value: searchParams.get("text") || "",
      },
      ...deserialize(decodeURIComponent(searchParams.toString())),
    ])
  );

  const serializedFilters = useMemo(() => serialize(filters), [filters]);
  const tags = useMemo(
    () =>
      filters.filter((item) =>
        ["price", "categories", "size", "color"].includes(item.group)
      ),
    [filters]
  );

  const fetch = useCallback(
    async (params = {}, reset = false) => {
      const _params = reset
        ? {
            ...params,
          }
        : {
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
      if (maxPage < serializedFilters.page) {
        return add([
          {
            group: "page",
            value: maxPage,
          },
        ]);
      }

      const { sortType } = params;
      const sortedData = sort(sortType, data);

      setMeta({ ...rest, maxPage });
      setData(sortedData);
    },
    [serializedFilters, setMeta, setData]
  );

  const update = useCallback(
    async (params, reset = false) => {
      const _params = uniq(params);
      setFilters(_params);

      const serializedParams = serialize(_params);
      setSearchParams(qs.stringify(serializedParams));

      await fetch(serializedParams, reset);
    },
    [fetch, setFilters, setSearchParams]
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
