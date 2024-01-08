/** 검색 필터 커스텀훅 */
import { useState, useEffect } from "react";

interface Searchable {
  [key: string]: any;
}

export const useSearchFilter = <T extends Searchable>(
  items: T[],
  searchKeyword: string,
  searchFields: (keyof T)[]
) => {
  const [filteredItems, setFilteredItems] = useState<T[]>([]);

  useEffect(() => {
    if (!searchKeyword.trim()) {
      setFilteredItems(items);
    } else {
      const keyword = searchKeyword.toLowerCase().toString;
      const filtered = items.filter((item) =>
        searchFields.some(
          (field) =>
            item[field] &&
            item[field].toString().toLowerCase().includes(keyword)
        )
      );

      // 최적화: 현재 상태와 동일하면 업데이트하지 않음
      if (!arraysAreEqual(filtered, filteredItems)) {
        setFilteredItems(filtered);
      }
    }
  }, [items, searchKeyword, searchFields, filteredItems]);

  // 배열이 같은지 확인하는 함수
  const arraysAreEqual = (arr1: any[], arr2: any[]) => {
    return (
      arr1.length === arr2.length &&
      arr1.every((value, index) => value === arr2[index])
    );
  };

  useEffect(() => {
    console.log(searchKeyword);
  }, [searchKeyword]);

  return filteredItems;
};
