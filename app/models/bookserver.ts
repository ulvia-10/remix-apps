import { redirect } from "@remix-run/react";
import { createClient } from "@supabase/supabase-js";

export const deleteAction = async ({ request }: { request: Request }) => {
    const supabase = createClient(process.env.REACT_APP_SUPABASE_URL!, process.env.REACT_APP_SUPABASE_ANON!);

    const formData = await request.formData();
    const bookId = formData.get("bookId") as string;

    if (!bookId) {
        return { error: "Book ID is required" };
    }

    const { data, error } = await supabase
        .from("Book")
        .delete()
        .eq("id", bookId); 

    if (error) {
        console.log(error);
        return { error: error.message };
    }

    return redirect("/"); 
}