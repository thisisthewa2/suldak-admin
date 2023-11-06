/** 검색 필터 커스텀훅 */
// useSearchFilter.ts
import { useState, useEffect } from 'react';

interface Searchable {
  [key: string]: any;
}

// 검색 가능한 아이템의 배열과 검색 키워드, 검색을 수행할 필드 이름을 인자로 받는 훅입니다.
export const useSearchFilter = <T extends Searchable>(
  items: T[],
  searchKeyword: string,
  searchField: keyof T
) => {
  const [filteredItems, setFilteredItems] = useState<T[]>([]);

  useEffect(() => {
    if (!searchKeyword.trim()) {
      setFilteredItems(items);
    } else {
      const keyword = searchKeyword.toLowerCase();
      const filtered = items.filter(item => item[searchField].toLowerCase().includes(keyword));
      setFilteredItems(filtered);
    }
  }, [items, searchKeyword, searchField]);

  return filteredItems;
};
