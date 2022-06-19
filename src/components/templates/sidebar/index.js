import Dropdown from "components/atoms/select";
import TagList from "components/molecules/tagList";
import SelectList from "components/molecules/selectList";
import RadioGroup from "components/molecules/radioGroup";
import SidebarSection from "components/organisms/section";
import style from "./index.module.css";

const sortOptions = [
  { label: "新着順", value: "latest" },
  { label: "価格の高い順", value: "higher-price" },
  { label: "価格の安い順", value: "lower-price" },
];

const categoryList = [
  {
    label: "Men's",
    value: "men",
  },
  {
    label: "Women's",
    value: "women",
  },
  {
    label: "コート",
    value: "coats",
  },
  {
    label: "T シャツ",
    code: "t-shirts",
  },
  {
    label: "ジーンズ",
    value: "jeans",
  },
  {
    label: "ボトムス",
    value: "shorts",
  },
  {
    label: "その他（アクセサリ・ベルト）",
    value: "others",
  },
];

const priceLabels = [
  {
    label: "¥0 ~ 5,000",
    value: { min: 0, max: 5000 },
  },
  {
    label: "¥5,000 ~ 10,000",
    value: { min: 5000, max: 10000 },
  },
  {
    label: "¥10,000 ~ 20,000",
    value: { min: 10000, max: 20000 },
  },
  {
    label: "¥20,000 ~ 30,000",
    value: { min: 20000, max: 30000 },
  },
  {
    label: "¥30,000 ~ 40,000",
    value: { min: 30000, max: 40000 },
  },
  {
    label: "¥40,000 ~ 50,000",
    value: { min: 40000, max: 50000 },
  },
  {
    label: "¥50,000 ~ ",
    value: { min: 50000, max: Infinity },
  },
];

const sizeList = [
  {
    label: "XS",
    value: "xs",
  },
  {
    label: "S",
    value: "s",
  },
  {
    label: "M",
    value: "m",
  },
  {
    label: "L",
    value: "l",
  },
  {
    label: "XL",
    value: "xl",
  },
];

const colorList = [
  {
    label: "レッド",
    value: "red",
  },
  {
    label: "ネイビー",
    value: "navy",
  },
  {
    label: "グレー",
    value: "gray",
  },
  {
    label: "ブラック",
    value: "black",
  },
  {
    label: "ホワイト",
    value: "white",
  },
];

const Sidebar = ({ filters, onChangeFilters }) => {
  const _onChangeFilters = (item) => {
    const hasFilter = filters.some((filter) => item.value === filter.value);

    if (hasFilter) {
      onChangeFilters(filters.filter((f) => item.value !== f.value));
    } else {
      onChangeFilters([...filters, item]);
    }
  };

  return (
    <div className={style.container}>
      <div style={{ marginBottom: 16 }}>
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
        </div>
      </div>
      <SidebarSection title="カテゴリ">
        <SelectList
          data={categoryList}
          selected={filters}
          onClick={_onChangeFilters}
        />
      </SidebarSection>
      <SidebarSection title="価格">
        <RadioGroup name="price-range" data={priceLabels} />
      </SidebarSection>
      <SidebarSection title="サイズ">
        <SelectList
          data={sizeList}
          selected={filters}
          onClick={_onChangeFilters}
        />
      </SidebarSection>
      <SidebarSection title="カラー">
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
