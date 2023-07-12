import { ProductWithFavsCount } from "pages";
import useSWR from "swr";
import Item from "./item";
import { Reorder } from "framer-motion";

interface Record {
  id:number;
  product:ProductWithFavsCount;
}

interface ProductListResponse {
  [key:string]: Record[]
}

interface ProductListProps {
  kind: "sold" | "purchases" | "favs";
}

export default function ProductList({kind}: ProductListProps) {
  const { data } =  useSWR<ProductListResponse>(`/api/users/me/${kind}`)
  return data ? (
    <>
      {data?.[kind].map((records) => (
        <Item
          id={records.product.id}
          key={records.id}
          image={records.product.image}
          title={records.product.name}
          price={records.product.price}
          hearts={records.product._count.favorite}
        />
      ))}
    </>
  ) : null;
}