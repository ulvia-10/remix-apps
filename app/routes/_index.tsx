import { useNavigate } from "@remix-run/react";
import { Button } from "~/components/ui/button";

export default function Index() {
  const navigate = useNavigate(); 

  return (
    <div className="flex justify-center align-middle gap-28 p-3 mt-56 ">
      <Button className="p-4" onClick={() => navigate('/books')}>Books</Button>
      <Button className="p-4" onClick={() => navigate('/movies')}>Movies</Button>
    </div>
  );
}
