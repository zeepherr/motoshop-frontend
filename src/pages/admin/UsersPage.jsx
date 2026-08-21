import { useUser } from "@/hook/user/useUser";

function UsersPage() {
  const { data: users } = useUser();
  console.log("Users", users);
  return (
    <div>
      <pre>{JSON.stringify(users, null, 2)}</pre>
    </div>
  );
}

export default UsersPage;
