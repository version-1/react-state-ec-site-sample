import { IoSearchOutline } from "react-icons/io5";
import Dropdown from "components/atoms/select";
import TagList from "components/molecules/tagList";
import SelectList from "components/molecules/selectList";
import RadioGroup from "components/molecules/radioGroup";
import {
  sortOptions,
  categoryList,
  colorList,
  priceLabels,
  sizeList,
} from "models/filter";
import SidebarSection from "components/organisms/section";
import style from "./index.module.css";

const Sidebar = ({ searchText, filters, onChangeFilters, onSearch }) => {
  const _onChangeFilters = (item) => {
    const hasFilter = filters.some((filter) => item.value === filter.value);

    if (hasFilter) {
      onChangeFilters(filters.filter((f) => item.value !== f.value));
    } else {
      onChangeFilters([...filters, item]);
    }
  };

  const _onChangeRadioGroup = (item) => {
    const _filters = filters.filter((item) => item.group !== "price");

    onChangeFilters([..._filters, item]);
  };

  return (
    <div className={style.container}>
      <div style={{ marginBottom: 16 }}>
        <div className="sidebar-section">
          <h3>キーワード検索</h3>
          <div className={style.searchForm}>
            <input
              className={style.searchFormInput}
              type="text"
              placeholder="キーワードで探す"
              value={searchText}
              onChange={onSearch}
            />
            <a href="#!" className={style.searchFormButton}>
              <IoSearchOutline size="24" color="white" />
            </a>
          </div>
        </div>
        <div className="sidebar-section">
          <h3>並び替え</h3>
          <Dropdown data={sortOptions} />
        </div>
        <div className="sidebar-section">
          <h3>フィルタ</h3>
          <TagList
            data={filters}
            emptyStateText="絞り込みなし"
            onRemoveItem={(item) => {
              onChangeFilters(filters.filter((f) => item.value !== f.value));
            }}
          />
          {filters.length > 0 ? (
            <p
              className={style.allClear}
              onClick={() => {
                onChangeFilters([]);
              }}
            >
              絞り込みを全て削除
            </p>
          ) : null}
        </div>
      </div>
      <SidebarSection
        title="カテゴリ"
        defaultOpen={filters.some((item) => item.group === "categories")}
      >
        <SelectList
          data={categoryList}
          selected={filters}
          onClick={_onChangeFilters}
        />
      </SidebarSection>
      <SidebarSection
        title="価格"
        defaultOpen={filters.some((item) => item.group === "price")}
      >
        <RadioGroup
          name="price-range"
          data={priceLabels}
          onClick={_onChangeRadioGroup}
          value={filters.find((item) => item.group === "price")?.value}
        />
      </SidebarSection>
      <SidebarSection
        title="サイズ"
        defaultOpen={filters.some((item) => item.group === "size")}
      >
        <SelectList
          data={sizeList}
          selected={filters}
          onClick={_onChangeFilters}
        />
      </SidebarSection>
      <SidebarSection
        title="カラー"
        defaultOpen={filters.some((item) => item.group === "color")}
      >
        <SelectList
          data={colorList}
          selected={filters}
          onClick={_onChangeFilters}
        />
      </SidebarSection>
    </div>
  );
};

export default Sidebar;
