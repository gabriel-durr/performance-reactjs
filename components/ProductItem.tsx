import { memo, useState } from 'react';
// import { AddProductToWishlist } from './AddProductToWishlist';
import { AddProductToWishlistProps } from './AddProductToWishlist';
// dynamic no next é o mesmo que lazy no react
import dynamic from 'next/dynamic';

// lazy loading - carregar as informações somente no momento que for preciso para não sobrecarregar o bundle sem necessidade.
// esse componente será importado/criado/carregado somente se o usuário clicar no botão de adicionar aos favoritos
const AddProductToWishlist = dynamic<AddProductToWishlistProps>(() => {
  return import('./AddProductToWishlist').then(mod => mod.AddProductToWishlist);
}, {
  loading: () => <span>Carregando...</span>
})

interface ProductItemProps {
  product: {
    id: number;
    price: number;
    priceFormatted: string;
    title: string;
  }
  onAddToWishList: (id: number) => void;
}

function ProductItemComponent({ product, onAddToWishList }: ProductItemProps) {
  const [isAddingToWishlist, setIsAddingToWishlist] = useState<boolean>(false);
  return (
    <div>
      {product.title} - <strong>{product.priceFormatted}</strong>
      <button onClick={() => setIsAddingToWishlist(true)}>Adicionar aos favoritos</button>
      {isAddingToWishlist && (
        <AddProductToWishlist
          onAddToWishlist={() => onAddToWishList(product.id)}
          onRequestClose={() => setIsAddingToWishlist(false)}
        />
      )}
    </div>
  )
}

// FLUXO DE RENDERIZAÇÃO
// 1 - Criar uma nova versão do componente
// 2 - Comparar com a versão anterios
// 3 - Se houverem alterações, vai atualizar o que alterou

// memo: função que usamos por volta da exportação de um componente
// o memo evita que a primeira etapa do fluxo de renderização aconteça caso nenhuma propriedade do componente tenha sido alterada
// shalow compare: verifica a igualdade das informações dentro das propriedades, igualdade referencial {} === {} // false
// Object.is : verifica a igualdade das propriedades de forma mais profunda

export const ProductItem = memo(ProductItemComponent, (prevProps, nextProps) => {
  return Object.is(prevProps.product, nextProps.product);
});

// SITUAÇÕES PARA USAR O MEMO:
/*
1. componentes puros - pure functional component - dados os mesmos parâmetros sempre retorna os mesmos resultados
2. componentes que renderizam demais - renders too often
3. renderiza muitas vezes com as mesmas props - re-renders with same props
4. componente médio ou grande, em componentes pequenos não vale a pena -  medium to big size

*/
