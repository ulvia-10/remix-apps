import { FormProvider, useForm } from "react-hook-form";
import { Dialog, DialogHeader, DialogContent, DialogTitle, DialogDescription, DialogTrigger } from "~/components/ui/dialog";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Button } from "../components/ui/button";
import { createClient } from "@supabase/supabase-js";
import { redirect, useActionData } from "@remix-run/react";
import { fileToBase64 } from "~/lib/utils";

type FormData = {
    name: string;
    author: string;
    releaseDate: string;
    image_name: string;
};

export const action = async ({ request }: { request: Request }) => {
    const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.REACT_APP_SUPABASE_ANON);
    const formData = await request.formData();
    const name = formData.get("name") as string;
    const author = formData.get("author") as string;
    const image_name = formData.get("image_name") as string;

    let imageBase64: string | null = null;
    if (image_name) {
        imageBase64 = fileToBase64(image_name);
    }

    const { data, error } = await supabase
        .from("Book")
        .insert([{ name, author, image_name: imageBase64 }]);

    if (error) {
        console.log(error);
        return { error: error.message };
    };
   return redirect('/')
};


export default function FormBook() {
    const actionData = useActionData();

    const form = useForm<FormData>({
        defaultValues: {
            name: "",
            author: "",
            releaseDate: "",
            image_name: "",
        },
    });

    return (
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
                                                    onChange={(e) => {
                                                        console.log(e.target.files, 'ini files apa?')
                                                        const file = e.target.files ? e.target.files[0] : null;
                                                        if (file) {
                                                            field.onChange(file);
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
    );
}
