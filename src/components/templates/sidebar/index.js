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
import { useFilter } from "hooks/useFilter";

const Sidebar = () => {
  const { filters, tags, search, reset, has, add, remove } = useFilter();
  const searchText = filters.find((el) => el.group === "text")?.value;
  const sortType = filters.find((el) => el.group === "sortType");

  const onSelect = (item) => {
    if (has(item)) {
      remove(item);
    } else {
      add(item);
    }
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
              onChange={(e) => search(e.target.value)}
            />
          </div>
        </div>
        <div className="sidebar-section">
          <h3>並び替え</h3>
          <Dropdown data={sortOptions} onSelect={onSelect} value={sortType} />
        </div>
        <div className="sidebar-section">
          <h3>フィルタ</h3>
          <TagList
            data={tags}
            emptyStateText="絞り込みなし"
            onRemoveItem={remove}
          />
          {tags.length > 0 ? (
            <p className={style.allClear} onClick={reset}>
              絞り込みを全て削除
            </p>
          ) : null}
        </div>
      </div>
      <SidebarSection
        title="カテゴリ"
        defaultOpen={tags.some((item) => item.group === "categories")}
      >
        <SelectList data={categoryList} selected={filters} onClick={onSelect} />
      </SidebarSection>
      <SidebarSection
        title="価格"
        defaultOpen={tags.some((item) => item.group === "price")}
      >
        <RadioGroup
          name="price-range"
          data={priceLabels}
          onClick={onSelect}
          value={tags.find((item) => item.group === "price")?.value}
        />
      </SidebarSection>
      <SidebarSection
        title="サイズ"
        defaultOpen={tags.some((item) => item.group === "size")}
      >
        <SelectList data={sizeList} selected={tags} onClick={onSelect} />
      </SidebarSection>
      <SidebarSection
        title="カラー"
        defaultOpen={tags.some((item) => item.group === "color")}
      >
        <SelectList data={colorList} selected={tags} onClick={onSelect} />
      </SidebarSection>
    </div>
  );
};

export default Sidebar;
