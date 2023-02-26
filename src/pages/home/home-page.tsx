import React from 'react';
import { StandardLayout } from '../../components/standard-layout';
import { useRepositoriesQuery } from '../../redux/github-search-api';

import * as styles from './home-page.module.css';

export const HomePage: React.FC = () => {
  const { data } = useRepositoriesQuery('');

  return (
    <StandardLayout>
      <main className={styles.main}>
        <h1>Home page</h1>

        {data && (
          <table>
            {data.items.map((item) => (
              <tr key={item.html_url}>
                <td>
                  <a href={item.html_url} target="_blank" rel="noreferrer">
                    {item.name}
                  </a>
                  <p>{item.description}</p>
                </td>
                <td>{item.stargazers_count}</td>
              </tr>
            ))}
          </table>
        )}
      </main>
    </StandardLayout>
  );
};
