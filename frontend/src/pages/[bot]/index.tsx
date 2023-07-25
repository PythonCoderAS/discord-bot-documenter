import {useRouter} from "next/router";
import useSWR from 'swr';
import {useGetBot} from "@/api/api";


export default function BotHome(){
    const router = useRouter();
    const botSlug = router.query.bot;
    if (!botSlug) {

    }

    const data = useGetBot(botSlug)

    return (
            <div>
                <h1>{botSlug}</h1>
                <p>Page about {botSlug}</p>
            </div>
    )
}
