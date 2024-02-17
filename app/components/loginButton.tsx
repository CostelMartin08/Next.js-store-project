import { useSession, signIn, signOut } from "next-auth/react";

export default function loginButton() {
  const { data: session } = useSession();

  const handleSignIn = () => {
    signIn();
  };

  const handleSignOut = () => {
    signOut();
  };

  return (
    <>
      {session ? (
        <>
          Signed in as {session.user?.email} <br />
          <button onClick={handleSignOut}>Sign out</button>
        </>
      ) : (
        <>
          Not signed in <br />
          <button onClick={handleSignIn}>Sign in</button>
        </>
      )}
    </>
  );
}
