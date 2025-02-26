import { Button } from "@/components/ui/button";
import Link from "next/link";

const ProductCard = ({
  id,
  name,
  price,
  deleteProduct,
}: {
  id: number;
  name: string;
  price: number;
  deleteProduct: (id: number) => void;
}) => {
  return (
    <div className="max-w-sm p-6 border rounded-lg shadow-sm bg-gray-800 mt-5">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-white uppercase">
        {name}
      </h5>
      <span className="text-3xl font-bold text-white">Rp. {price}</span>
      <div className="flex gap-2 mt-4">
        <Button asChild variant="secondary">
          <Link href={`/dashboard/product/edit/${id}`}>Update</Link>
        </Button>
        <Button
          onClick={(e) => {
            e.preventDefault();
            deleteProduct(id);
          }}
          variant="destructive"
        >
          Remove
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
