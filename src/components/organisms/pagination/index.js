import style from "./index.module.css";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { useFilter } from "hooks/useFilter";

const calcIndex = ({ totalCount, limit }) => {
  const res = [];
  let i = 0;
  let _page = 1;
  while (i < totalCount) {
    res.push({
      label: _page,
      value: _page,
      active: false,
    });

    _page = _page + 1;
    i = i + limit;
  }

  return res;
};

const Pagination = () => {
  const { meta = {}, paginate } = useFilter();
  const { page, maxPage, totalCount, limit } = meta;
  const pagination = calcIndex({ totalCount, limit });

  return (
    <ul className={style.pagination}>
      {page > 1 ? (
        <li style={{ cursor: "pointer" }}>
          <IoChevronBack
            size={24}
            onClick={() => {
              paginate(page - 1);
            }}
          />
        </li>
      ) : null}
      {pagination.map((item, index) => {
        return (
          <li
            key={`paigination-${item.label}`}
            className={[
              style.paginationItem,
              String(page) === String(item.value)
                ? style.paginationActiveItem
                : undefined,
            ].join(" ")}
          >
            <p onClick={() => paginate(index + 1)}>{item.label}</p>
          </li>
        );
      })}
      {maxPage > page ? (
        <li style={{ cursor: "pointer" }}>
          <IoChevronForward
            size={24}
            onClick={() => {
              paginate(page + 1);
            }}
          />
        </li>
      ) : null}
    </ul>
  );
};

export default Pagination;
