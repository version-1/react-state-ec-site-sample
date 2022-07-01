import style from "./index.module.css";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

const Pagination = ({ page, maxPage, totalCount, limit, onClick }) => {
  const pagination = (function () {
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
  })();

  return (
    <ul className={style.pagination}>
      {page > 1 ? (
        <li style={{ cursor: "pointer" }}>
          <IoChevronBack
            size={24}
            onClick={() => {
              onClick(page - 1);
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
            <p onClick={() => onClick(index + 1)}>{item.label}</p>
          </li>
        );
      })}
      {maxPage > page ? (
        <li style={{ cursor: "pointer" }}>
          <IoChevronForward
            size={24}
            onClick={() => {
              onClick(page + 1);
            }}
          />
        </li>
      ) : null}
    </ul>
  );
};

export default Pagination;
