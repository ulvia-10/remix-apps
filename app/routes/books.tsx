import { FormProvider, useForm } from "react-hook-form";
import { Dialog, DialogHeader, DialogContent, DialogTitle, DialogDescription, DialogTrigger } from "~/components/ui/dialog";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Button } from "../components/ui/button";
import { useActionData, useLoaderData } from "@remix-run/react";
import { createClient } from "@supabase/supabase-js";
import CardList from "~/components/cardlist/cardlist";
import { fileToBase64 } from "~/lib/utils";

type FormData = {
    name: string;
    author: string;
    releaseDate: string;
    image_name: string;
};

export const loader = async () => {
    const supabase = createClient('https://ccbyullgbwhokfopjgdv.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNjYnl1bGxnYndob2tmb3BqZ2R2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMzNjQ4MzMsImV4cCI6MjA0ODk0MDgzM30.RYfC83SrMPEagcWjGvOv5ryyqwMB9byEPJ8XvaG9uIg');
    const { data } = await supabase.from('Book').select();
    return {
        data
    };
};



export const action = async ({ request }: { request: Request }) => {
    const url = new URL(request.url);
    const action = url.searchParams.get("actions");

    const supabase = createClient('https://ccbyullgbwhokfopjgdv.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNjYnl1bGxnYndob2tmb3BqZ2R2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMzNjQ4MzMsImV4cCI6MjA0ODk0MDgzM30.RYfC83SrMPEagcWjGvOv5ryyqwMB9byEPJ8XvaG9uIg');
    const formData = await request.formData();

    if (action === "delete") {
        const bookId = formData.get("bookId") as string;

        // Delete the book record from the "Book" table
        const { data, error } = await supabase
            .from("Book")
            .delete()
            .eq("id", bookId);

        if (error) {
            console.error(error);
            return { error: error.message };
        }

        return { success: "Data has been deleted successfully!" };
    } else {
        const name = formData.get("name") as string;
        const author = formData.get("author") as string;
        const image_name = formData.get("image_name") as string;


        const { data, error } = await supabase
            .from("Book")
            .insert([{ name, author, image_name: image_name }]);

        if (error) {
            console.error(error);
            return { error: error.message };
        }
        return null
    }
};



export default function FormBook() {
    const actionData = useActionData();
    const datas = useLoaderData();

    const form = useForm<FormData>({
        defaultValues: {
            name: "",
            author: "",
            releaseDate: "",
            image_name: "",
        },
    });

    return (
        <div>
            <div className="flex flex-row items-center justify-between px-10">
                <h1 className="capitalize text-center text-3xl">Book List</h1>
                <Dialog modal>
                    <DialogTrigger>
                        <Button>Add New Book</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle className="text-center">Add Your Book</DialogTitle>
                            <DialogDescription className="mt-10">
                                <FormProvider {...form}>
                                    <form method="post" action="/books" encType="multipart/form-data">
                                        <FormField
                                            control={form.control}
                                            name="name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Title</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Title" {...field} />
                                                    </FormControl>
                                                    <FormDescription>You Title Book Name </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="author"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Author</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Author" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        {/* <FormField
                                    control={form.control}
                                    name="releaseDate"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Release Date</FormLabel>
                                            <FormControl>
                                                <Input type="date" placeholder="Date" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                /> */}
                                        <FormField
                                            control={form.control}
                                            name="image_name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Upload Image</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="file"
                                                            className="cursor-pointer"
                                                            placeholder="File"
                                                            onChange={async (e) => {
                                                                const file = e.target.files ? e.target.files[0] : null;
                                                                if (file) {
                                                                    try {
                                                                        const supabase = createClient('https://ccbyullgbwhokfopjgdv.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNjYnl1bGxnYndob2tmb3BqZ2R2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMzNjQ4MzMsImV4cCI6MjA0ODk0MDgzM30.RYfC83SrMPEagcWjGvOv5ryyqwMB9byEPJ8XvaG9uIg');
                                                                        const { data, error } = await supabase.storage
                                                                            .from('book_image')
                                                                            .upload(`images/${file.name}`, file);
                                                            
                                                                        if (error) {
                                                                            throw error; // throw error to catch in catch block
                                                                        }
                                                            
                                                                        const imageUrl = `${process.env.REACT_APP_SUPABASE_URL}/storage/v1/object/public/book_images/${data.path}`;
                                                                        field.onChange(imageUrl); // Update form with image URL
                                                                    } catch (error) {
                                                                        console.error("Error uploading file:", error.message);
                                                                    }
                                                                }
                                                            }}
                                                            
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />


                                        {actionData?.error && <p className="error">{actionData.error}</p>}
                                        {actionData?.success && <p className="success">{actionData.success}</p>}
                                        <Button type="submit" className="mt-3 flex ml-96" >Submit</Button>
                                    </form>
                                </FormProvider>
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="p-10">
                <div className="grid grid-cols-6 ml-6 gap-5 ">
                    {datas.data.map((item, index) => (
                        datas ?
                            <CardList key={index} id={item.id} title={item.author} image={item.image_name} release={item.created_at} /> :
                            <h1 key={index}>Empty List</h1>
                    ))
                    }
                </div>
            </div>
        </div>

    );
}
