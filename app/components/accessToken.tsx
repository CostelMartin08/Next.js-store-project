import { useSession, signIn, signOut } from "next-auth/react";

export default function Component() {
  const { data }: { data: any } = useSession();
  const accessToken: string | undefined = data?.accessToken;

  return <div>Access Token: {accessToken}</div>;
}
