import { useMemo } from "react";
import { List, ListRowRenderer } from 'react-virtualized';
import { ProductItem } from "./ProductItem";

interface SearchResultsProps {
  totalPrice: number;
  results: Array<{
    id: number;
    price: number;
    priceFormatted: string;
    title: string;
  }>
  onAddToWishList: (id: number) => void;
}

export function SearchResults({ results, onAddToWishList, totalPrice }: SearchResultsProps) {

  // useMemo: evita que alguma coisa que leva muito processamento ex.: cálculos sejam refeitos toda vez que o componente renderizar
  // ele memoiza/memoriza o valor da variável que tem o cálculo e só refaz quando a variável do array de dependências mudar
  // evita que a mesma variável ocupe um novo lugar na memória quando repassamos do pai para o filho

  // const totalPrice = useMemo(() => {
  //   return results.reduce((total, produto) => {
  //     return total + produto.price;
  //   }, 0);
  // }, [results]);

  const rowRenderer: ListRowRenderer = ({ index, key, style }) => {
    return (
      <div key={key} style={style}>
        <ProductItem product={results[index]} onAddToWishList={onAddToWishList}/>
      </div>
    )
  }

  return (
    <div>
      <h2>{totalPrice}</h2>

      <List
        height={300}
        rowHeight={30}
        width={900}
        overscanRowCount={5}
        rowCount={results.length}
        rowRenderer={rowRenderer}
      />

      {/* {results.map(product => {
        return (
          <ProductItem product={product} key={product.id} onAddToWishList={onAddToWishList} />
        );
      })} */}
    </div>
  )
}

// QUANDO USAR O USEMEMO:
/*
  1- Cálculos pesados
  2- Igualdade referencial (quando a gente passa aquela informação para o componente filho)
*/