import {useRouter} from "next/router";

export default function BotHome(){
    const router = useRouter();
    const botSlug = router.query.bot;

    return (
            <div>
                <h1>{botSlug}</h1>
                <p>Page about {botSlug}</p>
            </div>
    )
}
