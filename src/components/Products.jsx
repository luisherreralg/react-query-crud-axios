import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteProduct, getProducts, updateProduct } from "../api/productsApi";

export default function Products() {
  const queryClient = useQueryClient();
  const {
    isLoading,
    data: products,
    isError,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    select: (products) => products.sort((a, b) => b.id - a.id),
  });

  const deleteProductMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries("products");
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries("products");
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error:{error.message}</div>;

  return (
    <>
      <div className="flex flex-wrap gap-7">
        {products.map((product) => (
          <div
            key={product.id}
            className="mx-auto my-5 flex  w-1/4 flex-col bg-zinc-600"
          >
            <h3 className="bg-zinc-800 text-center text-2xl text-slate-50">
              {product.name}
            </h3>
            <p className="text-xl">{product.price}€</p>
            <p className="text-xl">{product.description}</p>

            <label htmlFor={product.id}>
              In Stock
              <input
                type="checkbox"
                checked={product.inStock}
                id={product.id}
                onChange={(event) => {
                  updateProductMutation.mutate({
                    ...product,
                    inStock: event.target.checked,
                  });
                }}
              />
            </label>

            <button
              className="mx-auto my-4 w-5/6 bg-red-400 p-1 hover:bg-red-900"
              onClick={() => {
                deleteProductMutation.mutate(product.id);
              }}
            >
              delete
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
