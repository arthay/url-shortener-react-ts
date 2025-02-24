import useNavigateByAuth from "@/hooks/useNavigateByAuth";

function Home () {
  useNavigateByAuth({ errorRoute: '/login' });

  return (
    <div>Home</div>
  );
}

export default Home;
