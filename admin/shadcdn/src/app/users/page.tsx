import { columns, User } from "./columns"
import { DataTable } from "./DataTable"

async function getData(): Promise<User[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
      fullName: "John Doe",
      status: "active",
      userId: "u323",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
      fullName: "John Doe",
      status: "inactive",
      userId: "u923",
      email: "m@example.com",
    },
    {
      id: "728edd4f",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
      fullName: "John Doe",
      status: "active",
      userId: "u823",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",

      fullName: "John Doe",
      status: "active",
      userId: "u723",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
      fullName: "John Doe",
      status: "inactive",
      userId: "u124",
      email: "dk@example.com",
    },
    {
      id: "728edd4f",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",

      fullName: "John Doe",
      status: "inactive",
      userId: "u126",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",

      fullName: "John Doe",
      status: "active",
      userId: "u193",
      email: "kkf@example.com",
    },
    {
      id: "728ed52f",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
      fullName: "John Doe",
      status: "active",
      userId: "u121",
      email: "ng@example.com",
    },
    {
      id: "728edd4f",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",

      fullName: "John Doe",
      status: "inactive",
      userId: "u183",
      email: "ad@example.com",
    },
    {
      id: "728ed52f",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",

      fullName: "John Doe",
      status: "active",
      userId: "u123",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
      fullName: "John Doe",
      status: "active",
      userId: "u153",
      email: "m@example.com",
    },
    {
      id: "728edd4f",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
      fullName: "John Doe",
      status: "inactive",
      userId: "u123",
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