import React from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { StandardLayout } from '../../components/standard-layout';
import { addFavourite, removeFavourite } from '../../redux/favourites-slice';
import { useRepositoriesQuery } from '../../redux/github-search-api';
import { favouriteIdsSelector } from './favourite-ids-selector';

import * as styles from './home-page.module.css';

export const HomePage: React.FC = () => {
  const { data } = useRepositoriesQuery('');
  const favouriteIds = useSelector(favouriteIdsSelector, shallowEqual);

  const dispatch = useDispatch();

  return (
    <StandardLayout>
      <main className={styles.main}>
        <h1>Home page</h1>

        {data && (
          <table>
            <tbody>
              {data.items.map((item) => {
                const checked = favouriteIds.includes(item.id);

                return (
                  <tr key={item.html_url}>
                    <td>
                      <input
                        type="checkbox"
                        defaultChecked={checked}
                        onChange={(event) => {
                          if (event.target.checked) {
                            dispatch(addFavourite(item));
                          } else {
                            dispatch(removeFavourite(item.id));
                          }
                        }}
                      />
                    </td>
                    <td>
                      <a href={item.html_url} target="_blank" rel="noreferrer">
                        {item.full_name}
                      </a>
                      <p>{item.description}</p>
                    </td>
                    <td>{item.stargazers_count}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </main>
    </StandardLayout>
  );
};
