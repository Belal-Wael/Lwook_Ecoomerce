import { columns, Payment } from "./columns"
import { DataTable } from "./DataTable"

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      fullName: "John Doe",
      status: "pending",
      userId:"u323",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      amount: 10,
      fullName: "John Doe",
      status: "success",
      userId:"u923",
      email: "m@example.com",
    },
    {
      id: "728edd4f",
      amount: 100,
      fullName: "John Doe",
      status: "failed",
      userId:"u823",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      fullName: "John Doe",
      status: "pending",
      userId:"u723",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      amount: 10,
      fullName: "John Doe",
      status: "success",
      userId:"u124",
      email: "dk@example.com",
    },
    {
      id: "728edd4f",
      amount: 100,
      fullName: "John Doe",
      status: "failed",
      userId:"u126",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      fullName: "John Doe",
      status: "pending",
      userId:"u193",
      email: "kkf@example.com",
    },
    {
      id: "728ed52f",
      amount: 10,
      fullName: "John Doe",
      status: "success",
      userId:"u121",
      email: "ng@example.com",
    },
    {
      id: "728edd4f",
      amount: 100,
      fullName: "John Doe",
      status: "failed",
      userId:"u183",
      email: "ad@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      fullName: "John Doe",
      status: "pending",
      userId:"u123",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      amount: 10,
      fullName: "John Doe",
      status: "success",
      userId:"u153",
      email: "m@example.com",
    },
    {
      id: "728edd4f",
      amount: 100,
      fullName: "John Doe",
      status: "failed",
      userId:"u123",
      email: "ar@example.com",
    },
  ]
}

export default async function payment() {
  const data = await getData()

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
    
  )
}