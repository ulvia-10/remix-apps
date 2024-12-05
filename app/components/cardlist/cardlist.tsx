import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";
import { format } from "date-fns";
import { fromStringImagesToPng } from "~/lib/utils";
import { Button } from "../ui/button";
import { useFetcher, useLocation } from "@remix-run/react";

interface ICardList {
    title: string;
    name: string;
    image: string;
    release: Date
}


export default function CardList({ title, name, image, release, id }: ICardList) {
    const fetcher = useFetcher();

    const handleDelete = (bookId: string) => {
        fetcher.submit({ bookId }, { method: "post", action: "/books?actions=delete" });
    };
    
    return (
        <Card className="w-60 h-80 bg-slate-100 flex justify-center flex-col hover:shadow-lg hover:scale-90 cursor-pointer">
            <CardTitle className="p-2 mt-2 text-center">{title}</CardTitle>
            <CardContent>
                <img src={image} className="w-64 h-44 rounded-sm" alt="book" />
                <CardDescription className=" text-sm">
                    Release Date : {format(release, "dd MMM yyyy")}
                </CardDescription>
                <Button className="mt-2" onClick={() => handleDelete(id)}>Delete</Button>
            </CardContent>
        </Card>
    )
}