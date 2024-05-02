import type { MetaFunction } from "@remix-run/node";
import { Link } from '@remix-run/react';

export const meta: MetaFunction = () => {
  return [
    { title: "Forex" },
    { name: "description", content: "Forex" },
  ];
};

export default function Index() {
  const files = import.meta.glob('./**/*.tsx');
  const routes = Object.keys(files).filter(file => !file.includes('_index.tsx'));

  return (
    <ul un-list='none' un-mt='8' un-grid='~' un-gap='4' >
      {routes.map(route => (
        <li key={route}>
          <Link to={route.replace(/^\.\//, '').replace(/\.tsx$/, '')}>
            {route.replace(/^\.\//, '').replace(/\.tsx$/, '')}
          </Link>
        </li>
      ))}
    </ul>
  );
}
