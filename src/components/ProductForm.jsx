import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "../api/productsApi";

function ProductForm() {
  const queryClient = useQueryClient();

  const addProductMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      /**
       * * Invalidate Queries
       * Se utiliza para gestionar los cambios
       * Una vez que se han creado nuevos cambios, borra la cache
       * Y realiza otra petición para tener los datos actualizados
       */
      queryClient.invalidateQueries("products");
      console.log("Product added!");
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const product = Object.fromEntries(formData);
    addProductMutation.mutate({ ...product, inStock: true });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="fr mx-auto mt-4 flex h-2/6 w-3/6 flex-col bg-slate-800 p-4 text-slate-50"
    >
      <label className="p-1" htmlFor="name">
        Name
      </label>
      <input type="text" name="name" id="name" className="p-1 text-black" />

      <label className="p-1" htmlFor="description">
        Description
      </label>
      <input
        type="text"
        name="description"
        id="description"
        className="p-1 text-black"
      />

      <label className="p-1" htmlFor="price">
        Price
      </label>
      <input type="number" name="price" id="price" className="p-1 text-black" />

      <button className="mt-4 bg-slate-600 p-1 hover:bg-slate-700">
        Add Product
      </button>
    </form>
  );
}

export default ProductForm;
