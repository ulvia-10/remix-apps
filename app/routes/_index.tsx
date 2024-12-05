import type { MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { createClient } from "@supabase/supabase-js";
import CardList from "~/components/cardlist/cardlist";
import FormBook from "~/routes/books";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};



export const loader = async () => {
  const supabase = createClient(import.meta.env.REACT_APP_SUPABASE_URL, import.meta.env.REACT_APP_SUPABASE_ANON);
  const { data } = await supabase.from('Book').select();
  return {
    data
  };
};



export default function Index() {

  const datas = useLoaderData();
  return (
    <div>
      <div className="flex flex-row items-center justify-between px-10">
        <h1 className="capitalize text-center text-3xl">Book List</h1>
        <FormBook />
      </div>

      <div className="p-10">
        <div className="grid grid-cols-6 ml-6 gap-5 ">
          {datas.data.map((item, index) => (
            <CardList key={index} id={item.id} title={item.author} image={item.image_name} release={item.created_at} />
          ))
          }
        </div>
      </div>
    </div>
  )
}
