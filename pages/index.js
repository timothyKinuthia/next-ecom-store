import Head from "next/head";

import { getDataApi } from "../utils/functions";
import ProductItem from "../components/product/ProductItem";

export default function Home({ products, results }) {
  return (
    <div className="bg-red-700 bg-gray-100 py-4 px-4 lg:px-0">
      <Head>
        <title>Home page</title>
      </Head>
      <div className="bg-white max-w-6xl mx-auto border border-gray-100">
        <h2 className="pt-2 px-4 text-lg text-center lg:text-left font-pocifico font-bold">
          TRENDING PRODUCTS
        </h2>
        <div className=" p-2 grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.length > 0 &&
            products.map((prod) => (
              <ProductItem key={prod._id} product={prod} />
            ))}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const res = await getDataApi("product/createProduct");

  return {
    props: {
      products: res.data.products,
      results: res.data.results,
    },
  };
}
