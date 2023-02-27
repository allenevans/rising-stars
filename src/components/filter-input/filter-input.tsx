import cn from 'classnames';
import type { FocusEventHandler, KeyboardEventHandler } from 'react';
import React, { useCallback, useRef } from 'react';
import { Tag } from '../tag';
import type { Filter } from './filter';
import * as styles from './filter-input.module.css';
import { mergeFilters, parseStringToFilter } from './filter-utils';

const DEFAULT_INPUT_SIZE = 20;

export interface FilterInputProps {
  className?: string;

  filter?: Filter;

  onChange?: (filter: Filter) => void;
}

export const FilterInput: React.FC<FilterInputProps> = ({ className, filter, onChange }: FilterInputProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFilterRemove = useCallback(
    (key: keyof Filter, value?: string) => {
      const nextFilter = { ...filter } as Filter;

      if (key === 'favourites') {
        nextFilter.favourites = false;
      }

      if (key === 'languages' && filter?.languages) {
        nextFilter.languages = filter.languages.filter((lang) => lang !== value);
      }

      if (key === 'since') {
        nextFilter.since = undefined;
      }

      onChange?.(nextFilter);
    },
    [filter, onChange],
  );

  const processInput = useCallback(
    (value: string) => {
      if (!value.trim()) {
        return;
      }

      const inputFilter = parseStringToFilter(value);
      onChange?.(mergeFilters(filter, inputFilter));
    },
    [filter, onChange],
  );

  const handleBlur: FocusEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      if (!inputRef.current) {
        return;
      }

      processInput(event.target.value);

      inputRef.current.size = DEFAULT_INPUT_SIZE;
      inputRef.current.value = '';
    },
    [processInput],
  );

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      console.log(event, inputRef.current?.value);

      if (!inputRef.current) {
        return;
      }

      if (event.key === 'Escape') {
        inputRef.current.size = DEFAULT_INPUT_SIZE;
        inputRef.current.value = '';
      }

      if (event.key === 'Enter' || event.key === 'NumpadEnter') {
        const { value } = inputRef.current;
        processInput(value);

        inputRef.current.size = DEFAULT_INPUT_SIZE;
        inputRef.current.value = '';
      }
    },
    [processInput],
  );

  return (
    <div className={cn(styles.filterInput, className)}>
      <ul className={styles.filterPills}>
        {filter?.since && (
          <li>
            <Tag className={styles.pill} onClick={handleFilterRemove.bind(null, 'since')}>
              {filter.since.toLocaleDateString()} | x
            </Tag>
          </li>
        )}

        {filter?.favourites && (
          <li>
            <Tag className={styles.pill} onClick={handleFilterRemove.bind(null, 'favourites')}>
              Favourites | x
            </Tag>
          </li>
        )}

        {filter?.languages?.map((lang) => (
          <li key={lang}>
            <Tag className={styles.pill} onClick={handleFilterRemove.bind(null, 'languages', lang)}>
              {lang} | x
            </Tag>
          </li>
        ))}
      </ul>
      <div className={styles.inputContainer}>
        <label>
          &gt;
          <input
            type="text"
            className={styles.input}
            ref={inputRef}
            onKeyDown={handleKeyDown}
            size={DEFAULT_INPUT_SIZE}
            onBlur={handleBlur}
            onInput={() => {
              if (!inputRef?.current) {
                return;
              }

              inputRef.current.size = Math.max(DEFAULT_INPUT_SIZE, inputRef.current.value.length);
            }}
          />
        </label>
      </div>
    </div>
  );
};
