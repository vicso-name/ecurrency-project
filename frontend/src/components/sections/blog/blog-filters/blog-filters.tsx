'use client';

import { useEffect, useMemo, useRef, useState, useTransition } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type { CategoryData } from '@/types/strapi/category';
import type { BlogPageData } from '@/types/strapi/blog-page';

type BlogFiltersProps = {
  categories: CategoryData[];
  blogPage: BlogPageData | null;
};

function SearchIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M21.0002 21L16.6602 16.66"
        stroke="#E1E1E1"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
        stroke="#E1E1E1"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SelectIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
      className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
    >
      <circle cx="13" cy="13" r="12.5" stroke="black" strokeOpacity="0.14" />
      <path
        d="M8.125 11.3125L13 16.1875L17.875 11.3125"
        stroke="black"
        strokeWidth="1.125"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="10" viewBox="0 0 12 10" fill="none">
      <path
        d="M1 5L4.2 8.2L11 1.5"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function arraysEqual(a: string[], b: string[]) {
  if (a.length !== b.length) {
    return false;
  }

  const sortedA = [...a].sort();
  const sortedB = [...b].sort();

  return sortedA.every((item, index) => item === sortedB[index]);
}

export function BlogFilters({ categories, blogPage }: BlogFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const lastSubmittedSearchRef = useRef((searchParams.get('search') || '').trim());

  const currentSearch = (searchParams.get('search') || '').trim();

  const currentCategories = useMemo(() => {
    return (searchParams.get('categories') || '')
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
  }, [searchParams]);

  const [searchValue, setSearchValue] = useState(currentSearch);
  const [isOpen, setIsOpen] = useState(false);
  const [pendingCategories, setPendingCategories] = useState<string[]>(currentCategories);

  useEffect(() => {
    if (currentSearch !== lastSubmittedSearchRef.current) {
      setSearchValue(currentSearch);
      lastSubmittedSearchRef.current = currentSearch;
    }
  }, [currentSearch]);

  useEffect(() => {
    setPendingCategories(currentCategories);
  }, [currentCategories]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!dropdownRef.current) {
        return;
      }

      if (!dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setPendingCategories(currentCategories);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [currentCategories]);

  const buildUrl = (next: { search?: string; categories?: string[] }) => {
    const params = new URLSearchParams(searchParams.toString());

    if (next.search !== undefined) {
      const trimmedSearch = next.search.trim();

      if (trimmedSearch) {
        params.set('search', trimmedSearch);
      } else {
        params.delete('search');
      }
    }

    if (next.categories !== undefined) {
      const cleanedCategories = next.categories.map((item) => item.trim()).filter(Boolean);

      if (cleanedCategories.length > 0) {
        params.set('categories', cleanedCategories.join(','));
      } else {
        params.delete('categories');
      }
    }

    const queryString = params.toString();

    return queryString ? `${pathname}?${queryString}` : pathname;
  };

  const pushIfChanged = (nextUrl: string) => {
    const currentUrl = searchParams.toString() ? `${pathname}?${searchParams.toString()}` : pathname;

    if (nextUrl === currentUrl) {
      return;
    }

    startTransition(() => {
      router.push(nextUrl);
    });
  };

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const trimmedSearchValue = searchValue.trim();

      if (trimmedSearchValue === currentSearch) {
        return;
      }

      lastSubmittedSearchRef.current = trimmedSearchValue;

      const nextUrl = buildUrl({
        search: trimmedSearchValue,
        categories: currentCategories,
      });

      pushIfChanged(nextUrl);
    }, 400);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [searchValue, currentSearch, currentCategories, pathname, searchParams]);

  const togglePendingCategory = (slug: string) => {
    setPendingCategories((prev) => {
      if (prev.includes(slug)) {
        return prev.filter((item) => item !== slug);
      }

      return [...prev, slug];
    });
  };

  const handleApply = () => {
    const nextUrl = buildUrl({
      search: searchValue.trim(),
      categories: pendingCategories,
    });

    pushIfChanged(nextUrl);
    setIsOpen(false);
  };

  const handleClearAll = () => {
    lastSubmittedSearchRef.current = '';
    setSearchValue('');
    setPendingCategories([]);
    setIsOpen(false);
    pushIfChanged(pathname);
  };

  const appliedTitles = categories
    .filter((category) => currentCategories.includes(category.slug))
    .map((category) => category.title);

  const triggerLabel =
    appliedTitles.length > 0
      ? appliedTitles.length === 1
        ? appliedTitles[0]
        : `${appliedTitles.length} categories selected`
      : blogPage?.categoryPlaceholder || 'Select a category';

  const hasPendingCategoryChanges = !arraysEqual(pendingCategories, currentCategories);

  return (
    <div className="mx-auto mt-10 flex max-w-[980px] flex-col gap-4 md:flex-row md:items-start md:justify-center">
      <div className="flex w-full items-center gap-[6px] rounded-[240px] bg-white px-5 py-3 md:max-w-[692px]">
        <SearchIcon />

        <input
          type="text"
          value={searchValue}
          placeholder={blogPage?.searchPlaceholder || 'Search'}
          onChange={(e) => setSearchValue(e.target.value)}
          className="w-full bg-transparent text-[16px] font-semibold leading-[30px] text-black outline-none placeholder:text-[rgba(0,0,0,0.24)]"
          aria-label={blogPage?.searchPlaceholder || 'Search'}
        />
      </div>

      <div ref={dropdownRef} className="relative w-full md:max-w-[371px]">
        <button
          type="button"
          onClick={() => {
            setPendingCategories(currentCategories);
            setIsOpen((prev) => !prev);
          }}
          className="flex w-full items-center justify-between gap-4 rounded-[240px] border border-white bg-[rgba(255,255,255,0.40)] px-5 py-3 text-left"
          aria-haspopup="dialog"
          aria-expanded={isOpen}
        >
          <span className="truncate text-[16px] font-semibold leading-[30px] text-black">
            {triggerLabel}
          </span>

          <span className="shrink-0">
            <SelectIcon isOpen={isOpen} />
          </span>
        </button>

        {isOpen ? (
          <div className="absolute left-0 top-[calc(100%+16px)] z-30 flex w-full flex-col items-start gap-12 rounded-[20px] bg-white p-6 shadow-[0_2px_12px_0_rgba(0,0,0,0.12)]">
            <div className="flex w-full flex-col items-start gap-6">
              {categories.map((category) => {
                const isChecked = pendingCategories.includes(category.slug);

                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => togglePendingCategory(category.slug)}
                    className="flex items-center gap-5 text-left"
                  >
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-[6px] border transition-colors ${
                        isChecked
                          ? 'border-[#EC0000] bg-[#EC0000]'
                          : 'border-[rgba(32,32,32,0.16)] bg-white'
                      }`}
                    >
                      {isChecked ? <CheckIcon /> : null}
                    </span>

                    <span className="text-[16px] font-semibold leading-6 text-black">
                      {category.title}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="flex w-full flex-col gap-3">
              <button
                type="button"
                onClick={handleApply}
                disabled={!hasPendingCategoryChanges || isPending}
                className="flex h-[53px] w-full items-center justify-center gap-[10px] rounded-[60px] bg-[#EC0000] px-6 text-center text-[15px] font-medium leading-9 capitalize text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
              >
                Apply
              </button>

              <button
                type="button"
                onClick={handleClearAll}
                className="flex h-[53px] w-full items-center justify-center gap-[10px] rounded-[60px] border border-[rgba(32,32,32,0.07)] bg-[rgba(32,32,32,0.02)] text-center text-[15px] font-normal leading-9 capitalize text-[#202020] backdrop-blur-[12px]"
              >
                {blogPage?.clearAllLabel || 'Clear All'}
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}