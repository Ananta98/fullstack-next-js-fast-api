import { Button } from "@/components/ui/button";
import Link from "next/link";

const CustomerCard = ({
  id,
  name,
  phone_number,
  email,
  address,
  deleteCustomer,
}: {
  id: number;
  name: string;
  phone_number: string;
  email: string;
  address: string;
  deleteCustomer: (id: number) => void;
}) => {
  return (
    <div className="max-w-sm p-6 border rounded-lg shadow-sm bg-gray-800 mt-5">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-white uppercase">
        {name}
      </h5>
      <div className="text-lg font-bold text-white">Phone: {phone_number}</div>
      <div className="text-lg font-bold text-white">Email: {email}</div>
      <div className="text-lg font-bold text-white">Address: {address}</div>
      <div className="flex gap-2 mt-4">
        <Button asChild variant="secondary">
          <Link href={`/dashboard/customer/edit/${id}`}>Update</Link>
        </Button>
        <Button
          onClick={(e) => {
            e.preventDefault();
            deleteCustomer(id);
          }}
          variant="destructive"
        >
          Remove
        </Button>
      </div>
    </div>
  );
};

export default CustomerCard;
