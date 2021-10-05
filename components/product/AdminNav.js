import React from "react";
import Link from "next/link";

const AdminNav = () => {
  const navlinks = [
    { name: "Create", link: "/admin/productCreate" },
    { name: "Update", link: "/admin/productUpdate" },
    { name: "category", link: "/admin/category" },
  ];
  return (
    <div className="sm:mt-6 sm:w-1/5 flex justify-between sm:justify-start sm:flex-col space-x-4 sm:space-x-0 sm:space-y-4 px-4">
      {navlinks.map((nav, i) => (
        <Link key={i} href={nav.link}>
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold"
          >
            {nav.name}
          </a>
        </Link>
      ))}
    </div>
  );
};

export default AdminNav;
