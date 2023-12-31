import React from "react";
import Layout from "./components/layout";
import useUser from "./libs/client/useUser";
import Item from "./components/item";
import FloatingButton from "./components/floating-button";
import useSWR from "swr";
import { Favorite, Product } from "@prisma/client";
import Image from "next/image";
import { NextPage } from "next";
import { SWRConfig } from "swr/_internal";
import client from "pages/libs/server/client";

export interface ProductWithFavsCount extends Product {
  _count: {
    favorite: number;
  };
}

interface ProductsResponse {
  ok: boolean;
  products: ProductWithFavsCount[];
}

export function Home() {
  const { data } = useSWR<ProductsResponse>("/api/products");
  return (
    <Layout title="Home" hasTabBar seoTitle="Home">
        <div className="flex flex-col space-y-5 py-10">
          { data ? data?.products?.map((products) => (
            <Item
              id={products.id}
              key={products.id}
              title={products.name}
              image={products.image}
              price={products.price}
              hearts={products._count?.favorite || 0}
            />
          )) : "데이터 로딩..." }
          <FloatingButton href="/products/upload">
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </FloatingButton>
        </div>
    </Layout>
  );
}

const Page : NextPage<{products: ProductWithFavsCount[]}> = ({products}) => {
  return (
    <SWRConfig value={{
      fallback:{
        "/api/products": {
          ok:true,
          products,
        }
      }
    }}>
      <Home />
    </SWRConfig>
  );
}

export async function getServerSideProps(){
  const products = await client.product.findMany({});
  return {
    props:{
      products: JSON.parse(JSON.stringify(products)),
    }
  }
}

export default Page;