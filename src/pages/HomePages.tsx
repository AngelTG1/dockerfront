import ProductsList from "../components/ProductsList";
import { useAuthStore } from "../store/auth";
import { useNavigate, Link } from "react-router-dom";

function HomePages() {
  const logout = useAuthStore((state) => state.logout);
  const profile = useAuthStore((state) => state.profile);
  const navigate = useNavigate();
  return (
    <div>
      
      

        <div>
            <ProductsList />
        </div>

      <div className="flex flex-row gap-1.5">
      <button
        onClick={() => {
          logout();
          navigate("/");
        }}
        className="border"
      >
        cerrar
      </button>
      <Link to="/form" className=" border">crear producto</Link>
      </div>

      <p>hola: {profile.name} </p>
    </div>
  );
}

export default HomePages;
