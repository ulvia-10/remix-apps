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
  const supabase = createClient('https://ccbyullgbwhokfopjgdv.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNjYnl1bGxnYndob2tmb3BqZ2R2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMzNjQ4MzMsImV4cCI6MjA0ODk0MDgzM30.RYfC83SrMPEagcWjGvOv5ryyqwMB9byEPJ8XvaG9uIg');
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
